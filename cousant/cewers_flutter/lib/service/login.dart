import 'package:cewers_flutter/model/user_auth.dart';

class LoginController {
  String username;
  String password;
  Future<Map<String, dynamic>> authenticate(
      UserAuthentication authentication) async {
    print(authentication.password);
    print(authentication.username);
    return null;
  }
}
