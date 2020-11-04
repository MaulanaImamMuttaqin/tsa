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
const link = "http://keudepeunajohapi.jsmiot.com/"
const user_state = {
    loading:false,
    login: false,
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
                ...state
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
        console.log("parent")
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
