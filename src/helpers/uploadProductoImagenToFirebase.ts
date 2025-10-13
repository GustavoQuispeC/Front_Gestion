import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadProductoImagen(file: File): Promise<string> {
  const fileRef = ref(storage, `productos/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url; // Esta es la URL que guardarás en tu backend
}
