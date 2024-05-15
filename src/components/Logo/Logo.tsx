import { Link } from 'react-router-dom';
import { ReactComponent as TitleLogo } from '../../assets/icons/logo.svg';
import styles from './Logo.module.scss'
type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className = '' }) => {
 
  return (
    <Link to="/" className={className}>
      <TitleLogo className={styles['title-logo']} />      
    </Link>
  );
};