import React, { useRef, ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './UploadPhoto.module.scss';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import { Preview } from 'components/Preview/Preview';
import { UploadedImage } from 'types/UploadedImage';
type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  selectedImages: UploadedImage[];
  handleAddPhoto: (newImages: UploadedImage[]) => void;
  handleDeletePhoto: (imageId: string) => void;
  addMainPhoto: (imageId: string) => void;
};
export const UploadPhoto: React.FC<Props> = ({
  inputRef,
  selectedImages,
  addMainPhoto,
  handleAddPhoto,
  handleDeletePhoto,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: UploadedImage[] = [];
      Array.from(files).forEach(file => {
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
          if (newImages.length === files.length) {
            handleAddPhoto(newImages);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };
  return (
    <>
      {selectedImages &&
        selectedImages.map(item => {
          return (
            <Preview
              onDelete={handleDeletePhoto}
              key={item.id}
              image={item}
              addMainPhoto={addMainPhoto}
            />
          );
        })}
      <div
        className={styles.imgCard}
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
