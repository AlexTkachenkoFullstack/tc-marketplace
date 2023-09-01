import styled from "@emotion/styled";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoArrowRight } from "react-icons/go";
import { MdFavoriteBorder, MdOutlineShoppingBag, MdOutlineAdd } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const HeaderTopContainer=styled.div`
display: flex;
align-items: center;
height:72px;
padding: 16px 32px 16px 32px;
border-bottom: rgba(205, 205, 205, 1) 1px  solid;
border-top-right-radius: 32px;
border-top-left-radius: 32px;
background-color: beige;
`

export const BurgerButton=styled.button`
width:40px;
height:40px;
margin-right:16px;
display:flex;
justify-content: center;
align-items: center;
`

export const  BurgerIcon=styled(RxHamburgerMenu)`
color:rgba(67, 67, 67, 1);
width:24px;
height:24px;
`

export const Link=styled(NavLink)`
`

export const LogoContainer=styled.div`
display:flex;
justify-content: center;
align-items: center;
width:60px;
height:32px;
border-radius:25px;
background-color:rgba(67, 67, 67, 1);
color: white;
margin-right:16px;
`

export const  SearchForm=styled.form`
display:flex;
justify-content: space-between;
align-items: center;
width:520px;
height:40px;
padding-left: 16px;
margin-right:auto;
background-color:rgba(249, 249, 249, 1);
border-radius:18px;
border: rgba(209, 239, 237, 1) 1px solid;
`

export const SearchInput=styled.input`
font-size:14px;
line-height:1.43;
border: none;
background-color: inherit;
width:100%;
outline: none;
`

export const SearchButton=styled.button`
display:flex;
justify-content: space-between;
align-items: center;
width:100px;
height:32px;
background-color:rgba(0, 147, 179, 1);
padding: 10px 12px 10px 12px;
border-radius:100px;
margin-left: 16px;
`

export const SearchButtonText=styled.p`
color:rgba(254, 255, 255, 1);
font-family: Roboto, sans-serif;
font-size: 14px;
line-height:1.43;
font-weight: 600;
margin-right:8px;
`
export const SearchButtonIcon=styled(GoArrowRight)`
color:rgba(254, 255, 255, 1);
width:16px;
height:16px;
`

export const ToFavoriteLink=styled(NavLink)`
width:40px;
height:40px;
display: flex;
justify-content: center;
align-items: center;
margin-right:4px;
`

export const ToFavoriteIcon=styled(MdFavoriteBorder)`
width: 24px;
height:24px;
color:rgba(67, 67, 67, 1);
`
export const ToBasketLink=styled(NavLink)`
position:relative;
width:40px;
height:40px;
display: flex;
justify-content: center;
align-items: center;
margin-right:4px;
`

export const ToBasketIcon=styled(MdOutlineShoppingBag)`
width: 24px;
height: 24px;
color:rgba(67, 67, 67, 1);
`

export const MarkerOnBaket=styled.div`
position:absolute;
top: 8px;
right: 8px;
width:6px;
height:6px;
background-color: rgba(192, 0, 0, 1);
border-radius: 100px;
`

export const LogInContainer=styled.button`
display: flex;
width:107px;
justify-content: space-between;
align-items: center;
padding: 8px 12px;
margin-right:4px;
`

export const LoginIcon = styled(FaRegCircleUser)`
width: 22px;
height: 22px;
color:rgba(67, 67, 67, 1);
`

export const LoginText=styled.p`
font-size:16px;
line-height:1.5;
font-weight:700;
`

export const AddAdvertisementLink=styled(NavLink)`
display:flex;
justify-content: space-between;
align-items: center;
height: 40px;
padding:10px 16px 10px 16px;
border-radius:100px;
border: rgba(0, 147, 179, 1) 1px solid;
`

export const AddAdvertisementLinkText=styled.p`
font-size:16px;
font-weight:700;
font-family:Roboto, sans-serif;
color:rgba(0, 147, 179, 1);
line-height:1.5;
`

export const AddAdvertisementLinkIcon=styled(MdOutlineAdd)`
width: 24px;
height: 24px;
color:rgba(0, 147, 179, 1);
`