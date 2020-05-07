import 'package:cewers_flutter/controller/language.dart';
import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/screens/home.dart';
import 'package:cewers_flutter/screens/login.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class WelcomeScreen extends StatefulWidget {
  _WelcomeScreen createState() => _WelcomeScreen();
}

class _WelcomeScreen extends State<WelcomeScreen> {
  LanguageController _languageController;

  void initState() {
    super.initState();
    _languageController = new LanguageController();
  }

  void dispose() {
    super.dispose();
    _languageController.closeStream();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        leading: Container(),
        iconTheme: IconThemeData(
          color: Theme.of(context).primaryColor, //change your color here
        ),
        elevation: 0,
        backgroundColor: Colors.transparent,
        title: Text(
          "CEWER.",
          style: TextStyle(
            color: Colors.white,
            fontStyle: FontStyle.italic,
          ),
        ),
      ),
      body: FutureBuilder(
        future: _languageController.getLanguage(),
        builder: (context, snapshot) {
          String mapUri = snapshot.data == null
              ? "assets/images/benue-map.png"
              : "assets/images/${snapshot.data.toLowerCase()}-map.png";
          String bgUri = snapshot.data == null
              ? "assets/backgrounds/benue.png"
              : "assets/backgrounds/${snapshot.data.toLowerCase()}.png";
          return SafeArea(
            minimum: EdgeInsets.only(top: 0),
            child: Container(
              decoration: bgDecoration(bgUri),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  Stack(
                    alignment: Alignment.topCenter,
                    overflow: Overflow.visible,
                    children: <Widget>[
                      Positioned(
                        left: 100,
                        top: -60,
                        child: Image.asset(mapUri),
                      ),
                      Center(
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15.0),
                          ),
                          child: Container(
                            margin: EdgeInsets.only(
                                top: 0, left: 10, right: 10, bottom: 10),
                            child: Column(
                              children: <Widget>[
                                SafeArea(
                                    minimum: EdgeInsets.only(top: 39),
                                    child: Text(
                                      "Conflict Early Warning Early Response System.",
                                      style: coloredHeaderStyle(context),
                                      textAlign: TextAlign.center,
                                    )),
                                SafeArea(
                                    minimum:
                                        EdgeInsets.only(top: 25, bottom: 23),
                                    child: ActionButtonBar(
                                      action: () {
                                        Navigator.of(context)
                                            .pushNamed(HomeScreen.route);
                                      },
                                      text: "REPORT EVENT",
                                    )),
                                SafeArea(
                                  minimum: EdgeInsets.only(bottom: 28),
                                  child: SizedBox(
                                    width: 253,
                                    child: OutlineButton(
                                      onPressed: () {
                                        Navigator.of(context)
                                            .pushNamed(LoginScreen.route);
                                      },
                                      child: Text(
                                        "LOGIN",
                                        style: ButtonStyle.apply(
                                            color:
                                                Theme.of(context).primaryColor),
                                      ),
                                      color: Theme.of(context).primaryColor,
                                      focusColor:
                                          Theme.of(context).primaryColor,
                                      borderSide: BorderSide.none,
                                      disabledBorderColor:
                                          Theme.of(context).primaryColor,
                                      highlightedBorderColor:
                                          Theme.of(context).primaryColor,
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(18.0),
                                      ),
                                    ),
                                  ),
                                ),
                                SafeArea(
                                  minimum: EdgeInsets.only(bottom: 33),
                                  child: Text(
                                    "Select Language",
                                    style: TextStyle(
                                        color: Theme.of(context).primaryColor),
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
