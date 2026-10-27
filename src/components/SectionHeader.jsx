import arrowDown from '../assets/icons/arrow-down.svg';
import Icon from './Icon';
import './SectionHeader.css';

export default function SectionHeader({ id, title, subtitle }) {
  return (
    <header>
      <h2 className="section-header__title text-medium" id={id}>
        {title}
        <Icon src={arrowDown} />
      </h2>
      <p className="text-small text-muted">{subtitle}</p>
    </header>
  );
}
