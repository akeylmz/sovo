import { useState } from 'react'
import { Pie, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function ReportItem() {
  const [activeTab, setActiveTab] = useState(1)

  const genel = {
    labels: ['ALINAN ÖDEME', 'ÖDENMESİ GEREKEN'],
    datasets: [
      {
        label: 'Tutar',
        data: [100000, 50000],
        backgroundColor: ['#3aaf0c', '#93d9cb'],
        hoverBackgroundColor: ['#3aaf0c', '#93d9cb'],
      },
    ],
  }

  const detay = {
    labels: ['ALINAN', 'GELEN', 'KALAN'],
    datasets: [
      {
        label: 'Tutar',
        data: [25000, 25000, 25000],
        backgroundColor: ['#3aaf0c', '#7acbf5', '#28b397'],
        hoverBackgroundColor: ['#3aaf0c', '#7acbf5', '#28b397'],
      },
    ],
  }

  const kar = {
    labels: ['NET KAR', 'KDV'],
    datasets: [
      {
        label: 'Tutar',
        data: [100000, 150000],
        backgroundColor: ['#3aaf0c', '#2f87b4'],
        hoverBackgroundColor: ['#3aaf0c', '#2f87b4'],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        title: { display: true, padding: 5 },
      },
    },
  }

  const style1 = { textDecorationLine: activeTab === 1 ? 'underline' : undefined }
  const style2 = { textDecorationLine: activeTab === 2 ? 'underline' : undefined }
  const style3 = { textDecorationLine: activeTab === 3 ? 'underline' : undefined }

  return (
    <div className='flex flex-col rounded-xl shadow-xl w-full max-w-[420px] bg-[#2f9590]'>
      <div className='flex flex-col gap-3 rounded-xl p-4 bg-white'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <span className='font-semibold text-gray-700'>Proje :</span>
            <span className='text-sm font-bold text-soento-green'>AYZER DÖKÜM</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-semibold text-gray-700'>Anlaşılan Miktar :</span>
            <span className='text-sm font-bold'>12.750.000 $</span>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='flex gap-3 text-sm font-bold text-soento-green'>
            <button className='p-2 underline-offset-4' onClick={() => setActiveTab(1)} style={style1}>
              GENEL
            </button>
            <button className='p-2 underline-offset-4' onClick={() => setActiveTab(2)} style={style2}>
              DETAY
            </button>
            <button className='p-2 underline-offset-4' onClick={() => setActiveTab(3)} style={style3}>
              KAR
            </button>
          </div>

          <div className='flex justify-center h-[400px] overflow-hidden'>
            {activeTab === 1 && <Pie data={genel} options={options} />}
            {activeTab === 2 && <Doughnut data={detay} options={options} />}
            {activeTab === 3 && <Pie data={kar} options={options} />}
          </div>
        </div>
      </div>

      <div className='flex p-4 text-white'>
        <div className='w-1/2 flex flex-col items-start'>
          <span className='text-xs font-semibold'>GENEL KALAN</span>
          <span className='text-xl font-bold'>$ 9.750.000</span>
        </div>
        <div className='h-full border border-gray-200'></div>
        <div className='w-1/2 flex flex-col items-end'>
          <span className='text-xs font-semibold'>HARCAMA CARİ DURUM</span>
          <span className='text-xl font-bold'>1.500.000 $</span>
        </div>
      </div>
    </div>
  )
}
export default ReportItem
