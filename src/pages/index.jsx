import React, { useEffect } from 'react';
import styles from '@styles/index.module.css';
import Header from '@/components/typography/Header';
import Post from '@/components/containers/Post';
import Statistics from '@/components/containers/Statistics';
import DayInfo from '@/components/containers/DayInfo';
import { setTheme } from '@/utils/themeToggle';

function HomePage({ latestPosts }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme);
  }, []);

  return (
    <div className={styles.container}>
      <Header size="h1" text="Strona główna" sectionID="główna" />
      <Statistics plots_count={286} members_count={369} year={1983} />
      <div className={styles.block} id="godziny-otwarcia">
        <Header
          size="h2"
          text="Godziny otwarcia"
          sectionID="godziny-otwarcia"
        />
        <DayInfo />
      </div>
      <div className={styles.block} id="ostatnie-aktualności">
        <Header
          size="h2"
          text="Ostatnie aktualności"
          sectionID="ostatnie-aktualności"
        />
        <div className={styles.news}>
          {latestPosts.length === 0 ? (
            <p>Brak postów do wyświetlenia.</p>
          ) : (
            latestPosts.map((post) => (
              <Post
                key={post._id}
                title={post.title}
                description={post.description}
                learn_more_path={post._id}
                learn_more={post.learn_more}
                post_date={post.createdAt}
                user={post.user}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/aktualnosci/latest`
    );

    if (!res.ok) {
      console.error('Failed to fetch latest posts:', res.statusText);
      return { props: { latestPosts: [] } };
    }

    const data = await res.json();
    return {
      props: {
        latestPosts: data.posts || [],
      },
      revalidate: 3600, // Revalidate after 1 hour
    };
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return { props: { latestPosts: [] } };
  }
};

export default HomePage;
