import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';
import 'package:cewers_flutter/model/tab.dart';

class HomePage extends StatelessWidget {
  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration("assets/backgrounds/bg-cloud.png"),
      displayAppBar: true,
      child: Container(
        width: MediaQuery.of(context).size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, "/sign-up");
              },
              child: Container(
                width: 256,
                height: 256,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(128),
                    image: DecorationImage(
                        image: AssetImage("assets/backgrounds/alert.png"))),
                child: Center(
                    child: Text(
                  "ALERT",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontWeight: FontWeight.w700,
                  ),
                )),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
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