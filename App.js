import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
  IconButton,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CategoriesPage from "./components/Category/CategoriesPage";
import ExpensesPage from "./components/Expense/ExpensesPage";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          initialRouteName="Expenses"
          shifting={true}
          sceneAnimationEnabled={false}
        >
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
                <MaterialCommunityIcons name="shape" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
        <IconButton
          icon={isDarkMode ? "weather-sunny" : "weather-night"}
          color={theme.colors.primary}
          size={24}
          onPress={toggleTheme}
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            backgroundColor: theme.colors.surface,
          }}
        />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
