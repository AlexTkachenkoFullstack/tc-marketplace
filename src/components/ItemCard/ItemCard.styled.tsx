import styled from "@emotion/styled";
import { MdFavoriteBorder } from "react-icons/md";

export const CardContainer=styled.li`
width:308px;
height:368px;
`
export const ImgCardContainer=styled.div`
position:relative;
height:311px;
width:100%;
overflow: hidden;
margin-bottom:10px;
`

export const ImgCard=styled.img`
object-fit: cover;
display:block;
height: 100%;
width: 100%;
`
export const IconFavoriteContainer=styled.div`
position:absolute;
top:6px;
right:6px;
background-color:white;
width:40px;
height:40px;
display:flex;
justify-content: center;
align-items: center;
`
export const ToFavoriteIcon=styled(MdFavoriteBorder)`
width: 24px;
height:24px;
color:rgba(67, 67, 67, 1);
`
export const CardTextContainer=styled.div`
`

export const ProductName=styled.h4`
font-weight:700;
font-size:16px;
line-height:1.5;
font-family: Roboto, sans-serif;
color:rgba(67, 67, 67, 1);
margin-bottom:8px;
`
export const ProductPrice=styled.p`
font-weight:600;
font-size:14px;
line-height:1.43;
font-family: Roboto, sans-serif;
color:rgba(67, 67, 67, 1);
`