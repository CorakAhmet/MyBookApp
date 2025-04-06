import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { sampleBooks } from '../data/books';

const HomeScreen = ({ navigation }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setFeaturedBooks(sampleBooks.slice(0, 5));
    setPopularBooks(sampleBooks.slice(5, 10));
  }, []);

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
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öne Çıkan Kitaplar</Text>
        <FlatList
          data={featuredBooks}
          renderItem={renderBookItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popüler Kitaplar</Text>
        <FlatList
          data={popularBooks}
          renderItem={renderBookItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bookItem: {
    width: 150,
    marginRight: 10,
  },
  card: {
    elevation: 4,
  },
  bookCover: {
    height: 200,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;