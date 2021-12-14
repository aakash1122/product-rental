import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { differenceInCalendarDays } from "date-fns";
import { isNil } from "ramda";
import React, { FC, useState } from "react";
import { bookProduct } from "../redux/slices/rentalSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  getAvailabeProducts,
  getProductByCode,
} from "../services/product.services";
import ProductMenu from "./ProductMenu";

interface Props {
  isOpen: boolean;
  close: Function;
}

const RentDialog: FC<Props> = ({ isOpen, close }) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.rental.data);

  const [currentScreen, setCurrentScreen] = useState<
    "formScreen" | "confirmScreen"
  >("formScreen");
  const [error, setError] = useState("");
  const [selectedProductCode, setSelectedProductCode] = useState("");
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const availableProducts = getAvailabeProducts(allProducts);
  const selectedProduct = getProductByCode(
    selectedProductCode ?? "",
    allProducts
  );
  const mimimumRentalPeriod = selectedProduct?.minimum_rent_period ?? 0;

  const dateDifference = differenceInCalendarDays(toDate, fromDate);
  const isValidPeriod = dateDifference >= mimimumRentalPeriod;

  const handleSubmit = () => {
    if (isValidPeriod && selectedProduct) {
      setEstimatedPrice(dateDifference * selectedProduct.price);
      setCurrentScreen("confirmScreen");
    } else {
      setError(`minimum rental period is ${mimimumRentalPeriod}`);
    }
  };

  const handleProceed = () => {
    dispatch(bookProduct(selectedProduct?.code ?? ""));
    close();
  };

  const InputUi = (
    <>
      <Box sx={{ p: 2, minWidth: 320 }}>
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        <ProductMenu
          label="Select a Product"
          value={selectedProductCode}
          onChange={setSelectedProductCode}
          lists={availableProducts}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box my={2} display="flex" gap={3}>
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(newDate) => {
                if (isNil(newDate)) return;
                setError("");
                setFromDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={!selectedProduct}
              minDate={new Date()}
              data-cy="fromDateSelector"
            />
            <DatePicker
              label="To"
              value={toDate}
              onChange={(newDate) => {
                if (isNil(newDate)) return;
                setError("");
                setToDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={!selectedProduct}
              onError={() => setToDate(new Date())}
            />
          </Box>
        </LocalizationProvider>
      </Box>

      <Box display="flex" justifyContent="end" gap={2} py={2}>
        <Button variant="text" color="secondary" onClick={() => close()}>
          No
        </Button>
        <Button variant="text" onClick={handleSubmit} data-cy="yesBtn">
          Yes
        </Button>
      </Box>
    </>
  );

  return (
    <Dialog
      onClose={() => close()}
      open={isOpen}
      sx={{ zIndex: 999 }}
      data-cy="bookModal"
    >
      <DialogTitle>Book a product</DialogTitle>

      {currentScreen === "formScreen" && InputUi}
      {currentScreen === "confirmScreen" && (
        <Box sx={{ p: 2, minWidth: 320 }}>
          <Box textAlign="center" pb={2}>
            {selectedProduct && (
              <Typography variant="h6">
                Your estimated price is
                <b>${estimatedPrice}</b>
              </Typography>
            )}
            <Typography mt={1}>Do you want to proceed</Typography>
          </Box>
          <Box display="flex" justifyContent="end" gap={2} py={2}>
            <Button variant="text" color="secondary" onClick={() => close()}>
              No
            </Button>
            <Button
              variant="text"
              onClick={handleProceed}
              data-cy="finalYesBtn"
            >
              Yes
            </Button>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default RentDialog;
