/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const CREATE_USER = 'CREATE_USER';

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const createUser = user => ({type: CREATE_USER, user})
/**
 * THUNK CREATORS
 */

export const fetchUser = (contractFunc, account)  => {
  console.log('IN THE FETCH', contractFunc, 'account:', account)
  return dispatch =>
    contractFunc()
    .then((error, res) => {
      if (error) console.log(error)
      if (!res) {
        console.log('In here')
        dispatch(getUser(null))
      } else {
        dispatch(getUser(res))
      }
    })
    .catch(err => console.log(err))

}

export const addUser = (name, contractFunc, account) =>
  dispatch =>
    contractFunc(name, {from: account})
    .then(res => dispatch(createUser(res.logs[0].args)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case CREATE_USER:
      return action.user;
    default:
      return state
  }
}
