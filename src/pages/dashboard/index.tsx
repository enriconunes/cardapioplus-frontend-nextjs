// react and next
import { useContext, useState } from "react"
import Head from "next/head";
import Link from "next/link";

// icons
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

// components
import Header from "@/src/components/ui/Header";
import Footer from "@/src/components/ui/Footer";
import { QRCodeComponent } from "@/src/components/ui/QRCode";
import { CollapseCategory } from "@/src/components/ui/CollapseCategory";
import { CollapseItem } from "@/src/components/ui/CollapseItem";
import { CategoryEdition } from "@/src/components/ui/CategoryEdition";
import { ItemDashboard } from "@/src/components/ui/ItemDashboard";

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

export type Item = {
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

    // usada ao adicionar um novo item ou categoria para atualizar a listagem do menu
    // funcao passada como parametro para os componentes CollapseItem e CollapseCategory
    async function updateMenu(){
        const apiClient = setupAPIClient()
        const menuDetails = await apiClient.get('/menu')
        const menu = menuDetails.data as MenuRequest
        setMenu(menu)
    }

    return(
        <>

            <Head>
                <title>
                    Restaurox - Seu Restaurante
                </title>
                <link rel="icon" href="/logoFavIcon.png" />
            </Head>

            <Header/>

            <main className="px-3 max-w-xl mx-auto">

                {/* restaurant details */}
                <div className="flex flex-col items-center justify-center md:bg-white md:shadow-md mx-auto rounded-md shadow-md mt-4">

                    <div className="w-full flex flex-col -space-y-2 p-4 rounded-t-md text-xl font-medium text-gray-100 drop-shadow-md bg-banner">
                        <span>Bem-vindo ao seu cardápio,</span>
                        <span className="mb-4">{user?.name}!</span>

                    </div>

                    <div className="px-4 md:px-8 w-full flex flex-col items-center justify-center">

                    {/* avatar profile */}
                    <div className="w-40 h-40 md:w-48 md:h-48 mt-5 rounded-3xl overflow-hidden border-4 bg-gray-100 border-gray-100">
                        <img
                        src={restaurant?.profileURL}
                        alt="Imagem de perfil do restaurante"
                        className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col items-center text-gray-700 mt-3">
                        {/* name */}
                        <h1 className="text-xl font-medium">{restaurant?.name}</h1>
    
                        {/* address */}
                        <div>
                            <p className="text-center">{restaurant?.address}</p>
                        </div>
                    </div>

                    {/* descriptions */}
                    <div className="bg-blue-00 w-full flex flex-col mt-3 text-gray-800">

                        <div className="flex items-center font-medium text-gray-700"><IoIosCall className="mr-1" size={21}/> {restaurant?.contactNumber}</div>

                        <div className="flex items-center font-medium text-gray-700"><FaInstagram className="mr-2" size={19}/> {restaurant?.instagramProfileName}</div>

                        <div
                        className={`flex items-center font-medium gap-x-1 text ${restaurant?.doDelivery ? "text-green-700" : "text-red-700"}`}
                        >
                            <MdDeliveryDining size={21}/> {restaurant?.doDelivery ? "Delivery disponível" : "Delivery Indisponível"}`
                        </div> 

                        {/* edit profile */}
                        <div className="w-full flex justify-end mt-2 mb-6">
                            <Link
                            href={"/details"}
                            className="bg-red-700 px-3 py-1 text-gray-100 rounded-md hover:cursor-pointer flex items-center justify-center transition-colors duration-200 focus:outline-none active:bg-green-700"
                            >
                                Editar descrição
                            </Link>
                        </div>

                        <hr />
                        
                    </div>
                    </div>
                </div>

                {/* menu detail */}
                    <div className="text-gray-700 w-full mt-6">

                        {/* menu title */}
                        <div>
                            <h3 className="text-lg font-medium mb-3 text-center">Detalhes do cardápio</h3>
                        </div>


                        {menu?.Categories?.length == 0 && (
                            <div className="items-center font-medium text-cyan-600 w-full justify-center py-2 border border-cyan-600  shadow-sm bg-cyan-50 px-3  sm:w-auto md:mx-0 mt-2 mb-3">Seu cardápio ainda está vazio. Comece adicionando uma nova categoria de alimentos para cadastrar os produtos do seu restaurante.</div>
                        )}
                        
                        {/* add a new cateogory */}
                        <CollapseCategory updateMenu={updateMenu}/>

                        {/* begin of list */}
                        {menu?.Categories?.map(category => (
                            <div key={category.idCategory}>
                                
                                {/* category name and update button */}
                                <CategoryEdition
                                nameCategory={category.name}
                                idCategory={category.idCategory}
                                updateMenu={updateMenu}
                                />

                                {/* create a new item */}
                                <CollapseItem
                                idCategory={category.idCategory} 
                                updateMenu={updateMenu}
                                />

                                {/* item card */}
                                {category.Items.map(item =>(
                                    <ItemDashboard
                                    key={item.idItem}
                                    item={item}
                                    updateMenu={updateMenu}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* qr code section */}
                    <QRCodeComponent
                    idUser={restaurant.user_idUser}
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

    let restaurantDetails;
    let menuDetails;

    try{
        restaurantDetails = await apiClient.get('/restaurant')
        menuDetails = await apiClient.get('/menu')
    } catch(err){
        // Definir restaurantDetails e menuDetails como vazio em caso de erro
        restaurantDetails = {}
        menuDetails = {}
    }

    return{
        props: {
            restaurantDetails: restaurantDetails.data || {},
            menuDetails: menuDetails.data || {}
        }
    }
})