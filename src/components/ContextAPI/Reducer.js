
export const initialState = {
    user: null,
    items: [],
    // Admin: localStorage.getItem('Admin'),
};
console.log("context API "+initialState.items);

 function reducer(state,action){
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };

            case 'ADD_ITEM':
                return {
                  ...state,
                  items: [action.payload, ...state.items]
                };   
       
        default:
            return state;
    }
};

export default reducer;