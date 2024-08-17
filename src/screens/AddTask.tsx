import Header from '../components/Header';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import PeriodType from '../components/PeriodType';
import StartingDate from '../components/StartingDate';
import AddPerson from '../components/AddPerson';
import TaskName from '../components/TaskName';
import {useNavigation} from '@react-navigation/native';
import TaskRepository from '../repository/TaskRepository';

export default function AddTask(props: any) {
  const [taskName, setTaskName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [people, setPeople] = useState<string[]>([]);
  const taskRepo = TaskRepository.getInstance();

  const handleAddTask = async () => {
    // if (!taskName || !selectedDate || !selectedPeriod || people.length === 0) {
    //   Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.', [
    //     {text: 'Tamam'},
    //   ]);
    //   return;
    // }fdfdfd
    ['Home', 'AddNewTask'];
    const newTask = {
      taskName,
      selectedDate,
      selectedPeriod,
      people,
    };
    await taskRepo.addTask({taskName});
    props?.route?.params?.addTask?.(newTask);
    props.navigation.goBack();
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
        <AddPerson onPeopleChange={setPeople} people={people} />
      </View>
      <View>
        <TouchableOpacity style={styles.footer} onPress={handleAddTask}>
          <Text style={styles.footerText}>Ekle</Text>
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
