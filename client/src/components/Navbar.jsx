import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import GlobalContext from '../context/GlobalContext';
import AuthContext from '../context/AuthContext';
import UIContext from '../context/UIContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, setUser, axios } = useContext(AuthContext)
    const { setShowUserLogin } = useContext(UIContext)
    const { navigate } = useContext(GlobalContext);
    const [ open, setOpen ] = useState(false)

    const logout = async ()=> {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.success) {
                toast.error(data.message)
                setUser(null);
                navigate('/');
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }        
    }

  return (
    <nav>
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to='/' onClick={()=> setOpen(false)} className='flex items-center justify-between py-5 font-medium'>
                <img className="h-18" src={assets.logo} alt="Logo" />
                {/* <p className="text-lg text-gray-700">SUCESSO</p> */}
            </NavLink>

            {/* Desktop Menu */}
            <ul className="hidden sm:flex gap-5 text-md text-gray-700">
                <NavLink to='/' className='flex flex-col items-center gap-1' >
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
                <NavLink  to='/products' className='flex flex-col items-center gap-1' >
                    <p>PRODUTOS</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>            
                <NavLink  to='/contact' className='flex flex-col items-center gap-1' >
                    <p>CONTATO</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
          
            </ul>

            {/* Desktop Menu */}
            <div className="flex items-center gap-6">
                {!user ? 
                    (
                        <button
                            onClick={()=> setShowUserLogin(true)} 
                            className="cursor-pointer px-8 py-2 bg-primary-dull hover:bg-primary transition text-white rounded-full"
                        >
                            Acessar
                        </button>
                    ) : (
                        <>
                           <div className='relative group'>
                              <div className='flex items-center gap-2 cursor-pointer'>
                                {user && <p className='hidden sm:block text-sm text-gray-600'>{user.name}</p>}
                                <img className='w-5' src={assets.profile_icon} alt="" />
                              </div>
                              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10'>
                                <ul className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                    <li onClick={() => navigate('contact')} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Meu Profile</li>
                                    <li onClick={() => navigate('admin/login')} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Admin</li>
                                    <li onClick={() => navigate('my-orders')} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Pedidos</li>
                                    <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                                </ul>
                              </div>
                           </div>
                           <Link to='/cart' className='relative' >
                                <img src={assets.nav_cart_icon} className='w-7 min-w-7' alt="" />
                                <p className='absolute -top-4 right-[-5px] botton-[-5px] w-5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[12px]'>{''}</p>
                           </Link>
                        </>
                )}

                {/* ------ Sidebar menu for small Screens ------- */}
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                        {/* Menu Icon SVG */}
                        <img src={assets.menu_icon}  className="w-5 cursor-pointer sm:hidden" alt="menu" />
                </button>

                {/* Mobile Menu */}
                {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                      <div onClick={()=>setOpen(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                          <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                          <p>Back</p>
                      </div>
                      <NavLink to='/' onClick={()=> setOpen(false)}>Home</NavLink>
                      <NavLink to='/collection' onClick={()=> setOpen(false)}>All product</NavLink>
                      {user && 
                          <NavLink to='/my-orders' onClick={()=> setOpen(false)}>My Orders</NavLink>
                      }
                      <NavLink to='/admin' onClick={()=> setOpen(false)}>Admin</NavLink>
                      <NavLink to='/contact' onClick={()=> setOpen(false)}>Contact</NavLink>

                      {!user ? (
                          <button 
                              onClick={()=> {setOpen(false); ()=> setShowUserLogin(true);}} 
                              className="cursor-pointer px-6 py-2 mt-2 bg-primary-dull hover:bg-primary transition text-white rounded-full text-sm"
                          >
                              Acessar
                          </button>
                      ) : (
                          <button
                              onClick={logout} 
                              className="cursor-pointer px-6 py-2 mt-2 bg-primary-dull hover:bg-primary transition text-white rounded-full text-sm">
                              Sair
                          </button>
                      )}
                </div>
                )}                
            </div>

      </div>
      
    </nav>
  )
}

export default Navbar
