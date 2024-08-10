import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  Object.keys(obj).forEach(key => {
        if(typeof obj[key] === 'object') {
            for (const k of Object.keys(obj[key])) {
                formData.append(key, obj[key][k]);
            }
            return;
        }
        if(obj[key] != '') {
            formData.append(key, obj[key]);
        }
  });

  return formData;
}


export const generateBase64FromImage = (imageFile: File): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();
  const promise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    reader.onload = e => resolve(e?.target?.result ?? null);
    reader.onerror = err => reject(err);
  });

  reader.readAsDataURL(imageFile);
  return promise;
};