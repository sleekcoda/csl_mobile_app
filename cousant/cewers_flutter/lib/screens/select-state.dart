import 'package:cewers_flutter/controller/language.dart';
import 'package:cewers_flutter/custom_widgets/state-card.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class SelectStateScreen extends StatefulWidget {
  _SelectStateScreen createState() => _SelectStateScreen();
}

class _SelectStateScreen extends State<SelectStateScreen> {
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
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(
          color: Theme.of(context).primaryColor, //change your color here
        ),
        title: Container(
          child: Row(
            children: <Widget>[
              Text("Select ", style: TitleStyle),
              Text(
                "State ",
                style: TextStyle(
                    fontWeight: FontWeight.w400,
                    fontStyle: FontStyle.italic,
                    fontSize: largeTextSize),
              ),
            ],
          ),
        ),
      ),
      body: StreamBuilder(
        stream: _languageController.stream,
        builder: (context, snapshot) => Container(
          height: MediaQuery.of(context).size.height,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[]
              ..addAll(["benue", "taraba", "nasarawa"].map((state) => StateCard(
                  stateName: state.toUpperCase(),
                  stateMapUri: "assets/images/$state-map.png",
                  action: () async {
                    await _languageController.setLanguage(state);
                    Navigator.of(context).pushNamed("/");
                  }))),
          ),
        ),
      ),
    );
  }
}
