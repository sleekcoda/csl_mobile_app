import 'package:cewers_flutter/controller/language.dart';
import 'package:cewers_flutter/screens/alert.dart';
import 'package:cewers_flutter/screens/enter-details.dart';
import 'package:cewers_flutter/screens/home.dart';
import 'package:cewers_flutter/screens/login.dart';
import 'package:cewers_flutter/screens/select-crime.dart';
import 'package:cewers_flutter/screens/select-state.dart';
import 'package:cewers_flutter/screens/sign_up.dart';
import 'package:cewers_flutter/screens/success.dart';
import 'package:cewers_flutter/screens/welcome.dart';
import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  _MyApp createState() => _MyApp();
}

class _MyApp extends State<MyApp> {
  // This widget is the root of your application.
  LanguageController _languageController = new LanguageController();
  String _preferredLanguage;

  initState() {
    super.initState();
    getLanguage();
  }

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
        "/": (context) {
          if (this._preferredLanguage == "" ||
              this._preferredLanguage == null) {
            return SelectStateScreen();
          }
          return WelcomeSreen(this._preferredLanguage);
        },
        LoginScreen.route: (context) => LoginScreen(),
        SignUpScreen.route: (context) => SignUpScreen(),
        SuccessScreen.route: (context) => SuccessScreen(),
        HomeScreen.route: (context) => HomeScreen(),
        SelectCrimeScreen.route: (context) => SelectCrimeScreen(),
        EnterDetailScreen.route: (context) => EnterDetailScreen(),
        AlertsScreen.route: (context) => AlertsScreen(),
        AlertsScreen.route: (context) => AlertsScreen(),
        AlertsScreen.route: (context) => AlertsScreen(),
      },
      debugShowCheckedModeBanner: false,
    );
  }

  Future<void> getLanguage() async {
    this._preferredLanguage = await _languageController.getLanguage();
  }
}
