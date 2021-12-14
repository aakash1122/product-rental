import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Product } from "../types/Product.types";

interface ProductDetailProps {
  data: Product;
  isReturning?: boolean;
}

const ProductDetails: FC<ProductDetailProps> = ({
  data,
  isReturning = false,
}) => {
  const {
    name,
    minimum_rent_period,
    mileage,
    needing_repair,
    availability,
    price,
  } = data;

  return (
    <Box
      sx={{
        width: "70%",
        mx: "auto",
      }}
      py={2}
    >
      <Row label="name" value={name}></Row>
      <Row label="minimum rent period: " value={minimum_rent_period + 1} />
      <Row label="mileage: " value={mileage ?? 0} />
      <Row label="Needs to be fixed:" value={needing_repair ? "Yes" : "No"} />
      <Row label="price per day:" value={`$${price}`} />

      {!isReturning && !availability && (
        <Typography color="red" variant="h6" data-cy="product-unavailable-text">
          This product is currently not availabe
        </Typography>
      )}
    </Box>
  );
};

export default ProductDetails;

const Row: FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ borderBottom: "1px solid gray" }}
    >
      <Typography>{label}:</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};
