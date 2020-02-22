import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_csl/components/colors.dart' show AppColorTheme;

class LoginForm extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _LoginForm();
  }
}

class _LoginForm extends State<LoginForm> {
  TextEditingController _username = new TextEditingController();
  TextEditingController _password = new TextEditingController();
  final _formKey = GlobalKey<FormState>();

  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Container(
        child: Column(
          textDirection: TextDirection.ltr,
          children: <Widget>[
            Container(
              margin: EdgeInsets.only(left: 20, right: 20, bottom: 2, top: 30),
              padding: EdgeInsets.only(left: 20, right: 20, bottom: 0, top: 5),
              decoration: BoxDecoration(
                  color: Color.fromRGBO(255, 255, 255, .5),
                  borderRadius:
                      BorderRadius.only(topLeft: Radius.circular(15))),
              child: TextFormField(
                decoration: InputDecoration(
                    labelText: "Email or Customer number",
                    icon: ImageIcon(
                      AssetImage("asset/icons/user.png"),
                      color: AppColorTheme.secondary,
                    )),
                controller: _username,
              ),
            ),
            Container(
              margin: EdgeInsets.only(left: 20, right: 20),
              padding: EdgeInsets.only(left: 20, right: 20, bottom: 0, top: 5),
              decoration: BoxDecoration(
                  color: Color.fromRGBO(255, 255, 255, .5),
                  borderRadius:
                      BorderRadius.only(bottomLeft: Radius.circular(15))),
              child: TextFormField(
                obscureText: true,
                decoration: InputDecoration(
                    labelText: "Enter password",
                    icon: ImageIcon(AssetImage("asset/icons/lock.png"),
                        color: AppColorTheme.secondary),
                    hasFloatingPlaceholder: true),
                controller: _password,
              ),
            ),
            RaisedButton(
              child: Text("Reset password"),
              onPressed: () {
                // Scaffold.of(context).showBottomSheet(,))
              },
            ),
            InkWell(
              onTap: () {
                Navigator.pushNamed(context, "/dashboard");
                Scaffold.of(context).showSnackBar(SnackBar(
                  content: Text(
                    "Login",
                  ),
                ));
              },
              child: Container(
                width: MediaQuery.of(context).size.width,
                padding: EdgeInsets.all(10),
                margin: EdgeInsets.only(top: 20, left: 20, right: 20),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    image: DecorationImage(
                        image: AssetImage("asset/imgs/button-bg.png"),
                        fit: BoxFit.fill)),
                child: Text(
                  "Login",
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white, fontSize: 30),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
