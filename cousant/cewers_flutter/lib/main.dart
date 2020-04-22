import 'package:cewers_flutter/pages/login.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
          primaryColor: Color.fromRGBO(252, 37, 86, 1),
          accentColor: Color.fromRGBO(29, 42, 56, 1),
          appBarTheme: AppBarTheme(
              textTheme: TextTheme(
                  title: AppBarStyle,
                  display1: PeriodStyle,
                  button: ButtonStyle)),
          textTheme: TextTheme(title: TitleStyle)),
      initialRoute: "/",
      routes: {"/": (context) => LoginPage()},
      debugShowCheckedModeBanner: false,
    );
  }
}
