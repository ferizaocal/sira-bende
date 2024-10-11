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
import {Loading, TaskManagamentAnimation} from '../assets/animations';
import {DeleteIcon, EditIcon} from '../assets/icons';
import {TaskPopup} from '../components/TaskPopup';

export default function Home(props: any) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskModel | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const taskRepo = TaskRepository.getInstance();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadTasks);
    return () => unsubscribe();
  }, []);

  const loadTasks = () => {
    setLoading(true);
    taskRepo
      .getTasks()
      .then(res => {
        setTasks(res);
      })
      .catch(er => {
        console.log(`Error: ${er}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDeleteTask = async (task: TaskModel, index: number) => {
    Alert.alert(
      'Silmek Üzeresiniz',
      'Bu görevi silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await taskRepo.deleteTask(task);
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
        {loading ? (
          <View style={styles.centeredContainer}>
            <LottieView
              autoPlay
              loop
              style={{height: 150, width: 150}}
              source={Loading}
            />
          </View>
        ) : tasks.length === 0 ? (
          <View style={styles.centeredContainer}>
            <LottieView
              autoPlay
              loop
              style={{height: 300, width: 400}}
              source={TaskManagamentAnimation}
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
                        source={EditIcon}
                        style={{height: 25, width: 25, tintColor: '#007AFF'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteTask(item, index)}
                      style={styles.deleteButton}>
                      <Image
                        source={DeleteIcon}
                        style={{height: 25, width: 25, tintColor: '#CF0000'}}
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
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => props.navigation.navigate('AddTask')}>
          <Text style={styles.footerText}>Yeni Görev Ekle</Text>
        </TouchableOpacity>
      </View>
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
    flex: 0.92,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 50,
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 2,
    marginTop: 20,
    width: '93%',
    alignSelf: 'center',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskDetail: {
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 13,
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
    flex: 0.15,
  },
  footer: {
    flex: 0.08,
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
});
