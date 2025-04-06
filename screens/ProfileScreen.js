import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar, Divider, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { sampleBooks } from '../data/books';

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Mock user data
  const user = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Kitap okumayı seven bir edebiyat tutkunu. Özellikle bilim kurgu ve fantastik türleri tercih ediyorum.',
    favoriteBooks: sampleBooks.slice(0, 3),
    readBooks: sampleBooks.slice(3, 8),
    comments: [
      { id: 1, bookTitle: 'Dune', text: 'Harika bir bilim kurgu klasiği!', date: '10.05.2023' },
      { id: 2, bookTitle: '1984', text: 'Distopik romanların en iyilerinden biri.', date: '22.04.2023' },
    ]
  };

  const renderBookItem = (book) => (
    <TouchableOpacity 
      key={book.id}
      style={styles.bookItem}
      onPress={() => navigation.navigate('BookDetail', { book })}
    >
      <Card style={styles.bookCard}>
        <Card.Cover source={{ uri: book.coverImage }} style={styles.bookCover} />
        <Card.Content>
          <Title numberOfLines={1} style={styles.bookTitle}>{book.title}</Title>
          <Paragraph numberOfLines={1}>{book.author}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image source={{ uri: user.avatar }} size={80} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <Card style={styles.bioCard}>
        <Card.Content>
          <Title>Hakkımda</Title>
          <Paragraph>{user.bio}</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'favorites' && styles.activeTab]} 
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>Favoriler</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'read' && styles.activeTab]} 
          onPress={() => setActiveTab('read')}
        >
          <Text style={[styles.tabText, activeTab === 'read' && styles.activeTabText]}>Okuduklarım</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'comments' && styles.activeTab]} 
          onPress={() => setActiveTab('comments')}
        >
          <Text style={[styles.tabText, activeTab === 'comments' && styles.activeTabText]}>Yorumlarım</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContent}>
        {activeTab === 'favorites' && (
          <View style={styles.booksContainer}>
            {user.favoriteBooks.map(book => renderBookItem(book))}
          </View>
        )}

        {activeTab === 'read' && (
          <View style={styles.booksContainer}>
            {user.readBooks.map(book => renderBookItem(book))}
          </View>
        )}

        {activeTab === 'comments' && (
          <View>
            {user.comments.map(comment => (
              <Card key={comment.id} style={styles.commentCard}>
                <Card.Content>
                  <Text style={styles.commentBookTitle}>{comment.bookTitle}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <Text style={styles.commentDate}>{comment.date}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      </View>

      <Button 
        mode="outlined" 
        style={styles.editProfileButton}
        icon="account-edit"
      >
        Profili Düzenle
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
  },
  bioCard: {
    margin: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200ee',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  tabContent: {
    margin: 10,
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookItem: {
    width: '48%',
    marginBottom: 10,
  },
  bookCard: {
    elevation: 2,
  },
  bookCover: {
    height: 180,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentCard: {
    marginBottom: 10,
  },
  commentBookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  commentText: {
    marginBottom: 5,
  },
  commentDate: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
  },
  editProfileButton: {
    margin: 20,
  },
});

export default ProfileScreen;