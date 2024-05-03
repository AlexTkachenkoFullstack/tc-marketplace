import styles from './EmptyPlug.module.scss';

interface IProps {
  title: string;
}

const EmprtyPlug: React.FC<IProps> = ({ title }) => {
  return (
    <div className={styles.plugContainer}>
      <h3>{title}</h3>
      <div className={styles.imgContainer}></div>
    </div>
  );
};

export default EmprtyPlug;
