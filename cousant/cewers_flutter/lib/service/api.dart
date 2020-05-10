import 'dart:convert';

import 'package:cewers_flutter/model/error.dart';
import 'package:http/http.dart' as http;

class API {
  Uri baseUrl = Uri(scheme: "http", host: "bb7fee11.ngrok.io", port: 80);
  Map<String, String> headers = {"Content-Type": "application/json"};

  Future<dynamic> postRequest(String path, Map<String, dynamic> data) async {
    var body = json.encode(data);
    http.Response response =
        await http.post("$baseUrl/$path", headers: headers, body: body);
    if (response.statusCode == 200)
      return response.body;
    else
      return APIError("Server error");
  }

  Future<dynamic> getRequest(String path) async {
    final response = await http.post("$baseUrl/$path", headers: headers);
    if (response.statusCode == 200)
      return response.body;
    else
      return APIError("Location not found");
  }

  Future<dynamic> putRequest(String path, Map<String, String> data) async {
    final body = json.encode(data);
    var response =
        await http.put("$baseUrl/$path", headers: headers, body: body);
    if (response.statusCode == 200)
      return response.body;
    else
      return APIError("Location not found");
  }
}
