function handleSignUpForm() {
    let password = document.getElementById("password");
    let confirm_password = document.getElementById("confirmPassword");

    if (password.value != confirm_password.value){
        document.getElementById("error").innerHTML = "Password and Confirm Password must be the same";
        password.focus(); 
        return false;
    }

    return true;
}

