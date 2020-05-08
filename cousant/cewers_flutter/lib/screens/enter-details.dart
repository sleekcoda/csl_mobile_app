import 'package:cewers_flutter/custom_widgets/button.dart';
import 'package:cewers_flutter/custom_widgets/cewer_title.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/screens/report-notification.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class EnterDetailScreen extends StatefulWidget {
  static String route = "/enterDetails";
  final String crime;
  EnterDetailScreen(this.crime);
  _EnterDetailScreen createState() => _EnterDetailScreen();
}

class _EnterDetailScreen extends State<EnterDetailScreen> {
  TextEditingController details = new TextEditingController();
  bool useLocation = true;
  final formKey = GlobalKey<FormState>();

  void initState() {
    super.initState();
  }

  void dispose() {
    details.dispose();
    formKey.currentState.dispose();
    super.dispose();
  }

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: bgDecoration(),
      displayAppBar: CewerAppBar("Enter ", "Details"),
      bottomNavigationBar: SafeArea(
          minimum: EdgeInsets.only(bottom: 20, left: 20, right: 20),
          child: ActionButtonBar(
            action: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) =>
                      ReportNotification(details.text, "Lagos "),
                ),
              );
            },
            text: "SUBMIT",
          )),
      child: Container(
        width: MediaQuery.of(context).size.width,
        child: Column(children: [
          Text(widget.crime),
          FutureBuilder(
            future: null,
            builder: (context, snapshot) => Container(
              child: Column(
                children: <Widget>[
                  SizedBox(
                    height: 200,
                    child: Card(
                      borderOnForeground: true,
                      child: TextField(
                        minLines: 30,
                        maxLines: 50,
                        decoration: InputDecoration(
                          hintText: 'Enter details',
                          contentPadding: EdgeInsets.symmetric(
                              vertical: 10.0, horizontal: 10.0),
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
                  ),
                  Row(children: [
                    Switch(
                      value: useLocation,
                      onChanged: (value) {
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
