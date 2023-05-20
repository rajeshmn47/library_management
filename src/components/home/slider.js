import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Book from "./book";
import { URL } from "../../constants/userConstants";
import { Grid } from "@mui/material";
import Navbar from "../navbar/navbar";
import Topbar from "../topbar/topbar";

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
  margin: 10px 0;
  padding: 20px 30px;
  width: 100%;
  box-sizing: border-box;
  background: #f3edd7;
  position: relative;
  border-bottom: 1px solid #e4e0cc;
  border-top: 1px solid #eae7d6;
  .slick-prev::before,
  .slick-next::before {
    color: hsl(202, 96%, 37%);
    font-size: 35px;
  }
  .slick-next::before {
    position: absolute;
    top: 45%;
    right: -2% !important;
  }
  .slick-prev::before {
    position: absolute;
    top: 45%;
    left: -2% !important;
  }
`;
const BooksList = styled.div`
  background-color: #ffffff;
  margin: 20px 125px;
  padding: 20px 0;
`;

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        initialSlide: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1380,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        initialSlide: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

export const SliderContainer = ({ books }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");
  return (
    <>
      <Container>
        <Slider {...settings}>
          {books?.length > 0 && books?.map((b) => <Book data={b} />)}
        </Slider>
      </Container>
    </>
  );
};
export default SliderContainer;
