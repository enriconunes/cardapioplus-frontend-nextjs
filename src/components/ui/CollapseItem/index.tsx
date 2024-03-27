import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify"

// api config
import { setupAPIClient } from "@/src/services/api";

// icons
import { MdOutlineAdd } from "react-icons/md";
import { FiImage } from "react-icons/fi";

// components
import { Checkbox } from "../Checkbox";
import { InputDashboard } from "../InputDashboard";
import { ButtonAdd } from "../ButtonAdd";

// lidar com o envio do input file
import { ChangeEvent } from "react";

interface itemProps{
    idCategory: string
    updateMenu: () => Promise<void>;
}

export function CollapseItem({ idCategory, updateMenu }: itemProps) {

    // collapse controller
    const [isFormVisible, setIsFormVisible] = useState(false);

    // text area counter caracter
    const [textCount, setTextCount] = useState(0)
    const [textAreaWaring, setTextAreaWarnig] = useState('')

    // image preview controller
    // preview temporario
    const [imageURL, setImageURL] = useState('')
    // file para enviar para a rota
    const [image, setImage] = useState(null)

    // loading button
    const [loading, setLoading] = useState(false)

    // form values
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [isVegan, setIsVegan] = useState(false)
    const [isAvaliable, setIsAvaliable] = useState(true)

    function handleTextArea(text: string){

        // atualizar description
        setDescription(text)

        setTextCount(text.length)

        if(textCount < 150){
            setTextAreaWarnig('text-green-600')
        }
        if(textCount >= 150 && textCount < 200){
            setTextAreaWarnig('text-yellow-600')
        }
        if(textCount >= 200){
            setTextAreaWarnig('text-red-600')
        }
    }

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    // funcao para receber imagem do formulario
    // recebe um event 'e' do tipo HTMLInputElement
    function handleFile(e: ChangeEvent<HTMLInputElement>){

        // se nao tiver uma imagem, nao faz nada
        if(!e.target.files){
            return;
        }

        const imageFile = e.target.files[0]

        if(!imageFile){
            return;
        }

        // conferir tipo da imagem
        if(imageFile.type === 'image/png' || imageFile.type === 'image/jpeg'){

            // file para enviar para API
            setImage(imageFile)

            // definir url do file para preview temporário
            setImageURL(URL.createObjectURL(e.target.files[0]))

        } else{
            toast.warning("Insira uma imagem com formato válido (jpeg ou png).")
            return;
        }
    }

    async function handleSubmit(e: FormEvent){

        e.preventDefault();

        if(name === '' || price === '' || description === '' || image === null){
            toast.warning("Preecha todos os dados para adicionar um novo item.")
            return
        }

        if(textCount > 255){
            toast.warning("A descrição ultrapassa o limite de caracteres. Reduza o tamanho do texto para continuar.")
            return
        }

        try{

            // iniciar loading
            setLoading(true)

            // criar estrutura para enviar para a rota que recebe um multipart form
            // por ser multipart form, necessariamente precisa ter a estrutura FormData
            const data = new FormData();

            data.append('name', name);
            data.append('description', description);
            data.append('price', price);
            data.append('avaliable', isAvaliable ? '1' : '0'); // converter para string
            data.append('vegan', isVegan ? '1' : '0'); // converter para string
            data.append('idCategory', idCategory);
            data.append('image', image);

            const apiClient = setupAPIClient();

            await apiClient.post('/item', data);

            // limpar campos do formulario
            setName('')
            setPrice('')
            setDescription('')
            setImage(null)
            setImageURL('')
            setTextCount(0)

            // desativar loading
            setLoading(false)

            // fechar formulario
            toggleFormVisibility()

            // funcao que atualiza useState do menu para atualizar a listagem
            // definida no dashboard e passada para este componente como parametro
            updateMenu()
        
            toast.success("Item adicionado com sucesso!")

            return

        } catch(error){
            toast.error("Oops! Erro ao cadastrar produto: " + error)
        }

    }

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
                onSubmit={handleSubmit}
            >
                <label className="h-32 text-gray-600 bg-white w-full mb-2 border border-gray-300 flex flex-col justify-center items-center hover:cursor-pointer overflow-hidden mt-1">

                            {!imageURL && (
                                <div className="flex flex-col items-center z-50 absolute text-gray-500">
                                {/* icone */}
                                <span><FiImage></FiImage></span>

                                <span
                                className="text-sm"
                                >
                                Adicionar imagem
                                </span>
                            </div> 
                            )}
                              
                            <input type="file" accept="image/png image/jpeg" className="hidden" onChange={handleFile}/>

                            {/* so exibe se imageURL deixar de ser null */}
                            {imageURL && (
                                <img
                                src={imageURL}
                                alt="Imagem do produto"
                                className="w-full"
                                />
                            )}
                            
                </label>

                <InputDashboard
                type='text'
                placeholder="Digite o nome do item"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />

                <InputDashboard
                type='number'
                step={0.01}
                placeholder="Digite o preço"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                />

                <div className="w-full h-fit ">
                    <textarea
                    placeholder="Digite a descrição"
                    rows={3}
                    className="border border-gray-300 w-full p-2 placeholder:text-gray-600 focus:ring-0 resize-none"
                    value={description}
                    onChange={(e)=>handleTextArea(e.target.value)}
                    />
                    <p className={`w-full text-right -mt-1 text-xs font-medium ${textAreaWaring}`}>{textCount}/255</p>
                </div>

                <Checkbox
                defaultChecked={isVegan}
                onChange={()=>{setIsVegan(!isVegan)}}>
                    Item vegano
                </Checkbox>

                <Checkbox
                defaultChecked={isAvaliable}
                onChange={()=>{setIsAvaliable(!isAvaliable)}}>
                    Está disponível
                </Checkbox>
                        
                <ButtonAdd
                type='submit'
                loading={loading}
                />

            </form>
        </div>
    );
}
