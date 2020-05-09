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
  final String username;
  LoginScreen([this.username]);
  _LoginScreen createState() => _LoginScreen();
}

class _LoginScreen extends State<LoginScreen> {
  TextEditingController username = new TextEditingController();
  APIController loginController = new APIController();

  final loginFormKey = GlobalKey<FormState>();

  void initState() {
    super.initState();
    username.text = widget.username;
  }

  login(BuildContext context) {
    loginFormKey.currentState.save();
    if (loginFormKey.currentState.validate()) {
      Scaffold.of(context).showSnackBar(SnackBar(
        content: Text("Please wait...."),
        backgroundColor: Colors.black,
      ));
      var payload = isEmail(username.text)
          ? {"email": username.text}
          : {"phoneNumber": username.text};
      loginController.login(payload).then((success) {
        if (success) {
          Navigator.of(context).pushNamed(HomeScreen.route);
        } else {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => SignUpScreen(
                username.text,
              ),
            ),
          );
        }
      }).catchError((onError) {
        print(onError);
        Scaffold.of(context).showSnackBar(SnackBar(
          content: Text("Unexpected error occured"),
          backgroundColor: Colors.red,
        ));
      });
    }
  }

  bool isEmail(String em) {
    String p =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = new RegExp(p);

    return regExp.hasMatch(em);
  }

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      bottomNavigationBar: Builder(
        builder: (context) => SafeArea(
          minimum: EdgeInsets.symmetric(horizontal: 20, vertical: 30),
          child: ActionButtonBar(
            text: "Login",
            action: () {
              login(context);
            },
          ),
        ),
      ),
      child: ListView(
        children: <Widget>[
          SafeArea(
            minimum: EdgeInsets.only(
                left: 30,
                right: 30,
                top: MediaQuery.of(context).size.height / 10),
            child: Form(
              key: loginFormKey,
              child: Column(children: <Widget>[
                SafeArea(
                  minimum: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
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
        ],
      ),
    );
  }

  navigate(bool loginStatus) {}

  @override
  void dispose() {
    loginFormKey.currentState.dispose();
    username.dispose();
    super.dispose();
  }
}
