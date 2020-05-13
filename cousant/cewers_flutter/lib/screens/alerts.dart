import 'package:cewers_flutter/controller/report.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:flutter/material.dart';

class AlertListScreen extends StatefulWidget {
  _AlertListScreen createState() => _AlertListScreen();
}

class _AlertListScreen extends State<AlertListScreen> {
  Future future;
  ReportController reportController;
  void initState() {
    super.initState();
    future = reportController.getReport();
  }

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: null,
      child: Container(
        child: FutureBuilder(
          future: future,
          builder: (context, snapshot) => ListView(
            children: <Widget>[]..addAll(snapshot?.data?.map(() => Card(
                  child: Container(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[Text("Welcome to report page")],
                    ),
                  ),
                ))),
          ),
        ),
      ),
    );
  }

  void dispose() {
    super.dispose();
  }
}
