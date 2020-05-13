import 'dart:io';
import 'package:cloudinary_client/models/CloudinaryResponse.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:cloudinary_client/cloudinary_client.dart';
import 'package:image_picker/image_picker.dart';

class SendReportBloc {
  Future uploadImage(
    File file,
    String path,
    String filename,
  ) async {
    var json = await rootBundle.loadString('assets/cloudinary.json');
    Cloudinary auth = Cloudinary.fromJson(json);
    CloudinaryClient client =
        new CloudinaryClient(auth.secretKey, auth.apiKey, "cloud_name");
    List<CloudinaryResponse> response =
        await client.uploadImages(['file'], filename: "null", folder: "null");
    return response;
  }

  void pickFile(File file) async {
    file = await ImagePicker.pickImage(source: ImageSource.camera);
    print(file);
  }
}

class Cloudinary {
  final String apiKey;
  final String secretKey;
  Cloudinary(this.apiKey, this.secretKey);
  factory Cloudinary.fromJson(dynamic json) {
    return Cloudinary(json["key"], json["secret"]);
  }
}
