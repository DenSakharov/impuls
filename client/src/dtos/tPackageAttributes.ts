import { tDocumentAttributes } from './tDocumentAttributes';
import { tObjectAttributes } from './tObjectAttributes';

export interface tPackageAttributes {
    packageId: string;
    name?: string;
    parentId?: string;
    children?: tPackageAttributes[];
    objects?: {
        object: tObjectAttributes
        documents: tDocumentAttributes[]
    }[];
    projectId?: string;
}