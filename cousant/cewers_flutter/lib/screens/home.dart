import 'package:cewers_flutter/controller/location.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/custom_widgets/tab.dart';
import 'package:cewers_flutter/screens/select-crime.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  _HomeScreen createState() => _HomeScreen(GeoLocationController());
}

class _HomeScreen extends State<HomeScreen> {
  final GeoLocationController _locationController;
  _HomeScreen(this._locationController);
  // Future _locationPersion;
  initState() {
    super.initState();
    this._locationController.getLocationStatus().then((status) {
      print(status);
    }).catchError((e) {
      print("============ERROR============");
      print(e);
    });
  }

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration("assets/backgrounds/bg-cloud.png"),
      child: Container(
        width: MediaQuery.of(context).size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GestureDetector(
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => SelectCrimeScreen()));
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

  @override
  void dispose() {
    super.dispose();
  }
}
