import React, {useContext} from 'react'
import '../../../assets/style/food.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useLocation } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProductContext} from '../../ParentComponent'
function Food(props) {
    const {
        url
    } = useContext(ProductContext)

    const history = useHistory()
    const location = useLocation()
    const clicked = () =>{
        if(location.pathname !== '/Toko_Saya'){
            history.push(`/Product/${props.Data.id}`)
        }
        
    }
    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        
            <div className="food" onClick={clicked}>
                <div className="food-content">
                    <div className="food-picture">
                        <img src={`${url}${props.Data.gambar_product}`} alt=""/>
                    </div>
                    <div className="text-contents">
                        <p className="food-tittle">{props.Data.nama_product}</p>
                        <p>Rp {numberWithCommas(props.Data.harga)}</p>
                        <p><FontAwesomeIcon icon="store" /> {props.Data.nama_toko}</p>
                        {location.pathname === '/Toko_Saya' && 
                                <div>
                                    <Badge className="editButton" onClick={()=> props.edit(props.Data)} variant="primary">Edit</Badge>
                                    
                                    <Badge className="editButton" onClick={() => history.push(`/Product/${props.Data.id}`)} variant="success">Prewiew</Badge>
                                    <Badge className="editButton" onClick={()=> props.delete(props.Data)} variant="danger">Hapus</Badge>
                                </div>
                        }
                    </div>
                </div>

                
            </div>
       
        
    )
}

export default Food
