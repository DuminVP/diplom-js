// 8 хранилилище . здесь создается хранилище, куда передаются сами компоненты
import { createStore, applyMiddleware } from 'redux' // 9 добавляем из https://rajdee.gitbooks.io/redux-in-russian/content/docs/api/createStore.html
//  12 applyMiddleware для слежения за всеми изменениями

import logger from 'redux-logger'; // 16 пробрасывает при созданеии любого хранилища
// следит за всеми  экшенами  и изменениями которые произошли в хранилище

import rootReducer from './redusers';
// чтобы несколько редюсеров обьединялись в один редюсер и возвращать новое состояние

export default () => { // 16 метод , который будет создавать хранилище и возвращать его нам в провайдер
    const store = createStore(rootReducer, applyMiddleware(logger));
    return store;
};