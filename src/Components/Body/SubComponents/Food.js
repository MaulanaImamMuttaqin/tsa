import React,{useContext} from 'react'
import '../style/food.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import {ProductContext} from '../../ParentComponent'
import { Link,useHistory } from 'react-router-dom'

function Food(props) {
    const productContext = useContext(ProductContext)
    const history = useHistory()
    // const getDetailed = (id) => {
    //     productContext.proId.DispatchProId({type: 'UPDATE_PRODUCT_ID', value:id})
    //     productContext.Component.DispatchComponentState({type: 'CHANGE_COMPONENT', value:3})
    // }
    const clicked = () =>{
        history.push(`/Product/${props.Data.id}`)
    }
    return (
        
            <div className="food" onClick={clicked}>
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
