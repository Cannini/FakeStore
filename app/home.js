// app/home.js

import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias: ", error);
    }
  };

  const fetchProducts = async (category) => {
    const endpoint = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : 'https://fakestoreapi.com/products';

    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const formatPrice = (price) => `R$ ${Number(price).toFixed(2).replace('.', ',')}`;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5f5f5" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/product/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, !selectedCategory ? styles.filterButtonSelected : {}]} 
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[styles.filterText, !selectedCategory ? styles.filterTextSelected : {}]}>Todos</Text>
          </TouchableOpacity>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat}
              style={[styles.filterButton, selectedCategory === cat ? styles.filterButtonSelected : {}]} 
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat ? styles.filterTextSelected : {}]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' },
  container: { flex: 1, backgroundColor: '#181818' },
  filterContainer: { paddingVertical: 10, paddingHorizontal: 8, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)' },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(189,189,189,0.15)',
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  filterButtonSelected: { backgroundColor: '#bdbdbd' },
  filterText: { color: '#f5f5f5' },
  filterTextSelected: { color: '#181818', fontWeight: 'bold' },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'rgba(189,189,189,0.07)',
  },
  infoContainer: { padding: 12 },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f5f5f5',
    textShadowColor: '#bdbdbd',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  price: {
    fontSize: 16,
    color: '#bdbdbd',
    fontWeight: 'bold',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;