import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CategoriesPage from "./components/Category/CategoriesPage";
import ExpensesPage from "./components/Expense/ExpensesPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import AddExpenseModal from "./components/Expense/AddExpenseModal";
import { CategoriesExpensesProvider } from "./components/Context/CategoriesExpensesContext";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
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
    <SafeAreaProvider>
      <CategoriesExpensesProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <SafeAreaView style={styles.container}>
              <Tab.Navigator
                initialRouteName="Dashboard"
                shifting={true}
                barStyle={styles.tabBar}
              >
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
                  style={styles.fab}
                  icon="plus"
                  onPress={() => setIsAddExpenseVisible(true)}
                />
                <AddExpenseModal
                  visible={isAddExpenseVisible}
                  onDismiss={() => setIsAddExpenseVisible(false)}
                />
              </Portal>
            </SafeAreaView>
          </NavigationContainer>
        </PaperProvider>
      </CategoriesExpensesProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 70,
  },
});

export default App;
