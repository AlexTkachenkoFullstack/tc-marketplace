import React from "react"
import { HeaderBottomContainer,  NavList, NavListItem, NavListItemLink } from "./HeaderBottom.styled"



const HeaderBottom:React.FC=()=>{
    return(<HeaderBottomContainer className="container">
                <NavList>
                        <NavListItem>
                            <NavListItemLink to='cloth'>Одяг</NavListItemLink>
                        </NavListItem>
                        <NavListItem>
                            <NavListItemLink to='hygiene'>Гігієна</NavListItemLink>
                        </NavListItem>
                        <NavListItem>
                            <NavListItemLink to='babyGoods'>Для немовлят</NavListItemLink>
                        </NavListItem>
                        <NavListItem>
                            <NavListItemLink to='devAndCreat'>Розвиток та творчість</NavListItemLink>
                        </NavListItem>
                        <NavListItem>
                            <NavListItemLink to='toy'>Іграшки</NavListItemLink>
                        </NavListItem>
                        <NavListItem>
                            <NavListItemLink to='schoolGoods'>Все для школи</NavListItemLink>
                        </NavListItem>
                        <NavListItem>
                            <NavListItemLink to='nutritionAndFeeding'>Харчування та годування</NavListItemLink>
                        </NavListItem>
                </NavList>
        </HeaderBottomContainer>
    )
}

export default HeaderBottom