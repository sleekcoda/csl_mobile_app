import 'package:flutter/rendering.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geocoder/geocoder.dart';

class GeoLocation {
  Future<Position> getLocation() async {
    Position position = await Geolocator()
        .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    debugPrint('location: ${position.latitude}');
    final coordinates = new Coordinates(position.latitude, position.longitude);
    var addresses =
        await Geocoder.local.findAddressesFromCoordinates(coordinates);
    var first = addresses.first;
    print("${first.featureName} : ${first.addressLine}");
    print("${position.latitude} ${position.longitude}");
    return position;
  }
}
