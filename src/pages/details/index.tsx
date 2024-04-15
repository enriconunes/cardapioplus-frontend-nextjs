import { setupAPIClient } from "@/src/services/api"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"
import { useState } from "react"
import Link from "next/link"
import { FormEvent } from "react"
import { toast } from "react-toastify"

// icons
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

// components
import Header from "@/src/components/ui/Header"
import { FloatInput } from "@/src/components/ui/FloatInput"
import Footer from "@/src/components/ui/Footer"
import { Checkbox } from "@/src/components/ui/Checkbox"
import { ButtonAdd } from "@/src/components/ui/ButtonAdd"
import ModalAvatar from "@/src/components/ui/ModalAvatar"

// data type from api.get('/restaurant')
type RestaurantRequest = {
  idRestaurant: string,
  name: string,
  address: string,
  contactNumber: string,
  instagramProfileName: string,
  doDelivery: boolean,
  deliveryFee: string,
  deliveryTime: string,
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
    const [name, setName] = useState(restaurant?.name);
    const [address, setAddress] = useState(restaurant?.address);
    const [contactNumber, setContactNumber] = useState(restaurant?.contactNumber);
    const [instagramProfileName, setInstagramProfileName] = useState(restaurant?.instagramProfileName);
    const [doDelivery, setDoDelivery] = useState(restaurant?.doDelivery);
    const [deliveryFee, setDeliveryFee] = useState(restaurant?.deliveryFee);
    const [deliveryTime, setDeliveryTime] = useState(restaurant?.deliveryTime);
    const [profileURL, setProfileURL] = useState(restaurant?.profileURL)

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

    // loading button control
    const [loading, setLoading] = useState(false)
    // loading uptade profile avatar
    const [loadingAvatar, setLoadingAvatar] = useState(false)

    // modal avatar control
    const [viewModalAvatar, setViewModalAvatar] = useState(false)

    function handleViewModalAvatar(){
        setViewModalAvatar(!viewModalAvatar)
    }

    async function handleFormDescriptions(e:FormEvent){
        e.preventDefault()

        if(name === '' || contactNumber === '' || address === '' || instagramProfileName === ''){
            toast.warning("Preencha todos os campos para atualizar as informações.")
            return
        }

        if(name.length > 45){
            toast.warning("O nome não pode ter mais do que 45 caracteres.")
            return
        } else if(address.length > 100){
            toast.warning("O endereço não pode ter mais do que 100 caracteres.")
            return
        } else if(contactNumber.length > 45){
            toast.warning("O número de telefone não pode ter mais do que 45 caracteres.")
            return
        } else if(instagramProfileName.length > 45){
            toast.warning("O perfil do instagram não pode ter mais do que 45 caracteres.")
            return
        } else if(deliveryFee.length > 10){
            toast.warning("O valor da taxa de entrega não pode ultrapassar 10 caracteres.")
            return
        } else if(deliveryTime.length > 5){
            toast.warning("O tempo da entrega em minutos não pode ser descrito por mais de 5 caracteres.")
            return
        } 

        setLoading(true)

        try{

            const apiClient = setupAPIClient();
            await apiClient.put('/restaurant', {
                name: name,
                address: address,
                contactNumber: contactNumber,
                instagramProfileName: instagramProfileName,
                doDelivery: doDelivery,
                deliveryFee: deliveryFee,
                deliveryTime: deliveryTime
            });

            setLoading(false)
            toast.success("Informações atualizadas com sucesso!")

        } catch(err){
            toast.error("Erro ao atualizar informações. Tente novamente.")
            setLoading(false)
        }
    }

    // atualizar exibicao da imagem de perfil quando ela for trocada
    // adiciona um atraso de 1 segundo para que a nova imagem seja atualizada no server
    async function updateProfileDescriptions() {

    setLoadingAvatar(true)

    setTimeout(async () => {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/restaurant');
        const restaurantDetails = response.data as RestaurantRequest;
        setProfileURL(restaurantDetails.profileURL);

        setLoadingAvatar(false)
    }, 3000);
}


    async function handleFormSchedules(e:FormEvent){
        e.preventDefault()

        if(monDescription === '' || tueDescription === '' || wedDescription === '' || thuDescription === ''){
            toast.warning("Preencha todos os campos para atualizar o horário de funcionamento.")
            return
        }

        if(friDescription === '' || satDescription === '' || sunDescription === ''){
            toast.warning("Preencha todos os campos para atualizar o horário de funcionamento.")
            return
        }

        setLoading(true)

        try{

            const apiClient = setupAPIClient();
            await apiClient.put('/schedule', {
                monIsOpen: monIsOpen,
                tueIsOpen: tueIsOpen,
                wedIsOpen: wedIsOpen,
                thuIsOpen: thuIsOpen,
                friIsOpen: friIsOpen,
                satIsOpen: satIsOpen,
                sunIsOpen: sunIsOpen,
                monDescription: monDescription,
                tueDescription: tueDescription,
                wedDescription: wedDescription,
                thuDescription: thuDescription,
                friDescription: friDescription,
                satDescription: satDescription,
                sunDescription: sunDescription,
            });

            toast.success("Informações atualizadas com sucesso!")
            setLoading(false)

        } catch(err){
            toast.error("Erro ao atualizar informações. Tente novamente.")
            setLoading(false)
        }

    }

    return(
        <>

            <Head>
                <title>
                    Restaurox - Detalhes do Restaurante
                </title>
                <link rel="icon" href="/logoFavIcon.png" />
            </Head>

            <Header />

            <main className="px-3 max-w-xl mx-auto">

                <div className="bg-red-700 px-3 py-1 text-gray-100 rounded-md hover:cursor-pointer flex items-center justify-center transition-colors duration-200 focus:outline-none active:bg-green-700 w-fit mt-3 text-sm gap-x-2"> 
                    <IoArrowBackCircleOutline size={17}/>
                    <Link href={'/dashboard'}>Voltar para o cardápio</Link>
                </div>

                <div className="px-4 flex flex-col items-center justify-center md:px-8 md:bg-white md:shadow-md mx-auto bg-white rounded-md shadow-md mt-4">

                    <div className="w-full flex flex-col -space-y-2 mt-4 md:text-2xl text-xl text-gray-700 drop-shadow-md">
                        <span>Editar informações do restaurante</span>
                        <div className="w-full mt-10 pt-4 pb-1 md:pb-4">
                            <hr />
                        </div>
                    </div>

                    {/* avatar profile */}
                    <div
                    className="relative mt-5 hover:cursor-pointer hover:brightness-90"
                    onClick={handleViewModalAvatar}>
                        <div className="rounded-3xl w-44 h-44 md:w-48 md:h-48 overflow-hidden border-4 border-gray-100">
                            <img
                                src={profileURL}
                                alt="Imagem de perfil do restaurante"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 -mr-[10%] -mb-[6%] bg-white border-2 p-3 rounded-full">
                            <span className="text-gray-800 text-lg font-bold">
                                {loadingAvatar ? (
                                    <VscLoading className="animate-spin" size={24}/>
                                ):
                                (
                                    <FaCamera size={24}/>
                                )}
                                
                            </span>
                        </div> 
                    </div>


                    {/* descriptions */}
                    <form
                    className="bg-blue-00 w-full flex flex-col mt-6 text-gray-800 pb-4"
                    onSubmit={handleFormDescriptions}>

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

                        {doDelivery && (
                            <FloatInput
                            type="number"
                            step="0.01"
                            min="0"
                            id="deliveryFee"
                            value={deliveryFee}
                            onChange={(e)=>setDeliveryFee(e.target.value)}
                            >
                                Valor da taxa de entrega (delivery)
                            </FloatInput>
                        )}

                        {doDelivery && (
                            <FloatInput
                            type="number"
                            step="1"
                            min="0"
                            id="deliveryTime"
                            value={deliveryTime}
                            onChange={(e)=>setDeliveryTime(e.target.value)}
                            >
                                Tempo médio do delivery (em minutos)
                            </FloatInput>
                        )}

                        <div className="mb-2">
                            <Checkbox
                            checked={doDelivery}
                            onChange={() => setDoDelivery(!doDelivery)}>
                                Delivery disponível
                            </Checkbox>
                        </div>

                        <ButtonAdd
                        loading={loading}
                        type="submit"
                        >
                            Salvar descrição
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
                    <form
                    className="bg-blue-00 w-full flex flex-col mt-2 text-gray-800 pb-4"
                    onSubmit={handleFormSchedules}>

                        <div className="text-gray-700">

                            <div>
                                <p className="text-xl my-3">Segunda-feira</p>

                                <Checkbox
                                checked={monIsOpen}
                                onChange={() => setMonIsOpen(!monIsOpen)}
                                >
                                    Aberto
                                </Checkbox>

                                <FloatInput
                                value={monDescription}
                                onChange={(e) => {setMonDescription(e.target.value)}}
                                id="mon">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p className="text-xl my-3">Terça-feira</p>

                                <Checkbox
                                checked={tueIsOpen}
                                onChange={() => setTueIsOpen(!tueIsOpen)}
                                >
                                    Aberto
                                </Checkbox>

                                <FloatInput
                                value={tueDescription}
                                onChange={(e) => {setTueDescription(e.target.value)}}
                                id="tue">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p className="text-xl my-3">Quarta-feira</p>

                                <Checkbox
                                checked={wedIsOpen}
                                onChange={() => setWedIsOpen(!wedIsOpen)}
                                >
                                    Aberto
                                </Checkbox>

                                <FloatInput
                                value={wedDescription}
                                onChange={(e) => {setWedDescription(e.target.value)}}
                                id="wed">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p className="text-xl my-3">Quinta-feira</p>

                                <Checkbox
                                checked={thuIsOpen}
                                onChange={() => setThuIsOpen(!thuIsOpen)}
                                >
                                    Aberto
                                </Checkbox>

                                <FloatInput
                                value={thuDescription}
                                onChange={(e) => {setThuDescription(e.target.value)}}
                                id="thu">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p className="text-xl my-3">Sexta-feira</p>

                                <Checkbox
                                checked={friIsOpen}
                                onChange={() => setFriIsOpen(!friIsOpen)}
                                >
                                    Aberto
                                </Checkbox>

                                <FloatInput
                                value={friDescription}
                                onChange={(e) => {setFriDescription(e.target.value)}}
                                id="fri">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p className="text-xl my-3">Sábado</p>

                                <Checkbox
                                checked={satIsOpen}
                                onChange={() => setSatIsOpen(!satIsOpen)}
                                >
                                    Aberto
                                </Checkbox>

                                <FloatInput
                                value={satDescription}
                                onChange={(e) => {setSatDescription(e.target.value)}}
                                id="sat">Descrição</FloatInput>
                            </div>
                            <hr />
                            <div>
                                <p className="text-xl my-3">Domingo</p>

                                <Checkbox
                                checked={sunIsOpen}
                                onChange={() => setSunIsOpen(!sunIsOpen)}
                                >
                                    Aberto
                                </Checkbox>

                                <FloatInput
                                value={sunDescription}
                                onChange={(e) => {setSunDescription(e.target.value)}}
                                id="sun">Descrição</FloatInput>
                            </div>

                            <ButtonAdd
                            loading={loading}>
                                Salvar horários de funcionamento
                            </ButtonAdd>

                        </div>
                        
                    </form>
                </div>
                
                <ModalAvatar
                lastImageURL={restaurant?.profileURL}
                viewModalAvatar={viewModalAvatar}
                handleViewModalAvatar={handleViewModalAvatar}
                updateProfileDescriptions={updateProfileDescriptions}
                />

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