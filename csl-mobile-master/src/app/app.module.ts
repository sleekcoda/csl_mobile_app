import { CardOtpPage } from './../pages/card-otp/card-otp';
import { PortfolioListPage } from './../pages/portfolio-list/portfolio-list';
import { ViewStockPage } from './../pages/view-stock/view-stock';
import { SellAndBuyStocksPage } from './../pages/sell-and-buy-stocks/sell-and-buy-stocks';
import { PortfolioInvestmentDetailsPage } from './../pages/portfolio-investment-details/portfolio-investment-details';
import { ViewWatchlistDetailsPage } from './../pages/view-watchlist-details/view-watchlist-details';
import { AddWatchlistPage } from './../pages/add-watchlist/add-watchlist';
import { WatchlistDetailsPage } from './../pages/confirm-watchlist-details/watchlist-details';
import { ConfirmBuyOrderPage } from './../pages/confirm-buy-order/confirm-buy-order';
import { MyPortfolioPage } from './../pages/my-portfolio/my-portfolio';
import { PortfoliosPage } from './../pages/portfolios/portfolios';
import { OrdersPage } from './../pages/orders/orders';
import { CashStatementPage } from './../pages/cash-statement/cash-statement';
import { TopGainersPage } from './../pages/top-gainers/top-gainers';
import { TopLosersPage } from './../pages/top-losers/top-losers';
import { PriceListPage } from './../pages/price-list/price-list';
import { EnterCardDetailsPage } from './../pages/enter-card-details/enter-card-details';
import { ConfirmCardDetailsPage } from './../pages/confirm-card-details/confirm-card-details';
import { SelectCashAccountPage } from './../pages/select-cash-account/select-cash-account';
import { PayAtBankPage } from './../pages/pay-at-bank/pay-at-bank';
import { StockQuotesPage } from './../pages/stock-quotes/stock-quotes';
import { WithdrawCashPage } from './../pages/withdraw-cash/withdraw-cash';
import { NewsHeadLinesPage } from './../pages/news-head-lines/news-head-lines';
import { MyWatchlistPage } from './../pages/my-watchlist/my-watchlist';
import { MyStocksPage } from './../pages/my-stocks/my-stocks';
import { MyCashAccountsPage } from './../pages/my-cash-accounts/my-cash-accounts';
import { FundAccountPage } from './../pages/fund-account/fund-account';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { ConfirmationPage } from './../pages/confirmation/confirmation';
import { SetPasswordPage } from './../pages/set-password/set-password';
import { OptValidationPage } from './../pages/opt-validation/opt-validation';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { CSL } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { RequestLoginPage } from '../pages/request-login/request-login';
import { NoticeHandlerProvider } from '../providers/notice-handler/notice-handler';
import { IonicStorageModule } from '@ionic/storage';
import { DashboardProvider } from '../providers/dashboard/dashboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OpenExecutedOrdersPage } from '../pages/open-executed-orders/open-executed-orders';
import { OpenOrdersPage } from '../pages/open-orders/open-orders';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CSL,
    LoginPage,
    RequestLoginPage,
    OptValidationPage,
    SetPasswordPage,
    ConfirmationPage,
    DashboardPage,
    FundAccountPage,
    MyCashAccountsPage,
    MyStocksPage,
    MyWatchlistPage,
    NewsHeadLinesPage,
    StockQuotesPage,
    WithdrawCashPage,
    PayAtBankPage,
    SelectCashAccountPage,
    EnterCardDetailsPage,
    CashStatementPage,
    ConfirmCardDetailsPage,
    PriceListPage,
    TopLosersPage,
    TopGainersPage,
    OrdersPage,
    PortfoliosPage,
    MyPortfolioPage,
    ConfirmBuyOrderPage,
    WatchlistDetailsPage,
    AddWatchlistPage,
    ViewWatchlistDetailsPage,
    PortfolioInvestmentDetailsPage,
    OpenExecutedOrdersPage,
    OpenOrdersPage,
    SellAndBuyStocksPage,
    ViewStockPage,
    PortfolioListPage,
    CardOtpPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(CSL),
    IonicStorageModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CSL,
    LoginPage,
    RequestLoginPage,
    OptValidationPage,
    SetPasswordPage,
    ConfirmationPage,
    DashboardPage,
    FundAccountPage,
    MyCashAccountsPage,
    MyStocksPage,
    MyWatchlistPage,
    NewsHeadLinesPage,
    StockQuotesPage,
    WithdrawCashPage,
    PayAtBankPage,
    SelectCashAccountPage,
    EnterCardDetailsPage,
    ConfirmCardDetailsPage,
    CashStatementPage,
    PriceListPage,
    TopLosersPage,
    TopGainersPage,
    OrdersPage,
    PortfoliosPage,
    MyPortfolioPage,
    ConfirmBuyOrderPage,
    WatchlistDetailsPage,
    AddWatchlistPage,
    ViewWatchlistDetailsPage,
    PortfolioInvestmentDetailsPage,
    OpenExecutedOrdersPage,
    OpenOrdersPage,
    SellAndBuyStocksPage,
    ViewStockPage,
    PortfolioListPage,
    CardOtpPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoticeHandlerProvider,
    DashboardProvider,
    InAppBrowser
  ]
})
export class AppModule {}