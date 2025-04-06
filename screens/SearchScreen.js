import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar, Chip, Card, Title, Paragraph } from 'react-native-paper';
import { sampleBooks } from '../data/books';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = ['Roman', 'Bilim Kurgu', 'Fantastik', 'Tarih', 'Biyografi', 'Kişisel Gelişim'];

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterBooks(query, selectedGenre);
  };

  const selectGenre = (genre) => {
    const newSelectedGenre = selectedGenre === genre ? null : genre;
    setSelectedGenre(newSelectedGenre);
    filterBooks(searchQuery, newSelectedGenre);
  };

  const filterBooks = (query, genre) => {
    let results = [...sampleBooks];
    
    if (query) {
      results = results.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (genre) {
      results = results.filter(book => book.genre === genre);
    }
    
    setFilteredBooks(results);
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookItem}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.coverImage }} style={styles.bookCover} />
        <Card.Content>
          <Title numberOfLines={1} style={styles.bookTitle}>{item.title}</Title>
          <Paragraph numberOfLines={1}>{item.author}</Paragraph>
          <Paragraph style={styles.genre}>{item.genre}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Kitap veya yazar ara"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <View style={styles.genreContainer}>
        <Text style={styles.genreTitle}>Türler:</Text>
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <Chip
              style={[styles.chip, selectedGenre === item && styles.selectedChip]}
              textStyle={selectedGenre === item ? styles.selectedChipText : {}}
              onPress={() => selectGenre(item)}
            >
              {item}
            </Chip>
          )}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <FlatList
        data={filteredBooks.length > 0 ? filteredBooks : searchQuery || selectedGenre ? [] : sampleBooks}
        renderItem={renderBookItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.bookList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery || selectedGenre ? "Sonuç bulunamadı" : "Kitap aramak için yukarıdaki arama çubuğunu kullanın"}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    marginBottom: 10,
    elevation: 2,
  },
  genreContainer: {
    marginBottom: 15,
  },
  genreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#6200ee',
  },
  selectedChipText: {
    color: 'white',
  },
  bookList: {
    paddingBottom: 20,
  },
  bookItem: {
    flex: 1,
    margin: 5,
    maxWidth: '48%',
  },
  card: {
    elevation: 3,
  },
  bookCover: {
    height: 180,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  genre: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
});

export default SearchScreen;