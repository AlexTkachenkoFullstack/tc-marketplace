import React from "react"
import { CardContainer, CardTextContainer, IconFavoriteContainer, ImgCard, ImgCardContainer, ProductName, ProductPrice, ToFavoriteIcon } from "./ItemCard.styled"


interface IProps{
    price:string,
    path:string,
    name:string
}


const ItemCard:React.FC<IProps>=({price,path,name})=>{
    return(
        <CardContainer>
            <ImgCardContainer>
                <ImgCard loading="lazy" src={path} alt={name} width='308px'/>
                <IconFavoriteContainer>
                    <ToFavoriteIcon/>
                </IconFavoriteContainer>
            </ImgCardContainer>
            <CardTextContainer>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}<span>₴</span></ProductPrice>
            </CardTextContainer>
        </CardContainer>
    )
}

export default ItemCard