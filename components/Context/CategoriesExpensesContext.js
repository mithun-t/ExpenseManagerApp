import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Context
export const CategoriesExpensesContext = createContext();

// Create a provider component
export const CategoriesExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategoriesAndExpenses();
  }, []);

  const fetchCategoriesAndExpenses = async () => {
    try {
      setIsLoading(true);
      const storedCategories = await AsyncStorage.getItem("categories");
      const storedExpenses = await AsyncStorage.getItem("expenses");
      // Log the retrieved categories and expenses to debug
      console.log("Stored Categories: ", storedCategories);
      console.log("Stored Expenses: ", storedExpenses);
      if (storedCategories) setCategories(JSON.parse(storedCategories));
      if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const newExpenses = [
        ...expenses,
        { ...expense, id: Date.now().toString() },
      ];
      await AsyncStorage.setItem("expenses", JSON.stringify(newExpenses));
      setExpenses(newExpenses);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const addCategory = async (category) => {
    try {
      const newCategories = [
        ...categories,
        { ...category, id: Date.now().toString() },
      ];
      await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
      setCategories(newCategories);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const newExpenses = expenses.filter((expense) => expense.id !== id);
      await AsyncStorage.setItem("expenses", JSON.stringify(newExpenses));
      setExpenses(newExpenses);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const newCategories = categories.filter((category) => category.id !== id);
      await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
      setCategories(newCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <CategoriesExpensesContext.Provider
      value={{
        expenses,
        categories,
        isLoading,
        fetchCategoriesAndExpenses,
        addExpense,
        addCategory,
        deleteExpense,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesExpensesContext.Provider>
  );
};
