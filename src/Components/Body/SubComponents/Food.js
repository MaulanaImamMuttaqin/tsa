import React from 'react'
import '../style/food.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
function Food(props) {
    const print = () => {
        console.log('oh yeah')
    }
    return (
        <div className="food" onClick={() => print()}>
            <div className="food-content">
                <div className="food-picture">
                    <img src={`http://jsmiot.com/KeudePeunajoh/${props.Data.gambar_product}`} alt=""/>
                </div>
                <div className="text-contents">
                    <p className="food-tittle">{props.Data.nama_product}</p>
                    <p>Rp {props.Data.harga}</p>
                    <p><FontAwesomeIcon icon={faStore} /> {props.Data.nama_toko}</p>
                </div>
            </div>
        </div>
    )
}

export default Food
