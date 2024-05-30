import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

const defaultState = {
  snackBar: {
    type: 'success',
    message: '',
    showAlert: false
  } as {type: string, message: string, showAlert: boolean}
}

interface SET_SNACKBAR { 
    type: string, 
    message: string, 
    showAlert: boolean
}


const snackBarReducer = createSlice({
  name: 'snackBar',
  initialState: defaultState,
  reducers: {
    setSnackBar: (state, action: PayloadAction<SET_SNACKBAR>) => {
      state.snackBar = action.payload
    },
    closeSnackBar: (state) => {
      state.snackBar = {
        ...state.snackBar,
        showAlert: false
      }
    }
  }
})



const store = configureStore({
    reducer: {
      snackBar: snackBarReducer.reducer
    }
  })


export default store
export const { setSnackBar, closeSnackBar } = snackBarReducer.actions


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch