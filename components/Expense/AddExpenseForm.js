import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title, Menu } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const AddExpenseForm = ({ categories, fetchExpenses }) => {
  const [newExpense, setNewExpense] = useState({
    date: new Date(),
    amount: "",
    category: "",
    description: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleAddExpense = async () => {
    if (!newExpense.amount || !newExpense.category) {
      return;
    }
    const formattedDate = newExpense.date.toISOString().split("T")[0];
    await axios.post("http://127.0.0.1:8000/api/expenses/", {
      ...newExpense,
      date: formattedDate,
    });
    setNewExpense({
      date: new Date(),
      amount: "",
      category: "",
      description: "",
    });
    fetchExpenses();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNewExpense({ ...newExpense, date: selectedDate });
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Add New Expense</Title>
        <Button
          onPress={() => setShowDatePicker(true)}
          mode="outlined"
          style={styles.dateButton}
        >
          {newExpense.date.toDateString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={newExpense.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TextInput
          label="Amount"
          value={newExpense.amount}
          onChangeText={(text) =>
            setNewExpense({ ...newExpense, amount: text })
          }
          keyboardType="numeric"
          style={styles.input}
        />

        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button
              onPress={() => setVisible(true)}
              mode="outlined"
              style={styles.input}
            >
              {newExpense.category
                ? categories.find((c) => c.id === newExpense.category).name
                : "Select Category"}
            </Button>
          }
        >
          {categories.map((category) => (
            <Menu.Item
              key={category.id}
              onPress={() => {
                setNewExpense({ ...newExpense, category: category.id });
                setVisible(false);
              }}
              title={category.name}
            />
          ))}
        </Menu>

        <TextInput
          label="Description"
          value={newExpense.description}
          onChangeText={(text) =>
            setNewExpense({ ...newExpense, description: text })
          }
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleAddExpense}
          style={styles.button}
        >
          Add Expense
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  input: {
    marginBottom: 12,
  },
  dateButton: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});

export default AddExpenseForm;
