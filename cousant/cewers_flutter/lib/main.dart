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
import 'package:get_it/get_it.dart';

GetIt getIt = GetIt.instance;

void main() {
  getIt.registerSingleton<LanguageController>(LanguageController(),
      signalsReady: true);
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  _MyApp createState() => _MyApp();
}

class _MyApp extends State<MyApp> {
  // This widget is the root of your application.
  Future _future;
  final Map<String, Color> _primaryColors = {
    "taraba": primaryColor,
    "benue": benueColor,
    "nasarawa": nasarawaColor
  };

  final Map<String, Color> _secondaryColors = {
    "taraba": primaryColor,
    "benue": benueColor,
    "nasarawa": nasarawaColor
  };

  Color _getPrimaryColor(String state) {
    return state == null ? primaryColor : _primaryColors[state.toLowerCase()];
  }

  Color _getSecondaryColor(String state) {
    return state == null
        ? secondaryColor
        : _secondaryColors[state.toLowerCase()];
  }

  @override
  void initState() {
    getIt
        .isReady<LanguageController>()
        .then((_) => getIt<LanguageController>().getLanguage());
    _future = getIt<LanguageController>().getLanguage();
    super.initState();
  }

  void dispose() {
    getIt<LanguageController>().closeStream();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: _future,
        builder: (context, snapshot) {
          return MaterialApp(
            title: 'Flutter Demo',
            theme: ThemeData(
                primaryColor: _getPrimaryColor(snapshot.data),
                accentColor: _getSecondaryColor(snapshot.data),
                appBarTheme: AppBarTheme(
                  textTheme: TextTheme(
                    title: appBarStyle(context),
                    subhead: subHeadStyle(context),
                    display2: coloredHeaderStyle(context),
                    button: TextStyle(
                      fontFamily: fontRoboto,
                      fontWeight: FontWeight.w500,
                      color: Theme.of(context).primaryColor,
                      fontSize: 28,
                    ),
                  ),
                ),
                textTheme: TextTheme(title: TitleStyle)),
            initialRoute: "/",
            routes: {
              "/": (context) {
                print("${snapshot.data} + ");
                if (snapshot.data == "" || snapshot.data == null) {
                  return SelectStateScreen();
                }
                return WelcomeScreen();
              },
              // WelcomeScreen.route: (context) => WelcomeScreen(),
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
        });
  }
}
