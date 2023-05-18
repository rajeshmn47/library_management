import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Img = styled.img`
  width: 100%;
  padding: 10px 0;
  border-radius: 5px;
  max-height: 190px;
  object-fit: contain;
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
`;
export const Book = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");
  return (
    <>
      <Container>
        <Img src="https://covers.openlibrary.org/b/id/9269962-M.jpg" alt="" />
        <Borrow>Borrow</Borrow>
      </Container>
    </>
  );
};
export default Book;
