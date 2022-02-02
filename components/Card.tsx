import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, CardMedia, IconButton } from "@mui/material";
import { VFC } from "react";
import { PostData } from "./Tab";

type props = {
  postData: PostData;
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
  return (
    <Box>
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            {postData.likeCount}
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};
