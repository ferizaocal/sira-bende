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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={100}
        contentContainerStyle={styles.content}>
        <View style={styles.taskName}>
          <TaskName onChangeText={setTaskName} value={taskName} />
        </View>

        <View style={styles.dateRow}>
          <View style={styles.startingDate}>
            <StartingDate
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </View>
          <View style={styles.endingDate}>
            <EndingDate
              selectedDate={selectedEndDate}
              onDateChange={setSelectedEndDate}
              startingDate={selectedDate}
            />
          </View>
        </View>

        <View style={styles.periodType}>
          <PeriodType
            selectedPeriod={selectedPeriod}
            onSelectPeriod={handlePeriodSelect}
          />
        </View>

        <View style={styles.addPerson}>
          <AddPerson
            onPeopleChange={setPeople}
            people={people}
            taskName={taskName}
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
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
    backgroundColor: '#F1F1F1',
  },
  content: {
    padding: 13,
  },
  taskName: {
    marginBottom: 25,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  startingDate: {
    flex: 0.49,
  },
  endingDate: {
    flex: 0.46,
  },
  periodType: {
    marginBottom: 25,
  },
  addPerson: {},
  footer: {
    justifyContent: 'center',
    marginBottom: 30,
  },
  footerButton: {
    height: 40,
    width: '90%',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 18,
    color: '#F5EDED',
    fontWeight: 'bold',
  },
  loadingAnimation: {
    alignItems: 'center',
    marginTop: 150,
  },
});
