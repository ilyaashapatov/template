Шаблон для быстрого старта проекта (Gulp)
=========================================

Сделано на основе [HTML-template 2x2][1], автор [Alexandr Aslanov][2]

В качестве сборщика проекта используется `gulp`

- Stylus
- JS и CoffeeScript (при необходимости)
- шаблонизатор Swig (при необходимости)
- Спрайты


## Структура
```
    |--/build  // каталог релиза
       |--/assets  //каталог статика
          |--/css
          |--/js
          |--/uploads
          |--/images
             |--/sprites  // папка для спрайтов
    |--/source  // исходные файлы статики
        |--/css  // файлы стилей
        |--/js  // файлы JS/CoffeScript
    |--/templates  // каталог swig-шаблонов
    |--/utils  // вспомогательные файлы для сборки
```


## Старт проекта

### Установка
Предполагается, что у вас уже установлен `node.js` и пакетный менеджер `npm`.

Выполните команду `npm install`.

### Запуск
- `gulp` – сборка проекта с минификацией js и css
- `gulp start` – сборка проекта без минификации js и css. Дополнительно запускается процесс отслеживания изменений.
- `gulp zip` – упаковка содержимого папки `dist` в архив. Архив создается в корне проекта
~~`gulp deploy` – заливает содержимое папки `dist` на сервер по ftp~~


### Спрайты
Предусмотренно создание спрайтов для retina-экранов. Обратите внимание на следующие настройки (`gulpfile.js):
по умолчанию эта опция отключена

```
    'sprites': {
        // code ...
        supportRetina: false,
        retinaSource: assets + '/images/sprites/*@2x.png',
        retinaNameSprite: 'sprite@2x.png',
        retinaImgPath: '../images/sprite@2x.png'
    }
```

### Swig шаблоны
По умолчанию компиляция swig-шаблонов включена, выключить можно в `gulpfile.js`

```
    var built_swig = 'templates';
    ...
    'swig': {
        'enable': true
    }
```

Swig шаблоны лежат в папке `templates`. Компилируются все `*.html`.

Исключения:

-  содержимое папок `includes`
- `base.html`

[1]: <https://github.com/trolev/html-template-2x2>  "HTML-template 2x2"
[2]: <https://github.com/trolev>  "Alexandr Aslanov"
