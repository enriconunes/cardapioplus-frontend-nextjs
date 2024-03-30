import logo from '../../../../public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdLogout } from "react-icons/md";


import { useState, useContext } from 'react';
import { AuthContext } from '@/src/contexts/AuthContext';

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
            <div className={`bg-white h-14 md:h-20 shadow-md flex items-center justify-between px-4 ${menuView ? "" : "hidden"}`}>
                    
                <ul>
                    <li>
                        <button
                        className='flex items-center gap-x-1'
                        onClick={signOut}>
                            Sair da sua conta
                            <MdLogout
                            className='mt-1'/>
                        </button>
                    </li>
                </ul>

            </div>

        </div>

    )

}