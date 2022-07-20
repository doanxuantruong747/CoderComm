import React, { useCallback } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";

import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { editPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";



function PostFormEdit({ post }) {
  const { isLoading } = useSelector((state) => state.post);
  const { user } = useAuth();
  const userId = user._id;

  const defaultValues = {
    content: post.content || "",
    image: post.image || null,
  };

  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {


    if (post.author._id === user._id) {
      dispatch(editPost({ _id: post._id, ...data, userId }))

    } else (alert("you not is author post!"))
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} >
        <Stack spacing={2}>
          <FTextField
            input
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              save changes
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider >
    </Card>
  );
}

export default PostFormEdit;
