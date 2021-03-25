#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiClientSecureBearSSL.h>
#include <Wire.h>
#include <WiFiClient.h>
#include "ArduinoJson.h"




const char* ssid = "SEPTO";
const char* password = "septowork"; 

const char fingerprint[] PROGMEM =  "5B:FB:D1:D4:49:D3:0F:A9:C6:40:03:34:BA:E0:24:05:AA:D2:E2:01";
ESP8266WiFiMulti WiFiMulti;



void setup()
{
  
  Serial.begin(9600);
  delay(1000);
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);
  pinMode(D3, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(D5, OUTPUT);

  Serial.println();
  Serial.print("Connectando");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("successo!");
  Serial.print("Endereco IP: ");
  Serial.println(WiFi.localIP());
  
}

void loop() {
   Serial.println("loop started...");
        if ((WiFiMulti.run() == WL_CONNECTED)){
          std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
          client->setFingerprint(fingerprint);
          Serial.println("connected...");
          //WiFiClient client;

          HTTPClient http;

        // lpiscina
        if (http.begin(*client,"https://iot924.000webhostapp.com/sensor1.php")){
          Serial.println("http.begin ok");
        }
        int httpCodeP = http.GET();
        if (httpCodeP > 0) {
        
            String payload = http.getString();
            
               
            if(payload == "1"){
              digitalWrite(D4, HIGH);
              Serial.println("Led da piscina ligada");      
            }
            else{
              digitalWrite(D4, LOW);
              Serial.println("Led da piscina desligada");}
            http.end();
        }
        //  sala
        if (http.begin(*client,"https://iot924.000webhostapp.com/sensor2.php")){
          Serial.println("http.begin ok");
        }
        int httpCodeS = http.GET();
        if (httpCodeS > 0) {
        
            String payload = http.getString();
            
               
            if(payload == "1"){
              digitalWrite(D3, HIGH);
              Serial.println("Led da sala ligado");      
            }
            else{
              digitalWrite(D3, LOW);
              Serial.println("Led da sala desligado");}
            http.end();
        }
        // alarme
        if (http.begin(*client,"https://iot924.000webhostapp.com/sensor3.php")){
          Serial.println("http.begin ok");
        }
        int httpCodeA = http.GET();
        if (httpCodeA > 0) {
        
            String payload = http.getString();
            
               
            if(payload == "1"){
              tone(D5, HIGH);
              Serial.println("Alarme ligado");      
            }
            else{
              tone(D5, LOW);
              Serial.println("Alarme desligado");}
            http.end();
        }
                   
        else {
            
            Serial.println("Falha na requisição");
        }

        
        http.end();
        }
        
        delay(1000);
}
