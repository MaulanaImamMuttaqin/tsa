import React ,{Fragment, useReducer, useEffect} from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import {Switch, Route} from "react-router-dom";
import Login from './Auth/Login';
import Regist from './Auth/Regist';
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
        case 'UPDATE_SEARCH_ONCLICK':
            return action.value
            
        case 'SET_USER_STATE':
            return {
                loading:false,
                login:true,
                data: action.payload
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
    

    useEffect(()=> {
        if(localStorage.getItem('SavedToken') !== null){

            Axios.post('http://localhost/keudepeunajoh-rest-api2/Auth/Authorization',{}, {
                headers: {
                    'Authorization': localStorage.getItem('SavedToken')
                  }
            }).then(res1 => {
                
                Axios.get(`http://localhost/keudepeunajoh-rest-api2/Data?toko_id=${res1.data.id}`, {
                    headers: {
                      'Authorization': localStorage.getItem('SavedToken')
                    }
                  })
                .then(res2 => {
                    
                    dispatchTokoState({type: "FETCH_SUCCESS", payload: res2.data.data})
                    dispatchUserState({type: "SET_USER_STATE", payload: res1.data})

                    
                }).catch(error => {
                    dispatchTokoState({type: "FETCH_ERROR"})
                })
    
            }).catch(error => {
                dispatchUserState({type: "SET_USER_STATE_FAILED"})
            })
        }
        console.log("parent called")
        
    },[])
    useEffect(() => {
        Axios.get('http://localhost/keudepeunajoh-rest-api2/Data/')
            .then(response => {
                dispatchProState({type: 'FETCH_SUCCESS', payload:response.data.data})
                
            })
            .catch(error =>{
                dispatchProState({type: 'FETCH_ERROR'})
            })
        
    },[tokoState.data])   
    // useEffect(()=>{
    //     // if(localStorage.getItem('SavedToken') !== null){
    
    //     //     Axios.post('http://localhost/keudepeunajoh-rest-api2/Auth/Authorization',{}, {
    //     //         headers: {
    //     //             'Authorization': localStorage.getItem('SavedToken')
    //     //             }
    //     //     }).then(res1 => {
    //     //             dispatchUserState({type: "SET_USER_STATE", payload: res1.data})
        
    //     //     }).catch(error => {
    //     //         dispatchUserState({type: "SET_USER_STATE_FAILED"})
    //     //     })
    //     // }
    //     console.log(Math.floor(Math.random() * 100))
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
