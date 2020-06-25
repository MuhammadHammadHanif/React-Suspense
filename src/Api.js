import axios from 'axios';

export const fetchData = () => {
  const userPromise = fetchUser();
  const postsPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
  };
};

const wrapPromise = (promise) => {
  // initial status
  let status = 'pending';
  // store result
  let result;
  // wait for response
  let suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};

const fetchUser = async () => {
  console.log('Fetching User...');
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchPosts = async () => {
  console.log('Fetching Posts...');
  try {
    const res = await axios.get(
      'https://jsonplaceholder.typicode.com/posts?_limit=5'
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
