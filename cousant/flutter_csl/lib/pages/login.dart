import 'package:flutter/material.dart';
import 'package:flutter_csl/components/forms/login.dart';

class Login extends StatelessWidget {
  Widget build(BuildContext context) {
    return new Scaffold(
      body: Container(
        height: MediaQuery.of(context).size.height,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('asset/imgs/login-bg.png'),
            fit: BoxFit.fill,
          ),
        ),
        child: ListView(
          children: <Widget>[
            Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Expanded(
                      child: Container(),
                      flex: 50,
                    ),
                    Image.asset(
                      "asset/imgs/layout-logo.png",
                      height: 140,
                      width: 140,
                    ),
                    Expanded(
                      child: Container(),
                      flex: 1,
                    )
                  ],
                ),
                LoginForm()
              ],
            )
          ],
        ),
      ),
    );
  }
}
