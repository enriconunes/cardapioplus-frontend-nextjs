import { setupAPIClient } from "@/src/services/api"
import { useState, useEffect } from "react"
import Head from "next/head";
import Link from "next/link";

// components

// icons
import { MdDeliveryDining } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

export default function cardapio(){

    type MenuItem = {
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

type Schedule = {
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
    profileURL: string;
    createdAt: string;
    updatedAt: string;
    user_idUser: string;
    Schedule: Schedule;
    Menu: Menu;
}

    const apiClient = setupAPIClient()
    const [restaurant, setRestaraunt] = useState<Restaurant>()

    async function getData(){
        const response = await apiClient.get("/menuclient?id=8f6acf04-ebec-48cd-b298-8b1e5b27ff22")
        const responseData = response.data as Restaurant
        setRestaraunt(responseData)
    }

    useEffect(()=>{

        getData()
        
    }, [])

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
                <main className="rounded-t-xl -mt-5 flex flex-col items-center max-w-3xl md:mx-auto">

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
                            <button className="px-8 py-[3px] bg-green-700 text-white rounded-md mt-3 font-medium">
                                Ver horários
                            </button>
                        </div>

                        {/* second row */}
                        <div className="space-y-1 py-4">
                            <div className="flex items-center"><IoIosCall size={21}/> {restaurant?.contactNumber}</div>
                            <div className="flex items-center"><FaInstagram size={19}/> {restaurant?.instagramProfileName}</div>

                            <div
                            className={`flex items-center gap-x-1 text ${restaurant?.doDelivery ? "text-green-700" : "text-red-700"}`}
                            >
                                <MdDeliveryDining size={21}/> Delivery indisponível
                            </div> 
                        </div>

                    </div>

                    {/* categories listing */}
                    <div className="py-3 flex w-full font-medium overflow-scroll gap-x-2 text-red-700 px-2 md:no-scrollbar">
                        {restaurant?.Menu.Categories.map(category => (
                            <Link
                            href={`#${category.name}`}
                            key={category.idCategory}
                            className="border-2 border-red-700 px-3 rounded-md">{category.name}
                            </Link>
                        ))}
                    </div>

                    {/* category name and item listing */}
                    <div className="w-full px-4 flex flex-col">
                        
                        {/* cateogory name */}
                        <h3 className="font-medium text-2xl mt-3 mb-2">{restaurant?.Menu.Categories[0].name}</h3>

                        {/* items */}
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-3">

                            {/* item */}
                            <div className="flex md:gap-x-2">

                                {/* first col - image */}
                                <div className="w-1/4">
                                    <div className="w-20 h-20">
                                        <img src={`${restaurant?.Menu.Categories[0].Items[0].imageURL}`}
                                        alt={`Imagem ${restaurant?.Menu.Categories[0].Items[0].name}`}
                                        className="w-full h-full object-cover rounded-md hover:scale-110 duration-200 hover:rotate-2"
                                        />
                                    </div>
                                </div>

                                {/* second col - texts */}
                                <div className="w-3/4">
                                    {/* name */}
                                    <p className="text-lg font-medium">{restaurant?.Menu.Categories[0].Items[0].name}</p>
                                    {/* description */}
                                    <p className="leading-tight text-sm">{restaurant?.Menu.Categories[0].Items[0].description}</p>

                                    {/* price and add button */}
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-lg">R$ {restaurant?.Menu.Categories[0].Items[0].price}</span>
                                        <span className="bg-red-700 px-3 py-1 text-gray-100 rounded-md"><FaPlus  /></span>
                                    </div>
                                </div>

                            </div>

                            <div className="flex md:gap-x-2">

                                {/* first col - image */}
                                <div className="w-1/4">
                                    <div className="w-20 h-20">
                                        <img src={`${restaurant?.Menu.Categories[0].Items[1].imageURL}`}
                                        alt={`Imagem ${restaurant?.Menu.Categories[0].Items[1].name}`}
                                        className="w-full h-full object-cover rounded-md hover:scale-110 duration-200 hover:rotate-2"
                                        />
                                    </div>
                                </div>

                                {/* second col - texts */}
                                <div className="w-3/4">
                                    {/* name */}
                                    <p className="text-lg font-medium">{restaurant?.Menu.Categories[0].Items[1].name}</p>
                                    {/* description */}
                                    <p className="leading-tight text-sm">{restaurant?.Menu.Categories[0].Items[1].description}</p>

                                    {/* price and add button */}
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-lg">R$ {restaurant?.Menu.Categories[0].Items[1].price}</span>
                                        <span className="bg-red-700 px-3 py-1 text-gray-100 rounded-md"><FaPlus  /></span>
                                    </div>
                                </div>

                            </div>

                            <div className="flex md:gap-x-2">

                                {/* first col - image */}
                                <div className="w-1/4">
                                    <div className="w-20 h-20">
                                        <img src={`${restaurant?.Menu.Categories[0].Items[1].imageURL}`}
                                        alt={`Imagem ${restaurant?.Menu.Categories[0].Items[1].name}`}
                                        className="w-full h-full object-cover rounded-md hover:scale-110 duration-200 hover:rotate-2"
                                        />
                                    </div>
                                </div>

                                {/* second col - texts */}
                                <div className="w-3/4">
                                    {/* name */}
                                    <p className="text-lg font-medium">{restaurant?.Menu.Categories[0].Items[1].name}</p>
                                    {/* description */}
                                    <p className="leading-tight text-sm">{restaurant?.Menu.Categories[0].Items[1].description}</p>

                                    {/* price and add button */}
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-lg">R$ {restaurant?.Menu.Categories[0].Items[1].price}</span>
                                        <span className="bg-red-700 px-3 py-1 text-gray-100 rounded-md"><FaPlus  /></span>
                                    </div>
                                </div>

                            </div>

                            <div className="flex md:gap-x-2">

                                {/* first col - image */}
                                <div className="w-1/4">
                                    <div className="w-20 h-20">
                                        <img src={`${restaurant?.Menu.Categories[0].Items[1].imageURL}`}
                                        alt={`Imagem ${restaurant?.Menu.Categories[0].Items[1].name}`}
                                        className="w-full h-full object-cover rounded-md hover:scale-110 duration-200 hover:rotate-2"
                                        />
                                    </div>
                                </div>

                                {/* second col - texts */}
                                <div className="w-3/4">
                                    {/* name */}
                                    <p className="text-lg font-medium">{restaurant?.Menu.Categories[0].Items[1].name}</p>
                                    {/* description */}
                                    <p className="leading-tight text-sm">{restaurant?.Menu.Categories[0].Items[1].description}</p>

                                    {/* price and add button */}
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-lg">R$ {restaurant?.Menu.Categories[0].Items[1].price}</span>
                                        <span className="bg-red-700 px-3 py-1 text-gray-100 rounded-md"><FaPlus  /></span>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </main>
            </div> 

        </>
    )
}