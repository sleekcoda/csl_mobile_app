import 'package:shared_preferences/shared_preferences.dart';

class StorageController {
  SharedPreferences _pref;

  void storeUserId(String userId) async {
    _pref = await SharedPreferences.getInstance();
    _pref.setString("userId", userId);
    print(userId);
  }

  Future<String> getUserId() async {
    _pref = await SharedPreferences.getInstance();
    return _pref.getString("userId");
  }
}
