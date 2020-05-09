import 'package:cewers_flutter/controller/signup.dart';
import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/form-field.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/screens/success.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class SignUpScreen extends StatefulWidget {
  static String route = "/signUp";
  final String username;
  SignUpScreen([this.username]);
  _SignUpScreen createState() => _SignUpScreen();
}

class _SignUpScreen extends State<SignUpScreen> {
  final _signUpKey = GlobalKey<FormState>();
  TextEditingController fullname = new TextEditingController();
  TextEditingController email = new TextEditingController();
  TextEditingController phoneNumber = new TextEditingController();
  String gender;
  TextEditingController address = new TextEditingController();
  SignUpController signUpController = new SignUpController();

  void initState() {
    super.initState();
    phoneNumber.text = widget.username;
  }

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      bottomNavigationBar: Builder(
        builder: (context) => SafeArea(
          minimum: EdgeInsets.symmetric(
            horizontal: 20,
            vertical: 20,
          ),
          child: ActionButtonBar(
            text: "SIGN UP",
            action: () {
              // _signUpKey.currentState.validate();
              registerUser(context);
            },
          ),
        ),
      ),
      child: ListView(
        children: <Widget>[
          Text(
            "Sign Up",
            style: Theme.of(context)
                .textTheme
                .title
                .apply(color: Theme.of(context).primaryColor),
          ),
          Container(
              height: MediaQuery.of(context).size.height / 1.5,
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Form(
                      key: _signUpKey,
                      child: SafeArea(
                        minimum: EdgeInsets.only(left: 30, right: 30),
                        child: Column(
                          children: [
                            FormTextField(
                              textFormField: TextFormField(
                                controller: fullname,
                                decoration: formDecoration(
                                    "Full name", "assets/icons/person.png"),
                                validator: (value) {
                                  return value.isEmpty
                                      ? "Name is required"
                                      : null;
                                },
                              ),
                            ),
                            FormTextField(
                              textFormField: TextFormField(
                                controller: phoneNumber,
                                decoration: formDecoration(
                                    "Phone number*", "assets/icons/phone.png"),
                                validator: (value) {
                                  return value.isEmpty
                                      ? "Email/phone is required"
                                      : null;
                                },
                              ),
                            ),
                            FormTextField(
                              textFormField: TextFormField(
                                controller: email,
                                decoration: formDecoration("Email address",
                                    "assets/icons/envelope.png"),
                                validator: (value) {
                                  return value.isEmpty
                                      ? "Email/phone is required"
                                      : null;
                                },
                              ),
                            ),
                            FormTextField(
                              textFormField: TextFormField(
                                controller: address,
                                decoration: InputDecoration(
                                  border: InputBorder.none,
                                  focusedBorder: InputBorder.none,
                                  enabledBorder: InputBorder.none,
                                  icon: Icon(Icons.location_city),
                                  hintText: "Address",
                                  // border: InputBorder(borderSide: BorderSide.none),
                                ),
                                validator: (value) {
                                  return value.isEmpty
                                      ? "Email/phone is required"
                                      : null;
                                },
                              ),
                            ),
                            Row(children: [
                              Radio(
                                value: "male",
                                groupValue: gender,
                                onChanged: _genderHandler,
                              ),
                              GestureDetector(
                                  onTap: () {
                                    _genderHandler("male");
                                  },
                                  child: Text("Male")),
                              Radio(
                                value: "female",
                                groupValue: gender,
                                onChanged: _genderHandler,
                              ),
                              GestureDetector(
                                  onTap: () {
                                    _genderHandler("female");
                                  },
                                  child: Text("Female")),
                            ]),
                          ],
                        ),
                      ),
                    ),
                  ]))
        ],
      ),
    );
  }

  void _genderHandler(String value) {
    setState(() {
      gender = value;
    });
  }

  void registerUser(BuildContext context) {
    if (_signUpKey.currentState.validate()) {
      Scaffold.of(context).showSnackBar(
        SnackBar(
          content: Text("Please wait..."),
        ),
      );
      _signUpKey.currentState.save();
      var payload = {
        "user": {
          "fullName": fullname.text,
          "email": email.text,
          "phoneNumber": phoneNumber.text,
          "gender": gender,
          "userType": "citizen",
        }
      };

      /**
       * Confirm password combination
       */
      signUpController.register(payload).then((response) {
        /**
         * VAlidate API Response
         */
        if (response.status) {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => SuccessScreen(phoneNumber.text)));
        } else {
          Scaffold.of(context).showSnackBar(
            SnackBar(
              backgroundColor: Colors.red,
              content: Text(response.message),
            ),
          );
        }
        //Api response
      }).catchError((onError) {
        print("Unexpected error");
      });
    }
  }

  bool isEmail(String em) {
    String p =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = new RegExp(p);

    return regExp.hasMatch(em);
  }

  void dispose() {
    _signUpKey.currentState.dispose();
    fullname.dispose();
    email.dispose();
    phoneNumber.dispose();

    super.dispose();
  }
}
