import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import LottieView from 'lottie-react-native';
import {DateAnimation} from '../assets/animations';

LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  dayNames: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: 'Bugün',
};
LocaleConfig.defaultLocale = 'tr';

export default function EndingDate({
  selectedDate,
  onDateChange,
  startingDate,
}: {
  selectedDate: string;
  onDateChange: (date: string) => void;
  startingDate: string;
}) {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

  const handleDateChange = (day: any) => {
    const formattedDate = formatDate(day.dateString);

    const startDateObj = new Date(startingDate.split('-').reverse().join('-')); // 'dd-mm-yyyy' formatını 'yyyy-mm-dd' formatına çevir
    const endDateObj = new Date(day.dateString);

    // Bitiş tarihinin geçerli olup olmadığını kontrol et
    if (endDateObj <= startDateObj) {
      Alert.alert(
        'Uyarı',
        'Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.',
        [{text: 'Tamam'}],
      );
      return;
    }

    onDateChange(formattedDate);
    setIsCalendarVisible(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bitiş Tarihi:</Text>
      <TouchableOpacity
        onPress={() => setIsCalendarVisible(true)}
        style={[
          styles.inputContainer,
          {borderColor: isCalendarVisible ? '#7FA1C3' : '#cccccc'},
        ]}>
        <LottieView
          autoPlay
          loop={false}
          style={{height: 50, width: 50}}
          source={DateAnimation}
        />
        <Text
          style={[
            styles.inputText,
            {color: selectedDate ? '#000000' : '#939185'},
            {fontSize: selectedDate ? 15 : 12},
          ]}>
          {selectedDate ? selectedDate : 'Görev Bitiş Tarihi'}
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
                  [selectedDate]: {selected: true, selectedColor: '#007AFF'},
                }}
                style={styles.calendar}
                locale={'tr'}
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
  container: {},

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
  },
  inputText: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  calendar: {
    width: 300,
    height: 350,
  },
  closeButton: {
    marginBottom: 10,
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
