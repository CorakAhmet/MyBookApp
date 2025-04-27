// React kütüphanesini içe aktarma
import React from "react";
// Gerekli React Native bileşenlerini içe aktarma
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
// Yerel depolama için AsyncStorage kütüphanesini içe aktarma
import AsyncStorage from '@react-native-async-storage/async-storage';
// Sabit stil ve boyut değerlerini içe aktarma
import { FONTS, COLORS, SIZES } from "../constants";

// Kütüphane ekranı bileşeni
const Library = ({ navigation }) => {

    // Kütüphane kitapları için durum (state) tanımlama
    const [library, setLibrary] = React.useState([]);

    // Bileşen yüklendiğinde ve her odaklandığında çalışacak etki (effect)
    React.useEffect(() => {
        // Ekran odaklandığında kütüphaneyi yüklemek için dinleyici ekleme
        const unsubscribe = navigation.addListener('focus', () => {
            loadLibrary();
        });

        // Bileşen kaldırıldığında dinleyiciyi temizleme
        return unsubscribe;
    }, [navigation]);

    // Kütüphane verilerini AsyncStorage'dan yükleme fonksiyonu
    const loadLibrary = async () => {
        try {
            // AsyncStorage'dan kütüphane verilerini alma
            let library = await AsyncStorage.getItem('library');
            // Veri varsa JSON formatından normale çevirme, yoksa boş dizi oluşturma
            library = library ? JSON.parse(library) : [];
            // Kütüphane durumunu güncelleme
            setLibrary(library);
        } catch (error) {
            console.error(error);
        }
    }

    // Kitabı kütüphaneden kaldırma fonksiyonu
    const removeFromLibrary = async (bookId) => {
        try {
            // Mevcut kütüphane verilerini alma
            let library = await AsyncStorage.getItem('library');
            // Veri varsa JSON formatından normale çevirme, yoksa boş dizi oluşturma
            library = library ? JSON.parse(library) : [];
            // Belirtilen ID'ye sahip kitabı filtreleyerek kaldırma
            library = library.filter(item => item.bookId !== bookId);
            // Güncellenmiş kütüphaneyi AsyncStorage'a kaydetme
            await AsyncStorage.setItem('library', JSON.stringify(library));
            // Kütüphane durumunu güncelleme
            setLibrary(library);
        } catch (error) {
            console.error(error);
        }
    }

    // FlatList için her bir kitap öğesini render eden fonksiyon
    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    padding: SIZES.radius,
                }}
            >
                {/* Kitap kapak görseli */}
                <Image
                    source={item.bookCover}
                    resizeMode="cover"
                    style={{
                        width: 100,
                        height: 150,
                        borderRadius: SIZES.radius
                    }}
                />

                {/* Kitap bilgileri */}
                <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                    {/* Kitap detayına gitmek için dokunulabilir alan */}
                    <TouchableOpacity onPress={() => navigation.navigate("BookDetail", { book: item })}>
                        <Text style={{ ...FONTS.h2 }}>{item.bookName}</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.darkGray }}>{item.author}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.darkGray }}>{item.pageNo} sayfa</Text>
                    </TouchableOpacity>
                    {/* Kitabı kütüphaneden kaldırmak için buton */}
                    <TouchableOpacity
                        style={{ marginTop: SIZES.base }}
                        onPress={() => removeFromLibrary(item.bookId)}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Kütüphaneden Kaldır</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // Kütüphane ekranının ana render fonksiyonu
    return (
        <View style={{ flex: 1, padding: SIZES.padding, backgroundColor: COLORS.white }}>
            {/* Ekran başlığı */}
            <Text style={{ ...FONTS.h1, marginBottom: SIZES.padding }}>Kütüphanemm</Text>
            {/* Kitap listesi */}
            <FlatList
                data={library}
                renderItem={renderItem}
                keyExtractor={item => `${item.bookId}`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Library;
