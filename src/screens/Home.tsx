import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import TaskRepository from '../repository/TaskRepository';

export default function Home(props: any) {
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
        console.log(res);
      })
      .catch(er => {
        console.log(`Error: ${er}`);
      });
  };
  const handleDeleteTask = (index: number) => {
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
          onPress: () =>
            setTasks(prevTasks => prevTasks.filter((_, i) => i !== index)),
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
                    onPress={() => handleDeleteTask(index)}
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
                  <Text> {item.people.join(', ')}</Text>
                </Text>
              </View>
            )}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => props.navigation.navigate('AddTask', {addTask})}>
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
    width: '100%', // Kartın enini sayfanın tamamına yaymak için
    alignSelf: 'center', // Ortaya hizalamak için
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskDetail: {
    flexDirection: 'row', // Metinleri yatayda hizalamak için
    alignItems: 'center', // Metinleri ortalamak için
    fontSize: 16,
    color: '#555',
  },
  textDetail: {
    fontWeight: 'bold', // Kalın metin için
    marginRight: 5, // İki metin arasına boşluk eklemek için (isteğe bağlı)
  },
  deleteButton: {
    padding: 5,
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
