import React from 'react';
import PostList from './components/PostList/PostList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='post-review-container'>
      <PostList />
    </div>
  );
};

export default App;

