import 'package:flutter/material.dart';

class CewerAppBar extends StatelessWidget {
  Widget build(BuildContext buildContext) {
    return Container(
      color: Colors.transparent,
      child: Row(
        children: <Widget>[
          Text("CEWER",
              style: Theme.of(buildContext).appBarTheme.textTheme.title),
          Text(
            ".",
            style: Theme.of(buildContext).appBarTheme.textTheme.display1,
          )
        ],
      ),
    );
  }
}
