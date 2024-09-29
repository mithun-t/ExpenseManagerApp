import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import ExpenseList from "./ExpenseList";
import { Text } from "react-native-paper";

const ExpensesPage = () => {
  const { expenses, categories, isLoading } = useContext(
    CategoriesExpensesContext
  );

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <ExpenseList expenses={expenses} categories={categories} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ExpensesPage;
