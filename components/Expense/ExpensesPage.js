import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.43:8000/api/categories/"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.43:8000/api/expenses/"
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AddExpenseForm categories={categories} fetchExpenses={fetchExpenses} />
      <ExpenseList expenses={expenses} categories={categories} />
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
