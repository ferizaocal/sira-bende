import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LogoutIcon} from '../assets/icons';

export default function Header({
  title,
  isGoBackShow = false,
}: {
  title: string;
  isGoBackShow?: boolean;
}) {
  const navigation = useNavigation();

  const signOut = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await auth().signOut();
              await GoogleSignin.signOut();
              navigation.navigate('Login');
            } catch (error) {
              console.error('Çıkış işlemi başarısız oldu:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#61ABF9" />
      <SafeAreaView style={styles.navbar}>
        <Text style={styles.navbarText}>{title}</Text>
        {isGoBackShow && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faAngleLeft} color="white" />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Image
            source={LogoutIcon}
            style={{height: 35, width: 35, tintColor: '#fff'}}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    backgroundColor: '#61ABF9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight / 2 : 0,
  },
  navbarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5EDED',
    flex: 1,
    textAlign: 'center',
    paddingLeft: 50,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    bottom: 8,
  },
  logoutButton: {
    flex: 0.15,
    bottom: 3,
  },
});
