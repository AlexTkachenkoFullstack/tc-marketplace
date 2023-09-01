import React from "react"
import { HeaderComp} from "./Header.styled"
import HeaderTop from "./HeaderTop/HeaderTop"
import HeaderBottom from "./HeaderBottom/HeaderBottom"
const Header:React.FC=()=>{
    return(
        <HeaderComp>
            <HeaderTop/> 
            <HeaderBottom/>
        </HeaderComp>
    )
}

export default Header