export interface tDocumentAttributes{
    docId: string;
    docname?: string;
    packageId?: string;
    description?: string;
    priority?: string;
    author?: string;
    status?: string;
    path?: string;
    tags?: { key: string; value: string | number }[];
    links?: string[];
    type?: string;
    dateEdited: Date | string;
    dateCreated: Date | string;
    projectId?: string;
    objectId: string;
}