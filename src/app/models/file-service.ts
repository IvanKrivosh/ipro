export interface FileInfo {
    id: number;
    uid: string;       // Наименование
    name: string;       // Наименование
    documentId: number;
    path: string;       // Путь в файловой системе
    createdAt: Date;
}
