import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { register } from "../../actions/userAction";
import "./admin.css";
import Sidebar from "./sidebar";
import { useAlert } from "react-alert";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import {
  SetMealRounded,
  SettingsSystemDaydreamRounded,
} from "@mui/icons-material";
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
const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dashboard = () => {
  const pathname = useLocation();
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [deleteItem, setDeleteItem] = useState();
  const navigate = useNavigate();
  const [name, setName] = useState();
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

  const handleDelete = async (id) => {
    const data = await axios.get(`${URL}/delete/${id}`);
    console.log(data.data.books, "books");
    setBooks([...data.data.books]);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "name",
      width: 150,
      editable: true,
    },
    {
      field: "image",
      headerName: "image",
      width: 150,
      editable: true,
    },
    {
      field: "edit",
      headerName: "postedby",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/edit/${params.id}`}>
              <EditIcon />
            </Link>
            <div onClick={() => handleDelete(params.id)}>
              <DeleteIcon />
            </div>
          </Fragment>
        );
      },
    },
  ];
  console.log(pathname, "user");
  return (
    <>
      <Grid container>
        <Grid item lg={3} md={3}>
          <Sidebar />
        </Grid>
        <Grid item lg={9} md={9}>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={books}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              getRowId={(row) => row._id}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
