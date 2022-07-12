# NODEMOD

Это интеграция NodeJS прямо в GoldSource, нечто вроде amxmod (и моего старого luamod)

*из плюсов:*
* высокая производительность (потому что V8)
* асинхронность
* легкость (JS очень легкий, а я сделаю кучу пакетов вспомогательных)
* высокая поддержка (под nodejs есть почти все, базы данных, пакеты, API интеграции и так далее)

## Компиляция
Для компиляции требуется установленный nodejs.
```
git clone --recursive https://github.com/TheEVolk/xash3d-nodemod.git
cd xash3d-nodemod
node scripts/buildEvents.js
mkdir build && cd build
cmake ..
cmake --build . --config Debug
```

## Установка и запуск
1. Установите metamod в Ваш игровой сервер
2. Создайте в addons директорию nodemod
3. Переместите все файлы из example в addons/nodemod
4. Создайте директорию addons/nodemod/dlls
5. Переместите скомпилированный libnodemod.so в директорию addons/nodemod/dlls
6. В plugins.ini от metamod добавьте строку `linux addons/nodemod/dlls/libnodemod.so`
7. Установите npm или yarn и выполните в директории addons/nodemod команду `npm i` для npm или `yarn` для yarn
8. Вы можете писать свои скрипты в директории `addons/nodemod/src`.

## Реализованные плагины
1. blueFade - синяя подсветка экрана при убийстве
2. rampageSounds - звуки типа "monster kill"/"multi kill" и подобное. (требуется установить sounds/rampage из директории content)
3. ads - сообщения в чат с интервалом в 5 минут
4. fastdl - запускает веб-сервер с файлами из папки custom
5. welcome - приветственное сообщение

## RoadMap
1. Реализовать CBase (по оффсетам) для доступа к полям из gamedll (например, чтобы узнать контролера tank)
2. Плагин webmap с миникартой в реальном времени
3. Авторизация через базу данных
4. Создание своих энтити в ООП стиле
5. Рефакторинг
6. CI

*Большое спасибо разработчику samp-node за открытый исходный код и прекрасный пример реализации интеграции nodejs в C++ приложение*