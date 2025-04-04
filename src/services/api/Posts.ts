import axios from '@/services/axios';
import { PostPreview } from '@/types/post';

export async function getForYouPosts(): Promise<{ posts: PostPreview[] }> {
  const response = await axios.get('posts/for-you', { withCredentials: true });
  return response.data;
}

export async function getFollowingPosts(): Promise<{ posts: PostPreview[] }> {
  const response = await axios.get('posts/following', {
    withCredentials: true,
  });
  return response.data;
}
