import 'package:cewers_flutter/pages/alert.dart';
import 'package:cewers_flutter/pages/enter-details.dart';
import 'package:cewers_flutter/pages/home.dart';
import 'package:cewers_flutter/pages/login.dart';
import 'package:cewers_flutter/pages/select-crime.dart';
import 'package:cewers_flutter/pages/sign_up.dart';
import 'package:cewers_flutter/pages/success.dart';
import 'package:cewers_flutter/pages/welcome.dart';
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
          primaryColor: primaryColor,
          accentColor: secondaryColor,
          appBarTheme: AppBarTheme(
            textTheme: TextTheme(
                title: AppBarStyle,
                subhead: SubHeadStyle,
                display1: PeriodStyle,
                button: ButtonStyle),
          ),
          textTheme: TextTheme(title: TitleStyle)),
      initialRoute: "/",
      routes: {
        "/": (context) => WelcomePage(),
        "/login": (context) => LoginPage(),
        "/sign-up": (context) => SignUpPage(),
        "/success": (context) => SuccessPage(),
        "/home": (context) => HomePage(),
        "/select-crime": (context) => SelectCrimePage(),
        "/enter-details": (context) => EnterDetailPage(),
        "/alert": (context) => AlertsPage(),
        "/map": (context) => AlertsPage(),
        "/feedback": (context) => AlertsPage(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
