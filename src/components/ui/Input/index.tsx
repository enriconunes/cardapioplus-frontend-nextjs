// importar tipagem dos atributos do input
import { InputHTMLAttributes } from "react"

// Tipar atributos que podem ser recebidos ao usar o component
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input({...rest}: InputProps){
    return(
        <input 
        {...rest}
        className="bg-opacity-90 p-2 mb-3 rounded-sm text-gray-500 font-medium ring-1 ring-gray-600 focus:ring-red-700 placeholder:text-gray-500 placeholder:font-medium border-none"
        />
    )
}