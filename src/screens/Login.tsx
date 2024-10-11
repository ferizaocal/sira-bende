import {
  View,
  TouchableOpacity,
  Platform,
  Button,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import appleAuth from '@invertase/react-native-apple-authentication';
import {WelcomeImage, WelcomeImage1} from '../assets/images';

export default function Login(props: any) {
  const signInWithGoogle = async () => {
    //   try {
    //     await GoogleSignin.hasPlayServices();

    //     const {idToken} = await GoogleSignin.signIn();

    //     const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    //     await auth().signInWithCredential(googleCredentials);
    //     props.navigation.goBack();
    //   } catch (error) {
    //     console.log('error:', error);
    //   }

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const {idToken, accessToken} = userInfo as any;
      console.log('idtoken', idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(googleCredential);
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  // const configureAppleSignIn = async () => {
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   });
  //   const {identityToken, nonce} = appleAuthRequestResponse;
  //   const appleCredential = auth.AppleAuthProvider.credential(
  //     identityToken,
  //     nonce,
  //   );

  //   auth()
  //     .signInWithCredential(appleCredential)
  //     .then(userCredential => {
  //       props.navigation.goBack();
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={WelcomeImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Image
          source={WelcomeImage1}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={styles.headerText}>Giriş Yap</Text>
      </View>

      <View style={styles.socialMediaContainer}>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            onPress={() => console.log('apple giriş')}
            activeOpacity={0.8}
            style={[styles.socialButton, {backgroundColor: '#293F56'}]}>
            <Text style={styles.socialButtonText}>Apple ile Giriş Yap</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => signInWithGoogle()}
          activeOpacity={0.8}
          style={[styles.socialButton, {backgroundColor: '#007AFF'}]}>
          <Text style={styles.socialButtonText}>Google ile Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    aspectRatio: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialMediaContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
