import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface PeriodTypeProps {
  onSelectPeriod: (period: string) => void;
  selectedPeriod: string;
}
export const periods = [
  {label: 'Günlük', value: 'daily'},
  {label: '3 Günde', value: 'inThreeDay'},
  {label: 'Haftalık', value: 'weekly'},
  {label: 'Aylık', value: 'monthly'},
  {label: 'Yıllık', value: 'yearly'},
];
export default function PeriodType({
  onSelectPeriod,
  selectedPeriod,
}: PeriodTypeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aralık Tipi:</Text>
      <View style={styles.buttonContainer}>
        {periods.map(period => (
          <TouchableOpacity
            key={period.value}
            style={[
              styles.button,
              selectedPeriod === period.value && styles.selectedButton,
            ]}
            onPress={() => onSelectPeriod(period.value)}>
            <Text
              style={[
                styles.buttonText,
                selectedPeriod === period.value && styles.selectedButtonText,
              ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4F709C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,

    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#fafafa',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#cccccc',
  },
  buttonText: {
    fontSize: 13,
    color: '#000',
  },
  selectedButtonText: {
    color: '#fafafa',
  },
});
