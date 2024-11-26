import React from 'react';
import { useRouter } from 'next/router';
import dbConnect from '@utils/database_connect';
import { ObjectId } from 'mongodb';
import Header from '@/components/typography/Header';
import PostContent from '@/components/PostContent'; // Import the new component
import styles from '@styles/components/PostPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faUser } from '@fortawesome/free-solid-svg-icons';

const PostPage = ({ post }) => {
  const router = useRouter();

  // Fallback rendering or no post data case
  if (router.isFallback || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Header size="h1" text={post.title} sectionID="e" />
      <div className={styles.details}>
        <div className={styles.content}>
          <PostContent content={post.learn_more_content} />{' '}
          {/* Use PostContent here */}
        </div>
        <div className={styles.meta}>
          <p>
            <FontAwesomeIcon icon={faUser} />{' '}
            <strong className={styles.strong}>Autor ogłoszenia:</strong>{' '}
            {post.user}
          </p>
          <p>
            <FontAwesomeIcon className={styles.strong} icon={faCalendarDay} />{' '}
            <strong className={styles.strong}>Data publikacji:</strong>{' '}
            {new Date(post.createdAt).toLocaleDateString('pl-PL', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

// Fetch all posts for dynamic routes
export const getStaticPaths = async () => {
  const client = await dbConnect();
  const db = client.db('rodpodlesie');

  const posts = await db.collection('posty').find({}).toArray();

  // Create paths from post IDs
  const paths = posts.map((post) => ({
    params: { post: post._id.toString() }, // Convert ObjectId to string
  }));

  return {
    paths,
    fallback: true, // Use 'true' or 'blocking' depending on your needs
  };
};

// Fetch post data for each page
export const getStaticProps = async ({ params }) => {
  const { post: postId } = params; // Destructure post id from params

  try {
    const client = await dbConnect();
    const db = client.db('rodpodlesie');

    // Convert postId to ObjectId
    const post = await db
      .collection('posty')
      .findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return {
        notFound: true, // Return 404 if the post isn't found
      };
    }

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)), // Return the post as a prop
      },
      revalidate: 3600, // Revalidate after an hour seconds
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true,
    };
  }
};

export default PostPage;
