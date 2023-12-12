## Goblin Game
[![Build status](https://ci.appveyor.com/api/projects/status/ch9r2cng09pmjn99?svg=true)](https://ci.appveyor.com/project/wee-owl/goblingame)

[Link to play Goblin-game](https://wee-owl.github.io/ahj_event_goblin-game)

#### Логика игры

1. Гоблин появляется в рандомной точке (набор точек фиксирован) ровно на 1 секунду.
2. Если пользователь успел за это время кликнуть на этой точке, то:
    * пользователю засчитывается +1 балл,
    * гоблин пропадает из ячейки.
3. Если пользователь пропустил 5 появлений гоблинов, то игра завершается.
