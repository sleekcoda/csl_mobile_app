import 'package:flutter/material.dart';

class MainTab {
  final String icon;
  final String name;
  final String route;
  MainTab(this.name, this.icon, this.route);

  static fetchAllTabs(BuildContext context) {
    return [
      MainTab("home", "home.png", "/login"),
      MainTab("Alerts", "alert.png", "/alert"),
      MainTab("Map", "pin.png", "/map"),
      MainTab("Feedback", "info.png", "/feedback"),
    ]
        .map(
          (tab) => GestureDetector(
            onTap: () {
              Navigator.of(context).pushNamed(tab.route);
            },
            child: Container(
              height: 75,
              child: Column(children: <Widget>[
                Image.asset("assets/icons/tabs/${tab.icon}"),
                Text(
                  tab.name,
                  style: TextStyle(fontWeight: FontWeight.w300, fontSize: 12),
                )
              ]),
            ),
          ),
        )
        .toList();
  }
}
