## О проекте

**Проекте Импульс / Impuls** ~ Information Managment System -
Система управления информацией (СУИ) “Импульс” - платформа для совместной работы, которая обеспечивает взаимодействие между архитектором и стейкхолдерами, которые вносят свой вклад в модель данных проекта и заинтересованы в доступе к информации о важнейших бизнес-процессах, архитектуре программного обеспечения и ИТ-архитектуре предприятия. Потребители используют информацию, полученную из модели данных, для долгосрочного планирования, принятия решений, управления, авторизации и многого другого.

-----------------------------------------

## Установка/запуск проекта

**#1 - Деплоймент**
- сделать локальную копию проекта
``` 
git clone https://github.com/DenSakharov/impuls.git
```
- Установите NodeJs и NPM: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm  

**#2 - Конфиги проекта**
- попросить у автора конфиги проекта, в архиве
- распаковать их в корне проекта (файлы с раширением .env)
- проверить, что конфиги существуют и заполнены данными:
```
client/.env
server-impuls/.env
mongo/.env
``` 

**#3 - Установка docker-compose**
- установите Docker: https://docs.docker.com/engine/install/  
- убедиться, что в ОС установлена свежая версия docker-compose: версии ``2.26`` и выше:
``` 
docker-compose -v
    Docker Compose version v2.19.1
```
Если версия ниже, скачать актуальную версию по ссылке:
https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-Windows-x86_64.exe
и сохранить в указанную папку: 
```
C:\Program Files\Docker\cli-plugins\docker-compose.exe
``` 
- 
**#4 - Запуск проекта**
- перейти в корень проекта (там где лежит этот файлб README.MD)
- выполнить запуск:
```
docker compose -f compose.dev.yaml watch
```
При успешном зпауске, в консоли должно отобразиться:
```bash
[+] Running 3/3
 ✔ Container backend-nestjs  Started                                                                                                                                                                                               3.3s 
 ✔ Container backend-mongo   Started                                                                                                                                                                                               3.3s 
 ✔ Container frontend        Started                                                                                                                                                                                               1.8s 
Watch enabled
```

**#5 - Проверка запуска**
- открыть главную страницу проекта:
http://localhost:3000/

------------------------------------

## Контакты

Сахаров Денис
- Github: https://github.com/DenSakharov
- Discord: @denis_sakharov