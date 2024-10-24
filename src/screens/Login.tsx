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
import {AppleIcon, GoogleIcon} from '../assets/icons';

export default function Login(props: any) {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const {idToken} = userInfo.data;

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      props.navigation.navigate('Home');
    } catch (error) {
      console.log('error:', error);
    }
  };
  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const {identityToken, nonce} = appleAuthRequestResponse;

      if (!identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      await auth().signInWithCredential(appleCredential);

      props.navigation.navigate('Home');
    } catch (error) {
      console.log('Apple sign-in error:', error);
    }
  };

  //const configureAppleSignIn = async () => {
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

  //};
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

      <View style={styles.socialMediaContainer}>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            onPress={() => {
              signInWithApple();
            }}
            activeOpacity={0.8}
            style={[styles.socialButton, {backgroundColor: '#293F56'}]}>
            <View style={styles.iconAndText}>
              <Image source={AppleIcon} style={{height: 25, width: 25}} />
              <Text style={styles.socialButtonText}>Apple ile Giriş Yap</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => signInWithGoogle()}
          activeOpacity={0.8}
          style={[styles.socialButton, {backgroundColor: '#007AFF'}]}>
          <View style={styles.iconAndText}>
            <Image
              source={GoogleIcon}
              style={{height: 22, width: 22, tintColor: '#F2F2F2'}}
            />
            <Text style={styles.socialButtonText}>Google ile Giriş Yap</Text>
          </View>
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
  },
  socialButton: {
    width: '80%',
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});
