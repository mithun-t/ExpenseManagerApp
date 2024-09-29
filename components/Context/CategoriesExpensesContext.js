import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

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
      const [categoriesResponse, expensesResponse] = await Promise.all([
        axios.get("http://192.168.1.43:8000/api/categories/"),
        axios.get("http://192.168.1.43:8000/api/expenses/"),
      ]);

      setCategories(categoriesResponse.data);
      setExpenses(expensesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      await axios.post("http://192.168.1.43:8000/api/expenses/", expense);
      // After successfully adding an expense, refresh the expense list
      fetchCategoriesAndExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
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
      }}
    >
      {children}
    </CategoriesExpensesContext.Provider>
  );
};
