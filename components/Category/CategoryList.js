import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Avatar, Icon, Text } from "@rneui/themed";

const CategoryList = ({ categories, handleDelete }) => {
  return (
    <View style={styles.container}>
      <Text h4>Category List</Text>
      {categories.map((category) => (
        <ListItem key={category.id} bottomDivider>
          <Avatar icon={{ name: "attach-money", type: "material" }} />
          <ListItem.Content>
            <ListItem.Title>{category.name}</ListItem.Title>
          </ListItem.Content>
          <Icon
            name="delete"
            type="material"
            onPress={() => handleDelete(category.id)}
          />
        </ListItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default CategoryList;
