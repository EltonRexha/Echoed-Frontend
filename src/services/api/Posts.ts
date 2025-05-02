import axios from '@/services/axios';
import { PostPreview } from '@/types/post';

export async function getFollowingPosts({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
}): Promise<{ posts: PostPreview[] }> {
  const response = await axios.get('posts/following', {
    withCredentials: true,
    params: {
      page,
      limit,
    },
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

export async function likePost({
  postId,
  like,
}: {
  postId: string;
  like: boolean;
}): Promise<{ message: string }> {
  const response = await axios.post(
    `/posts/${postId}/like`,
    {
      like,
    },
    { withCredentials: true }
  );
  return response.data;
}

export async function savePost({
  postId,
  save,
}: {
  postId: string;
  save: boolean;
}) {
  const response = await axios.post(
    `/posts/${postId}/save`,
    {
      save,
    },
    { withCredentials: true }
  );
  return response.data;
}
