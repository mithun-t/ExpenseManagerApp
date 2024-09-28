import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const headCells = [
  { id: "date", label: "Date" },
  { id: "amount", label: "Amount", numeric: true },
  { id: "category_name", label: "Category" },
];

const ExpenseListHeader = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <View style={styles.header}>
      {headCells.map((headCell) => (
        <TouchableOpacity
          key={headCell.id}
          onPress={createSortHandler(headCell.id)}
          style={styles.headerCell}
        >
          <Text style={styles.headerText}>{headCell.label}</Text>
          {orderBy === headCell.id && (
            <Text style={styles.sortIndicator}>
              {order === "desc" ? " ▼" : " ▲"}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  sortIndicator: {
    marginLeft: 5,
  },
});

export default ExpenseListHeader;
