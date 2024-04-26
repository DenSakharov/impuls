import  React  from 'react';
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function BreadcrumbNew() {
  return (
    <Breadcrumb aria-label="Breadcrumb project" >
      <BreadcrumbItem href="/main" icon={HiHome}>  </BreadcrumbItem>
      <BreadcrumbItem href="/Projects">Проекты и задачи</BreadcrumbItem>
      <BreadcrumbItem href="/About">О проекте</BreadcrumbItem>
    </Breadcrumb>
  );
}
