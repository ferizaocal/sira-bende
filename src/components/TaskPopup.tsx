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
import moment from 'moment'; // moment kütüphanesini ekledik

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
  const periodMap: Record<string, number> = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
    inThreeDay: 3,
  };

  const calculateDates = (): {person: string; date: string}[] => {
    const initialDate = moment(startDate, 'DD.MM.YYYY');
    const finalDate = moment(endDate, 'DD.MM.YYYY');
    const dateFormat = 'DD.MM.YYYY';
    const results: {person: string; date: string}[] = [];

    let currentDate = initialDate.clone();
    let personIndex = 0;
    const periodDays = periodMap[periodType] || 1;

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
              <View
                key={index}
                style={[
                  styles.tableRow,
                  {backgroundColor: index % 2 === 0 ? '#F1F6F9' : '#61ABF9'},
                ]}>
                <Text
                  style={[
                    styles.tablePerson,
                    {color: index % 2 === 0 ? '#333' : '#FFFFFF'},
                  ]}>
                  {item.person}
                </Text>
                <Text
                  style={[
                    styles.tableDate,
                    {color: index % 2 === 0 ? '#333' : '#FFFFFF'},
                  ]}>
                  {item.date}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
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
    flex: 0.5,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 350,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    width: '100%',
    flex: 0.3,
  },
  tableRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tablePerson: {
    flex: 3,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  tableDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    padding: 5,
  },
  footer: {
    flex: 0.1,
    marginTop: 10,
  },
  closeButton: {
    marginHorizontal: 10,
    padding: 10,
    width: 100,
    borderRadius: 25,
    backgroundColor: '#007AFF',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
