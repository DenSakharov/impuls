import { tDocumentAttributes } from './tDocumentAttributes';
import { tObjectAttributes } from './tObjectAttributes';

export type tObjectWithDocuments = {
    object: tObjectAttributes
    documents: tDocumentAttributes[]
}
export interface tPackageAttributes {
    packageId: string;
    name?: string;
    packageType?: string;
    parentId?: string;
    children?: tPackageAttributes[];
    objects?: tObjectWithDocuments[];
    projectId?: string;
}