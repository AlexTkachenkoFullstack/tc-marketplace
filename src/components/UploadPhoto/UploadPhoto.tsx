import React, { ChangeEvent, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './UploadPhoto.module.scss';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import { Preview } from 'components/Preview/Preview';
import { UploadedImage } from 'types/UploadedImage';
import { useLocation } from 'react-router-dom';

type Props = {
  mainPhoto:string;
  isShow: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  selectedImages: UploadedImage[] ;
  handleAddPhoto: (newImages: UploadedImage[]) => void;
  handleDeletePhoto: (imageId: string, name: string) => void;
  addMainPhoto: (title: string) => void;
};

export const UploadPhoto: React.FC<Props> = ({
  mainPhoto,
  isShow,
  inputRef,
  selectedImages,
  addMainPhoto,
  handleAddPhoto,
  handleDeletePhoto,
}) => {
  const location = useLocation();
  const [checkedItemId, setCheckedItemId] = useState<string | null>(null);
  const [firstPhotoSelected, setFirstPhotoSelected] = useState<boolean>(false)
  useEffect(() => {
    if (selectedImages && mainPhoto && location.pathname === '/advertisements/edit') {
      const image = selectedImages.find(item => item.name === mainPhoto);
      if (image) {
        setCheckedItemId(image.id);
        setFirstPhotoSelected(true);
     }
    }
  }, [selectedImages, mainPhoto,location.pathname]);
  
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
    const files = event.target.files;
    if (files) {
      const newImages: UploadedImage[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
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
              resetFirstPhotoSelected={resetFirstPhotoSelected}
              onDelete={handleDeletePhoto}
              key={item.id}
              image={item}
              handleChekedItem={handleChekedItem}
              isChecked={checkedItemId === item.id}
            />
          );
        })}
      <div
        className={
          !isShow
            ? `${styles.imgCard}`
            : `${styles.imgCard} ${styles.imgCard_errorMessage}`
        }
        onClick={() => inputRef.current !== null && inputRef.current.click()}
      >
        <div className={styles.add_foto_btn}>
          <input
            type="file"
            ref={inputRef}
            accept="image/png, image/jpeg"
            className={styles.hiddenInput}
            onChange={handleFileChange}
            multiple
          />
          <Add width={32} height={32} />
        </div>
      </div>
    </>
  );
};
