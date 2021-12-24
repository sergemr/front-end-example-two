import React from "react";
import styles from "./NotFound.module.scss";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.NotFound} data-testid="NotFound">
      <Grid style={{ margin: "auto", maxWidth: 800 }} container>
        <Grid item xs={6} md={6} xl={6}>
          <div className={styles["msg-div"]}>
            <h1 className={"centered-item"}>Uh oh.</h1>
            <p>
              We ran into an issue, but don’t worry, we’ll take care of it for
              sure.
            </p>

            <Button
              type="submit"
              onClick={(e) => navigate(-1)}
              color="primary"
              variant="contained"
            >
              Back to safety
            </Button>
          </div>
        </Grid>
        <Grid item xs={6} md={6} xl={6}>
          <img src="/images/not-found.png" />
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
