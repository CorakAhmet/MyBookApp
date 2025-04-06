import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Kitap Tanıtımı' }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Kitap Detayı' }} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Kitap Ara' }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Kitap Detayı' }} />
    </Stack.Navigator>
  );
}

// ProfileScreen için de bir Stack Navigator oluşturuyoruz
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SearchTab') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'ProfileTab') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#6200ee',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Ana Sayfa' }} />
        <Tab.Screen name="SearchTab" component={SearchStack} options={{ title: 'Ara' }} />
        <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profil' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}