import React, { useEffect, useState } from 'react';
import { getPendingPosts, Post as PostType } from '../../services/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../Post/Post';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const loadInitialPosts = async () => {
      const { data } = await getPendingPosts(page);
      setPosts(data);
    };
    loadInitialPosts();
  }, []);

  const loadMorePosts = async () => {
    const nextPage = page + 1;
    const { data } = await getPendingPosts(nextPage);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prev) => [...prev, ...data]);
      setPage(nextPage);
    }
  };


  return (
    <div className="post-list-container">
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts to load.</p>}
        className="infinite-scroll"
      >
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostList;

