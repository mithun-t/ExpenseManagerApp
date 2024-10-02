import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text, IconButton } from "react-native-paper";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";

const ExpenseListToolbar = ({ selected, expenses }) => {
  const { deleteExpense } = useContext(CategoriesExpensesContext);
  const numSelected = selected.length;
  const filteredExpenses = expenses.filter((expense) =>
    selected.includes(expense.id)
  );

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleDelete = async () => {
    try {
      await Promise.all(selected.map(deleteExpense));
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };

  return (
    <Appbar.Header style={styles.toolbar}>
      <Appbar.Content
        title={numSelected > 0 ? `${numSelected} selected` : "Expense List"}
      />
      {numSelected > 0 && (
        <View style={styles.actions}>
          <IconButton icon="calculator" size={20} onPress={() => {}} />
          <Text style={styles.totalAmount}>₹ {totalAmount}</Text>
          <IconButton icon="download" size={20} onPress={() => {}} />
          <IconButton icon="delete" size={20} onPress={handleDelete} />
        </View>
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#f0f0f0",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalAmount: {
    marginRight: 16,
  },
});

export default ExpenseListToolbar;
