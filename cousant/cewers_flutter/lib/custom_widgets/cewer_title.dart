import 'package:flutter/material.dart';

class CewerAppBar extends StatelessWidget {
  final String italicsTitle;
  final String boldTitle;
  final String colored;
  CewerAppBar([this.italicsTitle, this.boldTitle, this.colored]);
  Widget build(BuildContext buildContext) {
    return Container(
      color: Colors.transparent,
      child: Row(
        children: <Widget>[
          Text(boldTitle ?? "", style: Theme.of(buildContext).textTheme.title),
          Text(italicsTitle ?? "CEWER",
              style: Theme.of(buildContext).appBarTheme.textTheme.title),
          Text(
            colored ?? ".",
            style: Theme.of(buildContext).appBarTheme.textTheme.display1,
          )
        ],
      ),
    );
  }
}
