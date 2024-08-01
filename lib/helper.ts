import { cookies } from "next/headers";

export const getToken = () => {
  const token = cookies().get("token");
  if (!token) {
    return null;
  }
  return token.value;
};

export const setCookie = (name: string, value: string) => {
  cookies().set({
    name: name,
    value: value,
  });
}