import 'package:flutter/material.dart';
import 'package:flutter_csl/components/app-drawer-content.dart';

class RequestLogin extends StatefulWidget {
  @override
  _RequestLogin createState() => new _RequestLogin();
}

class _RequestLogin extends State<RequestLogin> {
  Widget build(BuildContext context) {
    return Scaffold(
        // appBar: AppBar(),
        drawer: AppDrawer());
  }
}
