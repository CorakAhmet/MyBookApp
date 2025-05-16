import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const LoginScreen = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    // Uygulama başladığında, kullanıcı zaten giriş yapmış mı kontrol et
    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData && JSON.parse(userData).isLoggedIn) {
                navigation.replace("Home");
            }
        } catch (error) {
            console.error("Giriş durumu kontrolünde hata:", error);
        }
    };

    const handleLogin = async () => {
        // Test kullanıcısı için özel durum
        if (username === "admin" && password === "admin") {
            await AsyncStorage.setItem('userData', JSON.stringify({
                username: "test",
                isLoggedIn: true,
                createdAt: new Date().toISOString()
            }));
            navigation.replace("Home");
            return;
        }

        // Basit doğrulama
        if (!username || !password) {
            Alert.alert("Hata", "Kullanıcı adı ve şifre gereklidir.");
            return;
        }

        try {
            // Gerçek uygulamada burada sunucu doğrulaması olacaktır
            // Bu örnek için, kullanıcı yerel olarak kaydedilmişse kontrol edelim
            const storedUsers = await AsyncStorage.getItem('users');
            
            if (storedUsers) {
                const users = JSON.parse(storedUsers);
                const user = users.find(u => u.username === username);
                
                if (user && user.password === password) {
                    // Kullanıcıyı giriş yapmış olarak işaretle
                    await AsyncStorage.setItem('userData', JSON.stringify({
                        username,
                        isLoggedIn: true
                    }));
                    
                    navigation.replace("Home");
                } else {
                    Alert.alert("Hata", "Kullanıcı adı veya şifre yanlış.");
                }
            } else {
                Alert.alert("Hata", "Kayıtlı kullanıcı bulunamadı. Lütfen önce kayıt olun.");
            }
        } catch (error) {
            console.error("Giriş sırasında hata:", error);
            Alert.alert("Hata", "Giriş yapılırken bir hata oluştu.");
        }
    };

    const handleRegister = async () => {
        // Basit doğrulama
        if (!username || !password || !confirmPassword || !email) {
            Alert.alert("Hata", "Tüm alanları doldurun.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Hata", "Şifreler eşleşmiyor.");
            return;
        }

        try {
            // Kullanıcı zaten var mı kontrol et
            const storedUsers = await AsyncStorage.getItem('users');
            let users = [];
            
            if (storedUsers) {
                users = JSON.parse(storedUsers);
                
                if (users.some(user => user.username === username)) {
                    Alert.alert("Hata", "Bu kullanıcı adı zaten alınmış.");
                    return;
                }
                
                if (users.some(user => user.email === email)) {
                    Alert.alert("Hata", "Bu e-posta adresi zaten kullanılıyor.");
                    return;
                }
            }
            
            // Yeni kullanıcı ekle
            users.push({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });
            
            await AsyncStorage.setItem('users', JSON.stringify(users));
            
            Alert.alert(
                "Başarılı", 
                "Kayıt başarıyla tamamlandı. Şimdi giriş yapabilirsiniz.",
                [{ text: "Tamam", onPress: () => setIsLogin(true) }]
            );
            
            // Kayıt alanlarını temizle
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setEmail("");
            
        } catch (error) {
            console.error("Kayıt sırasında hata:", error);
            Alert.alert("Hata", "Kayıt sırasında bir hata oluştu.");
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Form değiştiğinde alanları temizle
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={images.pirtuk}
                            resizeMode="contain"
                            style={styles.logo}
                        />
                        <Text style={styles.appTitle}>Kitap Uygulaması</Text>
                    </View>
                    
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>
                            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                        </Text>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Kullanıcı Adı"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                        
                        {!isLogin && (
                            <TextInput
                                style={styles.input}
                                placeholder="E-posta"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Şifre"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        
                        {!isLogin && (
                            <TextInput
                                style={styles.input}
                                placeholder="Şifre (Tekrar)"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        )}
                        
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={isLogin ? handleLogin : handleRegister}
                        >
                            <Text style={styles.actionButtonText}>
                                {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={toggleForm}
                        >
                            <Text style={styles.toggleButtonText}>
                                {isLogin 
                                    ? "Hesabınız yok mu? Kayıt olun." 
                                    : "Zaten hesabınız var mı? Giriş yapın."}
                            </Text>
                        </TouchableOpacity>
                        
                        {isLogin && (
                            <TouchableOpacity style={styles.forgotPasswordButton}>
                                <Text style={styles.forgotPasswordText}>
                                    Şifremi Unuttum
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: SIZES.padding * 2,
    },
    logo: {
        width: 120,
        height: 120,
    },
    appTitle: {
        ...FONTS.h1,
        color: COLORS.white,
        marginVertical: SIZES.base,
    },
    formContainer: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    formTitle: {
        ...FONTS.h2,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: SIZES.padding,
    },
    input: {
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius / 2,
        padding: SIZES.padding,
        marginBottom: SIZES.base,
        ...FONTS.body3,
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius / 2,
        padding: SIZES.padding,
        alignItems: 'center',
        marginTop: SIZES.padding,
    },
    actionButtonText: {
        ...FONTS.h3,
        color: COLORS.white,
    },
    toggleButton: {
        marginTop: SIZES.padding,
        alignItems: 'center',
    },
    toggleButtonText: {
        ...FONTS.body4,
        color: COLORS.primary,
    },
    forgotPasswordButton: {
        marginTop: SIZES.padding,
        alignItems: 'center',
    },
    forgotPasswordText: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
});

export default LoginScreen; 