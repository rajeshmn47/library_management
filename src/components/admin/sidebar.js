import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import "./admin.css";
import { useAlert } from "react-alert";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid, TextField } from "@mui/material";
import {
  SetMealRounded,
  SettingsSystemDaydreamRounded,
} from "@mui/icons-material";

const Container = styled.div`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
`;

export const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  return (
    <>
      <Container>
        <button
          className={location.pathname == "/admin" ? "selected" : "element"}
          onClick={() => navigate("/admin")}
        >
          dashboard
        </button>
        <button
          className={
            location.pathname == "/admin/list" ? "selected" : "element"
          }
          onClick={() => navigate("/admin/list")}
        >
          add
        </button>
        <button
          className={
            location.pathname == "/admin/requests" ? "selected" : "element"
          }
          onClick={() => navigate("/admin/requests")}
        >
          requests
        </button>
      </Container>
    </>
  );
};
export default Sidebar;
