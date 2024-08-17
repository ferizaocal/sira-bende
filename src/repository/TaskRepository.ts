import firestore from '@react-native-firebase/firestore';
import Collection from '../firebase/Collection';
import TaskModel from '../models/TaskModel';
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
}
export default TaskRepository;
