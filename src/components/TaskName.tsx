import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export default function TaskName({onChangeText, value}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Görevin Adı:</Text>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4F709C',
  },
  content: {},
  input: {
    height: 46,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    color: '#000',
    marginBottom: 15,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: '#7FA1C3',
  },
});
