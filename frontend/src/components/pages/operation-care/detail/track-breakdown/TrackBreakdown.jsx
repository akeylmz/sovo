import { useEffect, useState } from 'react'
import ErrorOccurred from '../../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../custom/Loader'
import TrackBreakdownTable from './TrackBreakdownTable'
import { fetchFails } from '../../../../../store/slices/operationCareSlice'
import { useParams } from 'react-router-dom'

function TrackBreakdown() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { fails, loading, error } = useSelector((state) => state.operationCare)
  const [filteredFails, setFilteredFails] = useState([])

  useEffect(() => {
    dispatch(fetchFails()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  useEffect(() => {
    if (fails && Array.isArray(fails)) {
      const filtered = fails.filter((poll) => poll.Fail_Operation_Care == id)
      setFilteredFails(filtered)
    }
  }, [fails, id])

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <TrackBreakdownTable data={filteredFails} />

      {loading && <Loader />}
    </>
  )
}
export default TrackBreakdown
