import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import axios from "axios";

const AddCategoryForm = ({ fetchCategories }) => {
  const [newCategory, setNewCategory] = useState("");

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
      <Text h4>Add Category</Text>
      <Input
        placeholder="Category Name"
        value={newCategory}
        onChangeText={setNewCategory}
      />
      <Button title="Add" onPress={handleAddCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default AddCategoryForm;
