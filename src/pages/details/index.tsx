import { setupAPIClient } from "@/src/services/api"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"
import { useState } from "react"
import Link from "next/link"

// icons
import { MdDeliveryDining } from "react-icons/md"
import { FaCamera } from "react-icons/fa";

// components
import Header from "@/src/components/ui/Header"
import { FloatInput } from "@/src/components/ui/FloatInput"
import Footer from "@/src/components/ui/Footer"
import { Checkbox } from "@/src/components/ui/Checkbox"
import { ButtonAdd } from "@/src/components/ui/ButtonAdd"

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

export default function Details({restaurantDetails}: restaurantDetailsProps){

    const [restaurant, setRestaraunt] = useState(restaurantDetails || null)
    const [idRestaurant, setIdRestaurant] = useState(restaurant?.idRestaurant);
    const [name, setName] = useState(restaurant?.name);
    const [address, setAddress] = useState(restaurant?.address);
    const [contactNumber, setContactNumber] = useState(restaurant?.contactNumber);
    const [instagramProfileName, setInstagramProfileName] = useState(restaurant?.instagramProfileName);
    const [doDelivery, setDoDelivery] = useState(restaurant?.doDelivery);
    const [schedule, setSchedule] = useState(restaurant?.Schedule);

    // schedule data
    const [monDescription, setMonDescription] = useState(restaurant?.Schedule?.monDescription || '');
    const [monIsOpen, setMonIsOpen] = useState(restaurant?.Schedule?.monIsOpen || false);
    const [tueDescription, setTueDescription] = useState(restaurant?.Schedule?.tueDescription || '');
    const [tueIsOpen, setTueIsOpen] = useState(restaurant?.Schedule?.tueIsOpen || false);
    const [wedDescription, setWedDescription] = useState(restaurant?.Schedule?.wedDescription || '');
    const [wedIsOpen, setWedIsOpen] = useState(restaurant?.Schedule?.wedIsOpen || false);
    const [thuDescription, setThuDescription] = useState(restaurant?.Schedule?.thuDescription || '');
    const [thuIsOpen, setThuIsOpen] = useState(restaurant?.Schedule?.thuIsOpen || false);
    const [friDescription, setFriDescription] = useState(restaurant?.Schedule?.friDescription || '');
    const [friIsOpen, setFriIsOpen] = useState(restaurant?.Schedule?.friIsOpen || false);
    const [satDescription, setSatDescription] = useState(restaurant?.Schedule?.satDescription || '');
    const [satIsOpen, setSatIsOpen] = useState(restaurant?.Schedule?.satIsOpen || false);
    const [sunDescription, setSunDescription] = useState(restaurant?.Schedule?.sunDescription || '');
    const [sunIsOpen, setSunIsOpen] = useState(restaurant?.Schedule?.sunIsOpen || false);

    const [loading, setLoading] = useState(false)

    return(
        <>

            <Head>
                <title>
                    Detalhes do restaurante - Cardapio Plus
                </title>
            </Head>

            <Header />

            <main className="px-3 max-w-xl mx-auto">

                <div className="px-4 flex flex-col items-center justify-center md:px-8 md:bg-white md:shadow-md mx-auto bg-white rounded-md shadow-md mt-4">

                    <div className="w-full flex flex-col -space-y-2 mt-4 md:text-2xl text-xl text-gray-700 drop-shadow-md">
                        <span>Editar informações do restaurante</span>
                        <div className="w-full mt-10 pt-4 pb-1 md:pb-4">
                            <hr />
                        </div>
                    </div>

                    {/* avatar profile */}
                    <div className="relative w-4/6 md:max-w-48 mt-5 hover:cursor-pointer hover:brightness-90">
                        <div className="rounded-full overflow-hidden border-4 border-gray-100">
                            <img
                                src={restaurant?.profileURL}
                                alt="Imagem de perfil do restaurante"
                                className="w-full"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 mr-[13%] bg-white border-2 p-3 rounded-full">
                            <span className="text-gray-800 text-lg font-bold">
                                <FaCamera size={24}/>
                            </span>
                        </div>
                    </div>


                    {/* descriptions */}
                    <form className="bg-blue-00 w-full flex flex-col mt-6 text-gray-800 pb-4">

                        <FloatInput
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        >
                            Nome do restaurante
                        </FloatInput>

                        <FloatInput
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                        >
                            Endereço
                        </FloatInput>

                        <FloatInput
                        type="text"
                        id="contact"
                        value={contactNumber}
                        onChange={(e)=>setContactNumber(e.target.value)}
                        >
                            Número de telefone
                        </FloatInput>

                        <FloatInput
                        type="text"
                        id="instagram"
                        value={instagramProfileName}
                        onChange={(e)=>setInstagramProfileName(e.target.value)}
                        >
                            Perfil do Instagram
                        </FloatInput>

                        <div className="mb-2">
                            <Checkbox
                            checked={restaurant.doDelivery}>
                                Delivery disponível
                            </Checkbox>
                        </div>

                        <ButtonAdd
                        loading={loading}
                        type="submit"
                        >
                            Atualizar informações
                        </ButtonAdd>
                        
                    </form>
                </div>

                <div className="px-4 flex flex-col items-center justify-center md:px-8 md:bg-white md:shadow-md mx-auto bg-white rounded-md shadow-md mt-4">

                    <div className="w-full flex flex-col -space-y-2 mt-4 md:text-2xl text-xl text-gray-700 drop-shadow-md">
                        <span>Horários de funcionamento</span>
                        <div className="w-full mt-10 pt-4 pb-1 md:pb-4">
                            <hr />
                        </div>
                    </div>

                    {/* schedules */}
                    <form className="bg-blue-00 w-full flex flex-col mt-2 text-gray-800 pb-4">

                        <div className="text-gray-700">

                            <div>
                                <p
                                className="text-xl my-3">Segunda-feira</p>
                                <Checkbox checked={restaurant.Schedule.monIsOpen}>Aberto</Checkbox>
                                <FloatInput
                                value={restaurant.Schedule.monDescription}
                                id="mon">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p
                                className="text-xl my-3">Terça-feira</p>
                                <Checkbox checked={tueIsOpen}>Aberto</Checkbox>
                                <FloatInput
                                value={tueDescription}
                                id="tue">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p
                                className="text-xl my-3">Quarta-feira</p>
                                <Checkbox checked={wedIsOpen}>Aberto</Checkbox>
                                <FloatInput
                                value={wedDescription}
                                id="wed">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p
                                className="text-xl my-3">Quinta-feira</p>
                                <Checkbox checked={thuIsOpen}>Aberto</Checkbox>
                                <FloatInput
                                value={thuDescription}
                                id="thu">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p
                                className="text-xl my-3">Sexta-feira</p>
                                <Checkbox checked={friIsOpen}>Aberto</Checkbox>
                                <FloatInput
                                value={friDescription}
                                id="fri">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p
                                className="text-xl my-3">Sábado</p>
                                <Checkbox checked={satIsOpen}>Aberto</Checkbox>
                                <FloatInput
                                value={satDescription}
                                id="sat">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p
                                className="text-xl my-3">Domingo</p>
                                <Checkbox checked={sunIsOpen}>Aberto</Checkbox>
                                <FloatInput
                                value={sunDescription}id="sun">Descrição</FloatInput>
                            </div>

                            <ButtonAdd>
                                Salvar horários de funcionamento
                            </ButtonAdd>

                        </div>
                        
                    </form>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {

    const apiClient = setupAPIClient(ctx)

    const restaurantDetails = await apiClient.get('/restaurant')

    return{
        props: {
            restaurantDetails: restaurantDetails.data
        }
    }
})