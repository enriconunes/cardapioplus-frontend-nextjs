import logo from '../../../../public/logoWhite.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useContext } from 'react';
import { AuthContext } from '@/src/contexts/AuthContext';

// icons
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { GrRestaurant } from "react-icons/gr";

export default function Header(){

    // variavel do context
    const { signOut } = useContext(AuthContext)

    const [menuView, setMenuView] = useState(false)

    function handleMenuView(){
        setMenuView(!menuView)
    }

    return(
        <div>
            <div className="bg-gray-950 h-14 md:h-20 shadow-md flex items-center justify-between px-4">
                    
                {/* image logo */}
                <Link href={'/dashboard'} className=''>
                    <Image
                    src={logo}
                    alt='Logo Cardápio Plus'
                    className='w-36 -mb-2'
                    />
                </Link>

                <button
                onClick={handleMenuView}>
                    {menuView ? (
                        <IoMdClose
                        className='text-gray-200'
                        size={28}/>
                    ):
                    (
                        <IoMdMenu
                        className='text-gray-200'
                        size={30}/>
                    )}
                </button>

            </div>

            {/* hidden list */}
            <div className={`bg-white h-fit shadow-md flex items-center justify-between py-1 px-4 ${menuView ? "" : "hidden"} absolute w-full z-50 text-gray-600`}>
                    
                <ul className='w-full'>
                    <li>
                        <Link
                        href={"/dashboard"}
                        className='flex items-center justify-end gap-x-1 w-full py-2 border-b hover:text-red-700'
                        >
                            <span className='font-medium'>Seu restaurante</span>
                            <GrRestaurant 
                            className='' size={21}/>
                        </Link>
                    </li>
                    <li>
                        <Link
                        href={"/orders"}
                        className='flex items-center justify-end gap-x-1 w-full py-2 border-b hover:text-red-700'
                        >
                            <span className='font-medium'>Painel de pedidos</span>
                            <GrNotes
                            className='mt-1' size={19}/>
                        </Link>
                    </li>
                    <li>
                        <button
                        className='flex items-center justify-end gap-x-1 w-full py-2 hover:text-red-700'
                        onClick={signOut}>
                            <span className='font-medium'>Sair da sua conta</span>
                            <MdLogout
                            className='mt-1' size={20}/>
                        </button>
                    </li>
                </ul>

            </div>

        </div>

    )

}