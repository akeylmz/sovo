import '../../../styles/Stock.css'
import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { IoMdAddCircle, BiSave } from '../../../styles/icons'

function Stock() {
  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  const openModalForAdd = () => {
    setCurrentData(null)
    setShowModal(true)
  }

  const subLinks = [
    { path: 'overview', label: 'Genel Bakış' },
    { path: 'products', label: 'Ürünler' },
    { path: 'stores', label: 'Depolar' },
    { path: 'orders', label: 'Siparişler' },
    { path: 'statistic', label: 'İstatistik' },
  ]

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <BiSave className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Stok Durum (Demo)</p>
        </div>
        <div className='flex gap-2 rounded-full pl-5 pr-1.5 bg-soento-green'>
          <div className='nav-links flex gap-2'>
            {subLinks.map((item, index) => (
              <NavLink key={index} to={item.path}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 my-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={openModalForAdd}
          >
            <IoMdAddCircle className='text-lg' /> Ekle
          </button>
        </div>
      </div>

      <Outlet />

      {/* <Outlet context={[showModal, setShowModal, currentData, setCurrentData]} /> */}
    </>
  )
}
export default Stock
