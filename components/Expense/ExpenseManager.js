import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import ExpenseList from "./ExpenseList"; // Your ExpenseList component
import AddExpenseModal from "./AddExpenseModal";
import axios from "axios";
import { View } from "react-native";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

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

  const handleAddExpense = () => {
    setIsModalVisible(true);
  };

  const handleModalDismiss = () => {
    setIsModalVisible(false);
    fetchExpenses(); // Refresh the list after modal is dismissed
  };

  return (
    <View style={{ flex: 1 }}>
      <Button mode="contained" onPress={handleAddExpense}>
        Add Expense
      </Button>

      {/* Expense List */}
      <ExpenseList expenses={expenses} />

      {/* Add Expense Modal */}
      <AddExpenseModal
        visible={isModalVisible}
        onDismiss={handleModalDismiss} // Callback to fetch expenses after adding a new one
      />
    </View>
  );
};

export default ExpenseManager;
