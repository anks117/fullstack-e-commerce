import { createSlice } from "@reduxjs/toolkit";


const initialState={
    checked:[],
    radio:[],
    category:[],
    products:[],
    brands:[],
    checkedBrands:[]
}

export const shopSlice=createSlice({
    name:'shop',
    initialState,
    reducers:{
        setChecked:(state,action)=>{
            state.checked=action.payload
        },
        setRadio:(state,action)=>{
            state.radio=action.payload
        },
        setCategory:(state,action)=>{
            state.category=action.payload
        },
        setProducts:(state,action)=>{
            state.products=action.payload
        },
        setBrands:(state,action)=>{
            state.brands=action.payload
        },
        setCheckedBrands:(state,action)=>{
            state.checkedBrands=action.payload
        }
    }

})

export const {setCategory,setChecked,setProducts,setRadio,setBrands, setCheckedBrands}=shopSlice.actions;
export default shopSlice.reducer;