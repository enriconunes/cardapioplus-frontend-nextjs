import { FaSpinner } from "react-icons/fa"
import { ButtonHTMLAttributes } from "react"

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean
}

export function ButtonAdd({children, loading, ...rest}: buttonProps){
    
    return(

        <button
            className="w-full py-2 border border-green-600 text-green-600 shadow-sm font-medium bg-green-50 hover:bg-green-100 flex items-center justify-center"
            disabled={loading}
            {...rest}
        >
            {loading ? (
            <FaSpinner className="animate-spin" color="#16a34a" size={23}/>
            ) : (
            <a>
                {children}
            </a>
        )} 
        </button>

    )

}