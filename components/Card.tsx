import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Avatar,
  CardHeader,
  CardMedia,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useState, VFC } from "react";
import { LoginModal } from "./LoginModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Post } from "../types/post";
import { useLoginUser } from "../hooks/useLoginUser";
import Link from "next/link";

type props = {
  postData: Post;
};

const formatDate = (date: Date) => {
  const publishDate = new Date(date);
  const yyyy = publishDate.getFullYear();
  const mm = ("00" + (publishDate.getMonth() + 1)).slice(-2);
  const dd = ("00" + publishDate.getDate()).slice(-2);
  const hh = ("00" + publishDate.getHours()).slice(-2);
  const mi = ("00" + publishDate.getMinutes()).slice(-2);
  const ss = ("00" + publishDate.getSeconds()).slice(-2);
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
};

export const OutlineCard: VFC<props> = (props) => {
  const { postData } = props;
  const [snackOpen, setSnackOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(postData.likeCount);
  const [likeFlag, setLikeFlag] = useState(postData.likeFlag);
  const { loginUser } = useLoginUser();

  const snackClose = () => {
    setSnackOpen(false);
  };
  const showAlert = () => {
    setSnackOpen(true);
  };
  const toggleLike = async () => {
    //いいねでなって欲しい値を送る(いいねついていたら外す、いいねついていなかったら付ける)
    const req = { like: !likeFlag, postId: postData.postId };
    try {
      await fetch(`${process.env.API_SERVER_PATH}/like`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (likeFlag) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setLikeFlag(!likeFlag);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={snackClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info">いいね機能の利用にはログインが必要です</Alert>
      </Snackbar>
      <Card variant="outlined">
        <Link href={`/profile/${postData.userId}`}>
          <CardHeader
            avatar={<Avatar src={postData.userImage} />}
            title={postData.name}
            subheader={formatDate(postData.publishedAt)}
          />
        </Link>
        {postData.postImage && (
          <CardMedia
            component="img"
            height="194"
            image={postData.postImage}
            alt="投稿画像"
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {postData.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {loginUser?.userId ? (
            likeFlag ? (
              <IconButton aria-label="add to favorites" onClick={toggleLike}>
                <FavoriteIcon />
                {likeCount}
              </IconButton>
            ) : (
              <IconButton aria-label="add to favorites" onClick={toggleLike}>
                <FavoriteBorderIcon />
                {likeCount}
              </IconButton>
            )
          ) : (
            <LoginModal>
              <IconButton aria-label="not login" onClick={showAlert}>
                <FavoriteBorderIcon />
                {likeCount}
              </IconButton>
            </LoginModal>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};
