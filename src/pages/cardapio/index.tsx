import { setupAPIClient } from "@/src/services/api"
import { useState, useEffect } from "react"
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// components
import Footer from "@/src/components/ui/Footer";
import ModalWishList from "@/src/components/ui/menuClient/ModalWishList";
import { ModalSchedule } from "@/src/components/ui/menuClient/ModalSchedule";

// icons
import { MdDeliveryDining } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { LuVegan } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";


type MenuItem = {
    idItem: string;
    name: string;
    description: string;
    price: string;
    imageURL: string;
    avaliable: number;
    vegan: number;
    createdAt: string;
    updatedAt: string;
    category_idCategory: string;
}

type MenuCategory = {
    idCategory: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    menu_idMenu: string;
    Items: MenuItem[];
}

type Menu = {
    idMenu: string;
    createdAt: string;
    updatedAt: string;
    restaurant_idRestaurant: string;
    Categories: MenuCategory[];
}

export type Schedule = {
    idSchedule: string;
    monIsOpen: boolean;
    tueIsOpen: boolean;
    wedIsOpen: boolean;
    thuIsOpen: boolean;
    friIsOpen: boolean;
    satIsOpen: boolean;
    sunIsOpen: boolean;
    monDescription: string;
    tueDescription: string;
    wedDescription: string;
    thuDescription: string;
    friDescription: string;
    satDescription: string;
    sunDescription: string;
    display: boolean;
    createdAt: string;
    updatedAt: string;
    restaurant_idRestaurant: string;
}

type Restaurant = {
    idRestaurant: string;
    name: string;
    address: string;
    contactNumber: string;
    instagramProfileName: string;
    doDelivery: number;
    deliveryFee: string;
    profileURL: string;
    createdAt: string;
    updatedAt: string;
    user_idUser: string;
    Schedule: Schedule;
    Menu: Menu;
}

export type ItemWishList = {
    idItem: string;
    name: string;
    description: string;
    price: string;
    vegan: number;
    quantity: number
}

export default function cardapio(){

    const apiClient = setupAPIClient()
    const router = useRouter();

    const [restaurant, setRestaraunt] = useState<Restaurant>()
    const [wishItems, setWishItems] = useState<ItemWishList[]>([])
    const [itemsCount, setItemsCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState("")

    const [viewModalWishList, setViewModalWishList] = useState(false)
    const [viewModalSchedule, setViewModalSchedule] = useState(false)

    // fetch para receber menu do restaurante atraves do id
    async function getData(id: string){
        const response = await apiClient.get(`/menuclient?id=${id}`)
        const responseData = response.data as Restaurant
        setRestaraunt(responseData)
    }

    // somar a quantidade de itens do carrinho
    function counterItems(){
        let sum = 0
        for(let cnt = 0; cnt < wishItems.length; cnt++){
            sum += wishItems[cnt].quantity
        }
        return sum
    }

    // somar o valor total do carrinho
    // o valor é retornado como string pois não será feito operaçoes com ele
    function sumTotal(){
        let sum = 0
        for(let cnt = 0; cnt < wishItems.length; cnt++){
            sum += (parseFloat(wishItems[cnt].price) * wishItems[cnt].quantity)
        }
        return sum.toFixed(2); // limital o valor a duas casas decimais
    }

    // adicionar novo item na lista
    function handleAddItem(item: MenuItem) {

        // Verificar se o item já existe na lista
        const itemExists = wishItems.find(wishItem => wishItem.idItem === item.idItem);

        if (itemExists) {
            // Se o item já existir na lista, incrementar a quantidade
            const updatedWishItems = wishItems.map(wishItem => {
                if (wishItem.idItem === item.idItem) {
                    return { ...wishItem, quantity: wishItem.quantity + 1 };
                }
                return wishItem;
            });

            setWishItems(updatedWishItems);

            } else {
                // Se o item não existir na lista, adicionar o novo item
                const newItem: ItemWishList = {
                    idItem: item.idItem,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    vegan: item.vegan,
                    quantity: 1
                };
                setWishItems(prevItems => [...prevItems, newItem]);
            }
    }

    // remover item da lista a partir do id
    function handleRemoveItem(itemIdToRemove: string) {
        // filtrar os itens para remover o item com o ID correspondente
        const updatedWishItems = wishItems.filter(item => item.idItem !== itemIdToRemove);
        // atualizar o estado com a nova lista de itens
        setWishItems(updatedWishItems);
    }

    // alterar visibilidade do modal - Carrinho de compras
    function handleViewModalWishList(){
        setViewModalWishList(!viewModalWishList)
    }

    // alterar visibilidade do modal - Horarios de funcionamento
    function handleViewModalSchedule(){
        setViewModalSchedule(!viewModalSchedule)
    }

    // incrementar quantidade de um item a partir do id
    function handleIncrementQuantity(itemIdToIncrement: string) {
        // cria uma cópia do array de itens
        const updatedWishItems = wishItems.map(item => {
            // verifica se o item atual corresponde ao ID fornecido
            if (item.idItem === itemIdToIncrement) {

                // incrementa a quantidade do item atual
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            // Se o item não corresponder ao id fornecido, retorna sem alterações
            return item;
        });
        // atualiza o estado com a nova lista de itens
        setWishItems(updatedWishItems);
    }

    // decrementar quantidade de um item a partir do id
    function handleDecrementQuantity(itemIdToDecrement: string) {
        // cria uma cópia do array de itens
        const updatedWishItems = wishItems.map(item => {
            // verifica se o item atual corresponde ao id fornecido
            if (item.idItem === itemIdToDecrement) {

                // garantir que a quantidade nao será menor ou igual a 0
                // se a quantidade for 1, entao retorna o item sem nenhuma alteracao
                if(item.quantity === 1){
                    return item;
                }

                // Decrementar a quantidade do item atual
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            // se o item não corresponder ao id fornecido, retorna sem alterações
            return item;
        });
        // atualiza o estado com a nova lista de itens
        setWishItems(updatedWishItems);
    }

    // limpar lista de itens
    function clearWishItems(){
        setWishItems([])
    }

    // carregar menu do restaurante
    useEffect(() => {
        // recuperação do id da URL
        const id = router.query.id as string;
        if (id) {
            getData(id);
        }

    }, [router.query.id]); // executado quando o id na URL for alterado

    // atualizar quantidade de itens e o preco total
    useEffect(() => {
        // atualização do itemsCount
        setItemsCount(counterItems());

        // atualizacao do preco
        setTotalPrice(sumTotal())
    }, [wishItems]); // executado quando o estado wishItems for alterado

    return(

        <>
            
            <Head>
                <title>{"Cardápio Digita - " + restaurant?.name}</title>
            </Head>

            
            {/* body */}
            <div className="w-full text-gray-700">
                {/* banner */}
                <div className="w-full h-36 bg-banner bg-cover bg-center">
                    
                </div>
 
                {/* main content */}
                <main className="rounded-t-lg bg-gray-50 md:bg-transparent -mt-2 flex flex-col items-center max-w-3xl md:mx-auto">

                    {/* avatar image */}
                    <div className="w-40 -mt-20 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-gray-100">
                        <img
                        src={restaurant?.profileURL}
                        alt="Imagem de perfil do restaurante"
                        className="w-full h-full object-cover"
                        />
                    </div>

                    {/* description */}
                    <div className="w-full px-4 pt-2 font-medium">

                        {/* first row*/}
                        <div className="flex flex-col items-center">
                            {/* name */}
                            <h1 className="text-2xl font-medium">{restaurant?.name}</h1>
        
                            {/* address */}
                            <div>
                                <p className="text-center">{restaurant?.address}</p>
                            </div>

                            {/* schedule */}
                            <button
                            onClick={ handleViewModalSchedule }
                            className="px-8 py-[3px] bg-green-700 text-white rounded-md mt-3 font-medium"
                            >
                                Ver horários
                            </button>
                        </div>

                        {/* second row */}
                        <div className="space-y-1 py-4">
                            <div className="flex items-center"><IoIosCall className="mr-1" size={21}/> {restaurant?.contactNumber}</div>
                            <div className="flex items-center"><FaInstagram className="mr-2" size={19}/> {restaurant?.instagramProfileName}</div>

                            <div
                            className={`flex items-center gap-x-1 text ${restaurant?.doDelivery ? "text-green-700" : "text-red-700"}`}
                            >
                                <MdDeliveryDining size={21}/> {restaurant?.doDelivery ? "Delivery disponível" : "Delivery Indisponível"}`
                            </div> 
                        </div>

                    </div>

                    {/* categories listing - scroll*/}
                    <div className="py-3 flex w-full font-medium overflow-x-scroll gap-x-2 text-red-700 px-2 md:no-scrollbar">
                        {restaurant?.Menu.Categories.map(category => (
                            <Link
                            href={`#${category.name}`}
                            key={category.idCategory}
                            className="border-2 border-red-700 px-3 rounded-md">{category.name}
                            </Link>
                        ))}
                    </div>

                    {/* category name and item listing */}
                    {restaurant?.Menu.Categories.map((category) => (
                        <div key={category.idCategory + "2"} className="w-full px-4 flex flex-col">
                        
                            {/* cateogory name */}
                            <h3 id={category.name} className="font-medium text-2xl mt-3 mb-2">{category.name}</h3>

                            {/* items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-3">

                                {/* item listing */}
                                {category.Items.map((item) => (

                                    <div key={item.idItem} className="flex gap-x-2 bg-white md:p-3 p-2 rounded-md shadow-md">

                                        {/* first col - image */}
                                        <div className="w-1/4">
                                            <div className="w-20 h-20">
                                                <img src={`${item.imageURL}`}
                                                alt={`Imagem ${item.name}`}
                                                className="w-full h-full object-cover rounded-md hover:scale-110 duration-200 hover:rotate-2"
                                                />
                                            </div>
                                        </div>

                                        {/* second col - texts */}
                                        <div className="w-3/4">
                                            {/* name */}
                                            <span className="text-lg font-medium leading-5 mb-[2px] flex items-center gap-x-2">{item.name}</span>
                                                
                                            {/* description */}
                                            <div className="min-h-8 pb-1">
                                                <p className="leading-tight text-sm">{item.description}</p>
                                            </div>

                                            {/* price and add button */}
                                            <div className="flex justify-between items-center pt-1">
                                                
                                                {item.avaliable === 0 ? (
                                                    <span className="font-medium text-red-700">Indisponível</span>
                                                ):(
                                                    <span className="font-medium text-gray-600 text-base">R$ {item.price}</span>
                                                )}

                                                <div className="flex gap-x-2">
                                                    {item.vegan === 1 && (
                                                        <span
                                                        className="border border-green-700 px-3 text-green-700 rounded-md flex items-center justify-center gap-x-1 font-medium text-sm">
                                                            Vegano <LuVegan  />
                                                        </span>
                                                    )}
                                                    
                                                    {item.avaliable === 1 && (
                                                        <button
                                                        onClick={() => handleAddItem(item)}
                                                        className="bg-red-700 px-3 py-1 text-gray-100 rounded-md hover:cursor-pointer hover:scale-110 flex items-center justify-center transition-colors duration-200 focus:outline-none active:bg-green-700">
                                                            <FaPlus  />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>                                            
                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>
                    ))}

                </main>

                <footer className="w-full bg-gray-950 h-32 mt-12 flex flex-col items-center">
                    <div className="mt-5">
                        <Image src="/logoWhite.png" alt="Logo Restaurox" width={120} height={50} />
                    </div>
                    <div>
                        <span className="text-gray-100">Crie o seu cardápio digital!</span>
                    </div>
                </footer>

                {/* wishlist - carrinho de compras */}
                <div
                onClick={()=>handleViewModalWishList()}
                className="w-full fixed bottom-0 rounded-t-md bg-red-700 h-10 flex items-center justify-center text-gray-100 font-medium z-20 hover:cursor-pointer"
                >
                    <span>Seu carrinho ({itemsCount})</span> <FaShoppingCart className="ml-2" size={15}/>
                </div>

                <ModalWishList
                handleViewModalWishList={handleViewModalWishList}
                wishItems={wishItems}
                totalPrice={totalPrice}
                doDelivery={restaurant?.doDelivery}
                deliveryFee={restaurant?.deliveryFee}
                idRestaurant={restaurant?.idRestaurant}
                viewModalWishList={viewModalWishList}
                handleRemoveItem={handleRemoveItem}
                handleDecrementQuantity={handleDecrementQuantity}
                handleIncrementQuantity={handleIncrementQuantity}
                clearWishItems={clearWishItems}
                />

                <ModalSchedule
                schedule={restaurant?.Schedule}
                handleViewModalSchedule={handleViewModalSchedule}
                viewModalSchedule={viewModalSchedule}
                />
            </div> 

        </>
    )
}