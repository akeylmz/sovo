import '../../../styles/Stock.css'
import { Outlet, NavLink } from 'react-router-dom'
import { TbReportAnalytics } from '../../../styles/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../../store/slices/projectSlice'
import { useEffect } from 'react'
import Loader from '../../custom/Loader'
import ErrorOccurred from '../../custom/ErrorOccurred'

const calculateProjects = (data) => {
  return data.map((project) => {
    const agreedAmount = project.Cost_NotIncludingKDV
    const calculatedCost = project.CalculatedCost_NotIncludingKDV

    // KDV oranını yüzde işaretinden arındırıp ondalık formata dönüştür
    const kdvRate = parseFloat(project.KDV_Rate.replace('%', '')) / 100

    // Alınan miktar hesaplama
    const receivedAmount = project.project_incomes.reduce(
      (sum, income) => sum + parseFloat(income.Amount_Usd_Incomes),
      0
    )

    // Ödenen miktar hesaplama
    const paidAmount = project.project_expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.Amount_USD_Expenses),
      0
    )

    // KDV İadesi
    const kdvReturn = agreedAmount * kdvRate * 0.75

    // KDV İadesi Hariç Kar
    const kdvExcludingProfit = agreedAmount - paidAmount

    // KDV İadesi Dahil Kar
    const kdvIncludingProfit = kdvExcludingProfit + kdvReturn

    // Ödenmesi gereken borç
    const debtRemaining = calculatedCost - paidAmount

    // Genel kalan
    const totalRemaining = agreedAmount - receivedAmount

    // Harcama cari durum
    const financialBalance = receivedAmount - paidAmount

    return {
      projectName: project.ProjectName,
      agreedAmount,
      receivedAmount,
      paidAmount,
      debtRemaining,
      totalRemaining,
      financialBalance,
      kdvReturn,
      kdvExcludingProfit,
      kdvIncludingProfit,
    }
  })
}

function Report() {
  const dispatch = useDispatch()
  const { projects, loading, error } = useSelector((state) => state.project)

  useEffect(() => {
    dispatch(fetchProjects()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  const calculatedData = calculateProjects(projects)

  const subLinks = [
    { path: 'chart', label: 'Grafik Görünümü' },
    { path: 'table', label: 'Tablo Görünümü' },
  ]

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <TbReportAnalytics className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Raporlama</p>
        </div>
        <div className='flex gap-2 rounded-full px-5 bg-soento-green'>
          <div className='nav-links flex gap-2'>
            {subLinks.map((item, index) => (
              <NavLink key={index} to={item.path}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <Outlet context={[calculatedData]} />

      {loading && <Loader />}
    </>
  )
}
export default Report
