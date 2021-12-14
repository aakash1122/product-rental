import { Box, TextField } from "@mui/material";
import React, { FC } from "react";

interface Props {
  onChange: (value: string) => void | null;
}

const Searchbar: FC<Props> = ({ onChange }) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <TextField
        placeholder="search"
        onChange={(e) => onChange(e.currentTarget.value)}
        sx={{ width: 250, background: "white" }}
        inputProps={{ "data-cy": "searchField" }}
      />
    </Box>
  );
};

export default Searchbar;
