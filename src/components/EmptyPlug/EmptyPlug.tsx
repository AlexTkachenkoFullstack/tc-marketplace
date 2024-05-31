import styles from './EmptyPlug.module.scss';
import plug from '../../assets/images/Property 1=01.svg';
import plug1 from '../../assets/images/Property 1=02.svg';
import plug2 from '../../assets/images/Property 1=03.svg';
import plug3 from '../../assets/images/Property 1=05.svg';
import { useNavigate } from 'react-router-dom';
interface IProps {
  title: string;
}

const EmprtyPlug: React.FC<IProps> = ({ title }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/advertisements');
  };
  const text = title.split(' ')[0].toLocaleLowerCase();

  return (
    <div className={styles.img_container}>
      <img
        src={
          text === 'активні'
            ? plug
            : text === 'деактивовані'
            ? plug1
            : text === 'очікувані'
            ? plug2
            : text === 'видалені'
            ? plug3
            : ''
        }
        alt="plug"
        className={styles.plug_img}
      />
      <p className={styles.text}>{title}</p>
      <button className={styles.add_advert} onClick={handleClick}>
        Створити оголошення
      </button>
    </div>
  );
};

export default EmprtyPlug;
