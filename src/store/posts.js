/**
 * INITIAL STATE
 */
const defaultPosts = []

/**
 * ACTION TYPES
 */
const CREATE_POST = 'CREATE_POST';
const GET_POSTS = 'GET_POSTS';
const CREATE_CAPTION = 'CREATE_CAPTION';

/**
 * ACTION CREATORS
 */
const createPost = post => ({type: CREATE_POST, post});
const gotPosts = posts => ({type: GET_POSTS, posts});
const postedCaption = caption => ({type: CREATE_CAPTION, caption})

/**
 * THUNK CREATORS
 */

export const post = (url, contractFunc, account) =>
  dispatch =>
    contractFunc(url, {from: account})
    .then(res => {
      let newPost = {}
      newPost[account] = res.logs[0].args.url;
      return dispatch(createPost(newPost));
    })
    .catch(err => console.log(err));

export const fetchPosts = (fetchAddressArray, addressToPostFunc) =>
  dispatch =>
    fetchAddressArray.call()
    .then(res => {
      let addresses = res.map(address => addressToPostFunc(address))
      return Promise.all(addresses)
    })
    .then(posts => {
      let finalArr = posts.map(post => {
        let completedPost = {}
        completedPost.postUrl = post[0];
        completedPost.username = post[1];
        completedPost.tokenPot = post[2].toString(10);
        return completedPost;
      })
      dispatch(gotPosts(finalArr))
    })
    .catch(err => console.log(err))

export const postCaption = (caption, contractFunc, account) =>
  dispatch =>
    contractFunc(caption, {from: account})
    .then(res => console.log(res))

/**
 * REDUCER
 */
export default function (state = defaultPosts, action) {
  switch (action.type) {
    case CREATE_POST:
      let posts = state.slice()
      posts.push(action.post)
      return posts;
    case GET_POSTS:
      return action.posts;
    default:
      return state
  }
}
