import React,{useContext, useEffect} from 'react'

import '../style/HomeBody.css'
import '../style/food.css'
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'

function SearchBody() {
    const productContext = useContext(ProductContext)

    useEffect(() => {
        axios.get(`http://keudepeunajoh.jsmiot.com/Data/search_product/${productContext.Search.SearchState}`)
            .then(response => {
                console.log(response.data)
                productContext.Product.dispatchProductState({type: 'FETCH_SUCCESS', payload:response.data})
            })
            .catch(error =>{
                console.log('error')
                productContext.Product.dispatchProductState({type: 'FETCH_ERROR'})
            })
        
    },[])
    return (
        <div className="content">
            <div className="container">
                <div className="content-header">
                    <h4>Hasil berdasarkan pencarian {productContext.Search.SearchState}</h4>
                </div>
                <div className="foods">
                    {
                            productContext.Product.ProductState.loading ? <h2>bentar</h2> :
                            <div>
                                <div className="foods">
                                    {
                                        productContext.Product.ProductState.data.product.map(data => 
                                            <Food key={data.id} Data={data}/>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        }   
                </div>
            </div>
        </div>
        
    )
}

export default SearchBody
