// collection all routes
import home from './home';
import error from './error';
import installer from './installer';


export default [
  ...installer,
  ...home,
  ...error,
];
