import { HttpClient } from "@angular/common/http";
import {
  Injectable,
  OnDestroy,
  EventEmitter,
  Output,
  OnInit
} from "@angular/core";

import {
  RequestResponse,
  RequestResponseOfItems
} from "./../authentication/auth.model";

@Injectable({ providedIn: "root" })
export class DashboardProvider implements OnDestroy, OnInit {
  private apiBaseUrl = "https://41.223.147.111/api";
  private token: string;
  private customerId: string;
  private headers: any;
  @Output() _event = new EventEmitter<{ type: string; value: any }>();
  constructor(private _httpClient: HttpClient) {
    this.headers = { "Content-Type": "application/json" };
    this._event.subscribe("", (customerId, token) => {
      this.customerId = customerId;
      this.token = token;
      this.headers.Authorization = "Bearer " + this.token;
    });
  }
  ngOnInit() {
    this._event.emit({
      type: "app:userAuthenticateToken",
      value: { customerId: null, token: null }
    });
  }
  ngOnDestroy() {
    this._event.unsubscribe();
    this._event.unsubscribe();
  }
  /**
   * All GET request
   * paramscustomerId
   * paramsheaders
   */
  getPortfolio(customerId: string): Promise<RequestResponse> {
    return this._httpClient
      .get<RequestResponse>(`${this.apiBaseUrl}/portfolios/${customerId}/`, {
        headers: this.headers
      })
      .toPromise();
  }
  getPortfolioBalance(
    customerId: string,
    portId: string
  ): Promise<RequestResponse> {
    return this._httpClient
      .get<RequestResponse>(
        `${this.apiBaseUrl}/portfolios/${portId}/${customerId}/balance`,
        { headers: this.headers }
      )
      .toPromise();
  }

  getPorfolioInvestments(
    customerId: string,
    cscsNumber: string
  ): Promise<RequestResponseOfItems> {
    return this._httpClient
      .get<RequestResponseOfItems>(
        `${this.apiBaseUrl}/portfolios/${customerId}/investments/${cscsNumber}`,
        { headers: this.headers }
      )
      .toPromise();
  }

  getCashAccountStatement(customerId: string): Promise<RequestResponse> {
    return this._httpClient
      .get<RequestResponse>(`${this.apiBaseUrl}/cashaccounts/${customerId}`, {
        headers: this.headers
      })
      .toPromise();
  }

  plainGetRequest(path: string): Promise<RequestResponse> {
    return this._httpClient
      .get<RequestResponse>(`${this.apiBaseUrl}/${path}`, {
        headers: this.headers
      })
      .toPromise();
  }
  getNews() {
    return this._httpClient
      .get("https://allafrica.com/tools/headlines/rdf/nigeria/headlines.rdf", {
        headers: {
          "Content-Type": "text/xml",
          Accept: "application/xhtml+xml",
          "Response-Type": "text"
        },
        responseType: "text"
      })
      .toPromise();
  }

  getWatchLists(): Promise<RequestResponse> {
    return this._httpClient
      .get<RequestResponse>(`${this.apiBaseUrl}/watchlist`, {
        headers: this.headers
      })
      .toPromise();
  }

  getWatchList(watchlistId: string): Promise<RequestResponse> {
    return this._httpClient
      .get<RequestResponse>(`${this.apiBaseUrl}/watchlist/${watchlistId}`, {
        headers: this.headers
      })
      .toPromise();
  }

  /**
   * All POST request
   * params customerId
   * params headers
   */

  getAccountStatement(path: string, body: any): Promise<RequestResponse> {
    return this._httpClient
      .post<RequestResponse>(`${this.apiBaseUrl}/cashaccounts/${path}`, body, {
        headers: this.headers
      })
      .toPromise();
  }

  buyStock(body: any): Promise<RequestResponse> {
    return this._httpClient
      .post<RequestResponse>(`${this.apiBaseUrl}/stocks/buy`, body, {
        headers: this.headers
      })
      .toPromise();
  }

  sellStock(body: any): Promise<RequestResponse> {
    return this._httpClient
      .post<RequestResponse>(`${this.apiBaseUrl}/stocks/sell`, body, {
        headers: this.headers
      })
      .toPromise();
  }

  addToWatchlist(formData: any): Promise<RequestResponse> {
    return this._httpClient
      .post<RequestResponse>(`${this.apiBaseUrl}/watchlist/add`, formData, {
        headers: this.headers
      })
      .toPromise();
  }

  chargeCard(postdata: any): Promise<RequestResponse> {
    return this._httpClient
      .post<RequestResponse>(
        "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge",
        postdata,
        { headers: { "Content-Type": "application/json" } }
      )
      .toPromise();
  }

  withdrawCash(path: string, formData: any): Promise<RequestResponse> {
    return this._httpClient
      .post<RequestResponse>(`${this.apiBaseUrl}/${path}`, formData, {
        headers: this.headers
      })
      .toPromise();
  }

  requestCustomerLogin(customerId: string): Promise<RequestResponse> {
    return this._httpClient
      .get<RequestResponse>(
        `${this.apiBaseUrl}/customer/${customerId}/requestLogin`,
        { headers: this.headers }
      )
      .toPromise();
  }

  makePostRequest(path, params): Promise<RequestResponse> {
    return this._httpClient
      .post<RequestResponse>(`${this.apiBaseUrl}/${path}`, params, {
        headers: this.headers
      })
      .toPromise();
  }

  makeTokenPost(path: string, params: string, headers: any) {
    return this._httpClient
      .post<RequestResponse>(`${this.apiBaseUrl}/${path}`, params, {
        headers
      })
      .toPromise();
  }
}
