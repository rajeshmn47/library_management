import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import InputContainer from "./inputcontainer";
import MenuD from "./menu";
import InputContainerSm from "./inputcontainerSm";

const Container = styled.div`
  a {
    text-decoration: none;
    color: #333;
  }
  padding:10px 120px;
  @media (max-width: 600px) {
    a {
      display: none;
    }
    padding: 10px 10px;
`;

const Account = styled.img`
  height: 40px;
  border: 2px solid #cdcbc5;
  border-radius: 4px;
  cursor: pointer;
  @media (max-width: 600px) {
    display: none;
  }
`;
const Or = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;
const OrLeft = styled.div`
  height: 1px;
  width: 250px;
  background-color: #000000;
`;
const Text = styled.h3`
  margin: 0 5px;
`;

const Heading = styled.p`
  margin: 20px 0;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 5px;
  margin: 5px 0px;
  margin-right: 10px;
  box-sizing: border-box;
`;

const Menu = styled.img`
  width: 20px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const SignUp = styled(Link)`
  background-color: #0376b8;
  color: #ffffff !important;
  padding: 7px 20px;
  border-radius: 5px;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
`;

const Corner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 30px;
`;

const SearchMb = styled.div`
  cursor: pointer;
  @media (max-width: 1900px) {
    display: none;
  }
  @media (max-width: 600px) {
    display: block;
  }
`;

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");

  const handleClickAway = () => {
    console.log(expanded, "expanded");
    setExpanded(!expanded);
  };
  return (
    <>
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {expanded ? (
            <Grid item sm={10} xs={11}>
              <InputContainerSm handleClickAway={handleClickAway} />
            </Grid>
          ) : (
            <>
              <Grid item lg={2} md={2}>
                <Center>
                  <Img src="./library.svg" alt="" />
                </Center>
              </Grid>
              <Grid item lg={2.5} md={2.5}>
                <Center>
                  <Link>My Books</Link>
                  <Link>Browse</Link>
                </Center>
              </Grid>
              <Grid item lg={4.5} md={4.5}>
                <InputContainer />
                <SearchMb>
                  <img
                    src="./search.svg"
                    alt=""
                    onClick={() => setExpanded(true)}
                  />
                </SearchMb>
              </Grid>
            </>
          )}
          <Grid item lg={2.5} md={2.5} xs={1}>
            <Corner>
              {loading ? (
                <Loader />
              ) : user?.username ? (
                <Account
                  src="https://archive.org/images/person2.png"
                  onClick={() => setMenuOpen(true)}
                />
              ) : (
                <>
                  <Link to="./signin">Log In</Link>
                  <SignUp to="./signup">SignUp</SignUp>
                </>
              )}
              <Menu src="./menu.svg" alt="" onClick={() => setMenuOpen(true)} />
              <MenuD menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </Corner>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Navbar;
