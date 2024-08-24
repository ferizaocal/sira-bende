import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Task,
} from 'react-native';
import Header from '../components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import TaskRepository from '../repository/TaskRepository';
import TaskModel from '../models/TaskModel';
import PersonModel from '../models/PersonModel';

export default function Home(props: any, EditTask: any, AddTask: any) {
  const [tasks, setTasks] = useState<any[]>([]);
  const taskRepo = TaskRepository.getInstance();

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadTasks();
    });
  }, []);
  const addTask = (task: any) => {
    console.log(task);
    setTasks(prevTasks => [...prevTasks, task]);
  };
  const loadTasks = () => {
    taskRepo
      .getTasks()
      .then(res => {
        setTasks(res);
        console.log(res);
      })
      .catch(er => {
        console.log(`Error: ${er}`);
      });
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
              // id için sadece deleteTask(id:string) olması gerekiyor sen direk modeli istemişssin fakat deleteTask(task.id) yazmışssın o yüzden
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

  return (
    <View style={styles.container}>
      <Header title="Hoşgeldiniz" />

      <View style={styles.content}>
        {tasks.length === 0 ? (
          <Text style={styles.text}>
            Yeni bir görev eklemek için aşağıdaki butona tıklayınız!
          </Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <Text style={styles.taskName}>{item.taskName}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('EditTask', {task: item})
                    }
                    style={styles.editButton}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size={20}
                      color="#4F79AD"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteTask(item, index)}
                    style={styles.deleteButton}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size={20}
                      color="#4F79AD"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.taskDetail}>
                  <Text style={styles.textDetail}>Başlangıç Tarihi: </Text>
                  <Text>{item.selectedDate}</Text>
                </Text>
                <Text style={styles.taskDetail}>
                  <Text style={styles.textDetail}>Aralık Tipi: </Text>
                  <Text> {item.selectedPeriod}</Text>
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
            )}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => props.navigation.navigate('AddTask', {AddTask})}>
        <Text style={styles.footerText}>Yeni Görev Ekle</Text>
      </TouchableOpacity>
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
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 330,
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  taskName: {
    flex: 1, // Bu, metnin butonların geri kalan alanı kaplamasını sağlar
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 17,
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
    marginLeft: 100, // Butonlar arasında boşluk
  },
  editButton: {
    marginLeft: 60, // Butonlar arasında boşluk
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
    color: '#F5EDED',
    fontWeight: 'bold',
  },
});
