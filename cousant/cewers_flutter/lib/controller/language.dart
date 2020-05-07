import 'dart:async';

import 'package:shared_preferences/shared_preferences.dart';

class LanguageController {
  SharedPreferences _pref;
  String lang;

  final _controller = new StreamController<String>();
  StreamSink<String> get _stream => _controller.sink;
  Stream<String> get stream => _controller.stream;

  Future<void> setLanguage(String state) async {
    _pref = await SharedPreferences.getInstance();

    _pref.setString("preferredState", state);
    _stream.add(state);
  }

  void resetLanguage() async {
    _pref = await SharedPreferences.getInstance();

    await _pref.setString("preferredState", null);
    _stream.add(null);
  }

  Future<String> getLanguage() async {
    _pref = await SharedPreferences.getInstance();

    return _pref.getString("preferredState");
  }

  void closeStream() {
    print("dispose");
    _stream.close();
    _controller.close();
  }
}
