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
  padding: 10px 120px;
  background-color: #333;
  a {
    text-decoration: none;
    color: #333;
  }
  @media (max-width: 800px) {
    padding: 10px 10px;
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
  padding: 5px 0;
  margin: 5px 0;
`;

const Menu = styled.img`
  width: 20px;
`;
const Archive = styled.img`
  width: 240px;
  height: 100%;
`;
const SignUp = styled(Link)`
  background-color: #0376b8;
  color: #ffffff !important;
  padding: 7px 20px;
  border-radius: 5px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 30px;
`;
export const Topbar = () => {
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
          <Grid item lg={6} md={6}>
            <Left>
              <Archive src="./archive.svg" alt="" />
            </Left>
          </Grid>
          <Grid item lg={6} md={6}>
            <Right>
              <Menu src="./changelanguage.svg" alt="" />
            </Right>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Topbar;
