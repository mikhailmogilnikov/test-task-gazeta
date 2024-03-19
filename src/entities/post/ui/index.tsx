import { useNavigate } from 'react-router-dom';
import { PostType } from '../model/post.type';
import styles from './styles.module.css';

type Props = {
  data: PostType;
};

export const Post = ({ data }: Props) => {
  const navigate = useNavigate();
  const { id, title, body } = data;

  const handleClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <p>{id}</p>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};
