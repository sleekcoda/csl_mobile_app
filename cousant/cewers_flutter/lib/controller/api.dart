import 'dart:convert';

import 'package:cewers_flutter/model/response.dart';
import 'package:cewers_flutter/service/api.dart';
import 'package:shared_preferences/shared_preferences.dart';

class APIController {
  SharedPreferences _pref;
  API api = new API();
  Future<bool> login(Map<String, String> data) async {
    var response = await api.postRequest("api/user/login", data);
    APIResponseModel responseBody =
        APIResponseModel.fromJson(json.decode(response.body));
    storeUserId(responseBody.data["_id"]);
    bool loginSuccess =
        responseBody.message == "authentication successful" ? true : false;
    return loginSuccess;
  }

  Future<bool> sendReport(Map<String, String> data) async {
    var response = await api.postRequest("api/alert", data);
    APIResponseModel responseBody =
        APIResponseModel.fromJson(json.decode(response.body));
    print(response.body['data']['_id']);
    bool loginSuccess =
        responseBody.message == "authentication successful" ? true : false;
    return loginSuccess;
  }

  void storeUserId(String userId) async {
    _pref = await SharedPreferences.getInstance();
    _pref.setString("userId", userId);
    print(userId);
  }
}
