import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { URL } from "../../constants/userConstants";

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
export const Book = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");
  useEffect(() => {
    console.log(data, "data");
  }, [data]);
  const handleClick = async (id) => {
    try {
      await axios.post(`${URL}/request/${id}`, { userId: user?._id });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Container>
        <Img src={data?.image} alt="" />
        {data.requests.find((u) => u.requestedBy == user._id) ? (
          <Requested onClick={() => handleClick(data._id)}>
            Cancel Request
          </Requested>
        ) : (
          <Borrow onClick={() => handleClick(data._id)}>Borrow</Borrow>
        )}
      </Container>
    </>
  );
};
export default Book;
