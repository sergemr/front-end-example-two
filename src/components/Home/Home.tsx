import React, { Dispatch, SetStateAction, useEffect } from "react";
import { IPost } from "../../interfaces";
import styles from "./Home.module.scss";
import { getPosts } from "../../services/apiUtils";
import PostThumbnail from "../PostThumbnail/PostThumbnail";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField/";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
interface IHomeProps {
  showOnlyFavs: boolean;
  setShouldLoginOpen: Dispatch<SetStateAction<boolean>>;
}
const Home: React.FC<IHomeProps> = (props) => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = React.useState<IPost[]>([]);
  const [showOnlyFavs, setShowOnlyFavs] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>("");

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(-1),

    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const navigate = useNavigate();
  useEffect(() => {
    setShowOnlyFavs(props.showOnlyFavs);
    const fetchPosts = async () => {
      const response = await getPosts();
      setPosts(response);
      setDisplayedPosts(response);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (filter === "") {
      setDisplayedPosts(posts);
    } else {
      setDisplayedPosts(
        posts.filter((post) =>
          post.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        )
      );
    }
  }, [filter]);

  const displayPostGrid = () => {
    return (
      <Grid
        style={{
          margin: "auto",
          maxWidth: 1200,
          width: "inherit",
          backgroundColor: "#E5E5E5",
        }}
        container
        spacing={3}
      >
        {displayedPosts.map((post: IPost, index: number) => {
          return (
            <Grid
              style={{
                display:
                  props.showOnlyFavs && !post.isFavorite ? "none" : "block",
                width: "inherit",
              }}
              key={`${post} - ${index}`}
              xs={12}
              md={4}
              xl={4}
            >
              <PostThumbnail
                setShouldLoginOpen={props.setShouldLoginOpen}
                postData={post}
              ></PostThumbnail>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  //move to utils==
  const displayNotFound = () => {
    return <NotFound />;
  };
  return (
    <div className={styles.Home} data-testid="Home">
      <Paper />
      <Paper
        elevation={3}
        style={{ margin: "auto", maxWidth: 1080, padding: 8 }}
      >
        <Grid style={{ margin: "auto", maxWidth: 1080 }} container>
          <Grid item xs={12} md={10} xl={10}>
            <TextField //required
              defaultValue=""
              label="Search"
              fullWidth
              InputProps={{ disableUnderline: true }}
              //   error={}
              variant="standard"
              onChange={(e) => {
                let tmpPost = e.target.value;
                setFilter(tmpPost);
              }}
            />
          </Grid>

          <Grid item xs={12} md={2} xl={2}>
            <Button fullWidth color="primary" variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {displayedPosts.length === 0 ? displayNotFound() : displayPostGrid()}
    </div>
  );
};

export default Home;
