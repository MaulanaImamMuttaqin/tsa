import React ,{Fragment, useReducer, useEffect} from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import {Switch, Route} from "react-router-dom";
import Login from './Auth/Login';
import Regist from './Auth/Regist';
import Axios from 'axios';
import "../App.css"
export const ProductContext = React.createContext()


const state = {
    loading:true,
    error:false,
    data: {}
}
const link = "https://mucilaginous-bundle.000webhostapp.com/"
const user_state = {
    loading:false,
    login: false,
    error:false,
    data:{}
}

//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading:true
            }
        
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                data: action.payload,
                error:false
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                data: {},
                error:true
            }
        case 'FETCH_APPEND':
            let old_data = state.data.product
            let new_data = old_data.concat(action.payload)
            return {
                ...state,
                data :{
                    ...state.data,
                    product: new_data
                }
            }
        default:
            break;
    }
}
const user_reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_STATE':
            return {
                loading:false,
                login:true,
                data: action.payload
            }
        case 'SET_USER_STATE_FAILED':
            return {
                ...state,
                error:true
            }
        
        case 'SET_LOADING_USER':
            return {
                ...state,
                loading:true
            }
        case 'LOGOUT' :
            return {
                ...state,
                data:{}
            }
        default:
            break;
    }
}


function ParentComponent() {
     

    const [ProState, dispatchProState] = useReducer(reducer, state)
    const [searchProState, dispatchSearchProState] = useReducer(reducer, state)
    const [detailProState, dispatchDetailProState] = useReducer(reducer, state)
    const [userState, dispatchUserState] = useReducer(user_reducer, user_state)
    const [tokoState, dispatchTokoState] = useReducer(reducer, state)
    const [tokoProfile, dispatchTokoProfile] = useReducer(reducer, state)

    useEffect(()=> {
        if(localStorage.getItem('SavedToken') !== null){

            Axios.post(`${link}Auth/Authorization2`,{}, {
                headers: {
                    'Authorization': localStorage.getItem('SavedToken')
                  }
            }).then(res => {
                dispatchUserState({type: "SET_USER_STATE", payload: res.data.user})
            }).catch(error => {
                dispatchUserState({type: "SET_USER_STATE_FAILED"})
            })
        }
        Axios.post(`${link}Data/all_product`)
        .then(response => {
            dispatchProState({type: 'FETCH_SUCCESS', payload:response.data.data})
        })
        .catch(error =>{
            console.log(error)
            dispatchProState({type: 'FETCH_ERROR'})
        })
        // Axios.post(`${link}Data/test`)
        // .then(res =>{
        //     console.log(res.data)
        // })
    },[])   
    return (
        <ProductContext.Provider
            value={
                {
                    Product:{
                        ProductState : ProState,
                        dispatchProductState: dispatchProState
                    },
                    SearchProduct:{
                        SearchProductState : searchProState,
                        DispatchSearchProductState: dispatchSearchProState
                    },
                    DetailProduct: {
                        DetailProState: detailProState,
                        DispatchDetailProState : dispatchDetailProState
                    },
                    User:{
                        UserState: userState,
                        DispatchUserState: dispatchUserState
                    },
                    Toko: {
                        TokoState: tokoState,
                        DispatchTokoState: dispatchTokoState
                    },
                    TokoProfile : {
                        TokoProfState: tokoProfile,
                        DispatchTokoProfState: dispatchTokoProfile
                    },
                    url: link
                }
            }
        >       
            
                <Switch>
                    <Route path='/Login' component={Login}/>
                    <Route path='/Register' component={Regist}/>
                    <Route path='/' render={props =>
                        <Fragment>
                            <Header/>
                            <Body/>
                            <Footer/>
                        </Fragment>
                        } />
                </Switch>
                
            
        </ProductContext.Provider>

        
    )
}

export default ParentComponent
