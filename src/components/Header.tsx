import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Header({
  title,
  isGoBackShow = false,
}: {
  title: string;
  isGoBackShow?: boolean;
}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.navbar}>
      <Text style={styles.navbarText}>{title}</Text>
      {isGoBackShow && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navbar: {
    height: 120,
    width: '100%',
    backgroundColor: '#61ABF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5EDED',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    bottom: 10,
    padding: 10,
  },
});
