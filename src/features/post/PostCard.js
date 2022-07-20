import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  Menu,
  Divider,
  MenuItem,
  Button,

} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { deletePosts } from "./postSlice";
import PostEdit from "./PostEdit";




function PostCard({ post }) {
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    return setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleDeletePost = () => {
    if (post.author._id === user._id) {
      if (window.confirm("Do you really want to delete?"))
        return dispatch(deletePosts(post._id));
    }
    else (alert("you not is author post?"))
  }

  const menuId = post._id;

  const rederDialog = (<PostEdit post={post} />)

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem sx={{ mx: 1 }}
        onClick={() => { handleMenuClose() }}
      >
        {rederDialog}
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem sx={{ mx: 1 }}
        onClick={() => {
          handleDeletePost()
          handleMenuClose()
        }}
      >
        <Typography >Delete Post</Typography>
      </MenuItem>
    </Menu >
  )

  return (

    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        //////////////////////////

        action={

          <Button sx={{ height: '60px', borderRadius: "50%" }} >
            <MoreVertIcon sx={{ fontSize: 30 }} onClick={handleProfileMenuOpen} />
            {renderMenu}

          </Button>

        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
