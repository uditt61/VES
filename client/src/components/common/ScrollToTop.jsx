import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures every route navigation (including query parameters like ?stream=Engineering)
 * resets the window scroll position to the top of the page immediately.
 */
export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Instant scroll to prevent awkward mid-page flashes during navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
