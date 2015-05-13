Шаблон проекта для быстрого старта (Gulp)
=========================================

В качестве сборщика проекта используется `gulp`


- Stylus
- JS и CoffeeScript (при необходимости)
- Jade (при необходимости)
- Спрайты


## Структура
- `builder` – папка в которой лежит сборщик проекта
     + `builder/gulpfile.js` – настройки проекта
- `src` – исходные файлы проекта
     + `src/css` – файлы стилей
     + `src/js` – файлы JS/CoffeScript
     + `src/templates` – jade-шаблоны
- `built_jade` – папка создается при компиляции `jade`
- `layout` – HTML и скомпилированные файлы
     + `layout/media/images/sprites` – папка для спрайтов


## Старт проекта

### Установка
Предполагается, что у вас уже установлен `node.js` и пакетные менеджер `npm`.

Перейдите в папку `builder` и выполните команду `npm install`.

### Запуск
Все команды следует выполнять находясь в папке `builder`

- `gulp` – сборка проекта с минификацией js и css
- `gulp debug` – сборка проекта без минификации js и css. Дополнительно запускается процесс отслеживания изменений.


### Спрайты
Предусмотренно создание спрайтов для retina-экранов. Обратите внимание на следующие настройки (`builder/gulpfile.js):

```
    'sprites': {
        // 'retinaSource': dest + '/images/sprites/*@2x.png',
        // 'retinaNameSprite': 'sprite@2x.png',
        // 'retinaImgPath': '../images/sprite@2x.png'
    }
```

### Jade
По умолчанию компиляция jade-шаблонов отключена, включить можно в `builder/gulpfile.js`

```
    var built_jade = '../built',
        dest = built_jade + '/media';
    ...
    'jade': {
        'enable': true
    }
```

`layout/media` следует скопировать в папку `built` (создать, если такой папки нет).

Jade-шаблоны лежат в папке `src/templates`. Компилируются все `*.jade`.

Исключения:

-  содержимое папок `includes`
- `base.jade`

p.s. Для исключения замены HTML-файлов в папке `layout` – компиляция jade-шаблонов происходит в отдельную папку