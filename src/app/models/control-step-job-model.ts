export interface ControlStepJobModel {
  id: number;
  number: number;   // Номер пункта
  templateId: number;   // Шаблон контрольных этапов
  type: string;                 // Вид этапа
  isHeadString: string;         // Головной этап - Да/нет
  name: string;                 // Наименование
  minenergoName: string;        // Наименование этапов Минэнерго
  planStartDate: string;        // Планируемая дата начала
  planEndDate: string;          // Планируемая дата окончания
  factStartDate: string;        // Фактическая дата начала
  factEndDate: string;          // Фактическая дата окончания
  planCost: string;             // Планируемая стоимость без НДС
  factCost: string;             // Фактическая стоимость без НДС
  completionPercent: string;    // Процент выполнения
  documentConnection: string;    // Типы документов для связи
}

