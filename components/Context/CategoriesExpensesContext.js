import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const CategoriesExpensesContext = createContext();

// Provider component
export const CategoriesExpensesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

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
    <CategoriesExpensesContext.Provider
      value={{ categories, expenses, fetchCategories, fetchExpenses }}
    >
      {children}
    </CategoriesExpensesContext.Provider>
  );
};
