import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios"
import ProductCard from './ProductCard'
import Spinner from './Spinner'
const Main = () => {
    const [products,setProducts] = useState([])
    const [spin,setSpin] = useState(false)
    const getProducts = async()=>{
      setSpin(true)
      try{
        const {data} = await axios.get("http://localhost:5000/products")
        setProducts(data)
        setSpin(false)
      }catch(err){
        console.log(err)
        setSpin(false)

      }
    }
    useEffect(() => {
     getProducts()
    }, [])
    return <>
      {spin?<Spinner /> :<div className="w-full mx-auto flex flex-col items-center">
          <div className="w-full p-2 flex items-center justify-between flex-wrap gap-y-4">
              {products?.map(e => <>
                {e.image&&<ProductCard  product={e} />}
                </>
              )}
          </div>
      </div>}
    </>
}

export default Main
