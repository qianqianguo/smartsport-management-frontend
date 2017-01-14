export default function clientMiddleware(request) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, request, getState);
      } else {
        return next(action);
      }
      
      // TODO
      // const { promise, type, types, ...rest } = action; // eslint-disable-line no-redeclare
      // if (!promise) {
      //   return next(action);
      // }
      
      // let actionPromise = null;
      // if (!types && promise){
      //   actionPromise = promise(request, dispatch, getState);
      //   return actionPromise;
      // }
      //
      // const [REQUEST, SUCCESS, FAILURE] = types;
      // next({...rest, type: REQUEST});
      //
      // actionPromise = promise(request);
      // actionPromise.then(
      //   (result) => next({...rest, result, type: SUCCESS}),
      //   (error) => next({...rest, error, type: FAILURE})
      // ).catch((error)=> {
      //   console.error('MIDDLEWARE ERROR:', error);
      //   next({...rest, error, type: FAILURE});
      // });
      //
      // return actionPromise;
    };
  };
}
