import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";
import ExpenseList from "./ExpenseList";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ExpensesPage = () => {
  const { isLoading } = useContext(CategoriesExpensesContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isLoading ? <Text>Loading...</Text> : <ExpenseList />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
});

export default ExpensesPage;
