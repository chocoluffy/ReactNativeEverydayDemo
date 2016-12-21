import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
import devTools from 'remote-redux-devtools';

// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
	// const store = createStoreWithMiddleware(rootReducer, initialState);

	// return store;

	const enhancer = compose(
    	applyMiddleware(thunkMiddleware),
    	devTools()
 	);
  	// Note: passing enhancer as last argument requires redux@>=3.1.0
  	return createStore(rootReducer, initialState, enhancer);
}
