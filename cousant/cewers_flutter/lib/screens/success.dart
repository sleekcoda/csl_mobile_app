import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class SuccessScreen extends StatelessWidget {
  static String route = "/success";
  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration("assets/backgrounds/bg-cloud.png"),
      bottomNavigationBar: SafeArea(
        minimum: EdgeInsets.only(bottom: 30, left: 24, right: 24),
        child: ActionButtonBar(
          text: "GOTO LOGIN",
          action: () {
            Navigator.pushNamed(context, "/login");
          },
        ),
      ),
      child: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Image.asset("assets/icons/check.png"),
            SafeArea(
              minimum: EdgeInsets.only(top: 20, left: 50, right: 50),
              child: Align(
                alignment: Alignment.center,
                child: Center(
                    child: Text(
                  "Your account has been created. Please login to access you account",
                )),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
