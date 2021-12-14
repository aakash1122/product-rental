import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { returnProduct } from "../redux/slices/rentalSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  getBookedProducts,
  getProductByCode,
} from "../services/product.services";
import ProductDetails from "./ProductDetails";
import ProductMenu from "./ProductMenu";

interface Props {
  isOpen: boolean;
  close: Function;
}

const ProductReturnDialog: FC<Props> = ({ isOpen, close }) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.rental.data);
  const bookedProducts = getBookedProducts(allProducts);

  const [price, setPrice] = useState(0);
  const [selectedProductCode, setSelectedProductCode] = useState("");

  const [usedMileage, setUsedMileage] = useState<number>(0);
  const [showProceedScreen, setShowProceedScreen] = useState(false);

  const selectedProduct = getProductByCode(
    selectedProductCode ?? "",
    allProducts
  );

  const handleReturn = () => {
    if (selectedProduct) {
      dispatch(
        returnProduct({ product: selectedProduct, mileage: usedMileage })
      );
      close();
    }
  };

  const handleYes = () => {
    if (selectedProduct) {
      const minimumRentPeriod = selectedProduct.minimum_rent_period;
      setPrice(minimumRentPeriod * selectedProduct.price);
      setShowProceedScreen(true);
    }
  };

  const InputUi = (
    <Box p={2} sx={{ minWidth: 320 }}>
      <ProductMenu
        label="Select product"
        value={selectedProductCode}
        onChange={setSelectedProductCode}
        lists={bookedProducts}
      />

      <TextField
        type="number"
        placeholder="Used Mileage"
        fullWidth
        value={usedMileage}
        onChange={(e) => setUsedMileage(Number(e.currentTarget.value))}
        sx={{
          mt: 2,
        }}
        disabled={!selectedProduct}
      />

      {selectedProduct && <ProductDetails data={selectedProduct} isReturning />}

      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
        <Button variant="outlined" onClick={() => close()}>
          No
        </Button>
        <Button variant="contained" disabled={!usedMileage} onClick={handleYes}>
          Yes
        </Button>
      </Box>
    </Box>
  );

  return (
    <Dialog open={isOpen} onClose={() => close()}>
      <DialogTitle>Return a product</DialogTitle>
      {showProceedScreen ? (
        <Box p={2} sx={{ minWidth: 320 }} textAlign="center">
          <Typography variant="h6">
            <b>Total price is ${price}</b>
          </Typography>
          <Typography variant="h6">Do you want to proceed ?</Typography>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button variant="outlined" onClick={() => close()}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleReturn}>
              Confirm
            </Button>
          </Box>
        </Box>
      ) : (
        InputUi
      )}
    </Dialog>
  );
};

export default ProductReturnDialog;
