import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Lato_700Bold, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
export default function App() {
  const [sitSensor, setSitSensor] = useState(false);

  

  let [fontsLoaded] = useFonts({
    Lato_700Bold, 
    Lato_400Regular,
    Lato_300Light
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  else {
      return (
      <View style={styles.mainContainer}>      
        <StatusBar style="light" />
        <View style={[styles.container, styles.topContainer]}>
          <Text style={styles.title}>Smart Home</Text>
        
          <View style={styles.infoContainer}>
            <Ionicons name="partly-sunny" size={28} color="white" />

            <Text style={styles.temperature}>
              29 °<Text style={{fontSize: 14, fontFamily: "Lato_400Regular"}}>C</Text>
            </Text>

            <Text style={styles.date}>Domingo, 21 de março</Text>
          </View>

          <TouchableOpacity style={styles.shutdownAllContainer}>
            <View style={styles.shutdownAll}>
              <Ionicons name="power-outline" size={34} color="#e62727" />
            </View>
          </TouchableOpacity>

        </View>


        <View style={[styles.container, styles.bottomContainer]}>
          <View style={styles.cardsContainer}>
            <View style={styles.sensorCard}>
              <View style={styles.sensorCardIconsContainer}>
                <Ionicons name={sitSensor == false ? "bulb-outline" : "bulb" } size={24} color={sitSensor == false ? "#000" : "#f5c242"} />

                <TouchableOpacity style={[styles.sensorStatusIcon, {borderWidth: sitSensor == false ? 1 : 0, borderColor: sitSensor == false ? "#dadada" : "#f88d3d", backgroundColor: sitSensor == false ? "#fff" : "#f88d3d"}]} onPress={() => setSitSensor(!sitSensor)}>
                  <Ionicons name="power-outline" size={18} color={sitSensor == false ? "#dadada" : "#fff"} />
                </TouchableOpacity>
              </View>

              <View style={styles.sensorDescriptionContainer}> 
                <Text style={styles.sensorTitle}>
                  Luz da sala
                </Text>          

                <Text style={[styles.sensorStatus, {color: sitSensor == false ? "#dadada" : "#3eed61"}]}>
                  {sitSensor == false ? "Off" : "On"}
                </Text>
              </View>
            </View>
          </View>        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#49cd6a"
  },
  container: {
    borderColor: "black",
    width: "100%"
  },
  topContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontFamily: 'Lato_700Bold'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
  },
  temperature: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "Lato_400Regular"
  },
  date: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "Lato_400Regular"
  },
  shutdownAllContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutdownAll: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: "#f0f0f0",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomContainer: {
    flex: 0.6,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    backgroundColor: "#f5f6f7",
    alignItems: "center",
    justifyContent: 'center'
  },
  cardsContainer: {
    width: "90%",
    borderColor: "black",
    flex: 0.9,    
  },
  sensorCard: {
    width: 135,
    height: 135,
    borderRadius: 15,
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#f0f0f0",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  sensorCardIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sensorStatusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sensorCardDescContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sensorTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    fontFamily: 'Lato_300Light',
  },
  sensorStatus: {
    fontSize: 16,
    color: "#dadada",
    fontFamily: 'Lato_300Light',
  }
});
