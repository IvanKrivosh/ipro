export interface ComplActModel {
    contractId: number;       // Договор
    documentNumber: string;   // Номер документа
    documentTypeId: number;   // Тип документа
    documentTypeName: string;  // Наименование типа документа
    costTypeId: number;       // Вид затрат
    costTypeName: string;      // Наименование вид затрат
    documentDate: Date;       // Дата документа
    sum: number;              // Сумма по документу
    vat: number;              // В т.ч. НДС
    estimateText: string;    // Текст сметы
    estimateFileId: number;  // Файл сметы
    ks2Text: string;         // Текст КС-2
    ks2FileId: number;      // Файл КС-2
}
