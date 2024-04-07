import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { InputDashboard } from '../InputDashboard'
import { Checkbox } from '../Checkbox'
import { ButtonAdd } from '../ButtonAdd'
import { FormEvent } from 'react'
import { FiImage } from 'react-icons/fi'
import { ChangeEvent } from 'react'
import { ModalDeleteItem } from '../ModalDeleteItem'

import { Item } from '@/src/pages/dashboard'

// api config
import { setupAPIClient } from '@/src/services/api'

import { toast } from 'react-toastify'

interface modalProps{
    item: Item
    viewModalItem: boolean
    updateMenu: () => Promise<void>
    handleViewModalItem: () => void
}

export default function ModalItem({item, viewModalItem, updateMenu, handleViewModalItem}: modalProps) {

    // image preview controller
    // preview temporario
    const [imageURL, setImageURL] = useState(item.imageURL)
    // file para enviar para a rota
    const [image, setImage] = useState(null)

    // loading button
    const [loading, setLoading] = useState(false)

    // controles modal delete item
    const [viewModalDeleteItem, setViewModalDeleteItem] = useState(false)

    // form values
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [description, setDescription] = useState(item.description)
    const [isVegan, setIsVegan] = useState(item.vegan === 1 ? true : false)

    const [isAvaliable, setIsAvaliable] = useState(item.available === 1 ? true : false)

    // text area counter caracter
    const [textCount, setTextCount] = useState(description.length)
    const [textAreaWaring, setTextAreaWarnig] = useState('')

    function handleTextArea(text: string){

    // atualizar description
    setDescription(text)

    setTextCount(text.length)

    if(textCount < 150){
        setTextAreaWarnig('text-green-600')
    }
    if(textCount >= 150 && textCount < 200){
        setTextAreaWarnig('text-yellow-600')
    }
    if(textCount >= 200){
        setTextAreaWarnig('text-red-600')
    }
    }

    function handleViewModalDeleteItem(){
      setViewModalDeleteItem(!viewModalDeleteItem)
    }

    async function handleSubmit(e: FormEvent){

        e.preventDefault();

        if(name === '' || price === '' || description === ''){
            toast.warning("Preecha todos os dados para atualizar o item.")
            return
        }

        if(name.length > 45){
            toast.warning("O nome do item não pode ter mais do que 45 caracteres.")
            return
        }
        
        if(price.length > 10){
            toast.warning("Valor do item inválido.")
            return
        }

        if(textCount > 255){
            toast.warning("A descrição ultrapassa o limite de caracteres. Reduza o tamanho do texto para continuar.")
            return
        }

        try{

            // iniciar loading
            setLoading(true)

            // criar estrutura para enviar para a rota que recebe um multipart form
            // por ser multipart form, necessariamente precisa ter a estrutura FormData
            const data = new FormData();

            data.append('name', name);
            data.append('description', description);
            data.append('price', price);
            data.append('avaliable', isAvaliable ? '1' : '0'); // converter para string
            data.append('vegan', isVegan ? '1' : '0'); // converter para string
            data.append('idItem', item.idItem);
            data.append('image', image);

            const apiClient = setupAPIClient();

            await apiClient.put('/item', data);

            // desativar loading
            setLoading(false)

            // fechar modal
            handleViewModalItem()

            // funcao que atualiza useState do menu para atualizar a listagem
            // definida no dashboard e passada para este componente como parametro
            updateMenu()
        
            toast.success("Item atualizado com sucesso!")

            return

        } catch(error){
            toast.error("Oops! Erro ao atualizar o item: " + error)
        }

  }

  // funcao para receber imagem do formulario
  // recebe um event 'e' do tipo HTMLInputElement
  function handleFile(e: ChangeEvent<HTMLInputElement>){

        // se nao tiver uma imagem, nao faz nada
        if(!e.target.files){
            return;
        }

        const imageFile = e.target.files[0]

        if(!imageFile){
            return;
        }

        // conferir tipo da imagem
        if(imageFile.type === 'image/png' || imageFile.type === 'image/jpeg'){

            // file para enviar para API
            setImage(imageFile)

            // definir url do file para preview temporário
            setImageURL(URL.createObjectURL(e.target.files[0]))

        } else{
            toast.warning("Insira uma imagem com formato válido (jpeg ou png).")
            return;
        }
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={viewModalItem} as={Fragment}>
  <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleViewModalItem}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity" />
    </Transition.Child>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <form
              className={`flex flex-col items-center justify-between px-4 py-3 w-full shadow-md mt-1 rounded-b-md`}
              onSubmit={handleSubmit}
            >
              <label className="h-32 text-gray-600 bg-white w-full mb-2 border border-gray-300 flex flex-col justify-center items-center hover:cursor-pointer overflow-hidden mt-1">

                <div className="flex flex-col items-center z-50 absolute text-white text-opacity-80">
                  {/* icone */}
                  <span><FiImage size={45}></FiImage></span>

                </div>

                <input type="file" accept="image/png image/jpeg" className="hidden" onChange={handleFile} />

                {/* so exibe se imageURL deixar de ser null */}
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Imagem do produto"
                    className="w-full"
                  />
                )}

              </label>

              <InputDashboard
                type='text'
                placeholder="Digite o nome do item"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <InputDashboard
                type='number'
                step={0.01}
                placeholder="Digite o preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <div className="w-full h-fit ">
                <textarea
                  placeholder="Digite a descrição"
                  rows={3}
                  className="border border-gray-300 w-full p-2 placeholder:text-gray-600 focus:ring-0 resize-none"
                  value={description}
                  onChange={(e) => handleTextArea(e.target.value)}
                />
                <p className={`w-full text-right -mt-1 text-xs font-medium ${textAreaWaring}`}>{textCount}/255</p>
              </div>

              <Checkbox
                value={isVegan}
                checked={isVegan}
                onChange={() => { setIsVegan(!isVegan) }}>
                Item vegano
              </Checkbox>

              <Checkbox
                value={isAvaliable}
                checked={isAvaliable}
                onChange={() => { setIsAvaliable(!isAvaliable) }}>
                Está disponível
              </Checkbox>


              <div className={`py-3 sm:flex md:justify-end sm:flex-row md:px-0 sm:px-6 w-full`}>
              <button
                type="submit"
                className="w-full py-2 border border-green-600 text-green-600 shadow-sm font-medium bg-green-50 hover:bg-green-100 flex justify-center sm:ml-3 md:mx-0 sm:w-auto md:px-3"
              >
                Atualizar informações
              </button>

              <button
                type="button"
                className="w-full py-2 border border-red-600 text-red-600 shadow-sm font-medium bg-red-50 hover:bg-red-100 flex justify-center sm:ml-3 sm:w-auto md:px-3 mt-2 md:mt-0 md:mx-2"
                onClick={handleViewModalDeleteItem}
              >
                Deletar item
              </button>

              <button
                type="button"
                className="w-full py-2 border border-gray-600 text-gray-600 shadow-sm font-medium bg-gray-50 hover:bg-gray-100 flex justify-center mt-2 sm:mt-0 sm:w-auto md:px-3"
                ref={cancelButtonRef}
                onClick={handleViewModalItem}
              >
                Cancelar
              </button>
            </div>

            </form>

            <ModalDeleteItem handleViewModalDeleteItem={handleViewModalDeleteItem}
            item={item}
            updateMenu={updateMenu}
            viewModalDeleteItem={viewModalDeleteItem}
            handleViewModalItem={handleViewModalItem}
            />
            
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>

  
    </Transition.Root>
  )
}
