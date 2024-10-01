import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import AddCategoryForm from "./AddCategoryForm";
import CategoryList from "./CategoryList";
import axios from "axios";
import API_BASE_URL from "../../apiConfig";

const CategoriesPage = () => {
  const { categories, fetchCategoriesAndExpenses } = useContext(
    CategoriesExpensesContext
  );

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}/`);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    fetchCategoriesAndExpenses();
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
