import 'package:flutter/material.dart';
import 'package:flutter_csl/components/app-drawer-content.dart';

class Dashboard extends StatefulWidget {
  _Dashboard createState() => new _Dashboard();
}

class _Dashboard extends State<Dashboard> {

  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
          title: new Text("Dashboard", textDirection: TextDirection.ltr)
      ),
      drawer: new AppDrawer(),
      body: Container(
        height: MediaQuery.of(context).size.height,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('asset/imgs/login-bg.png'),
            fit: BoxFit.fill,
          ),
        ),
        child: ListView(
          children: <Widget>[
            Container()
          ],
        ),
      ),
    );
  }
}
