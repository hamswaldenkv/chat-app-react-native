import {combineReducers} from 'redux';
import session from './session/index';
import settings from './settings/index';
import entities from './entities/index';

export default combineReducers({entities, session, settings});
