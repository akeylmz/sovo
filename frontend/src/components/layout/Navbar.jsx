import Logo from '/NewLogo.png'
import { IoSearch, AiOutlineUser } from '../../styles/icons'

function Navbar() {
  return (
    <div className='block md:hidden flex-none h-12 bg-soento-white'>
      <div className='flex flex-row justify-between items-center px-3 size-full rounded-br-3xl bg-soento-green text-white'>
        <button className='flex justify-center items-center h-full w-12'>
          <IoSearch className='text-2xl' />
        </button>

        <img src={Logo} alt='logo' className='h-8' />

        <button className='flex justify-center items-center h-full w-12'>
          <AiOutlineUser className='text-2xl' />
        </button>
      </div>
    </div>
  )
}
export default Navbar
