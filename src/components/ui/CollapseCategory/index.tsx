import React, { FormEvent, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { InputDashboard } from "../InputDashboard";
import { setupAPIClient } from "@/src/services/api";

import { toast } from "react-toastify";

import { ButtonAdd } from "../ButtonAdd";

interface categoryProps{
    updateMenu: () => Promise<void>
}

export function CollapseCategory({updateMenu}: categoryProps) {

    // controle do collapse
    const [isFormVisible, setIsFormVisible] = useState(false);
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleForm(e: FormEvent){

        e.preventDefault()

        if(category === ''){
            toast.warning("Digite o nome da categoria para adicioná-la.")
            return
        }

        setLoading(true) 

        try{

            const apiClient = setupAPIClient();
            await apiClient.post('/category', {
                name: category
            });

            // atualizar listagem do menu
            updateMenu()

            // fechar collapse
            toggleFormVisibility()
            
            setCategory('')
            setLoading(false)

            toast.success("Categoria adicionada com sucesso!")

        } catch(err){
            toast.error("Erro ao adicionar uma nova categoria. Tente novamente.")
        }

    }

    return (
        <div>
            <button
                className="flex items-center justify-between px-4 py-3 bg-white w-full rounded-md shadow-md hover:cursor-pointer"
                onClick={toggleFormVisibility}
            >
                <div>Adicionar nova categoria</div>
                <div> <MdOutlineAdd size={20}/> </div>
            </button>

            <form
                className={`flex flex-col items-center justify-between px-4 py-3 w-full bg-white shadow-md mt-1 rounded-b-md ${isFormVisible ? '' : 'hidden'}`}
                onSubmit={handleForm}
            >
                
                <InputDashboard
                type='text'
                placeholder="Digite o nome da categoria"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                />

                <ButtonAdd
                loading={loading}
                type="submit"
                />
            </form>
        </div>
    );
}
