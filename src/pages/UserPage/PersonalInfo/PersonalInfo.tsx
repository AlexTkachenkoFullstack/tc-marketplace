import React, { useEffect, useRef, useState } from 'react';
// import { franc } from 'franc';
import styles from './PersonalInfo.module.scss';
import styles_preview from '../../../components/Preview/Preview.module.scss';
import styles_uploadPhoto from '../../../components/UploadPhoto/UploadPhoto.module.scss';
import { UploadPhoto } from 'components/UploadPhoto/UploadPhoto';
import { UploadedImage } from 'types/UploadedImage';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { fetchCity, fetchRegions } from 'redux/filter/operations';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getFilterCities, getFilterRegions } from 'redux/filter/selectors';
import { IRegion } from 'types/IRegion';
import { getArrayCityOfId, getArrayOfId } from 'utils/getArrayOfId';
import { ISearchParams } from 'types/ISearchParam';
import { ICities } from 'types/ICities';
import { ResponseData } from 'types/ResponseData';
import { RequestData } from 'types/RequestData';
import { extractPhotoName } from 'utils/extractPhotoName';
import {
  deletePhotoUserInfo,
  getUserInfo,
  putUserInfo,
} from 'services/services';

import Loader from 'components/Loader/Loader';

const staticValue = '+380';
const N = 10;
const maxDigits = 9;
const PersonalInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);
  // const [isOpen, setIsOpen] = useState<BlocksVisibilityState>(() => {
  //   return getWindowWidth() < 767
  //     ? getInitialBlocksVisibility(false)
  //     : getInitialBlocksVisibility(true);
  // });
  const [immutableData, setImmutableData] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [resetValue, setResetValue] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isShow, setIsShow] = useState(Array(N).fill(false));
  const [messages, setMessages] = useState(Array(N).fill(''));
  const [needToAddFile, setNeedToAddFile] = useState(false);
  const [resetCheckedItemId, setResetCheckedItemId] = useState(false);
  const [isMainePhoto, setIsMainePhoto] = useState(false);
  const [activeField, setActiveField] = useState(Array(N).fill(''));
  const [selectedImage, setSelectedImage] = useState<UploadedImage[]>([]);
  const [mainPhoto, setMainPhoto] = useState<string>('');
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [name, setName] = useState<string>('');
  const [prevStateCity, setPrevStateCity] = useState<string | string[]>('');
  const [email, setEmail] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');

  const [selectedRegion, setSelectedRegion] = useState<string | string[]>(
    'Область',
  );
  const [selectedCity, setSelectedCity] = useState<string | string[]>('Місто');
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const cities: ICities[] = useAppSelector(getFilterCities);
  const [optionList, setOptionList] = useState<ICities[]>([]);
  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchUserInfo() {
      try {
        const response = await getUserInfo();

        setResponseData(response);
        setSelectedImage(
          response.photoUrl !== null
            ? [
                {
                  name: String(
                    response.photoUrl !== null
                      ? extractPhotoName(response.photoUrl)
                      : '',
                  ),
                  url: response.photoUrl,
                  id: response.id,
                },
              ]
            : [],
        );
        setIsMainePhoto(response.photoUrl !== null);
        setIsDisabled(response.photoUrl !== null);
        setMainPhoto(
          String(
            response.photoUrl !== null
              ? extractPhotoName(response.photoUrl)
              : '',
          ),
        );
        setName(response.name !== null ? response.name : '');
        setInputPhone(response.phone !== null ? response.phone.slice(4) : '');
        setEmail(response.email);
        setSelectedRegion(
          response.region !== null ? response.region : 'Область',
        );
        setTimeout(() => {
          setSelectedCity(response.city !== null ? response.city : 'Місто');
          setPrevStateCity(response.city !== null ? response.city : '')
          setIsLoading(false);
          setIsValidate(false);
        }, 300);
        setImmutableData(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const regionId = getArrayOfId(regions, selectedRegion);
      if (regionId.length > 0) {
        const searchParams: Pick<ISearchParams, 'regionId'> = {
          regionId,
        };
        const searchConfig = {
          searchParams,
        };
        dispatch(fetchCity(searchConfig));
      }
    }
  }, [selectedRegion, dispatch, regions]);

  useEffect(() => {
    if (selectedRegion) {
      setResetValue(true);
      setResetValue(false);
      setOptionList(cities);
    }
  }, [cities, selectedRegion]);
  useEffect(() => {
    // setIsValidate(false);
    if (selectedCity !== prevStateCity) {
      setIsValidate(true);
      setPrevStateCity(selectedCity)
    }
  }, [selectedCity, prevStateCity]);
  const openNotification = (index: number, message: string) => {
    setIsShow(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setMessages(prevState => {
      const newMessages = [...prevState];
      newMessages[index] = message;
      return newMessages;
    });
  };
  const closeMessage = (index: number) => {
    setIsShow(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };
  // const handleMobileBtnIsOpen = (blockName: keyof BlocksVisibilityState) => {
  //   setIsOpen(prevState => ({
  //     ...prevState,
  //     [blockName]: !prevState[blockName],
  //   }));
  // };
  const handleAddPhoto = (newImages: UploadedImage[]) => {
    closeMessage(0);
    setSelectedImage(newImages);
    setNeedToAddFile(true);
    setIsDisabled(true);
    setIsMainePhoto(false);
  };
  const handleDeletePhoto = (imageId: string, name: string) => {
    if (responseData && responseData.id === imageId) {
      setIsLoading(true);
      deletePhotoUserInfo(() => {
        setSelectedImage([]);
        setNeedToAddFile(true);
        setIsDisabled(false);
        setIsLoading(false);
        setIsValidate(true)
        if (name === mainPhoto) {
          setMainPhoto('');
        }
        setResetCheckedItemId(true);
      }).catch(error => {
        console.error('Ошибка в запросе:', error);
      });
    } else {
      setSelectedImage(selectedImage.filter(image => image.id !== imageId));
      setIsDisabled(false);
      setNeedToAddFile(true);
      setIsValidate(true)
      if (name === mainPhoto) {
        setMainPhoto('');
      }
    }
  };
  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // if (value.length === 0) {
    //   setIsValidate(false);
    // }
    setName(value);
  };
  const detectInputLanguage = (inputValue: string) => {
    const ukrLower = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
    const ukrUpper = ukrLower.toUpperCase();
    const ruLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const ruUpper = ruLower.toUpperCase();
    const enLower = 'abcdefghijklmnopqrstuvwxyz';
    const enUpper = enLower.toUpperCase();

    let hasUkr = false;
    let hasRu = false;
    let hasEn = false;

    for (let i = 0; i < inputValue.length; i++) {
      const char = inputValue[i];
      console.log('char :>> ', ukrLower.includes(char));
      if (ukrLower.includes(char) || ukrUpper.includes(char)) {
        hasUkr = true;
      }
      if (ruLower.includes(char) || ruUpper.includes(char)) {
        hasRu = true;
      }
      if (enLower.includes(char) || enUpper.includes(char)) {
        hasEn = true;
      }
    }

    if (hasUkr && !hasRu && !hasEn) {
      return 'ukr';
    } else if (hasRu && !hasUkr && !hasEn) {
      return 'ru';
    } else if (hasEn && !hasUkr && !hasRu) {
      return 'eng';
    } else {
      return 'unknown';
    }

    // return language;
  };

  const handleOnBlurName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.target.classList.remove(styles.inputVincodeInValid);
    closeMessage(1);

    if (value && value.length > 2) {
      const isValid = detectInputLanguage(value);

      if (isValid === 'ukr' || isValid === 'eng') {
        closeMessage(1);
        event.target.classList.remove(styles.inputVincodeInValid);
        console.log('true');
        setIsValidate(true);
        setName(value);
      }
    } else {
      event.currentTarget.classList.add(styles.inputVincodeInValid);
      setIsValidate(false);
      openNotification(
        1,
        `Введіть будь ласка ім'я, українською або англійською мовою!`,
      );
    }
  };
  // const handleOnBlurName = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   event.target.classList.remove(styles.inputVincodeInValid);
  //   closeMessage(1);

  //   if (name && name.length > 2) {
  //     const isValid = franc(name);
  //     console.log('isValid :>> ', isValid);
  //     if (isValid === 'ukr' || isValid === 'eng') {
  //       closeMessage(1);
  //       event.target.classList.remove(styles.inputVincodeInValid);
  //       console.log('true');
  //       setIsValidate(true);
  //       setName(value);
  //     }
  //   } else {
  //     event.currentTarget.classList.add(styles.inputVincodeInValid);
  //     setIsValidate(false);
  //     openNotification(
  //       1,
  //       `Введіть будь ласка ім'я, українською або ангійською мовою!`,
  //     );
  //   }
  // };

  const handleOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    closeMessage(4);
    const value = event.target.value;
    setEmail(value);
  };
  const handleOnBlurEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    openNotification(4, `Введіть будь ласка електронну пошту!`);
    if (email && email.length > 0) {
      closeMessage(4);
      const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const regex = new RegExp(regexp);
      const isValid = regex.test(email);
      if (isValid) {
        setEmail(value);
      } else {
        openNotification(
          4,
          `Будь ласка, введіть дійсну адресу електронної пошти. Поточна адреса ${email} недійсна! `,
        );
      }
    }
  };
  const handleOnFocusEmail = (index: number, name: string) => {
    setActiveField(prevState => {
      const activeField = [...prevState];
      activeField[index] = name;
      return activeField;
    });
  };

  const handleAddMainePhoto = (title: string) => {
    setMainPhoto(title);
  };
  const handleInputPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.target.classList.remove(styles.inputVincodeInValid_staticValue);
    closeMessage(3);
    if (/^[0-9]*$/.test(value) && value.length <= maxDigits) {
      setInputPhone(value);
    }
  };
  const remainingDigits = maxDigits - (inputPhone.length - 1);

  const handleInputPhoneBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length !== 9) {
      setIsValidate(false);
      event.currentTarget.classList.add(styles.inputVincodeInValid_staticValue);

      openNotification(3, `Залишилось ввести цифр ${remainingDigits - 1}!`);
    }
    if (value.length === 9) {
      setIsValidate(true);
      event.currentTarget.classList.remove(
        styles.inputVincodeInValid_staticValue,
      );

      closeMessage(3);
    }
  };

 
  const handleAddOrUpdateInfo = () => {
    if (name.length > 2 && isValidate && inputPhone.length === 9) {
      const createFormData = () => {
        const cityId = getArrayCityOfId(cities, selectedCity);

        const formData = new FormData();

        selectedImage.forEach((item: any) => {
          if (needToAddFile) {
            formData.append('multipartFile', item.file[0]);
          }
        });

        let comparedValues: { [key: string]: any } = {};

        const requestDataForChecking: RequestData = {
          id: responseData!.id,
          name: name,
          email: email,
          phone: staticValue + inputPhone,
        };
        if (responseData !== null && typeof responseData === 'object') {
          for (const key in requestDataForChecking) {
            if (
              key in responseData &&
              requestDataForChecking[key] !== responseData[key]
            ) {
              comparedValues[key] = requestDataForChecking[key];
            }
          }
        }
        const responseDataPhotoName = String(
          responseData!.photoUrl !== null
            ? extractPhotoName(responseData!.photoUrl)
            : '',
        );
        if (responseDataPhotoName !== mainPhoto) {
          comparedValues = {
            ...comparedValues,
            photoUrl: mainPhoto,
          };
        }
        if (selectedCity !== responseData!.city) {
          comparedValues = {
            ...comparedValues,
            cityId: cityId[0],
          };
        }

        const newData: RequestData = {};
        const requestData: RequestData = {
          id: responseData!.id,
          name: name,
          email: email,
          phone: staticValue + inputPhone,
          cityId: cityId[0],
          photoUrl: mainPhoto,
        };
        const keysFromComparedValues = Object.keys(comparedValues);
        const allKeysExist = keysFromComparedValues.every(
          key => key in requestData,
        );
        if (allKeysExist) {
          for (const key in requestData) {
            if (
              key in comparedValues &&
              requestData[key] !== undefined &&
              comparedValues[key] !== undefined
            ) {
              newData[key] = requestData[key];
            }
          }
        }

        if (newData && Object.keys(newData).length > 0) {
          formData.append(
            'body',
            new Blob([JSON.stringify(newData)], { type: 'application/json' }),
          );
        }
        return formData;
      };
      const formData: FormData = createFormData();

      if (formData.has('multipartFile') || formData.has('body')) {
        setIsLoading(true);
        putUserInfo(formData).then(response => {
          // openNotification(18, 'Дані оновлені!');
          setIsLoading(false);
          setIsValidate(false);
        });
      } else {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    } else {
      if (name === '') {
        openNotification(
          1,
          "Введіть будь ласка ім'я, українською або ангійською мовою!",
        );
      }
      if (inputPhone === '') {
        openNotification(3, 'Введіть будь ласка номер!!');
      }
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title_category}>Особисті дані</h2>
      <div className={styles.box_item}>
        <div className={styles.box_title_foto}>
          <h2 className={styles.title}>Фотографія</h2>
        </div>

        <div className={styles.imgContainer}>
          <UploadPhoto
            isMainePhoto={isMainePhoto}
            isDisabled={isDisabled}
            stylesUserInfo={[styles_preview, styles_uploadPhoto]}
            resetCheckedItemId={resetCheckedItemId}
            setResetCheckedItemId={setResetCheckedItemId}
            mainPhoto={mainPhoto}
            isShow={isShow[0]}
            inputRef={inputRef}
            selectedImages={selectedImage}
            handleAddPhoto={handleAddPhoto}
            handleDeletePhoto={handleDeletePhoto}
            addMainPhoto={handleAddMainePhoto}
            errorAddPhoto={openNotification}
            closeMessage={closeMessage}
          />
          {isShow[0] && (
            <span className={styles.photo_errorMessage}>{messages[0]}</span>
          )}
        </div>
      </div>
      <div className={styles.box_item}>
        <div className={styles.box_title}>
          <h2 className={styles.title}>Ім’я</h2>
          {/* <div
            className={`${styles.mobileButton}  ${
              getWindowWidth() >= 768 ? styles.hide : ''
            }`}
            onClick={() => handleMobileBtnIsOpen('block1')}
          >
            {isOpen.block1 ? (
              <Arrowup width={24} height={24} />
            ) : (
              <Arrowdown width={24} height={24} />
            )}
          </div> */}
        </div>
        <div className={styles.listItem}>
          {/* {isOpen.block1 && ( */}
          <div className={styles.item_dropdown_box}>
            {name ? (
              <label
                htmlFor="name"
                className={
                  !isValidate && messages[1]
                    ? `${styles.VinCode_red}`
                    : `${styles.VinCode_label}`
                }
              >
                Ім’я
              </label>
            ) : null}
            <input
              autoComplete="off"
              className={`${styles.inputPhone} ${styles.VinCode_field}`}
              id="name"
              name="name"
              type="text"
              maxLength={17}
              placeholder={'Ім’я'}
              value={name}
              // onKeyDown={handleKeyPress}
              onBlur={handleOnBlurName}
              onChange={handleOnChangeName}
            />
            {isShow[1] && (
              <span className={styles.VinCode_errorMessage}>{messages[1]}</span>
            )}
          </div>
          {/* )} */}
        </div>
      </div>

      <h2 className={styles.title_category}>Контактні дані</h2>

      <div className={styles.box_item}>
        <div className={styles.box_title}>
          <h2 className={styles.title}>Номер телефону</h2>
          {/* <div
            className={`${styles.mobileButton}  ${
              getWindowWidth() >= 768 ? styles.hide : ''
            }`}
            onClick={() => handleMobileBtnIsOpen('block2')}
          >
            {isOpen.block2 ? (
              <Arrowup width={24} height={24} />
            ) : (
              <Arrowdown width={24} height={24} />
            )}
          </div> */}
        </div>
        {/* {isOpen.block2 && ( */}
        <div className={styles.wrapper_item}>
          <div className={styles.item}>
            <span className={styles.staticValue}>+380</span>
            <input
              autoComplete="off"
              ref={input4Ref}
              className={styles.inputPhone_withStaticValue}
              type="text"
              pattern="\+[0-9]*"
              maxLength={maxDigits}
              value={inputPhone}
              title={`${remainingDigits} цифр залишилось`}
              onBlur={handleInputPhoneBlur}
              onChange={handleInputPhone}
            />
            {isShow[3] && (
              <span className={styles.VinCode_errorMessage}>{messages[3]}</span>
            )}
          </div>
        </div>
        {/* )} */}
      </div>

      <div className={styles.box_item}>
        <div className={styles.box_title}>
          <h2 className={styles.title}>E-mail</h2>
          {/* <div
            className={`${styles.mobileButton}  ${
              getWindowWidth() >= 768 ? styles.hide : ''
            }`}
            onClick={() => handleMobileBtnIsOpen('block4')}
          >
            {isOpen.block4 ? (
              <Arrowup width={24} height={24} />
            ) : (
              <Arrowdown width={24} height={24} />
            )}
          </div> */}
        </div>
        <div className={styles.listItem}>
          {/* {isOpen.block4 && ( */}
          <div className={styles.item_dropdown_box}>
            {email ? (
              <label
                htmlFor="email"
                className={
                  activeField[4] !== 'email' && messages[4]
                    ? `${styles.VinCode_red}`
                    : `${styles.VinCode_label}`
                }
              >
                E-mail
              </label>
            ) : null}
            <input
              readOnly={immutableData}
              disabled={immutableData}
              style={{
                cursor: immutableData ? 'not-allowed' : 'pointer',
              }}
              autoComplete="off"
              className={`${styles.inputPhone} ${styles.VinCode_field}`}
              id="email"
              name="email"
              type="email"
              maxLength={50}
              placeholder={'example@example.com'}
              value={email}
              onFocus={() => handleOnFocusEmail(4, 'email')}
              onBlur={handleOnBlurEmail}
              onChange={handleOnChangeEmail}
            />
            {isShow[4] && (
              <span className={styles.VinCode_errorMessage}>{messages[4]}</span>
            )}
          </div>
          {/* )} */}
        </div>
      </div>

      <h2 className={styles.title_category}>Адреса</h2>

      <div className={styles.box_item}>
        <div className={styles.box_title}>
          <h2 className={styles.title}>Область</h2>
          {/* <div
            className={`${styles.mobileButton}  ${
              getWindowWidth() >= 768 ? styles.hide : ''
            }`}
            onClick={() => handleMobileBtnIsOpen('block6')}
          >
            {isOpen.block6 ? (
              <Arrowup width={24} height={24} />
            ) : (
              <Arrowdown width={24} height={24} />
            )}
          </div> */}
        </div>
        <div className={styles.listItem}>
          {/* {isOpen.block6 && ( */}
          <div className={styles.item_dropdown_box}>
            <Dropdown
              stylepaddingZero={true}
              isShow={isShow[6]}
              index={6}
              closeMessage={closeMessage}
              updateStyle="advSearch"
              options={
                regions
                  ? regions.map(region => region.region)
                  : 'Нема співпадінь'
              }
              label="Область"
              startValue={
                'Область'
                //   `${
                //   selectedRegion === 'Область' || selectedRegion === ''
                //     ? 'Область'
                //     : selectedRegion
                // }`
              }
              allOptionsLabel="Вся Україна"
              option={selectedRegion}
              setOption={setSelectedRegion}
            />
            {isShow[6] && (
              <span className={styles.photo_errorMessage}>{messages[6]}</span>
            )}
          </div>
          {/* )} */}
        </div>
      </div>

      {cities && cities.length > 0 && (
        <div className={styles.box_item_city}>
          <div className={styles.box_title}>
            <h2 className={styles.title}>Місто</h2>
            {/* <div
              className={`${styles.mobileButton}  ${
                getWindowWidth() >= 768 ? styles.hide : ''
              }`}
              onClick={() => handleMobileBtnIsOpen('block7')}
            >
              {isOpen.block7 ? (
                <Arrowup width={24} height={24} />
              ) : (
                <Arrowdown width={24} height={24} />
              )}
            </div> */}
          </div>
          <div className={styles.listItem}>
            {/* {isOpen.block15 && ( */}
            <div className={styles.item_dropdown_box}>
              <Dropdown
                stylepaddingZero={true}
                resetValue={resetValue}
                updateStyle="advSearch"
                optionList={optionList}
                label="Місто"
                startValue="Місто"
                allOptionsLabel="Місто"
                option={selectedCity}
                setOption={setSelectedCity}
                title={selectedRegion}
              />
              {isShow[7] && (
                <span className={styles.photo_errorMessage}>{messages[7]}</span>
              )}
            </div>
            {/* // )} */}
          </div>
        </div>
      )}

      <button
        className={styles.btn}
        type="button"
        onClick={handleAddOrUpdateInfo}
      >
        Зберегти
      </button>
      <>{isLoading && <Loader />}</>
      {/* <>
        {messages[18] &&
          messages[18].length > 0 &&
          ShowToast({
            label: messages[18],
            timer: 4500,
            backgroundColor: '#7CCD7C',
            color: '#feffff',
            borderColor: '#7CCD7C',
          })}
      </> */}
    </div>
  );
};

export default PersonalInfo;
