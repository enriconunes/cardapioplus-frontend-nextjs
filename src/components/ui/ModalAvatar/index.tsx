import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import { ButtonAdd } from '../ButtonAdd'
import { setupAPIClient } from '@/src/services/api'

// icons
import { FiImage } from 'react-icons/fi'

interface AvatarProps{
    lastImageURL: string,
    viewModalAvatar: boolean,
    handleViewModalAvatar: () => void,
    updateProfileDescriptions: () => Promise<void>
}

export default function ModalAvatar({lastImageURL, viewModalAvatar, handleViewModalAvatar, updateProfileDescriptions}: AvatarProps){

    // preview temporario
    const [imageURL, setImageURL] = useState(lastImageURL)
    // file para enviar para a rota
    const [image, setImage] = useState(null)

    // loadin button control
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e:FormEvent){
        e.preventDefault()

        if(!image){
            toast.warning("Selecione uma nova imagem para atualizar o perfil.")
            return
        }

        setLoading(true)

        try{

            // por ser multipart form, necessariamente precisa ter a estrutura FormData
            const data = new FormData();
            data.append('image', image);

            const apiClient = setupAPIClient()
            apiClient.put('/avatarProfile', data)

            setLoading(false)
            toast.success("Imagem de perfil atualizada.")

            // fechar modal
            handleViewModalAvatar()            

            // atualizar exibicao das informacoes do restaurante
            updateProfileDescriptions()

        } catch(err){
            setLoading(false)
            toast.error("Erro ao atualizar imagem de perfil. Tente novamente.")
        }
        

        
    }

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

    const cancelButtonRef = useRef(null)

    return(
        <Transition.Root show={viewModalAvatar} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleViewModalAvatar}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <form
                        className={`flex flex-col items-center justify-between px-4 py-3 w-full shadow-md mt-1 rounded-b-md`}
                        onSubmit={handleSubmit}
                        >
                        <label className="max-h-64 text-gray-600 bg-white w-full mb-2 border border-gray-300 flex flex-col justify-center items-center hover:cursor-pointer overflow-hidden mt-1">

                            <div className="flex flex-col items-center z-50 absolute text-white text-opacity-80">
                            {/* icone */}
                            <span><FiImage size={45}></FiImage></span>

                            </div>

                            <input type="file" accept="image/png image/jpeg" className="hidden" onChange={handleFile} />

                            {/* so exibe se imageURL deixar de ser null */}
                            {imageURL && (
                            <img
                                src={imageURL}
                                alt="Imagem do produto"
                                className="w-full"
                            />
                            )}

                        </label>

                        <div className={`py-3 sm:flex md:justify-end sm:flex-row md:px-0 sm:px-6 w-full`}>

                        <ButtonAdd
                        loading={loading}
                        type='submit'>
                            Atualizar perfil
                        </ButtonAdd>

                        <button
                            type="button"
                            className="w-full py-2 border border-gray-600 text-gray-600 shadow-sm font-medium bg-gray-50 hover:bg-gray-100 flex justify-center mt-2 sm:mt-0 sm:w-auto md:px-3"
                            ref={cancelButtonRef}
                            onClick={handleViewModalAvatar}
                        >
                            Cancelar
                        </button>
                        </div>

                        </form>
                        
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>

            
            </Transition.Root>
    )
}