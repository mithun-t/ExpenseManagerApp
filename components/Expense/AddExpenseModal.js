import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddExpenseModal = ({ visible, onDismiss }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddExpense = () => {
    // Here you would typically dispatch an action to add the expense
    console.log("Adding expense:", { amount, description, date });
    onDismiss();
  };

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
