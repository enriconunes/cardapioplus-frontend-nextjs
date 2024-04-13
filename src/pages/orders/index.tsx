import Head from "next/head"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { setupAPIClient } from "@/src/services/api"

// components
import Header from "@/src/components/ui/Header"
import Footer from "@/src/components/ui/Footer"
import { Checkbox } from "@/src/components/ui/Checkbox"

// icons
import { TbArrowsSort } from "react-icons/tb";
import { IoFilterSharp } from "react-icons/io5";
import { space } from "postcss/lib/list"

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

    async function getOrders(){
        const apiClient = setupAPIClient()
        const response = await apiClient.get(`/order?typeOrder=${typeOrderParam}&createdAt=${createdAtSort}`)
        const data = response.data as Order[]
        setOrders(data)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {

            getOrders()
            console.log(`/order?typeOrder=${typeOrderParam}&createdAt=${createdAtSort}`)

        }, 1500);

        return () => clearInterval(intervalId); // limpar o intervalo quando o componente é desmontado

    }, [typeOrderParam, createdAtSort]);

    return(
        <>

        <Head>
            <title>Restaurox - Novos Pedidos</title>
        </Head>

        <Header />

        <main className="max-w-3xl mx-auto text-gray-800">

            {/* title and filters */}
            <div className="p-4 md:pt-6">
                <h1 className="text-center font-medium text-xl md:text-2xl pb-4 drop-shadow-md border-b">Novos pedidos</h1>


                <div className="w-full flex justify-end">
                    <button
                    className=""
                    onClick={ () => setSeeFilters(!seeFilters) }
                    >
                        <IoFilterSharp size={27}/>
                    </button>
                </div>

                {/* filters */}
                <div className={`${seeFilters ? "flex" : "hidden"} justify-start flex-wrap bg-white shadow-md p-3 w-64 ml-auto`}>
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
                        className="flex items-center justify-center gap-x-1 border border-green-700 text-green-700 rounded-md px-2 py-1 hover:cursor-pointer"
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
                    className="bg-green-700 ml-auto mt-2 px-3 text-white text-sm py-1 rounded-md hover:cursor-pointer"
                    onClick={ handleChangeFilter }
                    >
                        Aplicar
                    </button>
                </div>

            </div>

            {/* orders listing */}
            <div>
                {orders?.map((order) => (
                    <div key={order.idOrder} className="flex flex-col bg-red-100 mb-4">
                        <span>Numero {order.number}</span>
                        <span>Tipo {order.typeOrder}</span>
                        <span>Obs.: {order.note}</span>
                        <span>Hora {order.createdAt}</span>
                    </div>
                ))}
                
            </div>

        </main>

        </>
    )
}