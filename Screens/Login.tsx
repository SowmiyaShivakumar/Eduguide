import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { GoogleSignin, statu } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const webClientId = '99866291593-u3j25d44drm21384d4ij7apt2g4e7o9o.apps.googleusercontent.com';
  const [user, setUser] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
    })
  }, [webClientId])



  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      console.log(idToken);
      try{
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userAuth = auth().signInWithCredential(googleCredential);
        setUser(userAuth.user);
      }catch(e){
        console.log(e);
      }
      
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  }

  return (
    <>
      <Image source={require('../assets/Images/login-bg.jpg')} style={{ width: 370, height: 250 }} />
      <View style={styles.innerContainer}>
        <Text style={styles.innerContainerText}>Welcome to the App</Text>
        <Pressable style={styles.btnView}
          onPress={() => onGoogleButtonPress().then(() => console.log(user.email))}
        >
          <Icons name="google" color="white" size={20} style={{ marginRight: 7 }} />
          <Text style={styles.textView}>Sign In with Google</Text>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    paddingTop: 30,
    marginTop: 2,
    backgroundColor: '#f5efed',
    height: 480,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  innerContainerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnView: {
    margin: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  textView: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500'
  }
})
