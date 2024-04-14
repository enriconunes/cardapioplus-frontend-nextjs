
export default function NotFound(){
    return(
        <main className="h-screen w-screen bg-banner flex justify-center items-center">
            <div className="grid h-fit w-fit place-items-center px-6 py-12 sm:py-20 rounded-md lg:px-8 bg-white mx-2">
                <div className="text-center">
                <p className="text-xl font-semibold text-red-700">Erro 404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página não encontrada</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Infelizmente não encontramos a página que você procura...</p>
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-6">
                    <a
                    href="#"
                    className="rounded-md bg-red-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 w-full md:w-fit"
                    >
                    Voltar para o início
                    </a>
                    <a href="#" className="text-sm font-semibold text-gray-900 w-full md:w-fit mt-3 md:mt-0">
                    Entrar em contato com o suporte <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
                </div>
            </div>
        </main>
    )
}