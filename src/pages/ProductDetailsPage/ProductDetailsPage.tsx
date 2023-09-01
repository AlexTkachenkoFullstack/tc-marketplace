import React from "react"
import { useParams } from "react-router-dom";
const ProductDetailsPage:React.FC=()=>{
console.log('good')
    const { productId } = useParams();
    console.log(productId)

return (<h1>ProductDetailsPage {productId}</h1>)
}

export default ProductDetailsPage