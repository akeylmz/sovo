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
import { Line, Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend)

function Home() {
  const lineData = {
    labels: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ],
    datasets: [
      {
        label: 'GİRİŞ',
        data: [30, 20, 50, 40, 60, 70, 80, 90, 100, 110, 120, 130],
        borderColor: '#FF6384',
        fill: false,
      },
      {
        label: 'ÇIKIŞ',
        data: [20, 10, 40, 30, 50, 60, 70, 80, 90, 100, 110, 120],
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  }

  const doughnutData = {
    labels: ['ALINAN', 'GELEN', 'KALAN'],
    datasets: [
      {
        label: 'Tutar',
        data: [12000, 18000, 22000],
        backgroundColor: ['#3aaf0c', '#1a9a9b', '#0a6865'],
        hoverBackgroundColor: ['#3aaf0c', '#1a9a9b', '#0a6865'],
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        title: { display: true, padding: 5 },
      },
    },
  }

  const barData = {
    labels: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ],
    datasets: [
      {
        label: 'Kar/Zarar (%)',
        data: [10, -5, 15, 8, -10, 12, -3, 7, -8, 20, -2, 18], // Aylık kar ve zarar oranları
        backgroundColor: (context) => {
          const index = context.dataIndex
          return context.dataset.data[index] > 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'
        },
        borderColor: (context) => {
          const index = context.dataIndex
          return context.dataset.data[index] > 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
        },
        borderWidth: 1,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`, // Yüzde formatında gösterim
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Legend'ı gizler
      },
    },
  }

  const items = Array.from({ length: 8 })

  return (
    <div className='flex flex-col gap-7 size-full'>
      <div className='flex flex-col xl:flex-row gap-7'>
        <div className='p-5 xl:w-[60%] h-[45vh] rounded-xl shadow-xl bg-white'>
          <p className='h-[10%] text-sm font-bold text-soento-green'>NAKİT AKIŞI</p>
          <div className='h-[90%]'>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className='xl:w-[40%] h-[45vh] rounded-xl shadow-xl bg-[#2f9590]'>
          <div className='flex flex-col h-full'>
            <div className='flex rounded-xl p-3 h-full bg-white'>
              <div className='flex flex-col w-1/2 p-3'>
                <span className='text-sm font-bold text-soento-green'>SATIŞ FATURALARI</span>
                <span className='text-xs font-semibold text-soento-green'>Son 30 Gün</span>

                <div className='flex flex-col mt-3'>
                  {items.map((_, index) => (
                    <div key={index} className={`flex justify-between p-1 ${index % 2 === 0 ? 'bg-gray-200' : ''}`}>
                      <span className='text-xs'>Çetin Elektrik A.Ş.</span>
                      <span className='text-xs font-bold text-green-800'>2.300 $</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col w-1/2 p-3'>
                <span className='text-sm font-bold text-soento-green'>ALIŞ FATURALARI</span>
                <span className='text-xs font-semibold text-soento-green'>Son 30 Gün</span>

                <div className='flex flex-col mt-3'>
                  {items.map((_, index) => (
                    <div key={index} className={`flex justify-between p-1 ${index % 2 === 0 ? 'bg-gray-200' : ''}`}>
                      <span className='text-xs'>Çetin Elektrik A.Ş.</span>
                      <span className='text-xs font-bold text-red-800'>2.300 $</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex p-4 text-white'>
              <div className='w-1/2 flex flex-col gap-2'>
                <div className='flex justify-between'>
                  <span className='text-sm font-semibold'>$ 12.500</span>
                  <span className='text-sm font-semibold'>ÖDENEN</span>
                </div>
                <div className='w-full rounded-3xl h-4 p-1 bg-gray-100'>
                  <div className='h-2 rounded-3xl bg-indigo-600' style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className='h-full mx-4 border border-gray-200'></div>
              <div className='w-1/2 flex flex-col gap-2'>
                <div className='flex justify-between'>
                  <span className='text-sm font-semibold'>$ 12.500</span>
                  <span className='text-sm font-semibold'>KALAN</span>
                </div>
                <div className='w-full rounded-3xl h-4 p-1 bg-gray-100'>
                  <div className='h-2 rounded-3xl bg-indigo-600' style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col xl:flex-row gap-7'>
        <div className='p-5 xl:w-[30%] h-[45vh] rounded-xl shadow-xl bg-white'>
          <p className='h-[10%] text-sm font-bold text-soento-green'>TOPLAM HARCAMALAR</p>
          <div className='h-[90%]'>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        <div className='p-5 xl:w-[70%] h-[45vh] rounded-xl shadow-xl bg-white'>
          <p className='h-[10%] text-sm font-bold text-soento-green'>AYIN KAR/ZARAR ANALİZİ</p>
          <div className='h-[90%]'>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
