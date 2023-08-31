import React from "react"
import { HeaderContainer, HeaderComp, BurgerButton, BurgerIcon, LogoContainer, SearchForm, SearchInput, SearchButton, SearchButtonText, SearchButtonIcon, Link, ToFavoriteLink, ToFavoriteIcon, ToBasketLink, ToBasketIcon, MarkerOnBaket, LogInContainer, LoginIcon, LoginText, AddAdvertisementLink, AddAdvertisementLinkText, AddAdvertisementLinkIcon } from "./Header.styled"
const Header:React.FC=()=>{
    return(
        <HeaderComp>
            <HeaderContainer className="container">
                <BurgerButton>
                    <BurgerIcon/>
                </BurgerButton>
                <Link to='/'>
                    <LogoContainer>Logo</LogoContainer>
                </Link>
                <SearchForm>
                    <SearchInput placeholder="Що шукаєте?"/>
                    <SearchButton>
                        <SearchButtonText>Шукати</SearchButtonText>
                        <SearchButtonIcon/>
                    </SearchButton>
                </SearchForm>
                <ToFavoriteLink to='favorite'>
                    <ToFavoriteIcon/>
                </ToFavoriteLink>
                <ToBasketLink to='basket'>
                    <ToBasketIcon/>
                    <MarkerOnBaket/>
                </ToBasketLink>
                <LogInContainer>
                    <LoginIcon/>
                    <LoginText>Увійти</LoginText>
                </LogInContainer>
                <AddAdvertisementLink to='addAdvertisement'>
                    <AddAdvertisementLinkText>Додати оголошення</AddAdvertisementLinkText>
                    <AddAdvertisementLinkIcon/>
                </AddAdvertisementLink>
            </HeaderContainer>
        </HeaderComp>
    )
}

export default Header