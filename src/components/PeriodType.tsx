import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function PeriodType({onSelectPeriod}) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const handlePeriodSelect = period => {
    setSelectedPeriod(period);
    onSelectPeriod(period);
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
              selectedPeriod === period.label && styles.selectedButton,
            ]}
            onPress={() => handlePeriodSelect(period.label)}>
            <Text
              style={[
                styles.buttonText,
                selectedPeriod === period.label && styles.selectedButtonText,
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
