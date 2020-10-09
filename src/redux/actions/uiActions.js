import {CHANGE_RADIO_TAB} from '../types';

export const changeTabRadio = (tabId) => {
    return {
        type: CHANGE_RADIO_TAB,
        tabId
    }
}