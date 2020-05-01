import 'package:cewers_flutter/custom_widgets/state-card.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class SelectStateScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
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
              Text(".", style: PeriodStyle)
            ],
          ),
        ),
      ),
      body: Container(
        height: MediaQuery.of(context).size.height,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[]
            ..addAll(["benue", "taraba", "nasarawa"].map((state) => StateCard(
                  stateName: state.toUpperCase(),
                  stateMapUri: "assets/images/$state-map.png",
                ))),
        ),
      ),
    );
  }
}
