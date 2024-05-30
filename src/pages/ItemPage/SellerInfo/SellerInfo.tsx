import React, { useEffect, useState } from "react";
import styles from './SellerInfo.module.scss'
import { IUserDetails } from "types/IUserDetails";
import { convertRegistrationDate } from "utils/convertRegistrationDate";
import noImageImg from '..//..//..//assets/images/noUserImage.webp'
import {ReactComponent as ViberIcon} from '..//..//..//assets/icons/viber.svg'
import {ReactComponent as TelegtamIcon} from '..//..//..//assets/icons/telegram.svg'
import {ReactComponent as PhoneIcon} from '..//..//..//assets/icons/phone.svg'
import {ReactComponent as ChatIcon} from '..//..//..//assets/icons/chat_bubble_outline.svg'
import { IUserContacts } from "types/IUserContacts";

interface IUser{
    isShow:boolean;
    userInfo:IUserDetails,
    userContacts?:IUserContacts | null
    handleShow:()=>void;
}

export const SellerInfo:React.FC<IUser>=({userInfo, userContacts,isShow,handleShow})=>{
    const [userPhone, setUserPhone] = useState<null | string>(null)
    const [userEmail, setUserEmail] = useState<null | string>(null)
    // const [isShow, setIsShow] = useState<boolean>(false)
    useEffect(()=>{
        if(userContacts?.phone){
            setUserPhone(userContacts?.phone)
        }
        if(userContacts?.email){
            setUserEmail(userContacts?.email)
        }
    }, [userContacts?.email, userContacts?.phone])
// const handleBtnClick =()=>{
//     setIsShow(true)
// }
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
            <button className={styles.show_btn} onClick={()=>handleShow()} style={{display:isShow ?'none':''}}>Звʼязатись з продавцем</button>
            {userPhone
            && isShow &&
                <div className={styles.userContactsContainer}>
                    <div className={styles.wrapper_contacts}>
                    <a href= {'https://msng.link/o?'+userPhone+'=vi'} className={styles.messagerLink}>
                        <ViberIcon className={styles.messagerIcon}/>
                    </a>
                    <a href= {"https://t.me/"+userPhone} className={styles.messagerLink}>
                        <TelegtamIcon className={styles.messagerIcon} />
                    </a>
                    </div>
                    <a href={"tel:"+userPhone} className={styles.phoneLink}>
                        <p>{userPhone}</p>
                        <PhoneIcon className={styles.phoneIcon} />
                    </a>
                </div>
            }
            {userEmail
            && isShow &&
                    <a href={`mailto:${userEmail}`} className={styles.chatButton}>
                        <p className={styles.buttonChatText}>Написати на E-mail</p>
                        <ChatIcon className={styles.emailIcon}/>
                    </a>
            }
        </div>
    )
}