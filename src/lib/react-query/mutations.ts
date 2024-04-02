import {
  INewPost,
  INewUser,
  ISaveUserToDb,
  ISignInUser,
  IUpdatePost,
  IUser,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  deletePost,
  deleteSavedPost,
  likePost,
  savePost,
  saveUserToDB,
  signInAccount,
  signOutAccount,
  updatePost,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";
import { avatars } from "../appwrite/config";
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useCreateUserAccount = () => {
  const saveUserToDbMutation = useSaveUserToDb();

  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
    onSuccess: async (newAccount, user) => {
      const avatarUrl = avatars.getInitials(user.name);

      // password needs to be provided for further automatic authorization
      saveUserToDbMutation.mutate({
        accountId: newAccount.$id,
        email: newAccount.email,
        name: newAccount.name,
        imageUrl: avatarUrl,
        username: user.username,
        password: user.password,
      });
    },
    onError: (error) => {
      toast({ title: `Oops! There's an error: ${error.message}` });
    },
  });
};

export const useSaveUserToDb = () => {
  const signInAccountMutation = useSignInAccount();

  return useMutation({
    mutationFn: (user: ISaveUserToDb) =>
      saveUserToDB({
        accountId: user.accountId,
        email: user.email,
        name: user.name,
        username: user.username,
        imageUrl: user.imageUrl,
      }),
    onSuccess: (_, user) => {
      signInAccountMutation.mutate({
        email: user.email,
        password: user.password,
      });
    },
    onError: (error) => {
      toast({ title: `Oops! There's an error: ${error.message}` });
    },
  });
};

export const useSignInAccount = () => {
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: ISignInUser) => signInAccount(user),
    onSuccess: async () => {
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        navigate("/");
      }
    },
    onError: (error) => {
      toast({ title: `Oops! There's an error: ${error.message}` });
    },
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
    onError: (error) => {
      toast({ title: `Oops! There's an error: ${error.message}` });
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      toast({title: 'Successfully created!'})
    },
    onError: (error) => {
      toast({ title: `Oops! There's an error: ${error.message}` });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
    onError: (error) => {
      toast({ title: `Oops! There's an error: ${error.message}` });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
    onError: (error) => {
      toast({ title: `Oops! There's an error: ${error.message}` });
    },
  });
};

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      toast({title: 'Successfully deleted!'})
    },
    onError: (error) => {
      toast({ title: `Oops! There's an error: ${error.message}` });
    },
  });
};
