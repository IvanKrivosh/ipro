export interface DogInfo {
  id: number;
  number: string; // Номер договора
  titulId: number; // Титул
  contractor: string; // Подрядчик
  subject: string; // Предмет договора
  signDate: Date;  // Дата подписания
  startDate: Date; // Дата начала работ
  endDate: Date;  // Дата окончания работ
  sum: number;    // Сумма по договору
  completedSum: number; // Выполнено
  payment: number;      // Оплата с учетом аванса и возврата
  debtor: number;       // Задолженность дебиторская
  creditor: number;     // Задолженность кредиторская
  status: string;       // Статус
}

