import { getForYouPosts } from '@/services/api/Posts'
import { useQuery } from '@tanstack/react-query'
import { Loader } from './ui/Loader'
import { toast } from 'sonner'
import PostPreview from './ui/PostPreview'

function ForYouPosts() {
 const posts = useQuery({
    queryKey: ['posts/for-you'],
    queryFn: () => getForYouPosts()
 })

 if(posts.isLoading){
    return <Loader />
 }

 if(posts.error){
    toast.error('Could not fetch posts')
    return <Loader />;
 }


  return (
    <div>
      {posts.data?.posts.map((post) => <PostPreview key={post.id} post={post} />)}
    </div>
  );
}

export default ForYouPosts
