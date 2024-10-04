import Header from '../components/Header';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import PeriodType from '../components/PeriodType';
import StartingDate from '../components/StartingDate';
import AddPerson from '../components/AddPerson';
import TaskName from '../components/TaskName';
import TaskRepository from '../repository/TaskRepository';
import PersonModel from '../models/PersonModel';
import EndingDate from '../components/EndingDate';
import LottieView from 'lottie-react-native';
import {Loading} from '../assets/animations';

export default function AddTask(props: any) {
  const [taskName, setTaskName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const [people, setPeople] = useState<PersonModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const taskRepo = TaskRepository.getInstance();

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleAddTask = async () => {
    if (
      !taskName ||
      !selectedDate ||
      !selectedEndDate ||
      !selectedPeriod ||
      people.length === 0
    ) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.', [
        {text: 'Tamam'},
      ]);
      return;
    }

    setLoading(true);

    try {
      const newTask = {
        taskName,
        selectedDate,
        selectedPeriod,
        selectedEndDate,
        people,
      };

      await taskRepo.addTask(newTask);
      props.navigation.goBack();
    } catch (error) {
      Alert.alert('Hata', 'Görev eklenirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Görev Ekle" isGoBackShow={true} />

      <View style={styles.content}>
        <TaskName onChangeText={setTaskName} value={taskName} />
        <View style={styles.dateRow}>
          <StartingDate
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <EndingDate
            selectedDate={selectedEndDate}
            onDateChange={setSelectedEndDate}
          />
        </View>
        <PeriodType
          selectedPeriod={selectedPeriod}
          onSelectPeriod={handlePeriodSelect}
        />
        <AddPerson
          onPeopleChange={setPeople}
          people={people}
          taskName={taskName}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.footer}
          onPress={handleAddTask}
          disabled={loading}>
          {loading ? (
            <View style={styles.loadingAnimation}>
              <LottieView
                autoPlay
                loop
                style={{height: 100, width: 100}}
                source={Loading}
              />
            </View>
          ) : (
            <Text style={styles.footerText}>Ekle</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F1F1F1',
  },
  content: {
    margin: 20,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    height: 40,
    width: '90%',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5EDED',
  },
  loadingAnimation: {
    alignItems: 'center',
    marginTop: 150,
  },
});
