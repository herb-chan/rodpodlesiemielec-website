import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NewsRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first page
    router.push('/aktualnosci/1');
  }, [router]);

  return null;
};

export default NewsRedirect;
