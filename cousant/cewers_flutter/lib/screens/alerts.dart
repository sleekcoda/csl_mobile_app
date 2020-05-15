import 'package:cewers_flutter/bloc/send-report.dart';
import 'package:cewers_flutter/controller/storage.dart';
import 'package:cewers_flutter/custom_widgets/main-container.dart';
import 'package:cewers_flutter/model/error.dart';
import 'package:cewers_flutter/service/api.dart';
import 'package:flutter/material.dart';

class AlertListScreen extends StatefulWidget {
  _AlertListScreen createState() =>
      _AlertListScreen(SendReportBloc(StorageController(), API()));
}

class _AlertListScreen extends State<AlertListScreen> {
  Future future;
  final SendReportBloc _reportBloc;
  _AlertListScreen(this._reportBloc);
  void initState() {
    super.initState();
    future = _reportBloc.getReport();
  }

  Widget build(BuildContext context) {
    return MainContainer(
      decoration: null,
      child: FutureBuilder(
          future: future,
          builder: (context, snapshot) {
            switch (snapshot.connectionState) {
              case ConnectionState.waiting:
                return loading;
                break;
              case ConnectionState.none:
                return loading;
                break;
              case ConnectionState.active:
                return loading;
                break;
              case ConnectionState.done:
                return Container(
                  child: ListView(
                    children: <Widget>[]..addAll((snapshot.data is APIError)
                        ? [
                            Container(
                                margin: EdgeInsets.symmetric(
                                    vertical:
                                        MediaQuery.of(context).size.height / 3),
                                child: Center(
                                    child: Text(
                                        "ERROR: ${snapshot?.data?.message}")))
                          ]
                        : snapshot?.data?.map(() => Card(
                              child: Container(
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    Text("Welcome to report page")
                                  ],
                                ),
                              ),
                            ))),
                  ),
                );
                break;
              default:
                return loading;
                break;
            }
          }),
    );
  }

  Widget loading = Container(
    child: Center(
      child: CircularProgressIndicator(),
    ),
  );
  void dispose() {
    super.dispose();
  }
}
