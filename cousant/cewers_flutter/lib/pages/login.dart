import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/form-field.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/custom_widgets/title.dart';
import 'package:cewers_flutter/model/user_auth.dart';
import 'package:flutter/material.dart';
import 'package:cewers_flutter/style.dart';

class LoginPage extends StatefulWidget {
  final String title;
  LoginPage({Key key, this.title}) : super(key: key);
  _LoginPage createState() => _LoginPage();
}

class _LoginPage extends State<LoginPage> {
  TextEditingController username;
  TextEditingController password;
  UserAuthentication auth;

  final loginFormKey = GlobalKey<FormState>();

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      displayAppBar: true,
      child: ListView(
        children: <Widget>[
          SafeArea(
            minimum: EdgeInsets.only(left: 30, right: 30),
            child: Form(
              key: loginFormKey,
              child: Column(children: <Widget>[
                FormTitleText(
                  text: "Login",
                ),
                FormTextField(
                  textFormField: TextFormField(
                    controller: username,
                    decoration:
                        formDecoration("Phone", "assets/icons/envelope.png"),
                    validator: (value) {
                      // print(value);
                      if (value.isEmpty) {
                        return 'Enter your phone number or email';
                      }
                      return null;
                    },
                    onSaved: (value) {
                      auth.setUsername = value;
                      print(auth.username);
                    },
                  ),
                ),
                FormTextField(
                  topMargin: 10,
                  bottomMargin: 30,
                  textFormField: TextFormField(
                    controller: password,
                    decoration:
                        formDecoration("Password", "assets/icons/lock.png"),
                    obscureText: true,
                    validator: (value) {
                      // print(value);
                      if (value.isEmpty) {
                        return 'Enter a valid password';
                      }
                      return null;
                    },
                    onSaved: (value) {
                      auth.setPassword = value;
                      print(auth.password);
                    },
                  ),
                )
              ]),
            ),
          ),
          SafeArea(
            minimum: EdgeInsets.only(top: 20, bottom: 30),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text("New User?"),
                GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(context, "/sign-up");
                    },
                    child: SafeArea(
                        minimum: EdgeInsets.only(left: 5),
                        child: Text("Sign Up"))),
              ],
            ),
          ),
          SafeArea(
            minimum: EdgeInsets.only(top: 20, bottom: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Image.asset("assets/icons/google.png"),
                Image.asset("assets/icons/facebook.png"),
                Image.asset("assets/icons/email.png"),
              ],
            ),
          ),
          SafeArea(
            minimum: EdgeInsets.only(top: 50),
            child: ActionButtonBar(
              text: "Login",
              action: () {
                // loginFormKey.currentState.save();

                Navigator.pushNamed(context, "/home");
              },
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    loginFormKey.currentState.dispose();
    username.dispose();
    password.dispose();
    super.dispose();
  }
}
