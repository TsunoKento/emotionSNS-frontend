import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import { SettingModal } from "../../components/SettingModal";
import { IconLabelTabs } from "../../components/Tab";
import { useLoginUser } from "../../hooks/useLoginUser";
import { LoginUser } from "../../types/loginUser";
import Head from "next/head";

const Profile: NextPage = () => {
  const { loginUser } = useLoginUser();
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
        <Box sx={{ height: 300, backgroundColor: "primary.dark" }}>
          <Head>
            <title>{data?.name}さんのページ</title>
          </Head>
          {data?.userId == loginUser?.userId && (
            <Container maxWidth="xl" sx={{ position: "relative" }}>
              <SettingModal user={data}>
                <SettingsIcon fontSize="large" />
              </SettingModal>
            </Container>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
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
        </Box>
      )}
      <Container>{uid && <IconLabelTabs userId={uid} />}</Container>
    </div>
  );
};

export default Profile;
