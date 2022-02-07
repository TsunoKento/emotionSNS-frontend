import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import { IconLabelTabs } from "../../components/Tab";
import { LoginUser } from "../../types/loginUser";

const Profile: NextPage = () => {
  const router = useRouter();
  const uid = router.query.uid as string;

  const url = `http://localhost:8000/user/getUser/${uid}`;
  const fetcher: Fetcher<LoginUser> = () =>
    fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher);

  return (
    <div>
      {!data && !error ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            height: 300,
            backgroundColor: "primary.dark",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar src={data?.image || ""} sx={{ width: 100, height: 100 }} />
          <Box sx={{ ml: 3 }}>
            <Typography variant="h4" sx={{ color: "white" }}>
              {data?.name}
            </Typography>
            <Typography variant="h6" sx={{ color: "white" }}>
              @{data?.userId}
            </Typography>
          </Box>
        </Box>
      )}
      <Container>{uid && <IconLabelTabs userId={uid} />}</Container>
    </div>
  );
};

export default Profile;
