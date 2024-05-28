import { tObjectAttributes } from './tObjectAttributes';

export interface tPackageAttributes {
    packageId: string;
    name?: string;
    parentId?: string;
    children?: tPackageAttributes[];
    objects?: tObjectAttributes[];
    projectId?: string;
}