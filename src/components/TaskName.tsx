import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface TaskNameProps {
  onChangeText: (text: string) => void;
  value: string;
}
export default function TaskName({onChangeText, value}: TaskNameProps) {
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
  content: {},
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4F709C',
  },
  input: {
    height: 46,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    color: '#000',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: '#7FA1C3',
  },
});
