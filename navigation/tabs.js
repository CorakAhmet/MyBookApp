// Tab navigasyon bileşeni
import React from "react";
import {
    Image
} from 'react-native';
// Bottom Tab Navigator için gerekli bileşen
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
// Sabit değerler ve ikonlar
import { icons, COLORS } from "../constants";
// Ekran bileşenleri
import SearchScreen from "../screens/SearchScreen";
import BookmarksScreen from "../screens/BookmarksScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Library from "../screens/Library";


// Tab Navigator oluşturma
const Tab = createBottomTabNavigator();

// Tab Navigator için stil seçenekleri
const tabOptions = {
    showLabel: false,
    style: {
        height: "10%",
        backgroundColor: COLORS.black
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Başlığı gizle
                tabBarShowLabel: false, // Tab etiketlerini gizle
                tabBarStyle: {
                    height: "10%",
                    backgroundColor: COLORS.Azure // Tab bar arka plan rengi
                },

                // Her tab için ikon ayarları
                tabBarIcon: ({ focused }) => {
                    // Odaklanılan tab için renk ayarı
                    const tintColor = focused ? COLORS.primary: COLORS.gray;

                    // Her route için uygun ikonu döndür
                    switch (route.name) {
                        case "Home":
                            return (
                                <Image
                                    source={icons.dashboard_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Search":
                            return (
                                <Image
                                    source={icons.search_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Kaydedilenler":
                            return (
                                <Image
                                    source={icons.bookmark_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Profil":
                            return (
                                <Image
                                    source={icons.menu_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >
            {/* Ana sayfa tab'ı */}
            <Tab.Screen
                name="Home"
                component={Home}
            />
            {/* Arama tab'ı */}
            <Tab.Screen
                name="Search"
                component={SearchScreen}
            />
            {/* Kaydedilenler tab'ı */}
            <Tab.Screen
                name="Kaydedilenler"
                component={Library}
            />
            {/* Profil tab'ı */}
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    )
}

export default Tabs;