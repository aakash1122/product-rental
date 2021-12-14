import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { FC } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  lists: {
    name: string;
    code: string;
  }[];
}

const ProductMenu: FC<Props> = ({ label, value, onChange, lists }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select a Product</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Select a product"
        onChange={(event: SelectChangeEvent) => {
          onChange(event.target.value as string);
        }}
        data-cy="productSelector"
      >
        {lists.map((prod, i) => (
          <MenuItem data-cy={`list-item`} value={prod.code} key={prod.code}>
            {prod.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductMenu;
