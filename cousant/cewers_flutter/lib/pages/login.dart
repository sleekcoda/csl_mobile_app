import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/cewer_title.dart';
import 'package:cewers_flutter/custom_widgets/form-field.dart';
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
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: CewerAppBar(),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Container(
            decoration: BGCloudCircleDecoration,
            child: Builder(
              builder: (context) => SafeArea(
                  left: true,
                  right: true,
                  minimum: EdgeInsets.only(left: 27, right: 27),
                  child: ListView(
                    children: <Widget>[
                      SafeArea(
                        minimum: EdgeInsets.only(
                            top: (MediaQuery.of(context).size.height - 550)),
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
                                  auth.username = value;
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
                                  auth.password = value;
                                  print(auth.password);
                                },
                              ),
                            )
                          ]),
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
            )),
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
