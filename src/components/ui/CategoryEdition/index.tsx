import { FaCheck } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/src/services/api";

import { ModalCategory } from "../ModalCategory";

interface CategoryProps{
    nameCategory: string
    idCategory: string
    updateMenu: () => Promise<void>
}

export function CategoryEdition({nameCategory, idCategory, updateMenu}: CategoryProps){

    const [name, setName] = useState(nameCategory)
    const [viewForm, setViewForm] = useState(false)
    const [viewModal, setViewModal] = useState(false)

    function handleView(){
        setViewForm(!viewForm)
    }

    function handleViewModal(){
        setViewModal(!viewModal)
    }

    function handleDelete(){
        setViewModal(true)
    }

    async function handleSubmit(e:FormEvent){
        e.preventDefault()

        if(name === ''){
            toast.warning("Digite um nome válido para a categoria.")
            return
        }

        if(name.length > 45){
            toast.warning("O nome da categoria não pode ter mais do que 45 caracteres.")
            return
        }

        try{
            const apiClient = setupAPIClient();
            await apiClient.put('/category', {
                idCategory: idCategory,
                newName: name
            });

            // atualizar listagem do menu
            updateMenu()

            // fechar formulario
            handleView()

            toast.success("Categoria alterada com sucesso!")

        } catch(err){
            toast.error("Erro ao alterar categoria. Tente novamente.")
        }

    }

    return(
        <div className="md:mt-6 md:mb-2">
            <div className={`mt-3 flex items-center gap-x-2`}>
                <h4 className="text-lg font-medium">{nameCategory}</h4>
                <button onClick={handleView}><label htmlFor="name"><FaEdit className="text-blue-900 hover:text-blue-700 hover:cursor-pointer"/></label></button>
            </div>

            <form
            onSubmit={handleSubmit}
            className={`flex gap-x-1 mb-3 ${viewForm ? "" : "hidden"}`}
            > 

                <input
                type="text"
                value={name}
                className="border border-gray-300 w-full p-2 placeholder:text-gray-600 focus:ring-0"
                onChange={(e)=>setName(e.target.value)}
                id="name"/>

                <button
                type="submit"
                className="border h-11 px-3 border-green-600 text-green-600 shadow-sm font-medium bg-green-50 hover:bg-green-100"
                >
                    <FaCheck />
                </button>

                <span
                className="border h-11 px-3 border-red-600 text-red-600 shadow-sm font-medium bg-red-50 hover:bg-red-100 flex justify-center items-center"
                onClick={handleDelete}>
                    <FaRegTrashCan />
                </span>

                {viewModal && (
                    <ModalCategory idCategory={idCategory} nameCategory={nameCategory} updateMenu={updateMenu} viewModal={viewModal} handleViewModal={handleViewModal}/>
                )}

            </form>

        </div>
    )

}