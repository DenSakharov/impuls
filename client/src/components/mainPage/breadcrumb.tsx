import  React  from 'react';
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function BreadcrumbNew() {

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
    </Breadcrumb>
  );
}
