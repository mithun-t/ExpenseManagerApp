import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
  FAB,
  Portal,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CategoriesPage from "./components/Category/CategoriesPage";
import ExpensesPage from "./components/Expense/ExpensesPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import AddExpenseModal from "./components/Expense/AddExpenseModal";
import { CategoriesExpensesProvider } from "./components/Context/CategoriesExpensesContext";

const App = () => {
  const Tab = createMaterialBottomTabNavigator();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddExpenseVisible, setIsAddExpenseVisible] = useState(false);

  const theme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      primary: "#1976D2",
      accent: "#FF4081",
    },
  };

  return (
    <CategoriesExpensesProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator initialRouteName="Dashboard" shifting={true}>
            <Tab.Screen
              name="Dashboard"
              component={DashboardPage}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="view-dashboard"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Expenses"
              component={ExpensesPage}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="currency-usd"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Categories"
              component={CategoriesPage}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="shape"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
          <Portal>
            <FAB
              style={{
                position: "absolute",
                margin: 16,
                right: 0,
                bottom: 70,
              }}
              icon="plus"
              onPress={() => setIsAddExpenseVisible(true)}
            />
            <AddExpenseModal
              visible={isAddExpenseVisible}
              onDismiss={() => setIsAddExpenseVisible(false)}
            />
          </Portal>
        </NavigationContainer>
      </PaperProvider>
    </CategoriesExpensesProvider>
  );
};

export default App;
