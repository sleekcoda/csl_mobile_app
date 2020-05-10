// import 'package:cewers_flutter/controller/location.dart';
import 'package:cewers_flutter/controller/location.dart';
import 'package:cewers_flutter/controller/report.dart';
import 'package:cewers_flutter/controller/storage.dart';
import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/cewer_title.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
// import 'package:cewers_flutter/screens/report-notification.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';

class EnterDetailScreen extends StatefulWidget {
  static String route = "/enterDetails";
  final String crime;
  EnterDetailScreen(this.crime);
  _EnterDetailScreen createState() => _EnterDetailScreen();
}

class _EnterDetailScreen extends State<EnterDetailScreen> {
  TextEditingController details = new TextEditingController();
  bool useLocation = true;
  StorageController _storage = new StorageController();
  final formKey = GlobalKey<FormState>();
  Position position;

  GeoLocation location = new GeoLocation();
  void initState() {
    super.initState();
  }

  void dispose() {
    details?.dispose();
    super.dispose();
  }

  getImage() {}

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      displayAppBar: CewerAppBar("Enter ", "Details"),
      bottomNavigationBar: SafeArea(
          minimum: EdgeInsets.only(bottom: 20, left: 20, right: 20),
          child: ActionButtonBar(
            action: () async {
              ReportController _reportController = new ReportController();
              Map<String, dynamic> payload = {
                "alert": {
                  "userId": await _storage.getUserId(),
                  "alertType": widget.crime,
                  "location":
                      "${position?.latitude ?? 0},${position?.longitude ?? 0}",
                  "priority": "medium",
                  "comment": details.text,
                  "pictures": ["picture1.png", "picture2.png"],
                  "videos": ["video1.png", "video2.png"]
                }
              };
              _reportController.sendReport(payload).then((value) {
                print(value);
              }).catchError((onError) {
                print(onError);
              });
              // print(response);
              // Navigator.push(
              //   context,
              //   MaterialPageRoute(
              //     builder: (context) =>
              //         ReportNotification(details.text, "Lagos "),
              //   ),
              // );
            },
            text: "SUBMIT",
          )),
      child: Container(
        width: MediaQuery.of(context).size.width,
        child: Column(children: [
          Text(widget.crime),
          FutureBuilder(
            future: location.getLocation(),
            builder: (context, location) => Container(
              child: Column(
                children: <Widget>[
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(32.0),
                    ),
                    height: 200,
                    child: TextField(
                      minLines: 30,
                      maxLines: 50,
                      decoration: InputDecoration(
                        hintText: 'Enter details',
                        contentPadding: EdgeInsets.symmetric(
                            vertical: 30.0, horizontal: 30.0),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32.0),
                          borderSide:
                              BorderSide(color: Colors.black, width: 0.0),
                        ),
                      ),
                      controller: details,
                      keyboardType: TextInputType.multiline,
                    ),
                  ),
                  SafeArea(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        IconButton(
                          icon: Icon(
                            Icons.cloud_upload,
                            color: Colors.grey,
                          ),
                          onPressed: () {
                            getImage();
                            // do something
                          },
                        ),
                        Text("Upload picture or video evidence")
                      ],
                    ),
                  ),
                  Row(children: [
                    Switch(
                      value: useLocation,
                      onChanged: (value) async {
                        if (value) {
                          print(location.data?.latitude);
                        }
                        setState(() {
                          useLocation = value;
                          print(useLocation);
                        });
                      },
                    ),
                    Text("Use my location")
                  ]),
                ],
              ),
            ),
          )
        ]),
      ),
    );
  }
}
