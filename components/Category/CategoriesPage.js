import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import AddCategoryForm from "./AddCategoryForm";
import CategoryList from "./CategoryList";

const CategoriesPage = () => {
  const { categories, fetchCategoriesAndExpenses } = useContext(
    CategoriesExpensesContext
  );

  return (
    <ScrollView>
      <AddCategoryForm fetchCategories={fetchCategoriesAndExpenses} />
      <CategoryList categories={categories} />
    </ScrollView>
  );
};

export default CategoriesPage;
