

import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function RootLayout() {
  const router = useRouter();

  const HeaderButton = ({ onPress, title }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'rgba(189,189,189,0.15)',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#bdbdbd',
        marginHorizontal: 4,
      }}
    >
      <Text
        style={{
          color: '#f5f5f5',
          fontWeight: 'bold',
          fontSize: 16,
          letterSpacing: 1,
          textShadowColor: '#bdbdbd',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#181818', borderBottomWidth: 1, borderBottomColor: '#bdbdbd' },
        headerTitleStyle: {
          color: '#f5f5f5',
          fontWeight: 'bold',
          fontSize: 20,
          letterSpacing: 2,
          textShadowColor: '#bdbdbd',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 4,
        },
        headerTintColor: '#f5f5f5',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: 'Produtos',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: () => (
            <HeaderButton
              onPress={() => router.replace('/')}
              title="Logout"
            />
          ),
          headerRight: () => (
            <HeaderButton
              onPress={() => router.push('/groupInfo')}
              title="Info"
            />
          ),
        }}
      />
      <Stack.Screen name="product/[id]" options={{ title: 'Detalhes do Produto' }} />
      <Stack.Screen name="groupInfo" options={{ title: 'Informações do Grupo' }} />
    </Stack>
  );
}