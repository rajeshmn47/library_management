import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const Container = styled.div`
  padding: 20px 120px;
  a {
    text-decoration: none;
    color: #333;
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
export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");
  return (
    <>
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
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
            <Input />
          </Grid>
          <Grid item lg={2.5} md={2.5}>
            <Center>
              <Link>Log In</Link>
              <SignUp>SignUp</SignUp>
              <Menu src="./menu.svg" alt="" />
            </Center>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Navbar;
