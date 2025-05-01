import { PostPreview as Post } from '@/types/post';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import PostPreview from '../../components/ui/PostPreview';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { getFollowingPosts } from '@/services/api/Posts';
import ViewWrapper from '../../components/ViewWrapper';
import { toast } from 'sonner';

//Fetch on every viewed x amount of posts
const TARGET_POST = 8;
const LIMIT = 20;

type AdditionalData = { index: number };
type InViewFn = ({
  inView,
  additionalData,
}: {
  inView: boolean;
  additionalData: AdditionalData;
}) => void;

const Item = React.memo(
  ({
    post,
    onInViewFn,
    index,
  }: {
    post?: Post;
    onInViewFn: InViewFn;
    index: number;
  }) => {
    return post ? (
      <div key={post.id}>
        <ViewWrapper
          additionalData={{ index: index + 1 } as AdditionalData}
          threshold={0.2}
          triggerOnce={true}
          onInView={onInViewFn}
        >
          <PostPreview post={post} />
        </ViewWrapper>
      </div>
    ) : (
      <ViewWrapper
        additionalData={{ index: index + 1 } as AdditionalData}
        threshold={0.2}
        triggerOnce={true}
        onInView={onInViewFn}
      >
        <PostPreview post={post} loading={true} />
      </ViewWrapper>
    );
  }
);

function FollowingPosts() {
  const [posts, setPosts] = useState<Record<string, Post>>({});
  const [loadingPosts, setLoadingPosts] = useState<undefined[]>([]);
  const [page, setPage] = useState(1);
  const parentRef = useRef<HTMLDivElement>(null);

  const currentPosts = useQuery({
    queryKey: ['following', page],
    queryFn: () => getFollowingPosts({ page, limit: LIMIT }),
  });

  useEffect(() => {
    if (currentPosts.status === 'success') {
      setPosts((prevPosts) => {
        const newPosts = { ...prevPosts };
        currentPosts.data.posts.forEach((post: Post) => {
          newPosts[post.id] = post;
        });
        return newPosts;
      });
      setLoadingPosts([]);
    }

    if (currentPosts.status === 'pending') {
      setLoadingPosts(Array(LIMIT).fill(undefined));
    }

    if (currentPosts.status === 'error') {
      toast.error('Something went wrong fetching posts');
      setLoadingPosts([]);
      setPosts({});
      setPage(1);
    }

    return () => {
      setLoadingPosts([]);
      setPosts({});
      setPage(1);
    };
  }, [currentPosts.status, currentPosts.data]);

  const postsArray = Object.values(posts);
  const allItems = [...postsArray, ...loadingPosts];

  const virtualizer = useVirtualizer({
    count: allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    measureElement: (element) => {
      return element?.getBoundingClientRect().height || 200;
    },
    overscan: 5,
  });

  const onInViewFn: InViewFn = useCallback(({ additionalData, inView }) => {
    if (!inView) return;

    if (additionalData.index % TARGET_POST === 0) {
      setPage((page) => page + 1);
    }
  }, []);

  return (
    <div ref={parentRef}>
      <div
        className="w-full relative"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = allItems[virtualRow.index];
          const isPost = virtualRow.index < postsArray.length;

          return (
            <div
              key={isPost ? (item as Post).id : `loading-${virtualRow.index}`}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              {isPost ? (
                <Item
                  index={virtualRow.index}
                  post={item as Post}
                  onInViewFn={onInViewFn}
                  key={(item as Post).id}
                />
              ) : (
                <Item
                  index={virtualRow.index}
                  onInViewFn={onInViewFn}
                  key={virtualRow.index}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FollowingPosts;
