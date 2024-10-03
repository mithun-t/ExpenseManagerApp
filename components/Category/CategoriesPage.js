import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import AddCategoryForm from "./AddCategoryForm";
import CategoryList from "./CategoryList";

const CategoriesPage = () => {
  const { categories, deleteCategory } = useContext(CategoriesExpensesContext);

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AddCategoryForm />
        <CategoryList
          categories={categories}
          handleDelete={handleDeleteCategory}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100, // Adds padding to avoid overlap with the bottom tab bar
  },
});

export default CategoriesPage;
