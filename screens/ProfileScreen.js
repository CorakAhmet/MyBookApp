import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [showAbout, setShowAbout] = useState(false);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                setUserData(JSON.parse(userData));
            } else {
                // Kullanıcı giriş yapmamışsa giriş ekranına yönlendir
                navigation.replace('Login');
            }
        } catch (error) {
            console.error("Kullanıcı verisi yüklenirken hata:", error);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            "Çıkış Yap",
            "Çıkış yapmak istediğinizden emin misiniz?",
            [
                {
                    text: "İptal",
                    style: "cancel"
                },
                {
                    text: "Çıkış Yap",
                    onPress: async () => {
                        try {
                            // Kullanıcı oturum bilgisini güncelle
                            const userData = await AsyncStorage.getItem('userData');
                            if (userData) {
                                const parsedData = JSON.parse(userData);
                                parsedData.isLoggedIn = false;
                                await AsyncStorage.setItem('userData', JSON.stringify(parsedData));
                            }
                            
                            // Login ekranına yönlendir
                            navigation.replace('Login');
                        } catch (error) {
                            console.error("Çıkış yapılırken hata:", error);
                            Alert.alert("Hata", "Çıkış yapılırken bir hata oluştu.");
                        }
                    }
                }
            ]
        );
    };

    if (!userData) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
        );
    }

    // About bölümünü renderla
    const renderAboutSection = () => {
        if (!showAbout) return null;
        
        return (
            <View style={styles.aboutContainer}>
                <Text style={styles.sectionTitle}>Uygulama Hakkında</Text>
                <View style={styles.aboutContent}>
                    <Image
                        source={require('../assets/images/booklogo.png')}
                        style={styles.aboutLogo}
                    />
                    <Text style={styles.aboutTitle}>Kitap Uygulaması</Text>
                    <Text style={styles.aboutSubtitle}>Sizin İçin Okuma Dünyasını Keşfediyoruz</Text>
                    <Text style={styles.aboutDescription}>
                        Kitap Uygulamasına hoş geldiniz! Burada, okuma tutkunları için özenle seçilmiş kitap bulabilir ve keşfedebilirsiniz.
                    </Text>
                    <Text style={styles.aboutDescription}>
                        Biz, size en sevdiğiniz yazarların en yeni eserlerini ve klasiklerini sunmaya adanmak için buradayız. Kütüphanemizdeki her kitap, size unutulmaz bir okuma deneyimi yaşatmak için titizlikle seçilmiştir.
                    </Text>
                    <Text style={styles.aboutDescription}>
                        Okuma yolculuğunuz boyunca size eşlik etmek için buradayız. Sizin için derinlikli incelemeler hazırlıyoruz, en son çıkan kitapları sizin için takip ediyoruz ve okuma listeleri oluşturuyoruz.
                    </Text>
                    <Text style={styles.aboutDescription}>
                        Kitaplarla dolu dünyamıza adım atın ve sizi bekleyen keşiflerle dolu bir yolculuğa çıkın. Okuma tutkunuysanız, doğru yerdesiniz!
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profil Başlığı */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Profil</Text>
                </View>
                
                {/* Profil Bilgileri */}
                <View style={styles.profileContainer}>
                    <Image
                        source={images.profil}
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.username}>{userData.username}</Text>
                    <Text style={styles.memberSince}>Üyelik Tarihi: {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Bilinmiyor"}</Text>
                </View>
                
                {/* Hesap Ayarları */}
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
                    
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Profil Bilgilerini Düzenle</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Şifre Değiştir</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Bildirim Ayarları</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => setShowAbout(!showAbout)}
                    >
                        <Text style={styles.settingText}>
                            {showAbout ? "Uygulama Hakkında Gizle" : "Uygulama Hakkında Göster"}
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {/* About Bölümü */}
                {renderAboutSection()}
                
                {/* Çıkış Yap Butonu */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollContent: {
        padding: SIZES.padding,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    loadingText: {
        ...FONTS.h3,
        color: COLORS.primary,
    },
    headerContainer: {
        marginBottom: SIZES.padding,
    },
    headerTitle: {
        ...FONTS.h1,
        color: COLORS.black,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: SIZES.padding,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: SIZES.padding,
        borderWidth: 3,
        borderColor: COLORS.primary,
    },
    username: {
        ...FONTS.h2,
        color: COLORS.black,
    },
    memberSince: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginTop: SIZES.base,
    },
    settingsContainer: {
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginVertical: SIZES.padding,
    },
    sectionTitle: {
        ...FONTS.h3,
        color: COLORS.black,
        marginBottom: SIZES.base,
    },
    settingItem: {
        paddingVertical: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray3,
    },
    settingText: {
        ...FONTS.body3,
        color: COLORS.black,
    },
    aboutContainer: {
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginVertical: SIZES.padding,
    },
    aboutContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    aboutLogo: {
        width: 80,
        height: 80,
        marginBottom: SIZES.padding,
    },
    aboutTitle: {
        ...FONTS.h2,
        color: COLORS.black,
        marginBottom: SIZES.base,
        textAlign: 'center',
    },
    aboutSubtitle: {
        ...FONTS.body3,
        color: COLORS.gray,
        marginBottom: SIZES.padding,
        textAlign: 'center',
    },
    aboutDescription: {
        ...FONTS.body4,
        color: COLORS.black,
        marginBottom: SIZES.base,
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        alignItems: 'center',
        marginVertical: SIZES.padding,
    },
    logoutButtonText: {
        ...FONTS.h3,
        color: COLORS.white,
    },
});

export default ProfileScreen; 