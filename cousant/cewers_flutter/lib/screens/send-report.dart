// import 'package:cewers_flutter/controller/location.dart';

import 'dart:io';

import 'package:cewers_flutter/bloc/send-report.dart';
import 'package:cewers_flutter/controller/location.dart';
import 'package:cewers_flutter/controller/storage.dart';
import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/cewer_title.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/model/response.dart';
import 'package:cewers_flutter/screens/report-notification.dart';
import 'package:cewers_flutter/service/api.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:dio/dio.dart';

class SendReportScreen extends StatefulWidget {
  final String crime;
  SendReportScreen(this.crime);
  _SendReportScreen createState() =>
      _SendReportScreen(SendReportBloc(StorageController(), API()));
}

class _SendReportScreen extends State<SendReportScreen> {
  final SendReportBloc myBloc;

  _SendReportScreen(this.myBloc);

  TextEditingController details = new TextEditingController();
  bool useLocation = true;
  final formKey = GlobalKey<FormState>();
  Future<LocationData> _future;
  String _userId;
  File _mediaFile;

  void initState() {
    super.initState();
    _future = GeoLocation().getCoordinates();
    myBloc.getUserId().then((userId) {
      _userId = userId;
    }).catchError((e) {
      print(e);
    });
  }

  void dispose() {
    details?.dispose();
    super.dispose();
  }

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      displayAppBar: CewerAppBar("Enter ", "Details"),
      bottomNavigationBar: SafeArea(
        minimum: EdgeInsets.only(bottom: 20, left: 20, right: 20),
        child: FutureBuilder(
          future: _future,
          builder: (context, snapshot) => ActionButtonBar(
            action: () {
              Map<String, dynamic> payload;
              if (snapshot.data is LocationData) {
                payload = {
                  "alert": {
                    "userId": _userId,
                    "alertType": widget.crime.toLowerCase(),
                    "location":
                        "${snapshot.data?.latitude ?? 0},${snapshot.data?.longitude ?? 0}",
                    "priority": "medium",
                    "comment": details.text,
                    "pictures": [_mediaFile?.path ?? ""],
                    "videos": []
                  }
                };
              }

              myBloc.sendReport(payload).then((value) {
                if (value is APIResponseModel) {
                  Scaffold.of(context)
                      .showSnackBar(SnackBar(content: Text(value.message)));

                  if (value.status)
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => ReportNotification(
                              details.text,
                              snapshot.data?.latitude,
                              snapshot.data?.longitude)),
                    );
                } else {
                  Scaffold.of(context).showSnackBar(
                      SnackBar(content: Text("Invalid response type")));
                }
                print(value);
              }).catchError((onError) {
                Scaffold.of(context)
                    .showSnackBar(SnackBar(content: Text("App error")));
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
          ),
        ),
      ),
      child: Container(
        width: MediaQuery.of(context).size.width,
        child: ListView(children: [
          Text(widget.crime),
          Container(
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
                        borderSide: BorderSide(color: Colors.black, width: 0.0),
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
                          Icons.photo_camera,
                          color: Colors.grey,
                        ),
                        onPressed: () async {
                          myBloc.openCamera().then((file) {
                            setState(() {
                              _mediaFile = file;
                            });
                            myBloc.uploadImage(_mediaFile).then((upload) {
                              print(
                                  "======================Uploaded=======================");

                              print(upload);
                            }).catchError((e) {
                              print(
                                  "======================Error=======================");
                              if (e is DioError) {
                                // Scaffold.of(context).showSnackBar(SnackBar(
                                //   content: Text(e.message),
                                //   backgroundColor: Colors.red,
                                // ));
                                print(e.message);
                              } else {
                                print(e);
                                Scaffold.of(context).showSnackBar(SnackBar(
                                  content: Text("App error"),
                                  backgroundColor: Colors.red,
                                ));
                              }
                            });
                          }).catchError((onError) {
                            Scaffold.of(context).openDrawer();
                          });
                          // do something
                        },
                      ),
                      Text("Upload picture or video evidence"),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10),
                        child: null,
                      ),
                    ],
                  ),
                ),
                Container(
                    child:
                        (_mediaFile != null) ? Image.file(_mediaFile) : null),

                // Row(children: [
                //   Switch(
                //     value: useLocation,
                //     onChanged: (value) async {
                //       if (value) {
                //         print(location.data?.latitude);
                //       }
                //       setState(() {
                //         useLocation = value;
                //         print(useLocation);
                //       });
                //     },
                //   ),
                //   Text("Use my location")
                // ]),
              ],
            ),
          ),
        ]),
      ),
    );
  }
}
