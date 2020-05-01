import 'package:cewers_flutter/custom_widgets/cewer_title.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/custom_widgets/tabs.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class SelectCrimeScreen extends StatelessWidget {
  static String route = "/selectCrime";
  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration("assets/backgrounds/bg-cloud.png"),
      displayAppBar: CewerAppBar("Type", "Select "),
      bottomNavigationBar: BottomTab(),
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Card(
            child: Container(
              width: 253,
              padding: EdgeInsets.all(50),
              child: Column(
                children: <Widget>[
                  Image.asset("assets/icons/health.png"),
                  Padding(
                      padding: EdgeInsets.only(top: 47),
                      child: Center(
                        child: Text(
                          "Health",
                          style: Theme.of(context).textTheme.subtitle,
                        ),
                      ))
                ],
              ),
            ),
          )
        ]),
      ),
    );
  }
}
