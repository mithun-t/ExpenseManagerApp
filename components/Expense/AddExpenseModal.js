import React, { useState, useContext } from "react";
import { Modal, Portal, TextInput, Button, Menu } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from "react-native";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";

const AddExpenseModal = ({ visible, onDismiss }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const { categories, addExpense } = useContext(CategoriesExpensesContext);

  const handleAddExpense = async () => {
    if (!amount || !selectedCategory) return;

    const expenseData = {
      amount: parseFloat(amount),
      description,
      date: date.toISOString().split("T")[0],
      category: selectedCategory,
    };

    await addExpense(expenseData);

    setAmount("");
    setDescription("");
    setDate(new Date());
    setSelectedCategory("");

    onDismiss();
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.containerStyle}
      >
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          mode="outlined"
        />
        <Button
          onPress={() => setShowDatePicker(true)}
          mode="outlined"
          style={styles.input}
        >
          {date.toDateString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Button mode="outlined" onPress={openMenu} style={styles.input}>
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name
                : "Select Category"}
            </Button>
          }
        >
          {categories.map((category) => (
            <Menu.Item
              key={category.id}
              onPress={() => {
                setSelectedCategory(category.id);
                closeMenu();
              }}
              title={category.name}
            />
          ))}
        </Menu>

        <Button
          mode="contained"
          onPress={handleAddExpense}
          style={styles.button}
        >
          Add Expense
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default AddExpenseModal;
