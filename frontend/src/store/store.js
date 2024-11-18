import { configureStore } from '@reduxjs/toolkit'
import clientSlice from './slices/clientSlice'
import supplierSlice from './slices/supplierSlice'
import projectSlice from './slices/projectSlice'
import salesOfferSlice from './slices/salesOfferSlice'

const store = configureStore({
  reducer: {
    client: clientSlice,
    supplier: supplierSlice,
    project: projectSlice,
    salesOffer: salesOfferSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Bu satır serializable state check'i devre dışı bırakır, silinecek!
    }),
})

export default store
