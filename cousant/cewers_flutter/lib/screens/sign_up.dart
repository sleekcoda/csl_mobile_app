import 'package:cewers_flutter/controller/signup.dart';
import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/form-field.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/custom_widgets/title.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class SignUpScreen extends StatefulWidget {
  static String route = "/signUp";
  _SignUpScreen createState() => _SignUpScreen();
}

class _SignUpScreen extends State<SignUpScreen> {
  final _signUpKey = GlobalKey<FormState>();
  TextEditingController firstname = new TextEditingController();
  TextEditingController surname = new TextEditingController();
  TextEditingController email = new TextEditingController();
  TextEditingController phone = new TextEditingController();
  TextEditingController password = new TextEditingController();
  TextEditingController confirmPassword = new TextEditingController();
  SignUpController signUpController = new SignUpController();

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      child: ListView(
        children: <Widget>[
          FormTitleText(
            text: "Sign Up",
          ),
          Form(
            key: _signUpKey,
            child: SafeArea(
              minimum: EdgeInsets.only(left: 30, right: 30),
              child: Column(
                children: fetchAllSignUpFields(context),
              ),
            ),
          ),
          Builder(
              builder: (context) => SafeArea(
                    minimum: EdgeInsets.only(top: 20),
                    child: ActionButtonBar(
                      text: "SIGN UP",
                      action: () {
                        // _signUpKey.currentState.validate();
                        if (_signUpKey.currentState.validate()) {
                          Scaffold.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Please wait..."),
                            ),
                          );
                          _signUpKey.currentState.save();
                          var payload = {
                            "user": {
                              "firstName": firstname.text,
                              "lastName": surname.text,
                              "phoneNumber": phone.text,
                              "email": email.text,
                              "password": password.text,
                              "gender": "male",
                              "userType": "citizen",
                            }
                          };
                          /**
                           * Confirm password combination
                           */
                          if (password.text == confirmPassword.text) {
                            signUpController.register(payload).then((response) {
                              /**
                               * VAlidate API Response
                               */
                              if (response.status) {
                                Navigator.pushNamed(context, "/success");
                              } else {
                                Scaffold.of(context).showSnackBar(
                                  SnackBar(
                                    backgroundColor: Colors.red,
                                    content: Text(response.data),
                                  ),
                                );
                              }
                              //Api response
                            }).catchError((onError) {
                              print("Unexpected error");
                            });
                          } else {
                            Scaffold.of(context).showSnackBar(
                              SnackBar(
                                content: Text("Password mismatch"),
                                backgroundColor: Colors.red,
                              ),
                            );
                          }
                          //Password compbination check
                        }
                      },
                    ),
                  )),
        ],
      ),
    );
  }

  List<Widget> fetchAllSignUpFields(BuildContext context) {
    return [
      SignUpFormField(this.firstname, "First name", "person.png",
          "Enter a valid first name"),
      SignUpFormField(
          this.surname, "Surname", "person.png", "Enter a valid surnme"),
      SignUpFormField(this.email, "Email Address", "envelope.png",
          "Enter a valid email address"),
      SignUpFormField(this.phone, "Phone number", "phone.png",
          "Enter a valid phone number"),
      SignUpFormField(
          this.password, "Password", "lock.png", "Enter a password", true),
      SignUpFormField(this.confirmPassword, "Confirm password", "lock.png",
          "Enter a valid password", true),
    ]
        .map(
          (field) => FormTextField(
            textFormField: TextFormField(
              controller: field.controller,
              obscureText: field.isPassword ?? false,
              decoration: formDecoration(
                  field.placeholder, "assets/icons/${field.icon}"),
              validator: (value) {
                return value.isEmpty ? field.errorMessage : null;
              },
            ),
          ),
        )
        .toList();
  }

  void dispose() {
    _signUpKey.currentState.dispose();
    firstname.dispose();
    surname.dispose();
    email.dispose();
    phone.dispose();
    password.dispose();
    confirmPassword.dispose();
    super.dispose();
  }
}

class SignUpFormField {
  final String icon;
  final String errorMessage;
  final String placeholder;
  final bool isPassword;
  final TextEditingController controller;
  SignUpFormField(
      this.controller, this.placeholder, this.icon, this.errorMessage,
      [this.isPassword]);
}
