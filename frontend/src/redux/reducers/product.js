import {
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_REQ_FAIL,
  PRODUCT_LIST_REQ_SUCCESS,
  PRODUCT_DETAIL_REQ,
  PRODUCT_DETAIL_REQ_FAIL,
  PRODUCT_DETAIL_REQ_SUCCESS,
} from "../constant/productConstant";
// get all products
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQ:
      return {
        loading: true,
        products: [],
      };

    case PRODUCT_LIST_REQ_SUCCESS:
      return {
        loading: false,
        products: action.payload.data,
        // totalPage: action.payload.totalPage,
        // pages: action.payload.pages,
      };
    case PRODUCT_LIST_REQ_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// get a single product by id
export const productReducer = (state = { product: {reviews:[]} }, action) => {
    switch (action.type) {
      case PRODUCT_DETAIL_REQ:
        return {
          loading: true,
         ...state,
        };
  
      case PRODUCT_DETAIL_REQ_SUCCESS:
        return {
          loading: false,
          product: action.payload.data
        };
      case PRODUCT_DETAIL_REQ_FAIL:
        return {
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
