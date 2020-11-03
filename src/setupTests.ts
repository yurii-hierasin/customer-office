// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import {configure, ReactWrapper, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from './store';
import RetailAPI from './api/retailAPI';
import AuthAPI from './api/authAPI';

configure({ adapter: new Adapter() })

export const findByTestAttr = (component: ReactWrapper | ShallowWrapper, attr: string) => {
    return component.find(`[data-test='${attr}']`);
}

export const getStore = () => {
    return configureStore({retail: new RetailAPI(), auth: new AuthAPI()})
}
