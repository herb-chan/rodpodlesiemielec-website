import React, { useState, useEffect } from 'react';
import styles from '@styles/components/GalleryPage.module.css';
import Header from '@/components/typography/Header';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faCamera } from '@fortawesome/free-solid-svg-icons';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function GalleryPage() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [images, setImages] = useState([]);
  const [fullImage, setFullImage] = useState(null); // State for the full image modal

  useEffect(() => {
    // Fetch folders and their thumbnails from the API
    fetch('/api/galeria/folder')
      .then((response) => response.json())
      .then((data) => setFolders(data));
  }, []);

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    fetch(`/api/galeria/${encodeURIComponent(folder)}`)
      .then((response) => response.json())
      .then((data) => setImages(data));
  };

  const handleImageClick = (src) => {
    setFullImage(src); // Set the clicked image for full view
  };

  const closeModal = () => {
    setFullImage(null); // Close the modal
  };

  return (
    <div className={styles.container}>
      <Header size="h1" text="Galeria zdjęć" sectionID="galeria" />

      {!selectedFolder ? (
        <div className={styles.galleryFolders}>
          {folders.map(({ folder, thumbnail, folderData }) => (
            <div key={folder} className={styles.folder}>
              <div className={styles.folder_container}>
                <Image
                  src={thumbnail || '/placeholder.jpg'} // Use a placeholder if no image
                  alt={folder}
                  width={1080}
                  height={1920}
                  style={{
                    borderRadius: '8px',
                    width: '350px',
                    height: '200px',
                  }}
                  className={styles.thumbnail} // Add a class for styling
                />
                <div className={styles.folder_info}>
                  <h2>{folderData.title}</h2>
                  <div className={styles.folder_info_details}>
                    <p>{folderData.description}</p>
                    <button
                      onClick={() => handleFolderClick(folder)}
                      className={styles.see_photos_button}>
                      Zobacz zdjęcia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.gallery_images}>
          <div className={styles.image_grid}>
            {images.map((src) => (
              <div
                key={src}
                className={styles.image_wrapper}
                onClick={() => handleImageClick(src)}>
                <Image
                  src={src}
                  alt={src.split('/').pop()}
                  className={styles.gallery_image}
                  height={1920}
                  width={1080}
                  style={{
                    borderRadius: '8px',
                    width: '350px',
                    height: '200px',
                  }}
                />
              </div>
            ))}
          </div>
          <div className={styles.back_button_container}>
            <button
              onClick={() => setSelectedFolder(null)}
              className={styles.back_button}>
              Wróć
            </button>
          </div>
        </div>
      )}

      {fullImage && (
        <div className={styles.modal} onClick={closeModal}>
          <Image
            src={fullImage}
            alt="Full screen view"
            layout="fill"
            objectFit="contain"
            className={styles.fullImage}
          />
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
