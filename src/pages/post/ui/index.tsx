import { useNavigate, useParams } from 'react-router-dom';
import { PostType } from '@/entities/post';
import { Spinner } from '@/shared/ui/spinner';
import { useGetPost } from '../api/get-post';
import styles from './styles.module.css';

export const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(`/`);
  };

  const { data, isLoading, isError } = useGetPost({}, postId);

  const renderPost = () => {
    if (isLoading) return <Spinner size={32} />;

    if (isError) return <h3>Произошла ошибка</h3>;

    if (data) {
      const { title, body } = data as PostType;

      return (
        <>
          <p>{postId}</p>
          <h2>{title}</h2>
          <p>{body}</p>
        </>
      );
    }

    return <h3>Не найдено</h3>;
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleClickBack}>Назад</button>
      {renderPost()}
    </div>
  );
};
