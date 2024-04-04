# impuls
Information Managment System
Система управления информацией (СУИ) “Импульс” - платформа для совместной работы, которая обеспечивает взаимодействие между архитектором и стейкхолдерами, которые вносят свой вклад в модель данных проекта и заинтересованы в доступе к информации о важнейших бизнес-процессах, архитектуре программного обеспечения и ИТ-архитектуре предприятия. Потребители используют информацию, полученную из модели данных, для долгосрочного планирования, принятия решений, управления, авторизации и многого другого.


Работа с Git в проекте Импульс

шаг 0 - делаю локальную копию проекта
git clone https://github.com/DenSakharov/impuls.git

шаг 1 - Начало работы
```
git status
git pull --rebase origin main
git branch
git branch develop
git checkout develop
```
шаг 2 -Комичу изменений
```
git add .
git commit -m 'Новый коммит'
git push --set-upstream origin develop
git log --oneline
```
шаг 3 - Отправляю на github
```
git checkout main
git merge develop
git push
```


Запуск проекта Импульс

шаг 0 - сделать локальную копию проекта
git clone https://github.com/DenSakharov/impuls.git

шаг 1 - устанавить плагины и зависимости
npm install
(опционально)
	npm update
	npm audit fix --force

шаг 2 - проверить запускаемый бренч
git branch
git checkout main

шаг 3 - Перейти в терминале в папку .\client в вашей рабочей директории

cd D:\impuls\client  
npm run start

шаг 4 - должна стартануть страница с логотипом реакта
 http://localhost:3000/

