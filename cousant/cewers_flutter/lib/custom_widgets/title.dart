import 'package:flutter/material.dart';

class FormTitleText extends StatelessWidget {
  final String text;

  FormTitleText({Key key, this.text}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        minimum: EdgeInsets.only(top: 20, bottom: 20),
        child: Align(
          alignment: Alignment.topLeft,
          child: Text(
            text,
            style: Theme.of(context).textTheme.title,
            textAlign: TextAlign.left,
            textDirection: TextDirection.ltr,
          ),
        ));
  }
}
