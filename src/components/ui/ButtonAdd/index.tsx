import { FaSpinner } from "react-icons/fa"
import { ButtonHTMLAttributes } from "react"

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean
}

export function ButtonAdd({children, loading, ...rest}: buttonProps){
    
    return(

        <button
            className="w-full py-2 text-gray-100 shadow-sm font-medium bg-red-700 rounded-sm hover:bg-red-800 flex items-center justify-center"
            disabled={loading}
            {...rest}
        >
            {loading ? (
            <FaSpinner className="animate-spin" color="#f7f8f9" size={23}/>
            ) : (
            <a>
                {children}
            </a>
        )} 
        </button>

    )

}