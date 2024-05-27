export interface tObjectAttributes{
    objectId: string;
    name?: string;
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
    attachments?: File[];
}