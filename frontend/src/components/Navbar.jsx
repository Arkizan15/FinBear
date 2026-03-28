import { NavLink } from 'react-router-dom'

function Navbar() {
    return(
        <nav className='flex items-center justify-between px-8 py-4 bg-[#DDD786]'>
            <div className='flex items-center gap-2'>
                <img src="/logo.png" alt="FinBear" className='w-11 h-11 rounded-full'/>
                <span style={{ fontFamily: "'Press Start 2P', cursive" }} className='text-xs text-white'>FinBear</span>
            </div>
            <div className='flex gap-8'>
                <NavLink to='/' className='text-white text-lg nav-link'>Home</NavLink>
                <NavLink to='/belajar' className='text-white text-lg nav-link'>Belajar</NavLink>
                <NavLink to='/keuangan' className='text-white text-lg nav-link'>Keuangan</NavLink>
            </div>  
            <div className='flex items-center gap-2'>
                <img src="/coin.png" alt="coin" className='h-8 w-8'/>
                <span className='text-white'>0</span>
            </div>
        </nav>
    )
}

export default Navbar;