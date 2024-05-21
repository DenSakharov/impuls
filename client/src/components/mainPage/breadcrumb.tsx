import  React  from 'react';
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function BreadcrumbNew() {
<<<<<<< HEAD

    // условие для отображения navbarComponent
    const currentPath = window.location.pathname;
    let BreadcrumbName;

    if (currentPath === '/main') {
      BreadcrumbName = 'Дашборд'
    } else if (currentPath === '/projects') {
      BreadcrumbName = 'Проекты и задачи'
    } else if (currentPath === '/TableData') {
      BreadcrumbName = 'История согласований'
    } else if (currentPath === '/report') {
      BreadcrumbName = 'Отчеты'
    } else if (currentPath === '/searchpage') {
      BreadcrumbName = 'Расширенный поиск'
    } else if (currentPath === '/documents') {
      BreadcrumbName = 'Текстовый редактор'
    } else if (currentPath === '/integration') {
      BreadcrumbName = 'Импорт и экспорт данных'
    } else if (currentPath === '/admin') {
      BreadcrumbName = 'Администрирование'
    }
    else {
      BreadcrumbName = 'Дашборд'
    }

  return (
    <Breadcrumb aria-label="Breadcrumb project" >
      <BreadcrumbItem href="/main" icon={HiHome}> </BreadcrumbItem>
      <BreadcrumbItem href="/main"> {BreadcrumbName} </BreadcrumbItem>      
=======
  return (
    <Breadcrumb aria-label="Breadcrumb project" >
      <BreadcrumbItem href="/main" icon={HiHome}>  </BreadcrumbItem>
      <BreadcrumbItem href="/main">Дашборд</BreadcrumbItem>
      <BreadcrumbItem href="/Projects">Проекты и задачи</BreadcrumbItem>
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
    </Breadcrumb>
  );
}
