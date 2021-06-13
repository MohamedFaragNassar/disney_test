import React, { useEffect } from 'react'

const Cart = ({items,handleDel,node}) => {
    
    useEffect(() => {
      
    }, [items])
    return<>
        <div id="cart" ref={node} 
        className="w-80 p-2 rounded-md flex flex-col items-center shadow-xl absolute top-16 right-0 bg-white overflow-auto  " 
        style={{height:500+"px"}}>
                <span>Cart Items</span>
                <div className="w-full flex flex-col items-center mt-4 ">
                    {items?.map(e => 
                        <div className="w-full h-48 p-1 mb-2 border rounded-md flex  ">
                            <img src={e.product.mainImage} className="w-1/2 h-full" />
                            <div className="w-1/2 flex flex-col justify-between h-full items-center p-1">
                                    <span>{e.product.title}</span>
                                    <div className="flex items-center justify-between w-3/4 mt-2 mx-auto">
                                        <span>Quantity : </span>
                                        <span>{e.qty}</span>
                                    </div>
                                    <button className="focus:outline-none" onClick={()=>handleDel(e._id)}>
                                        <img className="w-6 h-6" src="../trash.png" />
                                    </button>
                            </div>
                        </div>    
                    )}
                </div>
        </div>
    </>
}

export default Cart
