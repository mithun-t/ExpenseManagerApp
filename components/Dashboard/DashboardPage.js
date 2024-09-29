import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const DashboardPage = () => {
  // You would typically fetch this data from your state management solution or API
  const totalExpenses = 1234.56;
  const topCategory = "Food";

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
          <Paragraph>{topCategory}</Paragraph>
        </Card.Content>
      </Card>
      {/* Add more cards or components for additional dashboard info */}
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
