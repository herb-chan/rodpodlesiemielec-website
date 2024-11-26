import React from 'react';
import styles from '@styles/components/containers/Post.module.css';
import ButtonTemplate from '../buttons/ButtonTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faUpRightFromSquare,
  faShareNodes,
  faCalendarPlus,
  faCalendarDay,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Image from 'next/image';
import formatDate from '@/utils/formatDate';

const Post = ({ title, description, learn_more_path, post_date, user }) => {
  const router = useRouter();
  const formattedDate = formatDate(post_date);

  const handleLearnMoreClick = () => {
    router.push(`/aktualnosci/ogloszenie/${learn_more_path}`);
  };

  return (
    <div className={styles.post_container} id="post-container">
      <div className={styles.post_header_container} id="post-header-container">
        <div className={styles.post_info} id="post-info">
          <div className={styles.profile_icon} id="profile-icon">
            <FontAwesomeIcon icon={faUserTie} />
          </div>
          <div className={styles.post_details} id="post-details">
            <h4>{user}</h4>
            <p>{title}</p>
          </div>
        </div>
      </div>
      <div className={styles.post_description} id="post-description">
        <p>{description}</p>
      </div>
      <div className={styles.post_thumbnail} id="post-thumbnail">
        <Image
          src={'/images/gallery/Nagroda/Vice1.jpg'}
          alt={`${title} thumbnail`}
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: '8px' }}
        />
      </div>

      <div className={styles.post_about_container} id="post-about-container">
        <small>
          <FontAwesomeIcon icon={faEye} /> 0
        </small>
        <small>
          <FontAwesomeIcon icon={faCalendarDay} /> {formattedDate}
        </small>
      </div>
      <div
        className={styles.post_actions_container}
        id="post-actions-container">
        <ButtonTemplate
          text="Udostępnij"
          icon={faShareNodes}
          variant="borderless_text_icon"
          type="neutral"
          size="medium2"
        />
        <ButtonTemplate
          text="Zobacz więcej"
          icon={faUpRightFromSquare}
          variant="text_icon"
          type="success"
          size="medium2"
          onClick={handleLearnMoreClick}
        />
      </div>
    </div>
  );
};

export default Post;
