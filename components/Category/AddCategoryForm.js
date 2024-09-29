import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import axios from "axios";

const AddCategoryForm = ({ fetchCategories }) => {
  const [newCategory, setNewCategory] = useState("");
  const theme = useTheme();

  const handleAddCategory = async () => {
    try {
      await axios.post("http://192.168.1.43:8000/api/categories/", {
        name: newCategory,
      });
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
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
