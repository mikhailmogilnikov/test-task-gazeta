import { PostType } from '@/entities/post';
import { apiClient } from '@/shared/api/base';
import { useApiHook } from '@/shared/lib/use-api-hook';
import { QueryParams } from '@/shared/model/query-params.type';

const getPost = async (queryParams?: QueryParams, postId?: string | number) => {
  const response = await apiClient.get<PostType>(
    `/posts/${postId}`,
    queryParams,
  );
  return response;
};

export const useGetPost = (queryParams?: QueryParams, postId?: string) =>
  useApiHook(getPost, queryParams, postId);
