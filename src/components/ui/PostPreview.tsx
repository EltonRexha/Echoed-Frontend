import defaultProfile from '@/assets/images/icons/defaultProfile.svg';
import { PostPreview as Post } from '@/types/post';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
} from 'lucide-react';
import { Button } from './button';
import { formatDistanceToNow } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { likePost, savePost } from '@/services/api/Posts';
import { useState } from 'react';
import cld from '@/services/cloudinary';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import getFileType from '@/utils/getFileTypeByMimeType';

const MAX_CONTENT_LENGTH = 400;
const MAX_CONTENT_LENGTH_MOBILE = MAX_CONTENT_LENGTH / 2;
const FULL_NAME_MAX_SIZE = 20;

function PostPreview({
  post,
  loading = false,
}: {
  post?: Post;
  loading?: boolean;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(post ? post.isLiked : false);
  const [isSaved, setIsSaved] = useState<boolean>(post ? post.isSaved : false);

  const likePostMutation = useMutation({
    mutationFn: () => {
      if (!post) return Promise.resolve(undefined);
      return likePost({ postId: post.id, like: !isLiked });
    },
    onSuccess: () => {
      setIsLiked(!isLiked);
    },
  });

  const savePostMutation = useMutation({
    mutationFn: () => {
      if (!post) return Promise.resolve(undefined);
      return savePost({ postId: post.id, save: !isSaved });
    },
    onSuccess: () => {
      setIsSaved(!isSaved);
    },
  });

  if (loading || !post) {
    return <PostPreviewLoadingSkeleton />;
  }

  const fullName = post.author.firstName + ' ' + post.author.lastName;
  return (
    <div className="p-2 hover:bg-muted/20 transition-colors font-sans">
      <div className="flex gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage
            className="h-6 w-6 mt-1 @[400px]:h-8 @[400px]:w-8"
            src={post.author.profileUrl ?? defaultProfile}
          />
          <AvatarFallback className="h-12 w-12">
            {post.author.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold">
              {fullName.length >= FULL_NAME_MAX_SIZE
                ? fullName.slice(0, FULL_NAME_MAX_SIZE) + '...'
                : fullName}
            </span>
            <svg className="h-4 w-4 fill-primary" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-4.5-4.5 1.4-1.4 3.1 3.1 6.5-6.5 1.4 1.4-7.9 7.9z" />
            </svg>
            <span className="text-muted-foreground text-sm hidden sm:block">
              @{post.author.username} ·{' '}
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </span>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-1 mb-3 text-pretty hidden sm:block">
            {post.content.length > MAX_CONTENT_LENGTH
              ? post.content.slice(0, MAX_CONTENT_LENGTH) + '...'
              : post.content}
          </p>
          <p className="mt-1 mb-3 text-pretty block sm:hidden">
            {post.content.length > MAX_CONTENT_LENGTH_MOBILE
              ? post.content.slice(0, MAX_CONTENT_LENGTH_MOBILE) + '...'
              : post.content}
          </p>
          {post.Media.length > 0 && (
            <div className="mt-2 mb-3 rounded-xl overflow-hidden">
              <Carousel className="w-full max-w-md m-auto">
                <CarouselContent>
                  {post.Media.map((media) => {
                    const mediaType = getFileType(media.mimeType);

                    if (mediaType === 'image') {
                      const cldImage = cld.image(media.path);

                      return (
                        <CarouselItem key={media.path}>
                          <img
                            className="w-full h-full max-h-[500px] object-contain"
                            src={cldImage.toURL()}
                          ></img>
                        </CarouselItem>
                      );
                    }

                    if (mediaType === 'video') {
                      const cldVideo = cld.video(media.path);
                      return (
                        <CarouselItem key={media.path}>
                          <video className="w-full h-full" controls>
                            <source
                              src={cldVideo.toURL()}
                              type={media.mimeType}
                            />
                            Your browser does not support the video tag.
                          </video>
                        </CarouselItem>
                      );
                    }
                  })}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
          <div className="flex justify-between mt-2 text-muted-foreground">
            <Button variant="ghost" size="sm" className="gap-1 px-2">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post._count.postComments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 px-2">
              <Repeat2 className="h-4 w-4" />
              <span className="text-xs">{post._count.Reposts}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 px-2"
              onClick={() => likePostMutation.mutate()}
            >
              {isLiked ? (
                <Heart className="h-4 w-4 text-red-500" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
              <span className="text-xs">{post._count.likedBy}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 px-2"
              onClick={() => savePostMutation.mutate()}
            >
              {isSaved ? (
                <Bookmark className="h-4 w-4 text-yellow-500" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              <span className="text-xs">{post._count.savedBy}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 px-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostPreviewLoadingSkeleton() {
  return (
    <div className="p-2 hover:bg-muted/20 transition-colors font-sans">
      <div className="flex gap-1">
        <Avatar className="h-8 w-8 ">
          <AvatarImage
            className="h-6 w-6 mt-1 @[400px]:h-8 @[400px]:w-8"
            src={defaultProfile}
          />
          <AvatarFallback className="h-12 w-12"></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold rounded-sm w-20 h-5 skeleton "></span>
            <span className="text-muted-foreground text-sm hidden sm:block rounded skeleton w-30 h-5"></span>
          </div>
          <p className="mt-1 mb-3 w-full h-20 text-pretty rounded-sm skeleton"></p>
          <div className="mt-2 mb-3 rounded-sm overflow-hidden w-full skeleton h-50"></div>
          <div className="flex justify-between mt-2 text-muted-foreground rounded-sm skeleton w-full h-5"></div>
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
