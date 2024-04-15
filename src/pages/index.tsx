import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// image
import logo from "../../public/logoRed-700.png"

// components
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { useContext, useState, FormEvent } from "react";

// context
import { AuthContext } from "@/src/contexts/AuthContext";

// server side function - permission just for guest
import { canSSRGuest } from "../utils/canSSRGuest";

// api config
import { setupAPIClient } from "../services/api";

export default function Home() {

  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent){
    e.preventDefault()

    setLoading(true)

    const data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false)
  }


  return(
    <>
    
      <Head>
        <title>Entre na sua conta - Cardápio Plus</title>
        <link rel="icon" href="/logoFavIcon.png" />
      </Head>
    
      {/* container */}
      <main className="h-screen w-screen flex justify-center items-center">

        {/* form content */}
        <div className="mx-3 max-w-lg text-center bg-white shadow-md p-4 rounded-sm">

          <div>
            <Image
            src={logo}
            alt="Logo Next Pizza"
            className="w-8/12 mx-auto -mb-2 md:-mb-4"
            />
          </div>

          <form
          className="flex flex-col mt-5 md:mt-7"
          onSubmit={handleLogin}
          >

              <Input
                type="email"
                placeholder="Digite o seu email"
                onChange={(e)=>{setEmail(e.target.value)}}
              />

              <Input
                type="password"
                placeholder="Digite a sua senha"
                onChange={(e)=>{setPassword(e.target.value)}}
              />  

              <Button
              type="submit"
              loading={loading}
              >
                Acessar
              </Button>
          </form>

          <Link href={"/signup"}
          className="font-medium text-red-900 hover:brightness-125">Não tem uma conta? Cadastre-se</Link>

        </div>

      </main>

    </>
  );
}


// as propriedades das fuções server side são executadas sempre que a pagina é carregada (antes de renderizar o front end), similar a um middleware
// a funcao abaixo é utilizada para conferir se o user ja está logado antes de renderizar a pagina de login
// se estiver logado, redireciona para o dashboard

export const getServerSideProps = canSSRGuest(async(ctx) => {

    // nao retorna nada, apenas executa a funcao 'canSSRGuest' criada em ./utils para redirecionar o user caso o cookie de autenticação exista.
    return{
        props: {

        }
    }
})