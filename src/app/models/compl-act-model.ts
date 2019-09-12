export interface ComplActModel {
    ContractId: number;       // Договор
    DocumentNumber: string;   // Номер документа
    DocumentTypeId: number;   // Тип документа
    DocumentTypeName: string;  // Наименование типа документа
    CostTypeId: number;       // Вид затрат
    CostTypeName: string;      // Наименование вид затрат
    DocumentDate: Date;       // Дата документа
    Sum: number;              // Сумма по документу
    Vat: number;              // В т.ч. НДС
    EstimateText: string;    // Текст сметы
    EstimateFileId: number;  // Файл сметы
    Ks2Text: string;         // Текст КС-2
    Ks2FileId: number;      // Файл КС-2
}
