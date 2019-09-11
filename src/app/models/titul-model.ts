export interface TitulInfo {
  id: number;
  name: string; //Название
  number: string; //Номер титула
  statusId: string; //Статус титула
  startYear: number; //Год начала
  startMonth: number; //Месяц начала
  endYear: number; //Год окончания
  endMonth: number; //Месяц окончания
  customerId: number; //Заказчик
  performerId: number; //Исполнитель
  investmentDirectionId: number; //Направление инвестиций
  investmentSectionId: number; //Раздел ИПР
  belonging: string; //Принадлежность к важным объектам, программам
  includeCriteria: string; //Критерий включения в ИПР
  includePriority: string; //Приоритет включения
  targetProgram: string; //Целевая программа
  minenergoCriteria: string; //Критерий Минэнерго
  sociallySignificant: string; //Признак социально значимого объекта
  titulType: string; //Тип титула
  importance: string; //Степень важности
  curator: string; //Куратор
  aims: string; //Цели проекта
  problems: string; //Решаемые задачи
  address: string; //Адрес
  comments: string; //Примечания
}
