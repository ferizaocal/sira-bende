import firestore from '@react-native-firebase/firestore';
import Collection from '../firebase/Collection';
import TaskModel from '../models/TaskModel';
import PersonModel from '../models/PersonModel';
import auth from '@react-native-firebase/auth';
class TaskRepository {
  private static instance: TaskRepository;
  private taskCollection = firestore().collection(Collection.TASKS);

  public static getInstance(): TaskRepository {
    if (!TaskRepository.instance) {
      TaskRepository.instance = new TaskRepository();
    }
    return TaskRepository.instance;
  }
  private constructor() {}

  async addTask(task: TaskModel) {
    const docId = this.taskCollection.doc().id;
    task.id = docId;

    const userId = auth().currentUser?.uid;
    if (userId) {
      task.userId = userId;
      return this.taskCollection.doc(docId).set(task);
    } else {
      throw new Error('User is not authenticated');
    }
  }

  async getTasks(): Promise<TaskModel[]> {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      throw new Error('User is not authenticated');
    }

    let taskSnapShot = await this.taskCollection
      .where('userId', '==', userId)
      .get();
    return taskSnapShot.docs.map(doc => doc.data() as TaskModel);
  }

  async deleteTask(task: TaskModel): Promise<void> {
    try {
      await this.taskCollection.doc(task.id).delete();
    } catch (error) {
      console.error('Görev silme hatası:', error);
      throw error;
    }
  }

  async updateTask(task: TaskModel): Promise<void> {
    try {
      if (!task.id) {
        throw new Error("Güncellenecek görevin bir ID'si olmalı");
      }
      await this.taskCollection.doc(task.id).update(task);
    } catch (error) {
      console.error('Görev güncelleme hatası:', error);
      throw error;
    }
  }

  async deletePersonFromTask(taskName: string, id: string): Promise<void> {
    try {
      const taskRef = this.taskCollection
        .where('taskName', '==', taskName)
        .limit(1);

      const taskSnapshot = await taskRef.get();

      if (!taskSnapshot.empty) {
        const taskDoc = taskSnapshot.docs[0];
        const taskData = taskDoc.data();

        const updatedPeople = taskData.people.filter(
          (person: PersonModel) => person.id !== id,
        );

        await taskDoc.ref.update({people: updatedPeople});
      }
    } catch (error) {
      console.error('Kişi silme hatası:', error);
      throw error;
    }
  }
}
export default TaskRepository;
