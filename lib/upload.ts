import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Convert local file URI (expo-camera) -> Blob, then upload to Firebase Storage
async function uriToBlob(uri: string): Promise<Blob> {
  const res = await fetch(uri);
  if (!res.ok) throw new Error("Failed to read file");
  return await res.blob();
}

export async function uploadPhotoAsync(uri: string) {
  const blob = await uriToBlob(uri);

  const filename = `photos/${Date.now()}.jpg`;
  const storageRef = ref(storage, filename);

  await uploadBytes(storageRef, blob, { contentType: "image/jpeg" });

  const downloadUrl = await getDownloadURL(storageRef);
  return { downloadUrl, filename };
}
