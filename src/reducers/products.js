var initialState = [
    {
        id: 1,
        name: "Iphone",
        price: 400,
        status: true
    },
    {
        id: 2,
        name: "Samsung",
        price: 400,
        status: false
    },
    {
        id: 3,
        name: "Nokia",
        price: 400,
        status: true
    }
];

const products = (state = initialState, action) => {
    switch(action.type){
        default: return[...state];
    }
}; 
export default products;