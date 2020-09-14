import {ADD_TAB,
ADD_TODO} from '../types';

export const addTab = (tab) => {
    return {
        type: ADD_TAB,
        tab
    }
} 

export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}