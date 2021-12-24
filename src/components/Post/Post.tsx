import React, { useEffect } from "react";
import styles from "./Post.module.scss";
import { IPost } from "../../interfaces";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../../services/apiUtils";
import { useNavigate } from "react-router-dom";

const Post: React.FC = () => {
  let tmpPost: IPost = {
    id: 1,
    title: "",
    subtitle: "Post title",
    content: "",
    isFavorite: false,
    image: "",
    date: Date.now(),
    author: "",
    price: "$49/mo",
    tagColor: "#DF4759",
  };
  const [post, setPost] = React.useState<IPost>(tmpPost);
  const { postID } = useParams();
  const { title, content, date, image, id, isFavorite, author, subtitle } =
    post;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPost(`${postID}`);
      // const data = await response.json();
      setPost(response);
    };
    fetchPost();
  }, []);

  const togglePostAsFavorite = async (post: IPost) => {
    let tmpPost: IPost = post;
    post.isFavorite = !post.isFavorite;
    setPost(tmpPost);
    await updatePost(tmpPost);

    console.log(post.isFavorite);
  };

  return (
    <div className={styles.Post} data-testid="Post">
      <div style={{ maxWidth: 805, margin: "auto", textAlign: "center" }}>
        <Button onClick={(e) => navigate(`/edit-post/${id}`)} size="small">
          Edit
        </Button>
        <Button onClick={(e) => togglePostAsFavorite(post)} size="small">
          {post && post.isFavorite
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </Button>
        <Grid container>
          <Grid item key={`titlegrid`} xs={12}>
            <h1> {title}</h1>
            <h2>{subtitle}</h2>
          </Grid>
          <Grid item key={`imagegrid`} xs={12}>
            <img alt={"main-image"} src={`/${image}`}></img>
            <p
              className={styles["caption"]}
              style={{ margin: "auto", textAlign: "center" }}
            >
              This is a caption on this photo for reference
            </p>
          </Grid>
          <Grid item key={`Ellipse`} xs={6} style={{ textAlign: "left" }}>
            <img alt={`ellipse`} src={`/images/Ellipse.png`} />{" "}
            <span className={styles["author"]}>{author}</span> <br />
            <span className={styles["date"]}>{date}</span>
          </Grid>
          <Grid item key={`socialmedia`} xs={6} style={{ textAlign: "right" }}>
            Share
            <img alt="instagram" src={`/images/instagram.png`} />
            <img alt="facebook" src={`/images/facebook.png`} />
            <img alt="tweeter" src={`/images/tweeter.png`} />
          </Grid>
        </Grid>
        <p className={styles["post-content"]}>{content}</p>
      </div>
    </div>
  );
};

export default Post;
