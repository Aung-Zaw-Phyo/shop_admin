import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  Object.keys(obj).forEach(key => {
      formData.append(key, obj[key]);
  });

  return formData;
}
