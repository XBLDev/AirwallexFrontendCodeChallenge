import React from 'react';
import renderer from 'react-test-renderer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
};

const functions = require('../client/src/components/functions');

const checkIfEmailsAreSame = functions.checkIfEmailsAreSame;
const checkIfEmailsValid = functions.checkIfEmailsValid;
const checkIfNameValid = functions.checkIfNameValid;


test('functions test', () => {

    expect(checkIfEmailsAreSame('123@gmail.com','123@gmail.com')).toBe(true);
    expect(checkIfEmailsAreSame('123@gmail.com','456@gmail.com')).toBe(false);
    expect(checkIfEmailsAreSame('','')).toBe(true);

    expect(checkIfEmailsValid('123@gmail.com')).toBe(true);
    expect(checkIfEmailsValid('123gmail.com')).toBe(false);
    expect(checkIfEmailsValid('@123gmail.com')).toBe(false);
    expect(checkIfEmailsValid('123gmail.com@')).toBe(false);
    expect(checkIfEmailsValid('123gmail.')).toBe(false);
    expect(checkIfEmailsValid('123gmail.c')).toBe(false);
    expect(checkIfEmailsValid('123gmail.co')).toBe(false);
    expect(checkIfEmailsValid('123gmail.o')).toBe(false);
    expect(checkIfEmailsValid('123gmail.m')).toBe(false);

    expect(checkIfNameValid('somename')).toBe(true);
    expect(checkIfNameValid('som')).toBe(true);
    expect(checkIfNameValid('sn')).toBe(false);

});
