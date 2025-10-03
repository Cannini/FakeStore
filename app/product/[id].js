import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do produto:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return '';
    return `R$ ${Number(price).toFixed(2).replace('.', ',')}`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5f5f5" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  container: {
    flex: 1,
    backgroundColor: '#181818', 
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'rgba(189,189,189,0.07)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 8,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.08)', 
    margin: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f5f5f5',
    textShadowColor: '#bdbdbd',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  category: {
    fontSize: 16,
    color: '#bdbdbd',
    marginBottom: 16,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#145c2c', 
    marginBottom: 16,
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#f5f5f5',
  },
  notFound: {
    color: '#f5f5f5',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 18,
  },
});

export default ProductDetailScreen;