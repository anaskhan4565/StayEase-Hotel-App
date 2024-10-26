import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [data, setdata] = useState([]);
  const [name, setname] = useState('');
  const [location, setlocation] = useState('');
  useEffect(() => {
    const fetchh = async () => {
      try {
        const response = await fetch('http://localhost:3300/demodata');
        const parseddata = await response.json();
        setdata(parseddata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchh();  

    const interval = setInterval(() => {
      fetchh();
    }, 500);


    return () => clearInterval(interval);
  }, []);

  const post = async () => {
    obj = {
      name: name,
      location: location,
    }

    try {
      await fetch('http://localhost:3300/demodata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      console.log('Data posted successfully');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }


  const renderitem = ({ item }) => (
    <View style={styles.container2}>
      <Text style={styles.text}>{item.id}</Text>
      <Text style={styles.text}>{item.first_name}</Text>
      <Text style={styles.text}>{item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.textinput} placeholder='Enter name'
        value={name}
        onChangeText={setname}
      />
      <TextInput style={styles.textinput} placeholder='Enter location'
        value={location}
        onChangeText={setlocation}
      />
      <Pressable style={styles.container} onPress={post}>
        <View style={styles.button}>
          <Text>Enter</Text>
        </View>
      </Pressable>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderitem}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: 'plum',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textinput: {
    paddingVertical: 10,
    marginBottom: 1,
  },
  button: {
    height: 30,
    width: 150,
    backgroundColor: 'cyan',
    borderRadius: 8,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
