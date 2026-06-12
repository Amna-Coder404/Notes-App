import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Id } from "@/convex/_generated/dataModel";

export const useImageUpload = () => {
  const generateUploadUrl = useMutation(api.notes.generateUploadUrl);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToConvex = async (): Promise<Id<"_storage"> | undefined> => {
    if (!image) return undefined;

    const uploadUrl = await generateUploadUrl();

    const response = await fetch(image);
    const blob = await response.blob();

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": blob.type },
      body: blob,
    });

    if (!uploadRes.ok) {
      throw new Error("Upload failed");
    }

    const json = await uploadRes.json();
    const storageId = json.storageId;

    return storageId ?? undefined;
  };

  return {
    image,
    setImage,
    pickImage,
    uploadImageToConvex,
  };
};