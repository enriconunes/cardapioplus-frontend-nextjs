import { MdEdit } from "react-icons/md"
import ModalItem from "../ModalItem"
import { useState } from "react"

// tipagem de um item definido no dashboard
import { Item } from "@/src/pages/dashboard"

interface ItemProps{
    item: Item
    updateMenu: () => Promise<void>
}

export function ItemDashboard({item, updateMenu}: ItemProps){

    const [viewModalItem, setViewModalItem] = useState(false)

    function handleViewModalItem(){
        setViewModalItem(!viewModalItem)
    }

    return(
            <button
            key={item.idItem}
            className="flex items-center justify-between p-2 mt-3 bg-white w-full rounded-md shadow-md hover:cursor-pointer h-20"
            onClick={handleViewModalItem}>
            
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
                <div
                className="w-2/12 h-full flex justify-end pr-2 items-center"
                >
                    <MdEdit size={21}/>
                </div>

                <ModalItem
                item={item}
                updateMenu={updateMenu}
                handleViewModalItem={handleViewModalItem}
                viewModalItem={viewModalItem}
                />
            
            </button>
    )
    
}