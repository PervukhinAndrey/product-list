import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Stack } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const CustomPagination = ({ callback, selector }) => {
  const { pageNum, isLastPage } = useSelector(selector);
  const dispatch = useDispatch();

  const handleArrowBack = () => {
    dispatch(callback(pageNum - 1));
  };

  const handleArrowForward = () => {
    dispatch(callback(pageNum + 1));
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button
        variant="contained"
        onClick={handleArrowBack}
        disabled={pageNum < 2}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <Button
        variant="contained"
        onClick={handleArrowForward}
        disabled={isLastPage}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Stack>
  );
};
