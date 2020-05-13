import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:cewers_flutter/model/response.dart';
import 'package:cewers_flutter/service/api.dart';

class SignUpController {
  API api = new API();
  Future<APIResponseModel> register(
      Map<String, Map<String, String>> data) async {
    http.Response response = await api.postRequest("user", data);
    return APIResponseModel.fromJson(json.decode(response.body));
  }
}
