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
`;
const BooksList = styled.div`
  background-color: #ffffff;
  margin: 20px 125px;
  padding: 20px 0;
  border-radius: 5px;
  border: 1px solid #babbae;
`;

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    async function getbooks() {
      try {
        const data = await axios.get(`${URL}/getbooks`);
        console.log(data, "books");
        setBooks([...data.data.data]);
      } catch (e) {
        console.log("error", e);
      }
    }
    getbooks();
  }, []);
  console.log(user, "user");
  return (
    <>
      <Topbar />
      <Container>
        <Navbar />
      </Container>
      <Container>
        <BooksList>
          <Title>Trending Books</Title>
          <SliderContainer books={books} />
          <Title>Classic Books</Title>
          <SliderContainer books={books} />
          <Title>Books for May</Title>
          <SliderContainer books={books} />
        </BooksList>
      </Container>
    </>
  );
};
export default Home;
