import React, { useState } from 'react';
import { approvePost, disapprovePost, Post as PostType } from '../../services/api';
import './Post.css';
import MediaCarousel from '../MediaCarousel/MediaCarousel';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isApproved, setIsApproved] = useState<boolean | null | undefined>(post.isApproved);

  const handleApprove = async (id: string) => {
    console.log('Approving post with id:', id);
    try {
      await approvePost(id);
      setIsApproved(true);
    } catch (error) {
      console.error('Error approving post:', error);
    }
  };

  const handleDisapprove = async (id: string) => {
    console.log('Disapproving post with id:', id);
    try {
      await disapprovePost(id);
      setIsApproved(false);

    } catch (error) {
      console.error('Error disapproving post:', error);
    }
  };

  const getCurrentStatus = (isApproved: boolean | null | undefined) => {
    if (isApproved !== null && isApproved !== undefined) {
      return isApproved ? "Approved" : "Disapproved";
    }
  };


  return (
    <div className="post-item">
      <h3>{post.createdBy}</h3>
      <p>{post.caption}</p>
      <p>Public: {post.public ? 'Yes' : 'No'}</p>
      <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
      {post.scheduledAt && <p>Scheduled At: {new Date(post.scheduledAt).toLocaleString()}</p>}
      <MediaCarousel media={post.media} />
      <p>Categories: {post.categories.join(', ')}</p>
      <div className="status">
        <button className="approve" onClick={() => handleApprove(post._id)}>Approve</button>
        <div>{getCurrentStatus(isApproved)}</div>
        <button className="disapprove" onClick={() => handleDisapprove(post._id)}>Disapprove</button>
      </div>
    </div>
  );
};


export default Post;

