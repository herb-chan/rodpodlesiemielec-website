import React, { useState } from 'react';
import { files } from '@utils/files';
import styles from '@styles/components/FileList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons'; // Import the download and eye icons

function FileList() {
  const [downloads, setDownloads] = useState(Array(files.length).fill(0)); // Initialize downloads as an array
  const [views, setViews] = useState(Array(files.length).fill(0)); // Initialize views as an array

  const handleDownload = (idx, url) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    // Increment downloads for the specific file
    setDownloads((prev) => {
      const newDownloads = [...prev];
      newDownloads[idx] += 1;
      return newDownloads;
    });
  };

  const handleMouseEnter = (idx) => {
    setViews((prev) => {
      const newViews = [...prev];
      newViews[idx] += 1; // Increment views for the specific file
      return newViews;
    });
  };

  return (
    <div className={styles.file_list}>
      {files.map((file, idx) => (
        <div
          key={idx}
          className={styles.file_card}
          onMouseEnter={() => handleMouseEnter(idx)} // Pass the index
        >
          <div className={styles.inner_file_card}>
            <div className={styles.file_info}>
              <h3>{file.name}</h3>
              <p>{file.description}</p>
            </div>
            <button
              className={styles.download_button}
              onClick={() => handleDownload(idx, file.url)} // Pass the index and URL
            >
              <p>
                <FontAwesomeIcon
                  icon={faDownload}
                  className={styles.download_button_icon}
                />
              </p>
            </button>
          </div>
          <div className={styles.file_additional_info}>
            <p>
              <FontAwesomeIcon icon={faDownload} /> {downloads[idx]}{' '}
              {/* Show individual download count */}
            </p>
            <p>
              <FontAwesomeIcon icon={faEye} /> {views[idx]}{' '}
              {/* Show individual view count */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileList;
