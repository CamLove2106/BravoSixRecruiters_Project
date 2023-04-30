const firebaseConfig = {
    apiKey: "AIzaSyAJAxFD46Lh2p-0OtOig0Y_bkHDDmniK1Y",
    authDomain: "bravosixrecruiters.firebaseapp.com",
    projectId: "bravosixrecruiters",
    storageBucket: "bravosixrecruiters.appspot.com",
    messagingSenderId: "720453785669",
    appId: "1:720453785669:web:414c75c6c66b2d8e99ab2c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Variables
  const auth = firebase.auth()
  const database = firebase.database()

  //setting up the register function
  function register () {
    email = document.getElementById('emailAddress').value
    password = document.getElementById('pwd').value
    full_name = document.getElementById('full_name').value
    password_repeat = document.getElementById('pwdRepeat').value
  

  //Validate input fields 
  if (validate_email(email)== false || validate_password(password)== false) {
    alert('Email or password is wrong')
    return
  }
  if (validate_field(full_name) == false) {
    alert('Name is not entered!')
  }

  //Register user 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser
    
    var database_ref = database.ref()

    var user_data = {
        email :email,
        full_name : full_name,
        last_login : Date.now()
    }

    database_ref.child ('users/' + user.uid).set(user_data)


    alert('User Created')
  })
  .catch(function name(params) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
    
  })
  }

  
  function validate_email() {
    expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);
    if (expression.text(email) == true) {
        //Email is good
        return true
    }else{
        //Email is not good 
        return false
    }
  }

  //Validate password 
  function validate_password (password) {
    //Firebase needs passwords longer then 6 characters
    if (password < 6) {
        return false
    }else{
        return true
    }
  }

  function validate_field(field) {
    if (field == null) {
        return false 
    }
    if (field.length <= 0) {
        return false
    }else{
        return true
    }
  }