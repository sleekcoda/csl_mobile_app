import 'dart:convert';

import 'package:http/http.dart' as http;

class API {
  Uri baseUrl = Uri(scheme: "http", host: "6203ee65.ngrok.io");
  Map<String, String> headers = {"Content-Type": "application/json"};

  Future<dynamic> postRequest(String path, Map<String, dynamic> data) async {
    var body = json.encode(data);
    http.Response response =
        await http.post("$baseUrl/$path", headers: headers, body: body);
    return response;
  }

  Future<dynamic> getRequest(String path) async {
    var response = await http.post("$baseUrl/$path", headers: headers);
    print("${response.statusCode}");
    print("${response.body}");
    return response;
  }

  Future<dynamic> putRequest(String path, Map<String, String> data) async {
    var body = json.encode(data);
    var response =
        await http.put("$baseUrl/$path", headers: headers, body: body);
    print("${response.statusCode}");
    print("${response.body}");
    return response;
  }
}
