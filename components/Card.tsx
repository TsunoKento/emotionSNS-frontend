import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, CardMedia, IconButton } from "@mui/material";
import { VFC } from "react";

type props = {
  user: {
    id: string;
    name: string;
    image?: string;
  };
  post: {
    image?: string;
    date: string;
    content: string;
    like: number;
  };
  tags?: string[];
};

export const OutlineCard: VFC<props> = (props) => {
  const { user, post, tags } = props;
  return (
    <Box>
      <Card variant="outlined">
        <CardHeader
          avatar={<Avatar src={user.image} alt={user.id} />}
          title={user.name}
          subheader={post.date}
        />
        {post.image && (
          <CardMedia
            component="img"
            height="194"
            image={post.image}
            alt="Paella dish"
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {tags && tags.map((tag: string) => tag)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            {post.like}
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};
