# impuls
Information Managment System
Система управления информацией (СУИ) “Импульс” - платформа для совместной работы, которая обеспечивает взаимодействие между архитектором и стейкхолдерами, которые вносят свой вклад в модель данных проекта и заинтересованы в доступе к информации о важнейших бизнес-процессах, архитектуре программного обеспечения и ИТ-архитектуре предприятия. Потребители используют информацию, полученную из модели данных, для долгосрочного планирования, принятия решений, управления, авторизации и многого другого.

шаг 0 - делаю локальную копию проекта
git clone https://github.com/DenSakharov/impuls.git

шаг 1 - Начало работы
git status
git pull --rebase origin main
git branch
git branch develop
git checkout develop

шаг 2 -Комичу изменений 
git add .
git commit -m 'Новый коммит'
git push --set-upstream origin develop
git log --oneline

шаг 3 - Отправляю на github
git checkout main
git merge develop
git push
