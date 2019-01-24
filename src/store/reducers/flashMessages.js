import {ADD_FLASH_MESSAGE, APPEND_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from "../actions/types";
import shortid from 'shortid';

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return[
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case APPEND_FLASH_MESSAGE:
            return[
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const filter = state.filter(ele=> ele.id !== action.id );
            return filter;
        default: return state;
    }

}