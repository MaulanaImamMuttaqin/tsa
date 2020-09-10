import React ,{useReducer} from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'

export const ProductContext = React.createContext()

const product_state = {
    loading:true,
    error:'',
    data: {}
}
const search_state = ''
const reducer = (state, action) => {
    switch (action.type) {
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
        default:
            break;
    }
}
function ParentComponent() {
    const [ProState, dispatchProState] = useReducer(reducer, product_state)
    const [search, dispatchSearch] = useReducer(reducer, search_state)
    return (
        <ProductContext.Provider
            value={
                {
                    Product:{
                        ProductState : ProState,
                        dispatchProductState: dispatchProState
                    },
                    Search:{
                        SearchState: search,
                        DispatchSearchState: dispatchSearch
                    }
                    
                }
            }
        >
            <div>
                <Header/>
                <Body/>
                <Footer/>
            </div>
        </ProductContext.Provider>

        
    )
}

export default ParentComponent
