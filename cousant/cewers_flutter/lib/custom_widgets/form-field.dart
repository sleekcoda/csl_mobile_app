import 'package:flutter/material.dart';

class FormTextField extends StatelessWidget {
  final double topMargin;
  final double bottomMargin;
  final TextFormField textFormField;
  FormTextField(
      {Key key, this.bottomMargin, this.topMargin, this.textFormField});
  Widget build(BuildContext buildContext) {
    return Container(
        margin:
            EdgeInsets.only(top: topMargin ?? 10, bottom: bottomMargin ?? 10),
        width: MediaQuery.of(buildContext).size.width - 80,
        height: 53,
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
