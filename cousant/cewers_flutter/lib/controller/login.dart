import 'dart:convert';

import 'package:cewers_flutter/model/response.dart';
import 'package:cewers_flutter/service/api.dart';

class LoginController {
  API api = new API();
  Future<bool> login(Map<String, String> data) async {
    var response = await api.postRequest("api/user/login", data);
    APIResponseModel responseBody =
        APIResponseModel.fromJson(json.decode(response.body));
    print(responseBody.message);
    bool loginSuccess =
        responseBody.message == "authentication successful" ? true : false;
    return loginSuccess;
  }
}
