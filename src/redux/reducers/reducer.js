import { ADD_LIKE, DELETE_USER, FETCH_USERS } from "../actions";

const initialState = {
  users: [],
  showLikes: false
};

function SetLikes(usersArr) {
  usersArr.map((user) => {
    return (user.like = false);
  });
  return usersArr;
}

function updatePhotos(state, id, like) {
  const newPhotos = state.users.map((user) => {
    if (user.id === id && like === false) {
      return { ...user, like: true };
    }
    if (user.id === id && like === true) {
      return { ...user, like: false };
    }
    return user;
  });
  return { ...state, users: newPhotos };
}

function deleteUser(state, id) {
  let newState = state.users.filter((user) => user.id !== id);
  return { ...state, users: newState };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS: {
      const UsersWithLikes = SetLikes(action.payload);
      return {
        ...state,
        users: UsersWithLikes
      };
    }
    case ADD_LIKE:
      return updatePhotos(state, action.id, action.like);
    case DELETE_USER:
      return deleteUser(state, action.id);
    default:
      return state;
  }
};

export default reducer;
