export interface ControlStepTitulModel {
  titulControlStepId: number; // Контрольные этапы в титуле
  controlStepJobId: number;   // Работа по контрольным этапам
  planStartDate: string;      // Планируемая дата начала
  planEndDate: string;        // Планируемая дата окончания
  pd: string; // pd
  factStartDate: string;      // Фактическая дата начала
  factEndDate: string;        // Фактическая дата окончания
  fd: string; // fd
  ot: string; // ot
  defaultReason: string;      // Основные причины невыполнения
  suggestions: string;        // Предложения по корректирующим мероприятиям по устранению отставания
  planCost: string;           // Планируемая стоимость без НДС
  factCost: string;           // Фактическая стоимость без НДС
  completionPercent: string;  // Процент выполнения
  contractId: string;         // Связь с документами
  sd: string; // sd
  jobName: string;
  jobType: string;
  jobNumber: string;
}



