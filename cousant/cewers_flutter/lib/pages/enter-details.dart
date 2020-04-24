import 'package:cewers_flutter/custom_widgets/cewer_title.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/custom_widgets/tabs.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class EnterDetailPage extends StatelessWidget {
  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration("assets/backgrounds/bg-cloud.png"),
      displayAppBar: CewerAppBar("Type  ", " Select"),
      bottomNavigationBar: BottomTab(),
      child: Container(
        width: MediaQuery.of(context).size.width,
        child: Column(children: [
          Card(
            child: ListView(
              children: <Widget>[
                Image.asset("assets/icons/health.png"),
                Center(
                    child: Text(
                  "Health",
                  style: Theme.of(context).primaryTextTheme.subtitle,
                ))
              ],
            ),
          )
        ]),
      ),
    );
  }
}
