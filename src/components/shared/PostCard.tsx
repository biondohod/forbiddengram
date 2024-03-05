import { Models } from 'appwrite';
import { FC } from 'react'

type PostCardProps = {
  post: Models.Document;
}

const PostCard: FC<PostCardProps> = ({post}) => {
  return (
    <div>PostCard</div>
  )
}

export default PostCard