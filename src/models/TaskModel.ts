import PersonModel from './PersonModel';

interface TaskModel {
  id?: string;
  taskName: string;
  selectedDate: string;
  selectedPeriod: string;
  people: PersonModel[];
}
export default TaskModel;

// 1 görev oluşturdun. 3 kişi ekledin. bu 3 kişiye link paylaştın.
// 1.ci kişsi uygulamaya indirdi ve senin linke tıkladı. Uygulamaya yönlendirdi.
// Bu kişinin task kontrolü yapman gerekiyor(fonskiyon). Bu adam bu göreve hala eklimi ? ekliyse taski göster?

// Bu kişinin task kontrolü yapman gerekiyor.(fonksiyon)  cevabı yukarıdaki soru işareti tamamlanınca gelicek.
