// tipagem dos atributos
import { ReactNode, ButtonHTMLAttributes } from "react"
// icone de carregamento do botao
import { FaSpinner } from "react-icons/fa"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?:boolean //? indica que nao é obrigatorio
    children:ReactNode //valor passado dentro das tags (nome)
}

// valores passados como parametro ao usar o componente
export function Button({ loading, children, ...rest}: ButtonProps){

    return(
        <button
        className="p-2 mb-2 rounded-md bg-blue-900 text-gray-100 flex justify-center items-center hover:brightness-150 transition duration-700"
        disabled={loading}
        {...rest}
        >
            {loading ? (
            <FaSpinner className="animate-spin" color="#FFF" size={20}/>
            ) : (
            <a>
                {children}
            </a>
        )} 
        </button>
    )

}   