import React, { useState } from "react";
import { Avatar, Box, Button, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment, postId }) {

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


  const handleDeleteComment = () => {
    //console.log('comment:', comment)
    if (comment.author._id === user._id) {
      if (window.confirm("Do you really want to delete?"))
        return dispatch(deleteComment(comment._id, postId));
    }
    else (alert("you not is author comment?"))
  }

  const menuId = comment._id;
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
        onClick={() => {
          handleDeleteComment()
          handleMenuClose()
        }}
      >
        <Typography >Delete comment</Typography>
      </MenuItem>

    </Menu >
  )





  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>


          <Button sx={{ maxWidth: '5px' }} >
            <MoreVertIcon sx={{ fontSize: 15 }} onClick={handleProfileMenuOpen} />
            {renderMenu}

          </Button>


        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
