import '../../../styles/OperationCare.css'
import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { IoMdAddCircle, GrVmMaintenance, IoWarning } from '../../../styles/icons'
import MaintenanceModal from './maintenance/MaintenanceModal'
import { addOperationCare } from '../../../store/slices/operationCareSlice'

function OperationCare() {
  const dispatch = useDispatch()

  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [showBreakdownModal, setShowBreakdownModal] = useState(false)

  const handleSubmitMaintenance = (maintenance) => {
    dispatch(addOperationCare(maintenance))
  }

  const subLinks = [
    { path: 'maintenance', label: 'İşletme Bakım' },
    { path: 'breakdown', label: 'Arıza Takip' },
    { path: 'invoices', label: 'Faturalar' },
  ]

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <GrVmMaintenance className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>İşletme Bakım</p>
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
            onClick={() => setShowBreakdownModal(true)}
          >
            <IoWarning className='text-lg' /> Arıza Bildir
          </button>
          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 my-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => setShowMaintenanceModal(true)}
          >
            <IoMdAddCircle className='text-lg' /> Bakım Başlat
          </button>
        </div>
      </div>

      {showMaintenanceModal && (
        <MaintenanceModal onSubmit={handleSubmitMaintenance} onClose={() => setShowMaintenanceModal(false)} />
      )}

      {showBreakdownModal && (
        // <BreakdownModal onSubmit={handleSubmitBreakdown} onClose={() => setShowBreakdownModal(false)} />
        <div></div>
      )}

      <Outlet />
    </>
  )
}
export default OperationCare
