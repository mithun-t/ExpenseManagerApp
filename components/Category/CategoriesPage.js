import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import AddCategoryForm from "./AddCategoryForm";
import CategoryList from "./CategoryList";
import axios from "axios";

const CategoriesPage = () => {
  const { categories, fetchCategoriesAndExpenses } = useContext(
    CategoriesExpensesContext
  );

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://192.168.1.43:8000/api/categories/${id}/`);
      fetchCategoriesAndExpenses();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <ScrollView>
      <AddCategoryForm fetchCategories={fetchCategoriesAndExpenses} />
      <CategoryList
        categories={categories}
        handleDelete={handleDeleteCategory} // Pass the delete handler to CategoryList
      />
    </ScrollView>
  );
};

export default CategoriesPage;
