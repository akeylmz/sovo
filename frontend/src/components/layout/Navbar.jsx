import Logo from '/NewLogo.png'
import { jwtDecode } from 'jwt-decode'
import { AiOutlineUser, HiOutlineLogout } from '../../styles/icons'
import { useState } from 'react'
import '../../styles/Modal.css'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import ProfileImage from '/Profile.png'

function Navbar() {
  const [showUserModal, setShowUserModal] = useState(false)

  return (
    <div className='block md:hidden flex-none h-12 bg-soento-white'>
      <div className='relative flex flex-row justify-between items-center px-3 size-full rounded-br-3xl bg-soento-green text-white'>
        <button className='flex justify-center items-center h-full w-12' onClick={() => setShowUserModal(true)}>
          <AiOutlineUser className='text-2xl' />
        </button>

        <img src={Logo} alt='logo' className='h-8' />

        <button className='flex justify-center items-center h-full w-12' onClick={() => setShowUserModal(true)}>
          <HiOutlineLogout className='text-2xl' />
        </button>

        {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}
      </div>
    </div>
  )
}

function UserModal({ onClose }) {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login' // Redux state temizlemek için
  }

  return createPortal(
    <>
      <motion.div
        className='modal-backdrop'
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        style={{ zIndex: '1010' }}
      ></motion.div>

      <div className='modal-content'>
        <div className='flex flex-col items-center gap-4 p-5 min-w-60'>
          <div className='h-24'>
            <img src={ProfileImage} alt='profile' className='h-full' />
          </div>

          <div className='flex flex-col items-center'>
            <p className='text-center font-semibold'>
              {jwtDecode(localStorage.getItem('token')).name} {jwtDecode(localStorage.getItem('token')).surname}
            </p>
            <p>{jwtDecode(localStorage.getItem('token')).is_admin ? 'Admin' : 'Kullanıcı'}</p>
          </div>

          <button
            className='flex items-center justify-between gap-3 px-4 py-2 rounded-lg bg-soento-green text-white'
            onClick={handleLogout}
          >
            Oturumu Kapat <HiOutlineLogout className='text-xl' />
          </button>
        </div>
      </div>
    </>,
    document.body
  )
}

export default Navbar
