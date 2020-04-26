import 'package:cewers_flutter/screens/alert.dart';
import 'package:cewers_flutter/screens/enter-details.dart';
import 'package:cewers_flutter/screens/home.dart';
import 'package:cewers_flutter/screens/login.dart';
import 'package:cewers_flutter/screens/select-crime.dart';
import 'package:cewers_flutter/screens/sign_up.dart';
import 'package:cewers_flutter/screens/success.dart';
import 'package:cewers_flutter/screens/welcome.dart';
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
        "/": (context) => WelcomeScreen(),
        "/login": (context) => LoginScreen(),
        "/sign-up": (context) => SignUpScreen(),
        "/success": (context) => SuccessScreen(),
        "/home": (context) => HomeScreen(),
        "/select-crime": (context) => SelectCrimeScreen(),
        "/enter-details": (context) => EnterDetailScreen(),
        "/alert": (context) => AlertsScreen(),
        "/map": (context) => AlertsScreen(),
        "/feedback": (context) => AlertsScreen(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
