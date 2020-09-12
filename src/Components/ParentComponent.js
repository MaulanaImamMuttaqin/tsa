import React ,{Fragment, useReducer} from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import {Switch, Route} from "react-router-dom";
import Login from './Auth/Login';
import Regist from './Auth/Regist';
export const ProductContext = React.createContext()

// states
    // state component 1 = HomeBody
    // state component 2 = SearchBody
const component =  1


const product_state = {
    loading:true,
    error:'',
    data: {}
}
const product_id = 0
const search_state = ''
const button_click_search_state = ''

//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...product_state,
                loading:true
            }
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                data: action.payload,
                error:''
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                data: {},
                error:'Something went wrong'
            }
        case 'UPDATE_SEARCH':
            return action.value

        case 'UPDATE_SEARCH_ONCLICK':
            return action.value
            
        case 'CHANGE_COMPONENT':
            return action.value
        case 'UPDATE_PRODUCT_ID':
            return action.value
        default:
            break;
    }
}
function ParentComponent() {
    const [ProState, dispatchProState] = useReducer(reducer, product_state)
    const [searchProState, dispatchSearchProState] = useReducer(reducer, product_state)
    const [search, dispatchSearch] = useReducer(reducer, search_state)
    const [CompState, dispatchCompState] = useReducer(reducer, component)
    const [buttSearch, dispatchButtSearch] = useReducer(reducer, button_click_search_state)
    const [proId, dispatchProId] = useReducer(reducer, product_id)
    const [detailProState, dispatchDetailProState] = useReducer(reducer, product_state)
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
                    Search:{
                        SearchState: search,
                        DispatchSearchState: dispatchSearch
                    },
                    ButtClickSearch:{
                        ButtSearch : buttSearch,
                        DispatdhButtSearch : dispatchButtSearch
                    },
                    Component:{
                        ComponentState : CompState,
                        DispatchComponentState : dispatchCompState
                    },
                    proId: {
                        ProId: proId,
                        DispatchProId : dispatchProId
                    },
                    DetailProduct: {
                        DetailProState: detailProState,
                        DispatchDetailProState : dispatchDetailProState
                    }
                }
            }
        >
            <div>
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
                
            </div>
        </ProductContext.Provider>

        
    )
}

export default ParentComponent
