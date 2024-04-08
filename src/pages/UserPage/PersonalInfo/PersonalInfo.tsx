import React from 'react';
import styles from './PersonalInfo.module.scss';
import { UploadPhoto } from 'components/UploadPhoto/UploadPhoto';

const PersonalInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainTitle}>
     Особисті дані
        </h2>
        <div className={styles.blocTitleFoto}>
          <div className={styles.boxTitleFoto}>
            <h2 className={styles.titleAddFoto}>Фотографія</h2>          
          </div>         
        </div>
        <div className={styles.imgContainer}> 
           {/* <UploadPhoto */}
            {/* // mainPhoto={mainPhoto}
            // isShow={isShow[0]}
            // inputRef={inputRef}
            // selectedImages={sortedImages}
            // handleAddPhoto={handleAddPhoto}
            // handleDeletePhoto={handleDeletePhoto}
            // addMainPhoto={handleAddMainePhoto} */}
          {/* />  */}
          {/* {isShow[0] && (
            <span className={styles.photo_errorMessage}>{messages[0]}</span>
          )} */}
        </div>
       <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>VIN code</h2>
              {/* <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block3')}
              >
                {isOpen.block3 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div> */}
            </div>
    
            <div className={styles.listItem}>
              {/* {isOpen.block3 && ( */}
                <div className={styles.item_dropdown_box}>
                  {/* {vincode ? (
                    <label
                      htmlFor="vincode"
                      className={
                        activeField[2] !== 'vincode' && messages[2]
                          ? `${styles.VinCode_red}`
                          : `${styles.VinCode_label}`
                      }
                    >
                      VIN code
                    </label>
                  ) : null} */}
                  <input
                    autoComplete="off"
                    // readOnly={immutableData}
                    // ref={input1Ref}
                    className={`${styles.inputPhone} ${styles.VinCode_field}`}
                    // style={{
                    //   cursor: immutableData ? 'not-allowed' : 'pointer',
                    // }}
                    // onFocus={event => handleFocus(2, event, 'vincode')}
                    // onBlur={event => handleBlur(2, event)}
                    id="vincode"
                    type="text"
                    maxLength={17}
                    placeholder={`VIN code`}
                    // value={vincode}
                    // onChange={handleVinCode}
                  />
                  {/* {isShow[2] && (
                    <span className={styles.VinCode_errorMessage}>
                      {messages[2]}
                    </span>
                  )} */}
                </div>
              {/* )} */}
            </div>
          </div> 

    </div>
  );
};

export default PersonalInfo;