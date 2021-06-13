import React, { useEffect, useState } from 'react'
import axios from "axios"
import Spinner from './Spinner'

const ProductDetails = (props) => {
    const page = props.match.params.page 
    //const handleAddItem = props.match.params.handleAddItem
    const items = props.match.params.items
    const [spin,setSpin] = useState(false)
   
    const [details,setDetails] = useState()
    const [qty,setQty] = useState(1)
    const [size,setSize] = useState()
    const [shownImage,setShownImage] = useState(details?.mainImage)
    const getProductDetails = async()=>{
        setSpin(true)

        try{
            const {data} = await axios.get(`http://localhost:5000/product/${page}`)
            setDetails(data)
            setSpin(false)
          }catch(err){
            console.log(err)
            setSpin(false)

          }
    }

    

    const handleAdd = ()=>{
        const limit = details.limit ? Number(details?.limit?.match(/\d+/)[0]) : 1
        if (qty < limit){
            setQty(qty+1)
        }
    }
    const handleDel = ()=>{
        if(qty > 1){
            setQty(qty-1)
        }
    }
    const handleAddToCart=async(e)=>{
        e.preventDefault()
       try{
            const {data} = await axios.post("http://localhost:5000/cart",{details,qty,size})
            if(data.success){
              window.location.reload()
            }
        

        }catch(err){
            console.log(err)
        

        }
        
    }
    useEffect(() => {
        getProductDetails()
       
    }, [page])

    useEffect(() => {
       
    }, [shownImage])
    return <>
        {spin?<Spinner/>:<div className="w-full flex flex-col items-center" >
            <div className="font-semibold">{details?.title}</div>
            <div className="w-full h-1/2 mt-20 flex items-center justify-between" style={{height:500+"px"}}>
                <div className="w-1/2 flex items-center justify-between h-full">
                    <div className="w-1/4 h-full overflow-auto flex flex-col items-center p-1 border-r">
                        {details&&[details.mainImage,...details?.images].map(e => 
                            <img key={e.index} src={e} onClick={()=>setShownImage(e)} className="w-20 h-20 cursor-pointer mb-2" />    
                        )}
                    </div>
                    <img src={shownImage || details?.mainImage} className="max-w-3/4 max-h-full"/>
                </div>
                <form className="w-1/3 flex flex-col items-center p-4 h-full justify-between" 
                    onSubmit={(e)=>handleAddToCart(e)}>
                    <div>
                        <span>Available sizes</span>
                        <select name="size" required={false} className="w-full p-2 border rounded-md mt-2">
                            <option value="">-</option>
                            {details?.sizes.map(e => 
                                <option key={e.index} value={e}>{e}</option>    
                            )}
                        </select>
                    </div>
                    {details?.limit&&<div className="w-1/2 mx-auto flex items-center justify-between">
                        <span>Available Quantity</span>
                        <span>{details?.limit}</span>
                    </div>}
                    <div className="w-full flex items-center justify-center gap-x-2">
                            <span onClick={()=>handleDel()} className="px-4 py-2 border cursor-pointer focus:outline-none">-</span>
                            <span className="w-1/2 p-2 border rounded-md text-center">{qty}</span>
                            <span onClick={()=>handleAdd()} className="p-4 py-2 border cursor-pointer focus:outline-none">+</span>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button className="px-10 py-4 bg-blue-400 rounded-md hover:bg-blue-500 text-white" type="submit">
                            Add To Cart
                        </button>
                    </div>
                </form>
            </div>
        </div>}
    </>
}

export default ProductDetails
