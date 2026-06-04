import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useDbUser = () => {
  const { user, isLoaded } = useUser();

  const dbUser = useQuery(
    api.user.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const isLoading = !isLoaded || dbUser === undefined;

  return {
    user,
    dbUser,
    isLoading,
  };
};