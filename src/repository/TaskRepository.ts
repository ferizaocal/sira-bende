import firestore from '@react-native-firebase/firestore';
import Collection from '../firebase/Collection';
import TaskModel from '../models/TaskModel';
import PersonModel from '../models/PersonModel';
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
    return this.taskCollection.doc(docId).set(task);
  }
  async getTasks(): Promise<TaskModel[]> {
    let taskSnapShot = await this.taskCollection.get();
    return taskSnapShot.docs.map(doc => doc.data() as TaskModel);
  }
  public async deleteTask(task: TaskModel): Promise<void> {
    try {
      await this.taskCollection.doc(task.id).delete();
    } catch (error) {
      console.error('Görev silme hatası:', error);
      throw error;
    }
  }
  public async updateTask(task: TaskModel): Promise<void> {
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
