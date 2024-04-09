import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Schedule } from '@/src/pages/cardapio'

interface ItemProps {
    schedule: Schedule
    viewModalSchedule: boolean
    handleViewModalSchedule: () => void
}

export function ModalSchedule({ viewModalSchedule, handleViewModalSchedule, schedule }: ItemProps) {
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={viewModalSchedule} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={handleViewModalSchedule}>
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
                                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">

                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left text-gray-800 w-full">
                                            <Dialog.Title as="h3" className="text-lg font-semibold leading-6 mb-4 w-full text-center md:-ml-3">
                                                Horários de Funcionamento
                                            </Dialog.Title>

                                            {/* listagem dos dias */}
                                            <div className="min-w-72">


                                                {/* Inicio de um dia */}
                                                <div className='flex flex-col justify-start mb-1'>
                                                    <div className='flex items-baseline gap-x-2'>
                                                        <span className='font-medium'>Segunda-Feira</span>
                                                        <span
                                                        className={`font-medium text-sm ${schedule?.monIsOpen ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {schedule?.monIsOpen ? "Aberto" : "Fechado"}
                                                        </span>
                                                    </div>
                                                    <div className='text-left text-sm'>
                                                        <span>
                                                            {schedule?.monDescription}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Inicio de um dia */}
                                                <div className='flex flex-col justify-start mb-1'>
                                                    <div className='flex items-baseline gap-x-2'>
                                                        <span className='font-medium'>Terça-Feira</span>
                                                        <span
                                                        className={`font-medium text-sm ${schedule?.tueIsOpen ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {schedule?.tueIsOpen ? "Aberto" : "Fechado"}
                                                        </span>
                                                    </div>
                                                    <div className='text-left text-sm'>
                                                        <span>
                                                            {schedule?.tueDescription}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Inicio de um dia */}
                                                <div className='flex flex-col justify-start mb-1'>
                                                    <div className='flex items-baseline gap-x-2'>
                                                        <span className='font-medium'>Quarta-Feira</span>
                                                        <span
                                                        className={`font-medium text-sm ${schedule?.wedIsOpen ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {schedule?.wedIsOpen ? "Aberto" : "Fechado"}
                                                        </span>
                                                    </div>
                                                    <div className='text-left text-sm'>
                                                        <span>
                                                            {schedule?.wedDescription}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Inicio de um dia */}
                                                <div className='flex flex-col justify-start mb-1'>
                                                    <div className='flex items-baseline gap-x-2'>
                                                        <span className='font-medium'>Quinta-Feira</span>
                                                        <span
                                                        className={`font-medium text-sm ${schedule?.thuIsOpen ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {schedule?.thuIsOpen ? "Aberto" : "Fechado"}
                                                        </span>
                                                    </div>
                                                    <div className='text-left text-sm'>
                                                        <span>
                                                            {schedule?.thuDescription}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Inicio de um dia */}
                                                <div className='flex flex-col justify-start mb-1'>
                                                    <div className='flex items-baseline gap-x-2'>
                                                        <span className='font-medium'>Sexta-Feira</span>
                                                        <span
                                                        className={`font-medium text-sm ${schedule?.friIsOpen ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {schedule?.friIsOpen ? "Aberto" : "Fechado"}
                                                        </span>
                                                    </div>
                                                    <div className='text-left text-sm'>
                                                        <span>
                                                            {schedule?.friDescription}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Inicio de um dia */}
                                                <div className='flex flex-col justify-start mb-1'>
                                                    <div className='flex items-baseline gap-x-2'>
                                                        <span className='font-medium'>Sábado</span>
                                                        <span
                                                        className={`font-medium text-sm ${schedule?.satIsOpen ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {schedule?.satIsOpen ? "Aberto" : "Fechado"}
                                                        </span>
                                                    </div>
                                                    <div className='text-left text-sm'>
                                                        <span>
                                                            {schedule?.satDescription}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Inicio de um dia */}
                                                <div className='flex flex-col justify-start mb-1'>
                                                    <div className='flex items-baseline gap-x-2'>
                                                        <span className='font-medium'>Domingo</span>
                                                        <span
                                                        className={`font-medium text-sm ${schedule?.sunIsOpen ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {schedule?.sunIsOpen ? "Aberto" : "Fechado"}
                                                        </span>
                                                    </div>
                                                    <div className='text-left text-sm'>
                                                        <span>
                                                            {schedule?.sunDescription}
                                                        </span>
                                                    </div>
                                                </div>

                                                

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 -mt-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center py-2 border border-gray-600 text-gray-600 shadow-sm font-medium bg-gray-50 hover:bg-gray-100 px-3"
                                        ref={cancelButtonRef}
                                        onClick={handleViewModalSchedule}
                                    >
                                        Voltar
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
