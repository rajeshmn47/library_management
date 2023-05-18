import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
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

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState();
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
    console.log(username, password);
    const formdata = { username: username, email: email, password: password };
    dispatch(register(formdata));
    console.log("ok");
  };
  return (
    <>
      <div className="signup">
        <div className="signupbox">
          <Title>Sign Up</Title>
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
            Complete the form below to create a new Internet Archive account.
            Each field is required
          </Heading>
          <form className="signupform" onSubmit={(e) => handlesubmit(e)}>
            <div className="inputs">
              <h5 className="font-bold">
                Choose a screen name. Screen names are public and cannot be
                changed later.
              </h5>
              <Input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="inputs">
              <h5 className="font-bold">Your email address</h5>
              <Input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputs">
              <h5 className="font-bold">Choose a password</h5>
              <Input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" className="submitbutton" value="Sign up" />
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
