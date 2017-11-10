export const SHOW_POPUP = 'reducer/SHOW_POPUP'
export const QUIT_POPUP = 'reducer/QUIT_POPUP'
export const SET_USERNAME = 'reducer/SET_USERNAME'
export const SET_USEREMAIL = 'reducer/SET_USEREMAIL'
export const SET_CONFIRMATIONEMAIL = 'reducer/SET_CONFIRMATIONEMAIL'
export const CHECK_USERINFORMATION = 'reducer/CHECK_USERINFORMATION'
export const SEND_USERINFORMATION = 'reducer/SEND_USERINFORMATION'
export const PROCESS_REQUESTRESULT = 'reducer/PROCESS_REQUESTRESULT'

const functions = require('./functions');
const checkIfEmailsAreSame = functions.checkIfEmailsAreSame;
const checkIfEmailsValid = functions.checkIfEmailsValid;
const checkIfNameValid = functions.checkIfNameValid;
const sendRequest = functions.sendRequest;

const initialState = {
    popUpShowing : false,
    userFullName : '',
    userEmail: '',
    EmailConfirmation: '',
    errorMsg: '',

    // emailsSame: false,
    // emailFormatValid: false,
    // userNameFormatValid: false,
    
    sendingMsg: '',
    serverReturned: false
}

// let err = '';
// let send = '';
// let returned = false;

export default (state = initialState, action) => {
  switch (action.type) {

    case PROCESS_REQUESTRESULT: 
      console.log('PROCESS_REQUESTRESULT: VALUE: ', action.value);
      if(action.value == 'success')
      {
        return {
          ...state,
          sendingMsg: '',
          errorMsg: '',
          serverReturned: true,
        }       
      }
      else{
        return {
          ...state,
          sendingMsg: '',
          errorMsg: action.value,
          // serverReturned: true,
        }      
      }
      // return {
      //   ...state,
      //   sendingMsg: '',
      //   errorMsg: '',
      //   serverReturned: true,
      // }       
    case SEND_USERINFORMATION:
      if(state.sendingMsg == '')
      {
        console.log('SEND_USERINFORMATION: CHECK_USERINFORMATION FAILED');
        return {
          ...state,
        }              
      }
      else
      {
        // var err = '';
        // var send = '';
        // var returned = false;
        // console.log('SEND_USERINFORMATION: CHECK_USERINFORMATION PASSED, WAITING FOR SERVER...');
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');
        // xhr.setRequestHeader("Content-Type", "application/json");

        // xhr.onreadystatechange = function () {

        //   if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) 
        //   {
        //       console.log('SEND_USERINFORMATION: GOOD SERVER RESPONSE: ',xhr.responseText);
        //       returned = true;    
        //   }
        //   if(xhr.readyState == XMLHttpRequest.DONE && xhr.status === 400)
        //   {
        //     console.log('SEND_USERINFORMATION: BAD SERVER RESPONSE', xhr.responseText);
        //     send = '';
        //     err = JSON.parse(xhr.responseText);
        //   }
        // };

        // xhr.addEventListener('load', () => {
        // if (xhr.status === 200) 
        // {
        //     console.log('SEND_USERINFORMATION: GOOD SERVER RESPONSE: ',xhr.response);
        //     returned = true;    
        // }
        // if(xhr.status === 400)
        // {
        //   console.log('SEND_USERINFORMATION: BAD SERVER RESPONSE', xhr.response);
        //   send = '';
        //   err = JSON.parse(xhr.response).errorMessage;
        // }
        // });        
        xhr.send(JSON.stringify({name: state.userFullName, email: state.userEmail}));
        return {
          ...state,

        }        
      } 

    case CHECK_USERINFORMATION:
      if(checkIfNameValid(state.userFullName) == false)
      {
        return {
          ...state,
          errorMsg : 'User name must have at least 3 characters!',
        }          
      }
      if(checkIfEmailsValid(state.userEmail) == false)
      {
        return {
          ...state,
          errorMsg : 'Email format invalid!',
        }                  
      }
      if(checkIfEmailsAreSame(state.EmailConfirmation, state.userEmail) == false)
      {
        return {
          ...state,
          errorMsg : 'confirmation email and user email must be the same!',
        }               
      }

      return {
          ...state,
          errorMsg : '',
          sendingMsg : 'waiting for server response...',
      }      

    case SET_USEREMAIL:
      // console.log('SET_USEREMAIL: ',action.value);
      return {
        ...state,
        userEmail : action.value,
      }    

    case SET_CONFIRMATIONEMAIL:
      // console.log('SET_CONFIRMATIONEMAIL: ',action.value);
      return {
        ...state,
        EmailConfirmation : action.value,
      }    

    case SET_USERNAME:
      // console.log('SET_USERNAME: ',action.value);
      return {
        ...state,
        userFullName : action.value,
      }    

    case QUIT_POPUP:
      if(state.popUpShowing == true)
      {
        return {
          ...state,
          popUpShowing : false,
        }
      }
      else{
        return {
          ...state,
        }
      }
    case SHOW_POPUP:
      return {
          ...state,
          serverReturned: false,
          errorMsg: '',
          sendingMsg: '',
          userFullName: '',
          userEmail: '',
          EmailConfirmation: '',
          popUpShowing : true,

        }      
    default:
      return state
  }
}


export const showpopup = () => {
  return dispatch => 
  {
    dispatch({
      type: SHOW_POPUP
    })

  }
}

export const quitpopup = () => {
  return dispatch => 
  {
    dispatch({
      type: QUIT_POPUP
    })

  }
}

export const setusername = (value) => {
  return dispatch => 
  {
    dispatch({
      type: SET_USERNAME,
      value
    })

  }
}

export const setuseremail = (value) => {
  return dispatch => 
  {
    dispatch({
      type: SET_USEREMAIL,
      value
    })

  }
}

export const setconfirmationemail = (value) => {
  return dispatch => 
  {
    dispatch({
      type: SET_CONFIRMATIONEMAIL,
      value
    })

  }
}


let xhr = new XMLHttpRequest();
let successMessage = 'success';

export const senduserinformation = () => {
  return dispatch => 
  {
    dispatch({
      type: CHECK_USERINFORMATION
    })

    // dispatch({
    //   type: SEND_USERINFORMATION
    // })

    // dispatch({
    //   type: PROCESS_REQUESTRESULT
    // })

    // const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) 
        {
            console.log('SEND_USERINFORMATION: GOOD SERVER RESPONSE: ',xhr.response);
            dispatch({
              type: PROCESS_REQUESTRESULT,
              value: successMessage
            })
        }
        if(xhr.status === 400)
        {
          console.log('SEND_USERINFORMATION: BAD SERVER RESPONSE', xhr.response);
          var errmsg = JSON.parse(xhr.response).errorMessage;
          dispatch({
              type: PROCESS_REQUESTRESULT,
              value: errmsg         
          })
        }
        });        
 
    dispatch({
      type: SEND_USERINFORMATION
    })        
    // xhr.send(JSON.stringify({name: state.userFullName, email: state.userEmail}));    




  }
}

