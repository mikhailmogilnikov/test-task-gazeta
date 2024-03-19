import { PostsList } from '@/widgets/posts-list';
import styles from './styles.module.css';

export const HomePage = () => {
  return (
    <main className={styles.page}>
      <PostsList />
    </main>
  );
};
