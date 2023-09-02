import React from "react"
import { HeaderBottomContainer,  NavList, NavListItem, NavListItemLink } from "./HeaderBottom.styled"

const productsLinks=[
    {link:'cloth', name: 'Одяг'},
    {link:'hygiene', name: 'Гігієна'},
    {link:'babyGoods', name: 'Для немовлят'},
    {link:'devAndCreat', name: 'Розвиток та творчість'},
    {link:'toy', name: 'Іграшки'},
    {link:'schoolGoods', name: 'Все для школи'},
    {link:'nutritionAndFeeding', name: 'Харчування та годування'},
]



const HeaderBottom:React.FC=()=>{
    return(<HeaderBottomContainer className="container">
                <NavList>
                    {productsLinks.map(link=>(
                        <NavListItem key={link.link}>
                            <NavListItemLink to={link.link}>{link.name}</NavListItemLink>
                        </NavListItem>
                    ))}
                </NavList>
        </HeaderBottomContainer>
    )
}

export default HeaderBottom