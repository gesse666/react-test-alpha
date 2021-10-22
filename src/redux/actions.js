export const FETCH_USERS = "FETCH_USERS";
export const ADD_LIKE = "ADD_LIKE";
export const DELETE_USER = "DELETE_USER";

export const fetchUsers = (data) => {
    return {
        type: "FETCH_USERS",
        payload: data
    }
};

export const AddLike = (id, like) => {
    return {
        type: "ADD_LIKE",
        id: id,
        like: like,
    }
};

export const DeleteUser = (id) => {
    return {
        type: "DELETE_USER",
        id: id
    }
}