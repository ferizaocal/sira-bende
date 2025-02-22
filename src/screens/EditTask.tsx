import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import Header from '../components/Header';
import TaskName from '../components/TaskName';
import StartingDate from '../components/StartingDate';
import PeriodType from '../components/PeriodType';
import AddPerson from '../components/AddPerson';
import PersonModel from '../models/PersonModel';
import TaskRepository from '../repository/TaskRepository';
import TaskModel from '../models/TaskModel';
import EndingDate from '../components/EndingDate';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function EditTask({route, navigation}: any) {
  const [taskName, setTaskName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [people, setPeople] = useState<PersonModel[]>([]);
  const [originalPeople, setOriginalPeople] = useState<PersonModel[]>([]);

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
  };

  const taskRepo = TaskRepository.getInstance();

  useEffect(() => {
    if (route.params?.task) {
      const {taskName, selectedDate, selectedEndDate, selectedPeriod, people} =
        route.params.task;
      setTaskName(taskName);
      setSelectedDate(selectedDate);
      setSelectedEndDate(selectedEndDate);
      setSelectedPeriod(selectedPeriod);
      setPeople(people);
      setOriginalPeople([...people]);
    }
  }, [route.params?.task]);

  const handleSaveTask = async () => {
    const task: TaskModel = {
      id: route.params.task.id,
      taskName,
      selectedDate,
      selectedEndDate,
      selectedPeriod,
      people,
    };

    try {
      await taskRepo.updateTask(task);
      Alert.alert('Başarılı', 'Görev başarıyla güncellendi.', [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Görev güncellenirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Görevi Düzenle" isGoBackShow={true} />

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
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
        <TouchableOpacity style={styles.footerButton} onPress={handleSaveTask}>
          <Text style={styles.footerText}>Kaydet</Text>
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
    flex: 0.48,
    marginRight: 10,
  },
  endingDate: {
    flex: 0.48,
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
    fontWeight: 'bold',
    color: '#F5EDED',
  },
});
