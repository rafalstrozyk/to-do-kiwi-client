import {CHANGE_RADIO_TAB, LOADING_UI} from '../types';

export const changeTabRadio = (tabId) => {
    return {
        type: CHANGE_RADIO_TAB,
        tabId
    }
}