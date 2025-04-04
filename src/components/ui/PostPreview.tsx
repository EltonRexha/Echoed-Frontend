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

const MAX_CONTENT_LENGTH = 400;
const MAX_CONTENT_LENGTH_MOBILE = MAX_CONTENT_LENGTH / 2;
const FULL_NAME_MAX_SIZE = 20;

function PostPreview({ post }: { post: Post }) {
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
            {post.content.slice(0, MAX_CONTENT_LENGTH)}
          </p>
          <p className="mt-1 mb-3 text-pretty block sm:hidden">
            {post.content.slice(0, MAX_CONTENT_LENGTH_MOBILE)}
          </p>
          {/* {image && (
            <div className="mt-2 mb-3 rounded-xl overflow-hidden">
              <img
                src={image || '/placeholder.svg'}
                alt="Post image"
                className="w-full h-auto"
              />
            </div>
          )} */}
          <div className="flex justify-between mt-2 text-muted-foreground">
            <Button variant="ghost" size="sm" className="gap-1 px-2">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post._count.postComments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 px-2">
              <Repeat2 className="h-4 w-4" />
              <span className="text-xs">{post._count.Reposts}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 px-2">
              {post.isLiked ? (
                <Heart className="h-4 w-4 text-red-500" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
              <span className="text-xs">{post._count.likedBy}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 px-2">
              {post.isSaved ? (
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

export default PostPreview;
