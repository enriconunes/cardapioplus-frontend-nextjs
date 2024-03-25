// importar tipagem dos atributos do input
import { InputHTMLAttributes } from "react"

// Tipar atributos que podem ser recebidos ao usar o component
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input({...rest}: InputProps){
    return(
        <input 
        {...rest}
        className="bg-slate-50 bg-opacity-90 p-2 mb-3 rounded-md text-gray-500 font-medium placeholder:text-gray-500 placeholder:font-medium border-none"
        />
    )
}