import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  useDeletePost,
  useGetCurrentUser,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { formatDateString } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { data: user } = useGetCurrentUser();
  const { mutateAsync: deletePost } = useDeletePost();
  const navigate = useNavigate();

  const onHandleDeletePost = () => {
    console.log(post)
    if  (!post)  {
      toast({title:  'Something went wrong'})
    } else {
      deletePost({ postId: post?.$id, imageId: post.imageId});
      navigate('/')
    }
  };

  if (!post) return <div>there's no post</div>;
  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="Post image."
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${post?.creator?.$id}`}>
                  <img
                    src={
                      `${post?.creator?.imageUrl}` ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    alt="Profile picture."
                    className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                  />
                </Link>

                <div className="flex flex-col">
                  <Link to={`/profile/${post?.creator?.$id}`}>
                    <p className="base-medium lg:body-bold text-light-1">
                      {post?.creator?.name}
                    </p>
                  </Link>

                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {post?.$createdAt
                        ? formatDateString(post?.$createdAt)
                        : ""}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user?.$id !== post.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="Edit post."
                    width={24}
                    height={24}
                  />
                </Link>
                <Button
                  onClick={onHandleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user?.$id !== post.creator.$id && "hidden"
                  }`}
                >
                  {" "}
                  <img
                    src="/assets/icons/delete.svg"
                    alt="Delete post."
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border  w-full  border-dark-4" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post.caption}</p>

              <ul className="flex gap-1 mt-2 flex-wrap">
                {post.tags.map((tag: string) => (
                  <li className="text-light-3" key={tag}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user?.$id || ""} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
