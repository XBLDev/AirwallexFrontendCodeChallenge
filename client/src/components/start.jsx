import React from 'react';
import PropTypes from 'prop-types';
const functions = require('./functions');
const checkIfEmailsAreSame = functions.checkIfEmailsAreSame;
const checkIfEmailsValid = functions.checkIfEmailsValid;
const checkIfNameValid = functions.checkIfNameValid;



class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      popUpShowing : false,
      userFullName : '',
      userEmail: '',
      EmailConfirmation: '',
      errorMsg: '',
      sendingMsg: '',
      serverReturned: false
    }      

    this.showPopUp = this.showPopUp.bind(this);
    this.onClickAnywhere = this.onClickAnywhere.bind(this);
    this.onClickQuit = this.onClickQuit.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
    this.onClickOK = this.onClickOK.bind(this);
    
  }

  componentWillMount()
  {
  }  

  componentWillUnmount() 
  {
  }

  componentDidMount() 
  {
  }        

  componentWillUpdate(nextProps, nextState)
  {
  }

  componentDidUpdate(prevProps, prevState)
  {
  }
  
  componentWillReceiveProps(nextProps)
  {
  }

  showPopUp()
  {
    console.log('showPopUp clicked');
    this.setState({serverReturned: false, errorMsg: '', sendingMsg: '', userFullName: '', userEmail: '', EmailConfirmation: ''});
    // var modal = document.getElementById('myModal');
    // modal.style.display = "block";
    this.setState({popUpShowing: true});
    
  }

  onClickAnywhere()
  {
    if(this.state.popUpShowing == true && this.state.serverReturned == true)
    {
      // var modal = document.getElementById('myModal');
      // modal.style.display = "none";
      this.setState({popUpShowing: false});
      
    }
  }

  onClickQuit()
  {
    if(this.state.popUpShowing == true)
    {
      // var modal = document.getElementById('myModal');
      // modal.style.display = "none";
      this.setState({popUpShowing: false});
      
    }
  }

  onClickOK()
  {
    if(this.state.popUpShowing == true)
    {
      // var modal = document.getElementById('myModal');
      // modal.style.display = "none";
      this.setState({popUpShowing: false});
    }    
  }

  onSendClick()
  {

    if(checkIfNameValid(this.state.userFullName) == false)
    {
      this.setState({errorMsg: 'User name must have at least 3 characters!'});
      return;
    }

    if(checkIfEmailsValid(this.state.userEmail) == false)
    {
      this.setState({errorMsg: 'Email format invalid!'});
      return;
    }

    if(checkIfEmailsAreSame(this.state.EmailConfirmation, this.state.userEmail) == false)
    {
      this.setState({errorMsg: 'confirmation email and user email has to be the same!'});
      return;
    }

    this.setState({errorMsg: ''});
    this.setState({sendingMsg: 'waiting for server response...'});

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) 
      {
          console.log(xhr.response);
          this.setState({sendingMsg: 'succeed', serverReturned: true});
      }
      if(xhr.status === 400)
      {
        this.setState({sendingMsg: JSON.parse(xhr.response).errorMessage}); 
      }
    });        

    xhr.send(JSON.stringify({name:this.state.userFullName, email:this.state.userEmail}));
  }

  onUserFullNameChange(event)
  {
    this.setState({userFullName: event.target.value});
  }

  onUserEmailChange(event)
  {
    this.setState({userEmail: event.target.value});
  }

  onConfirmationEmailChange(event)
  {
    this.setState({EmailConfirmation: event.target.value});        
  }



  render() {
    return (
    <div className="outerMostContainer" onClick={this.onClickAnywhere}>
      <div className="headerElement">
        BROCCOLI &#38; CO.
      </div>

      <div className="centerArea">
        <div className="centerAreaInner">
          <h1>A better way to enjoy every day.</h1><br/>
          <p>Be the first to know when we launch</p><br/>
          <p><button className="inviteBtn" onClick={this.showPopUp}>Request an invite</button></p>
        </div>

        <div id="myModal" className={this.state.popUpShowing == true? 'modal':'modalNotShowing'}>
          {this.state.serverReturned == false?( 
          <div className="modal-content">
             
            <span className="close" onClick={this.onClickQuit}>&times;</span>
            <h2>Request an invite</h2><br/>

              <input type="text" id="fname" name="fullname" placeholder="full name" className="inputfield" onChange={this.onUserFullNameChange.bind(this)}/><br/>
              <input type="text" id="lemail" name="myemail" placeholder="Email" className="inputfield" onChange={this.onUserEmailChange.bind(this)}/><br/>
              <input type="text" id="lconfirmemail" name="confirmemail" placeholder="Confirm Email" className="inputfield" onChange={this.onConfirmationEmailChange.bind(this)}/><br/>
              <div>{this.state.errorMsg}</div><br/>
              <div>{this.state.sendingMsg}</div><br/>

              <button onClick={this.onSendClick} className="sendBtn">Send</button>
          </div>
          ):
          (
            <div className="modal-content">
              <h2>All Done!</h2><br/>
              <button onClick={this.onClickOK} className="inviteBtn">OK</button>

            </div>    
          )
          }
        </div>
      </div>    

      <div className="footerElement">
          @ 2016 Brocroli &#38; CO. All Rights Reserved
      </div>        

    </div>  
    )      
  
  }    


}  

// App.propTypes = {
//   checkIfEmailsAreSame: PropTypes.func.isRequired,
// };


export default App
