import { APPLICATION_EXPORTS_DEBUG } from '../index';
import EventBus from './event-bus';
import LastError from './last-error';


const GLOBAL_VARIABLES = {
  ...EventBus,
  ...LastError,
};
// eslint-disable-next-line no-underscore-dangle
window.__APPLICATION_GLOBAL__ = APPLICATION_EXPORTS_DEBUG ? GLOBAL_VARIABLES : undefined;

export default GLOBAL_VARIABLES;
