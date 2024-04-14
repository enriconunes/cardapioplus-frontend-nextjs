import Head from "next/head"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { setupAPIClient } from "@/src/services/api"
import Link from "next/link"

// components
import Header from "@/src/components/ui/Header"
import Footer from "@/src/components/ui/Footer"
import { Checkbox } from "@/src/components/ui/Checkbox"

// icons
import { TbArrowsSort } from "react-icons/tb";
import { IoFilterSharp } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { space } from "postcss/lib/list"
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineOpenInNew } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";


interface OrderItem {
    id: number;
    quantity: number;
    idOrder: string;
    idItem: string;
    Item: {
        idItem: string;
        name: string;
        description: string;
        price: string;
        imageURL: string;
        available: number;
        vegan: number;
        createdAt: string;
        updatedAt: string;
        category_idCategory: string;
    };
}

interface Order {
    idOrder: string;
    number: number;
    typeOrder: string;
    totalPrice: string;
    statusOrder: boolean;
    note: string;
    table: string;
    clientContact: string;
    clientAddress: string;
    createdAt: string;
    updatedAt: string;
    idRestaurant: string;
    OrderItems: OrderItem[];
}

export default function Orders(){

    // useStates
    const [seeStoreOrders, setSeeStoreOrders] = useState(true)
    const [seeDeliveryOrders, setSeeDeliveryOrders] = useState(true)
    const [typeOrderParam, setTypeOrderParam] = useState("all")
    const [createdAtSort, setCreatedAtSort] = useState("DESC")
    const [statusOrderFilter, setStatusOrderFilter] = useState(1)
    const [seeFilters, setSeeFilters] = useState(false)

    const [orders, setOrders] = useState<Order[]>([])

    // change createdArSort - "DESC" or "ASC"
    function handleChangeCreatedAtSort(){
        if(createdAtSort === "DESC"){
            setCreatedAtSort("ASC")
        } else{
            setCreatedAtSort("DESC")
        }
    }

    // change createdArSort - "DESC" or "ASC"
    function handleChangeStatusOrderFilter(){
        if(statusOrderFilter === 1){
            setStatusOrderFilter(0)
        } else{
            setStatusOrderFilter(1)
        }
    }

    // change type order API param - "all", "store" or "delivery"
    function handleChangeFilter(){

        if(!seeDeliveryOrders && !seeStoreOrders){
            toast.warning("Selecione pelo menos um tipo de pedido para atualizar o filtro.")
            return
        }

        if(seeStoreOrders && !seeDeliveryOrders){
            setTypeOrderParam("store")
        } else if(!seeStoreOrders && seeDeliveryOrders){
            setTypeOrderParam("delivery")
        } else{
            setTypeOrderParam("all")
        }

        setSeeFilters(!seeFilters)
    }

    // receive orders from database
    async function getOrders(){
        try{
            const apiClient = setupAPIClient()
            const response = await apiClient.get(`/order?typeOrder=${typeOrderParam}&createdAt=${createdAtSort}&status=${statusOrderFilter}`)
            const data = response.data as Order[]
            setOrders(data)
        } catch(err){
            toast.error("Erro ao atualizar lista de pedidos")
            return
        }
    }

    // open google maps using the client address
    function handleOpenMaps(address) {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(url, '_blank');
    };
    
    // format the contact exibition
    function formatContact(contact) {
        if (!contact) return ''; // Retorna uma string vazia se o contato não estiver definido

        const rawValue = contact.replace(/\D/g, ''); // Remove tudo que não for número
        let formattedNumber = '';

        if (rawValue.length <= 2) {
            formattedNumber = rawValue;
        } else if (rawValue.length <= 6) {
            formattedNumber = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2)}`;
        } else if (rawValue.length <= 11) {
            formattedNumber = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7)}`;
        } else {
            formattedNumber = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7, 11)}`;
        }

        return formattedNumber;
    }

    // close an order
    async function handleCloseOrder(idOrder: string){

        try{
            const apiClient = setupAPIClient()
            await apiClient.put("/order", {
                idOrder: idOrder
            })

            await getOrders()
            toast.success("Pedido finalizado.")
        } catch(err){
            toast.error("Erro ao finalizar pedido: " + err)
            return
        }
    }

    useEffect(() => {

        const executeAndGetOrders = () => {
            getOrders();
        };

        // chamar a função pela primeira vez instantaneamente para so depois iniciar o ciclo
        executeAndGetOrders();

        // iniciar o temporizador para executar a função novamente após 3 segundos
        const intervalId = setInterval(executeAndGetOrders, 3500);

        // Limpar o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, [typeOrderParam, createdAtSort, statusOrderFilter]);


    return(
        <>

        <Head>
            <title>Restaurox - Painel de Pedidos</title>
        </Head>

        <Header />

        <main className="max-w-3xl mx-auto text-gray-800 min-h-screen">

            {/* title and filters */}
            <div className="p-4 md:pt-6 relative flex justify-center border-b">
                <h1 className="text-center font-medium text-xl md:text-2xl drop-shadow-md">Painel de pedidos</h1>


                <div className="flex justify-end absolute right-4">
                    <button
                    className=""
                    onClick={ () => setSeeFilters(!seeFilters) }
                    >
                        <CiFilter  size={27}/>
                    </button>
                </div>

                {/* filters */}
                <div className={`${seeFilters ? "flex" : "hidden"} z-40 absolute justify-start flex-wrap bg-white shadow-md p-3 w-64 right-0 top-12`}>
                    <div className="flex flex-col -space-y-1">
                        <Checkbox
                        checked={seeStoreOrders}
                        onChange={() => setSeeStoreOrders(!seeStoreOrders)}>
                            Pedidos no estabelecimento
                        </Checkbox>

                        <Checkbox
                        checked={seeDeliveryOrders}
                        onChange={() => setSeeDeliveryOrders(!seeDeliveryOrders)}>
                            Pedidos para delivery
                        </Checkbox>
                    </div>

                    <div className="w-full mt-2">
                        <div
                        className="flex items-center justify-center gap-x-1 border border-red-700 text-red-700 rounded-md px-2 py-1 hover:cursor-pointer"
                        onClick={handleChangeStatusOrderFilter}
                        >
                            {statusOrderFilter === 1 ? (
                                <span>Exibir pedidos em aberto</span>
                            ):(
                                <span>Exibir pedidos finalizados</span>
                            )}

                        </div>
                    </div>

                    <div className="w-full mt-2">
                        <div
                        className="flex items-center justify-center gap-x-1 border border-red-700 text-red-700 rounded-md px-2 py-1 hover:cursor-pointer"
                        onClick={handleChangeCreatedAtSort}
                        >
                            {createdAtSort === "DESC" ? (
                                <span>Mais recente primeiro</span>
                            ):(
                                <span>Mais antigo primeiro</span>
                            )}
                            <TbArrowsSort size={17}/>
                        </div>
                    </div>

                    <button
                    className="bg-red-700 ml-auto mt-2 px-3 text-white text-sm py-1 rounded-md hover:cursor-pointer"
                    onClick={ handleChangeFilter }
                    >
                        Aplicar
                    </button>
                </div>

            </div>

            {/* orders listing */}
            <div className="px-2 md:mt-5 md:flex md:flex-wrap md:justify-between">

                {orders?.length === 0 && (
                    <div className="flex flex-col w-fit mx-auto p-5 shadow-md rounded-md justify-center items-center mt-20 bg-white">
                        <span className="text-lg font-medium text-gray-600">Nenhum pedido foi encontrado...</span>
                        <span><GrInProgress size={40} className="animate-spin-slow text-gray-500 mt-4"/></span>
                    </div> 
                )}

                {/* order */}
                {orders?.map((order) => (
                    <div key={order.idOrder} className="flex flex-col bg-white rounded-md shadow-md pb-4 mb-4 text-gray-700 md:w-[49%] h-fit">

                        {/* first row - number and time */}
                        <div className="flex justify-between items-center bg-gray-900 px-2 py-1 rounded-t-md text-gray-50">
                            <div>
                                <span className="text-2xl font-bold">#{order.number}</span>
                            </div>
                            <div className="flex flex-col items-end font-medium -space-y-1 font-mono">
                                <span>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                                <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
                            </div>
                        </div>

                        {/* div just to padding x all divs*/}
                        <div className="px-3">
                            {/* second row- items listing */}
                            <div className="">
                                {order.OrderItems.map((item) => (

                                    // item
                                    <div key={item.idItem} className="flex gap-x-1 my-3 shadow-md border-sm p-2">

                                        {/* first column - amount */}
                                        <div className="text-lg font-medium leading-6">
                                            {item.quantity}x
                                        </div>

                                        {/* second column - name, description and price*/}
                                        <div className="flex flex-col">
                                            <span className="text-lg font-medium leading-6 mb-1">{item.Item.name}</span>
                                            <span className="text-gray-600">{item.Item.description}</span>
                                            <span className="font-medium text-gray-600">{item.Item.price} (unidade)</span>
                                        </div>

                                    </div>

                                ))}
                            </div>

                            {/* third row - client details*/}
                            {order.typeOrder === 'delivery' ? (
                                <div className="flex flex-col">
                                    <div
                                    className="text-lg font-medium w-full border border-gray-700 bg-gray-50 flex justify-center items-center gap-x-1 my-2 rounded-sm"
                                    >
                                        Pedido para delivery <MdDeliveryDining size={23}/>
                                    </div>

                                    {/* address */}
                                    <div className="flex flex-col -space-y-1">
                                        <span className="font-medium text-lg">Endereço:</span>
                                        <span
                                        className="text-blue-900 w-fit hover:cursor-pointer flex items-center gap-x-1"
                                        onClick={() => handleOpenMaps(order.clientAddress) }
                                        >{order.clientAddress} <MdOutlineOpenInNew/></span>
                                    </div>

                                    {/* contact */}
                                    <div className="flex flex-col -space-y-1">
                                        <span className="font-medium text-lg">Contato:</span>

                                        <div className="flex items-center gap-x-1">
                                            <Link
                                            href={`https://wa.me/+55${order.clientContact}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-900"
                                            >
                                                {formatContact(order.clientContact)}
                                            </Link>
                                            <FaWhatsapp />
                                        </div>

                                    </div>
                                </div>
                            ):(
                                <div className="flex flex-col">
                                    <div
                                    className="text-lg text-center font-medium w-full border border-gray-700 bg-gray-50 px-1 gap-x-1 my-2 rounded-sm"
                                    >
                                        Mesa {order.table}
                                    </div>
                                </div>
                            )}

                            {/* 4th row - description */}
                            {order.note !== '' && (
                                <div className="flex flex-col -space-y-1">
                                        <span className="font-medium text-lg">Observação do cliente:</span>
                                        <span>{order.note}</span>
                                </div>
                            )}

                            {/* total */}
                            <div className="flex flex-col -space-y-2 mt-1">
                                <span className="font-medium text-lg">Total: R${order.totalPrice}</span>
                                {order.typeOrder === 'delivery' && (
                                    <span className="text-gray-400">(Taxa de entrega inclusa)</span>
                                )}
                            </div>

                            {/* close order button */}
                            {order.statusOrder === true && (
                                <button
                                onClick={ () => handleCloseOrder(order.idOrder)}
                                className="bg-red-700 w-full text-gray-50 font-medium text-lg py-1 rounded-md mt-3 hover:cursor-pointer"
                                >
                                    Finalizar pedido
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                
            </div>

        </main>

        <Footer />

        </>
    )
}