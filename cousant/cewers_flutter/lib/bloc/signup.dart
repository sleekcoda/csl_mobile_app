import 'package:cewers_flutter/bloc/bloc.dart';
// import 'package:cewers_flutter/model/error.dart';
// import 'package:cewers_flutter/service/api.dart';
// import 'package:shared_preferences/shared_preferences.dart';

class SignupBloc implements Bloc {
  // SharedPreferences _pref;
  // API _api = new API();

  Future<List<String>> getLocalGovernment() async {
    return ["LCDA One", "LCDA two"];
    // _pref = await SharedPreferences.getInstance();
    // String state = _pref.getString("preferredState");
    // var response = await _api.getRequest("whatever/$state");
    // if (response is APIError) return [response.message];
    // return response;
  }

  Future<List<String>> getCommunities(String localGovernment) async {
    return ["CUM One", "CUM two"];
    // var response = await _api.getRequest("whatever/$localGovernment");
    // if (response is APIError) return [response.message];
    // return response;
  }

  void dispose() {}
}
