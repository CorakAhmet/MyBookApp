import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Modal,
    ScrollView
} from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const SearchScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    
    // Filtre durumları
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [ratingRange, setRatingRange] = useState([0, 10]);
    const [pageRange, setPageRange] = useState([0, 1000]);

    // Kitap verileri (Home sayfasından alınan kitaplar)
    const allBooks = [
         // Kitap detayları
        {
            id: 1,
            bookName: "Hayvan Çiftliği",
            bookCover: images.hayvanciftligi,
            rating: "4.4",
            language: "1544",
            pageNo: 152,
            author: "George Orwell",
            genre: ["Roman", "Bilim", "Macera"],
            description: "İngiliz yazar George Orwell (1903-1950), ülkemizde daha çok Bindokuzyüzseksendört adlı kitabıyla tanınır. Hayvan Çiftliği, onun çağdaş klasikler arasına girmiş ikinci ünlü yapıtıdır. 1940'lardaki 'reel sosyalizm'in eleştirisi olan bu roman, dünya edebiyatında 'yergi' türünün başyapıtlarından biridir. Hayvan Çiftliği'nin kişileri hayvanlardır. Bir çiftlikte yaşayan hayvanlar, kendilerini sömüren insanlara başkaldırıp çiftliğin yönetimini ele geçirirler. Amaçları daha eşitlikçi bir topluluk oluşturmaktır. Aralarında en akıllı olanlar domuzlar; kısa sürede önder bir takım oluştururlar, devrimi de onlar yolundan saptırırlar. Ne yazık ki insanlardan daha baskıcı, daha acımasız bir diktatörlük kurulmuştur artık. George Orwell, bu romanında tarihsel bir gerçeği eleştirmektedir. Romandaki önder domuzun, düpedüz Stalin'i simgelediği açıkça görülecektir. Öbür kişiler bire bir belli olmasalar da, bir diktatörlük ortamındna olabilecek kişilerdir. Romanın alt başlığı Bir Peri Masalı'dır. Küçükleri eğlendirecek bir peri masalı değildir; ama roman, bir masal anlatımıyla yazılmıştır.",
            backgroundColor: "rgba(240,240,232,0.9)",
            navTintColor: "#000"
        },
        {
            id: 2,
            bookName: "Üç Cisim Prblemi",
            bookCover: images.uccisimproblemi,
            rating: "3.5",
            language: "Eng",
            pageNo: 416,
            author: "Cixin Liu",
            genre: ["Bilim", "Macera", "Roman"],
            description: "Bilim kurgu türünde bir roman olup, Çinli yazar Liu Cixin tarafından kaleme alınmıştır. Hikaye, bir bilim kadınının Çin'den günümüzdeki dünyaya geçiş yapmasını ve insanlığın, dünya dışı varlıklarla karşı karşıya gelmesini anlatır. İki farklı gezegen arasında kurulan bir iletişim köprüsü ve bu köprü üzerinden gelen mesajlarla başlayan olaylar, romanın temelini oluşturur. Roman, bilimsel kavramlarla dolu karmaşık bir kurguya sahiptir ve okuyuculara bilim kurgu macerasının yanı sıra insan doğası, teknolojinin etkileri ve evrensel sorunlar üzerine düşündürücü sorular da sunar.",
            backgroundColor: "rgba(240,240,232,0.9)",
            navTintColor: "#000"
        },
        {
            id: 3,
            bookName: "Ustalık",
            bookCover: images.ustalik,
            rating: "4.7",
            language: "Eng",
            pageNo: 416,
            author: "Robert Greene",
            genre: ["Kişisel Gelişim", "Eğitim"],
            description: "Herkesin nasıl olduğuna bakmaksızın, sahip olduğu karaktere uygun bir yaşam sürmesine izin vermelisiniz ve değiştirmeye çabalamak ya da lanetlemek yerine bu karakterinden doğasının izin verdiği biçimde yararlanmalısınız. Yaşayın ve bırakın yaşasınlar atasözünün gerçek anlamı budur... İnsanların davranışlarına öfkelenmek, yolunuza yuvarlandığı için bir taşa kızmak kadar saçmadır. Çoğu insan açısından yapabileceğimiz en akılcı davranış, değiştiremeyeceklerinizden yararlanmaya karar vermek.",
            backgroundColor: "rgba(247,239,219,0.9)",
            navTintColor: "#000"
        },
        {
            id: 4,
            bookName: "Dünya Tarihi 101-Bir Çırpıda Uygarlıklar Tarihi",
            bookCover: images.dunyatarihi,
            rating: "7.2",
            language: "Eng",
            pageNo: 248,
            author: "Tom Head",
            genre: ["Tarih", "Bilim"],
            description: "Tarih şaşırtıcı olaylar, güçlü liderler, entrikalar ve ilginç keşiflerle dolu binlerce yıllık bir maceradır. Buna rağmen tarih kitapları çoğunlukla tekdüze, sıkıcı ve eğlenceli olmaktan alabildiğine uzaktır. Dünya Tarihi 101 ise bütün bu sıkıcı detayları bir kenara bırakıyor ve sizi uygarlık tarihine doğru büyüleyici bir yolculuğa çıkarıyor.",
            backgroundColor: "rgba(119,77,143,0.9)",
            navTintColor: "#FFF"
        },
        {
            id: 5,
            bookName: "Momo",
            bookCover: images.momo,
            rating: 8.4,
            language: "Eng",
            pageNo: 304,
            author: "Michael Ende",
            genre: ["Roman", "Macera", "Drama"],
            description: "Bir gün hayaletimsi topluluk \"duman adamlar\" ortaya çıkar. İnce hesaplı planlar kurup insanların zamanını çalarlar. Onları durduracak tek kişiyse Momo'dur. Momo elinde bir çiçek, koltuğunun altında bir kaplumbağa ve gizemli Hora Usta'nın da yardımıyla koskoca duman adamlar ordusunun karşısında tek başına durur. Acaba Momo, zamanı çalan adamları tek başına alt edebilecek midir?Toplumumuz ve günümüz insanının zaman algısı ve zamanı okuması üzerine bir masal olan Momo'yla Michael Ende, Alman Gençlik Edebiyatı Ödülü'ne layık görülmüştür. Pek çok kez sinemaya uyarlanan Momo, kırktan fazla dile çevrilmiş, tüm dünyada 7 milyonun üzerinde satılmıştır.",
            backgroundColor: "rgba(240,240,232,0.9)",
            navTintColor: "#000"
        },
        {
            id: 6,
            bookName: "Ikigai",
            bookCover: images.ikigai,
            rating: 7.6,
            language: "Eng",
            pageNo: 176,
            author: "Francesc Miralles",
            genre: ["Kişisel Gelişim"],
            description: "Uluslararası çoksatan bir rehber olan Ikigai'yle her gününüz bir anlam kazansın. Japonlar herkesin bir ikigaisi olduğuna inanır, her sabah yataktan kalkmaları için bir sebepleri vardır. İlham verici ve rahatlatıcı bu kitap sizlere kendi ikigainizi keşfetmeniz için gerekli tüm bilgileri veriyor. Aceleci davranmamanızı, hayat gayenizi keşfetmenizi, ilişkilerinizi canlandırmanızı ve kendinizi tutkularınıza adamanızı sağlıyor.",
            backgroundColor: "rgba(247,239,219,0.9)",
            navTintColor: "#000"
        },
        {
            id: 7,
            bookName: "Beden Dili",
            bookCover: images.bedendili,
            rating: 8.2,
            language: "Eng",
            pageNo: 300,
            author: "Jeo Navarr0",
            genre: ["Kişisel Gelişim", "Eğitim"],
            description: "İnsanları 'okuma'nın en hızlı yöntemi bu kitapta...Karşınızdakinin bedenine bakarak aklından geçenleri okumanız mümkün. Duygu ve düşünceleri çözümlemek, insanları doğru tanımak, tuzağa düşmemek, yalanı ortaya çıkarmak için beden dilini bilmeniz yeterli. Ayrıca beden dilinizi kullanarak patronunuz, aileniz, arkadaşlarınız ve diğer insanların sizinle ilgili düşüncelerini de değiştirebilirsiniz. Gerçek hisler yüzde gizlidir. Başparmaklar, ayaklar ve gözbebekleri ruh halimizi ortaya koyar. Yanınızdakine dokunmanız ne anlama gelir? Beden dilinizle terfi edebilir misiniz? Güvenle parmak uçlarımızın ne ilgisi var? Kadınlar beden dilini kullanarak neleri gizler?",
            backgroundColor: "rgba(119,77,143,0.9)",
            navTintColor: "#FFF"
        },
    ];

    // Tüm kategorileri (türleri) toplama
    const allGenres = [...new Set(allBooks.flatMap(book => book.genre))];
    
    // Tüm yazarları toplama
    const allAuthors = [...new Set(allBooks.map(book => book.author))];

    // Arama metnine göre kitapları filtreleyen fonksiyon
    const handleSearch = (text) => {
        setSearchText(text);
        filterBooks(text, selectedGenres, selectedAuthors, ratingRange, pageRange);
    };

    // Filtrelerle birlikte kitapları filtreleyen ana fonksiyon
    const filterBooks = (text, genres, authors, ratingRange, pageRange) => {
        let filtered = allBooks;
        
        // Metin filtresi
        if (text) {
            filtered = filtered.filter((book) =>
                book.bookName.toLowerCase().includes(text.toLowerCase()) ||
                book.author.toLowerCase().includes(text.toLowerCase())
            );
        }
        
        // Tür filtresi
        if (genres.length > 0) {
            filtered = filtered.filter((book) => 
                book.genre.some(genre => genres.includes(genre))
            );
        }
        
        // Yazar filtresi
        if (authors.length > 0) {
            filtered = filtered.filter((book) => 
                authors.includes(book.author)
            );
        }
        
        // Puan aralığı filtresi
        filtered = filtered.filter((book) => {
            const rating = parseFloat(book.rating);
            return rating >= ratingRange[0] && rating <= ratingRange[1];
        });
        
        // Sayfa aralığı filtresi
        filtered = filtered.filter((book) => {
            return book.pageNo >= pageRange[0] && book.pageNo <= pageRange[1];
        });
        
        setFilteredBooks(filtered);
    };

    // Filtre değişikliklerini uygulama
    const applyFilters = () => {
        filterBooks(searchText, selectedGenres, selectedAuthors, ratingRange, pageRange);
        setShowFilters(false);
    };

    // Tür seçimi işlemi
    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    // Yazar seçimi işlemi
    const toggleAuthor = (author) => {
        if (selectedAuthors.includes(author)) {
            setSelectedAuthors(selectedAuthors.filter(a => a !== author));
        } else {
            setSelectedAuthors([...selectedAuthors, author]);
        }
    };

    // Filtreleri temizleme
    const clearFilters = () => {
        setSelectedGenres([]);
        setSelectedAuthors([]);
        setRatingRange([0, 10]);
        setPageRange([0, 1000]);
    };

    // Her bir kitabı render eden fonksiyon
    const renderBookItem = ({ item }) => (
        <TouchableOpacity
            style={styles.bookContainer}
            onPress={() => navigation.navigate("BookDetail", { book: item })}
        >
            <Image
                source={item.bookCover}
                resizeMode="cover"
                style={styles.bookCover}
            />
            <View style={styles.bookInfo}>
                <Text style={styles.bookName}>{item.bookName}</Text>
                <Text style={styles.bookAuthor}>Yazar : {item.author}</Text>
                <Text style={styles.bookRating}>Puan: {item.rating}</Text>
                <Text style={styles.bookPages}>Sayfa: {item.pageNo}</Text>
                <View style={styles.genreContainer}>
                    {item.genre.map((genre, index) => (
                        <Text key={index} style={styles.genreTag}>{genre}</Text>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );

    // Filtre modalı
    const renderFilterModal = () => (
        <Modal
            visible={showFilters}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowFilters(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filtreleme Seçenekleri</Text>
                    
                    <ScrollView style={styles.modalScroll}>
                        {/* Kategori/Tür filtreleme */}
                        <Text style={styles.filterSectionTitle}>Türler</Text>
                        <View style={styles.filterOptions}>
                            {allGenres.map((genre, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.filterOption,
                                        selectedGenres.includes(genre) && styles.selectedOption
                                    ]}
                                    onPress={() => toggleGenre(genre)}
                                >
                                    <Text 
                                        style={[
                                            styles.filterOptionText,
                                            selectedGenres.includes(genre) && styles.selectedOptionText
                                        ]}
                                    >
                                        {genre}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        
                        {/* Yazara göre filtreleme */}
                        <Text style={styles.filterSectionTitle}>Yazarlar</Text>
                        <View style={styles.filterOptions}>
                            {allAuthors.map((author, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.filterOption,
                                        selectedAuthors.includes(author) && styles.selectedOption
                                    ]}
                                    onPress={() => toggleAuthor(author)}
                                >
                                    <Text 
                                        style={[
                                            styles.filterOptionText,
                                            selectedAuthors.includes(author) && styles.selectedOptionText
                                        ]}
                                    >
                                        {author}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        
                        {/* Puan aralığı */}
                        <Text style={styles.filterSectionTitle}>
                            Puan Aralığı: {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
                        </Text>
                        <View style={styles.sliderContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={10}
                                step={0.1}
                                value={ratingRange[0]}
                                onValueChange={(value) => setRatingRange([value, ratingRange[1]])}
                                minimumTrackTintColor={COLORS.primary}
                                maximumTrackTintColor={COLORS.lightGray}
                            />
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={10}
                                step={0.1}
                                value={ratingRange[1]}
                                onValueChange={(value) => setRatingRange([ratingRange[0], value])}
                                minimumTrackTintColor={COLORS.primary}
                                maximumTrackTintColor={COLORS.lightGray}
                            />
                        </View>
                        
                        {/* Sayfa sayısı aralığı */}
                        <Text style={styles.filterSectionTitle}>
                            Sayfa Aralığı: {pageRange[0]} - {pageRange[1]}
                        </Text>
                        <View style={styles.sliderContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1000}
                                step={10}
                                value={pageRange[0]}
                                onValueChange={(value) => setPageRange([value, pageRange[1]])}
                                minimumTrackTintColor={COLORS.primary}
                                maximumTrackTintColor={COLORS.lightGray}
                            />
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1000}
                                step={10}
                                value={pageRange[1]}
                                onValueChange={(value) => setPageRange([pageRange[0], value])}
                                minimumTrackTintColor={COLORS.primary}
                                maximumTrackTintColor={COLORS.lightGray}
                            />
                        </View>
                    </ScrollView>
                    
                    {/* Buton bölümü */}
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.clearButton]}
                            onPress={clearFilters}
                        >
                            <Text style={styles.modalButtonText}>Temizle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => setShowFilters(false)}
                        >
                            <Text style={styles.modalButtonText}>İptal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.applyButton]}
                            onPress={applyFilters}
                        >
                            <Text style={styles.modalButtonText}>Uygula</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Hangi Kitabı Arıyorsunuz?"
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                    {searchText !== "" && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => handleSearch("")}
                        >
                            <Text style={styles.clearButtonText}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowFilters(true)}
                >
                    <Text style={styles.filterButtonText}>Filtrele</Text>
                </TouchableOpacity>
            </View>
            
            {/* Aktif filtreler */}
            {(selectedGenres.length > 0 || selectedAuthors.length > 0 || 
              ratingRange[0] > 0 || ratingRange[1] < 10 || 
              pageRange[0] > 0 || pageRange[1] < 1000) && (
                <View style={styles.activeFiltersContainer}>
                    <Text style={styles.activeFiltersTitle}>Aktif Filtreler:</Text>
                    <View style={styles.activeFilterTags}>
                        {selectedGenres.map((genre, index) => (
                            <TouchableOpacity 
                                key={`genre-${index}`}
                                style={styles.activeFilterTag}
                                onPress={() => {
                                    setSelectedGenres(selectedGenres.filter(g => g !== genre));
                                    filterBooks(searchText, selectedGenres.filter(g => g !== genre), selectedAuthors, ratingRange, pageRange);
                                }}
                            >
                                <Text style={styles.activeFilterText}>{genre} ✕</Text>
                            </TouchableOpacity>
                        ))}
                        {selectedAuthors.map((author, index) => (
                            <TouchableOpacity 
                                key={`author-${index}`}
                                style={styles.activeFilterTag}
                                onPress={() => {
                                    setSelectedAuthors(selectedAuthors.filter(a => a !== author));
                                    filterBooks(searchText, selectedGenres, selectedAuthors.filter(a => a !== author), ratingRange, pageRange);
                                }}
                            >
                                <Text style={styles.activeFilterText}>{author} ✕</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            
            <FlatList
                data={filteredBooks}
                renderItem={renderBookItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.bookList}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {searchText ? "Arama kriterlerine uygun kitap bulunamadı." : "Aramak için bir metin girin veya filtre seçin."}
                        </Text>
                    </View>
                }
            />
            
            {renderFilterModal()}
        </SafeAreaView>
    );
};

// Stil tanımlamaları
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    searchContainer: {
        margin: SIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.gray,
        borderWidth: 3,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        height: 50,
    },
    searchInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: SIZES.padding,
    },
    clearButton: {
        paddingHorizontal: 10,
    },
    clearButtonText: {
        fontSize: 16,
        color: COLORS.gray,
    },
    filterButton: {
        marginLeft: 10,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.radius,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    filterButtonText: {
        color: COLORS.white,
        ...FONTS.body4,
    },
    activeFiltersContainer: {
        marginHorizontal: SIZES.padding,
        marginBottom: SIZES.base,
    },
    activeFiltersTitle: {
        ...FONTS.body4,
        color: COLORS.white,
        marginBottom: 5,
    },
    activeFilterTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    activeFilterTag: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 2,
    },
    activeFilterText: {
        ...FONTS.body4,
        color: COLORS.primary,
    },
    bookList: {
        padding: SIZES.padding,
    },
    bookContainer: {
        flexDirection: 'row',
        marginBottom: SIZES.padding,
        borderColor: COLORS.gray,
        borderWidth: 3,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.Azure,
    },
    bookCover: {
        width: 100,
        height: 150,
        borderTopLeftRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
    },
    bookInfo: {
        flex: 1,
        padding: SIZES.padding,
    },
    bookName: {
        ...FONTS.h3,
        color: COLORS.black,
    },
    bookAuthor: {
        ...FONTS.body4,
        color: COLORS.black,
        marginTop: SIZES.base,
    },
    bookRating: {
        ...FONTS.body4,
        color: COLORS.black,
        marginTop: SIZES.base,
    },
    bookPages: {
        ...FONTS.body4,
        color: COLORS.black,
        marginTop: SIZES.base,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: SIZES.base,
    },
    genreTag: {
        ...FONTS.body5,
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: 5,
        marginBottom: 5,
    },
    emptyContainer: {
        padding: SIZES.padding * 2,
        alignItems: 'center',
    },
    emptyText: {
        ...FONTS.body3,
        color: COLORS.white,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
    },
    modalTitle: {
        ...FONTS.h2,
        color: COLORS.black,
        marginBottom: SIZES.padding,
        textAlign: 'center',
    },
    modalScroll: {
        maxHeight: '70%',
    },
    filterSectionTitle: {
        ...FONTS.h3,
        color: COLORS.black,
        marginTop: SIZES.padding,
        marginBottom: SIZES.base,
    },
    filterOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    filterOption: {
        backgroundColor: COLORS.lightGray2,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        margin: 5,
    },
    selectedOption: {
        backgroundColor: COLORS.primary,
    },
    filterOptionText: {
        ...FONTS.body4,
        color: COLORS.black,
    },
    selectedOptionText: {
        color: COLORS.white,
    },
    sliderContainer: {
        marginVertical: SIZES.base,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    clearButton: {
        backgroundColor: COLORS.lightGray,
    },
    cancelButton: {
        backgroundColor: COLORS.lightGray,
    },
    applyButton: {
        backgroundColor: COLORS.primary,
    },
    modalButtonText: {
        ...FONTS.body3,
        color: COLORS.white,
    }
});

export default SearchScreen;
