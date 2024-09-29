import React from "react";
import { View, StyleSheet } from "react-native";
import { List, IconButton, useTheme } from "react-native-paper";

const CategoryList = ({ categories, handleDelete }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <List.Item
          key={category.id}
          title={category.name}
          left={(props) => <List.Icon {...props} icon="folder" />}
          right={(props) => (
            <IconButton
              {...props}
              icon="delete"
              onPress={() => handleDelete(category.id)}
            />
          )}
        />
      ))}
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
});

export default CategoryList;
