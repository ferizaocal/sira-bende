import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PersonModel from '../models/PersonModel';
import moment from 'moment';

interface TaskPopupProps {
  visible: boolean;
  onClose: () => void;
  startDate: string;
  periodType: string;
  people: PersonModel[];
}

export const TaskPopup: React.FC<TaskPopupProps> = ({
  visible,
  onClose,
  startDate,
  periodType,
  people,
}) => {
  const calculateDateForPerson = (index: number): string => {
    const initialDate = moment(startDate, 'DD.MM.YYYY');
    const dateFormat = 'DD.MM.YYYY';

    switch (periodType) {
      case 'daily':
        return initialDate.add(index, 'days').format(dateFormat);
      case 'weekly':
        return initialDate.add(index, 'weeks').format(dateFormat);
      case 'monthly':
        return initialDate.add(index, 'months').format(dateFormat);
      case 'yearly':
        return initialDate.add(index, 'years').format(dateFormat);
      default:
        return initialDate.format(dateFormat);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.subtitle}>Kişiler ve Tarihleri</Text>
          <View style={styles.table}>
            {people.map((person, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{person.personFullName}</Text>
                <Text style={styles.tableCell}>
                  {calculateDateForPerson(index)}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});
