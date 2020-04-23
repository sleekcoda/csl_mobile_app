import 'package:flutter/material.dart';

class FormTextField extends StatelessWidget {
  final double topMargin;
  final double bottomMargin;
  final double width;
  final double height;
  final TextFormField textFormField;
  FormTextField(
      {Key key,
      this.bottomMargin,
      this.topMargin,
      this.textFormField,
      this.width,
      this.height});
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.only(top: 5),
        margin: EdgeInsets.only(top: topMargin ?? 5, bottom: bottomMargin ?? 5),
        height: height ?? 53,
        width: width ?? MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                  offset: Offset(1, 1.5),
                  blurRadius: 3,
                  color: Color.fromRGBO(52, 52, 52, .4))
            ],
            borderRadius: BorderRadius.circular(18.0)),
        child: textFormField);
  }
}
