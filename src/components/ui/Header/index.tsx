import logo from '../../../../public/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Header(){

    return(
        <div className="bg-gray-950 h-14 md:h-20 shadow-md flex items-center px-4">
                
                {/* image logo */}
                <Link href={'/dashboard'} className=''>
                    <Image
                    src={logo}
                    alt='Logo Cardápio Plus'
                    className='w-36 -mb-2'
                    />
                </Link>

        </div>
    )

}