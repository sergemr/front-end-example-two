import React, { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./CreatePost.module.scss";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createNewPost, updatePost, getPost } from "../../services/apiUtils";
import { IPost } from "../../interfaces";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TextField from "@mui/material/TextField";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
type FormValues = {
  title: string;
  subtitle: string;
  content: string;
  email: string;
  price: string;
  image: string;
};

interface iCreatePost {
  setShouldLoginOpen: Dispatch<SetStateAction<boolean>>;
}
const CreatePost: React.FC<iCreatePost> = (props) => {
  const { postID } = useParams();

  const [post, setPost] = React.useState<IPost>();
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    let number = Math.floor(Math.random() * 2 + 1);
    let tmpPost: IPost = {
      id: post && post.id ? post.id : 0,
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      isFavorite: false,
      image: data.image,
      date: Date.now(),
      author: user.userName,
      price: data.price,
      tagColor: number === 0 ? "#DF4759" : "#F2C94C",
    };
    tmpPost.id !== 0 ? callEditPost(tmpPost) : callCreatePost(tmpPost);
  };
  const callCreatePost = async (post: IPost) => {
    await createNewPost(post);
    navigate(`/home`);
  };
  const callEditPost = async (post: IPost) => {
    await updatePost(post);
    navigate(`/home`);
  };

  useEffect(() => {
    console.log(user);
    user && user.userID === 0 && props.setShouldLoginOpen(true);
    const fetchPost = async () => {
      const response = await getPost(`${postID}`);
      response && setPost(response);
    };
    fetchPost();
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const getErrorMSG = (title: string, message: string) => {
    return (
      <div style={{ margin: "auto" }}>
        <Alert severity="error">
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </div>
    );
  };
  return (
    <div className={styles.CreatePost} data-testid="CreatePost">
      <br />
      {console.log(post)}

      {(post || !postID) && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid style={{ margin: "auto", maxWidth: 800 }} container>
            <Grid item xs={12} md={12} xl={12}>
              <Item>
                <div>
                  <Controller
                    name="title"
                    rules={{
                      required:
                        post && post.title !== "" ? false : "title is required",
                    }}
                    control={control}
                    render={({ field }) => (
                      <TextField //required
                        fullWidth
                        variant="outlined"
                        error={errors && errors.title}
                        label="title"
                        defaultValue={post && post.title}
                        {...field}
                      />
                    )}
                  />
                  {errors &&
                    errors.title &&
                    getErrorMSG("Error!", errors.title.message)}
                  {console.log(errors)}
                  {console.log(post)}
                </div>
              </Item>
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Item>
                <div>
                  <Controller
                    name="subtitle"
                    rules={{
                      required:
                        post && post.subtitle !== ""
                          ? false
                          : "subtitle is required",
                    }}
                    control={control}
                    render={({ field }) => (
                      <TextField //required
                        defaultValue={post && post.subtitle}
                        fullWidth
                        variant="outlined"
                        error={errors && errors.subtitle}
                        label="subtitle"
                        {...field}
                      />
                    )}
                  />
                  {errors &&
                    errors.title &&
                    getErrorMSG("Error!", errors.subtitle.message)}
                </div>
              </Item>
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Item>
                {" "}
                <Controller
                  name="price"
                  rules={{
                    required:
                      post && post.price !== "" ? false : "price is required",
                  }}
                  control={control}
                  render={({ field }) => (
                    <TextField //required
                      defaultValue={post && post.price}
                      fullWidth
                      variant="outlined"
                      error={errors && errors.price}
                      label="price"
                      {...field}
                    />
                  )}
                />
                {errors &&
                  errors.title &&
                  getErrorMSG("Error!", errors.price.message)}
              </Item>
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
              <Item>
                <Controller
                  name="content"
                  rules={{
                    required:
                      post && post.content !== ""
                        ? false
                        : "content is required",
                  }}
                  control={control}
                  render={({ field }) => (
                    <TextField //required
                      defaultValue={post && post.content}
                      fullWidth
                      type={"multiline"}
                      variant="outlined"
                      multiline
                      rows={12}
                      maxRows={14}
                      error={errors && errors.content}
                      label="content"
                      {...field}
                    />
                  )}
                />
                {errors &&
                  errors.title &&
                  getErrorMSG("Error!", errors.content.message)}
              </Item>
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Item>
                {" "}
                <input
                  type="file"
                  className={styles["input-field"]}
                  //  defaultValue={post && post.image}
                  //  required
                  {...register("image")}
                />{" "}
              </Item>
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Item>
                <input className={styles["input-submit"]} type="submit" />
              </Item>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default CreatePost;
