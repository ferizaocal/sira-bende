import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default function StartingDate({
  selectedDate,
  onDateChange,
}: {
  selectedDate: string;
  onDateChange: (date: string) => void;
}) {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

  const handleDateChange = (day: any) => {
    onDateChange(day.dateString);
    setIsCalendarVisible(false);
  };

  return (
    <View>
      <Text style={styles.text}>Başlangıç Tarihi:</Text>

      <TouchableOpacity
        onPress={() => setIsCalendarVisible(true)}
        style={[
          styles.inputContainer,
          {borderColor: isCalendarVisible ? '#7FA1C3' : '#cccccc'},
        ]}>
        <FontAwesomeIcon icon={faCalendarDays} style={styles.icon} />
        <Text style={styles.inputText}>
          {selectedDate ? selectedDate : 'Tarih Seçiniz'}
        </Text>
      </TouchableOpacity>

      {isCalendarVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isCalendarVisible}
          onRequestClose={() => setIsCalendarVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleDateChange}
                markedDates={{
                  [selectedDate]: {selected: true, selectedColor: 'blue'},
                }}
              />
              <TouchableOpacity
                onPress={() => setIsCalendarVisible(false)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  inputContainer: {
    height: 46,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 7,
  },
  inputText: {
    color: '#000',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4F79AD',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
