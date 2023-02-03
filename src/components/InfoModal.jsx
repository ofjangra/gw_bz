import React from 'react'
import { Clear } from "@mui/icons-material"

const InfoModal = ({link, isOpen, onClose}) =>{
    if(!isOpen) return null;

    return(
        <>
            <div className='infoModal'>
                <div className='modalActions'>
                    <Clear  id = "closeInfoModal"/>
                </div>

                    <iframe src = {link} id = "infoFrame"/>
            </div>
        </>
    )
}

export default InfoModal;