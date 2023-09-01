import React from "react"

interface IProps{
    category:string
}

const ProductsPage:React.FC<IProps>=({category})=>{
    return (<>
    <h1>{category}</h1>
    </>)
}

export default ProductsPage