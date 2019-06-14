import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';

global.console.error = message => {
  throw message;
};

global.console.warn = message => {
  throw message;
};

configure({ adapter: new Adapter() });
