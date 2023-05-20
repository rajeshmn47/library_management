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
const Container = styled.div`
  padding: 10px 10px;
`;
const Img = styled.img`
  width: 100%;
  padding: 10px 0;
  border-radius: 5px;
  height: 190px;
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
      <Container>
        <Img src={book?.image} alt="" />
        {book?.requests.find((u) => u.requestedBy == user?._id) ? (
          <Requested onClick={() => handleCancel(book?._id)}>Cancel</Requested>
        ) : (
          <Borrow onClick={() => handleClick(book?._id)}>Borrow</Borrow>
        )}
      </Container>
    </>
  );
};
export default BookDetail;
