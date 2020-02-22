import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AddWatchlistPage } from "./pages/add-watchlist/add-watchlist";
import { LoginPage } from "./pages/login/login";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { CardOtpPage } from "./pages/card-otp/card-otp";
import { CashStatementPage } from "./pages/cash-statement/cash-statement";
import { ConfirmBuyOrderPage } from "./pages/confirm-buy-order/confirm-buy-order";
import { ConfirmCardDetailsPage } from "./pages/confirm-card-details/confirm-card-details";
import { WatchlistDetailsPage } from "./pages/confirm-watchlist-details/watchlist-details";
import { ConfirmationPage } from "./pages/confirmation/confirmation";
import { EnterCardDetailsPage } from "./pages/enter-card-details/enter-card-details";
import { FundAccountPage } from "./pages/fund-account/fund-account";
import { MyCashAccountsPage } from "./pages/my-cash-accounts/my-cash-accounts";
import { MyPortfolioPage } from "./pages/my-portfolio/my-portfolio";
import { MyStocksPage } from "./pages/my-stocks/my-stocks";
import { MyWatchlistPage } from "./pages/my-watchlist/my-watchlist";
import { NewsHeadLinesPage } from "./pages/news-head-lines/news-head-lines";
import { OpenExecutedOrdersPage } from "./pages/open-executed-orders/open-executed-orders";
import { OpenOrdersPage } from "./pages/open-orders/open-orders";
import { OptValidationPage } from "./pages/opt-validation/opt-validation";
import { WithdrawCashPage } from "./pages/withdraw-cash/withdraw-cash";
import { ViewWatchlistDetailsPage } from "./pages/view-watchlist-details/view-watchlist-details";
import { TopLosersPage } from "./pages/top-losers/top-losers";
import { TopGainersPage } from "./pages/top-gainers/top-gainers";
import { StockQuotesPage } from "./pages/stock-quotes/stock-quotes";
import { SetPasswordPage } from "./pages/set-password/set-password";
import { SellAndBuyStocksPage } from "./pages/sell-and-buy-stocks/sell-and-buy-stocks";
import { SelectCashAccountPage } from "./pages/select-cash-account/select-cash-account";
import { RequestLoginPage } from "./pages/request-login/request-login";
import { PriceListPage } from "./pages/price-list/price-list";
import { PortfoliosPage } from "./pages/portfolios/portfolios";
import { PortfolioListPage } from "./pages/portfolio-list/portfolio-list";
import { PortfolioInvestmentDetailsPage } from "./pages/portfolio-investment-details/portfolio-investment-details";
import { PayAtBankPage } from "./pages/pay-at-bank/pay-at-bank";
import { OrdersPage } from "./pages/orders/orders";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "AddWatchListPage",
    component: AddWatchlistPage
  },
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "dashboard",
    component: DashboardPage
  },
  {
    path: "CardOtpPage",
    component: CardOtpPage
  },
  {
    path: "CashStatementPage",
    component: CashStatementPage
  },
  {
    path: "ConfirmBuyOrderPage",
    component: ConfirmBuyOrderPage
  },
  {
    path: "ConfirmCardDetailsPage",
    component: ConfirmCardDetailsPage
  },
  {
    path: "WatchlistDetailsPage",
    component: WatchlistDetailsPage
  },
  {
    path: "ConfirmationPage",
    component: ConfirmationPage
  },
  {
    path: "EnterCardDetailsPage",
    component: EnterCardDetailsPage
  },
  {
    path: "FundAccountPage",
    component: FundAccountPage
  },
  {
    path: "MyCashAccountsPage",
    component: MyCashAccountsPage
  },
  {
    path: "MyPortfolioPage",
    component: MyPortfolioPage
  },
  {
    path: "MyStocksPage",
    component: MyStocksPage
  },
  {
    path: "MyWatchlistPage",
    component: MyWatchlistPage
  },
  {
    path: "NewsHeadLinesPage",
    component: NewsHeadLinesPage
  },
  {
    path: "OpenExecutedOrdersPage",
    component: OpenExecutedOrdersPage
  },
  {
    path: "",
    component: OpenOrdersPage
  },
  {
    path: "",
    component: OptValidationPage
  },
  {
    path: "OrdersPage",
    component: OrdersPage
  },
  {
    path: "PayAtBankPage",
    component: PayAtBankPage
  },
  {
    path: "PortfolioInvestmentDetailsPage",
    component: PortfolioInvestmentDetailsPage
  },
  {
    path: "PortfolioListPage",
    component: PortfolioListPage
  },
  {
    path: "PortfoliosPage",
    component: PortfoliosPage
  },
  {
    path: "PriceListPage",
    component: PriceListPage
  },
  {
    path: "RequestLoginPage",
    component: RequestLoginPage
  },
  {
    path: "SelectCashAccountPage",
    component: SelectCashAccountPage
  },
  {
    path: "SellAndBuyStocksPage",
    component: SellAndBuyStocksPage
  },
  {
    path: "SetPasswordPage",
    component: SetPasswordPage
  },
  {
    path: "StockQuotesPage",
    component: StockQuotesPage
  },
  {
    path: "TopGainersPage",
    component: TopGainersPage
  },
  {
    path: "TopLosersPage",
    component: TopLosersPage
  },
  {
    path: "ViewWatchlistDetailsPage",
    component: ViewWatchlistDetailsPage
  },
  {
    path: "WithdrawCashPage",
    component: WithdrawCashPage
  }
  // ,
  // {
  //   path: 'new',
  //   loadChildren: () => import('./pages/new/new.module').then( m => m.NewPageModule)
  // },
  // {
  //   path: 'new-test',
  //   loadChildren: () => import('./pages/new-test/new-test.module').then( m => m.NewTestPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
