import 'dart:convert';

import 'package:cewers_flutter/controller/storage.dart';
import 'package:cewers_flutter/model/response.dart';
import 'package:cewers_flutter/service/api.dart';

class APIController {
  API api = new API();
  Future<bool> login(Map<String, String> data) async {
    print(data);
    var response = await api.postRequest("api/user/login", data);
    APIResponseModel responseBody =
        APIResponseModel.fromJson(json.decode(response.body));
    bool loginSuccess =
        responseBody.message == "authentication successful" ? true : false;

    if (loginSuccess) {
      var storage = new StorageController();
      storage.storeUserId(responseBody.data["_id"]);
    }
    return loginSuccess;
  }
}
