import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { BaseApi } from "../BaseApi";
import { formatDistanceToNow } from "date-fns";

const headCells = [
  { id: "leadid", numeric: false, disablePadding: true, label: "Lead ID" },
  { id: "customer", numeric: false, disablePadding: false, label: "Customer" },
  { id: "company", numeric: false, disablePadding: false, label: "Company" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  { id: "value", numeric: true, disablePadding: false, label: "Value (₹)" },
  { id: "tags", numeric: false, disablePadding: false, label: "Tags" },
  { id: "source", numeric: false, disablePadding: false, label: "Source" },
  { id: "assigned", numeric: false, disablePadding: false, label: "Assigned" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "created" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all leads" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, HandleDelete } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Leads
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={HandleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function LeadTable({ setData }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("leadid");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  console.log("select", selected);
  const handleExport = () => {
    axios
      .post(`${BaseApi}/leads/export`, selected)
      .then((response) => {
        console.log("response", response);
        setData(response.data)
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  React.useEffect(handleExport,[selected])
  const handleGetallData = () => {
    axios
      .get(`${BaseApi}/leads/get`)
      .then((res) => {
        console.log("✅ response:", res.data);
        setRows(res.data.get || []); // `get` matches your backend's key
      })
      .catch((err) => {
        console.error("❌ API error:", err);
      });
  };
  const HandleDelete = async () => {
    try {
      if (selected.length === 0) return;

      const confirmDelete = window.confirm(
        `Are you sure to delete ${selected.length} leads?`
      );
      if (!confirmDelete) return;
      console.log("delete", selected);
      for (const id of selected) {
        await axios.delete(`${BaseApi}/leads/delete/${id}`);
      }

      // Refresh data after deletion
      handleGetallData();
      setSelected([]);
    } catch (err) {
      console.error("❌ Failed to delete:", err);
      alert("Error deleting one or more leads");
    }
  };

  React.useEffect(() => {
    handleGetallData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log("deleted");
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => setDense(event.target.checked);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    return [...rows]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, rows]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          HandleDelete={HandleDelete}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.leadid}
                    </TableCell>
                    <TableCell align="left">{row.customer}</TableCell>
                    <TableCell align="left">{row.company}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                    <TableCell align="center">
                      <p
                        style={{
                          padding: 1,
                          border: `2px solid ${
                            row.tags === "Important"
                              ? " #e99e9eff"
                              : "#f6c8a7ff"
                          }`,
                          borderRadius: "5px",
                          backgroundColor: `${
                            row.tags === "Important"
                              ? " #efbdbdff"
                              : "#f4d1b7ba"
                          }`,
                          color: `${
                            row.tags === "Important"
                              ? " #ee1313ff"
                              : "#ee7016ff"
                          }`,
                        }}
                      >
                        {row.tags}
                      </p>
                    </TableCell>

                    <TableCell align="center">{row.source}</TableCell>
                    <TableCell align="center">
                      <img
                        src={`http://localhost:5000/images/${row.assigned}`}
                        alt={row.assigned}
                        width={30}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <p
                        style={{
                          padding: 1,
                          border: `2px solid ${
                            row.status === "Customer"
                              ? " #b3ed96ff"
                              : "#f6c8a7ff"
                          }`,
                          borderRadius: "5px",
                          backgroundColor: `${
                            row.status === "Customer"
                              ? " #e7efd9b4"
                              : "#f4d1b7ba"
                          }`,
                          color: `${
                            row.status === "Customer"
                              ? " #05f805ff"
                              : "#ee7016ff"
                          }`,
                        }}
                      >
                        {row.status}
                      </p>
                    </TableCell>
                    <TableCell align="right">
                      {formatDistanceToNow(new Date(row.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
