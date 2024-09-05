import PersonModel from './PersonModel';

interface TaskModel {
  id?: string;
  taskName: string;
  selectedDate: string;
  selectedPeriod: string;
  people: PersonModel[];
}
export default TaskModel;
