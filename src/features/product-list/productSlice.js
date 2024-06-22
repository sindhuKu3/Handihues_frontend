
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchAllProducts, fetchProductById, fetchProductsByFilter, updateProduct } from "./productAPI";
const initialState = {
  products:[],
 status:'idle' ,
 totalItems:0,
 selectedProduct:[],

};

export const fetchAllProductAsync = createAsyncThunk('product/fetchAllProducts',
  async()=>{
    const response = await fetchAllProducts() ;
    return response.data ; 
  }
)

export const fetchAllProductByFilterAsync = createAsyncThunk('product/fetchProductsByFilter' ,async({filter,sort,pagination,admin})=>{
  const response = await fetchProductsByFilter(filter,sort,pagination,admin);
  return response.data ; 
})

//FETCH PRODUCT BY GIVEN ID
export const fetchProductByIdAsync = createAsyncThunk('product/fetchProductById' ,async(id)=>{
  const response = await fetchProductById(id) ;
  return response.data ; 
})

//ASYNCTHUNK FOR PRODUCT CREATION
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

//ASYNCTHUNK FOR PRODUCT UPDATION
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
 increment:(state)=>{state.value += 1 ; } ,
 //it will free the product placed in the state
 clearSelectedProduct:(state)=>{
  state.selectedProduct = null ;
 } 
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })

      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product)=>product.id === action.payload.id
        )
        state.products[index] = action.payload;
         state.selectedProduct = action.payload;
      });
  }
});

// Action creators are generated for each case reducer function
export const {increment ,clearSelectedProduct} = productSlice.actions;
export const selectAllProducts = (state)=>state.product.products ;
export const selectTotalItems=(state)=>state.product.totalItems ; 
export const selectProductById=(state)=>state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;
export default productSlice.reducer;
