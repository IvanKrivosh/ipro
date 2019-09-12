export interface ComplActModel {
    ContractId: number;       // Договор
    DocumentNumber: string;   // Номер документа
    DocumentTypeId: number;   // Тип документа
    DocumentTypeName: string;   // Наименование типа документа
    CostTypeId: number;       // Вид затрат
    CostTypeName: string;      // Наименование вид затрат
    DocumentDate: Date;       // Дата документа
    Sum: number;              // Сумма по документу
    Vat: number;              // В т.ч. НДС
}
