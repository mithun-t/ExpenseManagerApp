import React, { useContext, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";

const DashboardPage = () => {
  const { expenses, categories } = useContext(CategoriesExpensesContext);

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Calculate top spending category
  const categorySpending = useMemo(() => {
    const spendingByCategory = {};

    expenses.forEach((expense) => {
      const categoryName = categories.find(
        (cat) => cat.id === expense.category
      )?.name;

      if (categoryName) {
        spendingByCategory[categoryName] =
          (spendingByCategory[categoryName] || 0) + expense.amount;
      }
    });

    const topCategory = Object.keys(spendingByCategory).reduce(
      (a, b) => (spendingByCategory[a] > spendingByCategory[b] ? a : b),
      ""
    );

    return {
      topCategory,
      amount: spendingByCategory[topCategory] || 0,
    };
  }, [expenses, categories]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Total Expenses</Title>
          <Paragraph>₹ {totalExpenses.toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Top Spending Category</Title>
          <Paragraph>
            {categorySpending.topCategory} - ₹{" "}
            {categorySpending.amount.toFixed(2)}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default DashboardPage;
