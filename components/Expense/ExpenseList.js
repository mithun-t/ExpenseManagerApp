import React, { useState, useMemo, useContext } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  Paragraph,
  DataTable,
  Button,
  IconButton,
} from "react-native-paper";
import dayjs from "dayjs";
import MultiSelect from "react-native-multiple-select";
import ExpenseListToolbar from "./ExpenseListToolbar";
import ExpenseListHeader from "./ExpenseListHeader";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import { DatePickerModal } from "react-native-paper-dates"; // Import DatePickerModal

const ExpenseList = () => {
  const { expenses, categories } = useContext(CategoriesExpensesContext);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateVisible, setStartDateVisible] = useState(false); // Add state for start date visibility
  const [endDateVisible, setEndDateVisible] = useState(false); // Add state for end date visibility

  // Calculate the total amount of expenses
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  // Filter expenses based on selected categories
  const filteredCategoryExpenses = categoryFilter.length
    ? expenses.filter(
        (expense) =>
          categoryFilter.includes(expense.category) &&
          (!startDate ||
            dayjs(expense.date).isAfter(dayjs(startDate).startOf("day"))) &&
          (!endDate ||
            dayjs(expense.date).isBefore(dayjs(endDate).endOf("day")))
      )
    : expenses.filter(
        (expense) =>
          (!startDate ||
            dayjs(expense.date).isAfter(dayjs(startDate).startOf("day"))) &&
          (!endDate ||
            dayjs(expense.date).isBefore(dayjs(endDate).endOf("day")))
      );

  // Sort the filtered expenses
  const sortedExpenses = useMemo(() => {
    return [...filteredCategoryExpenses].sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : 1;
      }
    });
  }, [filteredCategoryExpenses, order, orderBy]);

  // Paginate sorted expenses
  const paginatedExpenses = sortedExpenses.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  // Handle sorting of expenses
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Toggle selection of expenses
  const toggleSelection = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Toggle selection of all expenses
  const toggleSelectAll = () => {
    if (selected.length === filteredCategoryExpenses.length) {
      setSelected([]);
    } else {
      setSelected(filteredCategoryExpenses.map((expense) => expense.id));
    }
  };

  // Fetch category name based on ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  return (
    <Card style={styles.card}>
      <ExpenseListToolbar selected={selected} expenses={expenses} />
      <Card.Content>
        {/* Date Range Filter */}
        <Button onPress={() => setStartDateVisible(true)}>
          Select Start Date
        </Button>
        <Button onPress={() => setEndDateVisible(true)}>Select End Date</Button>

        <DatePickerModal
          locale="en"
          mode="single"
          visible={startDateVisible}
          onDismiss={() => setStartDateVisible(false)}
          date={startDate}
          onConfirm={(params) => {
            setStartDate(params.date);
            setStartDateVisible(false);
          }}
        />
        <DatePickerModal
          locale="en"
          mode="single"
          visible={endDateVisible}
          onDismiss={() => setEndDateVisible(false)}
          date={endDate}
          onConfirm={(params) => {
            setEndDate(params.date);
            setEndDateVisible(false);
          }}
        />

        {/* Multi-select Dropdown for Category Filtering */}
        <MultiSelect
          items={categories.map((cat) => ({ id: cat.id, name: cat.name }))}
          uniqueKey="id"
          onSelectedItemsChange={setCategoryFilter}
          selectedItems={categoryFilter}
          selectText="Select Categories"
          searchInputPlaceholderText="Search Categories..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#48d22b"
          submitButtonText="Apply"
          styleDropdownMenuSubsection={styles.multiSelect}
        />
        <IconButton
          icon={
            selected.length === filteredCategoryExpenses.length
              ? "select-inverse"
              : "select"
          }
          size={15}
          onPress={toggleSelectAll}
        />
        <DataTable>
          <ExpenseListHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
          />

          {/* Display the paginated expenses */}
          {paginatedExpenses.map((item) => (
            <DataTable.Row
              key={item.id}
              onPress={() => toggleSelection(item.id)}
              style={selected.includes(item.id) ? styles.selectedRow : null}
            >
              <DataTable.Cell>
                {dayjs(item.date).format("MMM D, YYYY")}
              </DataTable.Cell>
              <DataTable.Cell>
                ₹ {parseFloat(item.amount).toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell>{getCategoryName(item.category)}</DataTable.Cell>
            </DataTable.Row>
          ))}

          {/* Pagination controls */}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(sortedExpenses.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${page + 1} of ${Math.ceil(
              sortedExpenses.length / itemsPerPage
            )}`}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>

        {/* Total amount display */}
        <Paragraph style={styles.total}>
          Total Expense: ₹ {totalAmount.toFixed(2)}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  multiSelect: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedRow: {
    backgroundColor: "#e8f0fe",
  },
  total: {
    marginTop: 16,
    fontWeight: "bold",
  },
});

export default ExpenseList;
