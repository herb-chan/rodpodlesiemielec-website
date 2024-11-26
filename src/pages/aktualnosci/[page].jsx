import React from 'react';
import styles from '@styles/index.module.css';
import Post from '@/components/containers/Post';
import Header from '@/components/typography/Header';

const NewsPage = ({ posts, totalPosts, currentPage, totalPages }) => {
  return (
    <div className={styles.container}>
      <Header size="h1" text="Aktualności" sectionID="ostatnie" />
      {posts.length === 0 && <p>Brak postów do wyświetlenia.</p>}
      <div className={styles.news_and_paginator}>
        <div className={styles.news} id="ostatnie">
          {posts.map((post) => (
            <Post
              key={post._id}
              title={post.title}
              description={post.description}
              learn_more_path={post._id}
              post_date={post.createdAt}
              user={post.user}
            />
          ))}
        </div>
        <div className={styles.paginator}>
          <div className={styles.pages}>
            {Array.from({ length: totalPages }, (_, index) => (
              <a
                key={index}
                href={`/aktualnosci/${index + 1}`}
                className={currentPage === index + 1 ? styles.active_page : ''}>
                {index + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate static paths based on the total number of pages
export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/aktualnosci/1`
  );
  const data = await res.json();
  const totalPages = data.totalPages;

  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

// Fetch data for each page using getStaticProps
export const getStaticProps = async ({ params }) => {
  const page = parseInt(params.page) || 1;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/aktualnosci/${page}`
  );
  const data = await res.json();

  return {
    props: {
      posts: data.posts,
      totalPosts: data.totalPosts,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
    },
    revalidate: 3600, // Revalidate after 1 hour
  };
};

export default NewsPage;
