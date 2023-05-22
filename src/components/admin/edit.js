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
  SettingsRemoteOutlined,
  SettingsSystemDaydreamRounded,
} from "@mui/icons-material";
import { editbook } from "../../utils/apireq";
import storage from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

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
  const alert = useAlert();
  const { id } = useParams();
  const [book, setBook] = useState();
  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [file, setFile] = useState(null);
  const [quantity, setQuantity] = useState();
  const [url, setUrl] = useState();
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
      setAuthor(book.author);
      setQuantity(book.quantity);
      setUrl(book.image);
    }
  }, [book]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let myform = {
      name: name,
      url: url,
      postedby: user._id,
      author: author,
      quantity: quantity,
    };
    if (file) {
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            let myform = {
              name: name,
              url: downloadURL,
              postedby: user._id,
              author: author,
              quantity: quantity,
            };
            editbook(id, myform).then((l) => {
              console.log("added to database", l);
              alert.success("book edited successfully");
            });
          });
        }
      );
    } else {
      editbook(id, myform).then((l) => {
        console.log("added to database", l);
        alert.success("book edited successfully");
      });
    }
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
              <div className="name">
                <h3 style={{ textAlign: "left" }}>author</h3>
                <input
                  placeholder="name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="input"
                />
              </div>
              <div className="name">
                <h3 style={{ textAlign: "left" }}>quantity</h3>
                <input
                  placeholder="email"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input"
                />
              </div>
              <div className="file">
                <label for="file-upload" class="custom-file-upload">
                  upload picture
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
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
