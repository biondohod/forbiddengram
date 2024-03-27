import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useDeletePost } from "@/lib/react-query/mutations";
import { useGetPostById } from "@/lib/react-query/queries";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');
  const {mutateAsync: deletePost} = useDeletePost();
  const navigate = useNavigate();

  const onHandleDeletePost = () => {
    if  (!post)  {
      toast({title:  'Something went wrong'})
    } else {
      deletePost({ postId: post?.$id, imageId: post.imageId});
      navigate('/')
    }
  };

  if (isPending) return <Loader fontSize="text-3xl"/>
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="common-container max-w-5xl">
        <div className="flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add post"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit post</h2>
        </div>

        <PostForm post={post} action="Update"/>
        <Button onClick={onHandleDeletePost} variant="destructive" className="w-full">Delete post</Button>
      </div>
    </div>
  );
};

export default EditPost;
