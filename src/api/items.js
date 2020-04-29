// import { getFormDataFromObject } from 'utils/formData';
import axios from 'axios'; // <--------------------------------------------------------------------------- WARNING!!!!!
// import axios from './axios';
import config from '../config';

export const getPosts = () => {
  // console.log('`${config.serverAddress}posts`', `${config.serverAddress}posts`)
  return axios(`${config.serverAddress}posts`);
};

export const createPostRequest = (dataPost, isOfficial) => {
  // const data = getFormDataFromObject(dataPost);

  const url = isOfficial ? 'posts/official' : 'posts';

  return axios({
    method: 'POST',
    url,
    // data,
    spinner: true
  });
};

export const getPostsRequest = () => {
  console.log('21111111111111111');
  return axios({
    method: 'GET',
    url: 'posts',
    spinner: true
  })
};

export const getPostRequest = (id) => (
  axios({
    method: 'GET',
    url: `posts/${id}`
  })
);

export const addCommentRequest = (id, commentData) => {
  // const data = getFormDataFromObject(commentData);

  return axios({
    method: 'POST',
    url: `posts/${id}/comment`,
    // data
  });
};

export const likeRequest = (id) => (
  axios({
    method: 'GET',
    url: `posts/${id}/like`
  })
);

export const dislikeRequest = (id) => (
  axios({
    method: 'PUT',
    url: `posts/${id}/like`
  })
);

export const reportPostRequest = (id) => (
  axios({
    method: 'GET',
    url: `posts/${id}/report`
  })
);

export const reportCommentRequest = (id) => (
  axios({
    method: 'GET',
    url: `comments/${id}/report`
  })
);
