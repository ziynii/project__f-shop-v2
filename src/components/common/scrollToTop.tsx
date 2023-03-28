import { useEffect } from 'react';

export default function ScrollToTop() {
  const pathname = typeof window !== 'undefined' && window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
