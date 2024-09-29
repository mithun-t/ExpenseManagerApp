import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import AddCategoryForm from "./AddCategoryForm";
import CategoryList from "./CategoryList";

const CategoriesPage = () => {
  const { categories, fetchCategories } = useContext(CategoriesExpensesContext);

  return (
    <ScrollView>
      <AddCategoryForm fetchCategories={fetchCategories} />
      <CategoryList categories={categories} />
    </ScrollView>
  );
};

export default CategoriesPage;
