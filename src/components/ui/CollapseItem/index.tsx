import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

// components
import { Checkbox } from "../Checkbox";

export function CollapseItem() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div>
            <button
                className="flex items-center justify-between px-4 py-3 bg-white w-full rounded-md shadow-md hover:cursor-pointer"
                onClick={toggleFormVisibility}
            >
                <div>Adicionar novo item</div>
                <div> <MdOutlineAdd size={20}/> </div>
            </button>

            <form
                className={`flex flex-col items-center justify-between px-4 py-3 w-full bg-white shadow-md mt-1 rounded-b-md ${isFormVisible ? '' : 'hidden'}`}
            >
                <input
                    type="text"
                    placeholder="Digite o nome do item"
                    className="border w-full p-2 placeholder:text-gray-600"
                />

                <input
                    type="text"
                    placeholder="Digite a descrição"
                    className="border w-full p-2 placeholder:text-gray-600 mt-2"
                />

                <input
                    type="number"
                    placeholder="Digite o preço"
                    className="border w-full p-2 placeholder:text-gray-600 mt-2"
                />

                <select
                className="border w-full p-2 placeholder:text-gray-600 mt-2"
                name="" id="">
                    <option value="">Selecione a categoria</option>
                    <option value="">Massa</option>
                </select>

                <input type="file" name="" id="" className="border w-full p-2 placeholder:text-gray-600 mt-2"/>

                <Checkbox />

                <button
                    type="submit"
                    className="w-full mt-2 py-2 border border-green-600 text-green-600 shadow-sm font-medium bg-green-50 hover:bg-green-100"
                >
                    Adicionar
                </button>

            </form>
        </div>
    );
}
