import 'dart:async';

import 'package:rxdart/subjects.dart';
import 'package:shared_preferences/shared_preferences.dart';

class StateController {
  SharedPreferences _pref;
  String lang;

  final _controller = new BehaviorSubject<String>();
  StreamSink<String> get _stream => _controller.sink;
  Stream<String> get stream => _controller.stream;

  setState(String state) async {
    _pref = await SharedPreferences.getInstance();

    _pref.setString("preferredState", state);
  }

  void resetState() async {
    _pref = await SharedPreferences.getInstance();

    await _pref.setString("preferredState", null);
    _stream.add(null);
  }

  Future<String> getState() async {
    _pref = await SharedPreferences.getInstance();
    Future.delayed(Duration(minutes: 100));
    return _pref.getString("preferredState");
  }

  void closeStream() {
    print("dispose");
    _stream.close();
    _controller.close();
  }
}
