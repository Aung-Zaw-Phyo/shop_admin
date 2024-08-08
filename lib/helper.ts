import { cookies } from "next/headers";

export const getToken = () => {
  const token = cookies().get("token");
  if (!token) {
    return null;
  }
  return token.value;
};

export const getAuthUser = () => {
  const user = cookies().get("user");
  if (!user) {
    return null;
  }
  return JSON.parse(user.value);
};

export const setCookie = (name: string, value: string) => {
  cookies().set({
    name: name,
    value: value,
  });
}