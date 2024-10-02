import React, { useState, useMemo, useContext } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  Paragraph,
  DataTable,
  Menu,
  Button,
  IconButton,
} from "react-native-paper";
import dayjs from "dayjs";
import ExpenseListToolbar from "./ExpenseListToolbar";
import ExpenseListHeader from "./ExpenseListHeader";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";

const ExpenseList = () => {
  const { expenses, categories, fetchCategoriesAndExpenses } = useContext(
    CategoriesExpensesContext
  );
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [menuVisible, setMenuVisible] = useState(false);

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const filteredCategoryExpenses = category
    ? expenses.filter((expense) => expense.category === category)
    : expenses;

  const sortedExpenses = useMemo(() => {
    return [...filteredCategoryExpenses].sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : 1;
      }
    });
  }, [filteredCategoryExpenses, order, orderBy]);

  const paginatedExpenses = sortedExpenses.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const toggleSelection = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filteredCategoryExpenses.length) {
      setSelected([]); // Deselect all
    } else {
      setSelected(filteredCategoryExpenses.map((expense) => expense.id)); // Select all
    }
  };

  const selectedCategory = categories.find((c) => c.id === category);

  const handleCategorySelect = (categoryId) => {
    setCategory(categoryId);
    setMenuVisible(false);
    setSelected([]);
  };

  return (
    <Card style={styles.card}>
      <ExpenseListToolbar
        selected={selected}
        expenses={expenses}
        fetchExpenses={fetchCategoriesAndExpenses} // Pass fetchExpenses to refresh list after deletion
      />
      <Card.Content>
        <IconButton
          icon={
            selected.length === filteredCategoryExpenses.length
              ? "select-inverse"
              : "select"
          }
          size={15}
          onPress={toggleSelectAll}
        />
        {/* Category selection dropdown */}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              onPress={() => setMenuVisible(true)}
              mode="outlined"
              style={styles.categoryButton}
            >
              {selectedCategory ? selectedCategory.name : "Select Category"}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => handleCategorySelect("")}
            title="All Categories"
          />
          {categories.map((cat) => (
            <Menu.Item
              key={cat.id}
              onPress={() => handleCategorySelect(cat.id)}
              title={cat.name}
            />
          ))}
        </Menu>

        <DataTable>
          <ExpenseListHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
          />

          {paginatedExpenses.map((item) => (
            <DataTable.Row
              key={item.id}
              onPress={() => toggleSelection(item.id)}
              style={selected.includes(item.id) ? styles.selectedRow : null}
            >
              <DataTable.Cell>
                {dayjs(item.date).format("MMM D, YYYY")}
              </DataTable.Cell>
              <DataTable.Cell>₹ {item.amount}</DataTable.Cell>
              <DataTable.Cell>{item.category_name}</DataTable.Cell>
            </DataTable.Row>
          ))}

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

        <Paragraph style={styles.total}>
          Total Expense: ₹ {totalAmount}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  categoryButton: {
    marginBottom: 16,
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
