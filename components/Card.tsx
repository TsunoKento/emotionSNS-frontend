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
import { useContext, useState, VFC } from "react";
import { UserContext } from "../pages/_app";
import { LoginModal } from "./LoginModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Post } from "../types/post";

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
  const currentUser = useContext(UserContext);

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
      await fetch("http://localhost:8000/like", {
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
        <CardHeader
          avatar={<Avatar src={postData.userImage} alt="ユーザー画像" />}
          title={postData.name}
          subheader={formatDate(postData.publishedAt)}
        />
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
          {currentUser?.userId ? (
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
