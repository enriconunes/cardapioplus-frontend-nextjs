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

// components
import { FloatInput } from '../../FloatInput'
import { FloatInputContact } from '../../FloatInputContact'


interface WishListProps{
    viewModalWishList: boolean,
    totalPrice: string,
    doDelivery: number,
    deliveryFee: string,
    deliveryTime: string,
    idRestaurant: string,
    clearWishItems: () => void,
    handleRemoveItem: (id: string) => void,
    handleIncrementQuantity: (id: string) => void,
    handleDecrementQuantity: (id: string) => void,
    handleViewModalWishList: () => void,
    wishItems: ItemWishList[]
}

export default function ModalWishList({viewModalWishList, wishItems, totalPrice, handleViewModalWishList, handleRemoveItem, handleDecrementQuantity, handleIncrementQuantity, clearWishItems, doDelivery, deliveryFee, deliveryTime, idRestaurant}: WishListProps){


    // loadin button control
    const [loading, setLoading] = useState(false)

    // radio button selected - order type
    const [orderType, setOrderType] = useState("store");

    // input texts
    const [tableNumber, setTableNumber] = useState("")
    const [clientAddress, setClientAddress] = useState<any>(""); //<any> pois havia o erro Property 'length' does not exist on type 'never'.
    const [clientContact, setClientContact] = useState("")
    const [note, setNote] = useState("")

    // completing shopping cart 
    async function handleSubmit(e:FormEvent){
        e.preventDefault()

        if(orderType === 'store' && tableNumber === ''){
            toast.warning("Digite o número ou outra identificação da sua mesa para finalizar o pedido.")
            return
        }

        if(orderType === 'delivery'){

            if(clientAddress === ''){
                toast.warning("Digite o seu endereço para finalizar o pedido.")
                return
            }

            if(clientAddress.length > 100){
                toast.warning(`O seu endereço deve ter no máximo 100 caracteres e tem ${clientAddress.length}.`)
                return
            }

            if (clientContact.length > 45) {
                toast.warning(`O número para contato não pode ter mais do que 45 caracteres.`)
                return
            }

            const regex = /^[1-9]{2}9[0-9]{8}$/;

            if (!regex.test(clientContact)) {
                toast.warning(`O número para contato não tem o formato correto.`)
                return
            }
        }

        if(note.length > 255){
                toast.warning(`A observação deve ter no máximo 255 caracteres e tem ${note.length}.`)
                return
            }

        setLoading(true)

        try{

            // cria uma nova lista contendo apenas o id e a quantidade dos itens da lista
            const items = wishItems.map(item => ({
                idItem: item.idItem,
                quantity: item.quantity
            }));

            const apiClient = setupAPIClient()
            await apiClient.post('/order', {
                typeOrder: orderType,
                totalPrice: totalPrice,
                note: note,
                table: tableNumber,
                clientContact: clientContact,
                clientAddress: clientAddress,
                idRestaurant: idRestaurant,
                items: items
            })

            setLoading(false)

            toast.success("Pedido finalizado com sucesso!")

            // limpar campos do formulario
            setNote('')
            setClientContact('')
            setClientAddress('')
            setTableNumber('')

            // limpar lista de itens
            clearWishItems()

            // fechar modal
            handleViewModalWishList()            


        } catch(err){
            setLoading(false)
            toast.error("Erro ao finalizar pedido: " + err)
        }
        
    }

    // used to formating the input to client contact
    const handleChangeContactNumber = (value) => {
        setClientContact(value);
    };

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
                                    className='bg-white text-center rounded-md shadow-md p-2 mb-3 text-gray-700 flex'>
                                        O seu carrinho ainda está vazio... Adicione pelo menos um item para finalizar o pedido.
                                    </div>
                                )}
                                
                            </div>

                            {/* order options - input texts */}
                            {wishItems.length > 0 && (
                                <div className='w-full mt-2'>
                                    <div className="w-full flex flex-col">
                                        <label className="inline-flex items-center -mb-2">
                                            <input
                                            type="radio"
                                            className="form-radio text-green-500 outline-none"
                                            name="order"
                                            value="store"
                                            checked={orderType === "store"}
                                            onChange={(e) => setOrderType(e.target.value)}
                                            />
                                            <span className="ml-2">Fazer pedido no estabelecimento</span>
                                        </label>
                                        <label className={`inline-flex items-center mt-2 ${doDelivery === 0 ? "text-gray-400" : ""}`}>
                                            <input
                                            disabled={doDelivery === 0}
                                            type="radio" className="form-radio text-green-500 outline-none"
                                            name="order"
                                            value="delivery"
                                            checked={orderType === "delivery"}
                                            onChange={(e) => setOrderType(e.target.value)}
                                            />
                                            <span className="ml-2">
                                                Fazer pedido para delivery
                                                {doDelivery === 0 && (
                                                    <span> (indisponível)</span>
                                                )}
                                            </span>
                                        </label>
                                    </div>
                                    
                                    <div className='mt-3'>
                                        {orderType === "store" ? (
                                            <FloatInput
                                            type="text"
                                            id="table"
                                            value={tableNumber}
                                            onChange={(e) => setTableNumber(e.target.value)}
                                            >
                                                Digite o número da mesa
                                            </FloatInput>
                                        ):(
                                            <div>
                                                <div className='-mb-2'>
                                                    <FloatInput
                                                    type="text"
                                                    id="address"
                                                    value={clientAddress}
                                                    onChange={(e) => setClientAddress(e.target.value)}
                                                    >
                                                        Digite o seu endereço
                                                    </FloatInput>
                                                </div>

                                                <div>
                                                    <FloatInputContact
                                                        id="contact"
                                                        value={clientContact}
                                                        onChange={handleChangeContactNumber}
                                                    >
                                                        Digite um número para contato
                                                    </FloatInputContact>
                                                </div>
                                            </div>
                                        )}
                                        <div className='-mt-2'>
                                            <FloatInput
                                            type="text"
                                            id="note"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            >
                                                Adicionar observação (opcional)
                                            </FloatInput>
                                        </div>

                                        {orderType === "delivery" && (
                                            <div className='w-full text-center text-gray-600 -mt-2 mb-3 text-sm'>
                                                *Tempo médio de entrega: {deliveryTime} minutos
                                            </div>
                                        )}
                                        
                                    </div>

                                    <div className='text-gray-700'>
                                        {orderType === "store" ? (
                                            <div><span className='font-medium text-lg'>Total:</span> R$ {totalPrice}</div>
                                        ):(
                                            <div className='flex flex-col'>
                                                <span className='font-medium text-sm text-gray-500'>Subtotal:
                                                    <span className='font-normal'> R$ {totalPrice}</span>
                                                </span>
                                                <span className='font-medium text-sm text-gray-500'>Taxa de entrega:
                                                    <span className='font-normal'> R$ {deliveryFee}</span>
                                                </span>
                                                <span className='font-medium text-lg'>Total:
                                                    <span className='font-normal'> R$ {
                                                        (parseFloat(totalPrice) + parseFloat(deliveryFee)).toFixed(2)
                                                    }</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )}
                            

                            {/* buttons */}
                            <div className={`py-3 sm:flex md:justify-end sm:flex-row md:px-0 sm:px-6 w-full`}>

                                <button
                                    type="button"
                                    className="w-full md:w-1/2 whitespace-nowrap py-2 border border-gray-600 text-gray-600 shadow-sm font-medium bg-gray-50 hover:bg-gray-100 flex justify-center mb-2 md:mb-0 sm:mt-0 sm:w-auto md:px-3 md:mr-2"
                                    ref={cancelButtonRef}
                                    onClick={handleViewModalWishList}
                                    >
                                    <p>Voltar para o cardápio</p>
                                </button>

                                {wishItems.length > 0 && (
                                    <ButtonAdd
                                    loading={loading}
                                    type='submit'>
                                        Finalizar pedido
                                    </ButtonAdd>
                                )}

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