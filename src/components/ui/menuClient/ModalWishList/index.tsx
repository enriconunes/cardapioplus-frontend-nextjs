import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import { ButtonAdd } from '../../ButtonAdd'
import { setupAPIClient } from '@/src/services/api'
import { ItemWishList } from '@/src/pages/cardapio'

// icons
import { FiImage } from 'react-icons/fi'
import { FaRegTrashAlt } from "react-icons/fa";


interface WishListProps{
    viewModalWishList: boolean,
    handleRemoveItem: (id: string) => void,
    handleIncrementQuantity: (id: string) => void,
    handleDecrementQuantity: (id: string) => void,
    handleViewModalWishList: () => void,
    wishItems: ItemWishList[]
}

export default function ModalWishList({viewModalWishList, wishItems, handleViewModalWishList, handleRemoveItem, handleDecrementQuantity, handleIncrementQuantity}: WishListProps){


    // loadin button control
    const [loading, setLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    async function handleSubmit(e:FormEvent){
        e.preventDefault()

        setLoading(true)

        try{

            setLoading(false)
            toast.success("Imagem de perfil atualizada.")

            // fechar modal
            handleViewModalWishList()            


        } catch(err){
            setLoading(false)
            toast.error("Erro ao atualizar imagem de perfil. Tente novamente.")
        }
        

        
    }

    const cancelButtonRef = useRef(null)

    return(
        <Transition.Root show={viewModalWishList} as={Fragment}>
            <Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={handleViewModalWishList}>
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
                            <h1 className='text-xl font-medium text-gray-700 mb-3'>Seu carrinho</h1>
                        
                            <div className='max-h-[320px] overflow-y-scroll'>

                                {/* item */}
                                {wishItems.length > 0 ? (
                                    wishItems.map(item => (
                                    <div
                                    key={item.idItem}
                                    className='bg-white rounded-md shadow-md p-2 mb-3 text-gray-700 flex min-w-[313px] md:min-w-[465px]'
                                    >
                                        {/* first col - name, description, price */}
                                        <div className='mr-2 w-4/5'>
                                            <span className='font-medium'>{item.name}</span>
                                            <p className='leading-4 text-sm text-gray-600'>{item.description}</p>
                                            <span className='text-sm'>R$ {item.price} (unid.)</span>
                                        </div>
                                        {/* secont col - quantity and trash */}
                                        <div className='flex flex-col justify-between items-end w-1/5'>
                                            <div className='bg-white rounded-md border flex border-gray-300'>

                                                <span
                                                className='w-5 h-6 flex justify-center items-center font-medium bg-gray-200 hover:cursor-pointer'
                                                onClick={() => handleDecrementQuantity(item.idItem)}
                                                >
                                                    -
                                                </span>

                                                <span className='w-5 h-6 flex justify-center items-center text-sm'>{item.quantity}</span>

                                                <span
                                                onClick={() => handleIncrementQuantity(item.idItem)}
                                                className='w-5 h-6 flex justify-center items-center font-medium bg-gray-200 hover:cursor-pointer'
                                                >
                                                    +
                                                </span>

                                            </div>
                                            <span
                                            onClick={() => handleRemoveItem(item.idItem)}
                                            className='py-1 flex justify-center w-[60px] bg-white rounded-md border border-gray-300 hover:cursor-pointer'
                                            >
                                                <FaRegTrashAlt />
                                            </span>
                                        </div>
                                    </div>
                                ))
                                ):(
                                    <div
                                    className='bg-white rounded-md shadow-md p-2 mb-3 text-gray-700 flex'>
                                        Você ainda não adicionou nenhum item ao seu pedido...
                                    </div>
                                )}
                                
                            </div>
                            <div className={`py-3 sm:flex md:justify-end sm:flex-row md:px-0 sm:px-6 w-full`}>

                            <ButtonAdd
                            loading={loading}
                            type='submit'>
                                Atualizar perfil
                            </ButtonAdd>

                            <button
                                type="button"
                                className="w-full py-2 border border-gray-600 text-gray-600 shadow-sm font-medium bg-gray-50 hover:bg-gray-100 flex justify-center mt-2 sm:mt-0 sm:w-auto md:px-3 md:ml-2 md:w-3/12"
                                ref={cancelButtonRef}
                                onClick={handleViewModalWishList}
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