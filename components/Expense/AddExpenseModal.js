import React, { useState, useContext } from "react";
import { Modal, Portal, TextInput, Button, Menu } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from "react-native";
import axios from "axios";
import { CategoriesExpensesContext } from "../Context/CategoriesExpensesContext";

const AddExpenseModal = ({ visible, onDismiss }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const { categories, isLoadingCategories } = useContext(
    CategoriesExpensesContext
  );

  const handleAddExpense = async () => {
    if (!amount || !selectedCategory) return;

    const formattedDate = date.toISOString().split("T")[0];
    try {
      await axios.post("http://192.168.1.43:8000/api/expenses/", {
        amount,
        description,
        date: formattedDate,
        category: selectedCategory,
      });

      // Clear the inputs after adding expense
      setAmount("");
      setDescription("");
      setDate(new Date());
      setSelectedCategory("");

      // Close the modal
      onDismiss();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
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
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
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

        {/* Dropdown for Categories */}
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
          {!isLoadingCategories &&
            categories.length > 0 &&
            categories.map((category) => (
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
