import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PersonModel from '../models/PersonModel';
import moment from 'moment';

interface TaskPopupProps {
  visible: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  periodType: string;
  people: PersonModel[];
}

export const TaskPopup: React.FC<TaskPopupProps> = ({
  visible,
  onClose,
  startDate,
  endDate,
  periodType,
  people,
}) => {
  const calculateDates = (): {person: string; date: string}[] => {
    const initialDate = moment(startDate, 'DD.MM.YYYY');
    const finalDate = moment(endDate, 'DD.MM.YYYY');
    const dateFormat = 'DD.MM.YYYY';
    const results: {person: string; date: string}[] = [];

    let currentDate = initialDate.clone();
    let personIndex = 0;
    let periodDays = 1;

    switch (periodType) {
      case 'daily':
        periodDays = 1;
        break;
      case 'weekly':
        periodDays = 7;
        break;
      case 'monthly':
        periodDays = 30;
        break;
      case 'yearly':
        periodDays = 365;
        break;
      case 'inThreeDay':
        periodDays = 3;
        break;
      default:
        periodDays = 1;
        break;
    }

    while (currentDate.isSameOrBefore(finalDate)) {
      results.push({
        person: people[personIndex].personFullName,
        date: currentDate.format(dateFormat),
      });
      currentDate.add(periodDays, 'days');

      personIndex = (personIndex + 1) % people.length;
    }

    return results;
  };

  const dates = calculateDates();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.subtitle}>Kişiler ve Tarihleri</Text>
          <ScrollView style={styles.scrollView}>
            {dates.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.person}</Text>
                <Text style={styles.tableCell}>{item.date}</Text>
              </View>
            ))}
          </ScrollView>
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
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    height: 300,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  scrollView: {
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
