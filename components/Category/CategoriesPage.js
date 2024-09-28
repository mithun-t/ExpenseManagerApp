import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import axios from "axios";
import AddCategoryForm from "./AddCategoryForm.js";
import CategoryList from "./CategoryList";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
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

  return (
    <ScrollView>
      <AddCategoryForm fetchCategories={fetchCategories} />
      <CategoryList categories={categories} />
    </ScrollView>
  );
};

export default CategoriesPage;
