import React from "react";

import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";
import Header from "./components/Header/Header";
import CreatePost from "./components/CreatePost/CreatePost";
import { IUser } from "./interfaces";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

//import { Counter } from './features/counter/Counter';
function App() {
  const [showOnlyFavs, setShowOnlyFavs] = React.useState<boolean>(false);
  const [shouldLoginOpen, setShouldLoginOpen] = React.useState<boolean>(false);
  const [loggedUser, setLoggedUser] = React.useState<IUser>();
  const user = useSelector((state: RootState) => state.user.user);

  const handleToggleFavs = (value: boolean) => {
    setShowOnlyFavs(value);
  };

  const isUserLoggedIn = () => {
    !loggedUser && setShouldLoginOpen(shouldLoginOpen);
  };
  const mountUserOnMem = (user: IUser) => {
    setLoggedUser(user);
    setShouldLoginOpen(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          setShouldLoginOpen={setShouldLoginOpen}
          handleToggleFavs={handleToggleFavs}
        ></Header>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                setShouldLoginOpen={setShouldLoginOpen}
                showOnlyFavs={showOnlyFavs}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                setShouldLoginOpen={setShouldLoginOpen}
                showOnlyFavs={showOnlyFavs}
              />
            }
          />
          <Route path="/post" element={<Post />} />
          <Route
            index
            element={
              <Home
                setShouldLoginOpen={setShouldLoginOpen}
                showOnlyFavs={showOnlyFavs}
              />
            }
          />
          <Route path="post/:postID" element={<Post />} />
          <Route
            path="create-post/:postID"
            element={<CreatePost setShouldLoginOpen={setShouldLoginOpen} />}
          />
          <Route
            path="edit-post/:postID"
            element={<CreatePost setShouldLoginOpen={setShouldLoginOpen} />}
          />
          <Route
            path="/create-post"
            element={<CreatePost setShouldLoginOpen={setShouldLoginOpen} />}
          />
          {/*  
          
              <Route path="teams" element={<Teams />}>
              
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
              */}
        </Routes>
      </BrowserRouter>
      <div>
        {" "}
        <p className="footer"> Landkit. © all rights reserved 2021</p>
      </div>
      <Login
        shouldLoginOpen={shouldLoginOpen}
        setShouldLoginOpen={setShouldLoginOpen}
        setUser={mountUserOnMem}
      ></Login>
    </div>
  );
}

export default App;
