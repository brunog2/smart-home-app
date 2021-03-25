import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Lato_700Bold, Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import * as SVG from 'react-native-svg';
import axios from 'axios';

const cheerio = require('cheerio-without-node-native')

const { Svg, Path, G, Rect} = SVG

export default function App() {
  const [sensores, setSensores] = useState([
      {
        'id': 1,
        'name': 'Luz da sala',
        'sit': 0,
        },
        {
          'id': 2,
          'name': 'Luz da piscina',
          'sit': 0,
        },
        {
          'id': 3,
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


    const setSensorsSit = async () => {
      let nameSensores = ['Luz da sala', 'Luz da piscina', 'Alarme'];
      let newSensores = [];

      console.log(newSensores)
      
      for (var i = 1; i <= 3; i++) {
        const urlSensor = `https://iot924.000webhostapp.com/sensor${i}.php`;
        const urlSensorResponse = await fetch(urlSensor);  // fetch page 
      
        const htmlStringSensor = await urlSensorResponse.text(); // get response text
        const $ = cheerio.load(htmlStringSensor);       // parse HTML string
      
  
        const result = $("#s-results-list-atf > body")["_root"]["0"]["children"][0]["data"]

        let sit = parseInt(result);

        console.log("result, sit: ", result, sit);

        

        let sensor = {
          "id": i,
          "name": nameSensores[i-1],
          "sit": sit
        }

        newSensores.push(sensor);
      }

      setSensores(newSensores)



      console.log(newSensores, typeof(result))
    }
    
    setSensorsSit();
  }, [])

  useEffect(() => {
    console.log(sensores)
  }, [sensores])

  const controlAll = async (action) => {
    var newSensores = [...sensores]
    
    for (var sensor in newSensores) {
      let codSensor = parseInt(sensor)+1;
      let sitSensor = action;

      let url = 'https://iot924.000webhostapp.com/atualiza.php';
      
      await axios.get(url, {
        params: {
          codigoSensor: codSensor.toString(),
          situacaoSensor: sitSensor == 0 ? 'off' : 'on'
        }
      }).then(() => {
        newSensores[sensor].sit = action;
      })
      
    };

    setSensores(newSensores);

    return;
  }

  const handleSuperButtonPress = () => {
    var newSensores = [...sensores];

    let on = 0, off = 0;

    for (var sensor in newSensores) {
      newSensores[sensor].sit == 1 ? on++ : off++;
    };

    console.log("ligados", on, " desligados", off);

    {/* se um ou mais estiverem ligados, ligar todos */}
    if (on >= 0 && on < newSensores.length) {
      return controlAll(1);
    } 

    {/* se todos estiverem ligados, desligar ligar todos */}
    if (on == newSensores.length) {
      return controlAll(0);
    }

    {/* se todos estiverem desligados, ligar todos */}
    if (off == newSensores.length) {
      return controlAll(1);
    }

  };

  const handleSwitchPress = async (id) => {
    var newSensores = [...sensores];

    console.log(newSensores, id);

    for (var sensor in newSensores) {
      console.log(sensor, newSensores[sensor].id)
      if (newSensores[sensor].id == id) {
        newSensores[sensor].sit = newSensores[sensor].sit == 0 ? 1 : 0;
        
        let url = 'https://iot924.000webhostapp.com/atualiza.php';
      
        await axios.get(url, {
          params: {
            codigoSensor: id.toString(),
            situacaoSensor: newSensores[sensor].sit == 0 ? 'off' : 'on'
          }
        }).then(() => {
          setSensores(newSensores);
        })
      };
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
        <StatusBar style="light" backgroundColor="#661ddb"/>
        <View style={[styles.container, {flex: 0.4}]}>

        <View style={styles.svgCurve}>
          <View style={{ backgroundColor: '#661ddb', flex: 1 }}>
            <Svg
              height="60%"
              width="100%"
              viewBox="0 0 1440 320"
              style={{ position: 'absolute', top: 150 }}
            >
              <Path
                fill="#661ddb"
                d="M0,160L48,160C96,160,192,160,288,181.3C384,203,480,245,576,250.7C672,256,768,224,864,181.3C960,139,1056,85,1152,69.3C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </Svg>
            
            <View>
              <View style={styles.topContainer}>
                <Text style={styles.title}>Smart Home</Text>
            
                <View style={styles.infoContainer}>
                  <Ionicons name="partly-sunny" size={28} color="white" />

                  <Text style={styles.temperature}>
                    29 °<Text style={{fontSize: 14, fontFamily: "Lato_400Regular"}}>C</Text>
                  </Text>

                  <Text style={styles.date}>Domingo, 21 de março</Text>
                </View>

                <TouchableOpacity style={styles.shutdownAllContainer} onPress={() => handleSuperButtonPress()}>
                  <View style={styles.shutdownAll}>
                    <Ionicons name="power-outline" size={34} color="#e62727" />
                  </View>
                </TouchableOpacity>
            </View>
            </View>

          </View>
      </View>

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
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
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

