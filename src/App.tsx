import { Container } from "@mui/material";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "./components/DataTable";
import Footer from "./components/Footer";
import ProductBookDialog from "./components/ProductBookDialog";
import ProductReturnDialog from "./components/ProductReturnDialog";
import Searchbar from "./components/Searchbar";
import { loadInitialData } from "./redux/slices/rentalSlice";
import { useAppSelector } from "./redux/store";
import { readDataFromLocalstorage } from "./services/localstorage.services";

function App() {
  const dispatch = useDispatch();
  const { data: rentalData } = useAppSelector((state) => state.rental);

  const [searchKey, setSearchKey] = useState("");
  const [showBookModal, setShowBookModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const fuse = new Fuse(rentalData, {
    keys: ["name"],
  });

  let searchedData = fuse.search(searchKey).map((d) => d.item);

  useEffect(() => {
    const storedData = readDataFromLocalstorage();
    if (storedData) {
      dispatch(loadInitialData(JSON.parse(storedData)));
    }
  }, [dispatch]);

  return (
    <Container sx={{ py: 6 }}>
      {showBookModal && (
        <ProductBookDialog
          isOpen={showBookModal}
          close={() => setShowBookModal(false)}
        />
      )}
      {showReturnModal && (
        <ProductReturnDialog
          isOpen={showReturnModal}
          close={() => setShowReturnModal(false)}
        />
      )}
      <Searchbar onChange={setSearchKey} />
      <DataTable data={searchKey.length > 0 ? searchedData : rentalData} />
      <Footer
        toggleBookModal={() => setShowBookModal(true)}
        toggleReturnModal={() => setShowReturnModal(true)}
      />
    </Container>
  );
}

export default App;
