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
  background-color: #f9f9f9;
  border: 1px solid #babbae;
  border-radius: 5px;
  padding: 0px 0px;
  height: 40px;
  a {
    text-decoration: none;
    color: #333;
  }
`;
const DropDown = styled.div`
  border-radius: 3px 0 0 3px;
  background-color: hsla(48, 33%, 83%, 0.32);
  border: none;
  height: 100%;
  border-right: 1px solid #ddd;
  font-weight: 500;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  color: #666;
  .selecting {
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    background: 0 0;
    border: none;
    cursor: pointer;
    max-width: 100%;
    -moz-appearance: none;
    appearance: none;
    -webkit-appearance: none;
  }
`;
const InputC = styled(Grid)`
  height: 100%;
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
const Line = styled.div`
  height: 25px;
  width: 1px;
  background-color: #ccc;
`;
const Input = styled.input`
  width: 100%;
  padding: 5px 5px;
  margin: 5px 0px;
  margin-right: 10px;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: #f9f9f9;
  font-size: 1em;
`;

const Menu = styled.img`
  width: 20px;
`;
const Img = styled.img`
  width: 25px;
  height: 25px;
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
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const RightCorner = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 100%;
  justify-content: space-between;
`;
export const InputContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");
  return (
    <>
      <Container>
        <InputC container>
          <Grid item md={2} lg={2} sm={2}>
            <Center>
              <DropDown>
                <select className="selecting">
                  <option value="0">All</option>
                  <option value="1">Audi</option>
                  <option value="2">BMW</option>
                  <option value="3">Citroen</option>
                  <option value="4">Ford</option>
                </select>
              </DropDown>
            </Center>
          </Grid>
          <Grid item md={7} lg={7} sm={7}>
            <Center>
              <Input placeholder="Search" />
            </Center>
          </Grid>
          <Grid item md={3} lg={3} sm={3}>
            <RightCorner>
              <Img src="./search.svg" alt="" />
              <Line />
              <Img src="./barcode.svg" alt="" />
            </RightCorner>
          </Grid>
        </InputC>
      </Container>
    </>
  );
};
export default InputContainer;
