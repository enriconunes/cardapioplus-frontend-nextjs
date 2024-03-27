import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

// api config
import { setupAPIClient } from '@/src/services/api'

import { toast } from 'react-toastify'
import { Item } from '@/src/pages/dashboard'

interface ItemProps{
    item: Item
    viewModalDeleteItem: boolean
    updateMenu: () => Promise<void>
    handleViewModalDeleteItem: () => void
    handleViewModalItem: () => void
}

export function ModalDeleteItem({item, viewModalDeleteItem, handleViewModalDeleteItem, handleViewModalItem, updateMenu}: ItemProps){

    const cancelButtonRef = useRef(null)

    async function handleDelete(){

        try{
            const apiClient = setupAPIClient();
            await apiClient.put('/item/delete', {
                idItem: item.idItem
            });

            // fechar os dois modais
            handleViewModalDeleteItem()
            handleViewModalItem()

            // atualizar listagem do menu
            updateMenu()

            toast.success("Item deletado com sucesso.")

        } catch(err){
            toast.error("Erro ao deletar este item. Tente novamente.")
        }
        
    }

    return(
            <Transition.Root show={viewModalDeleteItem} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={handleViewModalDeleteItem}>
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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Deletar {item.name}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Você tem certeza que deseja deletar permanentemente o item {item.name}? Essa operação não é reversível.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center py-2 border border-red-600 text-red-600 shadow-sm font-medium bg-red-50 hover:bg-red-100 px-3 sm:ml-3 sm:w-auto"
                    onClick={handleDelete}
                  >
                    Deletar
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center py-2 border border-gray-600 text-gray-600 shadow-sm font-medium bg-gray-50 hover:bg-gray-100 px-3 sm:ml-3 sm:w-auto mt-2 md:mt-0"
                    ref={cancelButtonRef}
                    onClick={handleViewModalDeleteItem}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    )

}