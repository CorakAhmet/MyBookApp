import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Card, Title, Paragraph, Divider, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(book.comments || []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const addComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        user: 'Kullanıcı',
        text: comment,
        date: new Date().toLocaleDateString(),
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: book.coverImage }} style={styles.coverImage} />
        <View style={styles.bookInfo}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <View style={styles.genreContainer}>
            <Text style={styles.genre}>{book.genre}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= book.rating ? 'star' : 'star-outline'}
                size={20}
                color="#FFD700"
              />
            ))}
            <Text style={styles.ratingText}>{book.rating}/5</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? 'red' : '#333'}
            />
            <Text style={styles.favoriteText}>
              {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Özet</Title>
          <Paragraph>{book.description}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Yazar Hakkında</Title>
          <Paragraph>{book.authorBio}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Kitap Detayları</Title>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Yayınevi:</Text>
            <Text style={styles.detailValue}>{book.publisher}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Yayın Tarihi:</Text>
            <Text style={styles.detailValue}>{book.publishDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sayfa Sayısı:</Text>
            <Text style={styles.detailValue}>{book.pageCount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dil:</Text>
            <Text style={styles.detailValue}>{book.language}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ISBN:</Text>
            <Text style={styles.detailValue}>{book.isbn}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Yorumlar</Title>
          {comments.length > 0 ? (
            comments.map((item) => (
              <View key={item.id} style={styles.commentItem}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUser}>{item.user}</Text>
                  <Text style={styles.commentDate}>{item.date}</Text>
                </View>
                <Text style={styles.commentText}>{item.text}</Text>
                <Divider style={styles.divider} />
              </View>
            ))
          ) : (
            <Text style={styles.noComments}>Henüz yorum yapılmamış.</Text>
          )}
          
          <View style={styles.addCommentContainer}>
            <TextInput
              label="Yorum Yap"
              value={comment}
              onChangeText={setComment}
              style={styles.commentInput}
              multiline
            />
            <Button 
              mode="contained" 
              onPress={addComment} 
              style={styles.commentButton}
              disabled={!comment.trim()}
            >
              Gönder
            </Button>
          </View>
        </Card.Content>
      </Card>
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
    padding: 15,
    backgroundColor: 'white',
    elevation: 2,
  },
  coverImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  genreContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  genre: {
    fontSize: 14,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteText: {
    marginLeft: 5,
    color: '#333',
  },
  section: {
    margin: 10,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 100,
  },
  detailValue: {
    flex: 1,
  },
  commentItem: {
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentDate: {
    color: '#666',
    fontSize: 12,
  },
  commentText: {
    marginBottom: 5,
  },
  divider: {
    marginVertical: 10,
  },
  noComments: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  addCommentContainer: {
    marginTop: 15,
  },
  commentInput: {
    marginBottom: 10,
  },
  commentButton: {
    alignSelf: 'flex-end',
  },
});

export default BookDetailScreen;