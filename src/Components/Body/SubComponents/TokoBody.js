import React, {useContext, useEffect} from 'react'
import Loading from '../../general/Loading';
import TokoUser from './TokoUser'
import TokoForm from './TokoForm'
import Error from '../../general/Error';
import {ProductContext} from '../../ParentComponent'
import '../style/TokoBody.css'
import {useHistory} from "react-router-dom";
import Axios from 'axios';


function TokoBody() {
    const productContext = useContext(ProductContext)
    const history = useHistory()

    useEffect(() => {
        if(productContext.User.UserState.login){
            productContext.Toko.DispatchTokoState({type: "SET_LOADING"})
            Axios.post('http://keudepeunajoh.jsmiot.com/Data/toko', {
                id: productContext.User.UserState.user.id,
                role_id : productContext.User.UserState.user.role_id
            }).then(res => {
                productContext.Toko.DispatchTokoState({type: "FETCH_SUCCESS", payload: res.data})
                
            }).catch(error => {
                productContext.Toko.DispatchTokoState({type: "FETCH_ERROR"})
            })
        }
    },[])
    if(productContext.User.UserState.login){
            return (
                <div style={
                    productContext.Toko.TokoState.loading ? { height : "100%"}:
                        {height: ""}
                }>
                    {
                        false ? <Loading color="loading-white"/>:
                            <div className="content"
                                style={
                                    productContext.Toko.TokoState.loading ? { height : "100%"}:
                                    {height: "auto"}
                                }
                            >
                                
                            <div className="container" style={{height: "100%"}}>
                                <div className="content-header">
                                    <h4>Profil Toko</h4>
                                </div>
                                {
                                    productContext.User.UserState.user.role_id === "0" ? <TokoForm/>:
                                    <TokoUser data={productContext.Toko.TokoState.data}/>
                                }
                                
                            </div>
                        </div>
                    }       
                </div>
            )
        }else{
            history.push('/Login')
            return null
        }
    }



export default TokoBody
