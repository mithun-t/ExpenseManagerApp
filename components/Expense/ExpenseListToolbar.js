import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text, IconButton } from "react-native-paper";

const ExpenseListToolbar = ({ selected, expenses }) => {
  const numSelected = selected.length;
  const filteredExpenses = expenses.filter((expense) =>
    selected.includes(expense.id)
  );

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <Appbar.Header style={styles.toolbar}>
      <Appbar.Content
        title={numSelected > 0 ? `${numSelected} selected` : "Expense List"}
      />
      {numSelected > 0 && (
        <View style={styles.actions}>
          <IconButton icon="calculator" size={20} onPress={() => {}} />
          <Text style={styles.totalAmount}>₹ {totalAmount}</Text>
          <IconButton icon="delete" size={20} onPress={() => {}} />
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
