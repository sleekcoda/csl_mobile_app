import 'package:cewers_flutter/style.dart';
import 'package:flutter/material.dart';

class ActionButtonBar extends StatelessWidget {
  final String text;
  final Function action;

  ActionButtonBar({Key key, this.text, this.action});

  Widget build(BuildContext context) {
    return SizedBox(
      width: 253,
      child: RaisedButton(
        textColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18.0),
          side: BorderSide(
            color: Color.fromRGBO(252, 37, 86, 1),
          ),
        ),
        color: Colors.red,
        onPressed: action,
        padding: EdgeInsets.only(top: 12, bottom: 10),
        child: Text(
          text,
          style: ButtonStyle,
        ),
      ),
    );
  }
}
