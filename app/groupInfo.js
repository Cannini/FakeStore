import { ScrollView, StyleSheet, Text, View } from 'react-native';

const groupMembers = [
  {
    name: 'Gabriel Cannini',
    ra: '1135604',
  },
  {
    name: 'Joaquim Amarante',
    ra: '1136252',
  },
  {
    name: 'Marcel Assunção',
    ra: '1136750',
  },
  {
    name: 'Milena Alves',
    ra: '1136912'
  }
];

const GroupInfoScreen = () => {  //Escrever ali em baixo onde deixei de qualuqer jeito o titulo da pagina info
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Desenvolvedores</Text>
        <Text style={styles.headerSubtitle}>
          Fake store consumindo a API fakestoreapi.
        </Text>
      </View>
      
      {groupMembers.map((member, index) => (
        <View key={index} style={styles.memberCard}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberRa}>RA: {member.ra}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818', 
  },
  headerContainer: {
    backgroundColor: 'rgba(189,189,189,0.10)', 
    padding: 24,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
    borderRadius: 16,
    marginHorizontal: 12,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#f5f5f5',
    letterSpacing: 2,
    textShadowColor: '#bdbdbd',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#bdbdbd',
    marginBottom: 4,
  },
  memberCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',   
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5f5f5',
    textShadowColor: '#bdbdbd',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  memberRa: {
    fontSize: 16,
    color: '#bdbdbd',
    marginTop: 4,
    fontWeight: '600',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default GroupInfoScreen;