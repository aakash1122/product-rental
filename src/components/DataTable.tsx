import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { FC } from "react";
import { Product } from "../types/Product.types";

const cellHeads: string[] = [
  "I",
  "name",
  "code",
  "availability",
  "need to repair",
  "durability",
  "mileage",
];

interface Props {
  data: Product[];
}

const DataTable: FC<Props> = ({ data }) => {
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ height: 500 }}
        data-cy="tableContainer"
      >
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {cellHeads.map((cell, i) => (
                <TableCell
                  key={cell}
                  align="center"
                  sx={{ fontWeight: 600, textTransform: "capitalize" }}
                  data-cy="tableHead"
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                data-cy="tableRow"
              >
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.code}</TableCell>
                <TableCell align="center">
                  {row.availability ? "true" : "false"}
                </TableCell>
                <TableCell align="center">
                  {row.needing_repair ? "true" : "false"}
                </TableCell>
                <TableCell align="center">
                  {row.durability}/{row.max_durability}
                </TableCell>
                <TableCell align="center">{row.mileage ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
