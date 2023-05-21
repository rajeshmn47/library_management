import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { URL } from "../../constants/userConstants";
import { getbooks } from "../../actions/bookAction";
import Topbar from "../topbar/topbar";
import Navbar from "../navbar/navbar";
import { GradientRounded } from "@mui/icons-material";
import { Grid, Rating } from "@mui/material";

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

const Input = styled.input`
  padding: 5px 0;
  margin: 5px 0;
`;
const Container = styled.div`
  padding: 10px 10px;
  margin: 20px 125px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #cccccc;
`;
const Img = styled.img`
  width: 100%;
  padding: 10px 0;
  border-radius: 5px;
  height: 250px;
  object-fit: cover;
  @media (max-width: 600px) {
    height: 150px;
  }
`;
const Borrow = styled.a`
  border: none;
  outline: none;
  background-color: #0376b8;
  color: #ffffff;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  border: 1px solid #cccccc;
  padding: 15px 15px;
  border-radius: 5px;
  label {
    margin-right: 10px !important;
    margin-top: 7px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Requested = styled.a`
  border: none;
  outline: none;
  background-color: #666;
  color: #ffffff;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", Palatino, serif;
  margin: 0 0;
  color: #333;
  font-size: 2em;
`;

const Details = styled.div`
  padding: 0 15px;
`;
const Author = styled.h2`
  font-size: 1em;
  font-weight: 400;
  color: #333;
`;

const Description = styled.p`
  font-size: 13px;
  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;
`;

const ContainerC = styled.div`
  padding: 20px 20px;
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
const Space = styled.div`
  width: 20px;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;
  .MuiRating-label {
    margin-right: 10px !important;
  }
`;
export const BookDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState();
  const { id } = useParams();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const { books } = useSelector((state) => state.book);
  console.log(user, "user");
  useEffect(() => {
    async function getbook() {
      const data = await axios.get(`${URL}/getbook/${id}`);
      console.log(data, "data");
      setBook(data.data.data);
    }
    getbook();
  }, [id]);
  const handleClick = async (id) => {
    try {
      if (isAuthenticated) {
        const data = await axios.post(`${URL}/request/${id}`, {
          userId: user?._id,
        });
        dispatch(getbooks());
        console.log(data, "requests");
      } else {
        navigate("/signin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = async (id) => {
    try {
      if (isAuthenticated) {
        const data = await axios.post(`${URL}/cancelrequest/${id}`, {
          userId: user?._id,
        });
        dispatch(getbooks());
        console.log(data, "requests");
      } else {
        navigate("/signin");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Topbar />
      <ContainerC>
        <Navbar />
      </ContainerC>
      <Container>
        <Grid container>
          <Grid item lg={3} md={3}>
            <ImageContainer>
              <Img src={book?.image} alt="" />
              {book?.requests.find((u) => u.requestedBy == user?._id) ? (
                <Requested onClick={() => handleCancel(book?._id)}>
                  Cancel
                </Requested>
              ) : (
                <Borrow onClick={() => handleClick(book?._id)}>Borrow</Borrow>
              )}
              <Rating name="simple-controlled" value={0} />
            </ImageContainer>
          </Grid>
          <Grid item lg={9} md={9}>
            <Details>
              <Title>{book?.name}</Title>
              <Author>by {book?.author}</Author>
              <Info>
                <Rating value={3.73} />
                <Space /> · 57 Ratings
                <Space />·<Space /> 619 Want to read <Space /> ·<Space /> 32
                Currently reading <Space />· <Space /> 81 Have read
              </Info>
              <Description>{book?.description}</Description>
            </Details>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default BookDetail;
