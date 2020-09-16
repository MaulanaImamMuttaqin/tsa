import React ,{Fragment, useReducer} from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import {Switch, Route} from "react-router-dom";
import Login from './Auth/Login';
import Regist from './Auth/Regist';
import { useEffect } from 'react';
import Axios from 'axios';
export const ProductContext = React.createContext()


const state = {
    loading:true,
    error:false,
    data: {}
}
const button_click_search_state = ''

const user_state = {
    loading:false,
    login: false
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
        case 'UPDATE_SEARCH_ONCLICK':
            return action.value
            
        case 'SET_USER_STATE':
            return {
                loading:false,
                login:true,
                user: action.data
            }
        case 'SET_USER_STATE_FAILED':
            return {
                ...user_state
            }
        
        case 'SET_LOADING_USER':
            return {
                ...user_state,
                loading:true
            }
        default:
            break;
    }
}
function ParentComponent() {
    
    const [ProState, dispatchProState] = useReducer(reducer, state)
    const [searchProState, dispatchSearchProState] = useReducer(reducer, state)
    const [buttSearch, dispatchButtSearch] = useReducer(reducer, button_click_search_state)
    const [detailProState, dispatchDetailProState] = useReducer(reducer, state)
    const [userState, dispatchUserState] = useReducer(reducer, user_state)
    const [tokoState, dispatchTokoState] = useReducer(reducer, state)
    

    // useEffect(() => {
    //     console.log('called it')
    //     Axios.get('http://keudepeunajoh.jsmiot.com/Data/session')
    //     .then(res => {
    //         if(res.data.logged_in){
    //             console.log(res.data.user)
    //         }else{
    //             console.log("gak ada session")
    //         }
    //     })  
    // },[])
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
                    ButtClickSearch:{
                        ButtSearch : buttSearch,
                        DispatchButtSearch : dispatchButtSearch
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
                    }
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
