import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/form-field.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/controller/api.dart';
import 'package:cewers_flutter/screens/home.dart';
import 'package:cewers_flutter/screens/sign_up.dart';
import 'package:flutter/material.dart';
import 'package:cewers_flutter/style.dart';

class LoginScreen extends StatefulWidget {
  static String route = "/login";
  _LoginScreen createState() => _LoginScreen();
}

class _LoginScreen extends State<LoginScreen> {
  TextEditingController username = new TextEditingController();
  TextEditingController password = new TextEditingController();
  APIController loginController = new APIController();

  final loginFormKey = GlobalKey<FormState>();

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      child: ListView(
        children: <Widget>[
          SafeArea(
            minimum: EdgeInsets.only(left: 30, right: 30),
            child: Form(
              key: loginFormKey,
              child: Column(children: <Widget>[
                SafeArea(
                  minimum: EdgeInsets.only(top: 20, bottom: 20),
                  child: Align(
                    alignment: Alignment.topLeft,
                    child: Text(
                      "Login",
                      style: titleStyle().apply(
                        color: Theme.of(context).primaryColor,
                      ),
                    ),
                  ),
                ),
                FormTextField(
                  textFormField: TextFormField(
                    controller: username,
                    decoration:
                        formDecoration("Phone", "assets/icons/envelope.png"),
                    validator: (value) {
                      if (value.isEmpty) {
                        return 'Enter your phone number or email';
                      }
                      return null;
                    },
                  ),
                ),
                FormTextField(
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
                      Navigator.pushNamed(context, SignUpScreen.route);
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
          Builder(
            builder: (context) => SafeArea(
              minimum: EdgeInsets.only(top: 50),
              child: ActionButtonBar(
                text: "Login",
                action: () {
                  loginFormKey.currentState.save();
                  if (loginFormKey.currentState.validate()) {
                    Scaffold.of(context).showSnackBar(SnackBar(
                      content: Text("Please wait...."),
                      backgroundColor: Colors.black,
                    ));
                    loginController.login({
                      "phoneNumber": username.text,
                      "password": password.text
                    }).then((success) {
                      if (success) {
                        Navigator.of(context).pushNamed(HomeScreen.route);
                      } else {
                        Scaffold.of(context).showSnackBar(SnackBar(
                          content: Text("Invalid user or password"),
                          backgroundColor: Colors.red,
                        ));
                      }
                    }).catchError((onError) {
                      Scaffold.of(context).showSnackBar(SnackBar(
                        content: Text("Unexpected error occured"),
                        backgroundColor: Colors.red,
                      ));
                    });
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  navigate(bool loginStatus) {}

  @override
  void dispose() {
    loginFormKey.currentState.dispose();
    username.dispose();
    password.dispose();
    super.dispose();
  }
}
