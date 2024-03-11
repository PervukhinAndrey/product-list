import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { fetchFiltredIds, fetchProducts } from "./../productsSlice";

const CustomSearch = () => {
  const globalDispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [isInputError, setIsInputError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);

  const page = useSelector((state) => state.products.pageNum);

  const handleSearchButton = () => {
    const regexp1 = /^[0-9]*[.][0-9]+$/; //десятичная запись
    const regexp2 = /^[0-9]+$/; //целые числа
    if (inputValue === "" || selectValue === "") {
      if (inputValue === "") {
        setIsInputError(true);
      } else {
        setIsInputError(false);
      }
      if (selectValue === "") {
        setIsSelectError(true);
      } else {
        setIsSelectError(false);
      }
    } else {
      if (
        !inputValue.match(regexp1) &&
        !inputValue.match(regexp2) &&
        selectValue === "price"
      ) {
        setIsInputError(true);
      } else {
        const obj = {};
        if (selectValue !== "price") {
          obj[selectValue] = inputValue.trim();
        } else {
          obj[selectValue] = Number(inputValue);
        }
        setIsInputError(false);
        setIsSelectError(false);
        globalDispatch(fetchFiltredIds(obj));
      }
    }
  };

  const handleClearButton = () => {
    setIsInputError(false);
    setIsSelectError(false);
    setInputValue("");
    setSelectValue("");
    globalDispatch(fetchProducts(page));
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Stack direction="row" spacing={2}>
      <FormControl sx={{ width: 1 / 4 }} error={isSelectError}>
        <InputLabel id="demo-simple-select-label">Parameter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Parameter"
          value={selectValue}
          onChange={handleSelect}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"product"}>Product</MenuItem>
          <MenuItem value={"price"}>Price</MenuItem>
          <MenuItem value={"brand"}>Brand</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        fullWidth
        onChange={handleInput}
        value={inputValue}
        error={isInputError}
      />
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        sx={{ px: 4 }}
        onClick={handleSearchButton}
      >
        Search
      </Button>
      <Button variant="contained" sx={{ px: 4 }} onClick={handleClearButton}>
        Clear
      </Button>
    </Stack>
  );
};

export default memo(CustomSearch);
