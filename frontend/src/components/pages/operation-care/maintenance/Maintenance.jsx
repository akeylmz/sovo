import { fetchSalesOffers } from '../../../../store/slices/salesOfferSlice'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../custom/Loader'
import { useEffect } from 'react'
import MaintenanceTable from './MaintenanceTable'

function Maintenance() {
  const dispatch = useDispatch()
  const { salesOffers, loading, error } = useSelector((state) => state.salesOffer)

  useEffect(() => {
    dispatch(fetchSalesOffers()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <MaintenanceTable data={salesOffers} handleMaintenanceDetail={true} />

      {loading && <Loader />}
    </>
  )
}
export default Maintenance
