class HTTPResponse {
  dynamic _data;
  String _message;
  String _status;

  String get status => _status;
  String get message => _message;
  dynamic get data => _data;
}
