import React from "react";
import { MdFileDownload } from "react-icons/md";
import { QRCode } from 'react-qrcode-logo';
import Link from "next/link";
import html2canvas from "html2canvas";


interface QRCodeParams{
    idUser: string
    restaurantName: string
    profileUrl: string
}

export function QRCodeComponent({idUser, restaurantName, profileUrl}:QRCodeParams){

    const downloadCode = () => {
    const container: any = document.getElementById("qrcode-container");
    if(container) {
        html2canvas(container).then(function(canvas) {
            const link = document.createElement('a');
            link.download = `${restaurantName} - QRCode.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    }
}

    const baseURL = "https://cardapioplus-frontend-nextjs.vercel.app/"

    return(
        <React.Fragment>
            <div className="flex flex-col justify-center items-center mt-8 bg-white shadow-md rounded-md w-fit p-5 mx-auto">
                            
                <h3 className="font-medium text-lg text-gray-700 -mb-4 mt-0">Seu QR Code</h3>

                {/* QRCode Cotainer to download */}
                <div
                id="qrcode-container"
                className="flex flex-col justify-center items-center mt-8 border border-black text-gray-900  rounded-md w-fit p-5 mx-auto"
                >
                    <h3 className="font-medium text-lg mb-2 mt-0">Seja bem-vindo(a)!</h3>

                    <Link target="_blank" href={`${baseURL}/cardapio?id=${idUser}`}>     
                        <QRCode
                        value={`${baseURL}/cardapio?id=${idUser}`}
                        size={200}        // the dimension of the QR code (number)
                        qrStyle="squares"    // type of qr code, wether you want dotted ones or the square ones
                        eyeRadius={0}    // radius of the promocode's eye
                        id="qrcode"
                        />
                    </Link>
                    
                    <p className="text-center text-sm -mt-1">Acesse o nosso cardápio digital</p>
                </div>

                <button
                className="flex justify-center items-center mt-3 text-blue-900"
                onClick={downloadCode}
                >
                    <span>Fazer download</span> <MdFileDownload/>
                </button>

            </div>
        </React.Fragment>
    )

}