import React, { Suspense } from 'react';
import './App.css';

import spinner from './spinner.gif';

import { fetchData } from './Api';

const resource = fetchData();

const App = () => {
  return (
    <div className='container'>
      <Suspense fallback={<Spinner />}>
        <ProfileDetails />
        <PostsDetails />
      </Suspense>
    </div>
  );
};

const Spinner = () => (
  <img
    src={spinner}
    style={{ width: '100px', margin: 'auto auto', display: 'block' }}
    alt='Loading...'
  />
);

const ProfileDetails = () => {
  const user = resource.user.read();
  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        <li>UserName: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>City: {user.address.city}</li>
      </ul>
    </div>
  );
};
const PostsDetails = () => {
  const posts = resource.posts.read();
  return (
    <div>
      <h1>Latest Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
