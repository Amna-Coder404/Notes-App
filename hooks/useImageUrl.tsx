import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const useImageUrl = (storageId?: Id<"_storage">) => {
  return useQuery(
    api.notes.getImageUrl,
    storageId ? { storageId } : "skip"
  );
};