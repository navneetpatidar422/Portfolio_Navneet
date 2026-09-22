import { useNavigate, useLocation } from 'react-router';
// @ts-ignore
import FolderFloat from './FolderFloat';

const RESUME_URL =
  'https://drive.google.com/file/d/1spe6y2QQbvO8RYIzb0UBFQgtD2CJwA1S/view?usp=sharing';

const NAV_ITEMS = [
  { label: 'Home', value: 'home' },
  { label: 'Work', value: 'work' },
  { label: 'About', value: 'about' },
  { label: 'Contact', value: 'contact' },
  { label: 'Resume', value: 'resume' },
];

export function NavFolderFloat() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (value: string) => {
    if (value === 'resume') {
      window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    const href = value === 'home' ? null : '#' + value;
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (!href) window.scrollTo({ top: 0, behavior: 'smooth' });
        else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      if (!href) window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
      }}
    >
      <FolderFloat
        items={NAV_ITEMS}
        label="Navigation"
        sublabel="5 links"
        trigger="hover"
        closeOnSelect
        physics
        drift={0.4}
        onSelect={handleSelect}
        folderColor="#111111"
        frontColor="#1c1c1e"
        paperColor="#f5f5f5"
        itemColor="#f5f5f5"
        itemTextColor="#18181b"
        labelColor="#f5f5f5"
        width={172}
        height={130}
        radius={16}
        spread={160}
        lift={32}
        tilt={7}
        flapAngle={34}
        restAngle={14}
        openDuration={480}
        stagger={40}
        bounce={0.35}
      />
    </div>
  );
}
