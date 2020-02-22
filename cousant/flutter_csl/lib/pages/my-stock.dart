import 'package:flutter/material.dart';
import 'package:flutter_csl/components/app-drawer-content.dart';

class MyStocks extends StatefulWidget {
  _Mystocks createState() => new _Mystocks();
}

class _Mystocks extends State<MyStocks> {
  Widget build(BuildContext context) {
    return new Scaffold(
      extendBodyBehindAppBar: true,
      appBar: new AppBar(
        title: new Text("My Stocks", textDirection: TextDirection.ltr),
        backgroundColor: Color.fromRGBO(0, 0, 0, 0),
        elevation: 0,
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
          children: <Widget>[Container()],
        ),
      ),
    );
  }
}
