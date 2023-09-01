import React from "react"
import { HeaderTopContainer, AddAdvertisementLink, AddAdvertisementLinkIcon, AddAdvertisementLinkText, BurgerButton, BurgerIcon, Link, LogInContainer, LoginIcon, LoginText, LogoContainer, MarkerOnBaket, SearchButton, SearchButtonIcon, SearchButtonText, SearchForm, SearchInput, ToBasketIcon, ToBasketLink, ToFavoriteIcon, ToFavoriteLink } from "./HeaderTop.styled"
const HeaderTop:React.FC=()=>{
    return(<HeaderTopContainer className="container">
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
    </HeaderTopContainer>

    )
}

export default HeaderTop