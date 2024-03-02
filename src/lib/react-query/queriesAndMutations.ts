import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../appwrite/api";
import { INewUser, ISignInUser } from "@/types";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user)
  });
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: ISignInUser) => signInAccount(user)
  });
}

