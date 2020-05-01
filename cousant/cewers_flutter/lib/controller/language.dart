import 'package:shared_preferences/shared_preferences.dart';

class LanguageController {
  SharedPreferences _pref;

  Future<void> setLanguage(String state) async {
    _pref = await SharedPreferences.getInstance();

    _pref.setString("preferredState", state);
  }

  void resetLanguage() async {}

  Future<String> getLanguage() async {
    _pref = await SharedPreferences.getInstance();

    return _pref.getString("preferredState");
  }
}
