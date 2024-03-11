import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { FC, useEffect, useState } from "react";
import { record } from "zod";
import Loader from "./Loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats: FC<PostStatsProps> = ({ post, userId }) => {
  const likesList: string[] = post.likes.map(
    (user: Models.Document) => user.$id
  );

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isUnSavingPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord: Models.Document = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsLiked(checkIsLiked(likes, userId))
  }, [])
  useEffect(() => {
    setIsSaved(!!savedPostRecord);    
  }, [currentUser]);

  const checkIsLiked = (likes: string[], userId: string) => {
    return likes.includes(userId);
  }

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = checkIsLiked(newLikes, userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
      setIsLiked(false);
    } else {
      newLikes.push(userId);
      setIsLiked(true);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      deleteSavedPost(savedPostRecord.$id);
      setIsSaved(false);
    } else {
      savePost({ postId: post.$id, userId: currentUser?.$id || '' });
      setIsSaved(true);
    }
  };

  
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`/assets/icons/${
            isLiked ? "liked" : "like"
          }.svg`}
          alt="Like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isUnSavingPost  ? <Loader message="" loaderHeight={20} loaderWidth={20}/> : <img
          src={`/assets/icons/${isSaved ? "saved" : "save"}.svg`}
          alt="Like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />}
      </div>
    </div>
  );
};

export default PostStats;
