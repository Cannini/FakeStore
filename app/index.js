// app/index.js

import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('snyder');
  const [password, setPassword] = useState('f238&@*$');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, é necessário preencher os campos de usuário e senha.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      });
      if (response.data.token) {
        router.push('/home');
      }
    } catch (error) {
      Alert.alert('Erro no Login', 'Usuário ou senha inválidos.');
      console.error('Falha na autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/newlogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.loginBox}>
        <Text style={styles.welcome}>Seja bem-vindo, realize seu login!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#bdbdbd"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#bdbdbd"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#696969ff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#f5f5f5',
    letterSpacing: 2,
    textShadowColor: '#bdbdbd',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 8,
    opacity: 0.9,
  },
  loginBox: {
    backgroundColor: 'rgba(189,189,189,0.15)',
    borderRadius: 32,
    padding: 24,
    marginHorizontal: 8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    alignItems: 'center',
  },
  welcome: {
    color: '#f5f5f5',
    fontSize: 18,
    marginBottom: 18,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
    textShadowColor: '#bdbdbd',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  input: {
    height: 50,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    borderRadius: 24,
    marginBottom: 18,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    fontSize: 16,
    color: '#f5f5f5',
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(189,189,189,0.15)',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    width: '100%',
  },
  buttonText: {
    color: '#f5f5f5',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: '#bdbdbd',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default LoginScreen;