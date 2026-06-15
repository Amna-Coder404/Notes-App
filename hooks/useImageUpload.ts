import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Id } from "@/convex/_generated/dataModel";

export const useImageUpload = () => {
  const generateUploadUrl = useMutation(api.notes.generateUploadUrl);

  const [image, setImage] = useState<string | null>(null);

  // PICK FROM GALLERY
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

  /*
     TAKE PHOTO
 */
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /*
     UPLOAD TO CONVEX STORAGE
 */
  const uploadImageToConvex = async (): Promise<Id<"_storage"> | undefined> => {
    if (!image) return undefined;

    const uploadUrl = await generateUploadUrl();

    // ⚡FIX: safer conversion using fetch blob
    const response = await fetch(image);
    const blob = await response.blob();

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": blob.type || "image/jpeg",
      },
      body: blob,
    });

    if (!uploadRes.ok) {
      throw new Error("Image upload failed");
    }

    const { storageId } = await uploadRes.json();

    return storageId; // ✅ ONLY STORAGE ID goes to DB
  };

  return {
    image,
    setImage,
    pickImage,
    takePhoto,
    uploadImageToConvex,
  };
};