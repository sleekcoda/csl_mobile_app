import 'package:cewers_flutter/model/tab.dart';
import 'package:flutter/material.dart';

class BottomTab extends StatelessWidget {
  Widget build(BuildContext context) {
    return Builder(
      builder: (context) => SafeArea(
        minimum: EdgeInsets.only(bottom: 2, left: 5, right: 5),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          // crossAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[]..addAll(MainTab.fetchAllTabs(context)),
        ),
      ),
    );
  }
}
