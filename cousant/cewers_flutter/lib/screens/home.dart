import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/custom_widgets/tabs.dart';
import 'package:cewers_flutter/screens/select-crime.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  static String route = "/home";
  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration("assets/backgrounds/bg-cloud.png"),
      child: Container(
        width: MediaQuery.of(context).size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, SelectCrimeScreen.route);
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
      bottomNavigationBar: BottomTab(),
    );
  }
}
