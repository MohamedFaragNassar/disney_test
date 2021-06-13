import React from 'react'
import {Link} from 'react-router-dom'
const ProductCard = ({product}) => {

    const getUrl = () => {
        const url = product?.link.replace("https://www.shopdisney.co.uk/","")
        return url.split("?")[0]
    }
    return <>
        <Link to={`/product/${getUrl()}`} 
        className="w-60 h-96 p-2 border rounded-md flex flex-col items-center justify-between">
            <img className="w-full h-60" src={product.image} />
            <span className="">{product.title}</span>
            <span>{`£${product.price}` }</span>
        </Link>
    </>
}

export default ProductCard
