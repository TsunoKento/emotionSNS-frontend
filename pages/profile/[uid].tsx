import { NextPage } from "next";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  return <h1>{uid}のプロフィールページです!</h1>;
};

export default Profile;
