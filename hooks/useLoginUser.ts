import useSWR, { Fetcher } from "swr";
import { LoginUser } from "../types/loginUser";

export const useLoginUser = () => {
  const url = `${process.env.API_SERVER_PATH}/user/loginUser`;
  const fetcher: Fetcher<LoginUser> = () =>
    fetch(url, { method: "POST", credentials: "include" }).then((res) =>
      res.json()
    );
  const { data, error } = useSWR(url, fetcher);

  return {
    loginUser: data,
    isLoading: !error && !data,
    isError: error,
  };
};
