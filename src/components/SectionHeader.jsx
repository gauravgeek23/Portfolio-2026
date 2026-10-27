import arrowDown from '../assets/icons/arrow-down.svg';
import './SectionHeader.css';

export default function SectionHeader({ id, title, subtitle }) {
  return (
    <header>
      <h2 className="section-header__title text-medium" id={id}>
        {title}
        <img src={arrowDown} alt="" width="20" height="20" />
      </h2>
      <p className="text-small text-muted">{subtitle}</p>
    </header>
  );
}
