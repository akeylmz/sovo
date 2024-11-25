import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import CashFlow from './CashFlow'
import IncomeExpense from './IncomeExpense'
import TotalExpenses from './TotalExpenses'
import ProfitLoss from './ProfitLoss'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../../store/slices/projectSlice'
import { useEffect } from 'react'
import Loader from '../../custom/Loader'
import ErrorOccurred from '../../custom/ErrorOccurred'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend)

function Home() {
  const dispatch = useDispatch()
  const { projects, loading, error } = useSelector((state) => state.project)

  useEffect(() => {
    dispatch(fetchProjects()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='flex flex-col gap-7 size-full'>
        <div className='flex flex-col xl:flex-row gap-7'>
          <div className='p-5 xl:w-[60%] h-[45vh] rounded-xl shadow-xl bg-white'>
            <CashFlow data={projects} />
          </div>

          <div className='xl:w-[40%] h-[45vh] rounded-xl shadow-xl bg-[#2f9590]'>
            <IncomeExpense data={projects} />
          </div>
        </div>

        <div className='flex flex-col xl:flex-row gap-7'>
          <div className='p-5 xl:w-[30%] h-[45vh] rounded-xl shadow-xl bg-white'>
            <TotalExpenses data={projects} />
          </div>

          <div className='p-5 xl:w-[70%] h-[45vh] rounded-xl shadow-xl bg-white'>
            <ProfitLoss data={projects} />
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </>
  )
}
export default Home
