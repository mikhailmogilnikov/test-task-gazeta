import { PostType } from '@/entities/post';
import { apiClient } from '@/shared/api/base';
import { useApiHook } from '@/shared/lib/use-api-hook';
import { QueryParams } from '@/shared/model/query-params.type';

const getPosts = async (queryParams?: QueryParams) => {
  const response = await apiClient.get<PostType[]>('/posts', queryParams);
  return response;
};

export const useGetPosts = (queryParams?: QueryParams) =>
  useApiHook(getPosts, queryParams);
