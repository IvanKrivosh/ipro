export interface DocInfo {
  id: number;
  number: string; // Номер документа
  date: Date;       // Дата документа
  documentTypeId: number; // id Тип документа
  documentTypeName: string; // Тип документа
  description: string;   // Описание
  titulId: number; // Титул
  numberTitul: string; // № титула
  departmentId: number; // Подразделение, составившее документ
  departmentName: string; // Подразделение, составившее документ
  filePath: string;     // Путь к основному файлу
  sum: number;       // Сумма документа
  vatPercentId: number; // Процент НДС
  vat: number; // Значение процента НДС
  isClosed: boolean;    // Признак "Закрыт"
  comments: string;      // Примечания
  documentKindId: number; // Вид документа
  idFile: number;       // ID файла
  stringKey: string;    // ключ Рутокена
  mainFileName: string; // Наименование файла
}
