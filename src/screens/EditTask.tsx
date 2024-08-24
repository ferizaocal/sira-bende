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

export default function EditTask({route, navigation}: any) {
  const [taskName, setTaskName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [people, setPeople] = useState<PersonModel[]>([]);

  const taskRepo = TaskRepository.getInstance();

  useEffect(() => {
    if (route.params?.task) {
      const {taskName, selectedDate, selectedPeriod, people} =
        route.params.task;
      setTaskName(taskName);
      setSelectedDate(selectedDate);
      setSelectedPeriod(selectedPeriod);
      setPeople(people);
    }
  }, [route.params?.task]);

  const handleSaveTask = async () => {
    const task: TaskModel = {
      id: route.params.task.id,
      taskName,
      selectedDate,
      selectedPeriod,
      people,
    };

    try {
      await taskRepo.updateTask(task);
      Alert.alert('Başarılı', 'Görev başarıyla güncellendi.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Hata', 'Görev güncellenirken bir hata oluştu.');
      console.error('Görev güncelleme hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Görevlerim" isGoBackShow={true} />

      <View style={styles.content}>
        <TaskName onChangeText={setTaskName} value={taskName} />
        <StartingDate
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <PeriodType onSelectPeriod={setSelectedPeriod} />
        <AddPerson
          onPeopleChange={setPeople}
          people={people}
          taskName={taskName}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.footer} onPress={handleSaveTask}>
          <Text style={styles.footerText}>Kaydet</Text>
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
  footer: {
    height: 40,
    width: '90%',
    backgroundColor: '#4F79AD',
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
});
