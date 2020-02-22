import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_csl/components/colors.dart';
import 'package:flutter_csl/pages/dashboard.dart';
import 'package:flutter_csl/pages/fundaccount.dart';
import 'package:flutter_csl/pages/login.dart';
import 'package:flutter_csl/pages/my-stock.dart';
import 'package:flutter_csl/pages/request-login.dart';

class AppDrawer extends StatelessWidget {
  static Map<String, WidgetBuilder> routes() {
    return {
      "/": (context) => Login(),
      "/dashboard": (context) => Dashboard(),
      "/request-login": (context) => RequestLogin(),
      "/fund-account": (context) => FundAccount(),
      "/my-stocks": (context) => MyStocks(),
    };
  }

  final List<Map<String, String>> _menus = [
    {
      "title": "Dashboard",
      "icon": "asset/icons/home.png",
      "route": "/dashboard"
    },
    {
      "title": "Fund Account",
      "icon": "asset/icons/card.png",
      "route": "/fund-account"
    },
    {
      "title": "My Stocks",
      "icon": "asset/icons/portfolio.png",
      "route": "/my-stocks"
    },
    {
      "title": "My Cash Accounts",
      "icon": "asset/icons/cash.png",
      "route": "/cash-account"
    },
    {
      "title": "Stock Quotes",
      "icon": "asset/icons/trend.png",
      "route": "/stocks"
    },
    {
      "title": "News Headlines",
      "icon": "asset/icons/paper.png",
      "route": "/news"
    },
    {
      "title": "My Watchlist",
      "icon": "asset/icons/watchlist.png",
      "route": "/watchlist"
    },
    {
      "title": "Withdraw Cash",
      "icon": "asset/icons/portfolio-2.png",
      "route": "/withdraw"
    },
    {"title": "Logout", "icon": "asset/icons/logout.png", "route": "/"}
  ];

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('asset/imgs/drawer-background.png'),
            fit: BoxFit.fill,
          ),
        ),
//            color: ,
        child: ListView(
            children: List<Widget>.generate(
          _menus.length,
          (index) {
            return ListTile(
              leading: ImageIcon(AssetImage(_menus[index]["icon"]),
                  color: _menus[index]["title"] != "Logout"
                      ? AppColorTheme.secondary
                      : Colors.red),
              title: Text(
                _menus[index]["title"],
                style: TextStyle(color: Colors.white),
              ),
              onTap: () {
                Navigator.pushNamed(context, _menus[index]["route"]);
              },
            );
          },
        )),
      ),
    );
  }
}
