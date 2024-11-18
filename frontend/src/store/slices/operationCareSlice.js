import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async action to fetch all data
export const fetchOperationCares = createAsyncThunk('operationCare/fetchOperationCares', async () => {
  const response = await axiosInstance.get('/operationCare')
  return response.data
})

// Async action to add single data
export const addOperationCare = createAsyncThunk('operationCare/addOperationCare', async (data) => {
  const response = await axiosInstance.post('/operationCare/', data)
  return response.data
})

// Async action to update single data
export const updateOperationCare = createAsyncThunk('operationCare/updateOperationCare', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/operationCare/${id}`, seperatedData)
  return response.data
})

const operationCareSlice = createSlice({
  name: 'operationCares',
  initialState: {
    operationCares: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Data

      .addCase(fetchOperationCares.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOperationCares.fulfilled, (state, action) => {
        state.operationCares = action.payload
        state.loading = false
      })
      .addCase(fetchOperationCares.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data

      .addCase(addOperationCare.pending, (state) => {
        state.loading = true
      })
      .addCase(addOperationCare.fulfilled, (state, action) => {
        state.operationCares = [action.payload, ...state.operationCares]
        state.loading = false
      })
      .addCase(addOperationCare.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data

      .addCase(updateOperationCare.pending, (state) => {
        state.loading = true
      })
      .addCase(updateOperationCare.fulfilled, (state, action) => {
        state.operationCares = state.operationCares.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
        state.loading = false
      })
      .addCase(updateOperationCare.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default operationCareSlice.reducer
