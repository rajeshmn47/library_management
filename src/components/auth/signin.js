import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userAction";
import "./signup.css";
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

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, loading, isAuthenticated, user, error]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const formdata = { email: email, password: password };
    dispatch(login(formdata));
    console.log("ok");
  };
  return (
    <>
      <div className="signup">
        <div className="signupbox">
          <Title>Log In</Title>
          <button
            className="sociallogin google"
            onClick={() => navigate("/googlelogin")}
          >
            <img src="./google.svg" alt="" style={{ marginRight: "5px" }} />
            Sign in with Google
          </button>
          <Or>
            <OrLeft />
            <Text>or</Text>
            <OrLeft />
          </Or>
          <Heading>
            Please enter your Internet Archive email and password to access your
            Open Library account.
          </Heading>
          <form className="signupform" onSubmit={(e) => handlesubmit(e)}>
            <div className="inputs">
              <h5 className="font-bold">Email</h5>
              <Input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputs">
              <h5 className="font-bold">Password</h5>
              <Input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" className="submitbutton" value="Log In" />
          </form>
        </div>
      </div>
    </>
  );
};
export default SignIn;
