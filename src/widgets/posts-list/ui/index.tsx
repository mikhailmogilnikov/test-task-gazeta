/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Post, PostType } from '@/entities/post';
import { paramFromUrl } from '@/shared/lib/param-from-url';
import { Spinner } from '@/shared/ui/spinner';
import { useGetPosts } from '../api';
import { useInViewParams } from '../model/use-in-view-params';
import styles from './styles.module.css';

export const PostsList = () => {
  // Определение наблюдателя, он сообщает когда юзер долистал до нижнего края
  const { ref, inView } = useInView(useInViewParams);
  // Достаем количество просмотренных постов из юрл
  const viewedFromUrl = Number(paramFromUrl('viewed')) || 0;

  const [loadedPosts, setLoadedPosts] = useState<PostType[]>([]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10 + viewedFromUrl);

  // Определение объекта параметов в запросе
  const PostsQueryParams = {
    ['_start']: start,
    ['_limit']: limit,
  } as const;

  // Самописный хук содержит в себе реализацию апи-запроса на получение постов
  const { data, isLoading, refetch } = useGetPosts(PostsQueryParams);

  // Вызов новой порции постов при срабатывании наблюдателя
  useEffect(() => {
    if (data) {
      setLoadedPosts([...loadedPosts, ...(data as PostType[])]);
    }
  }, [data]);

  const handleGetNewPosts = () => {
    if (limit > 10) {
      setStart(viewedFromUrl + start + 10);
      setLimit(10);
    } else {
      setStart(start + 10);
    }
    const newURL = `?viewed=${start + 10}`;
    history.pushState({}, '', newURL);
    refetch();
  };

  // Вызов новой порции постов при срабатывании наблюдателя
  useEffect(() => {
    if (inView) {
      handleGetNewPosts();
    }
  }, [inView]);

  const inAutomaticLoadRange =
    !isLoading && loadedPosts.length < 50 && loadedPosts.length > 0;

  const inManualLoadRange = !isLoading && loadedPosts.length >= 50;

  return (
    <div className={styles.wrapper}>
      <h1>Посты</h1>

      {loadedPosts.map((post) => (
        <Post key={post.id} data={post} />
      ))}

      {isLoading && <Spinner size={32} />}

      {inAutomaticLoadRange && <div ref={ref}></div>}

      {inManualLoadRange && (
        <button onClick={handleGetNewPosts}>Загрузить еще</button>
      )}
    </div>
  );
};
