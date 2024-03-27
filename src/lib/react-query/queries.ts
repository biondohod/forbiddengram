import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, searchPosts } from "../appwrite/api";

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts as any,
    getNextPageParam: (lastPage: any) => {
      // If there's no data, there are no more pages.
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
    initialPageParam: null,
  });
};

export const useSearchPost = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS,  searchTerm],
    queryFn: () => searchPosts({ searchTerm }),
    enabled: !!searchTerm,
  });
};