import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { sampleBooks } from './data/books';

const TestScreen = () => {
  // İlk kitabı test için kullanacağız
  const testBook = sampleBooks[0];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Kitap Verisi Test Ekranı</Text>
      
      <View style={styles.bookContainer}>
        <Image 
          source={{ uri: testBook.coverImage }} 
          style={styles.coverImage}
          resizeMode="contain"
        />
        
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{testBook.title}</Text>
          <Text style={styles.author}>Yazar: {testBook.author}</Text>
          <Text style={styles.genre}>Tür: {testBook.genre}</Text>
          <Text style={styles.rating}>Puan: {testBook.rating}/5</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kitap Açıklaması</Text>
        <Text style={styles.description}>{testBook.description}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yazar Hakkında</Text>
        <Text style={styles.description}>{testBook.authorBio}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kitap Detayları</Text>
        <Text style={styles.detailItem}>Yayınevi: {testBook.publisher}</Text>
        <Text style={styles.detailItem}>Yayın Tarihi: {testBook.publishDate}</Text>
        <Text style={styles.detailItem}>Sayfa Sayısı: {testBook.pageCount}</Text>
        <Text style={styles.detailItem}>Dil: {testBook.language}</Text>
        <Text style={styles.detailItem}>ISBN: {testBook.isbn}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yorumlar</Text>
        {testBook.comments.map((comment, index) => (
          <View key={index} style={styles.commentItem}>
            <Text style={styles.commentUser}>{comment.user}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
            <Text style={styles.commentDate}>{comment.date}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.footer}>
        Toplam Kitap Sayısı: {sampleBooks.length}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  author: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  genre: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  detailItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
  },
  commentItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentUser: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  commentText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  footer: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#666',
  },
});

export default TestScreen;