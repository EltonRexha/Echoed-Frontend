import axios from '@/services/axios';
import { PostPreview } from '@/types/post';

export async function getFollowingPosts(): Promise<{ posts: PostPreview[] }> {
  const response = await axios.get('posts/following', {
    withCredentials: true,
  });
  return response.data;
}

export async function getForYouPosts({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
}): Promise<{ posts: PostPreview[] }> {
  const response = await axios.get('posts/for-you', {
    withCredentials: true,
    params: {
      page,
      limit,
    },
  });
  return response.data;
}
