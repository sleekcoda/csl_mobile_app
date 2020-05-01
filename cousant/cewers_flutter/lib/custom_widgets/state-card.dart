import 'package:cewers_flutter/controller/language.dart';
import 'package:flutter/material.dart';

class StateCard extends StatelessWidget {
  final String stateName;
  final String stateMapUri;
  LanguageController _languageController = new LanguageController();
  StateCard({Key key, @required this.stateName, @required this.stateMapUri})
      : super(key: key);

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        _languageController.setLanguage(stateName);
        Navigator.of(context).pushNamed("/login");
      },
      child: Center(
        child: Card(
          elevation: 3,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          child: Container(
            padding: EdgeInsets.only(left: 24, right: 24, top: 30, bottom: 34),
            width: 237,
            child: Column(
              children: <Widget>[
                Image.asset(this.stateMapUri),
                Center(
                    child: Text(
                  stateName.toUpperCase(),
                  style: TextStyle(fontSize: 20),
                ))
              ],
            ),
          ),
        ),
      ),
    );
  }
}
