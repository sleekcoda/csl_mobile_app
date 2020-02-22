import 'package:flutter/material.dart';
import 'package:flutter_csl/components/app-drawer-content.dart';

class FundAccount extends StatefulWidget {
  _FundAccount createState() => new _FundAccount();
}

class _FundAccount extends State<FundAccount> {

  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
          title: new Text("Fund Account", textDirection: TextDirection.ltr)
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
