import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";


export const HeaderBottomContainer=styled.div`
display:flex;
padding-top:8px;
padding-bottom:8px;
background-color: beige;
`

export const NavList=styled.ul`
display:flex;
justify-content: center;
align-items: center;
width:100%;
gap:24px;
`

export const NavListItem=styled.li`
`

export const NavListItemLink=styled(NavLink)`
color:rgba(67, 67, 67, 1);
font-family: Roboto, sans-serif;
font-size: 14px;
line-height:1.43;
font-weight: 600; 
`