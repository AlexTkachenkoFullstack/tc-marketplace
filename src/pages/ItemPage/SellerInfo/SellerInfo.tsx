import React, { useEffect, useState } from "react";
import styles from './SellerInfo.module.scss'
import { IUserDetails } from "types/IUserDetails";
import { convertRegistrationDate } from "utils/convertRegistrationDate";
import noImageImg from '..//..//..//assets/images/noUserImage.webp'
import viberIcon from '..//..//..//assets/icons/viber.svg'
import telegtamIcon from '..//..//..//assets/icons/telegram.svg'
import phoneIcon from '..//..//..//assets/icons/phone.svg'
import chatIcon from '..//..//..//assets/icons/chat_bubble_outline.svg'
import { IUserContacts } from "types/IUserContacts";

interface IUser{
    userInfo:IUserDetails,
    userContacts?:IUserContacts | null
}

export const SellerInfo:React.FC<IUser>=({userInfo, userContacts})=>{
    const [userPhone, setUserPhone] = useState<null | string>(null)
    const [userEmail, setUserEmail] = useState<null | string>(null)
    useEffect(()=>{
        if(userContacts?.phone){
            setUserPhone(userContacts?.phone)
        }
        if(userContacts?.email){
            setUserEmail(userContacts?.email)
        }
    }, [userContacts?.email, userContacts?.phone])

    return(
        <div className={styles.userInfoSection}>
            <h4 className={styles.userInfoTitle}>Продавець</h4>
            <div className={styles.userProfileContainer}>
                <div className={styles.userAvatarContainer}>
                    <img className={styles.userAvatar} src={userInfo.photo || noImageImg} alt="User avatar" width={48}/>       
                </div>
                <div className={styles.userNameContainer}>
                        <p className={styles.userName}>{userInfo.name}</p>
                        <p className={styles.userRegistrationDate}>на сайті з {convertRegistrationDate(userInfo.createdAt)}р.</p>
                </div>
            </div>
            {userPhone
            &&
                <div className={styles.userContactsContainer}>
                    <a href= {'https://msng.link/o?'+userPhone+'=vi'} className={styles.messagerLink}>
                        <img className={styles.messagerIcon} src={viberIcon} alt='viber'/>
                    </a>
                    <a href= {"https://t.me/"+userPhone} className={styles.messagerLink}>
                        <img className={styles.messagerIcon} src={telegtamIcon} alt='telegram'/>
                    </a>
                    <a href={"tel:"+userPhone} className={styles.phoneLink}>
                        <p>{userPhone}</p>
                        <img className={styles.phoneIcon} src={phoneIcon} alt="phone number"/>
                    </a>
                </div>
            }
            {userEmail
            &&
                    <a href={`mailto:${userEmail}`} className={styles.chatButton}>
                        <p className={styles.buttonChatText}>Написати на E-mail</p>
                        <img className={styles.phoneIcon} src={chatIcon} alt="email"/>
                    </a>
            }
        </div>
    )
}