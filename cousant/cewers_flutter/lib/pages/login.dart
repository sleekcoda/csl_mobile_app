import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/cewer_title.dart';
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
      decoration: BGCloudCircleDecoration,
      displayAppBar: true,
      child: SafeArea(
        child: Builder(
          builder: (context) => SafeArea(
              left: true,
              right: true,
              minimum: EdgeInsets.only(left: 27, right: 27),
              child: ListView(
                children: <Widget>[
                  SafeArea(
                    minimum: EdgeInsets.only(
                        top: (MediaQuery.of(context).size.height - 750)),
                    child: TitleText(
                      text: "Login",
                    ),
                  ),
                  Container(
                    child: Form(
                      key: loginFormKey,
                      child: Column(children: <FormTextField>[
                        FormTextField(
                          textFormField: TextFormField(
                            controller: username,
                            decoration: formDecoration(
                                "Phone", "assets/icons/envelope.png"),
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
                            decoration: formDecoration(
                                "Password", "assets/icons/lock.png"),
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
                    minimum: EdgeInsets.only(top: 20, bottom: 50),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text("New User?"),
                        GestureDetector(
                            onTap: () {
                              Navigator.pushNamed(context, "/register");
                            },
                            child: SafeArea(
                                minimum: EdgeInsets.only(left: 5),
                                child: Text("Sign Up"))),
                      ],
                    ),
                  ),
                  SafeArea(
                    minimum: EdgeInsets.only(top: 20, bottom: 50),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Image.asset("assets/icons/google.png"),
                        Image.asset("assets/icons/facebook.png"),
                        Image.asset("assets/icons/email.png"),
                      ],
                    ),
                  ),
                  ActionButtonBar(
                      text: "Login",
                      action: () {
                        loginFormKey.currentState.save();
                        Scaffold.of(context).showSnackBar(SnackBar(
                          backgroundColor: Colors.red,
                          content: Text("passed"),
                        ));
                      })
                ],
              )),
        ),
      ),
    );
  }

  @override
  void dispose() {
    // Clean up the controller when the widget is removed from the
    // widget tree.
    username.dispose();
    password.dispose();
    super.dispose();
  }
}
