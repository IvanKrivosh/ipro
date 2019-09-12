export interface ObjectModel {
    id: number;
    name: string;     // Наименование
    number: number;   // Инвентарный номер
    titulId: number;  // Титул
    objectType: string; // Тип объекта
    objectKind: string; // Вид объекта
    physicalDeterioration: number;  // Физический износ
    accountingDeterioration: number; // Бухгалтерский износ
    comments: string; // Примечания
}
