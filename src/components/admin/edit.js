import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import "./admin.css";
import Sidebar from "./sidebar";
import { URL } from "../../constants/userConstants";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import {
  SetMealRounded,
  SettingsSystemDaydreamRounded,
} from "@mui/icons-material";

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
const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState();
  const [name, setName] = useState();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    async function getbook() {
      try {
        const data = await axios.get(`${URL}/getbook/${id}`);
        console.log(data.data.data, "book");
        setBook(data.data.data);
      } catch (e) {
        console.log(e, "error");
      }
    }
    getbook();
  }, [id]);
  useEffect(() => {
    if (book?.name) {
      setName(book.name);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${URL}/edit/${book._id}`, {
      name: name,
      url: name,
      postedby: user._id,
    });
  };
  return (
    <>
      <Grid container>
        <Grid item lg={3} md={3}>
          <Sidebar />
        </Grid>
        <Grid item lg={9} md={9}>
          <FormContainer>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
              <div className="name">
                <h3 style={{ textAlign: "left" }}>name</h3>
                <input
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
              <div className="email">
                <h3 style={{ textAlign: "left" }}>name</h3>
                <input
                  placeholder="email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
              <div className="file">
                <label for="file-upload" class="custom-file-upload">
                  upload picture
                </label>
                <input id="file-upload" type="file" />
              </div>
              <input type="submit" value="submit" className="submit" />
            </form>
          </FormContainer>
        </Grid>
      </Grid>
    </>
  );
};
export default Edit;
