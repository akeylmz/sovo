import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack, IoWarning } from '../../../../styles/icons'
import { Outlet, NavLink } from 'react-router-dom'

function Detail() {
  const navigate = useNavigate()
  //   const { id } = useParams()

  const subLinks = [
    { path: 'track-list', label: 'Bakım Kontrol Listesi' },
    { path: 'track-breakdown', label: 'Arıza Takip' },
    { path: 'track-maintenance', label: 'Bakım Takip' },
  ]

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full ps-2 pe-3 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => navigate('/operation-care')}
          >
            <IoMdArrowRoundBack className='text-lg' /> İşletme Bakım
          </button>
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
            onClick={null}
          >
            <IoWarning className='text-lg' /> Arıza Bildir
          </button>
        </div>
      </div>

      <Outlet />
    </>
  )
}
export default Detail
