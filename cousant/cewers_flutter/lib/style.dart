import 'package:flutter/material.dart';

const double largeTextSize = 32;
const double mediumTextSize = 26;
const double normalTextSize = 18;
const double smallTextSize = 12;

const String fontPlayFair = "Playfair";
const String fontRoboto = "Roboto";

const AppBarStyle = TextStyle(
    fontFamily: fontPlayFair,
    fontWeight: FontWeight.w500,
    color: Color.fromRGBO(29, 42, 56, 1),
    fontSize: mediumTextSize,
    fontStyle: FontStyle.italic);

const TitleStyle = TextStyle(
    fontFamily: fontPlayFair,
    fontWeight: FontWeight.w700,
    fontSize: largeTextSize);

const PeriodStyle = TextStyle(
    fontFamily: fontPlayFair,
    fontWeight: FontWeight.w700,
    color: Color.fromRGBO(252, 37, 86, 1),
    fontSize: mediumTextSize,
    fontStyle: FontStyle.italic);

const ButtonStyle = TextStyle(
    fontFamily: fontRoboto,
    fontWeight: FontWeight.w500,
    color: Colors.white,
    fontSize: mediumTextSize);

BoxDecoration bgDecoration([String uri]) {
  return BoxDecoration(
      image: DecorationImage(
          image: AssetImage(uri ?? "assets/backgrounds/bg-cloud-circle.png"),
          fit: BoxFit.cover));
}

InputDecoration formDecoration(String placeholder, String icon) =>
    InputDecoration(
      border: InputBorder.none,
      focusedBorder: InputBorder.none,
      enabledBorder: InputBorder.none,
      prefixIcon: ImageIcon(AssetImage(icon ?? "assets/icons/person.png")),
      hintText: placeholder,
    );
