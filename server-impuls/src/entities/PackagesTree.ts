import { tObject, tPackage, tDocuments } from '.';

export type PackagesTree = {
  packageObject: tPackage;
  objects: {
    object: tObject;
    documents: tDocuments[];
  }[];
  children: PackagesTree[];
};
