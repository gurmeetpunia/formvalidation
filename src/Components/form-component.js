import React from "react";
import countryCodes from "./countryCodes.json";
import statesNames from "./statesNames.json";

const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      countryCode: "+91",
      countryName: "India",
      phoneNumber:"",
      statesName:"Rajasthan",
      panCardNumber:"",
      aadhaarNumber:"",
      emailAddress: "",
      password: "",
      passwordConfirmation: "",
      firstNameError: "",
      emailAddressError: "",
      passwordError: "",
      passwordConfirmationError: "",
      isFormSubmitted: false,
      showEmailAddress: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
    this.validateUserName = this.validateUserName.bind(this);
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
    this.validatePanCardNumber = this.validatePanCardNumber.bind(this);
    this.validateAadhaarNumber = this.validateAadhaarNumber.bind(this);
    this.validateEmailAddress = this.validateEmailAddress.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    return;
  }

  handleBlur(event) {
    const { name } = event.target;

    this.validateField(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formFields = [
      "firstName",
      "lastName",
      "userName",
      "phoneNumber",
      "panCardNumber",
      "aadhaarNumber",
      "emailAddress",
      "password",
      "passwordConfirmation"
    ];
    let isValid = true;
    formFields.forEach(field => {
      isValid = this.validateField(field) && isValid;
    });

    if (isValid) this.setState({ isFormSubmitted: true });
    else this.setState({ isFormSubmitted: false });

    return this.state.isFormSubmitted;
  }

  validateField(name) {
    let isValid = false;

    if (name === "firstName") isValid = this.validateFirstName();
    else if (name === "lastName") isValid = this.validateLastName();
    else if (name === "userName") isValid = this.validateUserName();
    else if (name === "phoneNumber") isValid = this.validatePhoneNumber();
    else if (name === "panCardNumber") isValid = this.validatePanCardNumber();
    else if (name === "aadhaarNumber") isValid = this.validateAadhaarNumber();
    else if (name === "emailAddress") isValid = this.validateEmailAddress();
    else if (name === "password") isValid = this.validatePassword();
    else if (name === "passwordConfirmation")
      isValid = this.validatePasswordConfirmation();
    return isValid;
  }

  validateFirstName() {
    let firstNameError = "";
    const value = this.state.firstName;
    if (value.trim() === "") firstNameError = "First Name is required";

    this.setState({
      firstNameError
    });
    return firstNameError === "";
  }

  validateLastName() {
    let lastNameError = "";
    const value = this.state.lastName;
    if (value.trim() === "") lastNameError = "Last Name is required";

    this.setState({
      lastNameError
    });
    return lastNameError === "";
  }
  validateUserName() {
    let userNameError = "";
    const value = this.state.userName;
    if (value.trim() === "") userNameError = "User Name is required";

    this.setState({
      userNameError
    });
    return userNameError === "";
  }
  validatePhoneNumber() {
    let phoneNumberError = "";
    const value = this.state.phoneNumber;
    if (value.trim() === "") phoneNumberError = "Phone Number is required";
  
    this.setState({
      phoneNumberError
    });
    return phoneNumberError === "";
  }

  validatePanCardNumber() {
    let panCardNumberError = "";
    const value = this.state.panCardNumber;
    if (value.trim() === "") panCardNumberError = "PAN Card Number is required";

    this.setState({
      panCardNumberError
    });
    return panCardNumberError === "";
  }

  validateAadhaarNumber() {
    let aadhaarNumberError = "";
    const value = this.state.aadhaarNumber;
    if (value.trim() === "") aadhaarNumberError = "Aadhaar Number is required";

    this.setState({
      aadhaarNumberError
    });
    return aadhaarNumberError === "";
  }

  validateEmailAddress() {
    let emailAddressError = "";
    const value = this.state.emailAddress;
    if (value.trim === "") emailAddressError = "Email Address is required";
    else if (!emailValidator.test(value))
      emailAddressError = "Email is not valid";

    this.setState({
      emailAddressError
    });
    return emailAddressError === "";
  }

  validatePassword() {
    let passwordError = "";
    const value = this.state.password;
    if (value.trim === "") passwordError = "Password is required";
    else if (!passwordValidator.test(value))
      passwordError =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

    this.setState({
      passwordError
    });
    return passwordError === "";
  }

  validatePasswordConfirmation() {
    let passwordConfirmationError = "";
    if (this.state.password !== this.state.passwordConfirmation)
      passwordConfirmationError = "Password does not match Confirmation";

    this.setState({
      passwordConfirmationError
    });
    return passwordConfirmationError === "";
  }
  toggleEmailVisibility = () => {
    this.setState(prevState => ({
      showEmailAddress: !prevState.showEmailAddress
    }));
  };

  handleCountryChange = (event) => {
    const selectedCountry = countryCodes.find(
      (country) => country.code === event.target.value
    );
    this.setState({
      countryCode: selectedCountry.code,
      countryName: selectedCountry.name
    });
  };

  
  handleStatesChange = (event) => {
    const selectedState = statesNames.find(
      (state) => state.name === event.target.value
    );
    this.setState({ 
      statesName: selectedState.name });
  };

  render() {
    return (
      <div className="main">
        <h3>SignUp Form</h3>
        {this.state.isFormSubmitted ? (
          <div className="details">
            <h3>Thanks for signing up, find your details below:</h3>
            <div>First Name: {this.state.firstName}</div>
            <div>Last Name: {this.state.lastName}</div>
            <div>Phone Number: {this.state.phoneNumber}</div>
            <div>PanCard Number: {this.state.panCardNumber}</div>
            <div>Aadhaar Number: {this.state.aadhaarNumber}</div>
            <div>
              Email Address:{" "}
              {this.state.showEmailAddress
                ? this.state.emailAddress
                : "*****"}
              <button onClick={this.toggleEmailVisibility}>
                {this.state.showEmailAddress ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.firstNameError && (
                <div className="errorMsg">{this.state.firstNameError}</div>
              )}
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.lastNameError && (
                <div className="errorMsg">{this.state.lastNameError}</div>
              )}
              <input
                type="text"
                placeholder="User Name"
                name="userName"
                value={this.state.userName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.userNameError && (
                <div className="errorMsg">{this.state.userNameError}</div>
              )}
              <br />
              <select 
                value={this.state.countryCode}
                onChange={this.handleCountryChange}>
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} {country.code}
                  </option>
                ))}
              </select>
              <br />
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.phoneNumberError && (
                <div className="errorMsg">{this.state.phoneNumberError}</div>
              )}
              <br />
                <div className="statename">
                  <select 
                    value={this.state.statesName}
                    onChange={this.handleStatesChange}>
                    {statesNames.map((state) => (
                      <option key={state.name}>
                        {state.name}
                    </option>
                    ))}
                  </select>
                </div>
              <br />
              <input
                type="tel"
                placeholder="PAN Card Number"
                name="panCardNumber"
                value={this.state.panCardNumber}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.panCardNumberError && (
                <div className="errorMsg">{this.state.panCardNumberError}</div>
              )}
              <input
                type="tel"
                placeholder="AadhaarNumber"
                name="aadhaarNumber"
                value={this.state.aadhaarNumber}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.aadhaarNumberError && (
                <div className="errorMsg">{this.state.aadhaarNumberError}</div>
              )}
              
              <input
                type="email"
                placeholder="Email Address"
                name="emailAddress"
                value={this.state.emailAddress}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.emailAddressError && (
                <div className="errorMsg">{this.state.emailAddressError}</div>
              )}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.passwordError && (
                <div className="errorMsg">{this.state.passwordError}</div>
              )}
              <input
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.passwordConfirmationError && (
                <div className="errorMsg">
                  {this.state.passwordConfirmationError}
                </div>
              )}
              <button>Signup</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default FormComponent;