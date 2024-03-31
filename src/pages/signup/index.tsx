import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext, FormEvent } from "react";

// image
import logo from "../../../public/logo.png"

// components
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

// context
import { AuthContext } from "@/src/contexts/AuthContext";

// pop-up
import { toast } from "react-toastify";

// server side function - permission just for guest
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function Home() {

  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault()

    if(name === '' || email === '' || password === '' || passwordConfirm === ''){
      toast.warning("Preencha todos os campos.")
      return
    }

    if(password !== passwordConfirm){
      toast.warning("Senhas incompatíveis. Tente novamente.")
      return
    }

    if(name.length > 60){
      toast.warning("O nome não pode ultrapassar os 60 caracteres.")
      return
    }
    
    if (email.length > 60){
      toast.warning("O email não pode ultrapassar os 60 caracteres.")
      return
    }
    
    if (password.length > 60){
      toast.warning("A senha não pode ultrapassar os 60 caracteres.")
      return
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)
  }
  return (
    <>
    
      <Head>
        <title>Crie já a sua conta - Cardápio Plus</title>
      </Head>
    
      {/* container */}
      <main className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-400  to-blue-900">

        {/* form content */}
        <div className="mx-3 max-w-2xl text-center bg-white bg-opacity-65 shadow-lg p-4 rounded-md">

          <div>
            <Image
            src={logo}
            alt="Logo Next Pizza"
            className="w-10/12 mx-auto -mb-2 md:-mb-4"
            />
          </div>

          <form
          className="flex flex-col"
          onSubmit={handleSignUp}>

              <Input
                type="text"
                placeholder="Digite o seu nome"
                onChange={(e)=>setName(e.target.value)}
              />

              <Input
                type="email"
                placeholder="Digite o seu email"
                onChange={(e)=>setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Digite a sua senha"
                onChange={(e)=>setPassword(e.target.value)}
              /> 

              <Input
                type="password"
                placeholder="Confirmar senha"
                onChange={(e)=>setPasswordConfirm(e.target.value)}
              />  

              <Button
              type="submit"
              loading={loading}
              >
                Cadastrar
              </Button>
          </form>

          <Link href={"/"}
          className="font-medium text-blue-900 hover:brightness-125">Já tem uma conta? Faça o login</Link>

        </div>

      </main>

    </>
  );
}

export const getServerSideProps = canSSRGuest(async(ctx) => {

    // nao retorna nada, apenas executa a funcao 'canSSRGuest' criada em ./utils para redirecionar o user caso o cookie de autenticação exista.
    return{
        props: {

        }
    }
})