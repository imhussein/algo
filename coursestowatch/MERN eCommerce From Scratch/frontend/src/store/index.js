import Axios from "axios";
import { combineReducers, compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const PRODUCTS_LIST_REQUEST = "PRODUCTS_LIST_REQUEST";
const PRODUCTS_LIST_SUCCESS = "PRODUCTS_LIST_SUCCESS";
const PRODUCTS_LIST_FAIL = "PRODUCTS_LIST_FAIL";
const PRODUCTS_DETAILS_REQUEST = "PRODUCTS_DETAILS_REQUEST";
const PRODUCTS_DETAILS_SUCCESS = "PRODUCTS_DETAILS_SUCCESS";
const PRODUCTS_DETAILS_FAIL = "PRODUCTS_DETAILS_FAIL";
const CART_ADD_ITEM = "CART_ADD_ITEM";
const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const res = await Axios.get("http://localhost:5000/api/products");
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });
    const res = await Axios.get(`http://localhost:5000/api/products/${id}`);
    dispatch({ type: PRODUCTS_DETAILS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
const usersIntialState = {};
function usersReducer(state = usersIntialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const productsIntialState = {
  loading: false,
  products: [],
  product: {},
  productDetailError: "",
  productLoading: false,
  error: "",
};
function productsReducer(state = productsIntialState, action) {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case PRODUCTS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCTS_DETAILS_REQUEST:
      return {
        ...state,
        productLoading: true,
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        productLoading: false,
        product: action.payload,
      };
    case PRODUCTS_DETAILS_FAIL:
      return {
        ...state,
        productLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const cartInitialState = {
  cartItems: [],
};
function cartReducer(state = cartInitialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      console.log(state.cartItems);
      const existItem = state.cartItems.find((p) => p.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.product === existItem.product ? item : p
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  cart: cartReducer,
});

const cartItemsFromLS = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = { cart: { cartItems: cartItemsFromLS } };

const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (nope) => nope
  )
);
