import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import Book from "./book";
import { URL } from "../../constants/userConstants";
import { Grid } from "@mui/material";
import Navbar from "../navbar/navbar";
import Topbar from "../topbar/topbar";
import Slider from "react-slick";
import SliderContainer from "./slider";
import { getbooks } from "../../actions/bookAction";
import BelowBar from "../navbar/belowBar";

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

const Title = styled(Link)`
  color: #02598b;
  padding-left: 15px;
  font-size: 1.2em;
  font-weight: 400;
`;

const Input = styled.input`
  padding: 5px 0;
  margin: 5px 0;
`;
const Container = styled.div`
  padding: 20px 10px;
  @media (max-width: 600px) {
    padding: 10px 10px;
    background: linear-gradient(
      to bottom,
      hsl(41.2, 47.1%, 93.3%),
      hsl(41.5, 48.1%, 89.4%)
    );
    padding: 0 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }
`;
const BooksList = styled.div`
  background-color: #ffffff;
  margin: 20px 125px;
  padding: 20px 0;
  border-radius: 5px;
  border: 1px solid #babbae;
  @media (max-width: 600px) {
    margin: 0;
  }
`;

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const { books } = useSelector((state) => state.book);
  useEffect(() => {
    async function getbookse() {
      try {
        //const data = await axios.get(`${URL}/getbooks`);
        dispatch(getbooks());
      } catch (e) {
        console.log("error", e);
      }
    }
    getbookse();
  }, []);
  console.log(user, "user");
  return (
    <>
      <Topbar />
      <Container>
        <Navbar />
      </Container>
      <BelowBar />
      <Container>
        <BooksList>
          <Title>Trending Books</Title>
          <SliderContainer books={books} />
          <Title>Classic Books</Title>
          <SliderContainer books={books} />
          <Title>Books for May</Title>
          <SliderContainer books={books} />
          <p
            style={{ padding: "0 15px", color: "#333", fontFamily: "Georgia" }}
          >
            Open Library is an open, editable library catalog, building towards
            a web page for every book ever published. More Just like Wikipedia,
            you can contribute new information or corrections to the catalog.
            You can browse by subjects, authors or lists members have created.
            If you love books, why not help build a library?
          </p>
        </BooksList>
      </Container>
    </>
  );
};
export default Home;
