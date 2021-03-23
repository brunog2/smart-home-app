import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Lato_700Bold, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
export default function App() {
  const [sensores, setSensores] = useState([
      {
        'id': 'sala',
        'name': 'Luz da sala',
        'sit': 0,
        },
        {
          'id': 'piscina',
          'name': 'Luz da piscina',
          'sit': 0,
        },
        {
          'id': 'alarme',
          'name': 'Alarme',
          'sit': 0,
        }
    ]);
    
  const colors = {
    'icon': { 'disabled': '#7b6492', 'enabled': '#f5c242' },
    'switchIcon': { 'disabled': '#756788', 'enabled': '#fff' },
    'switchBg': { 'disabled': 'transparent', 'enabled': '#f88d3d' },
    'switchBorder': { 'disabled': '#756788', 'enabled': 'transparent' },
    'statusDesc': { 'disabled': '#756788', 'enabled': '#14be8f' },
  };

  let [fontsLoaded] = useFonts({
    'BasisGrotesqueProRegular': require('./assets/fonts/BasisGrotesquePro-Regular.ttf'),
    'BasisGrotesqueProBold': require('./assets/fonts/BasisGrotesquePro-Bold.ttf'),
    'BasisGrotesqueProLight': require('./assets/fonts/BasisGrotesquePro-Light.ttf'),
    Lato_700Bold, 
    Lato_400Regular,
    Lato_300Light
  });

  useEffect(() => {
    console.log(sensores)
  }, [sensores])

  const handleSuperButtonPress = () => {
    var newSensores = [...sensores];

    for (var sensor in newSensores) {
      newSensores[sensor].sit = 0;
    };

    setSensores(newSensores);
  };

  const handleSwitchPress = (id) => {
    var newSensores = [...sensores];

    console.log(newSensores, id);

    for (var sensor in newSensores) {
      console.log(sensor, newSensores[sensor].id)
      if (newSensores[sensor].id == id)
        newSensores[sensor].sit = newSensores[sensor].sit == 0 ? 1 : 0;
    }    

    console.log(newSensores);

    setSensores(newSensores);
  }

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
            <FlatList
              data={sensores}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={({ item }) => {
                return (
                  <View style={styles.sensorCard}>
                    <View style={styles.sensorCardIconsContainer}>
                      <Ionicons name={item.sit == 0 ? "bulb-outline" : "bulb" } size={24} color={item.sit == 0 ? colors["icon"].disabled : colors["icon"].enabled} />

                      <TouchableOpacity 
                      style={[
                        styles.sensorStatusIcon, 
                        {
                          borderWidth: item.sit == 0 ? 1 : 0, 
                          borderColor: item.sit == 0 ? colors['switchBorder'].disabled : colors['switchBorder'].enabled, 
                          backgroundColor: item.sit == 0 ? colors['switchBg'].disabled : colors['switchBg'].enabled
                          }
                        ]} 
                        onPress={() => handleSwitchPress(item.id)}>                        
                        <Ionicons name="power-outline" size={18} color={ item.sit == 0 ? colors["switchIcon"].disabled : colors["switchIcon"].enabled } />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.sensorDescriptionContainer}> 
                      <Text style={styles.sensorTitle}>
                        {item.name}
                      </Text>          

                      <Text style={[styles.sensorStatus, {color: item.sit == 0 ? colors['statusDesc'].disabled : colors['statusDesc'].enabled }]}>
                        {item.sit == 0 ? "Off" : "On"}
                      </Text>
                    </View>
                  </View>  
                )
              }}
              />
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
    backgroundColor: '#e3e4e9'
  },
  container: {
    borderColor: "black",
    width: "100%"
  },
  topContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: "#5200ba"
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontFamily: 'BasisGrotesqueProBold'
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
    fontFamily: "BasisGrotesqueProRegular"
  },
  date: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "BasisGrotesqueProRegular"
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
    
    backgroundColor: "#e3e4e9",
    alignItems: "center",
    justifyContent: 'center'
  },
  cardsContainer: {
    width: "90%",
    borderColor: "black",
    flex: 0.9,
    maxHeight: 380,
    
  },
  sensorCard: {
    flexGrow: 1,
    flexBasis: 0,
    margin: 6,
    height: 135,
    borderRadius: 15,
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: "#f2f2f2",
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
    color: '#4e4e4e',
    fontFamily: 'Lato_300Light',
  },
  sensorStatus: {
    fontSize: 16,
    color: "#756788",
    fontFamily: 'Lato_300Light',
  }
});

