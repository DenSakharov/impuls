## О проекте

**Проекте Импульс / Impuls** ~ Information Managment System -
Система управления информацией (СУИ) “Импульс” - платформа для совместной работы, которая обеспечивает взаимодействие между архитектором и стейкхолдерами, которые вносят свой вклад в модель данных проекта и заинтересованы в доступе к информации о важнейших бизнес-процессах, архитектуре программного обеспечения и ИТ-архитектуре предприятия. Потребители используют информацию, полученную из модели данных, для долгосрочного планирования, принятия решений, управления, авторизации и многого другого.

-----------------------------------------

## Предарительные требования
Для корректной работы системы, в ОС должны быть установлены программы следующих версий: 
- NodeJs: 20.13  ~ https://nodejs.org/en/
- Docker-Compose: v2.27.0 ~ https://docs.docker.com/engine/install/
- npm: 6.14.4 ~ https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Проверка соотв. установленных в ОС версий: 
```
node -v
docker-compose -v
npm -v
```

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

**#3 - Установка зависимостей**
- Установить во все директории проекта ``/node_modules``:
```
cd /client 
npm i

cd /server-impuls  
npm i

cd /mongo 
npm i
```

**#4 - Запустить клиент (фронтенд)**
```
cd client
npm run start
```

Вывод при успешном запуске:
```
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.56.1:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
No issues found.
```

**#5 - Запустить сервер (бекенд)**
```
cd server-impuls
npm run start:dev
```

Вывод при успешном запуске:
```
> server-impuls@0.0.1 start
> nest start

[Nest] 15160  - 21.05.2024, 23:39:34     LOG [NestFactory] Starting Nest application...
[Nest] 15160  - 21.05.2024, 23:39:35     LOG [InstanceLoader] PassportModule dependencies initialized +155ms
[Nest] 15160  - 21.05.2024, 23:39:35     LOG [InstanceLoader] ConfigHostModule dependencies initialized +2ms
....
Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 't_secuser'
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 't_secuser' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 't_documents'
[Nest] 15160  - 21.05.2024, 23:39:35     LOG [InstanceLoader] databaseModule dependencies initialized +306ms
[Nest] 15160  - 21.05.2024, 23:39:35     LOG [RoutesResolver] AppController {/app}: +9ms
[Nest] 15160  - 21.05.2024, 23:39:35     LOG [RouterExplorer] Mapped {/app/helloWorld, GET} route +1ms
....
[Nest] 15160  - 21.05.2024, 23:39:35     LOG [NestApplication] Nest application successfully started +3ms
```

**#6 - Запустить БД MongoDB**
```
cd mongo
npm run start
```

Вывод при успешном запуске:
```
> server@1.0.0 start
> node server.js

turning on cors on http://78.107.235.216
connection success
```

**#7 - Проверка запуска**
- открыть главную страницу проекта:
http://localhost:3000/

------------------------------------

## Запуск проекта через docker-compose

Вместо команд 4-6 выше можно выаполнить одну: 

**Установка docker-compose**
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

**Запуск проекта**
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

------------------------------

## Контакты

Сахаров Денис
- Github: https://github.com/DenSakharov
- Discord: @denis_sakharov