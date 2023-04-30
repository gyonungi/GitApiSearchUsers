
const initialState ={
    user:{},
}

export const userReducer = (state = initialState,actions) =>{
    switch (actions.type) {
        case "GET_USER":
            return{
                ...state,
                user:actions.payload.items,
            }
            case "SET_ERROR":
                return{
                    ...state,
                    error:actions.payload
                }
                default:
                    return state
    }
}

export const getUser = (payload) =>({
    type: "GET_USER",
    payload
})

export const setError = (payload) => ({
    type: "SET_ERROR",
    payload
})
