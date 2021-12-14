import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  toggleBookModal: Function;
  toggleReturnModal: Function;
}

const Footer = ({ toggleBookModal, toggleReturnModal }: Props) => {
  return (
    <Box pt={2} display="flex" justifyContent="flex-end" gap={2}>
      <Button
        variant="contained"
        size="large"
        onClick={() => toggleBookModal()}
        sx={{ width: 150 }}
        data-cy="bookBtn"
      >
        Book
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={() => toggleReturnModal()}
        sx={{ width: 150 }}
        data-cy="returnBtn"
      >
        Return
      </Button>
    </Box>
  );
};

export default Footer;
