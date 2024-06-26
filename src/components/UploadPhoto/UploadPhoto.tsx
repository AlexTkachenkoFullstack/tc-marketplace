import React, { ChangeEvent, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './UploadPhoto.module.scss';
import { ReactComponent as Add } from '../../assets/icons/add_photo_new.svg';
import { Preview } from 'components/Preview/Preview';
import { UploadedImage } from 'types/UploadedImage';
import { useLocation } from 'react-router-dom';

type Props = { 
  isMainePhoto?:boolean;
  isDisabled?: boolean;
  stylesUserInfo?: any;
  resetCheckedItemId: boolean;
  mainPhoto: string;
  isShow: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  selectedImages: UploadedImage[];
  handleAddPhoto: (newImages: UploadedImage[]) => void;
  handleDeletePhoto: (imageId: string, name: string) => void;
  addMainPhoto: (title: string) => void;
  closeMessage: (index: number) => void;
  errorAddPhoto: (numberindex: number, message: string) => void;
  setResetCheckedItemId: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UploadPhoto: React.FC<Props> = ({
  mainPhoto,
  isMainePhoto,
  isShow,
  inputRef,
  selectedImages,
  stylesUserInfo,
  isDisabled,
  resetCheckedItemId,
  setResetCheckedItemId,
  addMainPhoto,
  closeMessage,
  errorAddPhoto,
  handleAddPhoto,
  handleDeletePhoto,
}) => {
  const location = useLocation();
  const [checkedItemId, setCheckedItemId] = useState<string | null>(null);
  const [firstPhotoSelected, setFirstPhotoSelected] = useState<boolean>(false);
  useEffect(() => {
    if (resetCheckedItemId) {
      setCheckedItemId(null);
      setResetCheckedItemId(false);
    }
  }, [resetCheckedItemId, setResetCheckedItemId]);
  useEffect(() => {
    if ( (selectedImages && mainPhoto && location.pathname === '/advertisements/edit') || isMainePhoto
    ) {
      const image = selectedImages.find(item => item.name === mainPhoto);
      if (image) {
        setCheckedItemId(image.id);
        setFirstPhotoSelected(true);
      }
    }
  }, [selectedImages, mainPhoto, location.pathname,isMainePhoto]);

  const handleChekedItem = (imageId: string, name: string) => {
    if (checkedItemId === imageId) {
      addMainPhoto('');
      setCheckedItemId(null);
    } else {
      setCheckedItemId(imageId);
      addMainPhoto(name);
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    closeMessage(0);
    const files = event.target.files;
    if (files) {
      const newImages: UploadedImage[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          const id = nanoid();
          reader.onloadend = () => {
            newImages.push({
              name: file.name,
              size: file.size,
              url: reader.result as string,
              id: id,
              file: files,
            });

            if (!firstPhotoSelected && i === 0) {
              setCheckedItemId(id);
              addMainPhoto(file.name);
              setFirstPhotoSelected(true);
            }

            if (newImages.length === files.length) {
              handleAddPhoto(newImages);
            }
          };

          reader.readAsDataURL(file);
        } else {
          errorAddPhoto(
            0,
            `Файл ${file.name} перевищує максимальний розмір 5 МБ і не буде додано.`,
          );
        }
      }
    }
  };
  const resetFirstPhotoSelected = () => {
    setFirstPhotoSelected(false);
  };
  return (
    <>
      {selectedImages &&
        selectedImages.map(item => {
          return (
            <Preview
              isDisabled={isDisabled}
              newStyles={stylesUserInfo}
              resetFirstPhotoSelected={resetFirstPhotoSelected}
              onDelete={handleDeletePhoto}
              key={nanoid()}
              image={item}
              handleChekedItem={handleChekedItem}
              isChecked={checkedItemId === item.id}
            />
          );
        })}
      <div
        className={
          !isShow
            ? `${
                isDisabled ? styles.hidden : stylesUserInfo && stylesUserInfo[1].imgCard_user ? stylesUserInfo[1].imgCard_user : styles.imgCard
              }`
            : `${styles.imgCard} ${styles.imgCard_errorMessage}`
        }
        onClick={() => inputRef.current !== null && inputRef.current.click()}
      >
        <div className={stylesUserInfo && stylesUserInfo[1].add_foto_btn_user_foto ? stylesUserInfo[1].add_foto_btn_user_foto : styles.add_foto_btn}>
          <input
            type="file"
            ref={inputRef}
            accept="image/png, image/jpeg"
            className={styles.hidden}
            onChange={handleFileChange}
            multiple
          />
          <Add width={32} height={32} />
        </div>
      </div>
    </>
  );
};
