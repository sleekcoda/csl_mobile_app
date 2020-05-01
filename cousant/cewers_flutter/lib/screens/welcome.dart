import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class WelcomeSreen extends StatelessWidget {
  final String preferredLanguage;
  static String route = "/welcome";
  WelcomeSreen(this.preferredLanguage, {Key key}) : super(key: key);

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "CEWER.",
          style: TextStyle(
            color: Colors.white,
            fontStyle: FontStyle.italic,
          ),
        ),
        elevation: 0,
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: bgDecoration(preferredLanguage),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[
            Image.asset("assets/images/$preferredLanguage-map.png"),
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
              ),
              child: Container(
                  child: Column(
                children: <Widget>[
                  Text(
                    "Conflict Early Warning Early Response System.",
                    style: PeriodStyle,
                  )
                ],
              )),
            ),
          ],
        ),
      ),
    );
  }
}
