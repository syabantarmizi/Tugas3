import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpactity, ActivityIndicator} from 'react-native';

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCryptoData = async () => {
        try{
            const response = await fetch('https://api.coinlore.net/api/tickers/');
            const json = await response.json();
            setData(json.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

 useEffect(() => {
    fetchCryptoData();
 }, []);

 return (
    <View style={styles.container}>
        <TouchableOpactity onPress={fetchCryptoData} style={styles.refreshButton}>
        <Text style={styles.refreshText}>Refresh </Text>
        </TouchableOpactity>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff"/>
        ) : (
          <ScrollView>
           {data.map((item) => (
             <View key={item.id} style={styles.row}>
             {/* Rank */}
             <View style={styles.rankColumn}>
              <Text style={styles.label}>Rank</Text>
              <Text style={styles.value}>{item.rank}</Text>
              </View>
             
             {/* Column Name */}
             <View style={styles.nameColumn}>
              <Text style={styles.label}>{item.name}</Text>
              <Text style={styles.value}>{item.symbol}</Text>
              </View>

             {/* Price Column*/}
             <View style={styles.priceColumn}>
              <Text style={styles.label}>USD</Text>
              <Text style={styles.value}>{parseFloat(item.price_usd).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    )}
  </View>
 );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  refreshButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  refreshText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#FFA000',
    borderRadius: 5,
  },
  rankColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameColumn: {
    flex: 2,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  priceColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
});

