import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text, IconButton } from "react-native-paper";
import axios from "axios";

const ExpenseListToolbar = ({ selected, expenses, fetchExpenses }) => {
  const numSelected = selected.length;
  const filteredExpenses = expenses.filter((expense) =>
    selected.includes(expense.id)
  );

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Delete handler
  const handleDelete = async () => {
    try {
      await Promise.all(
        selected.map(async (expenseId) => {
          await axios.delete(`${API_BASE_URL}/expenses/${expenseId}/`);
        })
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
    fetchExpenses(); // Re-fetch expenses after deletion
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
          <IconButton
            icon="delete"
            size={20}
            onPress={handleDelete} // Trigger the delete function
          />
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
