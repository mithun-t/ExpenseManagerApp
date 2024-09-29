import React, { useContext, useMemo } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Card, Title, Paragraph, DataTable } from "react-native-paper";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";

const DashboardPage = () => {
  const { expenses, categories } = useContext(CategoriesExpensesContext);

  const statistics = useMemo(() => {
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const averageExpense = totalExpenses / expenses.length;

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

    const mostRecentExpense = [...expenses].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0];

    return {
      totalExpenses,
      averageExpense,
      topCategory,
      topCategoryAmount: spendingByCategory[topCategory] || 0,
      mostRecentExpense,
      spendingByCategory,
    };
  }, [expenses, categories]);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Total Expenses</Title>
          <Paragraph>₹ {statistics.totalExpenses.toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Top Spending Category</Title>
          <Paragraph>
            {statistics.topCategory} - ₹{" "}
            {statistics.topCategoryAmount.toFixed(2)}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Average Expense per Transaction</Title>
          <Paragraph>₹ {statistics.averageExpense.toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Most Recent Expense</Title>
          <Paragraph>
            {statistics.mostRecentExpense ? (
              <>
                ₹ {statistics.mostRecentExpense.amount.toFixed(2)} -{" "}
                {new Date(
                  statistics.mostRecentExpense.date
                ).toLocaleDateString()}
              </>
            ) : (
              "No expenses recorded"
            )}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Expenses by Category</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Category</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
              <DataTable.Title numeric>Percentage</DataTable.Title>
            </DataTable.Header>
            {Object.entries(statistics.spendingByCategory).map(
              ([category, amount]) => (
                <DataTable.Row key={category}>
                  <DataTable.Cell>{category}</DataTable.Cell>
                  <DataTable.Cell numeric>₹ {amount.toFixed(2)}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {((amount / statistics.totalExpenses) * 100).toFixed(1)}%
                  </DataTable.Cell>
                </DataTable.Row>
              )
            )}
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
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
