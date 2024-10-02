import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import AddCategoryForm from "./AddCategoryForm";
import CategoryList from "./CategoryList";

const CategoriesPage = () => {
  const { categories, deleteCategory } = useContext(CategoriesExpensesContext);

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
  };

  return (
    <ScrollView>
      <AddCategoryForm />
      <CategoryList
        categories={categories}
        handleDelete={handleDeleteCategory}
      />
    </ScrollView>
  );
};

export default CategoriesPage;
