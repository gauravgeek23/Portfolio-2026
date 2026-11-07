import { useEffect, useState } from 'react';

// Wide screens (laptops and up) get the two-panel layout: a fixed left panel with the intro and
// navigation, content on the right. Narrower screens keep the top nav.
const QUERY = '(min-width: 1000px)';

export default function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return wide;
}
