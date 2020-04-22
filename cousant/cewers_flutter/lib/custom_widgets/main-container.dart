import 'package:cewers_flutter/custom_widgets/cewer_title.dart';
import 'package:flutter/material.dart';

class MainContainer extends StatelessWidget {
  final Widget child;
  final BoxDecoration decoration;
  final bool displayAppBar;
  MainContainer(
      {Key key,
      @required this.child,
      @required this.decoration,
      this.displayAppBar})
      : super(key: key);

  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: displayAppBar ? CewerAppBar() : null,
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Container(
        decoration: decoration,
        child: child,
      ),
    );
  }
}
