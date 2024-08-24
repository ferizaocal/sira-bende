import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface PeriodTypeProps {
  onSelectPeriod: (period: string) => void;
}
export default function PeriodType({onSelectPeriod}: PeriodTypeProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const handlePeriodSelect = (periodValue: string) => {
    setSelectedPeriod(periodValue);
    onSelectPeriod(periodValue);
  };

  const periods = [
    {label: 'Yıllık', value: 'yearly'},
    {label: 'Aylık', value: 'monthly'},
    {label: 'Haftalık', value: 'weekly'},
    {label: 'Günlük', value: 'daily'},
  ];

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
            onPress={() => handlePeriodSelect(period.value)}>
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
    backgroundColor: '#4F79AD',
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
