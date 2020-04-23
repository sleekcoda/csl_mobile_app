import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/form-field.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/custom_widgets/title.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class SignUpPage extends StatefulWidget {
  _SignUpPage createState() => _SignUpPage();
}

class _SignUpPage extends State<SignUpPage> {
  final signUpKey = GlobalKey<FormState>();
  TextEditingController firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword;
  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      displayAppBar: true,
      child: ListView(
        children: <Widget>[
          FormTitleText(
            text: "Sign Up",
          ),
          Form(
            autovalidate: true,
            key: signUpKey,
            child: SafeArea(
              minimum: EdgeInsets.only(left: 30, right: 30),
              child: Column(
                children: <Widget>[
                  FormTextField(
                    textFormField: TextFormField(
                      controller: firstname,
                      decoration: formDecoration(
                          "First name", "assets/icons/person.png"),
                    ),
                  ),
                  FormTextField(
                    textFormField: TextFormField(
                      controller: lastname,
                      decoration:
                          formDecoration("Surname", "assets/icons/person.png"),
                    ),
                  ),
                  FormTextField(
                    textFormField: TextFormField(
                      controller: email,
                      decoration: formDecoration(
                          "Email Address", "assets/icons/envelope.png"),
                    ),
                  ),
                  FormTextField(
                    textFormField: TextFormField(
                      controller: phone,
                      decoration: formDecoration(
                          "Phone number", "assets/icons/phone.png"),
                    ),
                  ),
                  FormTextField(
                    textFormField: TextFormField(
                      controller: password,
                      decoration:
                          formDecoration("Password", "assets/icons/lock.png"),
                    ),
                  ),
                  FormTextField(
                    bottomMargin: 30,
                    textFormField: TextFormField(
                      controller: confirmPassword,
                      decoration: formDecoration(
                          "Confirm Password", "assets/icons/lock.png"),
                    ),
                  ),
                  Text("By pressing 'Sign Up' you agree to our"),
                  Text(
                    "terms and conditions",
                    style: TextStyle(color: Colors.yellow),
                  )
                ],
              ),
            ),
          ),
          SafeArea(
            minimum: EdgeInsets.only(top: 20),
            child: ActionButtonBar(
              text: "SIGN UP",
              action: () {
                signUpKey.currentState.save();
                Navigator.pushNamed(context, "/success");
              },
            ),
          ),
        ],
      ),
    );
  }

  void dispose() {
    signUpKey.currentState.dispose();
    firstname.dispose();
    lastname.dispose();
    email.dispose();
    phone.dispose();
    password.dispose();
    confirmPassword.dispose();
    super.dispose();
  }
}
