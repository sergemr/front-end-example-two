import React, { Dispatch, SetStateAction } from "react";
import styles from "./PostThumbnail.module.scss";
import { IPost } from "../../interfaces";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Grid from "@mui/material/Grid";

interface post {
  postData: IPost;
  setShouldLoginOpen: Dispatch<SetStateAction<boolean>>;
}
const PostThumbnail: React.FC<post> = (props) => {
  const { title, subtitle, date, image, id, author, price, tagColor } =
    props.postData;
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const handleClick = () => {
    navigate(`/post/${id}`);
  };
  const markFav = () => {
    console.log("clicked");
    console.log("clicked", user);
    if (user && user.userID) {
      navigate(`/post/${id}`);
    } else {
      props.setShouldLoginOpen(true);
    }
  };
  return (
    <div className={styles.PostThumbnail} data-testid="PostThumbnail">
      <h1>{}</h1>
      <Card
        style={{ cursor: "pointer" }}
        onClick={handleClick}
        sx={{ maxWidth: { xs: "inherit", md: 320 } }}
      >
        <div
          style={{
            backgroundImage: `url(${image})`,
          }}
          className={styles["img-top"]}
          id="img-top"
        >
          <br />
          &nbsp;
          <a
            className={styles["thumbnail-price-btn"]}
            style={{ backgroundColor: `${tagColor}`, borderRadius: 100 }}
            href="/"
          >
            {price}
          </a>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
            <br />
            <br />
          </Typography>
          <hr></hr>
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item key={`Ellipse`} xs={6}>
              <span>
                {" "}
                <img src={`/images/Ellipse.png`} alt={"elipse"}></img>
                {author}
              </span>
            </Grid>
            <Grid item key={`date`} xs={6} style={{ textAlign: "right" }}>
              <span> {date}</span>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostThumbnail;
