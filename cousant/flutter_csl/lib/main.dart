import 'package:flutter/material.dart';
import 'package:flutter_csl/components/app-drawer-content.dart';
import 'package:flutter_csl/components/colors.dart';

// import 'package:flutter_csl/components/colors.dart';
void main() => runApp(new MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "CSL Mobile",
      routes: AppDrawer.routes(),
      initialRoute: "/",
      theme: ThemeData(
          primaryColor: AppColorTheme.primary,
          accentColor: AppColorTheme.secondary,
          iconTheme: IconThemeData(color: AppColorTheme.secondary),
          fontFamily: "MuseoSans"),
    ));
