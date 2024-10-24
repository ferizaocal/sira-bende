import PersonModel from './PersonModel';

interface TaskModel {
  userId?: string;
  id?: string;
  taskName: string;
  selectedDate: string;
  selectedEndDate: string;
  selectedPeriod: string;
  people: PersonModel[];
}
export default TaskModel;
