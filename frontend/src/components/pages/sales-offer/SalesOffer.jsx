import '../../../styles/SalesOffer.css'
import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoMdAddCircle, HiOutlineTicket } from '../../../styles/icons'

function SalesOffer() {
  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için
  const [isRevise, setIsRevise] = useState(false) // Revize alınacak veri için

  const navigate = useNavigate()
  const location = useLocation()
  const isButtonActive = location.pathname === '/sales-offer/sales-process'

  const openModalForAdd = () => {
    setCurrentData(null)
    setIsRevise(false)
    setShowModal(true)

    if (!isButtonActive) {
      navigate('/sales-offer/sales-process')
    }
  }

  const subLinks = [
    { path: 'list', label: 'Liste' },
    { path: 'pending-jobs', label: 'Bekleyen İşler' },
    { path: 'sales-process', label: 'Satış Süreci' },
    { path: 'won-jobs', label: 'Kazanılan İşler' },
    { path: 'lost-jobs', label: 'Kaybedilen İşler' },
  ]

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <HiOutlineTicket className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Satış Teklif</p>
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
            <IoMdAddCircle className='text-lg' /> Yeni Satış
          </button>
        </div>
      </div>

      <Outlet context={[showModal, setShowModal, currentData, setCurrentData, isRevise, setIsRevise]} />
    </>
  )
}
export default SalesOffer
