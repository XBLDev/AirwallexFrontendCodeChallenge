import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



import { combineReducers } from 'redux'
import reducer from '../client/src/components/reducer.js';


describe('App State/Redux test', () => {
  it('Test reducer: test that app state is as expected given certain inputs', () => {

    let state = {
        popUpShowing : false,
        userFullName : '',
        userEmail: '',
        EmailConfirmation: '',
        errorMsg: '',    
        sendingMsg: '',
        serverReturnedSuccess: false
    };

    //CLICK ON THE 'Request an invite' BUTTON
    state = reducer(state,{type:"reducer/SHOW_POPUP"})
    expect(state).toEqual({
    popUpShowing : true, userFullName : '', userEmail: '', 
    EmailConfirmation: '', errorMsg: '', sendingMsg: '',serverReturnedSuccess: false})

    //ENTER USERNAME 'a', gives error because its length is smaller than 3
    state = reducer(state,{type:"reducer/SET_USERNAME", value:'a'})
    state = reducer(state,{type:"reducer/CHECK_USERINFORMATION"})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'a', userEmail: '', 
    EmailConfirmation: '', errorMsg: 'User name must have at least 3 characters!', sendingMsg: '',serverReturnedSuccess: false})

    //ENTER USERNAME 'abc', gives error because username valid but email format invalid
    state = reducer(state,{type:"reducer/SET_USERNAME", value:'abc'})
    state = reducer(state,{type:"reducer/CHECK_USERINFORMATION"})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: '', 
    EmailConfirmation: '', errorMsg: 'Email format invalid!', sendingMsg: '',serverReturnedSuccess: false})

    //ENTER EMAIL 'abc@gmail.', gives error because username valid but email format invalid(email validation testing is in the function testing file)
    state = reducer(state,{type:"reducer/SET_USEREMAIL", value:'abc@gmail.'})
    state = reducer(state,{type:"reducer/CHECK_USERINFORMATION"})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.', 
    EmailConfirmation: '', errorMsg: 'Email format invalid!', sendingMsg: '',serverReturnedSuccess: false})
    
    //ENTER EMAIL 'abc@gmail.com', gives error because username valid, email format valid, but email!=confirmationEmail
    state = reducer(state,{type:"reducer/SET_USEREMAIL", value:'abc@gmail.com'})
    state = reducer(state,{type:"reducer/CHECK_USERINFORMATION"})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: '', errorMsg: 'confirmation email and user email must be the same!', sendingMsg: '',serverReturnedSuccess: false})

    //ENTER CONFIRMATION EMAIL 'abc@mail.com', gives error because username valid, email format valid, but email!=confirmationEmail
    state = reducer(state,{type:"reducer/SET_CONFIRMATIONEMAIL", value:'abc@mail.com'})
    state = reducer(state,{type:"reducer/CHECK_USERINFORMATION"})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@mail.com', errorMsg: 'confirmation email and user email must be the same!', 
    sendingMsg: '',serverReturnedSuccess: false})

    //ENTER CONFIRMATION EMAIL 'abc@gmail.com', finally passes all user information check, error message should be empty and sending message is set
    state = reducer(state,{type:"reducer/SET_CONFIRMATIONEMAIL", value:'abc@gmail.com'})
    state = reducer(state,{type:"reducer/CHECK_USERINFORMATION"})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@gmail.com', errorMsg: '', 
    sendingMsg: 'waiting for server response...', serverReturnedSuccess: false})        

    //From here the test simulates the XMLHttpRequest call and gets to the part where the request gets 2 different responses and test
    //whether the state is as expected accordingly
    let xhr = new XMLHttpRequest();
    let successMessage = 'success';
    xhr.open('POST', 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener('load', () => {
    });    

    //FAIL SERVER RESPONSE, SUCH AS SENDING THE ALREADY USED EMAIL 
    state = {
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@gmail.com', errorMsg: '', 
    sendingMsg: 'waiting for server response...', serverReturnedSuccess: false}
    xhr.open('POST', 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');
    xhr.setRequestHeader("Content-Type", "application/json");
    state = reducer(state,{type:"reducer/SEND_USERINFORMATION", value: xhr})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@gmail.com', errorMsg: '', 
    sendingMsg: 'waiting for server response...', serverReturnedSuccess: false})   
    state = reducer(state,{type:"reducer/PROCESS_REQUESTRESULT", value: 'somefailmsgfromserver'})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@gmail.com', errorMsg: 'somefailmsgfromserver', 
    sendingMsg: '', serverReturnedSuccess: false}) 

    //SUCCESS SERVER RESPONSE
    state = {
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@gmail.com', errorMsg: '', 
    sendingMsg: 'waiting for server response...', serverReturnedSuccess: false}
    xhr.open('POST', 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');
    xhr.setRequestHeader("Content-Type", "application/json");
    state = reducer(state,{type:"reducer/SEND_USERINFORMATION", value: xhr})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@gmail.com', errorMsg: '', 
    sendingMsg: 'waiting for server response...', serverReturnedSuccess: false})   

    state = reducer(state,{type:"reducer/PROCESS_REQUESTRESULT", value: 'success'})
    expect(state).toEqual({
    popUpShowing : true, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@gmail.com', errorMsg: '', 
    sendingMsg: '', serverReturnedSuccess: true})   

    //ClICK ON THE 'OK' BUTTON AND IT GOES BACK TO THE ORIGINAL PAGE
    state = reducer(state,{type:"reducer/QUIT_POPUP"})
    expect(state).toEqual({
    popUpShowing : false, userFullName : 'abc', userEmail: 'abc@gmail.com', 
    EmailConfirmation: 'abc@gmail.com', errorMsg: '', 
    sendingMsg: '', serverReturnedSuccess: true})   


})
})