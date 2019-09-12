export interface RNOInfo {
  ContractId: number;   // Договор
  NumContract: string; // № Договор
  Number: string;       // Уникальный номер РНО
  CostTypeId: number;   // Вид затрат
  CostTypeName: string;   // Вид затрат
  PaymentType: string;  // Тип оплаты (аванс/погашение КЗ)
  PaymentDate: Date;    // Дата оплаты
  Sum: number;          // Сумма оплаченная
  Vat: number;          // В т.ч. НДС
}
