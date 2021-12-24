import React, { useEffect, Dispatch, SetStateAction } from "react";
import styles from "./Login.module.scss";
import { useForm, Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import Dialog from "@mui/material/Dialog";
import { IUser } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { mountUser } from "../../redux/userSlice";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const emails = ["username@gmail.com", "user02@gmail.com"];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  elevation: 0,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ILogin {
  setUser: (user: IUser) => void;
  shouldLoginOpen: boolean;
  setShouldLoginOpen: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<ILogin> = (props) => {
  const [open, setOpen] = React.useState(props.shouldLoginOpen);
  const [showLoginForm, setShowLoginForm] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const getIputNameField = () => {
    return (
      <div>
        <Controller
          name="name"
          rules={{ required: "Name is required" }}
          control={control}
          render={({ field }) => (
            <TextField //required
              defaultValue=""
              label="Name"
              fullWidth
              error={errors && errors.name}
              variant="outlined"
              {...field}
            />
          )}
        />

        {errors && errors.name && getErrorMSG("Error!", errors.name.message)}
      </div>
    );
  };
  const getIputPasswordField = () => {
    return (
      <div>
        <Controller
          name="password"
          rules={{
            required: "Password is required",
          }}
          control={control}
          render={({ field }) => (
            <TextField //required
              defaultValue=""
              label="password"
              variant="outlined"
              type="password"
              error={errors && errors.password}
              fullWidth
              {...field}
            />
          )}
        />

        {errors &&
          errors.password &&
          getErrorMSG("Error!", errors.password.message)}
      </div>
    );
  };

  const getIputAddressField = () => {
    return (
      <div>
        <Controller
          name="address"
          rules={{ required: "address is required" }}
          control={control}
          render={({ field }) => (
            <TextField //required
              defaultValue=""
              fullWidth
              variant="outlined"
              error={errors && errors.address}
              label="address"
              {...field}
            />
          )}
        />

        {errors &&
          errors.address &&
          getErrorMSG("Error!", errors.address.message)}
      </div>
    );
  };

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

  const getIputButton = () => {
    return (
      <div style={{ margin: "auto", textAlign: "center" }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    );
  };
  const onSubmit = (data: any) => {
    let tmpuser: IUser = {
      userID: 1,
      userName: data.address,
      userLastName: data.password,
      userMail: data.address,
    };
    dispatch(mountUser(tmpuser));
    props.setUser(tmpuser);
    props.setShouldLoginOpen(false);
    setOpen(false);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    props.setShouldLoginOpen(false);
    // setSelectedValue(value);
  };
  useEffect(() => {
    setOpen(props.shouldLoginOpen);
  }, [props]);

  const displayLoginForm = () => {
    return (
      <div>
        <Grid container style={{ maxWidth: 400, margin: "auto" }} spacing={0}>
          <Grid item xs={12} md={12} xl={12}>
            <h1>Sign In</h1>
            <p>Simplify your reading in minutes.</p>
          </Grid>

          <Grid item xs={12} md={12} xl={12} style={{ padding: 8 }}>
            {getIputAddressField()}
          </Grid>

          <Grid item xs={12} md={12} xl={12} style={{ padding: 8 }}>
            {getIputPasswordField()}
          </Grid>

          <Grid item xs={12} md={12} xl={12} style={{ padding: 8 }}>
            {getIputButton()}
          </Grid>
        </Grid>
      </div>
    );
  };

  const displayRegisterForm = () => {
    return (
      <div>
        <Grid container style={{ maxWidth: 400, margin: "auto" }} spacing={0}>
          <Grid item xs={12} md={12} xl={12}>
            <h1>Sign Up</h1>
            <p>Simplify your reading in minutes.</p>
          </Grid>
          <Grid item xs={12} md={12} xl={12} style={{ padding: 8 }}>
            {getIputNameField()}
          </Grid>

          <Grid item xs={12} md={12} xl={12} style={{ padding: 8 }}>
            {getIputPasswordField()}
          </Grid>
          <Grid item xs={12} md={12} xl={12} style={{ padding: 8 }}>
            {getIputAddressField()}
          </Grid>

          <Grid item xs={12} md={12} xl={12} style={{ padding: 8 }}>
            {getIputButton()}
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <div className={styles.Login} data-testid="Login">
      <Dialog
        //  style={{ maxWidth: 1000, margin: "auto" }}
        fullScreen={fullScreen}
        onClose={handleClose}
        open={open}
      >
        <div style={{ margin: "auto" }}></div>
        <form
          style={{ margin: "15px;font-variant: all-petite-caps;" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid
            container
            style={{ maxWidth: 1200, margin: "auto" }}
            spacing={0}
          >
            <Grid
              item
              xs={12}
              md={6}
              xl={6}
              className={styles["login-img"]}
              style={{
                backgroundImage: "url('/images/login.png')",
                minHeight: "50vh",
              }}
            ></Grid>{" "}
            <Grid item xs={12} md={6} xl={6} style={{ padding: 20 }}>
              {showLoginForm ? displayLoginForm() : displayRegisterForm()}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              xl={6}
              style={{ margin: "auto", textAlign: "center" }}
            >
              <p style={{ display: showLoginForm ? "block" : "none" }}>
                {" "}
                Dont have an account? Register{" "}
                <Button
                  type="submit"
                  onClick={(e) => setShowLoginForm(false)}
                  variant="text"
                >
                  here
                </Button>
              </p>
              <p style={{ display: showLoginForm ? "none" : "block" }}>
                {" "}
                Already a member? Login{" "}
                <Button
                  onClick={(e) => setShowLoginForm(true)}
                  type="submit"
                  variant="text"
                >
                  here
                </Button>
              </p>
              <p style={{ textAlign: "right" }}>
                <Button onClick={handleClose} type="submit" variant="text">
                  x
                </Button>
              </p>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
};
export default Login;
