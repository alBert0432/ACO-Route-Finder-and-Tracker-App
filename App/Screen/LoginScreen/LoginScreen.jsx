import React from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import HomeScreen from '../HomeScreen/HomeScreen';

WebBrowser.maybeCompleteAuthSession();
export default function  LoginScreen ()  {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress= async ()=>{
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        makeRedirectUri = HomeScreen
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }  
  return (
      
      <View style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:0
        }}>
        <Text style={styles.Headerrrrr}>
          Route Finder
        </Text>
        <Image source={require('./../../../assets/images/logo.png')}
            style={styles.logoImage}
        /> 
        <View style={{padding:0}}>
            <Text style={styles.Heading}>ACO-Based Route Finder</Text>
            <Text style={styles.Subheading}>Find your best route using ACO Algorithm </Text>
            <Text style={styles.Subheading2}>with your own device! </Text>
            
            <TouchableOpacity style={styles.button}
            onPress={onPress}>
              <Text style={{
                color:Colors.BLACK,
                textAlign:'center',
                fontFamily:'ReadexPro-medium',
                fontSize:13
              }}>Login With Google</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  
}

const styles = StyleSheet.create({
    logoImage:{
        width:400,
        height:300,
        objectFit:'contain'
    },
    Headerrrrr:{
        fontSize:26,
        fontFamily:'ReadexPro-bold',
        textAlign:'center',
        marginTop:30
    },
    Heading:{
        fontSize:20,
        fontFamily:'ReadexPro-bold',
        textAlign:'center',
        marginTop:0
    },
    Subheading:{
      fontSize:13,
      fontFamily:'ReadexPro',
      textAlign:'center',
      marginTop:5
    },
    Subheading2:{
      fontSize:14,
      fontFamily:'ReadexPro',
      textAlign:'center',
      marginTop:0,
      color:'#000',
      color:Colors.BLACK
},
    button:{
      backgroundColor:Colors.BLUEGREEN,
      padding:14,
      display:'flex',
      borderRadius:99,
      marginTop:20
},
  backgroundColor:{
    color:Colors.PRIMARY
  }
    
})

