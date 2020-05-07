import 'package:flutter/material.dart';

class CewerAppBar extends StatelessWidget {
  final String italicsTitle;
  final String boldTitle;
  CewerAppBar([
    this.italicsTitle,
    this.boldTitle,
  ]);
  Widget build(BuildContext buildContext) {
    return Container(
      color: Colors.transparent,
      child: Row(
        children: <Widget>[
          Text(boldTitle ?? "", style: Theme.of(buildContext).textTheme.title),
          Text(italicsTitle ?? "CEWER",
              style: Theme.of(buildContext).appBarTheme.textTheme.title),
        ],
      ),
    );
  }
}
