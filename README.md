# Решение задачи

1. Для отображения было принято решение использовать библиотеку MUI
2. Для пагинации не использовалась стандартная пагинация MUI, так как API не возвращает общее количество записей.
3. Кнопка пагинации "Назад" неактивна на первой странице
4. Кнопка пагинации "Вперед" становится неактивной, если запрос вернул менее 50 записей
5. Поскольку API может возвращать дубли по id на некоторых страницах при пагинации может отображаться меньше 50 позиций.
6. При сетевой ошибке возвращается ее код и запрос повторяется.
7. Поиск возвращает все найденные позиции без пагинации
8. При ошибочно введенных данных в поля поиска поиск не выполняется, поле с ошибкой выделяется цветом
   
   Обрабатываются следующие ошибки:

   а) не указано значение поиска
   
   б) не указано название параметра поиска
   
   в) попытка поиска нечислового значения при указании параметра "price"

9) При нажатии на копку "Clear" происходит возврат к предыдущей странице пагинации

Техдолг:

Имеет смысл сделать:

1. ограничение на количество повторных попыток загрузки
2. кнопку возврата на первую страницу
3. разнести фильтрацию и постраничный вывод на разные вкладки
