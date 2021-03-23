import axios from "axios";

const SET_USERS = 'SET_USERS'
const LOAD = 'LOAD'
const SET_USERS_SORTING = 'SET_USERS_SORTING';
const SET_USERS_FILTERING = 'SET_USERS_FILTERING';
const SET_USERS_FRAGMENT = 'SET_USERS_FRAGMENT';

const initialState = {
    users: [],
    usersFiltering: [],
    usersFragment: [],
    isLoaded: false
}


export const tableReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case SET_USERS_SORTING:
            return {
                ...state,
                users: [...action.usersSorting]
            }

        case LOAD:
            return {
                ...state,
                isLoaded: action.isLoaded
            }

        case SET_USERS_FILTERING:
            return {
                ...state,
                usersFiltering: [...action.usersFiltering]
            }

        case SET_USERS_FRAGMENT:
            return {
                ...state,
                usersFragment: [...action.usersFragment]
            }

        default:
            return state
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users: users
    }
}

export const load = () => {
    return {
        type: LOAD,
        isLoaded: true
    }
}

export const setUsersSorting = (usersSorting) => {
    return {
        type: SET_USERS_SORTING,
        usersSorting
    }
}

export const setUsersFragment = (usersFragment = '') => {
    return {
        type: SET_USERS_FRAGMENT,
        usersFragment
    }
}

export const setUsersFilter = (usersFiltering) => {
    return {
        type: SET_USERS_FILTERING,
        usersFiltering
    }
}

export const getUsersThunk = () => {
    return (dispatch) => {
        axios.get('https://randomuser.me/api/1.3/?results=32')
            .then(response => {
                dispatch(setUsers(usersFilter(response.data.results)));
                dispatch(load());
            })
    }
}

const usersFilter = (users) => {
    return users.map((user) => {
        return {
            'firstName': user.name.first,
            'lastName': user.name.last,
            'gender': user.gender,
            'age': user.dob.age,
            'email': user.email,
            'phone': user.phone
        }
    })
}
