import { jwtDecode } from "jwt-decode";
interface JWTData {
    sub: string;
    email: string;
    roles: string[];
}
const getJWT = (token: string) => {
  if (!token || token.split(".").length !== 3) {
    return null;
  }

  const data = jwtDecode<JWTData>(token);
  return data;
};

export default getJWT
//const dataToken = await getJWT(response.data.access_token);