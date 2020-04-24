import 'package:flutter/material.dart';

const double largeTextSize = 32;
const double mediumTextSize = 26;
const double normalTextSize = 18;
const double smallTextSize = 12;

const String fontPlayFair = "Playfair";
const String fontRoboto = "Roboto";

const Color primaryColor = Color.fromRGBO(252, 37, 86, 1);
const Color secondaryColor = Color.fromRGBO(29, 42, 56, 1);
const AppBarStyle = TextStyle(
    fontFamily: fontPlayFair,
    fontWeight: FontWeight.w500,
    color: secondaryColor,
    fontSize: mediumTextSize,
    fontStyle: FontStyle.italic);

const TitleStyle = TextStyle(
    fontFamily: fontPlayFair,
    fontWeight: FontWeight.w700,
    fontSize: largeTextSize);

const SubHeadStyle =
    TextStyle(color: primaryColor, fontWeight: FontWeight.w700, fontSize: 20);

const PeriodStyle = TextStyle(
    fontFamily: fontPlayFair,
    fontWeight: FontWeight.w700,
    color: primaryColor,
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
