import { TbReportAnalytics } from '../../../styles/icons'
import ReportItem from './ReportItem'

function Report() {
  return (
    <>
      <div className='flex justify-between mb-10'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <TbReportAnalytics className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Raporlama</p>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-10'>
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
      </div>
    </>
  )
}
export default Report
