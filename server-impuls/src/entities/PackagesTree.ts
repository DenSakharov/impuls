import { tObject, tPackage } from '.';

export type PackagesTree = {
  packageObject: tPackage;
  objects: tObject[];
  children: PackagesTree[];
};
