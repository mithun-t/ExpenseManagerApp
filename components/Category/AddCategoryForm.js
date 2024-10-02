import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";

const AddCategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");
  const { addCategory } = useContext(CategoriesExpensesContext);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      await addCategory({ name: newCategory.trim() });
      setNewCategory("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Category</Text>
      <TextInput
        label="Category Name"
        value={newCategory}
        onChangeText={setNewCategory}
        mode="outlined"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleAddCategory}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Add
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default AddCategoryForm;
