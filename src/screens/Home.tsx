import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import Header from '../components/Header';
import TaskRepository from '../repository/TaskRepository';
import TaskModel from '../models/TaskModel';
import PersonModel from '../models/PersonModel';
import {periods} from '../components/PeriodType';
import LottieView from 'lottie-react-native';
import {TaskManagement2Animation} from '../assets/animations';
import {Delete6Icon, Edit4Icon} from '../assets/icons';
import {TaskPopup} from '../components/TaskPopup';

export default function Home(props: any) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskModel | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const taskRepo = TaskRepository.getInstance();

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadTasks();
    });
  }, []);
  const loadTasks = () => {
    taskRepo
      .getTasks()
      .then(res => {
        setTasks(res);
        console.log(res);
      })
      .catch(er => {
        console.log(`Error: ${er}`);
      })
      .finally(() => {});
  };
  const handleDeleteTask = async (task: TaskModel, index: number) => {
    if (!task.id) {
      console.error(
        "Görev ID'si tanımlı değil, silme işlemi gerçekleştirilemez.",
      );
      return;
    }

    Alert.alert(
      'Silmek Üzeresiniz',
      'Bu görevi silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Silme işlemi iptal edildi'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await taskRepo.deleteTask(task);
              console.log(`Task with ID: ${task.id} has been deleted`);
              setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
            } catch (error) {
              console.error('Görev silme hatası:', error);
            }
          },
        },
      ],
    );
  };
  const handleTaskPress = (task: TaskModel) => {
    setSelectedTask(task);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };
  return (
    <View style={styles.container}>
      <Header title={tasks.length === 0 ? 'Hoşgeldiniz' : 'Görevlerim'} />

      <View style={styles.content}>
        {tasks.length === 0 ? (
          <View style={styles.centeredContainer}>
            <LottieView
              autoPlay
              loop
              style={{height: 300, width: 400}}
              source={TaskManagement2Animation}
            />
            <Text style={styles.text}>
              Yeni bir görev eklemek için aşağıdaki butona tıklayınız!
            </Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => handleTaskPress(item)}>
                <View style={styles.taskCard}>
                  <View style={styles.taskHeader}>
                    <Text style={styles.taskName}>{item.taskName}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('EditTask', {task: item})
                      }
                      style={styles.editButton}>
                      <Image
                        source={Edit4Icon}
                        style={{height: 25, width: 25}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteTask(item, index)}
                      style={styles.deleteButton}>
                      <Image
                        source={Delete6Icon}
                        style={{height: 25, width: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.taskDetail}>
                    <Text style={styles.textDetail}>Başlangıç Tarihi: </Text>
                    <Text>{item.selectedDate}</Text>
                  </Text>
                  <Text style={styles.taskDetail}>
                    <Text style={styles.textDetail}>Bitiş Tarihi: </Text>
                    <Text>{item.selectedEndDate}</Text>
                  </Text>
                  <Text style={styles.taskDetail}>
                    <Text style={styles.textDetail}>Aralık Tipi: </Text>
                    <Text>
                      {periods.find(x => x.value == item.selectedPeriod)
                        ?.label || ''}
                    </Text>
                  </Text>
                  <Text style={styles.taskDetail}>
                    <Text style={styles.textDetail}>Kişiler: </Text>
                    <Text>
                      {item.people
                        .map((x: PersonModel) => x.personFullName)
                        .join(', ')}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => props.navigation.navigate('AddTask')}>
        <Text style={styles.footerText}>Yeni Görev Ekle</Text>
      </TouchableOpacity>
      {selectedTask && (
        <TaskPopup
          visible={isPopupVisible}
          onClose={closePopup}
          startDate={selectedTask.selectedDate}
          endDate={selectedTask.selectedEndDate}
          periodType={selectedTask.selectedPeriod}
          people={selectedTask.people}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    color: '#F5EDED',
    backgroundColor: '#F1F1F1',
  },
  content: {
    flex: 1,
  },
  centeredContainer: {
    alignItems: 'center',
    marginTop: 150,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 30,
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
    width: '93%',
    alignSelf: 'center',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  textDetail: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  deleteButton: {
    flex: 0.1,
  },
  editButton: {
    flex: 0.1,
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
    color: '#F5EDED',
    fontWeight: 'bold',
  },
});
