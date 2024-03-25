// react and next
import { useContext, useState } from "react"
import Head from "next/head";
import Link from "next/link";

// icons
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";

// components
import Header from "@/src/components/ui/Header";
import Footer from "@/src/components/ui/Footer";
import { QRCodeComponent } from "@/src/components/ui/QRCode";
import { CollapseCategory } from "@/src/components/ui/CollapseCategory";
import { CollapseItem } from "@/src/components/ui/CollapseItem";

// context
import { AuthContext } from "@/src/contexts/AuthContext";

// api
import { setupAPIClient } from "@/src/services/api";

// server side functions
import { canSSRAuth } from "@/src/utils/canSSRAuth";

// data type from api.get('/restaurant')
type RestaurantRequest = {
  idRestaurant: string,
  name: string,
  address: string,
  contactNumber: string,
  instagramProfileName: string,
  doDelivery: number,
  profileURL: string,
  user_idUser: string,
  Schedule: {
    idSchedule: string,
    monIsOpen: boolean,
    tueIsOpen: boolean,
    wedIsOpen: boolean,
    thuIsOpen: boolean,
    friIsOpen: boolean,
    satIsOpen: boolean,
    sunIsOpen: boolean,
    monDescription: string,
    tueDescription: string,
    wedDescription: string,
    thuDescription: string,
    friDescription: string,
    satDescription: string,
    sunDescription: string,
    display: boolean,
  }
};

interface restaurantDetailsProps{
    restaurantDetails: RestaurantRequest
}

// data type from api.get('/menu')
type MenuRequest = {
    idMenu: string;
    Categories: Category[];
}

type Category = {
    idCategory: string;
    name: string;
    Items: Item[];
}

type Item = {
    idItem: string;
    name: string;
    description: string;
    price: string;
    imageURL: string;
    available: number;
    vegan: number;
}

interface menuProps{
    menuDetails: MenuRequest
}

// restaurantDetails é o nome definido no serverSideProps
// o valor retornado pela funcao deve ser recebido como parametro do componente
// e tambem deve ser tipado - o mesmo funciona para o menu
// recebe restaurantDetails e menu, cada um com sua interface
export default function dashboard({restaurantDetails, menuDetails}: restaurantDetailsProps & menuProps){

    // variavel do context
    const { user } = useContext(AuthContext)

    // define como array vazio se 'restaurantDetails' ainda nao existir ou estiver vazio
    const [restaurant, setRestaraunt] = useState(restaurantDetails || null)
    const [menu, setMenu] = useState(menuDetails || null)

    return(
        <>

            <Head>
                <title>
                    Área pessoal - Cardápio Plus
                </title>
            </Head>

            <Header/>

            <main className="px-3 max-w-2xl mx-auto">

                {/* restaurant details */}
                <div className="px-2 flex flex-col items-center justify-center md:bg-white md:shadow-md mx-auto bg-white rounded-md shadow-md mt-4">

                    <div className="w-full flex flex-col -space-y-2 mt-4 font-medium text-lg text-gray-700">
                        <span>Bem-vindo ao seu cardápio,</span>
                        <span>{user?.name}!</span>
                    </div>

                    {/* avatar profile */}
                    <div className="w-1/2 md:max-w-40 mt-5 rounded-full overflow-hidden border-4 border-gray-100">
                        <img
                        src={restaurant?.profileURL}
                        alt="Descrição da imagem"
                        className="w-full"
                        />
                    </div>

                    {/* descriptions */}
                    <div className="bg-blue-00 w-full flex flex-col mt-2 text-gray-800">

                        {/* restaurant name */}
                        <h1 className="text-center font-medium text-xl mb-1">{restaurant?.name}</h1>

                        <div className="flex flex-col mt-1 ">
                            <span className="font-medium -mb-1">Contato</span>
                            <span className="overflow-hidden text-sm text-gray-600">{restaurant?.contactNumber}</span>
                        </div>

                        <div className="flex flex-col mt-1">
                            <span className="font-medium -mb-1">Instagram</span>
                            <span className="overflow-hidden text-gray-600">@{restaurant?.instagramProfileName}</span>
                        </div>

                        <div className="flex flex-col mt-1 mb-1">
                            <span className="font-medium -mb-1">Endereço</span>
                            <span className="overflow-hidden text-gray-600 leading-tight">{restaurant?.address}</span>
                        </div>

                        {restaurant?.doDelivery === 1 ? (
                            <div className="flex items-center font-medium text-green-700">*Delivery disponível <MdDeliveryDining size={20} className="text-green-700 ml-1"/></div>
                        ):(
                            <div className="flex items-center font-medium text-red-700">*Delivery indisponível <MdDeliveryDining size={20} className="text-red-700 ml-1"/></div>
                        )}

                        {/* edit profile */}
                        <div className="w-full flex justify-end mt-2 mb-6">
                            <Link
                            href={"/edit"}
                            className="px-2 font-medium text-blue-900 border border-gray-300 w-fit"
                            >
                                Editar descrição
                            </Link>
                        </div>

                        <hr />
                        
                    </div>
                </div>

                {/* menu detail */}
                    <div className="text-gray-700 w-full mt-6">

                        {/* menu title */}
                        <div>
                            <h3 className="text-lg font-medium mb-3 text-center">Detalhes do cardápio</h3>
                        </div>
                        
                        {/* add new cateogory */}
                        <CollapseCategory/>

                        {/* begin of listing */}
                        {menu?.Categories.map(category => (
                            <div key={category.idCategory}>
                                {/* category name */}
                                <div>
                                    <h4 className="text-lg font-medium mt-3">{category.name}</h4>
                                </div>

                                <CollapseItem/>

                                {/* item card */}
                                {category.Items.map(item =>(
                                    <button
                                    key={item.idItem}
                                    className="flex items-center justify-between p-2 mt-3 bg-white w-full rounded-md shadow-md hover:cursor-pointer h-20">
                                    
                                        {/* image item */}
                                        <div className="w-20 h-full relative">
                                            <img
                                                src={item.imageURL}
                                                alt="menu item"
                                                className="absolute inset-0 w-full h-full object-cover rounded-md"
                                            />
                                        </div>

                                        {/* name and description */}
                                        <div className="w-8/12 h-full  -space-y-1 pl-2 flex flex-col justify-center">
                                            <div className="text-left font-medium truncate">{item.name}</div>
                                            <div className="text-left truncate leading-tight text-gray-600">{item.description}</div>
                                        </div>

                                        {/* edit icon */}
                                        <div className="w-2/12 h-full flex justify-end pr-2 items-center">
                                            <MdEdit size={21}/>
                                        </div>
                                    
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* qr code section */}
                    <QRCodeComponent
                    idUser={user?.idUser}
                    restaurantName={restaurant.name}
                    profileUrl={restaurant.profileURL}
                    />

            </main>

            <Footer />
        </>
    )
}


// as propriedades das fuções server side são executadas sempre que a pagina é carregada (antes de renderizar o front end), similar a um middleware
// a funcao abaixo é utilizada para conferir se o user ja está logado antes de renderizar a pagina de dashboard

export const getServerSideProps = canSSRAuth(async(ctx) => {

    const apiClient = setupAPIClient(ctx)

    const restaurantDetails = await apiClient.get('/restaurant')

    const menuDetails = await apiClient.get('/menu')

    return{
        props: {
            restaurantDetails: restaurantDetails.data,
            menuDetails: menuDetails.data
        }
    }
})