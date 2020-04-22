import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class WelcomePage extends StatelessWidget {
  final Widget child;

  WelcomePage({Key key, this.child}) : super(key: key);

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: BGCloudCircleDecoration,
      displayAppBar: true,
      child: SafeArea(
        minimum: EdgeInsets.only(top: 24),
        child: ListView(
          children: <Widget>[
            SafeArea(
                minimum: EdgeInsets.only(top: 100, bottom: 100, left: 24),
                child: Text(
                  "Conflict Early Warning Early Response System",
                  style: TitleStyle,
                )),
            SafeArea(
              minimum: EdgeInsets.only(top: 100, bottom: 150, left: 24),
              child: Text(
                "BENUE STATE",
                style: TitleStyle,
              ),
            ),
            SafeArea(
                minimum: EdgeInsets.only(left: 24, right: 24),
                child: ActionButtonBar(
                  text: "REPORT EVENT",
                  action: () {
                    Navigator.pushNamed(context, "/login");
                  },
                ))
          ],
        ),
      ),
    );
  }
}
