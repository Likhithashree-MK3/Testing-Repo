webpackJsonp([41],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilizationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UtilizationPage = (function () {
    function UtilizationPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.UtilizationDetails = {};
        this.EmployeeListUtilization = [];
        this.FinalEmployeeListUtilization = [];
        this.EmployeeDetailsUtilization = {};
        this.FilterList = ["Last 7 days"];
        this.isExpanded = false;
        this.SelectedFilter = "2";
        this.SelectedFilterName = "Last 7 Days";
        this.IsSorted = false;
        this.global.HeaderTitle = "Utilization";
        this.LastDay = new Date(new Date().setDate(new Date().getDate() - 1));
        var date = new Date();
        var date1 = new Date();
        var d1 = new Date(date.setMonth(date.getMonth() - 6));
        this.Last6Month = d1.getFullYear() + "-" + ((d1.getMonth() + 1) > 9 ? (d1.getMonth() + 1) : ("0" + (d1.getMonth() + 1))) + "-" + ((d1.getDate() + 1) > 9 ? (d1.getDate()) : ("0" + (d1.getDate())));
        this.TodaysDate = date1.getFullYear() + "-" + ((date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : ("0" + (date1.getMonth() + 1))) + "-" + ((date1.getDate() + 1) > 9 ? (date1.getDate()) : ("0" + (date1.getDate())));
    }
    UtilizationPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            var fromDate_1;
            var toDate_1;
            if (this.SelectedFilter == "6") {
                var d1 = new Date(this.SearchFromDate);
                fromDate_1 = d1.getFullYear() + "-" + ((d1.getMonth() + 1) > 9 ? (d1.getMonth() + 1) : ("0" + (d1.getMonth() + 1))) + "-" + ((d1.getDate() + 1) > 9 ? (d1.getDate()) : ("0" + (d1.getDate())));
                var d2 = new Date(this.SearchToDate);
                toDate_1 = d2.getFullYear() + "-" + ((d2.getMonth() + 1) > 9 ? (d2.getMonth() + 1) : ("0" + (d2.getMonth() + 1))) + "-" + ((d2.getDate() + 1) > 9 ? (d2.getDate()) : ("0" + (d2.getDate())));
            }
            else {
                fromDate_1 = this.TodaysDate;
                toDate_1 = this.TodaysDate;
            }
            this.httpClient.get(this.global.HostedPath + "GetDashboardUtilization?BranchID=" + this.global.UserDetails[0].BranchID + "&Type=" + this.SelectedFilter + "&FromeDate=" + fromDate_1 + "&ToDate=" + toDate_1).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.UtilizationDetails = JSON.parse(result.Output)[0];
                    console.log(_this.UtilizationDetails);
                    _this.httpClient.get(_this.global.HostedPath + "GetEmployeeListUtilization?BranchID=" + _this.global.UserDetails[0].BranchID + "&Type=" + _this.SelectedFilter + "&FromeDate=" + fromDate_1 + "&ToDate=" + toDate_1).subscribe(function (result) {
                        if (result.StatusCode == 200) {
                            _this.EmployeeListUtilization = JSON.parse(result.Output);
                            _this.FinalEmployeeListUtilization = Object.assign([], _this.EmployeeListUtilization);
                            console.log(_this.FinalEmployeeListUtilization);
                        }
                        else {
                            console.log(result);
                            _this.global.ToastShow("Something went wrong, Pls try again later");
                        }
                        _this.global.LoadingHide();
                    }, function (error) {
                        console.log(error);
                        _this.global.LoadingHide();
                    });
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    UtilizationPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__["a" /* DashboardPage */]);
    };
    UtilizationPage.prototype.FilterClick1 = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Duration',
            inputs: [
                {
                    type: 'radio',
                    label: 'YTD',
                    value: "5",
                    checked: (this.SelectedFilter == "5") ? true : false
                },
                {
                    type: 'radio',
                    label: 'LM',
                    value: "4",
                    checked: (this.SelectedFilter == "4") ? true : false
                },
                {
                    type: 'radio',
                    label: 'MTD',
                    value: "3",
                    checked: (this.SelectedFilter == "3") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Last 7 Days',
                    value: "2",
                    checked: (this.SelectedFilter == "2") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Last Day',
                    value: "1",
                    checked: (this.SelectedFilter == "1") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Date Range',
                    value: "6",
                    checked: (this.SelectedFilter == "6") ? true : false
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.SelectedFilter = data;
                        switch (data) {
                            case "1":
                                _this.SelectedFilterName = "Last Day";
                                break;
                            case "2":
                                _this.SelectedFilterName = "Last 7 Days";
                                break;
                            case "3":
                                _this.SelectedFilterName = "MTD";
                                break;
                            case "4":
                                _this.SelectedFilterName = "LM";
                                break;
                            case "5":
                                _this.SelectedFilterName = "YTD";
                                break;
                            case "6":
                                _this.SelectedFilterName = "Date Range";
                                break;
                            default:
                                _this.SelectedFilterName = "Last 7 Days";
                                break;
                        }
                        if (_this.SelectedFilter != "6") {
                            _this.ngOnInit();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    UtilizationPage.prototype.FilterClick = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select filter option',
            buttons: [
                {
                    text: 'Last Day',
                    handler: function () {
                        _this.SelectedFilter = "1";
                        _this.SelectedFilterName = "Last Day";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'Last 7 Days',
                    handler: function () {
                        _this.SelectedFilter = "2";
                        _this.SelectedFilterName = "Last 7 Days";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'MTD',
                    handler: function () {
                        _this.SelectedFilter = "3";
                        _this.SelectedFilterName = "MTD";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'LM',
                    handler: function () {
                        _this.SelectedFilter = "4";
                        _this.SelectedFilterName = "LM";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'YTD',
                    handler: function () {
                        _this.SelectedFilter = "5";
                        _this.SelectedFilterName = "YTD";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'Date Range',
                    handler: function () {
                        _this.SelectedFilter = "6";
                        _this.SelectedFilterName = "Date Range";
                    }
                }
            ],
            enableBackdropDismiss: true
        });
        actionSheet.present();
    };
    UtilizationPage.prototype.RemoveFilteredata = function (data) {
        console.log(data);
        this.FilterList.splice(data, 1);
    };
    UtilizationPage.prototype.DownArrowClick = function (i, emp) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            var fromDate = "12-12-2024";
            this.httpClient.get(this.global.HostedPath + "GetEmployeeDetailsUtilization?EmployeeID=" + emp.EmployeeID + "&CurrentDate=" + fromDate).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.EmployeeDetailsUtilization = JSON.parse(result.Output)[0];
                    console.log(_this.EmployeeDetailsUtilization);
                    _this.clickedindex = i;
                    _this.isExpanded = !_this.isExpanded;
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    UtilizationPage.prototype.EmployeeSearch = function (val) {
        this.FinalEmployeeListUtilization = this.EmployeeListUtilization.filter(function (e) { return e.EmployeeName.toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.CompetencyLevel.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.UtilizationPerc.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.UtilizationDiff.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.JobRole.toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.EmployeeCode.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
    };
    UtilizationPage.prototype.EmployeeSortClick = function () {
        if (!this.IsSorted) {
            this.FinalEmployeeListUtilization.sort(function (_a, _b) {
                var a = _a.UtilizationPerc;
                var b = _b.UtilizationPerc;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalEmployeeListUtilization = Object.assign([], this.EmployeeListUtilization);
            this.IsSorted = false;
        }
    };
    UtilizationPage.prototype.SearchClick = function () {
        if (this.SearchFromDate != undefined && this.SearchFromDate != null && this.SearchFromDate != ""
            && this.SearchToDate != undefined && this.SearchToDate != null && this.SearchToDate != "") {
            this.ngOnInit();
        }
        else {
            this.global.ToastShow("Please enter From date and To date");
        }
    };
    UtilizationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-utilization',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\utilization\utilization.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background: #fff;">\n\n  <ion-grid style="padding-left: 10px;padding-right: 10px;">\n\n    <ion-row style="padding: 10px;">\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" [(ngModel)]="EmployeeSearchText" style="border: none;"\n          (keyup)="EmployeeSearch(EmployeeSearchText)">\n      </ion-col>\n      <ion-col col style="text-align: center;" (click)="EmployeeSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <div style="height: 78.7vh;overflow-y: scroll;">\n      <!-- Filtered -->\n      <ion-grid>\n        <ion-row style="margin-bottom: 10px;padding: 10px;">\n          <ion-col col-2>\n            <img src="assets/imgs/Filtered.png" style="height:4.1vh" (click)="FilterClick()">\n          </ion-col>\n          <ion-col style="display: flex;width:auto">\n            <div\n              class="DivFilterLable">\n              {{SelectedFilterName}}\n              <!-- <span style="margin-left:8px;" (click)="RemoveFilteredata(i)">x</span> -->\n            </div>\n          </ion-col>\n        </ion-row>\n        <ion-row *ngIf="SelectedFilter==6">\n          <ion-col col-5 style="display: flex;">\n            <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchFromDate"\n              style="margin: auto;">\n          </ion-col>\n          <ion-col col-5 style="display: flex;">\n            <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchToDate"\n              style="margin: auto;">\n          </ion-col>\n          <ion-col col-2 style="display: flex;">\n            <ion-icon ios="ios-search" md="md-search" style="margin: auto;font-size: 2em;cursor: pointer;"\n              (click)="SearchClick()"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <!-- Main info -->\n      <ion-row style="margin-top: 12px;">\n\n        <ion-col col style="font-size: 18px;font-weight: bold;">Utilization</ion-col>\n\n        <ion-col col-3\n          style="color:#294785;font-size: 18px;font-weight: bold;">{{UtilizationDetails.UtilizationPerc}}%</ion-col>\n\n        <ion-col col-1>\n          <img src="assets/imgs/decrease.png" *ngIf="UtilizationDetails.UtilizationDiff<0"\n            style="width:8px;float:inline-end;margin-top: 0.4vh;height: 12px;">\n          <img src="assets/imgs/increase.png" *ngIf="UtilizationDetails.UtilizationDiff>0"\n            style="width:12px;float:inline-end;margin-top: 0.4vh;">\n        </ion-col>\n\n        <ion-col col-1\n          [style.color]="(UtilizationDetails.UtilizationDiff<0)?\'red\':\'green\'">{{UtilizationDetails.UtilizationDiff}}\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="margin-top: 10px;margin-right: 5vh;font-weight: 500;">\n        <ion-col col-2\n          style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">YTD</ion-col>\n        <ion-col col-2\n          style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">LM</ion-col>\n        <ion-col col-2\n          style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">MTD</ion-col>\n        <ion-col col-3 style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">Last 7\n          Days</ion-col>\n        <ion-col col-3 style="font-size: 12px;color:#808080;text-align: center;">Last Day<br />\n          <span style="font-size: 10px !important;\n        font-weight: 400;">{{LastDay | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="margin-right: 5vh;">\n        <ion-col col-2\n          style="font-size: 14px;color:#294785;font-weight: bold; border-right: 1px solid #808080;text-align: center;">{{UtilizationDetails.YTD}}</ion-col>\n        <ion-col col-2\n          style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{UtilizationDetails.LM}}</ion-col>\n        <ion-col col-2\n          style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{UtilizationDetails.MTD}}</ion-col>\n        <ion-col col-3\n          style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{UtilizationDetails.Last7Days}}</ion-col>\n        <ion-col col-3\n          style="font-size: 14px;color:#294785;font-weight: bold;text-align: center;">{{UtilizationDetails.LastDay}}</ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-6\n          style="text-align: end;padding-right:20px;padding-top:20px;color:#294785;font-size: 16px;font-weight: bold;">\n          {{UtilizationDetails.WorkedHours}}\n        </ion-col>\n        <ion-col col-6\n          style="text-align: start;padding-left:20px;padding-top:20px;color:#294785;font-size: 16px;font-weight: bold;">\n          {{UtilizationDetails.AvailableHours}}\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="margin-bottom: 10px;">\n        <ion-col col-6 style="text-align: end;color:#808080;font-size: 14px;font-weight: 500;padding-right: 10px;">\n          Worked Hours\n        </ion-col>\n        <ion-col col-6 style="text-align: start;color:#808080;font-size: 14px;font-weight: 500;padding-left: 10px;">\n          Available Hours\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="text-align: center;">\n        <ion-card>\n          <ion-grid>\n            <ion-row style="padding:12px">\n              <ion-col col-3 style="border-right: 1px solid #808080">\n                <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{UtilizationDetails.Lessthan25}}</div>\n                <label style="background: red;padding: 2px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">0-25%</label>\n              </ion-col>\n              <ion-col col-3 style="border-right: 1px solid #808080">\n                <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{UtilizationDetails.Between26to50}}</div>\n                <label style="background: orange;padding: 2px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">26-50%</label>\n              </ion-col>\n              <ion-col col-3 style="border-right: 1px solid #808080">\n                <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{UtilizationDetails.Between51to75}}</div>\n                <label style="background: yellow;padding: 2px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">51-75%</label>\n              </ion-col>\n              <ion-col col-3>\n                <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{UtilizationDetails.Morethan75}}</div>\n                <label style="background: green;padding: 2px;\n              font-size: 12px;\n              font-weight: 500;\n              color:#fff;\n              border-radius: 5px;">76-100%</label>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card>\n      </ion-row>\n      <hr>\n\n      <!-- list -->\n      <ion-row style="margin-top: 10px;">\n        <ion-card *ngFor="let e of FinalEmployeeListUtilization;let i=index"\n          style="margin:0;padding: 10px;border-radius: 5px;margin-left:0;width:100%;margin-bottom:14px;"\n          (click)="DownArrowClick(i,e)"\n          [ngClass]="{Clsred: e.Ageing==1,Clsorange: e.Ageing==2,Clsyellow: e.Ageing==3,Clsgreen: e.Ageing==4}">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-6 style="font-weight: 600;">\n                {{e.EmployeeName}}\n              </ion-col>\n              <ion-col col-1 style="text-align: -moz-right;">\n                <img src="assets/imgs/engineer.png" style="width:15px">\n              </ion-col>\n              <ion-col col-1 style="right:10px">\n                <sup style="position: absolute;top: 0px;left: 10px;">{{e.CompetencyLevel}}</sup>\n              </ion-col>\n              <ion-col col-1 style="font-size: 14px;color:#294785;font-weight: bold;">\n                {{e.UtilizationPerc}} %\n              </ion-col>\n              <ion-col col-1>\n                <img src="assets/imgs/decrease.png" *ngIf="e.UtilizationDiff<0"\n                  style="width:8px;float:inline-end;height: 12px;">\n                <img src="assets/imgs/increase.png" *ngIf="e.UtilizationDiff>0" style="width:12px;float:inline-end;">\n              </ion-col>\n              <ion-col col-1 [style.color]="(e.UtilizationDiff<0)?\'red\':\'green\'"\n                style="font-size: 12px;font-weight: bold">\n                {{e.UtilizationDiff}}\n              </ion-col>\n              <ion-col col-1>\n                <img\n                  [src]="(isExpanded && clickedindex == i) ? \'assets/imgs/arrow-up.png\' : \'assets/imgs/down-arrow.png\'"\n                  style="width:10px">\n              </ion-col>\n            </ion-row>\n            <ion-row style="font-size: 12px;margin-top: 5px;">\n              <ion-col col>\n                <span\n                  style="border-right: 1px solid #808080;color:#808080;margin-right: 5px;padding-right: 10px;">{{e.JobRole}}</span>\n                <span>{{e.EmployeeCode}}</span>\n              </ion-col>\n            </ion-row>\n            <ion-row *ngIf="clickedindex == i && isExpanded"\n              style="margin-top: 10px;margin-right: 5vh;text-align: center;font-weight: 500;">\n              <ion-col col-2 style="font-size: 12px;color:#808080;border-right: 1px solid #808080;">YTD</ion-col>\n              <ion-col col-2 style="font-size: 12px;color:#808080;border-right: 1px solid #808080;">LM</ion-col>\n              <ion-col col-2 style="font-size: 12px;color:#808080;border-right: 1px solid #808080;">MTD</ion-col>\n              <ion-col col-3\n                style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">Last 7\n                days</ion-col>\n              <ion-col col-3 style="font-size: 12px;color:#808080;text-align: center;">Last Day\n                <span style="font-size: 10px !important;\n              font-weight: 400;">{{LastDay | date:\'dd.MM.yyyy\'}}</span>\n              </ion-col>\n            </ion-row>\n            <ion-row *ngIf="clickedindex == i && isExpanded" style="margin-right: 5vh;text-align: center;">\n              <ion-col col-2\n                style="font-size: 14px;color:#294785;font-weight: bold; border-right: 1px solid #808080;">{{EmployeeDetailsUtilization.YTD}}</ion-col>\n              <ion-col col-2\n                style="font-size: 14px;color:#294785;font-weight: bold; border-right: 1px solid #808080;">{{EmployeeDetailsUtilization.LM}}</ion-col>\n              <ion-col col-2\n                style="font-size: 14px;color:#294785;font-weight: bold; border-right: 1px solid #808080;">{{EmployeeDetailsUtilization.MTD}}</ion-col>\n              <ion-col col-3\n                style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{EmployeeDetailsUtilization.Last7Days}}</ion-col>\n              <ion-col col-3\n                style="font-size: 14px;color:#294785;font-weight: bold;text-align: center;">{{EmployeeDetailsUtilization.LastDay}}</ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card>\n      </ion-row>\n\n    </div>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\utilization\utilization.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], UtilizationPage);
    return UtilizationPage;
}());

//# sourceMappingURL=utilization.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatisticsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__realization_realization__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StatisticsPage = (function () {
    function StatisticsPage(navCtrl, httpClient, global, navParams) {
        this.navCtrl = navCtrl;
        this.httpClient = httpClient;
        this.global = global;
        this.navParams = navParams;
        this.global.HeaderTitle = "Statistics";
        //google.charts.setOnLoadCallback(this.drawChart());
    }
    StatisticsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            var date = new Date();
            this.TodaysDate = date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-" + ((date.getDate() + 1) > 9 ? (date.getDate()) : ("0" + (date.getDate())));
            this.httpClient.get(this.global.HostedPath + "GetRealizationStatisticsGraph?BranchID=" + this.global.UserDetails[0].BranchID + "&Type=5&FromeDate=" + this.TodaysDate + "&ToDate=" + this.TodaysDate).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.GraphDetials = JSON.parse(result.Output);
                    console.log(_this.GraphDetials);
                    var JCDetails = [['Status', 'Realization', { role: 'annotation' }]];
                    _this.GraphDetials.JCType.forEach(function (ele) {
                        JCDetails.push([ele.Jobtype, ele.RealizationPerc, (ele.RealizationPerc + '%')]);
                    });
                    var ModelDetails = [['Model', 'Count', { role: 'annotation' }]];
                    _this.GraphDetials.ModelType.forEach(function (ele) {
                        ModelDetails.push([ele.ModelType, ele.RealizationPerc, ele.RealizationPerc]);
                    });
                    google.charts.setOnLoadCallback(_this.drawChart(JCDetails, ModelDetails));
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    StatisticsPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__realization_realization__["a" /* RealizationPage */]);
    };
    StatisticsPage.prototype.drawChart = function (JCDetails, ModelDetails) {
        var data = google.visualization.arrayToDataTable(JCDetails);
        var options = {
            //title: 'JC Type',
            annotations: {
                textStyle: {
                    fontSize: 12,
                    color: '#000000',
                    bold: true
                },
                alwaysOutside: true,
                stem: {
                    length: 0,
                },
            },
            titleTextStyle: {
                fontSize: 18
            },
            width: 400,
            height: 300,
            legend: 'none',
            vAxis: {
                //title: "JC Type",
                titleTextStyle: {
                    bold: true,
                    fontSize: 13,
                },
                gridlines: {
                    color: 'transparent'
                },
                textStyle: {
                    bold: true,
                }
            },
            hAxis: {
                title: "Realization %",
                titleTextStyle: {
                    bold: true,
                    fontSize: 13,
                },
                gridlines: {
                    color: 'transparent'
                }
            }
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart_jc'));
        chart.draw(data, options);
        //Model
        var modeldata = google.visualization.arrayToDataTable(ModelDetails);
        var modeloptions = {
            //title: "Model Type",
            width: 400,
            height: 300,
            legend: 'none',
            annotations: {
                textStyle: {
                    color: 'black',
                    fontSize: 12,
                    bold: true
                },
                stem: {
                    length: 0
                },
                alwaysOutside: true
            },
            vAxis: {
                title: "Realization %",
                titleTextStyle: {
                    bold: true,
                    fontSize: 13,
                },
                gridlines: {
                    color: 'transparent'
                },
                viewWindow: {
                    min: 0,
                    max: 100
                }
            },
            hAxis: {
                gridlines: {
                    color: 'transparent'
                },
                slantedText: true,
                slantedTextAngle: -45,
                textStyle: {
                    bold: true,
                }
            },
        };
        var modelchart = new google.visualization.ColumnChart(document.getElementById('chart_model'));
        modelchart.draw(modeldata, modeloptions);
    };
    StatisticsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-statistics',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\statistics\statistics.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background: #fff;">\n\n  <span id="SpnStatistics">Statistics</span>\n\n  <span class="SpnType">JC Type</span>\n  <div id="chart_jc"></div>\n\n  <hr style="width: 95%;"/>\n\n  <span class="SpnType">Model Type</span>\n  <div id="chart_model"></div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\statistics\statistics.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], StatisticsPage);
    return StatisticsPage;
}());

//# sourceMappingURL=statistics.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductivityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductivityPage = (function () {
    function ProductivityPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.ProductivityData = [];
        this.ProductivityList = [];
        this.FilterList = ["MTD"];
        this.ProductivityDetails = {};
        this.DateListProductivity = [];
        this.FinalDateListProductivity = [];
        this.SelectedFilter = "2";
        this.SelectedFilterName = "Last 7 Days";
        this.IsSorted = false;
        this.global.HeaderTitle = "Productivity";
        this.LastDay = new Date(new Date().setDate(new Date().getDate() - 1));
        var date = new Date();
        var date1 = new Date();
        var d1 = new Date(date.setMonth(date.getMonth() - 6));
        this.Last6Month = d1.getFullYear() + "-" + ((d1.getMonth() + 1) > 9 ? (d1.getMonth() + 1) : ("0" + (d1.getMonth() + 1))) + "-" + ((d1.getDate() + 1) > 9 ? (d1.getDate()) : ("0" + (d1.getDate())));
        this.TodaysDate = date1.getFullYear() + "-" + ((date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : ("0" + (date1.getMonth() + 1))) + "-" + ((date1.getDate() + 1) > 9 ? (date1.getDate()) : ("0" + (date1.getDate())));
    }
    ProductivityPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            var fromDate_1;
            var toDate_1;
            if (this.SelectedFilter == "6") {
                var d1 = new Date(this.SearchFromDate);
                fromDate_1 = d1.getFullYear() + "-" + ((d1.getMonth() + 1) > 9 ? (d1.getMonth() + 1) : ("0" + (d1.getMonth() + 1))) + "-" + ((d1.getDate() + 1) > 9 ? (d1.getDate()) : ("0" + (d1.getDate())));
                var d2 = new Date(this.SearchToDate);
                toDate_1 = d2.getFullYear() + "-" + ((d2.getMonth() + 1) > 9 ? (d2.getMonth() + 1) : ("0" + (d2.getMonth() + 1))) + "-" + ((d2.getDate() + 1) > 9 ? (d2.getDate()) : ("0" + (d2.getDate())));
            }
            else {
                fromDate_1 = this.TodaysDate;
                toDate_1 = this.TodaysDate;
            }
            this.httpClient.get(this.global.HostedPath + "GetDashboardProductivity?BranchID=" + this.global.UserDetails[0].BranchID + "&Type=" + this.SelectedFilter + "&FromeDate=" + fromDate_1 + "&ToDate=" + toDate_1).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.ProductivityDetails = JSON.parse(result.Output)[0];
                    console.log(_this.ProductivityDetails);
                    _this.httpClient.get(_this.global.HostedPath + "GetProductivityDateList?BranchID=" + _this.global.UserDetails[0].BranchID + "&Type=" + _this.SelectedFilter + "&FromeDate=" + fromDate_1 + "&ToDate=" + toDate_1).subscribe(function (result) {
                        if (result.StatusCode == 200) {
                            _this.DateListProductivity = JSON.parse(result.Output);
                            _this.FinalDateListProductivity = Object.assign([], _this.DateListProductivity);
                            console.log(_this.FinalDateListProductivity);
                        }
                        else {
                            console.log(result);
                            _this.global.ToastShow("Something went wrong, Pls try again later");
                        }
                        _this.global.LoadingHide();
                    }, function (error) {
                        console.log(error);
                        _this.global.LoadingHide();
                    });
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ProductivityPage.prototype.FilterClick1 = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Duration',
            inputs: [
                {
                    type: 'radio',
                    label: 'YTD',
                    value: "5",
                    checked: (this.SelectedFilter == "5") ? true : false
                },
                {
                    type: 'radio',
                    label: 'LM',
                    value: "4",
                    checked: (this.SelectedFilter == "4") ? true : false
                },
                {
                    type: 'radio',
                    label: 'MTD',
                    value: "3",
                    checked: (this.SelectedFilter == "3") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Last 7 Days',
                    value: "2",
                    checked: (this.SelectedFilter == "2") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Last Day',
                    value: "1",
                    checked: (this.SelectedFilter == "1") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Date Range',
                    value: "6",
                    checked: (this.SelectedFilter == "6") ? true : false
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.SelectedFilter = data;
                        switch (data) {
                            case "1":
                                _this.SelectedFilterName = "Last Day";
                                break;
                            case "2":
                                _this.SelectedFilterName = "Last 7 Days";
                                break;
                            case "3":
                                _this.SelectedFilterName = "MTD";
                                break;
                            case "4":
                                _this.SelectedFilterName = "LM";
                                break;
                            case "5":
                                _this.SelectedFilterName = "YTD";
                                break;
                            case "6":
                                _this.SelectedFilterName = "Date Range";
                                break;
                            default:
                                _this.SelectedFilterName = "Last 7 Days";
                                break;
                        }
                        if (_this.SelectedFilter != "6") {
                            _this.ngOnInit();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    ProductivityPage.prototype.FilterClick = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select filter option',
            buttons: [
                {
                    text: 'Last Day',
                    handler: function () {
                        _this.SelectedFilter = "1";
                        _this.SelectedFilterName = "Last Day";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'Last 7 Days',
                    handler: function () {
                        _this.SelectedFilter = "2";
                        _this.SelectedFilterName = "Last 7 Days";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'MTD',
                    handler: function () {
                        _this.SelectedFilter = "3";
                        _this.SelectedFilterName = "MTD";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'LM',
                    handler: function () {
                        _this.SelectedFilter = "4";
                        _this.SelectedFilterName = "LM";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'YTD',
                    handler: function () {
                        _this.SelectedFilter = "5";
                        _this.SelectedFilterName = "YTD";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'Date Range',
                    handler: function () {
                        _this.SelectedFilter = "6";
                        _this.SelectedFilterName = "Date Range";
                    }
                }
            ],
            enableBackdropDismiss: true
        });
        actionSheet.present();
    };
    ProductivityPage.prototype.RemoveFilteredata = function (data) {
        this.FilterList.splice(data, 1);
    };
    ProductivityPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__["a" /* DashboardPage */]);
    };
    ProductivityPage.prototype.DateSearch = function (val) {
        this.FinalDateListProductivity = this.DateListProductivity.filter(function (e) { return e.ProductivityDate.toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.ProductivityPerc.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.ProductivityDiff.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.BilledHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.AvailableHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
    };
    ProductivityPage.prototype.DateSortClick = function () {
        if (!this.IsSorted) {
            this.FinalDateListProductivity.sort(function (_a, _b) {
                var a = _a.ProductivityPerc;
                var b = _b.ProductivityPerc;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalDateListProductivity = Object.assign([], this.DateListProductivity);
            this.IsSorted = false;
        }
    };
    ProductivityPage.prototype.SearchClick = function () {
        if (this.SearchFromDate != undefined && this.SearchFromDate != null && this.SearchFromDate != ""
            && this.SearchToDate != undefined && this.SearchToDate != null && this.SearchToDate != "") {
            this.ngOnInit();
        }
        else {
            this.global.ToastShow("Please enter From date and To date");
        }
    };
    ProductivityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-productivity',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\productivity\productivity.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background: #fff;">\n\n  <ion-grid>\n\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" [(ngModel)]="DateSearchText" style="border: none;"\n        (keyup)="DateSearch(DateSearchText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="DateSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-grid>\n      <ion-row style="margin-bottom: 10px;padding: 10px;">\n        <ion-col col-2>\n          <img src="assets/imgs/Filtered.png" style="height:4.1vh" (click)="FilterClick()">\n        </ion-col>\n        <ion-col style="display: flex;width:auto">\n          <div\n            class="DivFilterLable">\n            {{SelectedFilterName}}\n            <!-- <span style="margin-left:8px;" (click)="RemoveFilteredata(i)">x</span> -->\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="SelectedFilter==6">\n        <ion-col col-5 style="display: flex;">\n          <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchFromDate"\n            style="margin: auto;">\n        </ion-col>\n        <ion-col col-5 style="display: flex;">\n          <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchToDate"\n            style="margin: auto;">\n        </ion-col>\n        <ion-col col-2 style="display: flex;">\n          <ion-icon ios="ios-search" md="md-search" style="margin: auto;font-size: 2em;cursor: pointer;"\n            (click)="SearchClick()"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <!-- Main info -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col style="font-size: 18px;font-weight: bold;">Productivity</ion-col>\n\n      <ion-col col-3\n        style="color:#294785;font-size: 18px;font-weight: bold;">{{ProductivityDetails.ProductivityPerc}}%</ion-col>\n\n      <ion-col col-1>\n        <img src="assets/imgs/decrease.png" *ngIf="ProductivityDetails.ProductivityDiff<0"\n          style="width:8px;float:inline-end;margin-top: 0.4vh;height: 12px;">\n        <img src="assets/imgs/increase.png" *ngIf="ProductivityDetails.ProductivityDiff>0"\n          style="width:12px;float:inline-end;margin-top: 0.4vh;">\n      </ion-col>\n\n      <ion-col col-1\n        [style.color]="(ProductivityDetails.ProductivityDiff<0)?\'red\':\'green\'">{{ProductivityDetails.ProductivityDiff}}\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row style="margin-top: 10px;margin-right: 5vh;font-weight: 500;">\n      <ion-col col-2\n        style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">YTD</ion-col>\n      <ion-col col-2\n        style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">LM</ion-col>\n      <ion-col col-2\n        style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">MTD</ion-col>\n      <ion-col col-3 style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">Last 7\n        Days</ion-col>\n      <ion-col col-3 style="font-size: 12px;color:#808080;text-align: center;">Last Day<br />\n        <span style="font-size: 10px !important;\n      font-weight: 400;">{{LastDay | date:\'dd.MM.yyyy\'}}</span>\n      </ion-col>\n    </ion-row>\n\n    <ion-row style="margin-right: 5vh;">\n      <ion-col col-2\n        style="font-size: 14px;color:#294785;font-weight: bold; border-right: 1px solid #808080;text-align: center;">{{ProductivityDetails.YTD}}</ion-col>\n      <ion-col col-2\n        style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{ProductivityDetails.LM}}</ion-col>\n      <ion-col col-2\n        style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{ProductivityDetails.MTD}}</ion-col>\n      <ion-col col-3\n        style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{ProductivityDetails.Last7Days}}</ion-col>\n      <ion-col col-3\n        style="font-size: 14px;color:#294785;font-weight: bold;text-align: center;">{{ProductivityDetails.LastDay}}</ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-4\n        style="text-align: center;padding-right:10px;padding-top:20px;color:#294785;font-size: 16px;font-weight: bold;">\n        {{ProductivityDetails.InvoicedJCs}}\n      </ion-col>\n      <ion-col col-4\n        style="text-align: center;padding-top:20px;padding-right:10px;color:#294785;font-size: 16px;font-weight: bold;">\n        {{ProductivityDetails.BilledHrs}}\n      </ion-col>\n      <ion-col col-4\n        style="text-align: center;padding-left:10px;padding-top:20px;color:#294785;font-size: 16px;font-weight: bold;">\n        {{ProductivityDetails.AvailableHours}}\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-right: 10px;">\n        Invoiced JCs\n      </ion-col>\n      <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-right: 10px;">\n        Billed Hrs\n      </ion-col>\n      <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-left: 10px;">\n        Available Hrs\n      </ion-col>\n    </ion-row>\n\n    <ion-row style="text-align: center;margin-top: 10px;">\n      <ion-card>\n        <ion-grid>\n          <ion-row style="padding:12px">\n            <ion-col col-3 style="border-right: 1px solid #808080">\n              <div style="font-size: 14px;\n            color: #294785;font-weight: 500;\n            padding:3px;\n            font-size: 13px;">{{ProductivityDetails.Lessthan25}}</div>\n              <label style="background: red;padding: 2px;\n            font-size: 12px;\n            font-weight: 500;\n            border-radius: 5px;">0-25%</label>\n            </ion-col>\n            <ion-col col-3 style="border-right: 1px solid #808080">\n              <div style="font-size: 14px;\n            color: #294785;font-weight: 500;\n            padding:3px;\n            font-size: 13px;">{{ProductivityDetails.Between26to50}}</div>\n              <label style="background: orange;padding: 2px;\n            font-size: 12px;\n            font-weight: 500;\n            border-radius: 5px;">26-50%</label>\n            </ion-col>\n            <ion-col col-3 style="border-right: 1px solid #808080">\n              <div style="font-size: 14px;\n            color: #294785;font-weight: 500;\n            padding:3px;\n            font-size: 13px;">{{ProductivityDetails.Between51to75}}</div>\n              <label style="background: yellow;padding: 2px;\n            font-size: 12px;\n            font-weight: 500;\n            border-radius: 5px;">51-75%</label>\n            </ion-col>\n            <ion-col col-3>\n              <div style="font-size: 14px;\n            color: #294785;font-weight: 500;\n            padding:3px;\n            font-size: 13px;">{{ProductivityDetails.Morethan75}}</div>\n              <label style="background: green;padding: 2px;\n            font-size: 12px;\n            font-weight: 500;\n            color:#fff;\n            border-radius: 5px;">75%</label>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </ion-row>\n\n    <hr>\n\n    <!-- List -->\n    <ion-row>\n      <ion-card *ngFor="let dt of FinalDateListProductivity;let i=index"\n        [ngClass]="{Clsred: dt.Ageing==1,Clsorange: dt.Ageing==2,Clsyellow: dt.Ageing==3,Clsgreen: dt.Ageing==4}"\n        style="margin:0;border-radius: 5px;margin-left:0;width:100%;margin-bottom:14px;">\n        <ion-grid>\n          <ion-row>\n            <ion-col col-3 style="padding:6px;font-weight: 500;">{{dt.ProductivityDate | date:\'dd MMM yyy\'}}</ion-col>\n            <ion-col col-7 style="color: #001868;padding:6px;font-weight: 500;"> | {{dt.ProductivityPerc}}%</ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/decrease.png" *ngIf="dt.ProductivityDiff<0"\n                style="width:8px;float:inline-end;margin-top: 6px;height: 12px;">\n              <img src="assets/imgs/increase.png" *ngIf="dt.ProductivityDiff>0"\n                style="width:12px;float:inline-end;margin-top: 6px;">\n            </ion-col>\n            <ion-col col-1 style="color:#e33239;font-size: 12px;padding:6px;font-weight: 600;">{{dt.ProductivityDiff}}\n            </ion-col>\n          </ion-row>\n          <ion-row style="margin-top:8px;padding:6px">\n            <ion-col col-3 style="font-size: 13px;color:#808080;font-weight: 500;">Billed Hrs</ion-col>\n            <ion-col col-4 style="font-size: 14px;font-weight: bold;color: #001868;">{{dt.BilledHours}} hrs</ion-col>\n            <ion-col col-3 style="font-size: 13px;color:#808080;text-align: end;font-weight: 500">Avl. Hrs</ion-col>\n            <ion-col col-2\n              style="font-size: 14px;font-weight: bold;text-align: end;color: #001868">{{dt.AvailableHours}}\n              hrs</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\productivity\productivity.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ProductivityPage);
    return ProductivityPage;
}());

//# sourceMappingURL=productivity.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScpfadetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sesearch_sesearch__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scpfalist_scpfalist__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScpfadetailsPage = (function () {
    function ScpfadetailsPage(navCtrl, navParams, global, httpClient, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.SelectedJC = {};
        this.SelectedSEList = [];
        this.JobDetails = {};
        this.JobsList = [];
        this.SelectedJC = this.navParams.get("data");
        this.global.HeaderTitle = "JC " + this.SelectedJC.OrderNo;
        console.log(this.SelectedJC);
    }
    ScpfadetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetJobCardDetails?JobCardID=" + this.SelectedJC.JobCardHedIC).subscribe(function (jobs) {
                if (jobs.StatusCode == 200) {
                    _this.JobDetails = JSON.parse(jobs.Output).JobCardOrderDetails;
                    _this.JobsList = JSON.parse(jobs.Output).GetJCJobDetails;
                    _this.SelectedSEList = JSON.parse(jobs.Output).GetJobCardTechnicianList;
                    console.log(JSON.parse(jobs.Output));
                }
                else {
                    console.log(jobs);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScpfadetailsPage.prototype.SelectTechnicianClick = function () {
        var _this = this;
        this.global.SESearchPage = "PFA";
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__sesearch_sesearch__["a" /* SesearchPage */], { SEList: this.SelectedSEList, JC: this.SelectedJC });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__scpfalist_scpfalist__["a" /* ScpfalistPage */]);
        });
    };
    ScpfadetailsPage.prototype.SubmitClick = function () {
        var _this = this;
        var employees = [];
        this.SelectedSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                employees.push({
                    JobCardHeaderID: ele.JobCardHeader_IC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(employees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", employees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__scpfalist_scpfalist__["a" /* ScpfalistPage */]);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScpfadetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scpfadetails',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scpfadetails\scpfadetails.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col col-10>\n          <span style="font-size: 18px;">Order Details</span>\n        </ion-col>\n        <ion-col col-2 style="text-align: right;">\n          <span class="SpnJobType" [style.borderColor]="SelectedJC.ColorName"\n            *ngIf="SelectedJC.JobType!=\'\'">{{global.JobTypeFormat(SelectedJC.JobType)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">T0</span>\n          <span>{{JobDetails.T0 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">T1</span>\n          <span>{{JobDetails.T1 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-8>\n          <span class="SpnLeftLable">T2</span>\n          <span>{{JobDetails.T2 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        \n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-7>\n          <span>{{JobDetails.LicensePlateNumber}}</span>\n        </ion-col>\n        <ion-col col-5 style="text-align: right;">\n          <span>{{JobDetails.VehicleModel}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">Odo</span>\n          <span>{{global.OdoMeterFormat(JobDetails.KMPerHour)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">EDD</span>\n          <span>{{JobDetails.ExpectedDeliveryDate | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n        <ion-col col style="text-align: right;">\n          <span class="SpnLeftLable">ETD</span>\n          <span>{{JobDetails.ExpectedDeliveryTime | date:\'HH:mm:ss\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">Target</span>\n          <span>{{JobDetails.TargetTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">Actual</span>\n          <span>{{JobDetails.ActualTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">SA</span>\n          <span>{{JobDetails.EmployeeName}} | {{JobDetails.ServiceAdviser}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <hr>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 18px;">Job Details ({{JobsList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-grid *ngFor="let j of JobsList" style="padding-bottom: 10px;">\n        <ion-row style="padding:5px">\n          <ion-col col>\n            <span class="SpnLeftLable">Job Type</span>\n            <span>{{j.JCType_Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col>\n            <span style="padding: 5px;">{{j.JobDescription}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <div style="text-align: center;margin-top:5vh;margin-bottom:2vh;">\n    <button (click)="SelectTechnicianClick()" class="BtnTechnicianAdd">ADD TECHNICIAN</button>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scpfadetails\scpfadetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], ScpfadetailsPage);
    return ScpfadetailsPage;
}());

//# sourceMappingURL=scpfadetails.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScetdedetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sesearch_sesearch__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scetdelist_scetdelist__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScetdedetailsPage = (function () {
    function ScetdedetailsPage(navCtrl, navParams, global, httpClient, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.SelectedJC = {};
        this.JobDetails = {};
        this.JobsList = [];
        this.SelectedSEList = [];
        this.SelectedJC = this.navParams.get("data");
        this.global.HeaderTitle = "JC " + this.SelectedJC.OrderNo;
        console.log(this.SelectedJC);
    }
    ScetdedetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetJobCardDetails?JobCardID=" + this.SelectedJC.JobCardHedIC).subscribe(function (jobs) {
                if (jobs.StatusCode == 200) {
                    _this.JobDetails = JSON.parse(jobs.Output).JobCardOrderDetails;
                    _this.JobsList = JSON.parse(jobs.Output).GetJCJobDetails;
                    _this.SelectedSEList = JSON.parse(jobs.Output).GetJobCardTechnicianList;
                    console.log(JSON.parse(jobs.Output));
                }
                else {
                    console.log(jobs);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScetdedetailsPage.prototype.SelectTechnicianClick = function () {
        var _this = this;
        this.global.SESearchPage = "ETDExceeded";
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__sesearch_sesearch__["a" /* SesearchPage */], { SEList: this.SelectedSEList, JC: this.SelectedJC });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__scetdelist_scetdelist__["a" /* ScetdelistPage */]);
        });
    };
    ScetdedetailsPage.prototype.SubmitClick = function () {
        var _this = this;
        var employees = [];
        this.SelectedSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                employees.push({
                    JobCardHeaderID: ele.JobCardHeader_IC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(employees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", employees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__scetdelist_scetdelist__["a" /* ScetdelistPage */]);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScetdedetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scetdedetails',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scetdedetails\scetdedetails.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col col-10>\n          <span style="font-size: 18px;">Order Details</span>\n        </ion-col>\n        <ion-col col-2 style="text-align: right;">\n          <span class="SpnJobType" [style.borderColor]="SelectedJC.ColorName"\n            *ngIf="SelectedJC.JobType!=\'\'">{{global.JobTypeFormat(SelectedJC.JobType)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">T0</span>\n          <span>{{JobDetails.T0 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">T1</span>\n          <span>{{JobDetails.T1 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-8>\n          <span class="SpnLeftLable">T2</span>\n          <span>{{JobDetails.T2 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        \n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-7>\n          <span>{{JobDetails.LicensePlateNumber}}</span>\n        </ion-col>\n        <ion-col col-5 style="text-align: right;">\n          <span>{{JobDetails.VehicleModel}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">Odo</span>\n          <span>{{global.OdoMeterFormat(JobDetails.KMPerHour)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">EDD</span>\n          <span>{{JobDetails.ExpectedDeliveryDate | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n        <ion-col col style="text-align: right;">\n          <span class="SpnLeftLable">ETD</span>\n          <span>{{JobDetails.ExpectedDeliveryTime | date:\'HH:mm:ss\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">Target</span>\n          <span>{{JobDetails.TargetTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">Actual</span>\n          <span>{{JobDetails.ActualTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">SA</span>\n          <span>{{JobDetails.EmployeeName}} | {{JobDetails.ServiceAdviser}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <hr>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 18px;">Job Details ({{JobsList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-grid *ngFor="let j of JobsList" style="padding-bottom: 10px;">\n        <ion-row style="padding:5px">\n          <ion-col col>\n            <span class="SpnLeftLable">Job Type</span>\n            <span>{{j.JCType_Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col>\n            <span style="padding: 5px;">{{j.JobDescription}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 16px;font-weight: 500;">Technician Details ({{SelectedSEList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px" *ngFor="let t of SelectedSEList">\n        <ion-col>\n           <span>{{t.Name}}</span>\n          <img src="assets/imgs/engineer.png" style="width:20px;display: inline;margin-left: 1em;">\n          <span style="position: absolute;top: -5px;">c</span>\n          <span style="margin-left: 1em;">| {{t.EmployeeCode}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <div style="text-align: center;margin-top:5vh;margin-bottom:2vh;">\n    <button (click)="SelectTechnicianClick()" class="BtnTechnicianAdd">ADD/MODIFY TECHNICIAN</button>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scetdedetails\scetdedetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], ScetdedetailsPage);
    return ScetdedetailsPage;
}());

//# sourceMappingURL=scetdedetails.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScallocatedytsdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scallocatedytslist_scallocatedytslist__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sesearch_sesearch__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScallocatedytsdetailsPage = (function () {
    function ScallocatedytsdetailsPage(navCtrl, navParams, global, httpClient, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.SelectedJC = {};
        this.JobDetails = {};
        this.JobsList = [];
        this.SelectedSEList = [];
        this.SelectedJC = this.navParams.get("data");
        this.global.HeaderTitle = "JC " + this.SelectedJC.OrderNo;
        console.log(this.SelectedJC);
    }
    ScallocatedytsdetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetJobCardDetails?JobCardID=" + this.SelectedJC.JobCardHedIC).subscribe(function (jobs) {
                if (jobs.StatusCode == 200) {
                    _this.JobDetails = JSON.parse(jobs.Output).JobCardOrderDetails;
                    _this.JobsList = JSON.parse(jobs.Output).GetJCJobDetails;
                    _this.SelectedSEList = JSON.parse(jobs.Output).GetJobCardTechnicianList;
                    console.log(JSON.parse(jobs.Output));
                }
                else {
                    console.log(jobs);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScallocatedytsdetailsPage.prototype.SelectTechnicianClick = function () {
        var _this = this;
        this.global.SESearchPage = "AllocatedYTS";
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__sesearch_sesearch__["a" /* SesearchPage */], { SEList: this.SelectedSEList, JC: this.SelectedJC });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scallocatedytslist_scallocatedytslist__["a" /* ScallocatedytslistPage */]);
        });
    };
    ScallocatedytsdetailsPage.prototype.SubmitClick = function () {
        var _this = this;
        var employees = [];
        this.SelectedSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                employees.push({
                    JobCardHeaderID: ele.JobCardHeader_IC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(employees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", employees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scallocatedytslist_scallocatedytslist__["a" /* ScallocatedytslistPage */]);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScallocatedytsdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scallocatedytsdetails',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scallocatedytsdetails\scallocatedytsdetails.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col col-10>\n          <span style="font-size: 18px;">Order Details</span>\n        </ion-col>\n        <ion-col col-2 style="text-align: right;">\n          <span class="SpnJobType" [style.borderColor]="SelectedJC.ColorName"\n            *ngIf="SelectedJC.JobType!=\'\'">{{global.JobTypeFormat(SelectedJC.JobType)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">T0</span>\n          <span>{{JobDetails.T0 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">T1</span>\n          <span>{{JobDetails.T1 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-12>\n          <span class="SpnLeftLable">T2</span>\n          <span>{{JobDetails.T2 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-7>\n          <span>{{JobDetails.LicensePlateNumber}}</span>\n        </ion-col>\n        <ion-col col-5 style="text-align: right;">\n          <span>{{JobDetails.VehicleModel}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">Odo</span>\n          <span>{{global.OdoMeterFormat(JobDetails.KMPerHour)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">EDD</span>\n          <span>{{JobDetails.ExpectedDeliveryDate | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n        <ion-col col style="text-align: right;">\n          <span class="SpnLeftLable">ETD</span>\n          <span>{{JobDetails.ExpectedDeliveryTime | date:\'HH:mm:ss\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">Target</span>\n          <span>{{JobDetails.TargetTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">Actual</span>\n          <span>{{JobDetails.ActualTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">SA</span>\n          <span>{{JobDetails.EmployeeName}} | {{JobDetails.ServiceAdviser}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <hr>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 18px;">Job Details ({{JobsList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-grid *ngFor="let j of JobsList" style="padding-bottom: 10px;">\n        <ion-row style="padding:5px">\n          <ion-col col>\n            <span class="SpnLeftLable">Job Type</span>\n            <span>{{j.JCType_Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col>\n            <span style="padding: 5px;">{{j.JobDescription}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 16px;font-weight: 500;">Technician Details ({{SelectedSEList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px" *ngFor="let t of SelectedSEList">\n        <ion-col>\n          <span>{{t.Name}}</span>\n          <img src="assets/imgs/engineer.png" style="width:20px;display: inline;margin-left: 1em;">\n          <span style="position: absolute;top: -5px;">c</span>\n          <span style="margin-left: 1em;">| {{t.EmployeeCode}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <div style="text-align: center;margin-top:5vh;margin-bottom:2vh;">\n    <button (click)="SelectTechnicianClick()" class="BtnTechnicianAdd">ADD/MODIFY TECHNICIAN</button>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scallocatedytsdetails\scallocatedytsdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], ScallocatedytsdetailsPage);
    return ScallocatedytsdetailsPage;
}());

//# sourceMappingURL=scallocatedytsdetails.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScwipdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scwiplist_scwiplist__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sesearch_sesearch__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScwipdetailsPage = (function () {
    function ScwipdetailsPage(navCtrl, navParams, global, httpClient, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.SelectedJC = {};
        this.JobDetails = {};
        this.JobsList = [];
        this.SelectedSEList = [];
        this.SelectedJC = this.navParams.get("data");
        console.log(this.SelectedJC);
        this.global.HeaderTitle = "JC " + this.SelectedJC.OrderNo;
    }
    ScwipdetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetJobCardDetails?JobCardID=" + this.SelectedJC.JobCardHedIC).subscribe(function (jobs) {
                if (jobs.StatusCode == 200) {
                    _this.JobDetails = JSON.parse(jobs.Output).JobCardOrderDetails;
                    _this.JobsList = JSON.parse(jobs.Output).GetJCJobDetails;
                    _this.SelectedSEList = JSON.parse(jobs.Output).GetJobCardTechnicianList;
                    console.log(JSON.parse(jobs.Output));
                }
                else {
                    console.log(jobs);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScwipdetailsPage.prototype.SelectTechnicianClick = function () {
        var _this = this;
        this.global.SESearchPage = "WIP";
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__sesearch_sesearch__["a" /* SesearchPage */], { SEList: this.SelectedSEList, JC: this.SelectedJC });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scwiplist_scwiplist__["a" /* ScwiplistPage */]);
        });
    };
    ScwipdetailsPage.prototype.SubmitClick = function () {
        var _this = this;
        var employees = [];
        this.SelectedSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                employees.push({
                    JobCardHeaderID: ele.JobCardHeader_IC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(employees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", employees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scwiplist_scwiplist__["a" /* ScwiplistPage */]);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScwipdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scwipdetails',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scwipdetails\scwipdetails.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col col-10>\n          <span style="font-size: 18px;">Order Details</span>\n        </ion-col>\n        <ion-col col-2 style="text-align: right;">\n          <span class="SpnJobType" [style.borderColor]="SelectedJC.ColorName"\n            *ngIf="SelectedJC.JobType!=\'\'">{{global.JobTypeFormat(SelectedJC.JobType)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">T0</span>\n          <span>{{JobDetails.T0 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">T1</span>\n          <span>{{JobDetails.T1 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-8>\n          <span class="SpnLeftLable">T2</span>\n          <span>{{JobDetails.T2 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        \n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-7>\n          <span>{{JobDetails.LicensePlateNumber}}</span>\n        </ion-col>\n        <ion-col col-5 style="text-align: right;">\n          <span>{{JobDetails.VehicleModel}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">Odo</span>\n          <span>{{global.OdoMeterFormat(JobDetails.KMPerHour)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">EDD</span>\n          <span>{{JobDetails.ExpectedDeliveryDate | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n        <ion-col col style="text-align: right;">\n          <span class="SpnLeftLable">ETD</span>\n          <span>{{JobDetails.ExpectedDeliveryTime | date:\'HH:mm:ss\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">Target</span>\n          <span>{{JobDetails.TargetTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">Actual</span>\n          <span>{{JobDetails.ActualTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">SA</span>\n          <span>{{JobDetails.EmployeeName}} | {{JobDetails.ServiceAdviser}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <hr>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 18px;">Job Details ({{JobsList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-grid *ngFor="let j of JobsList" style="padding-bottom: 10px;">\n        <ion-row style="padding:5px">\n          <ion-col col>\n            <span class="SpnLeftLable">Job Type</span>\n            <span>{{j.JCType_Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col>\n            <span style="padding: 5px;">{{j.JobDescription}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 16px;font-weight: 500;">Technician Details ({{SelectedSEList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px" *ngFor="let t of SelectedSEList">\n        <ion-col>\n          <span>{{t.Name}}</span>\n          <img src="assets/imgs/engineer.png" style="width:20px;display: inline;margin-left: 1em;">\n          <span style="position: absolute;top: -5px;">c</span>\n          <span style="margin-left: 1em;">| {{t.EmployeeCode}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <div style="text-align: center;margin-top:5vh;margin-bottom:2vh;">\n    <button (click)="SelectTechnicianClick()" class="BtnTechnicianAdd">ADD/MODIFY TECHNICIAN</button>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scwipdetails\scwipdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], ScwipdetailsPage);
    return ScwipdetailsPage;
}());

//# sourceMappingURL=scwipdetails.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SconholddetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sconholdlist_sconholdlist__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sesearch_sesearch__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SconholddetailsPage = (function () {
    function SconholddetailsPage(navCtrl, navParams, global, httpClient, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.SelectedJC = {};
        this.JobDetails = {};
        this.JobsList = [];
        this.SelectedSEList = [];
        this.SelectedJC = this.navParams.get("data");
        this.global.HeaderTitle = "JC " + this.SelectedJC.OrderNo;
        console.log(this.SelectedJC);
    }
    SconholddetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetJobCardDetails?JobCardID=" + this.SelectedJC.JobCardHedIC).subscribe(function (jobs) {
                if (jobs.StatusCode == 200) {
                    _this.JobDetails = JSON.parse(jobs.Output).JobCardOrderDetails;
                    _this.JobsList = JSON.parse(jobs.Output).GetJCJobDetails;
                    _this.SelectedSEList = JSON.parse(jobs.Output).GetJobCardTechnicianList;
                    console.log(JSON.parse(jobs.Output));
                }
                else {
                    console.log(jobs);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SconholddetailsPage.prototype.SelectTechnicianClick = function () {
        var _this = this;
        this.global.SESearchPage = "OnHold";
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__sesearch_sesearch__["a" /* SesearchPage */], { SEList: this.SelectedSEList, JC: this.SelectedJC });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sconholdlist_sconholdlist__["a" /* SconholdlistPage */]);
        });
    };
    SconholddetailsPage.prototype.SubmitClick = function () {
        var _this = this;
        var employees = [];
        this.SelectedSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                employees.push({
                    JobCardHeaderID: ele.JobCardHeader_IC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(employees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", employees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sconholdlist_sconholdlist__["a" /* SconholdlistPage */]);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SconholddetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sconholddetails',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sconholddetails\sconholddetails.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col col-10>\n          <span style="font-size: 18px;">Order Details</span>\n        </ion-col>\n        <ion-col col-2 style="text-align: right;">\n          <span class="SpnJobType" [style.borderColor]="SelectedJC.ColorName"\n            *ngIf="SelectedJC.JobType!=\'\'">{{global.JobTypeFormat(SelectedJC.JobType)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">T0</span>\n          <span>{{JobDetails.T0 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">T1</span>\n          <span>{{JobDetails.T1 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-8>\n          <span class="SpnLeftLable">T2</span>\n          <span>{{JobDetails.T2 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        \n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-7>\n          <span>{{JobDetails.LicensePlateNumber}}</span>\n        </ion-col>\n        <ion-col col-5 style="text-align: right;">\n          <span>{{JobDetails.VehicleModel}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">Odo</span>\n          <span>{{global.OdoMeterFormat(JobDetails.KMPerHour)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">EDD</span>\n          <span>{{JobDetails.ExpectedDeliveryDate | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n        <ion-col col style="text-align: right;">\n          <span class="SpnLeftLable">ETD</span>\n          <span>{{JobDetails.ExpectedDeliveryTime | date:\'HH:mm:ss\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">Target</span>\n          <span>{{JobDetails.TargetTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">Actual</span>\n          <span>{{JobDetails.ActualTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">SA</span>\n          <span>{{JobDetails.EmployeeName}} | {{JobDetails.ServiceAdviser}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <hr>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 18px;">Job Details ({{JobsList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-grid *ngFor="let j of JobsList" style="padding-bottom: 10px;">\n        <ion-row style="padding:5px">\n          <ion-col col>\n            <span class="SpnLeftLable">Job Type</span>\n            <span>{{j.JCType_Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col>\n            <span style="padding: 5px;">{{j.JobDescription}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 16px;font-weight: 500;">Technician Details ({{SelectedSEList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px" *ngFor="let t of SelectedSEList">\n        <ion-col>\n          <span>{{t.Name}}</span>\n          <img src="assets/imgs/engineer.png" style="width:20px;display: inline;margin-left: 1em;">\n          <span style="position: absolute;top: -5px;">c</span>\n          <span style="margin-left: 1em;">| {{t.EmployeeCode}}</span>\n          <span style="display: block;">{{t.PauseReason}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <div style="text-align: center;margin-top:5vh;margin-bottom:2vh;">\n    <button (click)="SelectTechnicianClick()" class="BtnTechnicianAdd">ADD/MODIFY TECHNICIAN</button>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sconholddetails\sconholddetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], SconholddetailsPage);
    return SconholddetailsPage;
}());

//# sourceMappingURL=sconholddetails.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SccmpteddetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sesearch_sesearch__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sccmptedlist_sccmptedlist__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SccmpteddetailsPage = (function () {
    function SccmpteddetailsPage(navCtrl, navParams, global, httpClient, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.SelectedJC = {};
        this.JobDetails = {};
        this.JobsList = [];
        this.SelectedSEList = [];
        this.SelectedJC = this.navParams.get("data");
        this.global.HeaderTitle = "JC " + this.SelectedJC.OrderNo;
        console.log(this.SelectedJC);
    }
    SccmpteddetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetJobCardDetails?JobCardID=" + this.SelectedJC.JobCardHedIC).subscribe(function (jobs) {
                if (jobs.StatusCode == 200) {
                    _this.JobDetails = JSON.parse(jobs.Output).JobCardOrderDetails;
                    _this.JobsList = JSON.parse(jobs.Output).GetJCJobDetails;
                    _this.SelectedSEList = JSON.parse(jobs.Output).GetJobCardTechnicianList;
                    console.log(JSON.parse(jobs.Output));
                }
                else {
                    console.log(jobs);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SccmpteddetailsPage.prototype.SelectTechnicianClick = function () {
        var _this = this;
        this.global.SESearchPage = "Completed";
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__sesearch_sesearch__["a" /* SesearchPage */], { SEList: this.SelectedSEList, JC: this.SelectedJC });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__sccmptedlist_sccmptedlist__["a" /* SccmptedlistPage */]);
        });
    };
    SccmpteddetailsPage.prototype.SubmitClick = function () {
        var _this = this;
        var employees = [];
        this.SelectedSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                employees.push({
                    JobCardHeaderID: ele.JobCardHeader_IC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(employees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", employees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__sccmptedlist_sccmptedlist__["a" /* SccmptedlistPage */]);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SccmpteddetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sccmpteddetails',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmpteddetails\sccmpteddetails.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col col-10>\n          <span style="font-size: 18px;">Order Details</span>\n        </ion-col>\n        <ion-col col-2 style="text-align: right;">\n          <span class="SpnJobType" [style.borderColor]="SelectedJC.ColorName"\n            *ngIf="SelectedJC.JobType!=\'\'">{{global.JobTypeFormat(SelectedJC.JobType)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">T0</span>\n          <span>{{JobDetails.T0 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">T1</span>\n          <span>{{JobDetails.T1 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-8>\n          <span class="SpnLeftLable">T2</span>\n          <span>{{JobDetails.T2 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>        \n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-7>\n          <span>{{JobDetails.LicensePlateNumber}}</span>\n        </ion-col>\n        <ion-col col-5 style="text-align: right;">\n          <span>{{JobDetails.VehicleModel}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">Odo</span>\n          <span>{{global.OdoMeterFormat(JobDetails.KMPerHour)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">EDD</span>\n          <span>{{JobDetails.ExpectedDeliveryDate | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n        <ion-col col style="text-align: right;">\n          <span class="SpnLeftLable">ETD</span>\n          <span>{{JobDetails.ExpectedDeliveryTime | date:\'HH:mm:ss\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">Target</span>\n          <span>{{JobDetails.TargetTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">Actual</span>\n          <span>{{JobDetails.ActualTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">SA</span>\n          <span>{{JobDetails.EmployeeName}} | {{JobDetails.ServiceAdviser}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <hr>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 18px;">Job Details ({{JobsList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-grid *ngFor="let j of JobsList" style="padding-bottom: 10px;">\n        <ion-row style="padding:5px">\n          <ion-col col>\n            <span class="SpnLeftLable">Job Type</span>\n            <span>{{j.JCType_Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col>\n            <span style="padding: 5px;">{{j.JobDescription}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 16px;font-weight: 500;">Technician Details ({{SelectedSEList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px" *ngFor="let t of SelectedSEList">\n        <ion-col col-9>\n          <span>{{t.Name}}</span>\n          <img src="assets/imgs/engineer.png" style="width:20px;display: inline;margin-left: 0.5em;">\n          <span style="position: absolute;top: -5px;">c</span>\n          <span style="margin-left: 1em;">| {{t.EmployeeCode}}</span>\n        </ion-col>\n        <ion-col col-3 style="text-align: right;">\n          <span>{{global.DisplayTimeFormate(t.JobCardWorkedTimeInMinutes)}} Hrs</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <div style="text-align: center;margin-top:5vh;margin-bottom:2vh;">\n    <button (click)="SelectTechnicianClick()" class="BtnTechnicianAdd">REALLOCATE TECHNICIAN(S)</button>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmpteddetails\sccmpteddetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], SccmpteddetailsPage);
    return SccmpteddetailsPage;
}());

//# sourceMappingURL=sccmpteddetails.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sccmptedt5pdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sccmptedt5plist_sccmptedt5plist__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sesearch_sesearch__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Sccmptedt5pdetailsPage = (function () {
    function Sccmptedt5pdetailsPage(navCtrl, navParams, global, httpClient, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.SelectedJC = {};
        this.JobDetails = {};
        this.JobsList = [];
        this.SelectedSEList = [];
        this.SelectedJC = this.navParams.get("data");
        this.global.HeaderTitle = "JC " + this.SelectedJC.OrderNo;
        console.log(this.SelectedJC);
    }
    Sccmptedt5pdetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetJobCardDetails?JobCardID=" + this.SelectedJC.JobCardHedIC).subscribe(function (jobs) {
                if (jobs.StatusCode == 200) {
                    _this.JobDetails = JSON.parse(jobs.Output).JobCardOrderDetails;
                    _this.JobsList = JSON.parse(jobs.Output).GetJCJobDetails;
                    _this.SelectedSEList = JSON.parse(jobs.Output).GetJobCardTechnicianList;
                    console.log(JSON.parse(jobs.Output));
                }
                else {
                    console.log(jobs);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    Sccmptedt5pdetailsPage.prototype.SelectTechnicianClick = function () {
        var _this = this;
        this.global.SESearchPage = "CompletedT5Pend";
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__sesearch_sesearch__["a" /* SesearchPage */], { SEList: this.SelectedSEList, JC: this.SelectedJC });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sccmptedt5plist_sccmptedt5plist__["a" /* Sccmptedt5plistPage */]);
        });
    };
    Sccmptedt5pdetailsPage.prototype.SubmitClick = function () {
        var _this = this;
        var employees = [];
        this.SelectedSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                employees.push({
                    JobCardHeaderID: ele.JobCardHeader_IC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(employees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", employees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sccmptedt5plist_sccmptedt5plist__["a" /* Sccmptedt5plistPage */]);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    Sccmptedt5pdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sccmptedt5pdetails',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedt5pdetails\sccmptedt5pdetails.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col col-10>\n          <span style="font-size: 18px;">Order Details</span>\n        </ion-col>\n        <ion-col col-2 style="text-align: right;">\n          <span class="SpnJobType" [style.borderColor]="SelectedJC.ColorName"\n            *ngIf="SelectedJC.JobType!=\'\'">{{global.JobTypeFormat(SelectedJC.JobType)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">T0</span>\n          <span>{{JobDetails.T0 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">T1</span>\n          <span>{{JobDetails.T1 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-8>\n          <span class="SpnLeftLable">T2</span>\n          <span>{{JobDetails.T2 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        \n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-7>\n          <span>{{JobDetails.LicensePlateNumber}}</span>\n        </ion-col>\n        <ion-col col-5 style="text-align: right;">\n          <span>{{JobDetails.VehicleModel}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">Odo</span>\n          <span>{{global.OdoMeterFormat(JobDetails.KMPerHour)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">EDD</span>\n          <span>{{JobDetails.ExpectedDeliveryDate | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n        <ion-col col style="text-align: right;">\n          <span class="SpnLeftLable">ETD</span>\n          <span>{{JobDetails.ExpectedDeliveryTime | date:\'HH:mm:ss\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">Target</span>\n          <span>{{JobDetails.TargetTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">Actual</span>\n          <span>{{JobDetails.ActualTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">SA</span>\n          <span>{{JobDetails.EmployeeName}} | {{JobDetails.ServiceAdviser}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <hr>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 18px;">Job Details ({{JobsList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-grid *ngFor="let j of JobsList" style="padding-bottom: 10px;">\n        <ion-row style="padding:5px">\n          <ion-col col>\n            <span class="SpnLeftLable">Job Type</span>\n            <span>{{j.JCType_Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col>\n            <span style="padding: 5px;">{{j.JobDescription}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 16px;font-weight: 500;">Technician Details ({{SelectedSEList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px" *ngFor="let t of SelectedSEList">\n        <ion-col col-9>\n          <span>{{t.Name}}</span>\n          <img src="assets/imgs/engineer.png" style="width:20px;display: inline;margin-left: 0.5em;">\n          <span style="position: absolute;top: -5px;">c</span>\n          <span style="margin-left: 1em;">| {{t.EmployeeCode}}</span>\n        </ion-col>\n        <ion-col col-3 style="text-align: right;">\n          <span>{{global.DisplayTimeFormate(t.JobCardWorkedTimeInMinutes)}} Hrs</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <div style="text-align: center;margin-top:5vh;margin-bottom:2vh;">\n    <button (click)="SelectTechnicianClick()" class="BtnTechnicianAdd">REALLOCATE TECHNICIAN(S)</button>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedt5pdetails\sccmptedt5pdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], Sccmptedt5pdetailsPage);
    return Sccmptedt5pdetailsPage;
}());

//# sourceMappingURL=sccmptedt5pdetails.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sccmptedt5ddetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sccmptedt5dlist_sccmptedt5dlist__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sesearch_sesearch__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Sccmptedt5ddetailsPage = (function () {
    function Sccmptedt5ddetailsPage(navCtrl, navParams, global, httpClient, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.SelectedJC = {};
        this.JobDetails = {};
        this.JobsList = [];
        this.SelectedSEList = [];
        this.SelectedJC = this.navParams.get("data");
        this.global.HeaderTitle = "JC " + this.SelectedJC.OrderNo;
        console.log(this.SelectedJC);
    }
    Sccmptedt5ddetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetJobCardDetails?JobCardID=" + this.SelectedJC.JobCardHedIC).subscribe(function (jobs) {
                if (jobs.StatusCode == 200) {
                    _this.JobDetails = JSON.parse(jobs.Output).JobCardOrderDetails;
                    _this.JobsList = JSON.parse(jobs.Output).GetJCJobDetails;
                    _this.SelectedSEList = JSON.parse(jobs.Output).GetJobCardTechnicianList;
                    console.log(JSON.parse(jobs.Output));
                }
                else {
                    console.log(jobs);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    Sccmptedt5ddetailsPage.prototype.SelectTechnicianClick = function () {
        var _this = this;
        this.global.SESearchPage = "CompletedT5Done";
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__sesearch_sesearch__["a" /* SesearchPage */], { SEList: this.SelectedSEList, JC: this.SelectedJC });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sccmptedt5dlist_sccmptedt5dlist__["a" /* Sccmptedt5dlistPage */]);
        });
    };
    Sccmptedt5ddetailsPage.prototype.SubmitClick = function () {
        var _this = this;
        var employees = [];
        this.SelectedSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                employees.push({
                    JobCardHeaderID: ele.JobCardHeader_IC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(employees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", employees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sccmptedt5dlist_sccmptedt5dlist__["a" /* Sccmptedt5dlistPage */]);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    Sccmptedt5ddetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sccmptedt5ddetails',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedt5ddetails\sccmptedt5ddetails.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col col-10>\n          <span style="font-size: 18px;">Order Details</span>\n        </ion-col>\n        <ion-col col-2 style="text-align: right;">\n          <span class="SpnJobType" [style.borderColor]="SelectedJC.ColorName"\n            *ngIf="SelectedJC.JobType!=\'\'">{{global.JobTypeFormat(SelectedJC.JobType)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">T0</span>\n          <span>{{JobDetails.T0 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">T1</span>\n          <span>{{JobDetails.T1 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-8>\n          <span class="SpnLeftLable">T2</span>\n          <span>{{JobDetails.T2 | date:\'dd.MM.yyyy, hh:mma\'}}</span>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-7>\n          <span>{{JobDetails.LicensePlateNumber}}</span>\n        </ion-col>\n        <ion-col col-5 style="text-align: right;">\n          <span>{{JobDetails.VehicleModel}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">Odo</span>\n          <span>{{global.OdoMeterFormat(JobDetails.KMPerHour)}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">EDD</span>\n          <span>{{JobDetails.ExpectedDeliveryDate | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n        <ion-col col style="text-align: right;">\n          <span class="SpnLeftLable">ETD</span>\n          <span>{{JobDetails.ExpectedDeliveryTime | date:\'HH:mm:ss\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col col-6>\n          <span class="SpnLeftLable">Target</span>\n          <span>{{JobDetails.TargetTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n        <ion-col col-6 style="text-align: right;">\n          <span class="SpnLeftLable">Actual</span>\n          <span>{{JobDetails.ActualTime | date:\'HH:mm\'}} hrs</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span class="SpnLeftLable">SA</span>\n          <span>{{JobDetails.EmployeeName}} | {{JobDetails.ServiceAdviser}}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <hr>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 18px;">Job Details ({{JobsList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-grid *ngFor="let j of JobsList" style="padding-bottom: 10px;">\n        <ion-row style="padding:5px">\n          <ion-col col>\n            <span class="SpnLeftLable">Job Type</span>\n            <span>{{j.JCType_Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col>\n            <span style="padding: 5px;">{{j.JobDescription}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <ion-card style="margin-bottom:15px;margin-top:15px;">\n\n    <ion-grid>\n\n      <ion-row style="padding:5px">\n        <ion-col>\n          <span style="font-size: 16px;font-weight: 500;">Technician Details ({{SelectedSEList.length}})</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="padding:5px" *ngFor="let t of SelectedSEList">\n        <ion-col col-9>\n          <span>{{t.Name}}</span>\n          <img src="assets/imgs/engineer.png" style="width:20px;display: inline;margin-left: 0.5em;">\n          <span style="position: absolute;top: -5px;">c</span>\n          <span style="margin-left: 1em;">| {{t.EmployeeCode}}</span>\n        </ion-col>\n        <ion-col col-3 style="text-align: right;">\n          <span>{{global.DisplayTimeFormate(t.JobCardWorkedTimeInMinutes)}} Hrs</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n</ion-content>\n\n<ion-footer>\n  <page-footer>\n  </page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedt5ddetails\sccmptedt5ddetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], Sccmptedt5ddetailsPage);
    return Sccmptedt5ddetailsPage;
}());

//# sourceMappingURL=sccmptedt5ddetails.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SctechavlPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SctechavlPage = (function () {
    function SctechavlPage(navCtrl, httpClient, global, navParams) {
        this.navCtrl = navCtrl;
        this.httpClient = httpClient;
        this.global = global;
        this.navParams = navParams;
        this.AvlList = [];
        this.FinalAvlList = [];
        this.IsSorted = false;
        this.global.HeaderTitle = "Available";
    }
    SctechavlPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetAvailableTechnicianList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.AvlList = JSON.parse(result.Output);
                    _this.FinalAvlList = Object.assign([], _this.AvlList);
                    console.log(_this.AvlList);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SctechavlPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__KPI_dashboard_dashboard__["a" /* DashboardPage */]);
    };
    SctechavlPage.prototype.JCSearch = function (val) {
        this.FinalAvlList = this.AvlList.filter(function (e) { return e.EmployeeName.toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.JobRole.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.EmployeeCode.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.CompetencyLevel.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.AvailableFrom.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalAvlList);
    };
    SctechavlPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalAvlList.sort(function (_a, _b) {
                var a = _a.AvailableFrom;
                var b = _b.AvailableFrom;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalAvlList = Object.assign([], this.AvlList);
            this.IsSorted = false;
        }
    };
    SctechavlPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sctechavl',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\TechStatus\sctechavl\sctechavl.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid style="margin-bottom: 8vh">\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Available {{AvlList.length}}</h1>\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top:5px;">\n\n      <ion-card *ngFor="let avl of FinalAvlList;let i=index"\n        style="border-radius: 5px;margin:0;width:100%;margin-bottom:14px;border-left: 5px solid #46c646;">\n\n        <ion-grid style="font-size: 13px;font-weight: 500;">\n\n          <ion-row style="padding: 6px;">\n            <ion-col col-11>\n              {{avl.EmployeeName}}\n              <span style="color:#808080"> {{avl.JobRole}} | {{avl.EmployeeCode}}</span>\n              <img src="assets/imgs/engineer.png" style="width:15px;">\n              <sup style="position: absolute;left: 12px;top: 1px;">{{avl.CompetencyLevel}}</sup>\n            </ion-col>\n            <ion-col col-1 style="text-align: right;">\n              <img src="assets/imgs/engineer.png" style="width:15px;">\n              <sup style="position: absolute;left: 12px;top: 1px;">{{avl.CompetencyLevel}}</sup>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding: 6px;">\n            <ion-col col-12 style="color:#808080;">\n              Avl. from\n              <span style="color:#000080;font-weight:500;">{{avl.AvailableFrom}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\TechStatus\sctechavl\sctechavl.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SctechavlPage);
    return SctechavlPage;
}());

//# sourceMappingURL=sctechavl.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SctechwiplPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SctechwiplPage = (function () {
    function SctechwiplPage(navCtrl, httpClient, global, navParams) {
        this.navCtrl = navCtrl;
        this.httpClient = httpClient;
        this.global = global;
        this.navParams = navParams;
        this.WIPList = [];
        this.FinalWIPList = [];
        this.IsSorted = false;
        this.global.HeaderTitle = "Work in Progress";
    }
    SctechwiplPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetWorkInProgressTechnicianList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.WIPList = JSON.parse(result.Output);
                    _this.FinalWIPList = Object.assign([], _this.WIPList);
                    console.log(_this.WIPList);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SctechwiplPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__KPI_dashboard_dashboard__["a" /* DashboardPage */]);
    };
    SctechwiplPage.prototype.JCSearch = function (val) {
        this.FinalWIPList = this.WIPList.filter(function (e) { return e.EmployeeName.toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.JobRole.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.EmployeeCode.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.CompetencyLevel.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.WIPFrom.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.JCOrderNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalWIPList);
    };
    SctechwiplPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalWIPList.sort(function (_a, _b) {
                var a = _a.WIPFrom;
                var b = _b.WIPFrom;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalWIPList = Object.assign([], this.WIPList);
            this.IsSorted = false;
        }
    };
    SctechwiplPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sctechwipl',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\TechStatus\sctechwipl\sctechwipl.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid style="margin-bottom: 8vh">\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Work in Progress {{WIPList.length}}</h1>\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top:5px;">\n\n      <ion-card *ngFor="let pl of FinalWIPList;let i=index"\n        style="border-radius: 5px;margin:0;width:100%;margin-bottom:14px;border-left: 5px solid yellow;">\n\n        <ion-grid style="font-size: 13px;font-weight: 500;">\n\n          <ion-row style="padding: 6px;">\n            <ion-col col-11>\n              {{pl.EmployeeName}}\n              <span style="color:#808080;"> {{pl.JobRole}} | {{pl.EmployeeCode}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/engineer.png" style="width:15px;">\n              <sup style="position: absolute;left: 12px;top: 1px;">{{pl.CompetencyLevel}}</sup>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding: 6px;">\n            <ion-col col-6>\n              {{pl.JCOrderNo}}\n            </ion-col>\n            <ion-col col-6 style="text-align: right;">\n              <span style="color:#808080;text-align: end;left: 15px;">Pending from</span>\n              <span style="color:#000080;font-weight:500;font-size: 14px;text-align: end;">{{global.DisplayTimeFormate(pl.WIPFrom)}}\n                Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\TechStatus\sctechwipl\sctechwipl.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SctechwiplPage);
    return SctechwiplPage;
}());

//# sourceMappingURL=sctechwipl.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SctechytsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__KPI_dashboard_dashboard__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SctechytsPage = (function () {
    function SctechytsPage(navCtrl, httpClient, global, navParams) {
        this.navCtrl = navCtrl;
        this.httpClient = httpClient;
        this.global = global;
        this.navParams = navParams;
        this.YtsList = [];
        this.FinalYtslList = [];
        this.IsSorted = false;
        this.global.HeaderTitle = "Yet to Start";
    }
    SctechytsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetYetToStartTechnicianList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.YtsList = JSON.parse(result.Output);
                    _this.FinalYtslList = Object.assign([], _this.YtsList);
                    console.log(_this.YtsList);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SctechytsPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__KPI_dashboard_dashboard__["a" /* DashboardPage */]);
    };
    SctechytsPage.prototype.JCSearch = function (val) {
        this.FinalYtslList = this.YtsList.filter(function (e) { return e.EmployeeName.toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.JobRole.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.EmployeeCode.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.CompetencyLevel.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.AvailableFrom.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalYtslList);
    };
    SctechytsPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalYtslList.sort(function (_a, _b) {
                var a = _a.AvailableFrom;
                var b = _b.AvailableFrom;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalYtslList = Object.assign([], this.YtsList);
            this.IsSorted = false;
        }
    };
    SctechytsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-sctechyts',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\TechStatus\sctechyts\sctechyts.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid style="margin-bottom: 8vh">\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Yet to Start {{FinalYtslList.length}}</h1>\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top:5px;">\n\n      <ion-card *ngFor="let pl of FinalYtslList;let i=index"\n        style="border-radius: 5px;margin:0;width:100%;margin-bottom:14px;border-left: 5px solid #04d1fe;">\n\n        <ion-grid style="font-size: 13px;font-weight: 500;">\n          \n          <ion-row style="padding: 6px;">\n            <ion-col col-11>\n              {{pl.EmployeeName}}\n              <span style="color:#808080;"> {{pl.JobRole}} | {{pl.EmployeeCode}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/engineer.png" style="width:15px;">\n              <sup style="position: absolute;left: 12px;top: 1px;">{{pl.CompetencyLevel}}</sup>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding: 6px;">\n            <ion-col col-6>\n              {{pl.JCOrderNo}}\n            </ion-col>\n            <ion-col col-6 style="text-align: right;">\n              <span style="color:#808080;text-align: end;left: 15px;">Pending from</span>\n              <span style="color:#000080;font-weight:500;font-size: 14px;text-align: end;">{{pl.AvailableFrom}}\n                Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\TechStatus\sctechyts\sctechyts.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
    ], SctechytsPage);
    return SctechytsPage;
}());

//# sourceMappingURL=sctechyts.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SctechpausePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SctechpausePage = (function () {
    function SctechpausePage(navCtrl, httpClient, global, navParams) {
        this.navCtrl = navCtrl;
        this.httpClient = httpClient;
        this.global = global;
        this.navParams = navParams;
        this.PauseList = [];
        this.FinalPauseList = [];
        this.IsSorted = false;
        this.global.HeaderTitle = "Pause";
    }
    SctechpausePage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetPausedTechnicianList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.PauseList = JSON.parse(result.Output);
                    _this.FinalPauseList = Object.assign([], _this.PauseList);
                    console.log(_this.PauseList);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SctechpausePage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__KPI_dashboard_dashboard__["a" /* DashboardPage */]);
    };
    SctechpausePage.prototype.JCSearch = function (val) {
        this.FinalPauseList = this.PauseList.filter(function (e) { return e.EmployeeName.toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.JobRole.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.EmployeeCode.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.CompetencyLevel.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.PausedFrom.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.PausedReason.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalPauseList);
    };
    SctechpausePage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalPauseList.sort(function (_a, _b) {
                var a = _a.PausedFrom;
                var b = _b.PausedFrom;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalPauseList = Object.assign([], this.PauseList);
            this.IsSorted = false;
        }
    };
    SctechpausePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sctechpause',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\TechStatus\sctechpause\sctechpause.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid style="margin-bottom: 8vh">\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" style="border: none;" [(ngModel)]="SerachText" (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Pause {{FinalPauseList.length}}</h1>\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top:5px;">\n\n      <ion-card *ngFor="let pl of FinalPauseList;let i=index" \n        style="border-radius: 5px;margin:0;width:100%;margin-bottom:14px;border-left: 5px solid orange;">\n        \n        <ion-grid style="font-size: 13px;font-weight: 500;">\n\n          <ion-row style="padding: 6px;">\n            <ion-col col-11>\n              {{pl.EmployeeName}}\n              <span style="color:#808080;"> {{pl.JobRole}} | {{pl.EmployeeCode}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/engineer.png" style="width:15px;">\n              <sup style="position: absolute;left: 12px;top: 1px;">{{pl.CompetencyLevel}}</sup>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding: 6px;">\n            <ion-col col-6>\n              {{pl.JCOrderNo}}\n            </ion-col>\n            <ion-col col-6 style="text-align: right;">\n              <span style="color:#808080;text-align: end;left: 15px;">Paused from</span>\n              <span style="color:#000080;font-weight:500;font-size: 14px;text-align: end;">{{pl.AvailableFrom}}\n                Hrs</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding: 6px;">\n            <ion-col>\n              {{pl.PauseReason}}\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\TechStatus\sctechpause\sctechpause.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SctechpausePage);
    return SctechpausePage;
}());

//# sourceMappingURL=sctechpause.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StwipPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StwipPage = (function () {
    function StwipPage(navCtrl, navParams, alertCtrl, global, httpClient) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.httpClient = httpClient;
        this.WipList = [];
        this.WipListCopy = [];
        this.sortdesc = true;
        this.selectedPauseActivity = '';
        this.PauseActivityList = [];
        this.isResionForPauseOpen = false;
        this.PauseActivityResion = "";
        this.PauseIconPath = this.global.HostedPath.split("api")[0] + "UploadedFiles/PauseActivity/";
        this.global.HeaderTitle = "In Progress";
    }
    StwipPage.prototype.ngOnInit = function () {
        if (this.global.CheckInternetConnection()) {
            console.log(this.global.UserDetails);
            this.global.LoadingShow("Please wait...");
            this.CallListData();
            this.global.LoadingHide();
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    StwipPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__["a" /* StdashboardPage */]);
    };
    StwipPage.prototype.PauseClick1 = function (e) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Do you want to Pause the job ?',
            message: '',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'BtnCancelPopup',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    cssClass: 'BtnYesPopup',
                    handler: function () {
                        var PauseAlert = _this.alertCtrl.create();
                        PauseAlert.setTitle('Reason');
                        _this.global.MasterData.PauseActivity.forEach(function (ele) {
                            PauseAlert.addInput({
                                type: 'radio',
                                value: ele.ShortName,
                                label: ele.PauseReason,
                                checked: false
                            });
                        });
                        PauseAlert.addButton({
                            text: 'Reset',
                            cssClass: "BtnResetPopup"
                        });
                        PauseAlert.addButton({
                            text: 'Yes',
                            cssClass: "BtnYesPopup",
                            handler: function (val) {
                                console.log(val);
                                if (val == "OT") {
                                    var prompt_1 = _this.alertCtrl.create({
                                        title: 'Reason',
                                        message: "Please Enter Other reason",
                                        inputs: [
                                            {
                                                name: 'reason',
                                                placeholder: 'Reason'
                                            },
                                        ],
                                        buttons: [
                                            {
                                                text: 'Cancel',
                                                cssClass: "BtnCancelPopup",
                                                handler: function (data) {
                                                    //PauseAlert.present();
                                                }
                                            },
                                            {
                                                text: 'Yes',
                                                cssClass: "BtnYesPopup",
                                                handler: function (data) {
                                                    console.log(data);
                                                    if (data.reason == "") {
                                                        _this.global.ToastShow("Please Enter Other reason");
                                                        return false;
                                                    }
                                                    else {
                                                        _this.UpdatePuase(e.JobCardHedIC, val, data.reason);
                                                    }
                                                }
                                            }
                                        ]
                                    });
                                    prompt_1.present();
                                }
                                else {
                                    var res = _this.global.MasterData.PauseActivity.find(function (a) { return a.ShortName == val; }).PauseReason;
                                    _this.UpdatePuase(e.JobCardHedIC, val, res);
                                }
                            }
                        });
                        PauseAlert.present();
                    }
                }
            ]
        });
        confirm.present();
    };
    StwipPage.prototype.PauseClick = function (e) {
        var _this = this;
        this.PauseActivityList = this.global.MasterData.PauseActivity;
        var confirm = this.alertCtrl.create({
            title: 'Do you want to Pause the job ?',
            message: '',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'BtnCancelPopup',
                    handler: function () {
                        console.log('Disagree clicked');
                        _this.isResionForPauseOpen = false;
                    }
                },
                {
                    text: 'Yes',
                    cssClass: 'BtnYesPopup',
                    handler: function () {
                        console.log("PauseActivityList");
                        console.log(_this.PauseActivityList);
                        _this.JobCardHedIC = e.JobCardHedIC;
                        console.log("JobCardHedIC");
                        console.log(_this.JobCardHedIC);
                        _this.isResionForPauseOpen = true;
                    }
                }
            ]
        });
        confirm.present();
    };
    StwipPage.prototype.ClosePauseContainer = function () {
        this.isResionForPauseOpen = false;
    };
    StwipPage.prototype.ConfirmResionForPause = function () {
        var _this = this;
        console.log(this.selectedPauseActivity);
        if (this.selectedPauseActivity == "OT") {
            if (this.PauseActivityResion == "") {
                this.global.ToastShow("Please Enter Other reason");
                return false;
            }
            else {
                this.UpdatePuase(this.JobCardHedIC, this.selectedPauseActivity, this.PauseActivityResion);
                this.isResionForPauseOpen = false;
            }
        }
        else {
            var res = this.global.MasterData.PauseActivity.find(function (a) { return a.ShortName == _this.selectedPauseActivity; }).PauseReason;
            this.UpdatePuase(this.JobCardHedIC, this.selectedPauseActivity, res);
            this.isResionForPauseOpen = false;
        }
    };
    StwipPage.prototype.PauseActivityListClick = function (val) {
        setTimeout(function () {
            if (val.ShortName == "OT") {
                document.getElementById("ResionForPauseListContainer").scrollTop = 200;
            }
        }, 10);
    };
    StwipPage.prototype.CompleteClick = function (e) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Do you want to Complete the job ?',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'BtnCancelPopup',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    cssClass: 'BtnYesPopup',
                    handler: function () {
                        if (_this.global.CheckInternetConnection()) {
                            _this.httpClient.post(_this.global.HostedPath + "UpdateOnComplete?TechnicianID=" + _this.global.UserDetails[0].Employee_IC + "&JobCardHeaderIC=" + e.JobCardHedIC, {}).subscribe(function (result) {
                                console.log(result);
                                if (result.StatusCode == 200) {
                                    // this.global.ToastShow("Job Submitted Successfully");
                                    // this.ngOnInit(undefined);
                                    _this.CallListData();
                                    var alert_1 = _this.alertCtrl.create({
                                        title: '<img src="assets/imgs/thumbs-up.png">',
                                        subTitle: '<center>Great Job!!!<br/> Keep up the good work!!!<center>',
                                        buttons: [{
                                                text: 'OK',
                                                cssClass: 'BtnOkPopup',
                                                handler: function () {
                                                    console.log('Ok clicked');
                                                }
                                            }]
                                    });
                                    alert_1.present();
                                }
                                else {
                                    console.log(result);
                                    _this.global.ToastShow("Something went wrong, Pls try again later");
                                }
                            }, function (error) {
                                console.log(error);
                            });
                        }
                        else {
                            _this.global.ToastShow(_this.global.NetworkMessage);
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    StwipPage.prototype.CallListData = function () {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetTechInProgress?Technician_ID=" + this.global.UserDetails[0].Employee_IC).subscribe(function (list) {
            if (list.StatusCode == 200) {
                _this.WipList = JSON.parse(list.Output);
                _this.WipList.sort(function (a, b) { return b.T1 - a.T1; });
                console.log(_this.WipList);
                _this.WipListCopy = _this.WipList;
            }
            else {
                console.log(list);
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
        }, function (error) {
            console.log(error);
            _this.global.LoadingHide();
        });
    };
    StwipPage.prototype.Search = function () {
        var _this = this;
        console.log(this.SrchText);
        this.WipList = this.WipListCopy.filter(function (p) { return p.Jobtype.toLowerCase().trim().includes(_this.SrchText.toLowerCase().trim()) ||
            p.OrderNo.toString().includes(_this.SrchText.trim()) ||
            p.VehicleNo.toLowerCase().includes(_this.SrchText.toLowerCase().trim()) ||
            p.IsAppointmentDone.toString().includes(_this.SrchText.trim()) ||
            p.CustomerName.toLowerCase().includes(_this.SrchText.toLowerCase().trim()) ||
            p.ServiceAdvisor.toString().includes(_this.SrchText.trim()) ||
            p.Ageing.toString().includes(_this.SrchText.trim()) ||
            p.T1.toString().includes(_this.SrchText.trim()) ||
            p.EDD.toString().includes(_this.SrchText.trim()) ||
            p.ETD.toString().includes(_this.SrchText.trim()); });
        console.log(this.WipList);
    };
    StwipPage.prototype.SortClick = function () {
        this.sortdesc = !this.sortdesc;
        if (this.sortdesc) {
            this.WipList.sort(function (a, b) { return b.T1 - a.T1; });
        }
        else {
            this.WipList.sort(function (a, b) { return a.T1 - b.T1; });
        }
        console.log(this.WipList);
    };
    StwipPage.prototype.UpdatePuase = function (JC, ShortName, reason) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.httpClient.post(this.global.HostedPath + "UpdateOnPause?TechnicianID=" + this.global.UserDetails[0].Employee_IC + "&JobCardHeaderIC=" + JC + "&ShortName=" + ShortName + "&Reason=" + reason, {}).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.global.ToastShow("Job Paused");
                    _this.CallListData();
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    StwipPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stwip',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\stwip\stwip.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;display: flex;flex-wrap: wrap;">\n        <img src="assets/imgs/search.png" style="width: 18px;margin-right: 8px;">\n        <ion-input type="text" placeholder="Search" (keyup)="Search($event)" [(ngModel)]="SrchText"\n          style="border: none;margin: 0 !important;"></ion-input>\n\n        <!-- <input type="text" placeholder="Search" style="border: none;"> -->\n      </ion-col>\n      <ion-col col-1 style="text-align: center;">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;" (click)="SortClick()">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">In Progress {{WipList.length}}</h1>\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top:5px;">\n\n      <ion-card class="DivCard" *ngFor="let pl of WipList;let i=index"\n        [ngClass]="{Clsred: pl.AgeningSlab ==3,Clsgreen: pl.AgeningSlab ==1,Clsyellow: (pl.AgeningSlab == 2)}">\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-col col-8 style="padding:5px">\n              <span class="SpnJCVehicle">\n                <span style="color:#808080;padding-right: 5px;">JC</span>\n                {{pl.OrderNo}} | {{pl.VehicleNo}}\n              </span>\n            </ion-col>\n\n            <ion-col col-1 style="padding:6px;text-align: end;">\n              <img src="assets/imgs/exchange.png" *ngIf="pl.IsRecursive" style="width:12px">\n            </ion-col>\n\n            <ion-col col-1 style="padding:6px;text-align: end;">\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n\n            <ion-col col-2 style="display: flex;" *ngIf="pl.Jobtype!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.Jobtype)}}\n              </span>\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span>{{pl.CustomerName}}</span>\n              <span *ngIf="pl.IsKAMCustomer!=\'\'">( <span style="color: orange;">{{pl.IsKAMCustomer}}</span>)</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col col-8 style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 5px;color:#808080">SA</span>\n              <span>{{pl.ServiceAdvisor}}</span>\n            </ion-col>\n            <ion-col col-4 style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 10px;color:#808080">T1</span>\n              <span>{{pl.T1 | date:\'dd.MM.yyyy\'}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 10px;color:#808080">EDD</span>\n              <span>{{pl.EDD | date:\'dd MMM yyyy\'}} | {{pl.ETD}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="margin:1vh">\n            <ion-col col-6 style="text-align: right;">\n              <button (click)="PauseClick(pl)" class="BtnPause">Pause</button>\n            </ion-col>\n            <ion-col col-6 style="text-align: left;">\n              <button (click)="CompleteClick(pl)" class="BtnComplete">Complete</button>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n  <!-- ================================================= Custom Alert - Resion For Pause ============================================= -->\n\n  <div id="DivAlertContainer" *ngIf="isResionForPauseOpen">\n\n    <ion-card id="ResionForPauseContainer">\n      <ion-card-header>\n        <ion-grid>\n          <ion-row>\n            <ion-col text-center><b>Reason for Pause</b></ion-col>\n            <ion-col text-right (click)="ClosePauseContainer()">x</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n\n      <ion-list radio-group [(ngModel)]="selectedPauseActivity" id="ResionForPauseListContainer">\n\n        <ion-item *ngFor="let item of PauseActivityList" style="padding-left: 10px;">\n          <ion-label style="display: contents;font-weight: bold;">\n            <img [src]="PauseIconPath+item.IconFileName" class="item-image" />\n            {{item.PauseReason}}\n          </ion-label>\n          <ion-radio [value]="item.ShortName" item-left style="margin-right: 10px;" (click)="PauseActivityListClick(item)"></ion-radio>\n        </ion-item>\n\n        <ion-item *ngIf="selectedPauseActivity==\'OT\'" style="margin-left: 35px; width: 80%;">\n          <ion-input type="text" placeholder="Type your reason here" [(ngModel)]="PauseActivityResion"></ion-input>\n        </ion-item>\n\n      </ion-list>\n\n      <ion-grid style="margin-bottom: 10px; margin-top: 10px;">\n        <ion-row>\n          <ion-col text-right><button ion-button\n              style="width: 60%; border-radius: 5px; background: #d4d4d4; color: black;margin: 8px;"\n              (click)="ClosePauseContainer()">Reset</button></ion-col>\n          <ion-col text-left><button ion-button\n              style="width: 60%; border-radius: 5px; background: #294785 ; color: white;margin: 8px;"\n              (click)="ConfirmResionForPause()">Yes</button></ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-card>\n\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <page-footer>\n  </page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\stwip\stwip.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]])
    ], StwipPage);
    return StwipPage;
}());

//# sourceMappingURL=stwip.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StpausedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StpausedPage = (function () {
    function StpausedPage(navCtrl, navParams, alertCtrl, global, httpClient) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.httpClient = httpClient;
        this.YtsList = [];
        this.YtsListCopy = [];
        this.sortdesc = true;
        this.global.HeaderTitle = "Paused";
    }
    StpausedPage.prototype.ngOnInit = function () {
        if (this.global.CheckInternetConnection()) {
            console.log(this.global.UserDetails);
            this.global.LoadingShow("Please wait...");
            this.CallListData();
            this.global.LoadingHide();
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    StpausedPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__["a" /* StdashboardPage */]);
    };
    StpausedPage.prototype.StartClick = function (e) {
        var _this = this;
        console.log(e);
        var confirm = this.alertCtrl.create({
            title: 'Do you want to Start the job ?',
            message: '',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'BtnCancelPopup',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    cssClass: 'BtnYesPopup',
                    handler: function () {
                        console.log('Agree clicked');
                        if (_this.global.CheckInternetConnection()) {
                            _this.httpClient.post(_this.global.HostedPath + "UpdateOnStart?TechnicianID=" + _this.global.UserDetails[0].Employee_IC + "&JobCardHeaderIC=" + e.JobCardHedIC, {}).subscribe(function (result) {
                                console.log(result);
                                if (result.StatusCode == 200) {
                                    _this.CallListData();
                                    _this.global.ToastShow("Job Started");
                                    // this.ngOnInit(undefined);
                                }
                                else if (result.StatusCode == 0) {
                                    _this.global.ToastShow("Please close Previous job to start new JC");
                                    // this.ngOnInit(undefined);
                                }
                                else {
                                    console.log(result);
                                    _this.global.ToastShow("Something went wrong, Pls try again later");
                                }
                            }, function (error) {
                                console.log(error);
                            });
                        }
                        else {
                            _this.global.ToastShow(_this.global.NetworkMessage);
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    StpausedPage.prototype.CallListData = function () {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetTechPaused?Technician_ID=" + this.global.UserDetails[0].Employee_IC).subscribe(function (list) {
            if (list.StatusCode == 200) {
                _this.YtsList = JSON.parse(list.Output);
                _this.YtsList.sort(function (a, b) { return b.T1 - a.T1; });
                console.log(_this.YtsList);
                _this.YtsListCopy = _this.YtsList;
            }
            else {
                console.log(list);
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
        }, function (error) {
            console.log(error);
            _this.global.LoadingHide();
        });
    };
    StpausedPage.prototype.Search = function () {
        var _this = this;
        console.log(this.SrchText);
        this.YtsList = this.YtsListCopy.filter(function (p) { return p.Jobtype.toLowerCase().trim().includes(_this.SrchText.toLowerCase().trim()) ||
            p.OrderNo.toString().includes(_this.SrchText.trim()) ||
            p.VehicleNo.toLowerCase().includes(_this.SrchText.toLowerCase().trim()) ||
            p.IsAppointmentDone.toString().includes(_this.SrchText.trim()) ||
            p.CustomerName.toLowerCase().includes(_this.SrchText.toLowerCase().trim()) ||
            p.ServiceAdvisor.toString().includes(_this.SrchText.trim()) ||
            p.Ageing.toString().includes(_this.SrchText.trim()) ||
            p.T1.toString().includes(_this.SrchText.trim()) ||
            p.EDD.toString().includes(_this.SrchText.trim()) ||
            p.ETD.toString().includes(_this.SrchText.trim()) ||
            p.PausedReason.toLowerCase().includes(_this.SrchText.toLowerCase().trim()); });
        console.log(this.YtsList);
    };
    StpausedPage.prototype.SortClick = function () {
        this.sortdesc = !this.sortdesc;
        if (this.sortdesc) {
            this.YtsList.sort(function (a, b) { return b.T1 - a.T1; });
        }
        else {
            this.YtsList.sort(function (a, b) { return a.T1 - b.T1; });
        }
        console.log(this.YtsList);
    };
    StpausedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stpaused',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\stpaused\stpaused.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;display: flex;flex-wrap: wrap;">\n        <img src="assets/imgs/search.png" style="width: 18px;margin-right: 8px;">\n        <ion-input type="text" placeholder="Search" (keyup)="Search($event)" [(ngModel)]="SrchText"\n          style="border: none;margin: 0 !important;"></ion-input>\n        <!-- <input type="text" placeholder="Search" style="border: none;"> -->\n      </ion-col>\n      <ion-col col-1 style="text-align: center;">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;" (click)="SortClick()">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Paused {{YtsList.length}}</h1>\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top:5px;">\n\n      <ion-card class="DivCard" *ngFor="let pl of YtsList;let i=index"\n        [ngClass]="{Clsred: pl.AgeningSlab ==3,Clsgreen: pl.AgeningSlab ==1,Clsyellow: (pl.AgeningSlab == 2)}">\n\n        <ion-grid style="font-size: 13px;font-weight: 500;">\n\n          <ion-row>\n\n            <ion-col col-8 style="padding:5px">\n              <span class="SpnJCVehicle">\n                <span style="color:#808080;padding-right: 5px;">JC</span>\n                {{pl.OrderNo}} | {{pl.VehicleNo}}\n              </span>\n            </ion-col>\n\n            <ion-col col-1 style="padding:6px;text-align: end;">\n              <img src="assets/imgs/exchange.png" *ngIf="pl.IsRecursive" style="width:12px">\n            </ion-col>\n\n            <ion-col col-1 style="padding:6px;text-align: end;">\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n\n            <ion-col col-2 style="display: flex;" *ngIf="pl.Jobtype!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.Jobtype)}}\n              </span>\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span>{{pl.CustomerName}}</span>\n              <span *ngIf="pl.IsKAMCustomer!=\'\'">( <span style="color: orange;">{{pl.IsKAMCustomer}}</span>)</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col col-8 style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 5px;color:#808080">SA</span>\n              <span>{{pl.ServiceAdvisor}}</span>\n            </ion-col>\n            <ion-col col-4 style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 10px;color:#808080">T1</span>\n              <span>{{pl.T1 | date:\'dd.MM.yyyy\'}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 10px;color:#808080">EDD</span>\n              <span>{{pl.EDD | date:\'dd MMM yyyy\'}} | {{pl.ETD}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span>{{pl.PauseReason}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="margin:1vh;">\n            <ion-col style="text-align: center;">\n              <button (click)="StartClick(pl)" class="BtnStart">Start</button>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <page-footer>\n  </page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\stpaused\stpaused.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]])
    ], StpausedPage);
    return StpausedPage;
}());

//# sourceMappingURL=stpaused.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StcompletedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StcompletedPage = (function () {
    function StcompletedPage(navCtrl, navParams, global, httpClient) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.DisplayRow = false;
        this.YtsList = [];
        this.YtsListCopy = [];
        this.sortdesc = true;
        this.global.HeaderTitle = "Completed";
    }
    StcompletedPage.prototype.ngOnInit = function () {
        if (this.global.CheckInternetConnection()) {
            console.log(this.global.UserDetails);
            this.global.LoadingShow("Please wait...");
            this.CallListData();
            this.global.LoadingHide();
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    StcompletedPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__["a" /* StdashboardPage */]);
    };
    StcompletedPage.prototype.ViewClick = function (ind) {
        this.DisplayRow = !this.DisplayRow;
        this.clickedindex = ind;
    };
    StcompletedPage.prototype.CallListData = function () {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetTechCompleted?Technician_ID=" + this.global.UserDetails[0].Employee_IC).subscribe(function (list) {
            if (list.StatusCode == 200) {
                _this.YtsList = JSON.parse(list.Output);
                _this.YtsList.sort(function (a, b) { return b.T1 - a.T1; });
                console.log(_this.YtsList);
                _this.YtsListCopy = _this.YtsList;
            }
            else {
                console.log(list);
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
        }, function (error) {
            console.log(error);
            _this.global.LoadingHide();
        });
    };
    StcompletedPage.prototype.Search = function () {
        var _this = this;
        console.log(this.SrchText);
        this.YtsList = this.YtsListCopy.filter(function (p) { return p.Jobtype.toLowerCase().trim().includes(_this.SrchText.toLowerCase().trim()) ||
            p.OrderNo.toString().includes(_this.SrchText.trim()) ||
            p.VehicleNo.toLowerCase().includes(_this.SrchText.toLowerCase().trim()) ||
            p.CustomerName.toLowerCase().includes(_this.SrchText.toLowerCase().trim()) ||
            p.ServiceAdvisor.toString().includes(_this.SrchText.trim()) ||
            p.Ageing.toString().includes(_this.SrchText.trim()) ||
            p.T1.toString().includes(_this.SrchText.trim()) ||
            p.EDD.toString().includes(_this.SrchText.trim()) ||
            p.ETD.toString().includes(_this.SrchText.trim()) ||
            p.StartDateTime.toString().includes(_this.SrchText.trim()) ||
            p.EndDateTime.toString().includes(_this.SrchText.trim()); });
        console.log(this.YtsList);
    };
    StcompletedPage.prototype.SortClick = function () {
        this.sortdesc = !this.sortdesc;
        if (this.sortdesc) {
            this.YtsList.sort(function (a, b) { return b.T1 - a.T1; });
        }
        else {
            this.YtsList.sort(function (a, b) { return a.T1 - b.T1; });
        }
        console.log(this.YtsList);
    };
    StcompletedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stcompleted',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\stcompleted\stcompleted.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;display: flex;flex-wrap: wrap;">\n        <img src="assets/imgs/search.png" style="width: 18px;margin-right: 8px;">\n        <ion-input type="text" placeholder="Search" (keyup)="Search($event)" [(ngModel)]="SrchText"\n          style="border: none;margin: 0 !important;"></ion-input>\n\n        <!-- <input type="text" placeholder="Search" style="border: none;"> -->\n      </ion-col>\n      <ion-col col-1 style="text-align: center;">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;" (click)="SortClick()">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Completed {{YtsList.length}}</h1>\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top:5px;">\n\n      <ion-card class="DivCard" *ngFor="let pl of YtsList;let i=index"\n        [ngClass]="{Clsred: pl.AgeningSlab ==3,Clsgreen: pl.AgeningSlab ==1,Clsyellow: (pl.AgeningSlab == 2)}">\n\n        <ion-grid style="font-size: 13px;font-weight: 500;">\n\n          <ion-row>\n\n            <ion-col col-8 style="padding:5px">\n              <span class="SpnJCVehicle">\n                <span style="color:#808080;padding-right: 5px;">JC</span>\n                {{pl.OrderNo}} | {{pl.VehicleNo}}\n              </span>\n            </ion-col>\n\n            <ion-col col-1 style="padding:6px;text-align: end;">\n              <img src="assets/imgs/exchange.png" *ngIf="pl.IsRecursive" style="width:12px">\n            </ion-col>\n\n            <ion-col col-1 style="padding:6px;text-align: end;">\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n\n            <ion-col col-2 style="display: flex;" *ngIf="pl.Jobtype!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.Jobtype)}}\n              </span>\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span>{{pl.CustomerName}}</span>\n              <span *ngIf="pl.IsKAMCustomer!=\'\'">( <span style="color: orange;">{{pl.IsKAMCustomer}}</span>)</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col col-8 style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 5px;color:#808080">SA</span>\n              <span>{{pl.ServiceAdvisor}}</span>\n            </ion-col>\n            <ion-col col-4 style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 10px;color:#808080">T1</span>\n              <span>{{pl.T1 | date:\'dd.MM.yyyy\'}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 10px;color:#808080">EDD</span>\n              <span>{{pl.EDD | date:\'dd MMM yyyy\'}} | {{pl.ETD}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:6px" *ngIf="clickedindex == i && DisplayRow">\n            <ion-col col-12>\n              <span style="display:inline-block;padding-right: 5px;color:#808080">Start</span>\n              <span>{{pl.StartDateTime | date:\'dd.MM.yyyy\'}} | {{pl.StartDateTime |\n                date:\'HH:mm a\'}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:6px" *ngIf="clickedindex == i && DisplayRow">\n            <ion-col col-12>\n              <span style="display:inline-block;padding-right: 5px;color:#808080">End</span>\n              <span>{{pl.EndDateTime | date:\'dd.MM.yyyy\'}} | {{pl.EndDateTime | date:\'HH:mm a\'}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:6px" *ngIf="clickedindex == i && DisplayRow">\n            <ion-col col-12>\n              <span style="display:inline-block;padding-right: 5px;color:#808080">Total</span>\n              <span style="color:#000080">{{global.DisplayTimeFormate(pl.TotalHours)}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:6px;">\n            <ion-col style="text-align: end;font-size: 12px;">\n              <button (click)="ViewClick(i)"\n                style="border:none;background: none;color:#000080;font-weight: 500;font-size: 12px;">\n                {{ DisplayRow && clickedindex == i ? \'View Less\' : \'View More\' }}\n              </button>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\stcompleted\stcompleted.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]])
    ], StcompletedPage);
    return StcompletedPage;
}());

//# sourceMappingURL=stcompleted.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StrealizationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StrealizationPage = (function () {
    function StrealizationPage(navCtrl, navParams, alertCtrl, global, httpClient, datePipe, actionsheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.httpClient = httpClient;
        this.datePipe = datePipe;
        this.actionsheetCtrl = actionsheetCtrl;
        this.RealizationData = {};
        this.RealizationList = [];
        this.RealizationListCopy = [];
        this.Filterdata = "Last 7 days";
        this.selectedtype = 2;
        this.filtervalue = true;
        this.sortdesc = true;
        this.daterange = false;
        this.fromDate = '01/21/2024';
        this.toDate = '03/21/2024';
        this.global.HeaderTitle = "Realization";
        var date = new Date();
        this.today = this.datePipe.transform(date, 'dd.MM.yyy');
        console.log(this.RealizationList);
    }
    StrealizationPage.prototype.ngOnInit = function () {
        if (this.global.CheckInternetConnection()) {
            console.log(this.global.UserDetails);
            this.global.LoadingShow("Please wait...");
            //filter
            this.CallFilterData();
            this.global.LoadingHide();
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    StrealizationPage.prototype.presentCheckboxAlert = function () {
        // let alert = this.alertCtrl.create({
        //   title: 'Duration',
        //   inputs: [
        //     {
        //       type: 'radio',
        //       label: 'Last Day',
        //       value: '1'
        //     },
        //     {
        //       type: 'radio',
        //       label: 'Last 7 days',
        //       value: '2',
        //       checked: true,
        //     },
        //     {
        //       type: 'radio',
        //       label: 'MTD',
        //       value: '3',
        //     },
        //     {
        //       type: 'radio',
        //       label: 'LM',
        //       value: '4',
        //     },
        //     {
        //       type: 'radio',
        //       label: 'YTD',
        //       value: '5',
        //     },
        //     {
        //       type: 'radio',
        //       label: 'Date Range',
        //       value: '6'
        //     },
        //   ],
        //   buttons: [
        //     {
        //       text: 'Cancel',
        //       role: 'cancel',
        //       cssClass: 'BtnCancelPopup',
        //       handler: data => {
        //         console.log('Cancel clicked');
        //       }
        //     },
        //     {
        //       text: 'OK',
        //       cssClass: 'BtnYesPopup',
        //       handler: data => {
        //         console.log('radio data:', data);
        //         this.selectedtype = data;
        //         switch (data) {
        //           case '1':
        //             this.Filterdata = 'Last Day';
        //             break;
        //           case '2':
        //             this.Filterdata = 'Last 7 days';
        //             break;
        //           case '3':
        //             this.Filterdata = 'MTD';
        //             break;
        //           case '4':
        //             this.Filterdata = 'LM';
        //             break;
        //           case '5':
        //             this.Filterdata = 'YTD';
        //             break;
        //           case '6':
        //             this.Filterdata = 'date range';
        //             break;
        //           default:
        //             break;
        //         }
        //         console.log(this.Filterdata);
        //         this.filtervalue = true;
        //         this.CallFilterData();
        //       }
        //     }
        //   ]
        // });
        // alert.present();
        var _this = this;
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Duration',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Last Day',
                    handler: function () {
                        console.log('Last Day');
                        _this.Filterdata = 'Last Day';
                        _this.selectedtype = 1;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'Last 7 days',
                    handler: function () {
                        console.log('Last 7 days');
                        _this.Filterdata = 'Last 7 days';
                        _this.selectedtype = 2;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'MTD',
                    handler: function () {
                        console.log('MTD');
                        _this.Filterdata = 'MTD';
                        _this.selectedtype = 3;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'LM',
                    handler: function () {
                        console.log('LM');
                        _this.Filterdata = 'LM';
                        _this.selectedtype = 4;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'YTD',
                    handler: function () {
                        console.log('YTD');
                        _this.Filterdata = 'YTD';
                        _this.selectedtype = 5;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'Date range',
                    handler: function () {
                        console.log('Date range');
                        _this.Filterdata = 'Date range';
                        _this.selectedtype = 6;
                        _this.filtervalue = false;
                        _this.daterange = true;
                        // this.CallFilterData();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    StrealizationPage.prototype.RemoveFilteredata = function () {
        // console.log(data);
        // this.FilterList.splice(data, 1);
        this.filtervalue = false;
    };
    StrealizationPage.prototype.CallFilterData = function () {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetTechRealizationDashboardCounts?Technician_ID=" + this.global.UserDetails[0].Employee_IC + "&Type=" + this.selectedtype + "&FromeDate=" + this.fromDate + "&ToDate=" + this.toDate).subscribe(function (jobCards) {
            if (jobCards.StatusCode == 200) {
                console.log(JSON.parse(jobCards.Output)[0]);
                _this.RealizationData = JSON.parse(jobCards.Output)[0];
                console.log(_this.RealizationData);
                //List 
                _this.httpClient.get(_this.global.HostedPath + "GetTechRealizationDashboardList?Technician_ID=" + _this.global.UserDetails[0].Employee_IC + "&Type=" + _this.selectedtype + "&FromeDate=" + _this.fromDate + "&ToDate=" + _this.toDate).subscribe(function (list) {
                    _this.RealizationList = JSON.parse(list.Output);
                    console.log(_this.RealizationList);
                    _this.RealizationList.sort(function (a, b) { return b.RealizationPerc - a.RealizationPerc; });
                    console.log(_this.RealizationList);
                    _this.RealizationListCopy = _this.RealizationList;
                    console.log(_this.RealizationListCopy);
                }, function (error) {
                    console.log(error);
                    _this.global.LoadingHide();
                });
            }
            else {
                console.log(jobCards);
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
        }, function (error) {
            console.log(error);
            _this.global.LoadingHide();
        });
    };
    StrealizationPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__["a" /* StdashboardPage */]);
    };
    StrealizationPage.prototype.removeMinus = function (value) {
        return Math.abs(value); // Returns the absolute value of the number
    };
    StrealizationPage.prototype.Search = function () {
        var _this = this;
        console.log(this.SrchText);
        this.RealizationList = this.RealizationListCopy.filter(function (p) { return p.Jobtype.toLowerCase().trim().includes(_this.SrchText.toLowerCase().trim()) ||
            p.OrderNo.toString().includes(_this.SrchText.trim()) ||
            p.RealizationPerc.toString().includes(_this.SrchText.trim()) ||
            p.RealizationDiff.toString().includes(_this.SrchText.trim()) ||
            p.BilledHours.toString().includes(_this.SrchText.trim()) ||
            p.WorkedHours.toString().includes(_this.SrchText.trim()) ||
            p.Ageing.toString().includes(_this.SrchText.trim()); });
        console.log(this.RealizationList);
    };
    StrealizationPage.prototype.SortClick = function () {
        this.sortdesc = !this.sortdesc;
        if (this.sortdesc) {
            this.RealizationList.sort(function (a, b) { return b.RealizationPerc - a.RealizationPerc; });
        }
        else {
            this.RealizationList.sort(function (a, b) { return a.RealizationPerc - b.RealizationPerc; });
        }
        console.log(this.RealizationList);
    };
    StrealizationPage.prototype.FromDateChange = function (event) {
        console.log('fromDate:', this.fromDate);
    };
    StrealizationPage.prototype.ToDateChange = function (event) {
        console.log('To Date:', this.toDate);
    };
    StrealizationPage.prototype.customDateClick = function () {
        console.log(this.fromDate + "and" + this.toDate);
        if ((this.fromDate == null || this.fromDate == undefined) || (this.toDate == null || this.toDate == undefined)) {
            this.global.ToastShow("Please select date");
        }
        else {
            this.CallFilterData();
        }
    };
    StrealizationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-strealization',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\strealization\strealization.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background: #fff;">\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-10 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;display: flex;flex-wrap: wrap;">\n\n        <img src="assets/imgs/search.png" style="width: 18px;margin-right: 8px;">\n        <ion-input type="text" placeholder="Search" (keyup)="Search($event)" [(ngModel)]="SrchText" style="border: none;margin: 0 !important;"></ion-input>\n      </ion-col>\n      <ion-col col-2 style="text-align: center;">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;" (click)="SortClick()">\n      </ion-col>\n\n    </ion-row>\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n      <ion-col col-2>\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh" (click)="presentCheckboxAlert()">\n      </ion-col>\n      <ion-col style="display: flex;flex-wrap: wrap; width:auto">\n        <div *ngIf="filtervalue"\n          style="background: #d3d3d3;padding:7px;padding-right:10px;padding-left:10px;margin-right:5px;margin-bottom: 5px; font-size: 12px;border-radius: 5px;font-weight: 600;">\n          {{Filterdata}} \n          <!-- <span style="margin-left:8px;" (click)="RemoveFilteredata()">x</span> -->\n        </div>\n        <div *ngIf="daterange" style="display: flex;flex-wrap: wrap;">\n          <input type="date" [min]="minDate" [max]="maxDate" [(ngModel)]="fromDate" (change)="FromDateChange($event)"/>\n          <span style="margin-top: 7px;margin-right:10px;margin-left:10px;">to</span>\n          <input type="date" [min]="minDate" [max]="maxDate" [(ngModel)]="toDate" (change)="ToDateChange($event)"/>\n          <img style="width: 15px;height: 15px;margin-top: 7px;margin-left: 10px;" src="assets/imgs/search.png" (click)="customDateClick()">\n        </div>\n      </ion-col>\n    </ion-row>\n    <!-- Main info -->\n    <ion-row style="margin-top: 12px;">\n      <ion-col col-4 style="font-size: 18px;">Realization</ion-col>\n      <ion-col col-2 style="color:#294785;font-size: 18px;">{{RealizationData.RealizationPerc}}%</ion-col>\n      <ion-col col-1>\n        <img src="assets/imgs/decrease.png" *ngIf="RealizationData.RealizationDiff < 0"  style="width:8px;float:inline-end;margin-top: 0.7vh;">\n        <img src="assets/imgs/increase.png" *ngIf="RealizationData.RealizationDiff > 0"  style="width:12px;float:inline-end;margin-top: 0.7vh;">\n        </ion-col>\n      <ion-col col-1\n        style="color:#e33239;font-size: 13px;font-weight: bold;margin-top: 4px;">{{RealizationData.RealizationDiff}}%</ion-col>\n    </ion-row>\n    <ion-row style="margin-top: 10px;margin-right: 5vh;font-weight: 500;">\n      <ion-col col-2\n        style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">YTD</ion-col>\n      <ion-col col-2\n        style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">LM</ion-col>\n      <ion-col col-2\n        style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">MTD</ion-col>\n      <ion-col col-3 style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">Last 7\n        Days</ion-col>\n      <ion-col col-3 style="font-size: 12px;color:#808080;text-align: center;">Last Day\n        <span style="font-size: 10px !important;\n        font-weight: 400;">({{today}})</span>\n      </ion-col>\n    </ion-row>\n    <ion-row  style="margin-right: 5vh;">\n      <ion-col col-2\n        style="font-size: 14px;color:#294785; border-right: 1px solid #808080;text-align: center;">{{RealizationData.YTD}}%</ion-col>\n      <ion-col col-2\n        style="font-size: 14px;color:#294785;border-right: 1px solid #808080;text-align: center;">{{RealizationData.LM}}%</ion-col>\n      <ion-col col-2\n        style="font-size: 14px;color:#294785;border-right: 1px solid #808080;text-align: center;">{{RealizationData.MTD}}%</ion-col>\n      <ion-col col-3\n        style="font-size: 14px;color:#294785;border-right: 1px solid #808080;text-align: center;">{{RealizationData.Last7Days}}%</ion-col>\n      <ion-col col-3\n        style="font-size: 14px;color:#294785;text-align: center;">{{RealizationData.LastDay}}%</ion-col>\n    </ion-row>\n    <!-- JC -->\n    <!-- <ion-row style="margin-top: 15px;">\n      <ion-col col-4 style="font-size: 12px;color:#808080;">Total Closed JC</ion-col>\n      <ion-col style="font-size: 14px;color:#294785;font-weight: bold;">{{ud.ClosedJC}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-4 style="font-size: 12px;color:#808080;">Total Hours Billed</ion-col>\n      <ion-col style="font-size: 14px;color:#294785;font-weight: bold;">{{ud.HoursBilled}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-4 style="font-size: 12px;color:#808080;">Total Hours Worked</ion-col>\n      <ion-col style="font-size: 14px;color:#294785;font-weight: bold;">{{ud.Hoursworked}}</ion-col>\n    </ion-row> -->\n    <ion-row>\n      <ion-col col-4\n        style="text-align: center;padding-right:10px;padding-top:20px;color:#294785;font-size: 16px;">\n        {{RealizationData.InvoicedJCS}}\n      </ion-col>\n      <ion-col col-4\n        style="text-align: center;padding-top:20px;padding-right:10px;color:#294785;font-size: 16px;">\n        {{RealizationData.BilledHours}}\n      </ion-col>\n      <ion-col col-4\n      style="text-align: center;padding-left:10px;padding-top:20px;color:#294785;font-size: 16px;">\n      {{RealizationData.WorkedHours}}\n    </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-right: 10px;">\n        Invoiced JCs\n      </ion-col>\n      <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-right: 10px;">\n        Billed Hours\n      </ion-col>\n      <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-left: 10px;">\n        Worked Hours\n      </ion-col>\n    </ion-row>\n    <ion-row style="text-align: center;margin-top: 10px;">\n      <ion-card>\n        <ion-grid>\n          <ion-row style="padding:12px">\n            <ion-col col-3 style="border-right: 1px solid #808080">\n              <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{RealizationData.Lessthan25}}</div>\n              <label style="background: red;\n              padding-right: 5px;\n              padding-left: 5px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">0-25%</label>\n            </ion-col>\n            <ion-col col-3 style="border-right: 1px solid #808080">\n              <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{RealizationData.Between26to50}}</div>\n              <label style="background: orange;\n              padding-right: 5px;\n              padding-left: 5px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">26-50%</label>\n            </ion-col>\n            <ion-col col-3 style="border-right: 1px solid #808080">\n              <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{RealizationData.Between51to75}}</div>\n              <label style="background: yellow;\n              padding-right: 5px;\n              padding-left: 5px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">51-75%</label>\n            </ion-col>\n            <ion-col col-3>\n              <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{RealizationData.Morethan75}}</div>\n              <label style="background: green;\n              padding-right: 8px;\n              padding-left: 8px;\n              font-size: 12px;\n              font-weight: 500;\n              color:#fff;\n              border-radius: 5px;">>75%</label>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </ion-row>\n    <hr>\n    <!-- List -->\n    <ion-row>\n      <ion-card *ngFor="let rl of RealizationList;let i=index"\n      [ngClass]="{Clsred: rl.Ageing ==3,Clsgreen: rl.Ageing ==1,Clsyellow: (rl.Ageing == 2)}"\n        style="margin:0;border-radius: 5px;margin-left:0;width:100%;margin-bottom:14px;">\n        <ion-grid>\n          <ion-row>\n            <ion-col col-4 style="padding:6px;font-weight: 500;">{{rl.OrderNo}}</ion-col>\n            <ion-col col-2 style="color: #001868;padding:6px;font-weight: 500;right:4vh">|  {{rl.RealizationPerc}}%</ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/decrease.png" *ngIf="rl.RealizationDiff <0"\n                style="width:1.1vh;margin-top:1vh;">\n              <img src="assets/imgs/increase.png" *ngIf="rl.RealizationDiff > 0"\n                style="width:12px;margin-top:1vh;">\n            </ion-col>\n            <ion-col col-2 style="color:#e33239;font-size: 12px;padding:6px;font-weight: 600;right:3.4vh">\n              {{rl.RealizationDiff < 0 ? removeMinus(rl.RealizationDiff) : rl.RealizationDiff}}%</ion-col>\n            <ion-col col-3 style="font-weight: 500;text-align: end;">\n              <span [ngClass]="{ClsPms: rl.Jobtype == \'PMS\',ClsFs: rl.Jobtype == \'FS\',ClsRr: rl.Jobtype == \'RR\',ClsPdi: rl.Jobtype == \'PDI\',ClsAcc: rl.Jobtype == \'Accidental\',\n              ClsTechCamp: rl.Jobtype == \'TC\',ClsFc: rl.Jobtype == \'FC\'}" \n              style="padding:3px;padding-top:1px;padding-bottom: 0;font-size: 12px;">{{rl.Jobtype}}</span></ion-col>\n          </ion-row>\n          <ion-row style="margin-top:8px;padding:6px">\n            <ion-col col-3 style="font-size: 13px;color:#808080;font-weight: 500;">Billed Hrs</ion-col>\n            <ion-col col-4 style="font-size: 14px;color: #001868">{{rl.BilledHours}} hrs</ion-col>\n            <ion-col col-3 style="font-size: 13px;color:#808080;text-align: end;font-weight: 500">Worked Hrs</ion-col>\n            <ion-col col-2 style="font-size: 14px;;text-align: end;color: #001868">{{rl.WorkedHours}} hrs</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </ion-row>\n\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\strealization\strealization.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */]] // Provide DatePipe
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], StrealizationPage);
    return StrealizationPage;
}());

//# sourceMappingURL=strealization.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Supervisor_KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Technician_stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Technician_sependingjc_sependingjc__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Technician_styts_styts__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var WelcomePage = (function () {
    function WelcomePage(navCtrl, navParams, global) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        var that = this;
        setTimeout(function () {
            if (that.global.WelcomeNavigateType == 1) {
                that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */]);
            }
            else if (that.global.WelcomeNavigateType == 2) {
                that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__Technician_stdashboard_stdashboard__["a" /* StdashboardPage */]);
            }
            else if (that.global.WelcomeNavigateType == 3) {
                that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__Technician_styts_styts__["a" /* StytsPage */]);
            }
            else if (that.global.WelcomeNavigateType == 4) {
                that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__Technician_sependingjc_sependingjc__["a" /* SependingjcPage */], { data: that.global.PendingJCData });
            }
        }, 500);
    }
    WelcomePage.prototype.NextClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */]);
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\welcome\welcome.html"*/`<ion-content>\n\n  <img src="assets/imgs/loginbg.png" style="position: absolute;height:100%;width:100%">\n\n  <div id="DivLoginBG">\n\n    <img src="assets/imgs/EicherLogo4.png" id="ImgLoginLogo" />\n\n    <img src="assets/imgs/wplogo.png" style="width: 16%;  margin-left: 42%;margin-top: 5%;" />\n\n    <div style="text-align: center;margin-top: 15%;font-weight: 600;font-size:20px;">Welcome </div>\n\n    <div style="text-align: center;font-weight: 600;font-size: 16px;"> {{this.global.UserDetails[0].Name}} <sub style="font-weight:400;">({{this.global.UserDetails[0].BranchCode}})</sub></div>\n\n    <h6 style="text-align: center;font-size: 12px;">You have logged into last on {{this.global.UserDetails[0].LastLoginDate | date:"dd MMM yyyy"}} at {{this.global.UserDetails[0].LastLoginDate | date:"h:mm a"}}</h6>\n\n    <img src="assets/imgs/right.png" class="center" (click)="NextClick()">\n\n  </div>\n\n</ion-content>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\welcome\welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SependingjcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__styts_styts__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SependingjcPage = (function () {
    function SependingjcPage(navCtrl, navParams, global, httpClient, menuCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.menuCtrl = menuCtrl;
        this.JCList = [];
        this.PauseReason = "";
        this.global.HeaderTitle = "Pending Job Card";
        this.JCList = this.navParams.get("data");
        console.log(this.JCList);
        this.JCList[0].StatusName = this.global.MasterData.JobCardStatus.find(function (s) { return s.JobCardStatus_IC == _this.JCList[0].Status; }).Status;
    }
    SependingjcPage.prototype.SubmitClick = function () {
        var _this = this;
        var jcDetails = {
            TechnicianID: this.global.UserDetails[0].Employee_IC,
            JobCardHeader_IC: this.JCList[0].JobCardHeader_IC,
            PauseDatetime: this.PauseTime.toString(),
            Reason: this.PauseReason,
            JobCardProgressDetailer_IC: this.JCList[0].JobCardProgressDetailer_IC
        };
        console.log(jcDetails);
        var d1, d2;
        if (this.PauseTime == undefined) {
            this.global.ToastShow("Please enter Pause time");
        }
        else {
            d1 = new Date(this.JCList[0].JobCardProgressResumeDatetime);
            d2 = new Date(this.JCList[0].JobCardProgressResumeDatetime);
            d2.setHours(this.PauseTime.split(":")[0]);
            d2.setMinutes(this.PauseTime.split(":")[1]);
            if (d2 > d1) {
                if (this.PauseReason != "") {
                    if (this.global.CheckInternetConnection()) {
                        this.httpClient.post(this.global.HostedPath + "UpdateTechnicianPendingJC", jcDetails).subscribe(function (jobCards) {
                            if (jobCards.StatusCode == 200) {
                                _this.global.ToastShow("Updated Successfully, you can continue working now");
                                _this.httpClient.get(_this.global.HostedPath + "GetTechDashboardCounts?Technician_ID=" + _this.global.UserDetails[0].Employee_IC + "&Type=1" + "&FromeDate=02/14/2024&ToDate=03/14/2024").subscribe(function (jobCards) {
                                    console.log(jobCards);
                                    if (jobCards.StatusCode == 200) {
                                        if (JSON.parse(jobCards.Output)[0].YTS > 0) {
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__styts_styts__["a" /* StytsPage */]);
                                        }
                                        else {
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__stdashboard_stdashboard__["a" /* StdashboardPage */]);
                                        }
                                    }
                                    else {
                                        console.log(jobCards);
                                        _this.global.ToastShow("Something went wrong, Pls try again later");
                                    }
                                });
                                //this.navCtrl.setRoot(SejoblistPage);
                            }
                            else {
                                console.log(jobCards);
                                _this.global.ToastShow("Something went wrong, Pls try again later");
                            }
                        }, function (error) {
                            console.log(error);
                        });
                    }
                    else {
                        this.global.ToastShow(this.global.NetworkMessage);
                    }
                }
                else {
                    this.global.ToastShow("Please enter Resume Reason");
                }
            }
            else {
                this.global.ToastShow("Please enter greater than Previous Resume date");
            }
        }
    };
    SependingjcPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sependingjc',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\sependingjc\sependingjc.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content>\n\n  <ion-grid *ngFor="let item of JCList;let i = index" id="GrdActivity">\n\n    <div id="DivOrderDetails">\n\n      <ion-grid>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Branch Code</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnLableValue">{{item.BranchCode}}</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Workshop/Location Code</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnLableValue">{{item.WorkshopLocationCode}}</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Order</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnLableValue">{{item.Order}}</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Order Type</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnLableValue">{{item.OrderType}}</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Document Date</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnLableValue">{{item.DocumentDate | date:"dd-MMM-yyyy"}}</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">JC Status</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnLableValue">{{item.StatusName}}</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Last Start Date</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnLableValue">{{item.JobCardProgressResumeDatetime | date:"dd-MMM-yyyy"}}</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Last Start Time</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnLableValue">{{item.JobCardProgressResumeDatetime | date:"hh:mm a"}}</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Stop Time</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <input type="time" class="InputControls" [(ngModel)]="PauseTime" />\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnLable">Pause Reason</span>\n          </ion-col>\n          <ion-col>\n            <span class="SpnColon">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <textarea id="TxtReason" [(ngModel)]="PauseReason"></textarea>\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n\n    </div>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color="themeblue">\n    <ion-grid>\n      <ion-row>\n        <ion-col col (click)="SubmitClick()">\n          <ion-title style="text-align: center;cursor: pointer;font-size: 1.5rem;">Submit</ion-title>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\sependingjc\sependingjc.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], SependingjcPage);
    return SependingjcPage;
}());

//# sourceMappingURL=sependingjc.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams, actionSheetCtrl, camera, httpClient, global) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.httpClient = httpClient;
        this.global = global;
        this.ProfileSegment = "Profile";
        this.OldPassword = "";
        this.NewPassword = "";
        this.ConfirmPassword = "";
        this.isProfilePhotoChange = false;
        this.global.HeaderTitle = this.global.UserDetails[0].Name;
    }
    ProfilePage.prototype.UpdatePasswordClick = function (OldPassword, NewPassword, ConfirmPassword) {
        var _this = this;
        if (OldPassword != "" && NewPassword != "" && ConfirmPassword != "") {
            if (OldPassword == this.global.UserDetails[0].Password) {
                if (NewPassword == ConfirmPassword) {
                    if (OldPassword != NewPassword) {
                        //if (this.global.IsValid("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", NewPassword)) {
                        if (this.global.IsValid(NewPassword)) {
                            if (this.global.CheckInternetConnection()) {
                                this.global.LoadingShow("Please wait...");
                                this.httpClient.post(this.global.HostedPath + "UpdatePassword?Username=" + this.global.UserDetails[0].Username + "&NewPassword=" + ConfirmPassword, {}).subscribe(function (loginDetails) {
                                    _this.global.LoadingHide();
                                    if (loginDetails.StatusCode == 200) {
                                        _this.global.ToastShow("Password Updated Successfully, Please login again with new Password");
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                                        localStorage.clear();
                                    }
                                    else {
                                        console.log(loginDetails);
                                        _this.global.ToastShow("Something went wrong, Pls try again later");
                                        _this.global.LoadingHide();
                                    }
                                }, function (error) {
                                    console.log(error);
                                    _this.global.LoadingHide();
                                });
                            }
                            else {
                                this.global.ToastShow(this.global.NetworkMessage);
                            }
                        }
                        else {
                            //this.global.ToastShow("Password must contain atleast 8 characters, one special character, one numberic and one capital letter");
                        }
                    }
                    else {
                        this.global.ToastShow("New password can not be old password");
                    }
                }
                else {
                    this.global.ToastShow("New Password and Confirm Password is not matching");
                }
            }
            else {
                this.global.ToastShow("Old Password is not matching");
            }
        }
        else {
            this.global.ToastShow("Please enter all the fields");
        }
    };
    ProfilePage.prototype.ProfilePhotoClick = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Add Photo',
            buttons: [
                {
                    text: 'Capture Photo',
                    handler: function () {
                        _this.isProfilePhotoChange = true;
                        _this.CameraClick(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        _this.isProfilePhotoChange = true;
                        _this.CameraClick(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Cancel',
                    role: "cancel",
                    handler: function () {
                    }
                },
            ]
        });
        actionSheet.present();
    };
    ProfilePage.prototype.CameraClick = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: sourceType
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.LastProfilePhoto = _this.dataURItoBlob("data:image/jpeg;base64," + imageData);
            _this.global.UserDetails[0].ProfilePhotoPath = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            _this.isProfilePhotoChange = false;
            _this.global.ToastShow(err);
        });
    };
    ProfilePage.prototype.ProfilePhototUpdateClick = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("Photo", this.LastProfilePhoto);
        this.httpClient.post(this.global.HostedPath + 'UploadFile?EmpCode=' + this.global.UserDetails[0].Code, formData).subscribe(function (imageUploadData) {
            console.log(imageUploadData);
            _this.global.ToastShow("Your profile phtot updated successfully");
        }, function (error) {
            console.log(error);
            _this.global.ToastShow("Failed to-upload attachments");
        });
    };
    ProfilePage.prototype.dataURItoBlob = function (dataURI) {
        // alert(dataURI);
        // alert(dataURI.split(',')[1]);
        var byteString = atob(dataURI.split(',')[1]);
        //  alert(byteString);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // alert(mimeString)
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var bb = new Blob([ab], { "type": mimeString });
        return bb;
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\profile\profile.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content>\n\n  <div>\n    <ion-segment [(ngModel)]="ProfileSegment">\n      <ion-segment-button value="Profile">\n        Profile\n      </ion-segment-button>\n      <ion-segment-button value="Password">\n        Password\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n\n  <div [ngSwitch]="ProfileSegment">\n\n    <ion-list *ngSwitchCase="\'Profile\'">\n\n      <ion-grid class="GrdProfile">\n        <ion-row>\n          <ion-col>\n            <div align="center" style="width: 100%;">\n              <img [src]="global.UserDetails[0].ProfilePhotoPath" id="ImgProfilePhtot" (click)="ProfilePhotoClick()" />\n            </div>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Name</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].Name}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Designation</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].Designation}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Branch Code</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].BranchCode}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Email</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].Email}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Mobile</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].Mobile}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Employee Code</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].Code}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Mobile</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].Mobile}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">PRNRID</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].PRNRID}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Last Login Date</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <span class="SpnProfileValue">{{this.global.UserDetails[0].LastLoginDate | date:\'dd-MM-yyy hh:mm a\'}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <div style="text-align: center;margin-top:5vh;" *ngIf="isProfilePhotoChange">\n        <button (click)="ProfilePhototUpdateClick()" class="BtnTechnicianAdd">UPDATE</button>\n      </div>\n\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'Password\'">\n\n      <ion-grid class="GrdProfile">\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Old Password</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <input type="text" class="TxtChangePassword" [(ngModel)]="OldPassword" />\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">New Password</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <input type="text" class="TxtChangePassword" [(ngModel)]="NewPassword" />\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5>\n            <span class="SpnProfileLable">Confirm Password</span>\n          </ion-col>\n          <ion-col col-1>\n            <span class="SpnProfileLable">:</span>\n          </ion-col>\n          <ion-col col-6>\n            <input type="text" class="TxtChangePassword" [(ngModel)]="ConfirmPassword" />\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <div style="text-align: center;margin-top:5vh;margin-bottom:2vh;">\n        <button (click)="UpdatePasswordClick(OldPassword,NewPassword,ConfirmPassword)"\n          class="BtnTechnicianAdd">UPDATE</button>\n      </div>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utilization_utilization__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__realization_realization__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__productivity_productivity__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__JCStatus_scpfalist_scpfalist__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__JCStatus_scetdelist_scetdelist__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__JCStatus_scallocatedytslist_scallocatedytslist__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__JCStatus_scwiplist_scwiplist__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__JCStatus_sconholdlist_sconholdlist__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__JCStatus_sccmptedlist_sccmptedlist__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__JCStatus_sccmptedt5plist_sccmptedt5plist__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__JCStatus_sccmptedt5dlist_sccmptedt5dlist__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__TechStatus_sctechavl_sctechavl__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__TechStatus_sctechwipl_sctechwipl__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__TechStatus_sctechyts_sctechyts__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__TechStatus_sctechpause_sctechpause__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Shared_notifications_notifications__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams, menuCtrl, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.DashboardDetails = {};
        this.SelectedFilter = "2";
        this.SelectedFilterName = "Last 7 Days";
        this.menuCtrl.enable(true);
        var date = new Date();
        var date1 = new Date();
        var d1 = new Date(date.setMonth(date.getMonth() - 6));
        this.Last6Month = d1.getFullYear() + "-" + ((d1.getMonth() + 1) > 9 ? (d1.getMonth() + 1) : ("0" + (d1.getMonth() + 1))) + "-" + ((d1.getDate() + 1) > 9 ? (d1.getDate()) : ("0" + (d1.getDate())));
        this.TodaysDate = date1.getFullYear() + "-" + ((date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : ("0" + (date1.getMonth() + 1))) + "-" + ((date1.getDate() + 1) > 9 ? (date1.getDate()) : ("0" + (date1.getDate())));
    }
    DashboardPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.global.IsManager);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            var fromDate = void 0;
            var toDate = void 0;
            if (this.SelectedFilter == "6") {
                var d1 = new Date(this.SearchFromDate);
                fromDate = d1.getFullYear() + "-" + ((d1.getMonth() + 1) > 9 ? (d1.getMonth() + 1) : ("0" + (d1.getMonth() + 1))) + "-" + ((d1.getDate() + 1) > 9 ? (d1.getDate()) : ("0" + (d1.getDate())));
                var d2 = new Date(this.SearchToDate);
                toDate = d2.getFullYear() + "-" + ((d2.getMonth() + 1) > 9 ? (d2.getMonth() + 1) : ("0" + (d2.getMonth() + 1))) + "-" + ((d2.getDate() + 1) > 9 ? (d2.getDate()) : ("0" + (d2.getDate())));
            }
            else {
                fromDate = this.TodaysDate;
                toDate = this.TodaysDate;
            }
            this.httpClient.get(this.global.HostedPath + "GetSupDashboardCounts?BranchID=" + this.global.UserDetails[0].BranchID + "&Type=" + this.SelectedFilter + "&FromeDate=" + fromDate + "&ToDate=" + toDate).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.DashboardDetails = JSON.parse(result.Output)[0];
                    _this.DashboardDetails.UtilizationPercRange = _this.DashboardDetails.UtilizationPerc / 100;
                    _this.DashboardDetails.RealizationPercRange = _this.DashboardDetails.RealizationPerc / 100;
                    _this.DashboardDetails.ProductivityPercRange = _this.DashboardDetails.ProductivityPerc / 100;
                    console.log(_this.DashboardDetails);
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    DashboardPage.prototype.JcBtnClick = function (value) {
        if (value == "Pending") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__JCStatus_scpfalist_scpfalist__["a" /* ScpfalistPage */]);
        }
        else if (value == "ETD") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__JCStatus_scetdelist_scetdelist__["a" /* ScetdelistPage */]);
        }
        else if (value == "AllocatedYTS") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__JCStatus_scallocatedytslist_scallocatedytslist__["a" /* ScallocatedytslistPage */]);
        }
        else if (value == "WIP") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__JCStatus_scwiplist_scwiplist__["a" /* ScwiplistPage */]);
        }
        else if (value == "Hold") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__JCStatus_sconholdlist_sconholdlist__["a" /* SconholdlistPage */]);
        }
        else if (value == "Completed") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_12__JCStatus_sccmptedlist_sccmptedlist__["a" /* SccmptedlistPage */]);
        }
        else if (value == "Completed T5 Pending") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_13__JCStatus_sccmptedt5plist_sccmptedt5plist__["a" /* Sccmptedt5plistPage */]);
        }
        else if (value == "Completed T5 Done") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_14__JCStatus_sccmptedt5dlist_sccmptedt5dlist__["a" /* Sccmptedt5dlistPage */]);
        }
    };
    DashboardPage.prototype.TechAVLClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_15__TechStatus_sctechavl_sctechavl__["a" /* SctechavlPage */]);
    };
    DashboardPage.prototype.TechWIPClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_16__TechStatus_sctechwipl_sctechwipl__["a" /* SctechwiplPage */]);
    };
    DashboardPage.prototype.TechYTSClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_17__TechStatus_sctechyts_sctechyts__["a" /* SctechytsPage */]);
    };
    DashboardPage.prototype.TechPAUSEClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_18__TechStatus_sctechpause_sctechpause__["a" /* SctechpausePage */]);
    };
    DashboardPage.prototype.FilterClick1 = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Duration',
            inputs: [
                {
                    type: 'radio',
                    label: 'YTD',
                    value: "5",
                    checked: (this.SelectedFilter == "5") ? true : false
                },
                {
                    type: 'radio',
                    label: 'LM',
                    value: "4",
                    checked: (this.SelectedFilter == "4") ? true : false
                },
                {
                    type: 'radio',
                    label: 'MTD',
                    value: "3",
                    checked: (this.SelectedFilter == "3") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Last 7 Days',
                    value: "2",
                    checked: (this.SelectedFilter == "2") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Last Day',
                    value: "1",
                    checked: (this.SelectedFilter == "1") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Date Range',
                    value: "6",
                    checked: (this.SelectedFilter == "6") ? true : false
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.SelectedFilter = data;
                        switch (data) {
                            case "1":
                                _this.SelectedFilterName = "Last Day";
                                break;
                            case "2":
                                _this.SelectedFilterName = "Last 7 Days";
                                break;
                            case "3":
                                _this.SelectedFilterName = "MTD";
                                break;
                            case "4":
                                _this.SelectedFilterName = "LM";
                                break;
                            case "5":
                                _this.SelectedFilterName = "YTD";
                                break;
                            case "6":
                                _this.SelectedFilterName = "Date Range";
                                break;
                            default:
                                _this.SelectedFilterName = "Last 7 Days";
                                break;
                        }
                        if (_this.SelectedFilter != "6") {
                            _this.ngOnInit();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    DashboardPage.prototype.FilterClick = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select filter option',
            buttons: [
                {
                    text: 'Last Day',
                    handler: function () {
                        _this.SelectedFilter = "1";
                        _this.SelectedFilterName = "Last Day";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'Last 7 Days',
                    handler: function () {
                        _this.SelectedFilter = "2";
                        _this.SelectedFilterName = "Last 7 Days";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'MTD',
                    handler: function () {
                        _this.SelectedFilter = "3";
                        _this.SelectedFilterName = "MTD";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'LM',
                    handler: function () {
                        _this.SelectedFilter = "4";
                        _this.SelectedFilterName = "LM";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'YTD',
                    handler: function () {
                        _this.SelectedFilter = "5";
                        _this.SelectedFilterName = "YTD";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'Date Range',
                    handler: function () {
                        _this.SelectedFilter = "6";
                        _this.SelectedFilterName = "Date Range";
                    }
                }
            ],
            enableBackdropDismiss: true
        });
        actionSheet.present();
    };
    DashboardPage.prototype.RemoveFilteredata = function (data) {
        console.log(data);
        //this.FilterList.splice(data, 1);
    };
    DashboardPage.prototype.UtilizationClick = function (e) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__utilization_utilization__["a" /* UtilizationPage */]);
    };
    DashboardPage.prototype.RealizationClick = function (e) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__realization_realization__["a" /* RealizationPage */]);
    };
    DashboardPage.prototype.ProductivityClick = function (e) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__productivity_productivity__["a" /* ProductivityPage */]);
    };
    DashboardPage.prototype.SearchClick = function () {
        if (this.SearchFromDate != undefined && this.SearchFromDate != null && this.SearchFromDate != ""
            && this.SearchToDate != undefined && this.SearchToDate != null && this.SearchToDate != "") {
            this.ngOnInit();
        }
        else {
            this.global.ToastShow("Please enter From date and To date");
        }
    };
    DashboardPage.prototype.NotificationClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_19__Shared_notifications_notifications__["a" /* NotificationsPage */]);
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\dashboard\dashboard.html"*/`<ion-header id="DivHeaderSup">\n  <ion-navbar color="themered">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-1 style="display: flex;">\n          <img src="assets/imgs/menus.png" id="IconMenu" menuToggle>\n        </ion-col>\n        <ion-col col-10 style="display: flex;">\n          <ion-title>Welcome {{global.UserDetails[0].Name}}</ion-title>\n        </ion-col>\n        <ion-col col-1 style="display: flex;" (click)="NotificationClick()">\n          <img src="assets/imgs/bell.png" id="IconMenu" style="width:25px">\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-1></ion-col>\n        <ion-col col-11 style="margin-top: -10px;color:#fff;left:12px">\n          <sub class="SpnSub">{{global.UserDetails[0].Designation}}</sub>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-grid>\n    <ion-row style="padding: 10px;">\n      <ion-col col-2>\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh" (click)="FilterClick()">\n      </ion-col>\n      <ion-col style="display: flex;width:auto">\n        <div class="DivFilterLable">\n          {{SelectedFilterName}}\n          <!-- <span style="margin-left:8px;" (click)="RemoveFilteredata(i)">x</span> -->\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf="SelectedFilter==6">\n      <ion-col col-5 style="display: flex;">\n        <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchFromDate"\n          style="margin: auto;">\n      </ion-col>\n      <ion-col col-5 style="display: flex;">\n        <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchToDate"\n          style="margin: auto;">\n      </ion-col>\n      <ion-col col-2 style="display: flex;">\n        <ion-icon ios="ios-search" md="md-search" style="margin: auto;font-size: 2em;cursor: pointer;"\n          (click)="SearchClick()"></ion-icon>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!-- OverallJC status -->\n  <ion-card class="ClsCard" (click)="UtilizationClick()">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-2>\n          <img src="assets/imgs/Uti.png" style="width:40px;margin-bottom: 5px;">\n        </ion-col>\n        <ion-col col-8>\n          Utilization <span style="color:#000;font-weight: 600;">{{DashboardDetails.UtilizationPerc}}%</span>\n        </ion-col>\n        <ion-col col-1>\n          <img src="assets/imgs/decrease.png" *ngIf="DashboardDetails.UtilizationDiff<0"\n            style="width:8px;float:inline-end;margin-top: 0.4vh;height: 12px;">\n          <img src="assets/imgs/increase.png" *ngIf="DashboardDetails.UtilizationDiff>0"\n            style="width:12px;float:inline-end;margin-top: 0.4vh;">\n        </ion-col>\n        <ion-col col-1>\n          <span [style.color]="(DashboardDetails.UtilizationDiff<0)?\'red\':\'green\'">{{DashboardDetails.UtilizationDiff}}\n          </span>\n        </ion-col>\n      </ion-row>\n      <ion-row style="margin-top:-3vh">\n        <ion-col col-2></ion-col>\n        <ion-col>\n          <meter id="MeaterUtilization" value="{{DashboardDetails.UtilizationPercRange}}"></meter>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n  <ion-card class="ClsCard" (click)="RealizationClick()">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-2>\n          <img src="assets/imgs/Real.png" style="width:40px;margin-bottom: 5px;">\n        </ion-col>\n        <ion-col col-8>\n          Realization <span style="color:#000;font-weight: 600;">{{DashboardDetails.RealizationPerc}}%</span>\n        </ion-col>\n        <ion-col col-1>\n          <img src="assets/imgs/decrease.png" *ngIf="DashboardDetails.RealizationDiff<0"\n            style="width:8px;float:inline-end;margin-top: 0.4vh;height: 12px">\n          <img src="assets/imgs/increase.png" *ngIf="DashboardDetails.RealizationDiff>0"\n            style="width:12px;float:inline-end;margin-top: 0.4vh;">\n        </ion-col>\n        <ion-col col-1>\n          <span\n            [style.color]="(DashboardDetails.RealizationDiff<0)?\'red\':\'green\'">{{DashboardDetails.RealizationDiff}}</span>\n        </ion-col>\n      </ion-row>\n      <ion-row style="margin-top:-3vh">\n        <ion-col col-2></ion-col>\n        <ion-col>\n          <meter id="MeaterRealization" value="{{DashboardDetails.RealizationPercRange}}"></meter>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n  <ion-card class="ClsCard" (click)="ProductivityClick()" *ngIf="global.IsManager">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-2>\n          <img src="assets/imgs/Prod.png" style="width:40px;margin-bottom: 5px;">\n        </ion-col>\n        <ion-col col-8>\n          Productivity <span style="color:#000;font-weight: 600;">{{DashboardDetails.ProductivityPerc}}%</span>\n        </ion-col>\n        <ion-col col-1>\n          <img src="assets/imgs/decrease.png" *ngIf="DashboardDetails.ProductivityDiff<0"\n            style="width:8px;float:inline-end;margin-top: 0.4vh;height: 12px">\n          <img src="assets/imgs/increase.png" *ngIf="DashboardDetails.ProductivityDiff>0"\n            style="width:12px;float:inline-end;margin-top: 0.4vh;">\n        </ion-col>\n        <ion-col col-1>\n          <span\n            [style.color]="(DashboardDetails.ProductivityDiff<0)?\'red\':\'green\'">{{DashboardDetails.ProductivityDiff}}</span>\n        </ion-col>\n      </ion-row>\n      <ion-row style="margin-top:-3vh">\n        <ion-col col-2></ion-col>\n        <ion-col>\n          <meter id="MeaterProductivity" value="{{DashboardDetails.ProductivityPercRange}}"></meter>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n  <!--Technician Dashboard -->\n  <ion-card style="border-radius: 5px;" *ngIf="!global.IsManager">\n    <ion-card-content style="padding: 10px 5px;">\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <h6 class="SpnDashboardLable">Technician Dashboard </h6>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-3 style="display: flex;">\n            <ion-card class="CardTechDashboard" style="background: #DFF2CB" (click)="TechAVLClick()">\n              <div class="SpnTechStatus">AVL</div>\n              <div class="SpnTechCount">\n                {{DashboardDetails.TechAvl}}\n              </div>\n            </ion-card>\n          </ion-col>\n          <ion-col col-3 style="display: flex;">\n            <ion-card class="CardTechDashboard" style="background: #FEEEB3" (click)="TechWIPClick()">\n              <div class="SpnTechStatus">WIP</div>\n              <div class="SpnTechCount">\n                {{DashboardDetails.TechWIP}}\n              </div>\n            </ion-card>\n          </ion-col>\n          <ion-col col-3 style="display: flex;">\n            <ion-card class="CardTechDashboard" style="background: #B3E8FD" (click)="TechYTSClick()">\n              <div class="SpnTechStatus">YTS</div>\n              <div class="SpnTechCount">\n                {{DashboardDetails.TechYTS}}\n              </div>\n            </ion-card>\n          </ion-col>\n          <ion-col col-3 style="display: flex;">\n            <ion-card class="CardTechDashboard" style="background: #FCB4B4" (click)="TechPAUSEClick()">\n              <div class="SpnTechStatus">PAUSE</div>\n              <div class="SpnTechCount">\n                {{DashboardDetails.TechPAUSE}}\n              </div>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n  <!-- JC Status -->\n  <ion-card class="ClsCard">\n\n    <h6 class="SpnDashboardLable">Job Card Status {{DashboardDetails.TotalJobs}}</h6>\n\n    <ion-grid style="text-align: center;">\n\n      <ion-row>\n\n        <ion-col col-6 (click)="JcBtnClick(\'Pending\')">\n          <div class="DivJCStatus" style="background: #e7eaf0;">\n            <span class="Spndots" *ngIf="DashboardDetails.IsPFACntExceed"></span>\n            <span class="ClsJcspan">{{DashboardDetails.PFA}}</span>\n            <span class="SpnJCStatusLable">Pending for Allocation</span>\n          </div>\n        </ion-col>\n\n        <ion-col col-6 (click)="JcBtnClick(\'ETD\')">\n          <div class="DivJCStatus" style="background: #feeeb3;">\n            <span class="Spndots" *ngIf="DashboardDetails.IsETDExcCntExceed"></span>\n            <span class="ClsJcspan">{{DashboardDetails.ETDExceeded}}</span>\n            <span class="SpnJCStatusLable">ETD Exceeded</span>\n          </div>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row style="margin-top: 3%;">\n\n        <ion-col col-4 (click)="JcBtnClick(\'AllocatedYTS\')">\n          <div class="DivJCStatus" style="background: #B3E8FD;">\n            <span class="Spndots" *ngIf="DashboardDetails.IsAllocatedCntExceed"></span>\n            <span class="ClsJcspan">{{DashboardDetails.AllocatedYTS}}</span>\n            <span class="SpnJCStatusLable">Allocated YTS</span>\n          </div>\n        </ion-col>\n\n        <ion-col col-4 (click)="JcBtnClick(\'WIP\')">\n          <div class="DivJCStatus" style="background: #FFF5D7;">\n            <span class="ClsJcspan">{{DashboardDetails.WIP}}</span>\n            <span class="SpnJCStatusLable">Work in Progress</span>\n          </div>\n        </ion-col>\n\n        <ion-col col-4 (click)="JcBtnClick(\'Hold\')">\n          <div class="DivJCStatus" style="background: #FCB4B4;">\n            <span class="Spndots" *ngIf="DashboardDetails.IsHoldCntExceed"></span>\n            <span class="ClsJcspan">{{DashboardDetails.OnHold}}</span>\n            <span class="SpnJCStatusLable">On Hold</span>\n          </div>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row style="margin-top: 3%;">\n\n        <ion-col col-4 (click)="JcBtnClick(\'Completed\')">\n          <div class="DivJCStatus" style="background: #DFF2CB;">\n            <span class="ClsJcspan">{{DashboardDetails.Completed}}</span>\n            <span class="SpnJCStatusLable">Completed</span>\n          </div>\n        </ion-col>\n\n        <ion-col col-4 (click)="JcBtnClick(\'Completed T5 Pending\')">\n          <div class="DivJCStatus" style="background: #E6CCE6;">\n            <span class="ClsJcspan">{{DashboardDetails.CompletedT5Pend}}</span>\n            <span class="SpnJCStatusLable">Completed T5 Pending</span>\n          </div>\n        </ion-col>\n\n        <ion-col col-4 (click)="JcBtnClick(\'Completed T5 Done\')">\n          <div class="DivJCStatus" style="background: #99CC99;">\n            <span class="ClsJcspan">{{DashboardDetails.CompletedT5Done}}</span>\n            <span class="SpnJCStatusLable">Completed T5 Done</span>\n          </div>\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n</ion-content>\n\n<ion-footer>\n  <page-footer>\n  </page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\dashboard\dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StdashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Technician_styts_styts__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Technician_stwip_stwip__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Technician_stpaused_stpaused__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Technician_stcompleted_stcompleted__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__strealization_strealization__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chart_js__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Shared_notifications_notifications__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var StdashboardPage = (function () {
    function StdashboardPage(navCtrl, navParams, menuCtrl, httpClient, global, actionSheetCtrl, alertCtrl, datePipe, actionsheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.datePipe = datePipe;
        this.actionsheetCtrl = actionsheetCtrl;
        this.DashboardCount = {};
        this.TechnicianDashboard = [];
        this.WorkStatus = [];
        this.OverallJobcard = {};
        this.Filterdata = "Last 7 days";
        this.filtervalue = true;
        this.Graphdata = [];
        this.selectedtype = 2;
        this.daterange = false;
        this.fromDate = '01/21/2024';
        this.toDate = '03/21/2024';
        // this.global.HeaderTitle = "Dashboard";
        this.menuCtrl.enable(true);
        var currentDate = new Date();
        this.maxDate = currentDate.toISOString().substring(0, 10); //YYYY-MM-DD
        var sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
        this.minDate = sixMonthsAgo.toISOString().substring(0, 10); //YYYY-MM-DD
        this.initGoogleCharts();
    }
    StdashboardPage.prototype.ionViewDidEnter = function () {
        this.createHalfPieChart();
    };
    StdashboardPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            console.log(this.global.UserDetails);
            this.global.LoadingShow("Please wait...");
            //filter
            this.CallFilterData();
            //Graph
            this.httpClient.get(this.global.HostedPath + "GetTechDashboardGraphCount?Technician_ID=" + this.global.UserDetails[0].Employee_IC + "&Type=1" + "&FromeDate=02/14/2024&ToDate=03/14/2024").subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.Graphdata = JSON.parse(jobCards.Output);
                    console.log(_this.Graphdata);
                    //charts
                    google.charts.setOnLoadCallback(_this.drawLineChart());
                    google.charts.setOnLoadCallback(_this.drawColumnChart());
                    // google.charts.setOnLoadCallback(this.drawDonutChart());
                    _this.createHalfPieChart();
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
            this.global.LoadingHide();
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
        this.TechnicianDashboard = [
            {
                'name': "AVL",
                'count': "4",
                'bgcolor': "assets/imgs/AVL.png"
            },
            {
                'name': "WIP",
                'count': "999",
                'bgcolor': "assets/imgs/WIP.png"
            },
            {
                'name': "YTS",
                'count': "12",
                'bgcolor': "assets/imgs/YTS.png"
            },
            {
                'name': "PAUSE",
                'count': "8",
                'bgcolor': "assets/imgs/HOLD.png"
            }
        ];
    };
    StdashboardPage.prototype.CallFilterData = function () {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetTechDashboardCounts?Technician_ID=" + this.global.UserDetails[0].Employee_IC + "&Type=" + this.selectedtype + "&FromeDate=" + this.fromDate + "&ToDate=" + this.toDate).subscribe(function (jobCards) {
            if (jobCards.StatusCode == 200) {
                _this.DashboardCount = JSON.parse(jobCards.Output)[0];
                _this.DashboardCount.RealizationPercValue = _this.DashboardCount.RealizationPerc / 100;
                console.log(_this.DashboardCount);
                _this.WorkStatus = [
                    {
                        "status": "Yet to Start",
                        "count": _this.DashboardCount.YTS,
                        'bgcolor': "#feeeb3",
                        'icon': "assets/imgs/YTSIcon.png"
                    },
                    {
                        "status": "In Progress",
                        "count": _this.DashboardCount.WIP,
                        'bgcolor': "#B3E8FD",
                        'icon': "assets/imgs/InProgressIcon.png"
                    },
                    {
                        "status": "Paused",
                        "count": _this.DashboardCount.Paused,
                        'bgcolor': "#FCB4B4",
                        'icon': "assets/imgs/PauseIcon.png"
                    },
                    {
                        "status": "Completed",
                        "count": _this.DashboardCount.Completed,
                        'bgcolor': "#DFF2CB",
                        'icon': "assets/imgs/CompletedIcon.png"
                    },
                ];
                _this.jchrs = _this.DashboardCount.JCHours;
                _this.nonjchrs = _this.DashboardCount.NonJCHours;
            }
            else {
                console.log(jobCards);
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
        }, function (error) {
            console.log(error);
            _this.global.LoadingHide();
        });
    };
    StdashboardPage.prototype.drawChart = function () {
        console.log(this.DashboardCount);
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Status');
        data.addColumn('number', 'Count');
        data.addRows([
            ['Pending For Allocation (T2)', this.DashboardCount.T2PFA],
            ['Allocation', this.DashboardCount.Allocated],
            ['WIP', this.DashboardCount.WIP],
            ['Hold', this.DashboardCount.Hold],
            ['Completed', this.DashboardCount.Completed],
            ['ETD Exceed', this.DashboardCount.PCDExceed],
        ]);
        // Set chart options
        var options = {
            //  'width':400,
            //  'height':300,
            'pieStartAngle': 90,
            'pieEndAngle': 270,
            //  'pieHole': 0.2,
            'pieSliceBorderColor': 'transparent',
            'pieSliceText': 'value',
            'pieSliceTextStyle': {
                color: '#214a8d',
                fontSize: 12,
                bold: true // Set the text to bold (optional)
            },
            slices: {
                0: { color: '#d5dbe4' },
                1: { color: '#7fd8f6' },
                2: { color: '#fff2cd' },
                3: { color: '#fd7f7f' },
                4: { color: '#a8da72' },
                5: { color: '#ffd968' },
            },
        };
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        // chart.draw(data);
        google.visualization.events.addListener(chart, 'select', function () {
            var selectedItem = chart.getSelection()[0];
            // if (selectedItem) {
            //   var value = data.getValue(selectedItem.row, 0); // Assuming the value is in the second column (index 1)
            //   console.log('Clicked value:', value);
            //   if(value=="Pending For Allocation (T2"){
            //     this.navCtrl.setRoot(ScpfalistPage);
            //   }
            //   else if(value=="Allocation"){
            //     this.navCtrl.setRoot('ScallocatedlistPage');
            //   }
            //   else if(value=="WIP"){
            //     this.navCtrl.setRoot(SciplistPage);
            //   }
            //   else if(value=="Hold"){
            //     this.navCtrl.setRoot(ScholdlistPage);
            //   }
            //   else if(value=="Completed"){
            //     this.navCtrl.setRoot('SccompletedlistPage');
            //   }
            //   else if(value=="ETD Exceed"){
            //     this.navCtrl.setRoot(ScpcdelistPage);
            //   }
            // }
        });
    };
    StdashboardPage.prototype.initGoogleCharts = function () {
        var _this = this;
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(this.drawColumnChart.bind(this));
        // Add event listener to handle window resize
        window.addEventListener('resize', function () {
            _this.drawColumnChart();
            _this.drawLineChart();
        });
    };
    StdashboardPage.prototype.drawLineChart = function () {
        var _this = this;
        // Calculate chart width and height dynamically
        var chartWidth = window.innerWidth * 1.1; // 110% of window width
        var chartHeight = window.innerHeight * 0.4; // 50% of window height
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Realization');
        data.addColumn({ type: 'string', role: 'annotation' });
        // var LineChartData = [
        //   ['05.02.24-11.02.24', 45, '45%'],
        //   ['12.02.24-18.02.24', 105, '105%'],
        //   ['19.02.24-25.02.24', 75, '75%'],
        //   ['25.02.24-28.02.24', 0, '0%']
        // ];
        console.log(this.Graphdata);
        var LineChartData = [];
        // this.Graphdata.forEach(ele => {
        //   LineChartData.push([this.datePipe.transform(ele.FromDate, 'yy.MM.dd') + '-' + this.datePipe.transform(ele.ToDate, 'yy.MM.dd'),
        //   ele.RealizationPerc, ele.RealizationPerc + '%'])
        // });
        // console.log(LineChartData)
        this.Graphdata.forEach(function (ele) {
            // Combine dates into a single string
            var combinedDate = _this.datePipe.transform(ele.FromDate, 'yy.MM.dd') +
                ' - ' + _this.datePipe.transform(ele.ToDate, 'yy.MM.dd');
            LineChartData.push([combinedDate, ele.RealizationPerc, ele.RealizationPerc + '%']);
            // LineChartData.push([this.datePipe.transform(ele.FromDate, 'yy.MM.dd') + '-' + this.datePipe.transform(ele.ToDate, 'yy.MM.dd'),
            // ele.RealizationPerc, ele.RealizationPerc + '%'])
        });
        data.addRows(LineChartData);
        var options = {
            title: 'My Activity',
            titleTextStyle: {
                fontSize: 18
            },
            curveType: 'function',
            'width': chartWidth,
            'height': chartHeight,
            'legend': 'none',
            pointSize: 5,
            pointColor: 'black',
            series: {
                0: {
                    color: '#3E3E3E',
                    lineWidth: 2
                },
                1: {
                    color: 'black',
                    lineWidth: 0,
                }
            },
            annotations: {
                textStyle: {
                    fontSize: 12,
                    color: '#3E3E3E',
                    bold: true
                },
                stem: {
                    length: 10,
                    color: '#ffffff'
                },
                annotationTextPosition: 'auto'
            },
            vAxis: {
                title: "% Realization",
                titleTextStyle: {
                    bold: true,
                    fontSize: 11,
                    italic: false
                },
                gridlines: {
                    color: 'transparent'
                },
                textPosition: 'none'
            },
            hAxis: {
                textStyle: {
                    bold: true,
                    color: '#3E3E3E',
                }
            }
        };
        var chart = new google.visualization.LineChart(document.getElementById('linechart_div'));
        chart.draw(data, options);
    };
    StdashboardPage.prototype.drawColumnChart = function () {
        var _this = this;
        // Calculate chart width and height dynamically
        var chartWidth = window.innerWidth * 1.1; // 110% of window width
        var chartHeight = window.innerHeight * 0.4; // 50% of window height
        // var data = google.visualization.arrayToDataTable([
        //   ['Date', 'Worked', { role: 'style' },{ role: 'annotation' }, 'Billed', { role: 'style' },{ role: 'annotation' }], // Define column headings
        //   ['05.02.24-11.02.24', 45,  'color: #294785;', 45, 30, 'color: #e33239',30],
        //   ['12.02.24-18.02.24', 85,  'color: #294785;', 85, 75, 'color: #e33239',75],
        //   ['19.02.24-25.02.24', 75,  'color: #294785;', 75, 42, 'color: #e33239',42],
        //   ['25.02.24-28.02.24', 38,  'color: #294785;', 38, 22, 'color: #e33239',22]
        // ]);
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Worked');
        data.addColumn({ type: 'string', role: 'style' });
        data.addColumn({ type: 'number', role: 'annotation' });
        data.addColumn('number', 'Billed');
        data.addColumn({ type: 'string', role: 'style' });
        data.addColumn({ type: 'number', role: 'annotation' });
        // Inserting data dynamically
        // var ColumnChartData = [
        //   ['05.02.24-11.02.24', 45, 'color: #294785;', 45, 30, 'color: #e33239', 30],
        //   ['12.02.24-18.02.24', 85, 'color: #294785;', 85, 75, 'color: #e33239', 75],
        //   ['19.02.24-25.02.24', 75, 'color: #294785;', 75, 42, 'color: #e33239', 42],
        //   ['25.02.24-28.02.24', 38, 'color: #294785;', 38, 22, 'color: #e33239', 22]
        // ];
        // console.log(ColumnChartData)
        var ColumnChartData = [];
        // this.Graphdata.forEach(ele => {
        //   ColumnChartData.push([this.datePipe.transform(ele.FromDate, 'yy.MM.dd') + '-' + this.datePipe.transform(ele.ToDate, 'yy.MM.dd'),
        //   ele.WorkedHours, 'color: #294785;', ele.WorkedHours,
        //   ele.BilledHours, 'color: #e33239;', ele.BilledHours])
        // });
        this.Graphdata.forEach(function (ele) {
            // ColumnChartData.push([this.datePipe.transform(ele.FromDate, 'yy.MM.dd') + '-' + this.datePipe.transform(ele.ToDate, 'yy.MM.dd'),
            // ele.WorkedHours, 'color: #294785;', ele.WorkedHours,
            // ele.BilledHours, 'color: #e33239;', ele.BilledHours])
            // Combine dates into a single string (assuming FromDate and ToDate are valid dates)
            var combinedDate = _this.datePipe.transform(ele.FromDate, 'yy.MM.dd') +
                ' - ' + _this.datePipe.transform(ele.ToDate, 'yy.MM.dd');
            ColumnChartData.push([combinedDate, ele.WorkedHours, 'color: #294785;', ele.WorkedHours, ele.BilledHours, 'color: #e33239;', ele.BilledHours]);
        });
        console.log(ColumnChartData);
        data.addRows(ColumnChartData);
        var options = {
            'title': "My Activity",
            titleTextStyle: {
                fontSize: 18
            },
            'width': chartWidth,
            'height': chartHeight,
            legend: {
                position: 'top', alignment: 'end', textStyle: {
                    bold: true,
                    fontSize: 12,
                    color: '#3E3E3E'
                }
            },
            annotations: {
                textStyle: {
                    color: 'white',
                    fontSize: 10,
                    bold: true
                },
                stem: {
                    length: 0
                },
            },
            series: {
                0: { color: '#294785' },
                1: { color: '#e33239' } // Customize color for the second series
            },
            vAxis: {
                title: "Realization",
                titleTextStyle: {
                    bold: true,
                    fontSize: 11,
                    italic: false
                },
                gridlines: {
                    color: 'transparent'
                },
                textPosition: 'none'
            },
            hAxis: {
                gridlines: {
                    color: 'transparent'
                },
                textStyle: {
                    bold: true,
                }
            },
        };
        var modelchart = new google.visualization.ColumnChart(document.getElementById('columnchart_div'));
        modelchart.draw(data, options);
    };
    StdashboardPage.prototype.drawDonutChart = function () {
        console.log(this.jchrs);
        console.log(this.nonjchrs);
        var data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Non-JC Hours', this.nonjchrs],
            ['JC Hours', this.jchrs]
        ]);
        // Define chart options
        var options = {
            'width': 380,
            'height': 300,
            pieHole: 0.55,
            pieStartAngle: -90,
            pieSliceBorderColor: 'transparent',
            legend: {
                position: 'bottom', alignment: 'center', textStyle: {
                    bold: true,
                    fontSize: 12,
                    color: '#b4b4b6',
                    position: 'bottom',
                    labels: {
                        usePointStyle: true // Use point style (circle)
                    }
                }
            },
            slices: {
                0: { color: '#fd7f7f', textStyle: { color: '#001868', bold: true } },
                1: { color: '#a8da72', textStyle: { color: '#001868', bold: true } }
            },
            tooltip: { trigger: 'none' },
        };
        // Instantiate and draw the chart
        var chart = new google.visualization.PieChart(document.getElementById('donutchart_div'));
        chart.draw(data, options);
        // var root = am5.Root.new("chartdiv");
        // root.setThemes([
        //   am5themes_Animated.new(root)
        // ]);
        // var chart = root.container.children.push(
        //   am5radar.RadarChart.new(root, {
        //     panX: false,
        //     panY: false,
        //     startAngle: -180,
        //     endAngle: 0,
        //   })
        // );
        // var axisRenderer = am5radar.AxisRendererCircular.new(root, {
        //   innerRadius: am5.percent(98),
        //   strokeOpacity: 0.1,
        //   minGridDistance: 20
        // });
        // axisRenderer.onPrivate("radius", function(){
        //   axisRenderer.set("minGridDistance", axisRenderer.getPrivate("radius", 1) / 5)
        // })
        // var xAxis = chart.xAxes.push(
        //   am5xy.ValueAxis.new(root, {
        //     maxDeviation: 0,
        //     min: 0,
        //     max: 100,
        //     strictMinMax: true,
        //     renderer: axisRenderer
        //   })
        // );
        // var data = google.visualization.arrayToDataTable([
        //   ['Label', 'Value'],
        //   ['Non-JC Hours', 20],
        // ]);
        // var options = {
        //   width: 400,
        //   height: 200,
        //   redFrom: 90,
        //   redTo: 100,
        //   minorTicks: 5,
        //   max: 100,  // Maximum value of the gauge
        //   greenColor: '#1ABC9C',  // Color for the green zone
        //   redColor: '#E74C3C',    // Color for the red zone
        //   // Angle for the half-circle (180 degrees)
        //   minAngle: -90,
        //   maxAngle: 90,
        //   // Display the gauge in a semi-circle
        //   animation: {
        //     duration: 1000,
        //     easing: 'out'
        //   }
        // };
        // var chart = new google.visualization.Gauge(document.getElementById('donutchart_div'));
        // chart.draw(data, options);
    };
    StdashboardPage.prototype.createHalfPieChart = function () {
        var canvas = this.halfPieChart.nativeElement;
        var ctx = canvas.getContext('2d');
        var divElement = canvas.parentElement; // Get the parent <div> element
        var halfPieChart = new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](ctx, {
            type: 'doughnut',
            data: {
                labels: ['Non-JC Hours', 'JC Hours'],
                datasets: [{
                        //data: [this.DashboardCount.JCHours, this.DashboardCount.NonJCHours],
                        data: [30, 70],
                        backgroundColor: [
                            '#ff7e81',
                            '#a8da72' // Green for JC
                        ],
                        borderWidth: 0 // Set border width to 0
                    }]
            },
            options: {
                cutoutPercentage: 50,
                rotation: Math.PI,
                circumference: Math.PI,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true // Use point style (circle)
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                plugins: {
                    datalabels: {
                        display: false // Ensure that datalabels plugin doesn't interfere
                    }
                }
            },
            // Register a custom plugin for drawing data labels
            plugins: [{
                    afterDatasetsDraw: function (chartInstance, easing) {
                        // To only draw at the end of animation, check for easing === 1
                        var ctx = chartInstance.ctx;
                        chartInstance.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.getDatasetMeta(i);
                            if (!meta.hidden) {
                                meta.data.forEach(function (element, index) {
                                    ctx.fillStyle = '#083a81'; // EicherBlue color
                                    var fontSize = 15;
                                    var fontStyle = '600'; // Semibold font weight
                                    var fontFamily = 'Hermis FB'; // Hermis FB font family
                                    ctx.font = __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"].helpers.fontString(fontSize, fontStyle, fontFamily);
                                    var model = element._model;
                                    var midAngle = model.startAngle + (model.endAngle - model.startAngle) / 2;
                                    // Calculate position based on segment angle
                                    var radius = model.outerRadius;
                                    var textRadius = radius * 0.8; // Adjust this value to position text closer or further from the center
                                    var x = model.x + textRadius * Math.cos(midAngle);
                                    var y = model.y + textRadius * Math.sin(midAngle);
                                    // Additional styles
                                    ctx.textAlign = 'center'; // Center text horizontally
                                    ctx.textBaseline = 'middle'; // Center text vertically
                                    // Get the data value
                                    var dataValue = dataset.data[index];
                                    // Ensure dataValue is a number
                                    if (typeof dataValue === 'number') {
                                        // Example numbers
                                        var formattedValue = (dataValue < 0 ? '0' : '') + dataValue; // Add leading zero if value is less than 10
                                        ctx.fillText(formattedValue + '%', x, y);
                                    }
                                });
                            }
                        });
                    }
                }]
        });
    };
    StdashboardPage.prototype.WorkStatusClick = function (val) {
        if (val == 'YTS') {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__Technician_styts_styts__["a" /* StytsPage */]);
        }
        else if (val == 'WIP') {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__Technician_stwip_stwip__["a" /* StwipPage */]);
        }
        else if (val == 'Paused') {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__Technician_stpaused_stpaused__["a" /* StpausedPage */]);
        }
        else if (val == 'Completed') {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__Technician_stcompleted_stcompleted__["a" /* StcompletedPage */]);
        }
    };
    StdashboardPage.prototype.presentCheckboxAlert = function () {
        // let alert = this.alertCtrl.create({
        //   title: 'Duration',
        //   inputs: [
        //     {
        //       type: 'radio',
        //       label: 'Last Day',
        //       value: '1'
        //     },
        //     {
        //       type: 'radio',
        //       label: 'Last 7 days',
        //       value: '2',
        //       checked: true,
        //     },
        //     {
        //       type: 'radio',
        //       label: 'MTD',
        //       value: '3',
        //     },
        //     {
        //       type: 'radio',
        //       label: 'LM',
        //       value: '4',
        //     },
        //     {
        //       type: 'radio',
        //       label: 'YTD',
        //       value: '5',
        //     },
        //     {
        //       type: 'radio',
        //       label: 'Date Range',
        //       value: '6'
        //     },
        //   ],
        //   buttons: [
        //     {
        //       text: 'Cancel',
        //       role: 'cancel',
        //       cssClass: 'BtnCancelPopup',
        //       handler: data => {
        //         console.log('Cancel clicked');
        //       }
        //     },
        //     {
        //       text: 'OK',
        //       cssClass: 'BtnYesPopup',
        //       handler: data => {
        //         console.log('radio data:', data);
        //         this.selectedtype = data;
        //         switch (data) {
        //           case '1':
        //             this.Filterdata = 'Last Day';
        //             break;
        //           case '2':
        //             this.Filterdata = 'Last 7 days';
        //             break;
        //           case '3':
        //             this.Filterdata = 'MTD';
        //             break;
        //           case '4':
        //             this.Filterdata = 'LM';
        //             break;
        //           case '5':
        //             this.Filterdata = 'YTD';
        //             break;
        //           case '6':
        //             this.Filterdata = 'date range';
        //             break;
        //           default:
        //             break;
        //         }
        //         console.log(this.Filterdata);
        //         this.filtervalue = true;
        //         this.CallFilterData();
        //       }
        //     }
        //   ]
        // });
        // alert.present();
        var _this = this;
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Duration',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Last Day',
                    handler: function () {
                        console.log('Last Day');
                        _this.Filterdata = 'Last Day';
                        _this.selectedtype = 1;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'Last 7 days',
                    handler: function () {
                        console.log('Last 7 days');
                        _this.Filterdata = 'Last 7 days';
                        _this.selectedtype = 2;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'MTD',
                    handler: function () {
                        console.log('MTD');
                        _this.Filterdata = 'MTD';
                        _this.selectedtype = 3;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'LM',
                    handler: function () {
                        console.log('LM');
                        _this.Filterdata = 'LM';
                        _this.selectedtype = 4;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'YTD',
                    handler: function () {
                        console.log('YTD');
                        _this.Filterdata = 'YTD';
                        _this.selectedtype = 5;
                        _this.filtervalue = true;
                        _this.daterange = false;
                        _this.CallFilterData();
                    }
                },
                {
                    text: 'Date range',
                    handler: function () {
                        console.log('Date range');
                        _this.Filterdata = 'Date range';
                        _this.selectedtype = 6;
                        _this.filtervalue = false;
                        _this.daterange = true;
                        // this.CallFilterData();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    StdashboardPage.prototype.RemoveFilteredata = function () {
        // this.FilterList.splice(data, 1);
        // this.Filterdata = "";
        this.filtervalue = false;
    };
    StdashboardPage.prototype.TypeClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__strealization_strealization__["a" /* StrealizationPage */]);
    };
    StdashboardPage.prototype.FromDateChange = function (event) {
        console.log('fromDate:', this.fromDate);
    };
    StdashboardPage.prototype.ToDateChange = function (event) {
        console.log('To Date:', this.toDate);
    };
    StdashboardPage.prototype.customDateClick = function () {
        console.log(this.fromDate + "and" + this.toDate);
        if ((this.fromDate == null || this.fromDate == undefined) || (this.toDate == null || this.toDate == undefined)) {
            this.global.ToastShow("Please select date");
        }
        else {
            this.CallFilterData();
        }
    };
    StdashboardPage.prototype.NotificationClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__Shared_notifications_notifications__["a" /* NotificationsPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('halfPieChart'),
        __metadata("design:type", Object)
    ], StdashboardPage.prototype, "halfPieChart", void 0);
    StdashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stdashboard',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\stdashboard\stdashboard.html"*/`<ion-header>\n  <ion-navbar color="themered" id="DivHeaderTech">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-1 style="display: flex;">\n          <img src="assets/imgs/menus.png" id="IconMenu" menuToggle>\n        </ion-col>\n        <ion-col col-10 style="display: flex;">\n          <ion-title>Welcome {{global.UserDetails[0].Name}}</ion-title>\n        </ion-col>\n        <ion-col col-1 style="display: flex;" (click)="NotificationClick()">\n          <img src="assets/imgs/bell.png" id="IconMenu" style="width:25px">\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-1></ion-col>\n        <ion-col col-11 style="margin-top: -10px;color:#fff;left:12px">\n          <sub class="SpnSub">{{global.UserDetails[0].Designation}}</sub>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-color: #fff;">\n\n  <ion-grid style="padding:15px;padding-bottom: 0px;">\n    <ion-row>\n      <ion-col col-2>\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh" (click)="presentCheckboxAlert()">\n      </ion-col>\n      <ion-col style="display: flex;width:auto">\n        <div *ngIf="filtervalue" class="DivFilterLable">\n          {{Filterdata}}\n          <!-- <span style="margin-left:8px;" (click)="RemoveFilteredata()">x</span> -->\n        </div>\n        <!-- <div *ngIf="daterange" style="display: flex;flex-wrap: wrap;">\n          <input type="date" [min]="minDate" [max]="maxDate" [(ngModel)]="fromDate" (change)="FromDateChange($event)" />\n          <span style="margin-top: 7px;margin-right:10px;margin-left:10px;">to</span>\n          <input type="date" [min]="minDate" [max]="maxDate" [(ngModel)]="toDate" (change)="ToDateChange($event)" />\n          <img style="width: 15px;height: 15px;margin-top: 7px;margin-left: 10px;" src="assets/imgs/search.png"\n            (click)="customDateClick()">\n        </div> -->\n        <div *ngIf="daterange" style="display: flex;flex-wrap: wrap;">\n          <input type="date" [min]="minDate" [max]="maxDate" [(ngModel)]="fromDate" (change)="FromDateChange($event)" />\n          <span style="margin-top: 7px;margin-right:10px;margin-left:10px;">From</span>\n\n          <span style="margin-top: 10px;\n          margin-right: 12px;\n          margin-left: -42px;\n          position: relative;\n          top: 3vh;">To</span>\n          <input type="date" [min]="minDate" [max]="maxDate" [(ngModel)]="toDate" (change)="ToDateChange($event)" />\n          <!-- <img style="width: 15px;height: 15px;margin-top: 7px;margin-left: 10px;" src="assets/imgs/search.png"\n            (click)="customDateClick()"> -->\n          <button style="width: 50px;\n            height: 15px;\n            margin-top: 4px;\n            margin-left: 63px;\n            background-color: #083a81;\n            color: white;\n            border: none;\n            border-radius: 3px;\n            cursor: pointer;" (click)="customDateClick()">Apply</button>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!-- Technician My activity-->\n  <ion-slides pager style="height: 50%;">\n\n    <ion-slide>\n      <ion-card class="ClsCard" style="padding:0">\n        <div id="linechart_div"></div>\n      </ion-card>\n    </ion-slide>\n\n    <ion-slide>\n      <ion-card class="ClsCard" style="padding:0">\n        <div id="columnchart_div"></div>\n      </ion-card>\n    </ion-slide>\n\n  </ion-slides>\n\n  <!-- OverallJC status -->\n  <ion-card class="ClsCard" (click)="TypeClick()">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-2>\n          <img src="assets/imgs/Real.png" style="width:40px">\n        </ion-col>\n        <ion-col col-8 style="color:green">\n          Realization <span style="color:#000;font-weight: 600;">{{DashboardCount.RealizationPerc}}%</span>\n        </ion-col>\n        <ion-col col-1>\n          <img src="assets/imgs/decrease.png" *ngIf="DashboardCount.RealizationDiff < 0"\n            style="width:8px;float:inline-end;margin-top: 0.4vh;">\n          <img src="assets/imgs/increase.png" *ngIf="DashboardCount.RealizationDiff > 0"\n            style="width:12px;float:inline-end;margin-top: 0.4vh;">\n        </ion-col>\n        <ion-col col-1>\n          <span style="color:green">{{DashboardCount.RealizationDiff}}%</span>\n        </ion-col>\n      </ion-row>\n      <ion-row style="margin-top:-3vh">\n        <ion-col col-2></ion-col>\n        <ion-col>\n          <meter style="width:96%;height: 13px;" value={{DashboardCount.RealizationPercValue}}></meter>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n  <!-- Today\'s head\'s up -->\n  <!-- <ion-card style="margin-bottom: 30px;"  class="ClsCard">\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <h6 style="margin-left: 8px;font-weight: 500;margin-bottom: 10px;font-size: 16px;">Today\'s Head\'s Up</h6>\n          <span style="color:#c3c3c3;margin-left: 8px;\n            overflow: hidden;\n            text-overflow: ellipsis;display: block;">Space for displaying motivation and achivement details</span>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card> -->\n\n  <!-- Technician Jc & non-Jc -->\n  <div id="donutchart_div" style="margin-top: -15px;margin-bottom: 30px;"></div>\n  <div id="chart-container"></div>\n  <div>\n    <div>\n      <canvas #halfPieChart id="half-pie-chart"></canvas>\n    </div>\n  </div>\n\n  <!-- work status -->\n  <ion-card class="ClsCard">\n\n    <h6 style="margin-left: 8px;font-weight: bold;margin-bottom: 10px;font-size: 16px;">Work Status</h6>\n\n    <ion-grid style="margin-bottom: 2%;">\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <div style="display: flex;">\n            <ion-card (click)="WorkStatusClick(\'YTS\')" class="CardTechJCStatus"\n              style="background: #feeeb3;position: relative;">\n              <img class="ImgDashboardCorner" src="assets/imgs/YTSIcon.png">\n              <div class="DivDashboardCenter">\n                <span class="SpnDashboardCount">{{this.DashboardCount.YTS}}</span>\n                <span class="SpnDashboardLable">Yet to Start</span>\n              </div>\n            </ion-card>\n          </div>\n        </ion-col>\n\n        <ion-col col-6>\n\n          <div style="display: flex;">\n            <ion-card (click)="WorkStatusClick(\'WIP\')" class="CardTechJCStatus"\n              style="background: #B3E8FD;position: relative;">\n              <img class="ImgDashboardCorner" src="assets/imgs/InProgressIcon.png">\n              <div class="DivDashboardCenter">\n                <span class="SpnDashboardCount">{{this.DashboardCount.WIP}}</span>\n                <span class="SpnDashboardLable">In Progress</span>\n              </div>\n            </ion-card>\n          </div>\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row style="margin-top: 15px;">\n\n        <ion-col col-6>\n\n          <div style="display: flex;">\n            <ion-card (click)="WorkStatusClick(\'Paused\')" class="CardTechJCStatus"\n              style="background: #FCB4B4;position: relative;">\n              <img class="ImgDashboardCorner" src="assets/imgs/PauseIcon.png">\n              <div class="DivDashboardCenter">\n                <span class="SpnDashboardCount">{{this.DashboardCount.Paused}}</span>\n                <span class="SpnDashboardLable">Paused</span>\n              </div>\n            </ion-card>\n          </div>\n        </ion-col>\n\n        <ion-col col-6>\n\n          <div style="display: flex;">\n            <ion-card (click)="WorkStatusClick(\'Completed\')" class="CardTechJCStatus"\n              style="background: #DFF2CB;position: relative;">\n              <img class="ImgDashboardCorner" src="assets/imgs/CompletedIcon.png">\n              <div class="DivDashboardCenter">\n                <span class="SpnDashboardCount">{{this.DashboardCount.Completed}}</span>\n                <span class="SpnDashboardLable">Completed</span>\n              </div>\n            </ion-card>\n          </div>\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n</ion-content>\n\n<ion-footer>\n  <page-footer>\n  </page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\stdashboard\stdashboard.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_9__angular_common__["d" /* DatePipe */]] // Provide DatePipe
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_9__angular_common__["d" /* DatePipe */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], StdashboardPage);
    return StdashboardPage;
}());

//# sourceMappingURL=stdashboard.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/Shared/communication/communication.module": [
		461,
		40
	],
	"../pages/Shared/footer/footer.module": [
		462,
		39
	],
	"../pages/Shared/governance/governance.module": [
		464,
		38
	],
	"../pages/Shared/header/header.module": [
		463,
		37
	],
	"../pages/Shared/login/login.module": [
		465,
		36
	],
	"../pages/Shared/notifications/notifications.module": [
		466,
		35
	],
	"../pages/Shared/profile/profile.module": [
		467,
		34
	],
	"../pages/Shared/welcome/welcome.module": [
		468,
		33
	],
	"../pages/Supervisor/JCStatus/scallocatedytsdetails/scallocatedytsdetails.module": [
		469,
		32
	],
	"../pages/Supervisor/JCStatus/scallocatedytslist/scallocatedytslist.module": [
		470,
		31
	],
	"../pages/Supervisor/JCStatus/sccmpteddetails/sccmpteddetails.module": [
		471,
		30
	],
	"../pages/Supervisor/JCStatus/sccmptedlist/sccmptedlist.module": [
		472,
		29
	],
	"../pages/Supervisor/JCStatus/sccmptedt5ddetails/sccmptedt5ddetails.module": [
		473,
		28
	],
	"../pages/Supervisor/JCStatus/sccmptedt5dlist/sccmptedt5dlist.module": [
		474,
		27
	],
	"../pages/Supervisor/JCStatus/sccmptedt5pdetails/sccmptedt5pdetails.module": [
		475,
		26
	],
	"../pages/Supervisor/JCStatus/sccmptedt5plist/sccmptedt5plist.module": [
		477,
		25
	],
	"../pages/Supervisor/JCStatus/scetdedetails/scetdedetails.module": [
		476,
		24
	],
	"../pages/Supervisor/JCStatus/scetdelist/scetdelist.module": [
		478,
		23
	],
	"../pages/Supervisor/JCStatus/sconholddetails/sconholddetails.module": [
		479,
		22
	],
	"../pages/Supervisor/JCStatus/sconholdlist/sconholdlist.module": [
		480,
		21
	],
	"../pages/Supervisor/JCStatus/scpfadetails/scpfadetails.module": [
		481,
		20
	],
	"../pages/Supervisor/JCStatus/scpfalist/scpfalist.module": [
		482,
		19
	],
	"../pages/Supervisor/JCStatus/scwipdetails/scwipdetails.module": [
		483,
		18
	],
	"../pages/Supervisor/JCStatus/scwiplist/scwiplist.module": [
		484,
		17
	],
	"../pages/Supervisor/JCStatus/sesearch/sesearch.module": [
		485,
		16
	],
	"../pages/Supervisor/KPI/dashboard/dashboard.module": [
		486,
		15
	],
	"../pages/Supervisor/KPI/productivity/productivity.module": [
		487,
		14
	],
	"../pages/Supervisor/KPI/realization/realization.module": [
		488,
		13
	],
	"../pages/Supervisor/KPI/statistics/statistics.module": [
		489,
		12
	],
	"../pages/Supervisor/KPI/utilization/utilization.module": [
		491,
		11
	],
	"../pages/Supervisor/TechStatus/sctechavl/sctechavl.module": [
		490,
		10
	],
	"../pages/Supervisor/TechStatus/sctechpause/sctechpause.module": [
		492,
		9
	],
	"../pages/Supervisor/TechStatus/sctechwipl/sctechwipl.module": [
		493,
		8
	],
	"../pages/Supervisor/TechStatus/sctechyts/sctechyts.module": [
		494,
		7
	],
	"../pages/Technician/sependingjc/sependingjc.module": [
		495,
		6
	],
	"../pages/Technician/stcompleted/stcompleted.module": [
		496,
		5
	],
	"../pages/Technician/stdashboard/stdashboard.module": [
		497,
		4
	],
	"../pages/Technician/stpaused/stpaused.module": [
		499,
		3
	],
	"../pages/Technician/strealization/strealization.module": [
		498,
		2
	],
	"../pages/Technician/stwip/stwip.module": [
		500,
		1
	],
	"../pages/Technician/styts/styts.module": [
		501,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 197;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SesearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SesearchPage = (function () {
    function SesearchPage(navCtrl, navParams, global, httpClient, viewCtrl) {
        //this.global.HeaderTitle = "Add Technician";
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.httpClient = httpClient;
        this.viewCtrl = viewCtrl;
        this.SEList = [];
        this.FinalSEList = [];
        this.SelectedSEList = [];
        this.SelectedJC = [];
        this.TempSEList = [];
        this.SelectedSEList = this.navParams.get("SEList");
        this.SelectedJC = this.navParams.get("JC");
        console.log(this.SelectedSEList);
        console.log(this.SelectedJC);
    }
    SesearchPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetBranchTechnicians?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (technicians) {
                if (technicians.StatusCode == 200) {
                    var employees = JSON.parse(technicians.Output);
                    employees.forEach(function (ele) {
                        var emp = _this.SelectedSEList.filter(function (a) { return a.Employee_IC == ele.Employee_IC; });
                        if (emp.length > 0) {
                            ele.IsSelected = true;
                            ele.LastActivity = emp[0].LastActivity;
                        }
                        else {
                            ele.IsSelected = false;
                            ele.LastActivity = 0;
                        }
                    });
                    _this.SEList = employees;
                    _this.FinalSEList = Object.assign([], employees);
                    console.log(_this.FinalSEList);
                }
                else {
                    console.log(technicians);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SesearchPage.prototype.CloseClick = function () {
        this.viewCtrl.dismiss();
    };
    SesearchPage.prototype.SEListClick = function (val) {
        val.IsSelected = !val.IsSelected;
        this.SelectedSEList = this.FinalSEList.filter(function (a) { return a.IsSelected; });
    };
    SesearchPage.prototype.SESearch = function (val) {
        this.FinalSEList = this.SEList.filter(function (p) { return p.Name.toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.Code.toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalSEList);
    };
    ;
    SesearchPage.prototype.SaveClick = function () {
        var _this = this;
        var JCEmployees = [];
        this.FinalSEList.forEach(function (ele) {
            if (ele.IsSelected) {
                JCEmployees.push({
                    JobCardHeader_IC: _this.SelectedJC.JobCardHedIC,
                    AssignedBy: _this.global.UserDetails[0].Employee_IC,
                    AssignedTechnicianID: ele.Employee_IC,
                    LastActivity: ele.LastActivity
                });
            }
        });
        console.log(JCEmployees);
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.post(this.global.HostedPath + "UpdateJC", JCEmployees).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    console.log(result);
                    _this.global.ToastShow("Submitted Succesfully");
                    _this.viewCtrl.dismiss();
                    // switch (this.global.SESearchPage) {
                    //   case "PFA":
                    //     this.navCtrl.setRoot(ScpfalistPage);
                    //     break;
                    //   case "ETDExceeded":
                    //     this.navCtrl.setRoot(ScetdelistPage);
                    //     break;
                    //   case "AllocatedYTS":
                    //     this.navCtrl.setRoot(ScallocatedytslistPage);
                    //     break;
                    //   case "WIP":
                    //     this.navCtrl.setRoot(ScwiplistPage);
                    //     break;
                    //   case "OnHold":
                    //     this.navCtrl.setRoot(SconholdlistPage);
                    //     break;
                    //   case "Completed":
                    //     this.navCtrl.setRoot(SccmptedlistPage);
                    //     break;
                    //     case "CompletedT5Pend":
                    //     this.navCtrl.setRoot(Sccmptedt5plistPage);
                    //     break;
                    //     case "CompletedT5Done":
                    //     this.navCtrl.setRoot(Sccmptedt5dlistPage);
                    //     break;
                    //   default:
                    //     this.navCtrl.setRoot(DashboardPage);
                    //     break;
                    // }
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SesearchPage.prototype.BackClick = function () {
        this.viewCtrl.dismiss();
    };
    SesearchPage.prototype.GetTechnicianCount = function () {
        return this.FinalSEList.filter(function (t) { return t.IsSelected; }).length;
    };
    SesearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sesearch',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sesearch\sesearch.html"*/`<ion-header>\n  <ion-navbar color="themered">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-2 style="text-align: center;">\n          <img src="assets/imgs/back.png" style="width:25px" (click)="BackClick()">\n        </ion-col>\n        <ion-col col-9>\n          <ion-title>Add Technician</ion-title>\n        </ion-col>\n        <ion-col col-1>\n          <img src="assets/imgs/bell.png" style="width:25px">\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-color: #fff;" padding>\n\n  <!-- Search -->\n  <ion-row>\n    <ion-col col-12 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n      <img src="assets/imgs/search.png" style="width:12px">\n      <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n        (keyup)="SESearch(SerachText)">\n    </ion-col>\n  </ion-row>\n\n  <div style="height: 73vh;overflow-y: scroll;margin-top:20px;">\n\n    <ion-card style="margin: 0px;width: 100%;">\n\n      <ion-grid>\n  \n        <ion-row style="padding:5px">\n          <ion-col>\n            <span style="font-size: 18px;font-weight: 500;">List of Technicians</span>\n          </ion-col>\n        </ion-row>\n  \n        <ion-row style="padding:5px;" *ngFor="let se of FinalSEList" (click)="SEListClick(se)">\n  \n          <ion-grid style="border-bottom: 1px solid lightgray;">\n  \n            <ion-row>\n              <ion-col col-10>\n                <ion-row style="padding: 5px;">\n                  <ion-col col style="font-weight: bold;">\n                    <span>{{se.Name}}</span>\n                    <span style="padding-right: 10px;">({{se.JCCount}})</span>\n                    <img src="assets/imgs/engineer.png" style="width: 1em;margin-top: 5px;display: inline;">\n                    <span style="position: absolute;font-size: 10px;">{{se.CompetencyCode}}</span>\n                  </ion-col>\n                </ion-row>\n                <ion-row style="padding: 5px;">\n                  <ion-col col>\n                    <span style="color:#808080;font-weight: 500;font-size: 12px;">{{se.Designation}} | {{se.Code}}</span>\n                  </ion-col>\n                </ion-row>\n              </ion-col>\n              <ion-col col-2 style="display: flex;">\n                <input type="checkbox" style="margin: auto;" [(ngModel)]="se.IsSelected">\n              </ion-col>\n            </ion-row>\n  \n          </ion-grid>\n  \n        </ion-row>\n  \n      </ion-grid>\n  \n    </ion-card>\n  \n    <hr>\n  \n    <ion-card style="margin: 0px;margin-top:20px;width: 100%" *ngIf="GetTechnicianCount()>0">\n  \n      <ion-grid>\n  \n        <ion-row style="padding:5px">\n          <ion-col>\n            <span style="font-size: 18px;font-weight: 500;">Selected Technician</span>\n          </ion-col>\n        </ion-row>\n  \n        <div *ngFor="let se of FinalSEList">\n  \n          <ion-row style="padding:5px;" *ngIf="se.IsSelected">\n  \n            <ion-grid style="border-bottom: 1px solid lightgray;">\n              <ion-row>\n                <ion-col col-10>\n                  <ion-row style="padding: 5px;">\n                    <ion-col col style="font-weight: bold;">\n                      <span>{{se.Name}}</span>\n                      <span style="padding-right: 10px;">({{se.JCCount}})</span>\n                      <img src="assets/imgs/engineer.png" style="width: 1em;margin-top: 5px;display: inline;">\n                      <span style="position: absolute;font-size: 10px;">{{se.CompetencyCode}}</span>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row style="padding: 5px;">\n                    <ion-col col>\n                      <span style="color:#808080;font-weight: 500;font-size: 12px;">{{se.Designation}} |\n                        {{se.Code}}</span>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n                <ion-col col-2 style="display: flex;" (click)="SEListClick(se)">\n                  <img src="assets/imgs/delete.png" style="margin: auto;width: 25%;">\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n  \n          </ion-row>\n  \n        </div>\n  \n      </ion-grid>\n  \n    </ion-card>\n  \n    <div style="text-align: center;margin-top:3vh;margin-bottom:20px;">\n      <button (click)="SaveClick()" class="BtnTechnicianAdd">\n        SAVE\n      </button>\n    </div>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <page-footer>\n  </page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sesearch\sesearch.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
    ], SesearchPage);
    return SesearchPage;
}());

//# sourceMappingURL=sesearch.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Supervisor_KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Technician_stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__communication_communication__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FooterPage = (function () {
    function FooterPage(navCtrl, navParams, global) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
    }
    FooterPage.prototype.DashboardClick = function () {
        if (this.global.WelcomeNavigateType == 1) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */]);
        }
        else if (this.global.WelcomeNavigateType == 2 || this.global.WelcomeNavigateType == 3) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__Technician_stdashboard_stdashboard__["a" /* StdashboardPage */]);
        }
    };
    FooterPage.prototype.CommunicationClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__communication_communication__["a" /* CommunicationPage */]);
    };
    FooterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-footer',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\footer\footer.html"*/`<ion-toolbar>\n    <ion-grid style="background: #fff;">\n        <ion-row style="text-align: center;font-size: 12px;padding-top:5px">\n            <ion-col col-4 (click)="CommunicationClick()">\n                <img src="assets/imgs/Commu.png" style="width:25px;cursor: pointer;">\n                <br />\n                <span style="font-size: 3vw;">Communication</span>\n            </ion-col>\n            <ion-col col-4 style="display: flex;" (click)="DashboardClick()">\n                <img src="assets/imgs/Dashboard.png" style="width:30%;margin: auto;cursor: pointer;">\n            </ion-col>\n            <ion-col col-4>\n                <img src="assets/imgs/Govern.png" style="width:25px;cursor: pointer;">\n                <br />\n                <span style="font-size: 3vw;">Governance</span>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-toolbar>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\footer\footer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */]])
    ], FooterPage);
    return FooterPage;
}());

//# sourceMappingURL=footer.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Supervisor_KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Supervisor_KPI_realization_realization__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Supervisor_JCStatus_scpfalist_scpfalist__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Supervisor_JCStatus_scetdelist_scetdelist__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Supervisor_JCStatus_scallocatedytslist_scallocatedytslist__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Supervisor_JCStatus_scwiplist_scwiplist__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Supervisor_JCStatus_sconholdlist_sconholdlist__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Supervisor_JCStatus_sccmptedlist_sccmptedlist__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Supervisor_JCStatus_sccmptedt5plist_sccmptedt5plist__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Supervisor_JCStatus_sccmptedt5dlist_sccmptedt5dlist__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Technician_stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__login_login__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__notifications_notifications__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var HeaderPage = (function () {
    function HeaderPage(navCtrl, navParams, global, app, alertCtrl, platform, ionicApp) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.ionicApp = ionicApp;
    }
    HeaderPage.prototype.HomeClick = function () {
        // if (this.global.UserDetails[0].Designation == 'Floor Supervisor') {
        //   this.navCtrl.setRoot(DashboardPage);
        // }
        // else {
        //   this.navCtrl.setRoot(SejoblistPage);
        // }
    };
    HeaderPage.prototype.BackButtonClick = function () {
        var overlayView = this.ionicApp._overlayPortal._views[0];
        if (!(overlayView && overlayView.dismiss)) {
            var nav = this.app.getActiveNavs()[0];
            var activeView = nav.getActive();
            console.log(activeView.name);
            switch (activeView.name) {
                case "LoginPage":
                case "WelcomePage":
                    this.platform.exitApp();
                    break;
                case "DashboardPage":
                case "StdashboardPage":
                    if (!this.global.IsAlertOpen) {
                        this.RegistrationBackClick("Are you sure, you want to Logout?");
                    }
                    break;
                case "UtilizationPage":
                case "RealizationPage":
                case "ProductivityPage":
                case "SctechavlPage":
                case "SctechwiplPage":
                case "SctechytsPage":
                case "SctechpausePage":
                case "ScpfalistPage":
                case "ScetdelistPage":
                case "ScallocatedytslistPage":
                case "ScwiplistPage":
                case "SconholdlistPage":
                case "SccmptedlistPage":
                case "Sccmptedt5plistPage":
                case "Sccmptedt5dlistPage":
                case "GovernancePage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */]);
                    break;
                case "NotificationsPage":
                case "CommunicationPage":
                case "ProfilePage":
                    if (this.global.WelcomeNavigateType == 1) {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */]);
                    }
                    else if (this.global.WelcomeNavigateType == 2 || this.global.WelcomeNavigateType == 3) {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_13__Technician_stdashboard_stdashboard__["a" /* StdashboardPage */]);
                    }
                    break;
                case "StatisticsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__Supervisor_KPI_realization_realization__["a" /* RealizationPage */]);
                    break;
                case "ScpfadetailsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__Supervisor_JCStatus_scpfalist_scpfalist__["a" /* ScpfalistPage */]);
                    break;
                case "ScetdedetailsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__Supervisor_JCStatus_scetdelist_scetdelist__["a" /* ScetdelistPage */]);
                    break;
                case "ScallocatedytsdetailsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__Supervisor_JCStatus_scallocatedytslist_scallocatedytslist__["a" /* ScallocatedytslistPage */]);
                    break;
                case "ScwipdetailsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__Supervisor_JCStatus_scwiplist_scwiplist__["a" /* ScwiplistPage */]);
                    break;
                case "SconholddetailsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__Supervisor_JCStatus_sconholdlist_sconholdlist__["a" /* SconholdlistPage */]);
                    break;
                case "SccmpteddetailsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__Supervisor_JCStatus_sccmptedlist_sccmptedlist__["a" /* SccmptedlistPage */]);
                    break;
                case "Sccmptedt5pdetailsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__Supervisor_JCStatus_sccmptedt5plist_sccmptedt5plist__["a" /* Sccmptedt5plistPage */]);
                    break;
                case "Sccmptedt5ddetailsPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_12__Supervisor_JCStatus_sccmptedt5dlist_sccmptedt5dlist__["a" /* Sccmptedt5dlistPage */]);
                    break;
                case "StrealizationPage":
                case "StytsPage":
                case "StwipPage":
                case "StpausedPage":
                case "StcompletedPage":
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_13__Technician_stdashboard_stdashboard__["a" /* StdashboardPage */]);
                    break;
                case "ModalCmp":
                    break;
                default:
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_14__login_login__["a" /* LoginPage */]);
                    break;
            }
        }
    };
    HeaderPage.prototype.LogoutClick = function () {
        if (!this.global.IsAlertOpen) {
            this.RegistrationBackClick("Are you sure, you want to Logout?");
        }
    };
    HeaderPage.prototype.RegistrationBackClick = function (msg) {
        var _this = this;
        this.global.IsAlertOpen = true;
        var confirm = this.alertCtrl.create({
            title: "Confirm",
            message: msg,
            buttons: [
                {
                    text: 'No',
                    cssClass: "BtnTwoPopup",
                    handler: function () {
                        _this.global.IsAlertOpen = false;
                    }
                },
                {
                    text: 'Yes',
                    cssClass: "BtnTwoPopup",
                    handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_14__login_login__["a" /* LoginPage */]);
                        _this.global.IsAlertOpen = false;
                        localStorage.clear();
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        confirm.present();
    };
    HeaderPage.prototype.NotificationClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_15__notifications_notifications__["a" /* NotificationsPage */]);
    };
    HeaderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-header',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\header\header.html"*/`<!-- <ion-navbar color="themered">\n  <ion-grid>\n    <ion-row>\n      <ion-col col-1 style="display: flex;">\n        <img src="assets/imgs/menus.png" id="IconMenu" menuToggle>\n      </ion-col>\n      <ion-col col-10 style="display: flex;">\n        <ion-title>Welcome {{global.UserDetails[0].Name}}</ion-title>\n      </ion-col>\n      <ion-col col-1 style="display: flex;">\n        <img src="assets/imgs/bell.png" id="IconMenu" style="width:25px">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-1></ion-col>\n      <ion-col col-11 style="margin-top: -10px;color:#fff;left:12px">\n        <sub>{{global.UserDetails[0].Designation}}</sub>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-navbar> -->\n\n<!-- <ion-navbar>\n\n  <button ion-button menuToggle id="BtnSideMenu" [style.display]="global.MenuHideOrShow" style="background: rgb(2, 189, 240);">\n    <ion-icon name="menu" style="color: white;cursor: pointer;"></ion-icon>\n  </button>\n\n  <button ion-button class="BtnHome" (click)="HomeClick()" [style.display]="global.MenuHideOrShow">\n    <ion-icon name="home" style="color: rgb(2, 189, 240);"></ion-icon>\n  </button>\n\n  <ion-title>{{global.title}}</ion-title>\n\n  <img src="assets/imgs/zuku_logo_orng_blue1.png" id="ImgZukuLogo" />\n\n</ion-navbar> -->\n\n<ion-toolbar color="themered">\n  <ion-grid>\n    <ion-row>\n      <ion-col col-2 style="text-align: center;">\n        <img src="assets/imgs/back.png" style="width:25px" (click)="BackButtonClick()">\n      </ion-col>\n      <ion-col col-9 style="display: flex;">\n        <ion-title>{{global.HeaderTitle}}</ion-title>\n      </ion-col>\n      <ion-col col-1 (click)="NotificationClick()">\n        <img src="assets/imgs/bell.png" style="width:25px">\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-toolbar>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\header\header.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicApp */]])
    ], HeaderPage);
    return HeaderPage;
}());

//# sourceMappingURL=header.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GovernancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GovernancePage = (function () {
    function GovernancePage(navCtrl, navParams, global) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.global.HeaderTitle = "Governance";
    }
    GovernancePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-governance',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\governance\governance.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\governance\governance.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */]])
    ], GovernancePage);
    return GovernancePage;
}());

//# sourceMappingURL=governance.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(402);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__communication_communication__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Supervisor_KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationsPage = (function () {
    function NotificationsPage(navCtrl, navParams, global, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.isOverflow = false;
        this.AlertSelectedMessageIDs = [];
        this.NotificationSelectedMessageIDs = [];
        this.isSelectAllAlertChecked = false;
        this.isSelectAllNotificationChecked = false;
        this.maxLengthOfMessage = 40;
        this.searchText = '';
        this.filteredAlertMessages = [];
        this.filteredNotificationMessages = [];
        this.iscardOpen = false;
        this.matchingItems = ['High', 'Medium', 'Low'];
        this.checkedItems = {};
        this.previousCheckedItems = {};
        this.checkedItemsCount = 0;
        this.AlertMessagesReadingCount = 0;
        this.NotificationMessagesReadingCount = 0;
        this.alertMessages = [{
                id: 2,
                name: 'Lokhi',
                date: '23 Jan 2024',
                msg: 'this JC ID go early to home, to yalanka, Bengalure',
                isReadMessage: false,
                isClickViewMore: false,
                priority: 'High'
            },
            {
                id: 3,
                name: 'Syed',
                date: '23 Jan 2024',
                msg: 'this JC ID Pause the Job card, he cross more than 15 min',
                isReadMessage: false,
                isClickViewMore: false,
                priority: 'High'
            },
            {
                id: 1,
                name: 'Abhi',
                date: '23 Jan 2024',
                msg: 'this JC ID breake the Breake Time',
                isReadMessage: false,
                isClickViewMore: false,
                priority: 'Medium'
            },
            {
                id: 4,
                name: 'Madhu',
                date: '23 Jan 2024',
                msg: 'this JC ID breake the Breake Time',
                isReadMessage: false,
                isClickViewMore: false,
                priority: 'Low'
            },
        ];
        this.notificationMessage = [{
                id: 1,
                name: 'Darshan',
                date: '23 Jan 2024',
                msg: 'this JC ID breake the Breake Time',
                isReadMessage: false,
                isClickViewMore: false,
                priority: 'High'
            },
            {
                id: 2,
                name: 'Vinay',
                date: '23 Jan 2024',
                msg: 'this JC ID go early to home, to yalanka, Bengalure',
                isReadMessage: false,
                isClickViewMore: false,
                priority: 'Medium'
            }
        ];
        this.global.HeaderTitle = "Notification";
        this.isAlertOpen = true;
        this.isNotificationOpen = false;
        console.log("\nAlert Message");
        console.log(this.alertMessages);
        console.log("\nNotification Message");
        console.log(this.notificationMessage);
        // // WE ACN ADD SORTING IN FEATURE , IF NEED TO SORT PRIORITY
        // this.alertMessages.sort(function(a,b){
        //   return a.name.localeCompare(b.name);
        // });
        // console.log("\nAlert Message After Sort");
        // console.log(this.alertMessages);
        this.filteredAlertMessages = this.alertMessages;
        this.filteredNotificationMessages = this.notificationMessage;
        this.ReadingCountAlertMessages();
        this.ReadingCountNotificationMessages();
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationsPage');
    };
    // ================================================================ ALERT PAGE ===================================================================//
    NotificationsPage.prototype.openAlertMessages = function () {
        // alert("Alert");
        this.isAlertOpen = true;
        this.isNotificationOpen = false;
        this.isSelectAllAlertChecked = false;
        this.isSelectAllNotificationChecked = false;
        // this.AlertSelectedMessageIDs = [];
        // this.NotificationSelectedMessageIDs = [];
    };
    // ================================================================ NOTIFICATION PAGE ===========================================================//
    NotificationsPage.prototype.openNotificationMessages = function () {
        // alert("Notification");
        this.isAlertOpen = false;
        this.isNotificationOpen = true;
        this.isSelectAllAlertChecked = false;
        this.isSelectAllNotificationChecked = false;
        // this.AlertSelectedMessageIDs = [];
        // this.NotificationSelectedMessageIDs = [];
    };
    // ================================================================ DELETE ALERT ===============================================================//
    // SELECTED MESSAGES IDs STORING IN ARRAY
    NotificationsPage.prototype.AlertSelectedMessage = function (id) {
        var index = this.AlertSelectedMessageIDs.indexOf(id);
        if (index > -1) {
            this.AlertSelectedMessageIDs.splice(index, 1); // Remove The ID if already selected
        }
        else {
            this.AlertSelectedMessageIDs.push(id); // Add ID The if not selected
        }
        console.log(this.AlertSelectedMessageIDs);
    };
    // SELECT ALL AND STORE ALL MESSAGES IDs IN ARRAY
    NotificationsPage.prototype.SelectAllAlertMessages = function () {
        if (!this.isSelectAllAlertChecked) {
            this.AlertSelectedMessageIDs = [];
            for (var _i = 0, _a = this.alertMessages; _i < _a.length; _i++) {
                var item = _a[_i];
                var index = this.AlertSelectedMessageIDs.indexOf(item.id);
                if (index > -1) {
                    this.AlertSelectedMessageIDs.splice(index, 1); // Remove The ID if already selected
                }
                else {
                    this.AlertSelectedMessageIDs.push(item.id); // Add ID The if not selected
                }
            }
            console.log(this.AlertSelectedMessageIDs);
            this.isSelectAllAlertChecked = true;
        }
        else {
            this.AlertSelectedMessageIDs = [];
            console.log(this.AlertSelectedMessageIDs);
            this.isSelectAllAlertChecked = false;
        }
    };
    NotificationsPage.prototype.deleteAlerts = function () {
        var _this = this;
        // alert("Delete Alert");
        if (this.AlertSelectedMessageIDs.length != 0) {
            var confirm_1 = this.alertCtrl.create({
                // title: 'Use this lightsaber?',
                message: 'Are you sure you want to delete selected Messages?',
                cssClass: 'buttonCss',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            var _loop_1 = function (id) {
                                var index = _this.alertMessages.findIndex(function (msg) { return msg.id === id; });
                                // If the id exists, remove it from the array
                                if (index !== -1) {
                                    _this.alertMessages.splice(index, 1);
                                }
                            };
                            for (var _i = 0, _a = _this.AlertSelectedMessageIDs; _i < _a.length; _i++) {
                                var id = _a[_i];
                                _loop_1(id);
                            }
                            _this.AlertSelectedMessageIDs = [];
                            console.log('Deleted Sucessfully');
                            console.log(_this.alertMessages);
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            this.ShowToastMessage("Please select message to delete!", "bottom");
        }
    };
    NotificationsPage.prototype.ShowToastMessage = function (message, position) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: position
        });
        toast.present(toast);
    };
    // ================================================================ DELETE NOTIFICATION =======================================================//
    // SELECTED NOTIFICATIONS IDs STORING IN ARRAY
    NotificationsPage.prototype.NotificationSelectedMessage = function (id) {
        var index = this.NotificationSelectedMessageIDs.indexOf(id);
        if (index > -1) {
            this.NotificationSelectedMessageIDs.splice(index, 1); // Remove The ID if already selected
        }
        else {
            this.NotificationSelectedMessageIDs.push(id); // Add ID The if not selected
        }
        console.log(this.NotificationSelectedMessageIDs);
    };
    // SELECT ALL AND STORE ALL NOTIFICATIONS IDs IN ARRAY
    NotificationsPage.prototype.SelectAllNotificationMessages = function () {
        if (!this.isSelectAllNotificationChecked) {
            this.NotificationSelectedMessageIDs = [];
            for (var _i = 0, _a = this.notificationMessage; _i < _a.length; _i++) {
                var item = _a[_i];
                var index = this.NotificationSelectedMessageIDs.indexOf(item.id);
                if (index > -1) {
                    this.NotificationSelectedMessageIDs.splice(index, 1); // Remove The ID if already selected
                }
                else {
                    this.NotificationSelectedMessageIDs.push(item.id); // Add ID The if not selected
                }
            }
            console.log(this.NotificationSelectedMessageIDs);
            this.isSelectAllNotificationChecked = true;
        }
        else {
            this.NotificationSelectedMessageIDs = [];
            console.log(this.NotificationSelectedMessageIDs);
            this.isSelectAllNotificationChecked = false;
        }
    };
    NotificationsPage.prototype.deleteNotifications = function () {
        var _this = this;
        // alert("Delete Notifications");
        if (this.NotificationSelectedMessageIDs.length != 0) {
            var confirm_2 = this.alertCtrl.create({
                // title: 'Use this lightsaber?',
                message: 'Are you sure you want to delete selected Notification?',
                cssClass: 'buttonCss',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            var _loop_2 = function (id) {
                                var index = _this.notificationMessage.findIndex(function (msg) { return msg.id === id; });
                                // If the id exists, remove it from the array
                                if (index !== -1) {
                                    _this.notificationMessage.splice(index, 1);
                                }
                            };
                            for (var _i = 0, _a = _this.NotificationSelectedMessageIDs; _i < _a.length; _i++) {
                                var id = _a[_i];
                                _loop_2(id);
                            }
                            _this.NotificationSelectedMessageIDs = [];
                            console.log('Deleted Sucessfully');
                            console.log(_this.notificationMessage);
                        }
                    }
                ]
            });
            confirm_2.present();
        }
        else {
            this.ShowToastMessage("Please select Notification to delete!", "bottom");
        }
    };
    // ================================================================ ALERT AUTO CHECK ===========================================================//
    NotificationsPage.prototype.isAlertMessageSelected = function (id) {
        return this.AlertSelectedMessageIDs.indexOf(id) !== -1;
    };
    // ================================================================ NOTIFICATION AUTO CHECK ====================================================//
    NotificationsPage.prototype.isNotificationMessageSelected = function (id) {
        return this.NotificationSelectedMessageIDs.indexOf(id) !== -1;
    };
    // ================================================================ SEARCH MESSAGE =============================================================//
    NotificationsPage.prototype.filterAlertMessages = function () {
        var _this = this;
        if (this.searchText.trim() === '') {
            this.filteredAlertMessages = this.alertMessages; // If search text is empty, show all messages
        }
        else {
            this.filteredAlertMessages = this.alertMessages.filter(function (message) {
                return message.name.toLowerCase().includes(_this.searchText.toLowerCase()) ||
                    message.msg.toLowerCase().includes(_this.searchText.toLowerCase());
            }); // Filter messages based on name or msg
        }
    };
    // ================================================================ SEARCH NOTIFICATION ========================================================//
    NotificationsPage.prototype.filterNotificationMessages = function () {
        var _this = this;
        if (this.searchText.trim() === '') {
            this.filteredNotificationMessages = this.notificationMessage; // If search text is empty, show all messages
        }
        else {
            this.filteredNotificationMessages = this.notificationMessage.filter(function (message) {
                return message.name.toLowerCase().includes(_this.searchText.toLowerCase()) ||
                    message.msg.toLowerCase().includes(_this.searchText.toLowerCase());
            }); // Filter messages based on name or msg 
        }
    };
    // ================================================================ COUNT - READ AND UNREAD =====================================================//
    NotificationsPage.prototype.ReadingCountAlertMessages = function () {
        this.AlertMessagesReadingCount = 0;
        for (var _i = 0, _a = this.alertMessages; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.isReadMessage == false) {
                this.AlertMessagesReadingCount++;
            }
        }
        console.log("AlertMessagesReadingCount : " + this.AlertMessagesReadingCount);
    };
    NotificationsPage.prototype.ReadingCountNotificationMessages = function () {
        this.NotificationMessagesReadingCount = 0;
        for (var _i = 0, _a = this.notificationMessage; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.isReadMessage == false) {
                this.NotificationMessagesReadingCount++;
            }
        }
        console.log("NotificationMessagesReadingCount : " + this.NotificationMessagesReadingCount);
    };
    // ================================================================ ALERT - READ AND UNREAD =====================================================//
    NotificationsPage.prototype.alertReadMessage = function (item) {
        item.isReadMessage = true;
        this.ReadingCountAlertMessages();
    };
    // ================================================================ NOTIFICATION - READ AND UNREAD =============================================//
    NotificationsPage.prototype.notificationReadMessage = function (item) {
        item.isReadMessage = true;
        this.ReadingCountNotificationMessages();
    };
    // ================================================================ BACKTO DASHBOARD ==========================================================//
    NotificationsPage.prototype.backToDashBoard = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */]);
    };
    // ================================================================ GO TO COMMUNICATION ======================================================//
    NotificationsPage.prototype.CommunicationClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__communication_communication__["a" /* CommunicationPage */]);
    };
    // ================================================================ SHOW MORE ================================================================//
    NotificationsPage.prototype.showFullMessage = function (item) {
        item.isClickViewMore = !item.isClickViewMore;
    };
    // ================================================================ FILTER ===================================================================//
    NotificationsPage.prototype.FilterClick = function () {
        console.log("Length of CheckedItemsCount " + this.getCheckedItemCount());
        this.iscardOpen = !this.iscardOpen;
    };
    NotificationsPage.prototype.BtnOk = function () {
        // Update previousCheckedItems to current state before any changes are made
        this.previousCheckedItems = __assign({}, this.checkedItems);
        console.log(this.checkedItems);
        // CLOSING MODEL
        this.iscardOpen = !this.iscardOpen;
    };
    NotificationsPage.prototype.BtnCancel = function () {
        // RESTORE PREVIOUS STATE OF CHECKEDITEMS
        this.checkedItems = __assign({}, this.previousCheckedItems);
        console.log(this.checkedItems);
        // CLOSING MODEL 
        this.iscardOpen = !this.iscardOpen;
    };
    NotificationsPage.prototype.getCheckedItemCount = function () {
        this.checkedItemsCount = 0;
        for (var key in this.checkedItems) {
            if (this.checkedItems[key]) {
                this.checkedItemsCount++;
            }
        }
        // console.log("Length of CheckedItemsCount " + this.checkedItemsCount);
        return this.checkedItemsCount;
    };
    // ================================================================ REMOVE FILTER ==============================================================//
    NotificationsPage.prototype.removeItem = function (item) {
        delete this.checkedItems[item];
        console.log(this.checkedItems);
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\notifications\notifications.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding [ngStyle]="{\'background-color\': iscardOpen ? \'#bcbcbc\' : \'white\'}" class="animated-background">\n\n  <ion-grid>\n    <ion-row align-items-center>\n      <ion-col col-12>\n        <ion-searchbar *ngIf="isAlertOpen" [(ngModel)]="searchText" (ionInput)="filterAlertMessages()"\n          placeholder="Search message"></ion-searchbar>\n        <ion-searchbar *ngIf="isNotificationOpen" [(ngModel)]="searchText" (ionInput)="filterNotificationMessages()"\n          placeholder="Search notification"></ion-searchbar>\n      </ion-col>\n    </ion-row>\n    <ion-row align-items-center>\n      <ion-col col-2>\n        <img src="assets/imgs/Filtered.png" style="width:26px; margin: 11px; margin-left: 0px;" (click)="FilterClick()">\n      </ion-col>\n      <ion-col col-3 text-center *ngIf="checkedItems[\'High\']">\n        <p style="border: 2px solid red;" class="HighMidLog">High<span (click)="removeItem(\'High\')"\n            style="margin-left: 10px">X</span></p>\n      </ion-col>\n      <ion-col col-4 text-center *ngIf="checkedItems[\'Medium\']">\n        <p style="border: 2px solid orange;" class="HighMidLog">Medium<span (click)="removeItem(\'Medium\')"\n            style="margin-left: 10px">X</span></p>\n      </ion-col>\n      <ion-col col-3 text-center *ngIf="checkedItems[\'Low\']">\n        <p style="border: 2px solid yellow;" class="HighMidLog">Low<span (click)="removeItem(\'Low\')"\n            style="margin-left: 10px">X</span></p>\n      </ion-col>\n    </ion-row>\n    <ion-row align-items-center>\n      <ion-col>\n        <button ion-button color="danger" icon-start clear [style.background]="isAlertOpen ? \'#d3d3d3\' : \'\'"\n          (click)="openAlertMessages()" style="color: black; border-radius: 10px;border: 1px solid;width: 90%;">\n          <ion-icon name="warning"></ion-icon>\n          Alert({{AlertMessagesReadingCount}})\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="danger" icon-start clear [style.background]="isNotificationOpen ? \'#d3d3d3\' : \'\'"\n          (click)="openNotificationMessages()" style="color: black; border-radius: 10px;border: 1px solid;width: 90%;">\n          <ion-icon name="notifications"></ion-icon>\n          Notifications({{NotificationMessagesReadingCount}})\n        </button>\n      </ion-col>\n    </ion-row>\n    <!-- <ion-row align-items-center>\n      <ion-col col-1>\n        <ion-checkbox color="dark"></ion-checkbox>\n      </ion-col>\n      <ion-col col-3>\n        <p>Select All</p>\n      </ion-col>\n      <ion-col col-1>\n        <ion-icon name="trash"></ion-icon>\n      </ion-col>\n      <ion-col col-7 text-right>\n        <p>Showing 5 Alerts</p>\n      </ion-col>\n    </ion-row> -->\n  </ion-grid>\n\n  <!-- =========================================================== ALERT ============================================================= -->\n\n  <ion-grid *ngIf="isAlertOpen" style="margin-bottom: 10vh;">\n    <ion-row align-items-center>\n      <ion-col col-1>\n        <ion-checkbox color="dark" (click)="SelectAllAlertMessages()"></ion-checkbox>\n      </ion-col>\n      <ion-col col-3>\n        <p>Select All</p>\n      </ion-col>\n      <ion-col col-1>\n        <ion-icon name="trash" (click)="deleteAlerts()"></ion-icon>\n      </ion-col>\n      <ion-col col-7 text-right>\n        <p>Showing {{alertMessages.length}} Alerts</p>\n      </ion-col>\n    </ion-row>\n\n    <!-- Display if no items are checked -->\n    <ion-row *ngIf="!getCheckedItemCount()">\n      <!-- <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of alertMessages"> -->\n      <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of filteredAlertMessages">\n        <ion-col col-1>\n          <ion-checkbox color="dark" [checked]="isAlertMessageSelected(item.id)"\n            (click)="AlertSelectedMessage(item.id)"></ion-checkbox>\n        </ion-col>\n        <ion-col col-11 style="border-radius: 5px;" (click)="alertReadMessage(item)"\n          [style.font-weight]="item.isReadMessage ? \'normal\' : \'bold\'"\n          [style.background]="item.priority==\'High\' ? \'red\' : \'normal\'"\n          [style.background]="item.priority==\'Medium\' ? \'orange\' : \'normal\'"\n          [style.background]="item.priority==\'Low\' ? \'yellow\' : \'normal\'">\n          <div style="background: #ffffff; padding: 10px; border-radius: 5px; margin-left: 5px;">\n            <ion-row> <ion-col text-left>{{item.name}}</ion-col> </ion-row>\n            <ion-row>\n              <ion-col col-6 text-left><ion-icon name="calendar"> </ion-icon> {{item.date}}</ion-col>\n              <ion-col col-6 text-right><ion-icon name="time"> </ion-icon> {{item.date}}</ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col text-left *ngIf="!item.isClickViewMore">\n                {{ item.msg.length > maxLengthOfMessage ? (item.msg | slice:0:maxLengthOfMessage) + \'...\' : item.msg }}\n              </ion-col>\n              <ion-col text-left *ngIf="item.isClickViewMore">\n                {{ item.msg}}\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col text-right style="color: #274a86;">\n                <p *ngIf="item.msg.length > maxLengthOfMessage" (click)="showFullMessage(item)">{{!item.isClickViewMore\n                  ?\n                  \'View More\' : \'View Less\'}}</p>\n              </ion-col>\n            </ion-row>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-row>\n\n    <!-- Display if \'High\' is checked -->\n    <ion-row *ngIf="checkedItems[\'High\']">\n      <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of filteredAlertMessages">\n        <ion-row *ngIf="item.priority==\'High\'">\n          <ion-col col-1>\n            <ion-checkbox color="dark" [checked]="isAlertMessageSelected(item.id)"\n              (click)="AlertSelectedMessage(item.id)"></ion-checkbox>\n          </ion-col>\n          <ion-col col-11 style="border-radius: 5px;" (click)="alertReadMessage(item)"\n            [style.font-weight]="item.isReadMessage ? \'normal\' : \'bold\'"\n            [style.background]="item.priority==\'High\' ? \'red\' : \'normal\'"\n            [style.background]="item.priority==\'Medium\' ? \'orange\' : \'normal\'"\n            [style.background]="item.priority==\'Low\' ? \'yellow\' : \'normal\'">\n            <div style="background: #ffffff; padding: 10px; border-radius: 5px; margin-left: 5px;">\n              <ion-row> <ion-col text-left>{{item.name}}</ion-col> </ion-row>\n              <ion-row>\n                <ion-col col-6 text-left><ion-icon name="calendar"> </ion-icon> {{item.date}}</ion-col>\n                <ion-col col-6 text-right><ion-icon name="time"> </ion-icon> {{item.date}}</ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-left *ngIf="!item.isClickViewMore">\n                  {{ item.msg.length > maxLengthOfMessage ? (item.msg | slice:0:maxLengthOfMessage) + \'...\' : item.msg\n                  }}\n                </ion-col>\n                <ion-col text-left *ngIf="item.isClickViewMore">\n                  {{ item.msg}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-right style="color: #274a86;">\n                  <p *ngIf="item.msg.length > maxLengthOfMessage" (click)="showFullMessage(item)">\n                    {{!item.isClickViewMore\n                    ?\n                    \'View More\' : \'View Less\'}}</p>\n                </ion-col>\n              </ion-row>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-row>\n    </ion-row>\n\n    <!-- Display if \'Medium\' is checked -->\n    <ion-row *ngIf="checkedItems[\'Medium\']">\n      <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of filteredAlertMessages">\n        <ion-row *ngIf="item.priority==\'Medium\'">\n          <ion-col col-1>\n            <ion-checkbox color="dark" [checked]="isAlertMessageSelected(item.id)"\n              (click)="AlertSelectedMessage(item.id)"></ion-checkbox>\n          </ion-col>\n          <ion-col col-11 style="border-radius: 5px;" (click)="alertReadMessage(item)"\n            [style.font-weight]="item.isReadMessage ? \'normal\' : \'bold\'"\n            [style.background]="item.priority==\'High\' ? \'red\' : \'normal\'"\n            [style.background]="item.priority==\'Medium\' ? \'orange\' : \'normal\'"\n            [style.background]="item.priority==\'Low\' ? \'yellow\' : \'normal\'">\n            <div style="background: #ffffff; padding: 10px; border-radius: 5px; margin-left: 5px;">\n              <ion-row> <ion-col text-left>{{item.name}}</ion-col> </ion-row>\n              <ion-row>\n                <ion-col col-6 text-left><ion-icon name="calendar"> </ion-icon> {{item.date}}</ion-col>\n                <ion-col col-6 text-right><ion-icon name="time"> </ion-icon> {{item.date}}</ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-left *ngIf="!item.isClickViewMore">\n                  {{ item.msg.length > maxLengthOfMessage ? (item.msg | slice:0:maxLengthOfMessage) + \'...\' : item.msg\n                  }}\n                </ion-col>\n                <ion-col text-left *ngIf="item.isClickViewMore">\n                  {{ item.msg}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-right style="color: #274a86;">\n                  <p *ngIf="item.msg.length > maxLengthOfMessage" (click)="showFullMessage(item)">\n                    {{!item.isClickViewMore\n                    ?\n                    \'View More\' : \'View Less\'}}</p>\n                </ion-col>\n              </ion-row>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-row>\n    </ion-row>\n\n    <!-- Display if \'Low\' is checked -->\n    <ion-row *ngIf="checkedItems[\'Low\']">\n      <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of filteredAlertMessages">\n        <ion-row *ngIf="item.priority==\'Low\'">\n          <ion-col col-1>\n            <ion-checkbox color="dark" [checked]="isAlertMessageSelected(item.id)"\n              (click)="AlertSelectedMessage(item.id)"></ion-checkbox>\n          </ion-col>\n          <ion-col col-11 style="border-radius: 5px;" (click)="alertReadMessage(item)"\n            [style.font-weight]="item.isReadMessage ? \'normal\' : \'bold\'"\n            [style.background]="item.priority==\'High\' ? \'red\' : \'normal\'"\n            [style.background]="item.priority==\'Medium\' ? \'orange\' : \'normal\'"\n            [style.background]="item.priority==\'Low\' ? \'yellow\' : \'normal\'">\n            <div style="background: #ffffff; padding: 10px; border-radius: 5px; margin-left: 5px;">\n              <ion-row> <ion-col text-left>{{item.name}}</ion-col> </ion-row>\n              <ion-row>\n                <ion-col col-6 text-left><ion-icon name="calendar"> </ion-icon> {{item.date}}</ion-col>\n                <ion-col col-6 text-right><ion-icon name="time"> </ion-icon> {{item.date}}</ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-left *ngIf="!item.isClickViewMore">\n                  {{ item.msg.length > maxLengthOfMessage ? (item.msg | slice:0:maxLengthOfMessage) + \'...\' : item.msg\n                  }}\n                </ion-col>\n                <ion-col text-left *ngIf="item.isClickViewMore">\n                  {{ item.msg}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-right style="color: #274a86;">\n                  <p *ngIf="item.msg.length > maxLengthOfMessage" (click)="showFullMessage(item)">\n                    {{!item.isClickViewMore\n                    ?\n                    \'View More\' : \'View Less\'}}</p>\n                </ion-col>\n              </ion-row>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-row>\n    </ion-row>\n\n  </ion-grid>\n\n  <!-- =========================================================== NOTIFICATIONS =================================================== -->\n  <ion-grid *ngIf="isNotificationOpen" style="margin-bottom: 10vh;">\n    <ion-row align-items-center>\n      <ion-col col-1>\n        <ion-checkbox color="dark" (click)="SelectAllNotificationMessages()"></ion-checkbox>\n      </ion-col>\n      <ion-col col-3>\n        <p>Select All</p>\n      </ion-col>\n      <ion-col col-1>\n        <ion-icon name="trash" (click)="deleteNotifications()"></ion-icon>\n      </ion-col>\n      <ion-col col-7 text-right>\n        <p>Showing {{notificationMessage.length}} Notifications</p>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf="!getCheckedItemCount()">\n      <!-- <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of notificationMessage"> -->\n      <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of filteredNotificationMessages">\n        <ion-col col-1>\n          <ion-checkbox color="dark" [checked]="isNotificationMessageSelected(item.id)"\n            (click)="NotificationSelectedMessage(item.id)"></ion-checkbox>\n        </ion-col>\n        <ion-col col-11 style="border-radius: 5px;" (click)="notificationReadMessage(item)"\n          [style.font-weight]="item.isReadMessage ? \'normal\' : \'bold\'"\n          [style.background]="item.priority==\'High\' ? \'red\' : \'normal\'"\n          [style.background]="item.priority==\'Medium\' ? \'orange\' : \'normal\'"\n          [style.background]="item.priority==\'Low\' ? \'yellow\' : \'normal\'">\n          <div style="background: #ffffff; padding: 10px; border-radius: 5px; margin-left: 5px;">\n            <ion-row> <ion-col text-left>{{item.name}}</ion-col> </ion-row>\n            <ion-row>\n              <ion-col col-6 text-left><ion-icon name="calendar"> </ion-icon> {{item.date}}</ion-col>\n              <ion-col col-6 text-right><ion-icon name="time"> </ion-icon> {{item.date}}</ion-col>\n            </ion-row>\n            <!-- <ion-row> <ion-col text-left>{{item.msg}}</ion-col> </ion-row>\n          <ion-row> <ion-col text-right style="color: #274a86;">View More</ion-col> </ion-row> -->\n            <ion-row>\n              <ion-col text-left *ngIf="!item.isClickViewMore">\n                {{ item.msg.length > maxLengthOfMessage ? (item.msg | slice:0:maxLengthOfMessage) + \'...\' : item.msg }}\n              </ion-col>\n              <ion-col text-left *ngIf="item.isClickViewMore">\n                {{ item.msg}}\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col text-right style="color: #274a86;">\n                <p *ngIf="item.msg.length > maxLengthOfMessage" (click)="showFullMessage(item)">{{!item.isClickViewMore\n                  ?\n                  \'View More\' : \'View Less\'}}</p>\n              </ion-col>\n            </ion-row>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-row>\n\n    <!-- Display if \'High\' is checked -->\n    <ion-row *ngIf="checkedItems[\'High\']">\n      <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of filteredNotificationMessages">\n        <ion-row *ngIf="item.priority==\'High\'">\n          <ion-col col-1>\n            <ion-checkbox color="dark" [checked]="isNotificationMessageSelected(item.id)"\n              (click)="NotificationSelectedMessage(item.id)"></ion-checkbox>\n          </ion-col>\n          <ion-col col-11 style="border-radius: 5px;" (click)="notificationReadMessage(item)"\n            [style.font-weight]="item.isReadMessage ? \'normal\' : \'bold\'"\n            [style.background]="item.priority==\'High\' ? \'red\' : \'normal\'"\n            [style.background]="item.priority==\'Medium\' ? \'orange\' : \'normal\'"\n            [style.background]="item.priority==\'Low\' ? \'yellow\' : \'normal\'">\n            <div style="background: #ffffff; padding: 10px; border-radius: 5px; margin-left: 5px;">\n              <ion-row> <ion-col text-left>{{item.name}}</ion-col> </ion-row>\n              <ion-row>\n                <ion-col col-6 text-left><ion-icon name="calendar"> </ion-icon> {{item.date}}</ion-col>\n                <ion-col col-6 text-right><ion-icon name="time"> </ion-icon> {{item.date}}</ion-col>\n              </ion-row>\n              <!-- <ion-row> <ion-col text-left>{{item.msg}}</ion-col> </ion-row>\n          <ion-row> <ion-col text-right style="color: #274a86;">View More</ion-col> </ion-row> -->\n              <ion-row>\n                <ion-col text-left *ngIf="!item.isClickViewMore">\n                  {{ item.msg.length > maxLengthOfMessage ? (item.msg | slice:0:maxLengthOfMessage) + \'...\' : item.msg\n                  }}\n                </ion-col>\n                <ion-col text-left *ngIf="item.isClickViewMore">\n                  {{ item.msg}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-right style="color: #274a86;">\n                  <p *ngIf="item.msg.length > maxLengthOfMessage" (click)="showFullMessage(item)">\n                    {{!item.isClickViewMore\n                    ?\n                    \'View More\' : \'View Less\'}}</p>\n                </ion-col>\n              </ion-row>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-row>\n    </ion-row>\n\n    <!-- Display if \'Medium\' is checked -->\n    <ion-row *ngIf="checkedItems[\'Medium\']">\n      <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of filteredNotificationMessages">\n        <ion-row *ngIf="item.priority==\'Medium\'">\n          <ion-col col-1>\n            <ion-checkbox color="dark" [checked]="isNotificationMessageSelected(item.id)"\n              (click)="NotificationSelectedMessage(item.id)"></ion-checkbox>\n          </ion-col>\n          <ion-col col-11 style="border-radius: 5px;" (click)="notificationReadMessage(item)"\n            [style.font-weight]="item.isReadMessage ? \'normal\' : \'bold\'"\n            [style.background]="item.priority==\'High\' ? \'red\' : \'normal\'"\n            [style.background]="item.priority==\'Medium\' ? \'orange\' : \'normal\'"\n            [style.background]="item.priority==\'Low\' ? \'yellow\' : \'normal\'">\n            <div style="background: #ffffff; padding: 10px; border-radius: 5px; margin-left: 5px;">\n              <ion-row> <ion-col text-left>{{item.name}}</ion-col> </ion-row>\n              <ion-row>\n                <ion-col col-6 text-left><ion-icon name="calendar"> </ion-icon> {{item.date}}</ion-col>\n                <ion-col col-6 text-right><ion-icon name="time"> </ion-icon> {{item.date}}</ion-col>\n              </ion-row>\n              <!-- <ion-row> <ion-col text-left>{{item.msg}}</ion-col> </ion-row>\n          <ion-row> <ion-col text-right style="color: #274a86;">View More</ion-col> </ion-row> -->\n              <ion-row>\n                <ion-col text-left *ngIf="!item.isClickViewMore">\n                  {{ item.msg.length > maxLengthOfMessage ? (item.msg | slice:0:maxLengthOfMessage) + \'...\' : item.msg\n                  }}\n                </ion-col>\n                <ion-col text-left *ngIf="item.isClickViewMore">\n                  {{ item.msg}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-right style="color: #274a86;">\n                  <p *ngIf="item.msg.length > maxLengthOfMessage" (click)="showFullMessage(item)">\n                    {{!item.isClickViewMore\n                    ?\n                    \'View More\' : \'View Less\'}}</p>\n                </ion-col>\n              </ion-row>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-row>\n    </ion-row>\n\n    <!-- Display if \'Low\' is checked -->\n    <ion-row *ngIf="checkedItems[\'Low\']">\n      <ion-row style="margin-top: 10px;" align-items-center *ngFor="let item of filteredNotificationMessages">\n        <ion-row *ngIf="item.priority==\'Low\'">\n          <ion-col col-1>\n            <ion-checkbox color="dark" [checked]="isNotificationMessageSelected(item.id)"\n              (click)="NotificationSelectedMessage(item.id)"></ion-checkbox>\n          </ion-col>\n          <ion-col col-11 style="border-radius: 5px;" (click)="notificationReadMessage(item)"\n            [style.font-weight]="item.isReadMessage ? \'normal\' : \'bold\'"\n            [style.background]="item.priority==\'High\' ? \'red\' : \'normal\'"\n            [style.background]="item.priority==\'Medium\' ? \'orange\' : \'normal\'"\n            [style.background]="item.priority==\'Low\' ? \'yellow\' : \'normal\'">\n            <div style="background: #ffffff; padding: 10px; border-radius: 5px; margin-left: 5px;">\n              <ion-row> <ion-col text-left>{{item.name}}</ion-col> </ion-row>\n              <ion-row>\n                <ion-col col-6 text-left><ion-icon name="calendar"> </ion-icon> {{item.date}}</ion-col>\n                <ion-col col-6 text-right><ion-icon name="time"> </ion-icon> {{item.date}}</ion-col>\n              </ion-row>\n              <!-- <ion-row> <ion-col text-left>{{item.msg}}</ion-col> </ion-row>\n          <ion-row> <ion-col text-right style="color: #274a86;">View More</ion-col> </ion-row> -->\n              <ion-row>\n                <ion-col text-left *ngIf="!item.isClickViewMore">\n                  {{ item.msg.length > maxLengthOfMessage ? (item.msg | slice:0:maxLengthOfMessage) + \'...\' : item.msg\n                  }}\n                </ion-col>\n                <ion-col text-left *ngIf="item.isClickViewMore">\n                  {{ item.msg}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col text-right style="color: #274a86;">\n                  <p *ngIf="item.msg.length > maxLengthOfMessage" (click)="showFullMessage(item)">\n                    {{!item.isClickViewMore\n                    ?\n                    \'View More\' : \'View Less\'}}</p>\n                </ion-col>\n              </ion-row>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-row>\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\notifications\notifications.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RealizationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__statistics_statistics__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RealizationPage = (function () {
    function RealizationPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.FilterList = ["MTD"];
        this.RealizationDetails = {};
        this.JobCardListRealization = [];
        this.FinalJobCardListRealization = [];
        this.SelectedFilter = "2";
        this.SelectedFilterName = "Last 7 Days";
        this.IsSorted = false;
        this.global.HeaderTitle = "Realization";
        this.LastDay = new Date(new Date().setDate(new Date().getDate() - 1));
        var date = new Date();
        var date1 = new Date();
        var d1 = new Date(date.setMonth(date.getMonth() - 6));
        this.Last6Month = d1.getFullYear() + "-" + ((d1.getMonth() + 1) > 9 ? (d1.getMonth() + 1) : ("0" + (d1.getMonth() + 1))) + "-" + ((d1.getDate() + 1) > 9 ? (d1.getDate()) : ("0" + (d1.getDate())));
        this.TodaysDate = date1.getFullYear() + "-" + ((date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : ("0" + (date1.getMonth() + 1))) + "-" + ((date1.getDate() + 1) > 9 ? (date1.getDate()) : ("0" + (date1.getDate())));
    }
    RealizationPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            var fromDate_1;
            var toDate_1;
            if (this.SelectedFilter == "6") {
                var d1 = new Date(this.SearchFromDate);
                fromDate_1 = d1.getFullYear() + "-" + ((d1.getMonth() + 1) > 9 ? (d1.getMonth() + 1) : ("0" + (d1.getMonth() + 1))) + "-" + ((d1.getDate() + 1) > 9 ? (d1.getDate()) : ("0" + (d1.getDate())));
                var d2 = new Date(this.SearchToDate);
                toDate_1 = d2.getFullYear() + "-" + ((d2.getMonth() + 1) > 9 ? (d2.getMonth() + 1) : ("0" + (d2.getMonth() + 1))) + "-" + ((d2.getDate() + 1) > 9 ? (d2.getDate()) : ("0" + (d2.getDate())));
            }
            else {
                fromDate_1 = this.TodaysDate;
                toDate_1 = this.TodaysDate;
            }
            this.httpClient.get(this.global.HostedPath + "GetDashboardRealization?BranchID=" + this.global.UserDetails[0].BranchID + "&Type=" + this.SelectedFilter + "&FromeDate=" + fromDate_1 + "&ToDate=" + toDate_1).subscribe(function (result) {
                if (result.StatusCode == 200) {
                    _this.RealizationDetails = JSON.parse(result.Output)[0];
                    console.log(_this.RealizationDetails);
                    _this.httpClient.get(_this.global.HostedPath + "GetJobCardListRealization?BranchID=" + _this.global.UserDetails[0].BranchID + "&Type=" + _this.SelectedFilter + "&FromeDate=" + fromDate_1 + "&ToDate=" + toDate_1).subscribe(function (result) {
                        if (result.StatusCode == 200) {
                            _this.JobCardListRealization = JSON.parse(result.Output);
                            _this.FinalJobCardListRealization = Object.assign([], _this.JobCardListRealization);
                            console.log(_this.FinalJobCardListRealization);
                        }
                        else {
                            console.log(result);
                            _this.global.ToastShow("Something went wrong, Pls try again later");
                        }
                        _this.global.LoadingHide();
                    }, function (error) {
                        console.log(error);
                        _this.global.LoadingHide();
                    });
                }
                else {
                    console.log(result);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    RealizationPage.prototype.FilterClick1 = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Duration',
            inputs: [
                {
                    type: 'radio',
                    label: 'YTD',
                    value: "5",
                    checked: (this.SelectedFilter == "5") ? true : false
                },
                {
                    type: 'radio',
                    label: 'LM',
                    value: "4",
                    checked: (this.SelectedFilter == "4") ? true : false
                },
                {
                    type: 'radio',
                    label: 'MTD',
                    value: "3",
                    checked: (this.SelectedFilter == "3") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Last 7 Days',
                    value: "2",
                    checked: (this.SelectedFilter == "2") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Last Day',
                    value: "1",
                    checked: (this.SelectedFilter == "1") ? true : false
                },
                {
                    type: 'radio',
                    label: 'Date Range',
                    value: "6",
                    checked: (this.SelectedFilter == "6") ? true : false
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.SelectedFilter = data;
                        switch (data) {
                            case "1":
                                _this.SelectedFilterName = "Last Day";
                                break;
                            case "2":
                                _this.SelectedFilterName = "Last 7 Days";
                                break;
                            case "3":
                                _this.SelectedFilterName = "MTD";
                                break;
                            case "4":
                                _this.SelectedFilterName = "LM";
                                break;
                            case "5":
                                _this.SelectedFilterName = "YTD";
                                break;
                            case "6":
                                _this.SelectedFilterName = "Date Range";
                                break;
                            default:
                                _this.SelectedFilterName = "Last 7 Days";
                                break;
                        }
                        if (_this.SelectedFilter != "6") {
                            _this.ngOnInit();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    RealizationPage.prototype.FilterClick = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select filter option',
            buttons: [
                {
                    text: 'Last Day',
                    handler: function () {
                        _this.SelectedFilter = "1";
                        _this.SelectedFilterName = "Last Day";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'Last 7 Days',
                    handler: function () {
                        _this.SelectedFilter = "2";
                        _this.SelectedFilterName = "Last 7 Days";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'MTD',
                    handler: function () {
                        _this.SelectedFilter = "3";
                        _this.SelectedFilterName = "MTD";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'LM',
                    handler: function () {
                        _this.SelectedFilter = "4";
                        _this.SelectedFilterName = "LM";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'YTD',
                    handler: function () {
                        _this.SelectedFilter = "5";
                        _this.SelectedFilterName = "YTD";
                        _this.ngOnInit();
                    }
                },
                {
                    text: 'Date Range',
                    handler: function () {
                        _this.SelectedFilter = "6";
                        _this.SelectedFilterName = "Date Range";
                    }
                }
            ],
            enableBackdropDismiss: true
        });
        actionSheet.present();
    };
    RealizationPage.prototype.RemoveFilteredata = function (data) {
        this.FilterList.splice(data, 1);
    };
    RealizationPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__["a" /* DashboardPage */]);
    };
    RealizationPage.prototype.StatsClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__statistics_statistics__["a" /* StatisticsPage */]);
    };
    RealizationPage.prototype.JCSearch = function (val) {
        this.FinalJobCardListRealization = this.JobCardListRealization.filter(function (e) { return e.OrderNo.toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.RealizationPerc.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.RealizationDiff.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.Jobtype.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.BilledHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.WorkedHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || e.Ageing.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
    };
    RealizationPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJobCardListRealization.sort(function (_a, _b) {
                var a = _a.RealizationPerc;
                var b = _b.RealizationPerc;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJobCardListRealization = Object.assign([], this.JobCardListRealization);
            this.IsSorted = false;
        }
    };
    RealizationPage.prototype.SearchClick = function () {
        if (this.SearchFromDate != undefined && this.SearchFromDate != null && this.SearchFromDate != ""
            && this.SearchToDate != undefined && this.SearchToDate != null && this.SearchToDate != "") {
            this.ngOnInit();
        }
        else {
            this.global.ToastShow("Please enter From date and To date");
        }
    };
    RealizationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-realization',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\realization\realization.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content style="background: #fff;">\n\n  <ion-grid  style="padding-left: 10px;padding-right: 10px;">\n\n    <ion-row style="padding: 10px;">\n      <ion-col col-10 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" [(ngModel)]="JCSearchText" style="border: none;"\n          (keyup)="JCSearch(JCSearchText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;">\n        <img src="assets/imgs/bar-chart.png" style="width:15px;margin-top: 8px;" (click)="StatsClick()">\n      </ion-col>\n    </ion-row>\n\n    <div style="height: 78.7vh;overflow-y: scroll;">\n\n      <!-- Filtered -->\n      <ion-grid>\n        <ion-row style="margin-bottom: 10px;padding: 10px;">\n          <ion-col col-2>\n            <img src="assets/imgs/Filtered.png" style="height:4.1vh" (click)="FilterClick()">\n          </ion-col>\n          <ion-col style="display: flex;width:auto">\n            <div\n              class="DivFilterLable">\n              {{SelectedFilterName}}\n              <!-- <span style="margin-left:8px;" (click)="RemoveFilteredata(i)">x</span> -->\n            </div>\n          </ion-col>\n        </ion-row>\n        <ion-row *ngIf="SelectedFilter==6">\n          <ion-col col-5 style="display: flex;">\n            <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchFromDate"\n              style="margin: auto;">\n          </ion-col>\n          <ion-col col-5 style="display: flex;">\n            <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchToDate"\n              style="margin: auto;">\n          </ion-col>\n          <ion-col col-2 style="display: flex;">\n            <ion-icon ios="ios-search" md="md-search" style="margin: auto;font-size: 2em;cursor: pointer;"\n              (click)="SearchClick()"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <!-- Main info -->\n      <ion-row style="margin-top: 12px;">\n\n        <ion-col col style="font-size: 18px;font-weight: bold;">Realization</ion-col>\n\n        <ion-col col-3\n          style="color:#294785;font-size: 18px;font-weight: bold;">{{RealizationDetails.RealizationPerc}}%</ion-col>\n\n        <ion-col col-1>\n          <img src="assets/imgs/decrease.png" *ngIf="RealizationDetails.RealizationDiff<0"\n            style="width:8px;float:inline-end;margin-top: 0.4vh;height: 12px;">\n          <img src="assets/imgs/increase.png" *ngIf="RealizationDetails.RealizationDiff>0"\n            style="width:12px;float:inline-end;margin-top: 0.4vh;">\n        </ion-col>\n\n        <ion-col col-1\n          [style.color]="(RealizationDetails.RealizationDiff<0)?\'red\':\'green\'">{{RealizationDetails.RealizationDiff}}\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row style="margin-top: 10px;margin-right: 5vh;font-weight: 500;">\n        <ion-col col-2\n          style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">YTD</ion-col>\n        <ion-col col-2\n          style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">LM</ion-col>\n        <ion-col col-2\n          style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">MTD</ion-col>\n        <ion-col col-3 style="font-size: 12px;color:#808080;border-right: 1px solid #808080;text-align: center;">Last 7\n          Days</ion-col>\n        <ion-col col-3 style="font-size: 12px;color:#808080;text-align: center;">Last Day<br />\n          <span style="font-size: 10px !important;\n        font-weight: 400;">{{LastDay | date:\'dd.MM.yyyy\'}}</span>\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="margin-right: 5vh;">\n        <ion-col col-2\n          style="font-size: 14px;color:#294785;font-weight: bold; border-right: 1px solid #808080;text-align: center;">{{RealizationDetails.YTD}}</ion-col>\n        <ion-col col-2\n          style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{RealizationDetails.LM}}</ion-col>\n        <ion-col col-2\n          style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{RealizationDetails.MTD}}</ion-col>\n        <ion-col col-3\n          style="font-size: 14px;color:#294785;font-weight: bold;border-right: 1px solid #808080;text-align: center;">{{RealizationDetails.Last7Days}}</ion-col>\n        <ion-col col-3\n          style="font-size: 14px;color:#294785;font-weight: bold;text-align: center;">{{RealizationDetails.LastDay}}</ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-4\n          style="text-align: center;padding-right:10px;padding-top:20px;color:#294785;font-size: 16px;font-weight: bold;">\n          {{RealizationDetails.InvoicedJCs}}\n        </ion-col>\n        <ion-col col-4\n          style="text-align: center;padding-top:20px;padding-right:10px;color:#294785;font-size: 16px;font-weight: bold;">\n          {{RealizationDetails.BilledHrs}}\n        </ion-col>\n        <ion-col col-4\n          style="text-align: center;padding-left:10px;padding-top:20px;color:#294785;font-size: 16px;font-weight: bold;">\n          {{RealizationDetails.WorkedHours}}\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-right: 10px;">\n          Invoiced JCs\n        </ion-col>\n        <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-right: 10px;">\n          Billed Hours\n        </ion-col>\n        <ion-col col-4 style="text-align: center;color:#808080;font-size: 14px;font-weight: 500;padding-left: 10px;">\n          Worked Hours\n        </ion-col>\n      </ion-row>\n\n      <ion-row style="text-align: center;margin-top: 10px;">\n        <ion-card>\n          <ion-grid>\n            <ion-row style="padding:12px">\n              <ion-col col-3 style="border-right: 1px solid #808080">\n                <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{RealizationDetails.Lessthan25}}</div>\n                <label style="background: red;padding: 2px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">0-25%</label>\n              </ion-col>\n              <ion-col col-3 style="border-right: 1px solid #808080">\n                <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{RealizationDetails.Between26to50}}</div>\n                <label style="background: orange;padding: 2px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">26-50%</label>\n              </ion-col>\n              <ion-col col-3 style="border-right: 1px solid #808080">\n                <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{RealizationDetails.Between51to75}}</div>\n                <label style="background: yellow;padding: 2px;\n              font-size: 12px;\n              font-weight: 500;\n              border-radius: 5px;">51-75%</label>\n              </ion-col>\n              <ion-col col-3>\n                <div style="font-size: 14px;\n              color: #294785;font-weight: 500;\n              padding:3px;\n              font-size: 13px;">{{RealizationDetails.Morethan75}}</div>\n                <label style="background: green;padding: 2px;\n              font-size: 12px;\n              font-weight: 500;\n              color:#fff;\n              border-radius: 5px;">75%</label>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card>\n      </ion-row>\n\n      <hr>\n\n      <!-- List -->\n      <ion-row>\n        <ion-card *ngFor="let jc of FinalJobCardListRealization;let i=index"\n          [ngClass]="{Clsred: jc.Ageing==1,Clsorange: jc.Ageing==2,Clsyellow: jc.Ageing==3,Clsgreen: jc.Ageing==4}"\n          style="margin:0;border-radius: 5px;margin-left:0;width:100%;margin-bottom:14px;">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-3 style="padding:6px;font-weight: 500;">{{jc.OrderNo}}</ion-col>\n              <ion-col col-2 style="color: #001868;padding:6px;font-weight: 500;">| {{jc.RealizationPerc}}%</ion-col>\n              <ion-col col-1>\n                <img src="assets/imgs/decrease.png" *ngIf="jc.RealizationDiff<0"\n                  style="width:8px;float:inline-end;margin-top: 6px;height: 12px;">\n                <img src="assets/imgs/increase.png" *ngIf="jc.RealizationDiff>0"\n                  style="width:12px;float:inline-end;margin-top: 6px;">\n              </ion-col>\n              <ion-col col-4 [style.color]="(jc.RealizationDiff<0)?\'red\':\'green\'"\n                style="font-size: 12px;padding:6px;font-weight: 600;">{{jc.RealizationDiff}}</ion-col>\n              <ion-col col-2 style="font-weight: 500;text-align: end;">\n                <span\n                  style="padding:3px;padding-top:1px;padding-bottom: 0;font-size: 12px;">{{jc.Jobtype}}</span></ion-col>\n            </ion-row>\n            <ion-row style="margin-top:8px;padding:6px">\n              <ion-col col-3 style="font-size: 13px;color:#808080;font-weight: 500;">Billed Hrs</ion-col>\n              <ion-col col-4 style="font-size: 14px;font-weight: bold;color: #001868">{{jc.BilledHours}} hrs</ion-col>\n              <ion-col col-3 style="font-size: 13px;color:#808080;text-align: end;font-weight: 500">Worked Hrs</ion-col>\n              <ion-col col-2\n                style="font-size: 14px;font-weight: bold;text-align: end;color: #001868">{{jc.WorkedHours}} hrs</ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card>\n      </ion-row>\n\n    </div>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\KPI\realization\realization.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], RealizationPage);
    return RealizationPage;
}());

//# sourceMappingURL=realization.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_Shared_login_login__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_Shared_welcome_welcome__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_Shared_header_header__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_Supervisor_KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_Supervisor_KPI_utilization_utilization__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_Supervisor_KPI_realization_realization__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_Supervisor_KPI_productivity_productivity__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_Supervisor_TechStatus_sctechavl_sctechavl__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_Supervisor_TechStatus_sctechwipl_sctechwipl__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_Supervisor_TechStatus_sctechyts_sctechyts__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_Supervisor_TechStatus_sctechpause_sctechpause__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_Supervisor_KPI_statistics_statistics__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_Supervisor_JCStatus_sesearch_sesearch__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_Supervisor_JCStatus_scpfalist_scpfalist__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_Supervisor_JCStatus_scetdelist_scetdelist__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_Supervisor_JCStatus_scpfadetails_scpfadetails__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_Supervisor_JCStatus_scetdedetails_scetdedetails__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_Supervisor_JCStatus_scallocatedytslist_scallocatedytslist__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_Supervisor_JCStatus_scallocatedytsdetails_scallocatedytsdetails__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_Supervisor_JCStatus_scwiplist_scwiplist__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_Supervisor_JCStatus_scwipdetails_scwipdetails__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_Supervisor_JCStatus_sconholdlist_sconholdlist__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_Supervisor_JCStatus_sconholddetails_sconholddetails__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_Supervisor_JCStatus_sccmptedlist_sccmptedlist__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_Supervisor_JCStatus_sccmpteddetails_sccmpteddetails__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_Supervisor_JCStatus_sccmptedt5plist_sccmptedt5plist__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_Supervisor_JCStatus_sccmptedt5pdetails_sccmptedt5pdetails__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_Supervisor_JCStatus_sccmptedt5dlist_sccmptedt5dlist__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_Supervisor_JCStatus_sccmptedt5ddetails_sccmptedt5ddetails__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_Technician_stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_Technician_strealization_strealization__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_Technician_styts_styts__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_Technician_stwip_stwip__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_Technician_stcompleted_stcompleted__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_Technician_stpaused_stpaused__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_Technician_sependingjc_sependingjc__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_Shared_footer_footer__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_Shared_notifications_notifications__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_Shared_communication_communication__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_Shared_profile_profile__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_Shared_governance_governance__ = __webpack_require__(380);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                //Shared
                __WEBPACK_IMPORTED_MODULE_10__pages_Shared_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_Shared_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_Shared_header_header__["a" /* HeaderPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_Shared_footer_footer__["a" /* FooterPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_Shared_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_Shared_communication_communication__["a" /* CommunicationPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_Shared_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_Shared_governance_governance__["a" /* GovernancePage */],
                //Supervisor
                __WEBPACK_IMPORTED_MODULE_13__pages_Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_Supervisor_KPI_utilization_utilization__["a" /* UtilizationPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_Supervisor_KPI_realization_realization__["a" /* RealizationPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_Supervisor_KPI_productivity_productivity__["a" /* ProductivityPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_Supervisor_TechStatus_sctechavl_sctechavl__["a" /* SctechavlPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_Supervisor_TechStatus_sctechwipl_sctechwipl__["a" /* SctechwiplPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_Supervisor_TechStatus_sctechyts_sctechyts__["a" /* SctechytsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_Supervisor_TechStatus_sctechpause_sctechpause__["a" /* SctechpausePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_Supervisor_KPI_statistics_statistics__["a" /* StatisticsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_Supervisor_JCStatus_sesearch_sesearch__["a" /* SesearchPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_Supervisor_JCStatus_scpfalist_scpfalist__["a" /* ScpfalistPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_Supervisor_JCStatus_scpfadetails_scpfadetails__["a" /* ScpfadetailsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_Supervisor_JCStatus_scetdelist_scetdelist__["a" /* ScetdelistPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_Supervisor_JCStatus_scetdedetails_scetdedetails__["a" /* ScetdedetailsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_Supervisor_JCStatus_scallocatedytslist_scallocatedytslist__["a" /* ScallocatedytslistPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_Supervisor_JCStatus_scallocatedytsdetails_scallocatedytsdetails__["a" /* ScallocatedytsdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_Supervisor_JCStatus_scwiplist_scwiplist__["a" /* ScwiplistPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_Supervisor_JCStatus_scwipdetails_scwipdetails__["a" /* ScwipdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_Supervisor_JCStatus_sconholdlist_sconholdlist__["a" /* SconholdlistPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_Supervisor_JCStatus_sconholddetails_sconholddetails__["a" /* SconholddetailsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_Supervisor_JCStatus_sccmptedlist_sccmptedlist__["a" /* SccmptedlistPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_Supervisor_JCStatus_sccmpteddetails_sccmpteddetails__["a" /* SccmpteddetailsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_Supervisor_JCStatus_sccmptedt5plist_sccmptedt5plist__["a" /* Sccmptedt5plistPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_Supervisor_JCStatus_sccmptedt5pdetails_sccmptedt5pdetails__["a" /* Sccmptedt5pdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_Supervisor_JCStatus_sccmptedt5dlist_sccmptedt5dlist__["a" /* Sccmptedt5dlistPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_Supervisor_JCStatus_sccmptedt5ddetails_sccmptedt5ddetails__["a" /* Sccmptedt5ddetailsPage */],
                //Technician
                __WEBPACK_IMPORTED_MODULE_39__pages_Technician_stdashboard_stdashboard__["a" /* StdashboardPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_Technician_strealization_strealization__["a" /* StrealizationPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_Technician_sependingjc_sependingjc__["a" /* SependingjcPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_Technician_styts_styts__["a" /* StytsPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_Technician_stwip_stwip__["a" /* StwipPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_Technician_stpaused_stpaused__["a" /* StpausedPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_Technician_stcompleted_stcompleted__["a" /* StcompletedPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/Shared/communication/communication.module#CommunicationPageModule', name: 'CommunicationPage', segment: 'communication', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Shared/footer/footer.module#FooterPageModule', name: 'FooterPage', segment: 'footer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Shared/header/header.module#HeaderPageModule', name: 'HeaderPage', segment: 'header', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Shared/governance/governance.module#GovernancePageModule', name: 'GovernancePage', segment: 'governance', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Shared/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Shared/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Shared/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Shared/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/scallocatedytsdetails/scallocatedytsdetails.module#ScallocatedytsdetailsPageModule', name: 'ScallocatedytsdetailsPage', segment: 'scallocatedytsdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/scallocatedytslist/scallocatedytslist.module#ScallocatedytslistPageModule', name: 'ScallocatedytslistPage', segment: 'scallocatedytslist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sccmpteddetails/sccmpteddetails.module#SccmpteddetailsPageModule', name: 'SccmpteddetailsPage', segment: 'sccmpteddetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sccmptedlist/sccmptedlist.module#SccmptedlistPageModule', name: 'SccmptedlistPage', segment: 'sccmptedlist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sccmptedt5ddetails/sccmptedt5ddetails.module#Sccmptedt5ddetailsPageModule', name: 'Sccmptedt5ddetailsPage', segment: 'sccmptedt5ddetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sccmptedt5dlist/sccmptedt5dlist.module#Sccmptedt5dlistPageModule', name: 'Sccmptedt5dlistPage', segment: 'sccmptedt5dlist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sccmptedt5pdetails/sccmptedt5pdetails.module#Sccmptedt5pdetailsPageModule', name: 'Sccmptedt5pdetailsPage', segment: 'sccmptedt5pdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/scetdedetails/scetdedetails.module#ScetdedetailsPageModule', name: 'ScetdedetailsPage', segment: 'scetdedetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sccmptedt5plist/sccmptedt5plist.module#Sccmptedt5plistPageModule', name: 'Sccmptedt5plistPage', segment: 'sccmptedt5plist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/scetdelist/scetdelist.module#ScetdelistPageModule', name: 'ScetdelistPage', segment: 'scetdelist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sconholddetails/sconholddetails.module#SconholddetailsPageModule', name: 'SconholddetailsPage', segment: 'sconholddetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sconholdlist/sconholdlist.module#SconholdlistPageModule', name: 'SconholdlistPage', segment: 'sconholdlist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/scpfadetails/scpfadetails.module#ScpfadetailsPageModule', name: 'ScpfadetailsPage', segment: 'scpfadetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/scpfalist/scpfalist.module#ScpfalistPageModule', name: 'ScpfalistPage', segment: 'scpfalist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/scwipdetails/scwipdetails.module#ScwipdetailsPageModule', name: 'ScwipdetailsPage', segment: 'scwipdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/scwiplist/scwiplist.module#ScwiplistPageModule', name: 'ScwiplistPage', segment: 'scwiplist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/JCStatus/sesearch/sesearch.module#SesearchPageModule', name: 'SesearchPage', segment: 'sesearch', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/KPI/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/KPI/productivity/productivity.module#ProductivityPageModule', name: 'ProductivityPage', segment: 'productivity', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/KPI/realization/realization.module#RealizationPageModule', name: 'RealizationPage', segment: 'realization', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/KPI/statistics/statistics.module#StatisticsPageModule', name: 'StatisticsPage', segment: 'statistics', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/TechStatus/sctechavl/sctechavl.module#SctechavlPageModule', name: 'SctechavlPage', segment: 'sctechavl', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/KPI/utilization/utilization.module#UtilizationPageModule', name: 'UtilizationPage', segment: 'utilization', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/TechStatus/sctechpause/sctechpause.module#SctechpausePageModule', name: 'SctechpausePage', segment: 'sctechpause', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/TechStatus/sctechwipl/sctechwipl.module#SctechwiplPageModule', name: 'SctechwiplPage', segment: 'sctechwipl', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Supervisor/TechStatus/sctechyts/sctechyts.module#SctechytsPageModule', name: 'SctechytsPage', segment: 'sctechyts', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Technician/sependingjc/sependingjc.module#SependingjcPageModule', name: 'SependingjcPage', segment: 'sependingjc', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Technician/stcompleted/stcompleted.module#StcompletedPageModule', name: 'StcompletedPage', segment: 'stcompleted', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Technician/stdashboard/stdashboard.module#StdashboardPageModule', name: 'StdashboardPage', segment: 'stdashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Technician/strealization/strealization.module#StrealizationPageModule', name: 'StrealizationPage', segment: 'strealization', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Technician/stpaused/stpaused.module#StpausedPageModule', name: 'StpausedPage', segment: 'stpaused', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Technician/stwip/stwip.module#StwipPageModule', name: 'StwipPage', segment: 'stwip', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/Technician/styts/styts.module#StytsPageModule', name: 'StytsPage', segment: 'styts', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                //Shared
                __WEBPACK_IMPORTED_MODULE_10__pages_Shared_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_Shared_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_Shared_header_header__["a" /* HeaderPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_Shared_footer_footer__["a" /* FooterPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_Shared_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_Shared_communication_communication__["a" /* CommunicationPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_Shared_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_Shared_governance_governance__["a" /* GovernancePage */],
                //Supervisor
                __WEBPACK_IMPORTED_MODULE_13__pages_Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_Supervisor_KPI_utilization_utilization__["a" /* UtilizationPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_Supervisor_KPI_realization_realization__["a" /* RealizationPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_Supervisor_KPI_productivity_productivity__["a" /* ProductivityPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_Supervisor_TechStatus_sctechavl_sctechavl__["a" /* SctechavlPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_Supervisor_TechStatus_sctechwipl_sctechwipl__["a" /* SctechwiplPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_Supervisor_TechStatus_sctechyts_sctechyts__["a" /* SctechytsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_Supervisor_TechStatus_sctechpause_sctechpause__["a" /* SctechpausePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_Supervisor_KPI_statistics_statistics__["a" /* StatisticsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_Supervisor_JCStatus_sesearch_sesearch__["a" /* SesearchPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_Supervisor_JCStatus_scpfalist_scpfalist__["a" /* ScpfalistPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_Supervisor_JCStatus_scpfadetails_scpfadetails__["a" /* ScpfadetailsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_Supervisor_JCStatus_scetdelist_scetdelist__["a" /* ScetdelistPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_Supervisor_JCStatus_scetdedetails_scetdedetails__["a" /* ScetdedetailsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_Supervisor_JCStatus_scallocatedytslist_scallocatedytslist__["a" /* ScallocatedytslistPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_Supervisor_JCStatus_scallocatedytsdetails_scallocatedytsdetails__["a" /* ScallocatedytsdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_Supervisor_JCStatus_scwiplist_scwiplist__["a" /* ScwiplistPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_Supervisor_JCStatus_scwipdetails_scwipdetails__["a" /* ScwipdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_Supervisor_JCStatus_sconholdlist_sconholdlist__["a" /* SconholdlistPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_Supervisor_JCStatus_sconholddetails_sconholddetails__["a" /* SconholddetailsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_Supervisor_JCStatus_sccmptedlist_sccmptedlist__["a" /* SccmptedlistPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_Supervisor_JCStatus_sccmpteddetails_sccmpteddetails__["a" /* SccmpteddetailsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_Supervisor_JCStatus_sccmptedt5plist_sccmptedt5plist__["a" /* Sccmptedt5plistPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_Supervisor_JCStatus_sccmptedt5pdetails_sccmptedt5pdetails__["a" /* Sccmptedt5pdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_Supervisor_JCStatus_sccmptedt5dlist_sccmptedt5dlist__["a" /* Sccmptedt5dlistPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_Supervisor_JCStatus_sccmptedt5ddetails_sccmptedt5ddetails__["a" /* Sccmptedt5ddetailsPage */],
                //Technician
                __WEBPACK_IMPORTED_MODULE_39__pages_Technician_stdashboard_stdashboard__["a" /* StdashboardPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_Technician_strealization_strealization__["a" /* StrealizationPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_Technician_sependingjc_sependingjc__["a" /* SependingjcPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_Technician_styts_styts__["a" /* StytsPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_Technician_stwip_stwip__["a" /* StwipPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_Technician_stpaused_stpaused__["a" /* StpausedPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_Technician_stcompleted_stcompleted__["a" /* StcompletedPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_global_global__["a" /* GlobalProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScpfalistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scpfadetails_scpfadetails__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ScpfalistPage = (function () {
    function ScpfalistPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.JCList = [];
        this.FinalJCList = [];
        this.FilterList = [];
        this.FilterStatusList = [];
        this.IsSorted = false;
        this.iscardOpen = false;
        this.checkedItems = {};
        this.global.HeaderTitle = "Pending Allocation";
    }
    ScpfalistPage.prototype.ngOnInit = function (val) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetPendingForAllocationJobCardList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.JCList = JSON.parse(jobCards.Output);
                    console.log(_this.JCList);
                    _this.FinalJCList = Object.assign([], _this.JCList);
                    if (val != undefined) {
                        val.complete();
                    }
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScpfalistPage.prototype.JCListClick = function (jc) {
        if (!this.global.IsManager) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__scpfadetails_scpfadetails__["a" /* ScpfadetailsPage */], { data: jc });
        }
    };
    ScpfalistPage.prototype.JCSearch = function (val) {
        this.FinalJCList = this.JCList.filter(function (p) { return p.OrderNo.toLowerCase().trim().includes(val.toString().toLowerCase().trim())
            || p.VehicleNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.JobType.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.CustomerName.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.IsKAMCustomer.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.AgeingHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalJCList);
    };
    ScpfalistPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJCList.sort(function (_a, _b) {
                var a = _a.AgeingHours;
                var b = _b.AgeingHours;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
            this.IsSorted = false;
        }
    };
    ScpfalistPage.prototype.FilterClick = function () {
        var _this = this;
        this.JCList.forEach(function (ele) {
            var i = _this.FilterStatusList.filter(function (j) { return j.name == ele.JobType; }).length;
            if (i == 0 && ele.JobType != "") {
                _this.FilterStatusList.push({
                    name: ele.JobType,
                    isSelected: false,
                    ColorName: ele.ColorName
                });
            }
        });
        this.iscardOpen = !this.iscardOpen;
        console.log(this.FilterStatusList);
    };
    ScpfalistPage.prototype.FilterApplyClick = function () {
        var _this = this;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
            this.iscardOpen = !this.iscardOpen;
        }
        else {
            this.iscardOpen = !this.iscardOpen;
            this.FinalJCList = Object.assign([], this.JCList);
        }
    };
    ScpfalistPage.prototype.FilterCancelClick = function () {
        this.iscardOpen = !this.iscardOpen;
    };
    ScpfalistPage.prototype.RemoveFilteredata = function (data) {
        var _this = this;
        data.isSelected = false;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
        }
        this.iscardOpen = false;
    };
    ScpfalistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scpfalist',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scpfalist\scpfalist.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Pending Allocation {{FinalJCList.length}}</h1>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col-1 *ngIf="FinalJCList.length>0">\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh;cursor: pointer;" (click)="FilterClick()">\n      </ion-col>\n\n      <ion-col style="display: flex;flex-wrap: wrap;margin-left: 10px;">\n        <div *ngFor="let fl of FilterStatusList;let i = index">\n          <div [style.borderColor]="fl.ColorName" *ngIf="fl.isSelected" class="DivFilterStatus">{{fl.name}}\n            <span style="margin-left:8px;" (click)="RemoveFilteredata(fl)">×</span>\n          </div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top: 10px;">\n\n      <ion-card *ngFor="let pl of FinalJCList;let i=index"\n        [ngClass]="{Clsred: pl.Ageing==3,Clsgreen: pl.Ageing==1,Clsyellow: pl.Ageing==2}" class="DivCardList"\n        (click)="JCListClick(pl)">\n\n        <ion-grid>\n\n          <ion-row style="padding:5px">\n            <ion-col col-9>\n              <span class="SpnJCVehicle"><span style="color:#808080;padding-right: 5px;">JC</span>{{pl.OrderNo}} |\n                {{pl.VehicleNo}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n            <ion-col col-2 style="display: flex;" *ngIf="pl.JobType!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.JobType)}}\n              </span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;">\n            <ion-col col-7>\n              <span class="SpnCustomerName"><span>{{pl.CustomerName}}</span>\n                <div *ngIf="pl.IsKAMCustomer" style="display: inline;">\n                  (<span style="font-size: 12px;color:orange;">P</span>)\n                </div>\n              </span>\n            </ion-col>\n            <ion-col col-5 style="text-align: right;">\n              <span style="color:#808080">Ageing</span>\n              <span style="color:#001868">{{global.DisplayTimeFormate(pl.AgeingHours)}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <page-footer>\n  </page-footer>\n</ion-footer>\n\n<div class="DivActionSheet" *ngIf="iscardOpen">\n  <ion-list>\n    <ion-item *ngFor="let item of FilterStatusList">\n      <ion-label>{{item.name}}</ion-label>\n      <ion-checkbox color="dark" [(ngModel)]="item.isSelected"></ion-checkbox>\n    </ion-item>\n    <ion-item ion-start>\n      <h2 (click)="FilterApplyClick()">Apply</h2>\n    </ion-item>\n    <ion-item ion-end>\n      <h2 (click)="FilterCancelClick()">Cancel</h2>\n    </ion-item>\n  </ion-list>\n</div>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scpfalist\scpfalist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ScpfalistPage);
    return ScpfalistPage;
}());

//# sourceMappingURL=scpfalist.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScetdelistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scetdedetails_scetdedetails__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ScetdelistPage = (function () {
    function ScetdelistPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.JCList = [];
        this.FinalJCList = [];
        this.FilterList = [];
        this.FilterStatusList = [];
        this.IsSorted = false;
        this.iscardOpen = false;
        this.checkedItems = {};
        this.global.HeaderTitle = "ETD Exceeded";
    }
    ScetdelistPage.prototype.ngOnInit = function (val) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetETDExceededJobCardList?BranchID=" + this.global.UserDetails[0].BranchID + "&JobCardType=T2PFA").subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.JCList = JSON.parse(jobCards.Output);
                    console.log(_this.JCList);
                    _this.FinalJCList = Object.assign([], _this.JCList);
                    if (val != undefined) {
                        val.complete();
                    }
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScetdelistPage.prototype.JCListClick = function (jc) {
        if (!this.global.IsManager) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__scetdedetails_scetdedetails__["a" /* ScetdedetailsPage */], { data: jc });
        }
    };
    ScetdelistPage.prototype.JCSearch = function (val) {
        this.FinalJCList = this.JCList.filter(function (p) { return p.OrderNo.toLowerCase().trim().includes(val.toString().toLowerCase().trim())
            || p.VehicleNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.JobType.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.CustomerName.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.IsKAMCustomer.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.AgeingHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalJCList);
    };
    ;
    ScetdelistPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJCList.sort(function (_a, _b) {
                var a = _a.AgeingHours;
                var b = _b.AgeingHours;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
            this.IsSorted = false;
        }
    };
    ScetdelistPage.prototype.FilterClick = function () {
        var _this = this;
        this.JCList.forEach(function (ele) {
            var i = _this.FilterStatusList.filter(function (j) { return j.name == ele.JobType; }).length;
            if (i == 0 && ele.JobType != "") {
                _this.FilterStatusList.push({
                    name: ele.JobType,
                    isSelected: false,
                    ColorName: ele.ColorName
                });
            }
        });
        this.iscardOpen = !this.iscardOpen;
        console.log(this.FilterStatusList);
    };
    ScetdelistPage.prototype.FilterApplyClick = function () {
        var _this = this;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
            this.iscardOpen = !this.iscardOpen;
        }
        else {
            this.iscardOpen = !this.iscardOpen;
            this.FinalJCList = Object.assign([], this.JCList);
        }
    };
    ScetdelistPage.prototype.FilterCancelClick = function () {
        this.iscardOpen = !this.iscardOpen;
    };
    ScetdelistPage.prototype.RemoveFilteredata = function (data) {
        var _this = this;
        data.isSelected = false;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
        }
        this.iscardOpen = false;
    };
    ScetdelistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-scetdelist',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scetdelist\scetdelist.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">ETD Exceeded {{FinalJCList.length}}</h1>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col-1 *ngIf="FinalJCList.length>0">\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh;cursor: pointer;" (click)="FilterClick()">\n      </ion-col>\n\n      <ion-col style="display: flex;flex-wrap: wrap;margin-left: 10px;">\n        <div *ngFor="let fl of FilterStatusList;let i = index">\n          <div [style.borderColor]="fl.ColorName" *ngIf="fl.isSelected" class="DivFilterStatus">{{fl.name}}\n            <span style="margin-left:8px;" (click)="RemoveFilteredata(fl)">×</span>\n          </div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top: 10px;">\n\n      <ion-card *ngFor="let pl of FinalJCList;let i=index"\n        [ngClass]="{Clsred: pl.Ageing==3,Clsgreen: pl.Ageing==1,Clsyellow: pl.Ageing==2}"\n        class="DivCardList" (click)="JCListClick(pl)">\n\n        <ion-grid>\n\n          <ion-row style="padding:5px">\n            <ion-col col-9>\n              <span class="SpnJCVehicle"><span style="color:#808080;padding-right: 5px;">JC</span>{{pl.OrderNo}} |\n                {{pl.VehicleNo}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n            <ion-col col-2 style="display: flex;" *ngIf="pl.JobType!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.JobType)}}\n              </span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;">\n            <ion-col col-7>\n              <span class="SpnCustomerName"><span>{{pl.CustomerName}}</span>\n              <div *ngIf="pl.IsKAMCustomer" style="display: inline;">\n                (<span style="font-size: 12px;color:orange;">P</span>)\n              </div></span>\n            </ion-col>\n            <ion-col col-5 style="text-align: right;">\n              <span style="color:#808080">Ageing</span>\n              <span style="color:#001868">{{global.DisplayTimeFormate(pl.AgeingHours)}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;" *ngIf="pl.ETDExceededReason!=\'\'">\n            <ion-col>\n              <span>{{pl.ETDExceededReason}}</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>\n\n<div class="DivActionSheet" *ngIf="iscardOpen">\n  <ion-list>\n    <ion-item *ngFor="let item of FilterStatusList">\n      <ion-label>{{item.name}}</ion-label>\n      <ion-checkbox color="dark" [(ngModel)]="item.isSelected"></ion-checkbox>\n    </ion-item>\n    <ion-item ion-start>\n      <h2 (click)="FilterApplyClick()">Apply</h2>\n    </ion-item>\n    <ion-item ion-end>\n      <h2 (click)="FilterCancelClick()">Cancel</h2>\n    </ion-item>\n  </ion-list>\n</div>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scetdelist\scetdelist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], ScetdelistPage);
    return ScetdelistPage;
}());

//# sourceMappingURL=scetdelist.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScallocatedytslistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scallocatedytsdetails_scallocatedytsdetails__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ScallocatedytslistPage = (function () {
    function ScallocatedytslistPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.JCList = [];
        this.FinalJCList = [];
        this.FilterList = [];
        this.FilterStatusList = [];
        this.IsSorted = false;
        this.iscardOpen = false;
        this.checkedItems = {};
        this.global.HeaderTitle = "Allocated YTS";
    }
    ScallocatedytslistPage.prototype.ngOnInit = function (val) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetAllocatedYTSJobCardList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.JCList = JSON.parse(jobCards.Output);
                    console.log(_this.JCList);
                    _this.FinalJCList = Object.assign([], _this.JCList);
                    if (val != undefined) {
                        val.complete();
                    }
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScallocatedytslistPage.prototype.JCListClick = function (jc) {
        if (!this.global.IsManager) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scallocatedytsdetails_scallocatedytsdetails__["a" /* ScallocatedytsdetailsPage */], { data: jc });
        }
    };
    ScallocatedytslistPage.prototype.JCSearch = function (val) {
        this.FinalJCList = this.JCList.filter(function (p) { return p.OrderNo.toLowerCase().trim().includes(val.toString().toLowerCase().trim())
            || p.VehicleNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.JobType.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.CustomerName.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.IsKAMCustomer.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.AgeingHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalJCList);
    };
    ;
    ScallocatedytslistPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJCList.sort(function (_a, _b) {
                var a = _a.AgeingHours;
                var b = _b.AgeingHours;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
            this.IsSorted = false;
        }
    };
    ScallocatedytslistPage.prototype.FilterClick = function () {
        var _this = this;
        this.JCList.forEach(function (ele) {
            var i = _this.FilterStatusList.filter(function (j) { return j.name == ele.JobType; }).length;
            if (i == 0 && ele.JobType != "") {
                _this.FilterStatusList.push({
                    name: ele.JobType,
                    isSelected: false,
                    ColorName: ele.ColorName
                });
            }
        });
        this.iscardOpen = !this.iscardOpen;
        console.log(this.FilterStatusList);
    };
    ScallocatedytslistPage.prototype.FilterApplyClick = function () {
        var _this = this;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
            this.iscardOpen = !this.iscardOpen;
        }
        else {
            this.iscardOpen = !this.iscardOpen;
            this.FinalJCList = Object.assign([], this.JCList);
        }
    };
    ScallocatedytslistPage.prototype.FilterCancelClick = function () {
        this.iscardOpen = !this.iscardOpen;
    };
    ScallocatedytslistPage.prototype.RemoveFilteredata = function (data) {
        var _this = this;
        data.isSelected = false;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
        }
        this.iscardOpen = false;
    };
    ScallocatedytslistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scallocatedytslist',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scallocatedytslist\scallocatedytslist.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Allocated YTS {{FinalJCList.length}}</h1>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col-1 *ngIf="FinalJCList.length>0">\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh;cursor: pointer;" (click)="FilterClick()">\n      </ion-col>\n\n      <ion-col style="display: flex;flex-wrap: wrap;margin-left: 10px;">\n        <div *ngFor="let fl of FilterStatusList;let i = index">\n          <div [style.borderColor]="fl.ColorName" *ngIf="fl.isSelected" class="DivFilterStatus">{{fl.name}}\n            <span style="margin-left:8px;" (click)="RemoveFilteredata(fl)">×</span>\n          </div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top: 10px;">\n\n      <ion-card *ngFor="let pl of FinalJCList;let i=index"\n        [ngClass]="{Clsred: pl.Ageing==3,Clsgreen: pl.Ageing==1,Clsyellow: pl.Ageing==2}" class="DivCardList"\n        (click)="JCListClick(pl)">\n\n        <ion-grid>\n\n          <ion-row style="padding:5px">\n            <ion-col col-9>\n              <span class="SpnJCVehicle">\n                <span style="color:#808080;padding-right: 5px;">JC</span>\n                {{pl.OrderNo}} | {{pl.VehicleNo}}\n              </span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n            <ion-col col-2 style="display: flex;" *ngIf="pl.JobType!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.JobType)}}\n              </span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;">\n            <ion-col col-7>\n              <span class="SpnCustomerName"><span>{{pl.CustomerName}}</span>\n                <div *ngIf="pl.IsKAMCustomer" style="display: inline;">\n                  (<span style="font-size: 12px;color:orange;">P</span>)\n                </div>\n              </span>\n            </ion-col>\n            <ion-col col-5 style="text-align: right;">\n              <span style="color:#808080">Ageing</span>\n              <span style="color:#001868">{{global.DisplayTimeFormate(pl.AgeingHours)}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <page-footer>\n  </page-footer>\n</ion-footer>\n\n<div class="DivActionSheet" *ngIf="iscardOpen">\n  <ion-list>\n    <ion-item *ngFor="let item of FilterStatusList">\n      <ion-label>{{item.name}}</ion-label>\n      <ion-checkbox color="dark" [(ngModel)]="item.isSelected"></ion-checkbox>\n    </ion-item>\n    <ion-item ion-start>\n      <h2 (click)="FilterApplyClick()">Apply</h2>\n    </ion-item>\n    <ion-item ion-end>\n      <h2 (click)="FilterCancelClick()">Cancel</h2>\n    </ion-item>\n  </ion-list>\n</div>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scallocatedytslist\scallocatedytslist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ScallocatedytslistPage);
    return ScallocatedytslistPage;
}());

//# sourceMappingURL=scallocatedytslist.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScwiplistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scwipdetails_scwipdetails__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ScwiplistPage = (function () {
    function ScwiplistPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.JCList = [];
        this.FinalJCList = [];
        this.FilterList = [];
        this.FilterStatusList = [];
        this.IsSorted = false;
        this.iscardOpen = false;
        this.checkedItems = {};
        this.global.HeaderTitle = "Work in Progress";
    }
    ScwiplistPage.prototype.ngOnInit = function (val) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetWorkInProgressJobCardList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.JCList = JSON.parse(jobCards.Output);
                    console.log(_this.JCList);
                    _this.FinalJCList = Object.assign([], _this.JCList);
                    if (val != undefined) {
                        val.complete();
                    }
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    ScwiplistPage.prototype.JCListClick = function (jc) {
        if (!this.global.IsManager) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scwipdetails_scwipdetails__["a" /* ScwipdetailsPage */], { data: jc });
        }
    };
    ScwiplistPage.prototype.JCSearch = function (val) {
        this.FinalJCList = this.JCList.filter(function (p) { return p.OrderNo.toLowerCase().trim().includes(val.toString().toLowerCase().trim())
            || p.VehicleNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.JobType.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.CustomerName.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.IsKAMCustomer.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.AgeingHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalJCList);
    };
    ;
    ScwiplistPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJCList.sort(function (_a, _b) {
                var a = _a.AgeingHours;
                var b = _b.AgeingHours;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
            this.IsSorted = false;
        }
    };
    ScwiplistPage.prototype.FilterClick = function () {
        var _this = this;
        this.JCList.forEach(function (ele) {
            var i = _this.FilterStatusList.filter(function (j) { return j.name == ele.JobType; }).length;
            if (i == 0 && ele.JobType != "") {
                _this.FilterStatusList.push({
                    name: ele.JobType,
                    isSelected: false,
                    ColorName: ele.ColorName
                });
            }
        });
        this.iscardOpen = !this.iscardOpen;
        console.log(this.FilterStatusList);
    };
    ScwiplistPage.prototype.FilterApplyClick = function () {
        var _this = this;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
            this.iscardOpen = !this.iscardOpen;
        }
        else {
            this.iscardOpen = !this.iscardOpen;
            this.FinalJCList = Object.assign([], this.JCList);
        }
    };
    ScwiplistPage.prototype.FilterCancelClick = function () {
        this.iscardOpen = !this.iscardOpen;
    };
    ScwiplistPage.prototype.RemoveFilteredata = function (data) {
        var _this = this;
        data.isSelected = false;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
        }
        this.iscardOpen = false;
    };
    ScwiplistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scwiplist',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scwiplist\scwiplist.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Work in Progress {{FinalJCList.length}}</h1>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col-1 *ngIf="FinalJCList.length>0">\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh;cursor: pointer;" (click)="FilterClick()">\n      </ion-col>\n\n      <ion-col style="display: flex;flex-wrap: wrap;margin-left: 10px;">\n        <div *ngFor="let fl of FilterStatusList;let i = index">\n          <div [style.borderColor]="fl.ColorName" *ngIf="fl.isSelected" class="DivFilterStatus">{{fl.name}}\n            <span style="margin-left:8px;" (click)="RemoveFilteredata(fl)">×</span>\n          </div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top: 10px;">\n\n      <ion-card *ngFor="let pl of FinalJCList;let i=index"\n        [ngClass]="{Clsred: pl.Ageing==3,Clsgreen: pl.Ageing==1,Clsyellow: pl.Ageing==2}"\n        class="DivCardList" (click)="JCListClick(pl)">\n\n        <ion-grid>\n\n          <ion-row style="padding:5px">\n            <ion-col col-9>\n              <span class="SpnJCVehicle"><span style="color:#808080;padding-right: 5px;">JC</span>{{pl.OrderNo}} |\n                {{pl.VehicleNo}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n            <ion-col col-2 style="display: flex;" *ngIf="pl.JobType!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.JobType)}}\n              </span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;">\n            <ion-col col-7>\n              <span class="SpnCustomerName"><span>{{pl.CustomerName}}</span>\n              <div *ngIf="pl.IsKAMCustomer" style="display: inline;">\n                (<span style="font-size: 12px;color:orange;">P</span>)\n              </div></span>\n            </ion-col>\n            <ion-col col-5 style="text-align: right;">\n              <span style="color:#808080">Ageing</span>\n              <span style="color:#001868">{{global.DisplayTimeFormate(pl.AgeingHours)}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>\n\n<div class="DivActionSheet" *ngIf="iscardOpen">\n  <ion-list>\n    <ion-item *ngFor="let item of FilterStatusList">\n      <ion-label>{{item.name}}</ion-label>\n      <ion-checkbox color="dark" [(ngModel)]="item.isSelected"></ion-checkbox>\n    </ion-item>\n    <ion-item ion-start>\n      <h2 (click)="FilterApplyClick()">Apply</h2>\n    </ion-item>\n    <ion-item ion-end>\n      <h2 (click)="FilterCancelClick()">Cancel</h2>\n    </ion-item>\n  </ion-list>\n</div>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\scwiplist\scwiplist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ScwiplistPage);
    return ScwiplistPage;
}());

//# sourceMappingURL=scwiplist.js.map

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 200,
	"./af.js": 200,
	"./ar": 201,
	"./ar-dz": 202,
	"./ar-dz.js": 202,
	"./ar-kw": 203,
	"./ar-kw.js": 203,
	"./ar-ly": 204,
	"./ar-ly.js": 204,
	"./ar-ma": 205,
	"./ar-ma.js": 205,
	"./ar-ps": 206,
	"./ar-ps.js": 206,
	"./ar-sa": 207,
	"./ar-sa.js": 207,
	"./ar-tn": 208,
	"./ar-tn.js": 208,
	"./ar.js": 201,
	"./az": 209,
	"./az.js": 209,
	"./be": 210,
	"./be.js": 210,
	"./bg": 211,
	"./bg.js": 211,
	"./bm": 212,
	"./bm.js": 212,
	"./bn": 213,
	"./bn-bd": 214,
	"./bn-bd.js": 214,
	"./bn.js": 213,
	"./bo": 215,
	"./bo.js": 215,
	"./br": 216,
	"./br.js": 216,
	"./bs": 217,
	"./bs.js": 217,
	"./ca": 218,
	"./ca.js": 218,
	"./cs": 219,
	"./cs.js": 219,
	"./cv": 220,
	"./cv.js": 220,
	"./cy": 221,
	"./cy.js": 221,
	"./da": 222,
	"./da.js": 222,
	"./de": 223,
	"./de-at": 224,
	"./de-at.js": 224,
	"./de-ch": 225,
	"./de-ch.js": 225,
	"./de.js": 223,
	"./dv": 226,
	"./dv.js": 226,
	"./el": 227,
	"./el.js": 227,
	"./en-au": 228,
	"./en-au.js": 228,
	"./en-ca": 229,
	"./en-ca.js": 229,
	"./en-gb": 230,
	"./en-gb.js": 230,
	"./en-ie": 231,
	"./en-ie.js": 231,
	"./en-il": 232,
	"./en-il.js": 232,
	"./en-in": 233,
	"./en-in.js": 233,
	"./en-nz": 234,
	"./en-nz.js": 234,
	"./en-sg": 235,
	"./en-sg.js": 235,
	"./eo": 236,
	"./eo.js": 236,
	"./es": 237,
	"./es-do": 238,
	"./es-do.js": 238,
	"./es-mx": 239,
	"./es-mx.js": 239,
	"./es-us": 240,
	"./es-us.js": 240,
	"./es.js": 237,
	"./et": 241,
	"./et.js": 241,
	"./eu": 242,
	"./eu.js": 242,
	"./fa": 243,
	"./fa.js": 243,
	"./fi": 244,
	"./fi.js": 244,
	"./fil": 245,
	"./fil.js": 245,
	"./fo": 246,
	"./fo.js": 246,
	"./fr": 247,
	"./fr-ca": 248,
	"./fr-ca.js": 248,
	"./fr-ch": 249,
	"./fr-ch.js": 249,
	"./fr.js": 247,
	"./fy": 250,
	"./fy.js": 250,
	"./ga": 251,
	"./ga.js": 251,
	"./gd": 252,
	"./gd.js": 252,
	"./gl": 253,
	"./gl.js": 253,
	"./gom-deva": 254,
	"./gom-deva.js": 254,
	"./gom-latn": 255,
	"./gom-latn.js": 255,
	"./gu": 256,
	"./gu.js": 256,
	"./he": 257,
	"./he.js": 257,
	"./hi": 258,
	"./hi.js": 258,
	"./hr": 259,
	"./hr.js": 259,
	"./hu": 260,
	"./hu.js": 260,
	"./hy-am": 261,
	"./hy-am.js": 261,
	"./id": 262,
	"./id.js": 262,
	"./is": 263,
	"./is.js": 263,
	"./it": 264,
	"./it-ch": 265,
	"./it-ch.js": 265,
	"./it.js": 264,
	"./ja": 266,
	"./ja.js": 266,
	"./jv": 267,
	"./jv.js": 267,
	"./ka": 268,
	"./ka.js": 268,
	"./kk": 269,
	"./kk.js": 269,
	"./km": 270,
	"./km.js": 270,
	"./kn": 271,
	"./kn.js": 271,
	"./ko": 272,
	"./ko.js": 272,
	"./ku": 273,
	"./ku-kmr": 274,
	"./ku-kmr.js": 274,
	"./ku.js": 273,
	"./ky": 275,
	"./ky.js": 275,
	"./lb": 276,
	"./lb.js": 276,
	"./lo": 277,
	"./lo.js": 277,
	"./lt": 278,
	"./lt.js": 278,
	"./lv": 279,
	"./lv.js": 279,
	"./me": 280,
	"./me.js": 280,
	"./mi": 281,
	"./mi.js": 281,
	"./mk": 282,
	"./mk.js": 282,
	"./ml": 283,
	"./ml.js": 283,
	"./mn": 284,
	"./mn.js": 284,
	"./mr": 285,
	"./mr.js": 285,
	"./ms": 286,
	"./ms-my": 287,
	"./ms-my.js": 287,
	"./ms.js": 286,
	"./mt": 288,
	"./mt.js": 288,
	"./my": 289,
	"./my.js": 289,
	"./nb": 290,
	"./nb.js": 290,
	"./ne": 291,
	"./ne.js": 291,
	"./nl": 292,
	"./nl-be": 293,
	"./nl-be.js": 293,
	"./nl.js": 292,
	"./nn": 294,
	"./nn.js": 294,
	"./oc-lnc": 295,
	"./oc-lnc.js": 295,
	"./pa-in": 296,
	"./pa-in.js": 296,
	"./pl": 297,
	"./pl.js": 297,
	"./pt": 298,
	"./pt-br": 299,
	"./pt-br.js": 299,
	"./pt.js": 298,
	"./ro": 300,
	"./ro.js": 300,
	"./ru": 301,
	"./ru.js": 301,
	"./sd": 302,
	"./sd.js": 302,
	"./se": 303,
	"./se.js": 303,
	"./si": 304,
	"./si.js": 304,
	"./sk": 305,
	"./sk.js": 305,
	"./sl": 306,
	"./sl.js": 306,
	"./sq": 307,
	"./sq.js": 307,
	"./sr": 308,
	"./sr-cyrl": 309,
	"./sr-cyrl.js": 309,
	"./sr.js": 308,
	"./ss": 310,
	"./ss.js": 310,
	"./sv": 311,
	"./sv.js": 311,
	"./sw": 312,
	"./sw.js": 312,
	"./ta": 313,
	"./ta.js": 313,
	"./te": 314,
	"./te.js": 314,
	"./tet": 315,
	"./tet.js": 315,
	"./tg": 316,
	"./tg.js": 316,
	"./th": 317,
	"./th.js": 317,
	"./tk": 318,
	"./tk.js": 318,
	"./tl-ph": 319,
	"./tl-ph.js": 319,
	"./tlh": 320,
	"./tlh.js": 320,
	"./tr": 321,
	"./tr.js": 321,
	"./tzl": 322,
	"./tzl.js": 322,
	"./tzm": 323,
	"./tzm-latn": 324,
	"./tzm-latn.js": 324,
	"./tzm.js": 323,
	"./ug-cn": 325,
	"./ug-cn.js": 325,
	"./uk": 326,
	"./uk.js": 326,
	"./ur": 327,
	"./ur.js": 327,
	"./uz": 328,
	"./uz-latn": 329,
	"./uz-latn.js": 329,
	"./uz.js": 328,
	"./vi": 330,
	"./vi.js": 330,
	"./x-pseudo": 331,
	"./x-pseudo.js": 331,
	"./yo": 332,
	"./yo.js": 332,
	"./zh-cn": 333,
	"./zh-cn.js": 333,
	"./zh-hk": 334,
	"./zh-hk.js": 334,
	"./zh-mo": 335,
	"./zh-mo.js": 335,
	"./zh-tw": 336,
	"./zh-tw.js": 336
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 442;

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SconholdlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sconholddetails_sconholddetails__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SconholdlistPage = (function () {
    function SconholdlistPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.JCList = [];
        this.FinalJCList = [];
        this.FilterList = [];
        this.FilterStatusList = [];
        this.IsSorted = false;
        this.iscardOpen = false;
        this.checkedItems = {};
        this.global.HeaderTitle = "On Hold";
    }
    SconholdlistPage.prototype.ngOnInit = function (val) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetOnHoldJobCardList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.JCList = JSON.parse(jobCards.Output);
                    console.log(_this.JCList);
                    _this.FinalJCList = Object.assign([], _this.JCList);
                    if (val != undefined) {
                        val.complete();
                    }
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SconholdlistPage.prototype.JCListClick = function (jc) {
        if (!this.global.IsManager) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sconholddetails_sconholddetails__["a" /* SconholddetailsPage */], { data: jc });
        }
    };
    SconholdlistPage.prototype.JCSearch = function (val) {
        this.FinalJCList = this.JCList.filter(function (p) { return p.OrderNo.toLowerCase().trim().includes(val.toString().toLowerCase().trim())
            || p.VehicleNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.JobType.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.CustomerName.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.IsKAMCustomer.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.AgeingHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalJCList);
    };
    ;
    SconholdlistPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJCList.sort(function (_a, _b) {
                var a = _a.AgeingHours;
                var b = _b.AgeingHours;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
            this.IsSorted = false;
        }
    };
    SconholdlistPage.prototype.FilterClick = function () {
        var _this = this;
        this.JCList.forEach(function (ele) {
            var i = _this.FilterStatusList.filter(function (j) { return j.name == ele.JobType; }).length;
            if (i == 0 && ele.JobType != "") {
                _this.FilterStatusList.push({
                    name: ele.JobType,
                    isSelected: false,
                    ColorName: ele.ColorName
                });
            }
        });
        this.iscardOpen = !this.iscardOpen;
        console.log(this.FilterStatusList);
    };
    SconholdlistPage.prototype.FilterApplyClick = function () {
        var _this = this;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
            this.iscardOpen = !this.iscardOpen;
        }
        else {
            this.iscardOpen = !this.iscardOpen;
            this.FinalJCList = Object.assign([], this.JCList);
        }
    };
    SconholdlistPage.prototype.FilterCancelClick = function () {
        this.iscardOpen = !this.iscardOpen;
    };
    SconholdlistPage.prototype.RemoveFilteredata = function (data) {
        var _this = this;
        data.isSelected = false;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
        }
        this.iscardOpen = false;
    };
    SconholdlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sconholdlist',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sconholdlist\sconholdlist.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">On Hold {{FinalJCList.length}}</h1>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col-1 *ngIf="FinalJCList.length>0">\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh;cursor: pointer;" (click)="FilterClick()">\n      </ion-col>\n\n      <ion-col style="display: flex;flex-wrap: wrap;margin-left: 10px;">\n        <div *ngFor="let fl of FilterStatusList;let i = index">\n          <div [style.borderColor]="fl.ColorName" *ngIf="fl.isSelected" class="DivFilterStatus">{{fl.name}}\n            <span style="margin-left:8px;" (click)="RemoveFilteredata(fl)">×</span>\n          </div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top: 10px;">\n\n      <ion-card *ngFor="let pl of FinalJCList;let i=index"\n        [ngClass]="{Clsred: pl.Ageing==3,Clsgreen: pl.Ageing==1,Clsyellow: pl.Ageing==2}"\n        class="DivCardList" (click)="JCListClick(pl)">\n\n        <ion-grid>\n\n          <ion-row style="padding:5px">\n            <ion-col col-9>\n              <span class="SpnJCVehicle"><span style="color:#808080;padding-right: 5px;">JC</span>{{pl.OrderNo}} |\n                {{pl.VehicleNo}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n            <ion-col col-2 style="display: flex;" *ngIf="pl.JobType!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.JobType)}}\n              </span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;">\n            <ion-col col-7>\n              <span class="SpnCustomerName"><span>{{pl.CustomerName}}</span>\n              <div *ngIf="pl.IsKAMCustomer" style="display: inline;">\n                (<span style="font-size: 12px;color:orange;">P</span>)\n              </div></span>\n            </ion-col>\n            <ion-col col-5 style="text-align: right;">\n              <span style="color:#808080">Ageing</span>\n              <span style="color:#001868">{{global.DisplayTimeFormate(pl.AgeingHours)}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>\n\n<div class="DivActionSheet" *ngIf="iscardOpen">\n  <ion-list>\n    <ion-item *ngFor="let item of FilterStatusList">\n      <ion-label>{{item.name}}</ion-label>\n      <ion-checkbox color="dark" [(ngModel)]="item.isSelected"></ion-checkbox>\n    </ion-item>\n    <ion-item ion-start>\n      <h2 (click)="FilterApplyClick()">Apply</h2>\n    </ion-item>\n    <ion-item ion-end>\n      <h2 (click)="FilterCancelClick()">Cancel</h2>\n    </ion-item>\n  </ion-list>\n</div>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sconholdlist\sconholdlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], SconholdlistPage);
    return SconholdlistPage;
}());

//# sourceMappingURL=sconholdlist.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SccmptedlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sccmpteddetails_sccmpteddetails__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SccmptedlistPage = (function () {
    function SccmptedlistPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.JCList = [];
        this.FinalJCList = [];
        this.FilterList = [];
        this.FilterStatusList = [];
        this.IsSorted = false;
        this.iscardOpen = false;
        this.checkedItems = {};
        this.global.HeaderTitle = "Completed";
    }
    SccmptedlistPage.prototype.ngOnInit = function (val) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetCompletedJobCardList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.JCList = JSON.parse(jobCards.Output);
                    console.log(_this.JCList);
                    _this.FinalJCList = Object.assign([], _this.JCList);
                    if (val != undefined) {
                        val.complete();
                    }
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    SccmptedlistPage.prototype.JCListClick = function (jc) {
        if (!this.global.IsManager) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sccmpteddetails_sccmpteddetails__["a" /* SccmpteddetailsPage */], { data: jc });
        }
    };
    SccmptedlistPage.prototype.JCSearch = function (val) {
        this.FinalJCList = this.JCList.filter(function (p) { return p.OrderNo.toLowerCase().trim().includes(val.toString().toLowerCase().trim())
            || p.VehicleNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.JobType.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.CustomerName.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.IsKAMCustomer.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.AgeingHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalJCList);
    };
    ;
    SccmptedlistPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJCList.sort(function (_a, _b) {
                var a = _a.AgeingHours;
                var b = _b.AgeingHours;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
            this.IsSorted = false;
        }
    };
    SccmptedlistPage.prototype.FilterClick = function () {
        var _this = this;
        this.JCList.forEach(function (ele) {
            var i = _this.FilterStatusList.filter(function (j) { return j.name == ele.JobType; }).length;
            if (i == 0 && ele.JobType != "") {
                _this.FilterStatusList.push({
                    name: ele.JobType,
                    isSelected: false,
                    ColorName: ele.ColorName
                });
            }
        });
        this.iscardOpen = !this.iscardOpen;
        console.log(this.FilterStatusList);
    };
    SccmptedlistPage.prototype.FilterApplyClick = function () {
        var _this = this;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
            this.iscardOpen = !this.iscardOpen;
        }
        else {
            this.iscardOpen = !this.iscardOpen;
            this.FinalJCList = Object.assign([], this.JCList);
        }
    };
    SccmptedlistPage.prototype.FilterCancelClick = function () {
        this.iscardOpen = !this.iscardOpen;
    };
    SccmptedlistPage.prototype.RemoveFilteredata = function (data) {
        var _this = this;
        data.isSelected = false;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
        }
        this.iscardOpen = false;
    };
    SccmptedlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sccmptedlist',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedlist\sccmptedlist.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Completed {{FinalJCList.length}}</h1>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col-1 *ngIf="FinalJCList.length>0">\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh;cursor: pointer;" (click)="FilterClick()">\n      </ion-col>\n\n      <ion-col style="display: flex;flex-wrap: wrap;margin-left: 10px;">\n        <div *ngFor="let fl of FilterStatusList;let i = index">\n          <div [style.borderColor]="fl.ColorName" *ngIf="fl.isSelected" class="DivFilterStatus">{{fl.name}}\n            <span style="margin-left:8px;" (click)="RemoveFilteredata(fl)">×</span>\n          </div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top: 10px;">\n\n      <ion-card *ngFor="let pl of FinalJCList;let i=index"\n        [ngClass]="{Clsred: pl.Ageing==3,Clsgreen: pl.Ageing==1,Clsyellow: pl.Ageing==2}"\n        class="DivCardList" (click)="JCListClick(pl)">\n\n        <ion-grid>\n\n          <ion-row style="padding:5px">\n            <ion-col col-9>\n              <span class="SpnJCVehicle"><span style="color:#808080;padding-right: 5px;">JC</span>{{pl.OrderNo}} |\n                {{pl.VehicleNo}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n            <ion-col col-2 style="display: flex;" *ngIf="pl.JobType!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.JobType)}}\n              </span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;">\n            <ion-col col-7>\n              <span class="SpnCustomerName"><span>{{pl.CustomerName}}</span>\n              <div *ngIf="pl.IsKAMCustomer" style="display: inline;">\n                (<span style="font-size: 12px;color:orange;">P</span>)\n              </div></span>\n            </ion-col>\n            <ion-col col-5 style="text-align: right;">\n              <span style="color:#808080">Ageing</span>\n              <span style="color:#001868">{{global.DisplayTimeFormate(pl.AgeingHours)}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px">\n            <ion-col col-12>\n              <span style="color:#808080">Billed Hrs</span>\n              <span style="color:#001868">{{pl.BilledHours}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>\n\n<div class="DivActionSheet" *ngIf="iscardOpen">\n  <ion-list>\n    <ion-item *ngFor="let item of FilterStatusList">\n      <ion-label>{{item.name}}</ion-label>\n      <ion-checkbox color="dark" [(ngModel)]="item.isSelected"></ion-checkbox>\n    </ion-item>\n    <ion-item ion-start>\n      <h2 (click)="FilterApplyClick()">Apply</h2>\n    </ion-item>\n    <ion-item ion-end>\n      <h2 (click)="FilterCancelClick()">Cancel</h2>\n    </ion-item>\n  </ion-list>\n</div>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedlist\sccmptedlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], SccmptedlistPage);
    return SccmptedlistPage;
}());

//# sourceMappingURL=sccmptedlist.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_Shared_login_login__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Supervisor_KPI_dashboard_dashboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_Supervisor_KPI_realization_realization__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_Supervisor_JCStatus_scpfalist_scpfalist__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_Supervisor_JCStatus_scetdelist_scetdelist__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_Supervisor_JCStatus_scallocatedytslist_scallocatedytslist__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_Supervisor_JCStatus_scwiplist_scwiplist__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_Supervisor_JCStatus_sconholdlist_sconholdlist__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_Supervisor_JCStatus_sccmptedlist_sccmptedlist__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_Supervisor_JCStatus_sccmptedt5plist_sccmptedt5plist__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_Supervisor_JCStatus_sccmptedt5dlist_sccmptedt5dlist__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_Technician_stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_Shared_profile_profile__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, global, alertCtrl, httpClient, app, camera, actionSheetCtrl, ionicApp) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.global = global;
        this.alertCtrl = alertCtrl;
        this.httpClient = httpClient;
        this.app = app;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ionicApp = ionicApp;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_Shared_login_login__["a" /* LoginPage */];
        this.initializeApp();
        this.platform.registerBackButtonAction(function () {
            _this.BackButtonClick();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.AboutClick = function () {
        console.log(this.global.AutoUpdateDetails);
        var AboutAlert = this.alertCtrl.create({
            title: 'About',
            message: '<center><span>' + this.global.AutoUpdateDetails[0].ApplicationName + '</span> <br/><span></span><br/>Version :' + this.global.AutoUpdateDetails[0].AppStoreVersion + '<br/><span></span><br/>Size : ' + this.global.AutoUpdateDetails[0].AppSize + ' MB<center>',
            buttons: [
                {
                    text: 'OK',
                    cssClass: 'BtnOnePopup',
                    handler: function (data) {
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        AboutAlert.present();
    };
    MyApp.prototype.BackButtonClick = function () {
        var overlayView = this.ionicApp._overlayPortal._views[0];
        if (!(overlayView && overlayView.dismiss)) {
            var nav = this.app.getActiveNavs()[0];
            var activeView = nav.getActive();
            console.log(activeView.name);
            switch (activeView.name) {
                case "LoginPage":
                case "WelcomePage":
                    this.platform.exitApp();
                    break;
                case "DashboardPage":
                case "StdashboardPage":
                    if (!this.global.IsAlertOpen) {
                        this.RegistrationBackClick("Are you sure, you want to Logout?");
                    }
                    break;
                case "UtilizationPage":
                case "RealizationPage":
                case "ProductivityPage":
                case "SctechavlPage":
                case "SctechwiplPage":
                case "SctechytsPage":
                case "SctechpausePage":
                case "ScpfalistPage":
                case "ScetdelistPage":
                case "ScallocatedytslistPage":
                case "ScwiplistPage":
                case "SconholdlistPage":
                case "SccmptedlistPage":
                case "Sccmptedt5plistPage":
                case "Sccmptedt5dlistPage":
                case "GovernancePage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */]);
                    break;
                case "NotificationsPage":
                case "CommunicationPage":
                case "ProfilePage":
                    if (this.global.WelcomeNavigateType == 1) {
                        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_Supervisor_KPI_dashboard_dashboard__["a" /* DashboardPage */]);
                    }
                    else if (this.global.WelcomeNavigateType == 2 || this.global.WelcomeNavigateType == 3) {
                        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_18__pages_Technician_stdashboard_stdashboard__["a" /* StdashboardPage */]);
                    }
                    break;
                case "StatisticsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_Supervisor_KPI_realization_realization__["a" /* RealizationPage */]);
                    break;
                case "ScpfadetailsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_Supervisor_JCStatus_scpfalist_scpfalist__["a" /* ScpfalistPage */]);
                    break;
                case "ScetdedetailsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_Supervisor_JCStatus_scetdelist_scetdelist__["a" /* ScetdelistPage */]);
                    break;
                case "ScallocatedytsdetailsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_Supervisor_JCStatus_scallocatedytslist_scallocatedytslist__["a" /* ScallocatedytslistPage */]);
                    break;
                case "ScwipdetailsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_Supervisor_JCStatus_scwiplist_scwiplist__["a" /* ScwiplistPage */]);
                    break;
                case "SconholddetailsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_14__pages_Supervisor_JCStatus_sconholdlist_sconholdlist__["a" /* SconholdlistPage */]);
                    break;
                case "SccmpteddetailsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_15__pages_Supervisor_JCStatus_sccmptedlist_sccmptedlist__["a" /* SccmptedlistPage */]);
                    break;
                case "Sccmptedt5pdetailsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_16__pages_Supervisor_JCStatus_sccmptedt5plist_sccmptedt5plist__["a" /* Sccmptedt5plistPage */]);
                    break;
                case "Sccmptedt5ddetailsPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_17__pages_Supervisor_JCStatus_sccmptedt5dlist_sccmptedt5dlist__["a" /* Sccmptedt5dlistPage */]);
                    break;
                case "StrealizationPage":
                case "StytsPage":
                case "StwipPage":
                case "StpausedPage":
                case "StcompletedPage":
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_18__pages_Technician_stdashboard_stdashboard__["a" /* StdashboardPage */]);
                    break;
                case "ModalCmp":
                    break;
                default:
                    this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_Shared_login_login__["a" /* LoginPage */]);
                    break;
            }
        }
    };
    MyApp.prototype.LogoutClick = function () {
        if (!this.global.IsAlertOpen) {
            this.RegistrationBackClick("Are you sure, you want to Logout?");
        }
    };
    MyApp.prototype.RegistrationBackClick = function (msg) {
        var _this = this;
        this.global.IsAlertOpen = true;
        var confirm = this.alertCtrl.create({
            title: "Confirm",
            message: msg,
            buttons: [
                {
                    text: 'No',
                    cssClass: "BtnTwoPopup",
                    handler: function () {
                        _this.global.IsAlertOpen = false;
                    }
                },
                {
                    text: 'Yes',
                    cssClass: "BtnTwoPopup",
                    handler: function () {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_Shared_login_login__["a" /* LoginPage */]);
                        _this.global.IsAlertOpen = false;
                        localStorage.clear();
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        confirm.present();
    };
    MyApp.prototype.ProfilePencilClick = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_19__pages_Shared_profile_profile__["a" /* ProfilePage */]);
    };
    MyApp.prototype.FileChangeMethod = function (e) {
        var _this = this;
        console.log(e.target.files[0]);
        var formData = new FormData();
        formData.append("Photo_1", e.target.files[0]);
        this.httpClient.post(this.global.HostedPath + 'UploadFile?EmpCode=' + this.global.UserDetails[0].Code, formData).subscribe(function (imageUploadData) {
            console.log(imageUploadData);
        }, function (error) {
            console.log(error);
            _this.global.ToastShow("Failed to-upload attachments");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\app\app.html"*/`<ion-menu [content]="content" id="MyMenu" auto-hide="false">\n\n  <ion-content>\n\n    <img src="assets/imgs/loginbg.png" style="position: absolute;height:100%;width:100%">\n\n    <div id="DivLoginBG">\n\n      <img src="assets/imgs/EicherLogo2.png" id="ImgLoginLogo" />\n\n      <ion-grid style="background-color: #F2F2F2;position: relative;padding:10px;margin-top:35px;\n      width: 90%;border-radius: 10px;" *ngIf="global.UserDetails.length>0">\n        <ion-row>\n          <ion-col style="margin-top:-4vh">\n            <img [src]="global.UserDetails[0].ProfilePhotoPath" style="width:40%;border-radius: 100%;"\n              *ngIf="global.UserDetails[0].ProfilePhotoPath!=null">\n            <!-- <input type="file" id="FileAttchments" (change)="FileChangeMethod($event)" /> -->\n          </ion-col>\n          <ion-col style="text-align: end;cursor: pointer;" menuClose (click)="ProfilePencilClick()">\n            <img src="assets/imgs/pencil.png">\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col style="padding: 0.5rem;font-weight: 600;">\n            {{global.UserDetails[0].Name}}\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col style="padding: 0.5rem;font-size: 12px;">\n            {{global.UserDetails[0].Designation}} | {{global.UserDetails[0].Code}}\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col style="padding: 0.5rem;font-size: 12px;">\n            Plant {{global.UserDetails[0].BranchCode}}\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n\n    </div>\n\n    <ion-footer>\n      <ion-grid style="padding: 10px;">\n        <ion-row style="margin-left: 15px;" (click)="LogoutClick()">\n          <ion-col col-1>\n            <img src="assets/imgs/logout.png" style="height: 15px;width:15px">\n          </ion-col>\n          <ion-col>\n            <span style="font-weight: 600;">Logout</span>\n          </ion-col>\n        </ion-row>\n        <ion-row style="margin-left: 15px;">\n          <ion-col>\n            <sub style="color:#c3c3c3">Version 1.0.0 (Prod)</sub>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-footer>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content></ion-nav>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicApp */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sccmptedt5plistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sccmptedt5pdetails_sccmptedt5pdetails__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Sccmptedt5plistPage = (function () {
    function Sccmptedt5plistPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.JCList = [];
        this.FinalJCList = [];
        this.FilterList = [];
        this.FilterStatusList = [];
        this.IsSorted = false;
        this.iscardOpen = false;
        this.checkedItems = {};
        this.global.HeaderTitle = "Completed T5 Pending";
    }
    Sccmptedt5plistPage.prototype.ngOnInit = function (val) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetCompletedT5PendingJobCardList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.JCList = JSON.parse(jobCards.Output);
                    console.log(_this.JCList);
                    _this.FinalJCList = Object.assign([], _this.JCList);
                    if (val != undefined) {
                        val.complete();
                    }
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    Sccmptedt5plistPage.prototype.JCListClick = function (jc) {
        if (!this.global.IsManager) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sccmptedt5pdetails_sccmptedt5pdetails__["a" /* Sccmptedt5pdetailsPage */], { data: jc });
        }
    };
    Sccmptedt5plistPage.prototype.JCSearch = function (val) {
        this.FinalJCList = this.JCList.filter(function (p) { return p.OrderNo.toLowerCase().trim().includes(val.toString().toLowerCase().trim())
            || p.VehicleNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.JobType.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.CustomerName.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.IsKAMCustomer.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.AgeingHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalJCList);
    };
    ;
    Sccmptedt5plistPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJCList.sort(function (_a, _b) {
                var a = _a.AgeingHours;
                var b = _b.AgeingHours;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
            this.IsSorted = false;
        }
    };
    Sccmptedt5plistPage.prototype.FilterClick = function () {
        var _this = this;
        this.JCList.forEach(function (ele) {
            var i = _this.FilterStatusList.filter(function (j) { return j.name == ele.JobType; }).length;
            if (i == 0 && ele.JobType != "") {
                _this.FilterStatusList.push({
                    name: ele.JobType,
                    isSelected: false,
                    ColorName: ele.ColorName
                });
            }
        });
        this.iscardOpen = !this.iscardOpen;
        console.log(this.FilterStatusList);
    };
    Sccmptedt5plistPage.prototype.FilterApplyClick = function () {
        var _this = this;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
            this.iscardOpen = !this.iscardOpen;
        }
        else {
            this.iscardOpen = !this.iscardOpen;
            this.FinalJCList = Object.assign([], this.JCList);
        }
    };
    Sccmptedt5plistPage.prototype.FilterCancelClick = function () {
        this.iscardOpen = !this.iscardOpen;
    };
    Sccmptedt5plistPage.prototype.RemoveFilteredata = function (data) {
        var _this = this;
        data.isSelected = false;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
        }
        this.iscardOpen = false;
    };
    Sccmptedt5plistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sccmptedt5plist',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedt5plist\sccmptedt5plist.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Completed T5 Pending {{FinalJCList.length}}</h1>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col-1 *ngIf="FinalJCList.length>0">\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh;cursor: pointer;" (click)="FilterClick()">\n      </ion-col>\n\n      <ion-col style="display: flex;flex-wrap: wrap;margin-left: 10px;">\n        <div *ngFor="let fl of FilterStatusList;let i = index">\n          <div [style.borderColor]="fl.ColorName" *ngIf="fl.isSelected" class="DivFilterStatus">{{fl.name}}\n            <span style="margin-left:8px;" (click)="RemoveFilteredata(fl)">×</span>\n          </div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top: 10px;">\n\n      <ion-card *ngFor="let pl of FinalJCList;let i=index"\n        [ngClass]="{Clsred: pl.Ageing==3,Clsgreen: pl.Ageing==1,Clsyellow: pl.Ageing==2}"\n        class="DivCardList" (click)="JCListClick(pl)">\n\n        <ion-grid>\n\n          <ion-row style="padding:5px">\n            <ion-col col-9>\n              <span class="SpnJCVehicle"><span style="color:#808080;padding-right: 5px;">JC</span>{{pl.OrderNo}} |\n                {{pl.VehicleNo}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n            <ion-col col-2 style="display: flex;" *ngIf="pl.JobType!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.JobType)}}\n              </span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;">\n            <ion-col col-7>\n              <span class="SpnCustomerName"><span>{{pl.CustomerName}}</span>\n              <div *ngIf="pl.IsKAMCustomer" style="display: inline;">\n                (<span style="font-size: 12px;color:orange;">P</span>)\n              </div></span>\n            </ion-col>\n            <ion-col col-5 style="text-align: right;">\n              <span style="color:#808080">Ageing</span>\n              <span style="color:#001868">{{global.DisplayTimeFormate(pl.AgeingHours)}} Hrs</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>\n\n<div class="DivActionSheet" *ngIf="iscardOpen">\n  <ion-list>\n    <ion-item *ngFor="let item of FilterStatusList">\n      <ion-label>{{item.name}}</ion-label>\n      <ion-checkbox color="dark" [(ngModel)]="item.isSelected"></ion-checkbox>\n    </ion-item>\n    <ion-item ion-start>\n      <h2 (click)="FilterApplyClick()">Apply</h2>\n    </ion-item>\n    <ion-item ion-end>\n      <h2 (click)="FilterCancelClick()">Cancel</h2>\n    </ion-item>\n  </ion-list>\n</div>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedt5plist\sccmptedt5plist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], Sccmptedt5plistPage);
    return Sccmptedt5plistPage;
}());

//# sourceMappingURL=sccmptedt5plist.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sccmptedt5dlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sccmptedt5ddetails_sccmptedt5ddetails__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Sccmptedt5dlistPage = (function () {
    function Sccmptedt5dlistPage(navCtrl, navParams, httpClient, global, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.JCList = [];
        this.FinalJCList = [];
        this.FilterList = [];
        this.FilterStatusList = [];
        this.IsSorted = false;
        this.iscardOpen = false;
        this.checkedItems = {};
        this.global.HeaderTitle = "Completed T5 Done";
    }
    Sccmptedt5dlistPage.prototype.ngOnInit = function (val) {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.httpClient.get(this.global.HostedPath + "GetCompletedT5DoneJobCardList?BranchID=" + this.global.UserDetails[0].BranchID).subscribe(function (jobCards) {
                if (jobCards.StatusCode == 200) {
                    _this.JCList = JSON.parse(jobCards.Output);
                    console.log(_this.JCList);
                    _this.FinalJCList = Object.assign([], _this.JCList);
                    if (val != undefined) {
                        val.complete();
                    }
                }
                else {
                    console.log(jobCards);
                    _this.global.ToastShow("Something went wrong, Pls try again later");
                }
                _this.global.LoadingHide();
            }, function (error) {
                console.log(error);
                _this.global.LoadingHide();
            });
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    Sccmptedt5dlistPage.prototype.JCListClick = function (jc) {
        if (!this.global.IsManager) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sccmptedt5ddetails_sccmptedt5ddetails__["a" /* Sccmptedt5ddetailsPage */], { data: jc });
        }
    };
    Sccmptedt5dlistPage.prototype.JCSearch = function (val) {
        this.FinalJCList = this.JCList.filter(function (p) { return p.OrderNo.toLowerCase().trim().includes(val.toString().toLowerCase().trim())
            || p.VehicleNo.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.JobType.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.CustomerName.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.IsKAMCustomer.toString().toLowerCase().trim().includes(val.toLowerCase().trim())
            || p.AgeingHours.toString().toLowerCase().trim().includes(val.toLowerCase().trim()); });
        console.log(this.FinalJCList);
    };
    ;
    Sccmptedt5dlistPage.prototype.JCSortClick = function () {
        if (!this.IsSorted) {
            this.FinalJCList.sort(function (_a, _b) {
                var a = _a.AgeingHours;
                var b = _b.AgeingHours;
                return b - a;
            });
            this.IsSorted = true;
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
            this.IsSorted = false;
        }
    };
    Sccmptedt5dlistPage.prototype.FilterClick = function () {
        var _this = this;
        this.JCList.forEach(function (ele) {
            var i = _this.FilterStatusList.filter(function (j) { return j.name == ele.JobType; }).length;
            if (i == 0 && ele.JobType != "") {
                _this.FilterStatusList.push({
                    name: ele.JobType,
                    isSelected: false,
                    ColorName: ele.ColorName
                });
            }
        });
        this.iscardOpen = !this.iscardOpen;
        console.log(this.FilterStatusList);
    };
    Sccmptedt5dlistPage.prototype.FilterApplyClick = function () {
        var _this = this;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
            this.iscardOpen = !this.iscardOpen;
        }
        else {
            this.iscardOpen = !this.iscardOpen;
            this.FinalJCList = Object.assign([], this.JCList);
        }
    };
    Sccmptedt5dlistPage.prototype.FilterCancelClick = function () {
        this.iscardOpen = !this.iscardOpen;
    };
    Sccmptedt5dlistPage.prototype.RemoveFilteredata = function (data) {
        var _this = this;
        data.isSelected = false;
        var tempList = this.FilterStatusList.filter(function (s) { return s.isSelected; });
        console.log(tempList);
        if (tempList.length > 0) {
            this.FilterList = [];
            this.FinalJCList = [];
            this.JCList.filter(function (ele) {
                var l = tempList.filter(function (a) { return a.name == ele.JobType; });
                if (l.length > 0) {
                    _this.FinalJCList.push(ele);
                }
            });
            console.log(this.FinalJCList);
        }
        else {
            this.FinalJCList = Object.assign([], this.JCList);
        }
        this.iscardOpen = false;
    };
    Sccmptedt5dlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sccmptedt5dlist',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedt5dlist\sccmptedt5dlist.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;">\n        <img src="assets/imgs/search.png" style="width:12px">\n        <input type="text" placeholder="Search" style="border: none;" [(ngModel)]="SerachText"\n          (keyup)="JCSearch(SerachText)">\n      </ion-col>\n      <ion-col col-1 style="text-align: center;" (click)="JCSortClick()">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Completed T5 Done {{FinalJCList.length}}</h1>\n    </ion-row>\n\n    <!-- Filtered -->\n    <ion-row style="margin-top: 12px;">\n\n      <ion-col col-1 *ngIf="FinalJCList.length>0">\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh;cursor: pointer;" (click)="FilterClick()">\n      </ion-col>\n\n      <ion-col style="display: flex;flex-wrap: wrap;margin-left: 10px;">\n        <div *ngFor="let fl of FilterStatusList;let i = index">\n          <div [style.borderColor]="fl.ColorName" *ngIf="fl.isSelected" class="DivFilterStatus">{{fl.name}}\n            <span style="margin-left:8px;" (click)="RemoveFilteredata(fl)">×</span>\n          </div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top: 10px;">\n\n      <ion-card *ngFor="let pl of FinalJCList;let i=index"\n        [ngClass]="{Clsred: pl.Ageing==3,Clsgreen: pl.Ageing==1,Clsyellow: pl.Ageing==2}"\n        class="DivCardList" (click)="JCListClick(pl)">\n\n        <ion-grid>\n\n          <ion-row style="padding:5px">\n            <ion-col col-9>\n              <span class="SpnJCVehicle"><span style="color:#808080;padding-right: 5px;">JC</span>{{pl.OrderNo}} |\n                {{pl.VehicleNo}}</span>\n            </ion-col>\n            <ion-col col-1>\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n            <ion-col col-2 style="display: flex;" *ngIf="pl.JobType!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.JobType)}}\n              </span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top: 0px;">\n            <ion-col col-7>\n              <span class="SpnCustomerName"><span>{{pl.CustomerName}}</span>\n              <div *ngIf="pl.IsKAMCustomer" style="display: inline;">\n                (<span style="font-size: 12px;color:orange;">P</span>)\n              </div></span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px">\n            <ion-col col-6>\n              <span style="color:#808080">FRT Hrs</span>\n              <span style="color:#001868">{{pl.BilledHours}} Hrs</span>\n            </ion-col>\n            <ion-col col-6 style="text-align: right;">\n              <span style="color:#001868">T5 Done</span>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>\n\n<div class="DivActionSheet" *ngIf="iscardOpen">\n  <ion-list>\n    <ion-item *ngFor="let item of FilterStatusList">\n      <ion-label>{{item.name}}</ion-label>\n      <ion-checkbox color="dark" [(ngModel)]="item.isSelected"></ion-checkbox>\n    </ion-item>\n    <ion-item ion-start>\n      <h2 (click)="FilterApplyClick()">Apply</h2>\n    </ion-item>\n    <ion-item ion-end>\n      <h2 (click)="FilterCancelClick()">Cancel</h2>\n    </ion-item>\n  </ion-list>\n</div>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Supervisor\JCStatus\sccmptedt5dlist\sccmptedt5dlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], Sccmptedt5dlistPage);
    return Sccmptedt5dlistPage;
}());

//# sourceMappingURL=sccmptedt5dlist.js.map

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GlobalProvider = (function () {
    function GlobalProvider(http, toastCtrl, loadingCtrl, network) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.HeaderTitle = "";
        this.UserDetails = [{ Designation: "" }];
        this.IsManager = false;
        this.WelcomeNavigateType = 0;
        this.ProfilePhotoPath = "";
        this.SESearchPage = "";
        this.userpasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //HostedPath = "http://localhost:64500/api/EicherAPI2/";                                    //Local debug
        //HostedPath = "http://localhost/EicherWeb_Dev/api/EicherAPI/";                             //Local
        this.HostedPath = "https://namptest.hcltechswnp.com/Eicher_Dev/api/EicherAPI2/"; //Dev
        //HostedPath = "https://namptest.hcltechswnp.com/Eicher_QA/api/EicherAPI2/";                 //Testing
        //HostedPath = "https://namptest.hcltechswnp.com/Eicher_Pilot/api/EicherAPI/";              //Chennai
        //HostedPath = "https://wps_prod.vecv.net/Workshop_Productivity/api/EicherAPI/";            //Live
        //HostedPath = "http://10.210.3.45/Eicher_UAT/api/EicherAPI/";                              //UAT
        this.IsAlertOpen = false;
        this.MasterData = {};
        this.AutoUpdateDetails = [];
        this.ApiGetHeaders = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
            'Authorization': '12345Read'
        });
        this.ApiInsertHeaders = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json'
        });
    }
    GlobalProvider.prototype.ToastShow = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    GlobalProvider.prototype.LoadingShow = function (val) {
        this.load = this.loadingCtrl.create({
            content: val
        });
        this.load.present();
    };
    GlobalProvider.prototype.LoadingHide = function () {
        this.load.dismiss();
    };
    GlobalProvider.prototype.CheckInternetConnection = function () {
        if (this.network.type != "none") {
            if (this.network.type != "2g") {
                return true;
            }
            else {
                this.NetworkMessage = "Poor Network connectivity";
                return false;
            }
        }
        else {
            this.NetworkMessage = "App requires connection to Internet";
            return false;
        }
    };
    GlobalProvider.prototype.DisplayTimeFormate = function (value) {
        var hours = Math.floor(value / 60);
        var minutes = Math.floor(value % 60);
        var h = hours > 9 ? hours : "0" + hours;
        var m = minutes > 9 ? minutes : "0" + minutes;
        return h + ':' + m;
    };
    GlobalProvider.prototype.IsValid = function (username) {
        return this.userpasswordRegex.test(username);
    };
    GlobalProvider.prototype.JobTypeFormat = function (val) {
        if (val != "" && val != null && val != undefined) {
            return val.toString().substr(0, 3);
        }
        else {
            return "";
        }
    };
    GlobalProvider.prototype.OdoMeterFormat = function (val) {
        if (val != "" && val != 0 && val != null && val != undefined) {
            var v = val.toString().split("/");
            return v[0] + " km/ " + v[1] + " hrs";
        }
        else {
            return "";
        }
    };
    GlobalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */]])
    ], GlobalProvider);
    return GlobalProvider;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StytsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StytsPage = (function () {
    function StytsPage(navCtrl, navParams, alertCtrl, global, httpClient) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.httpClient = httpClient;
        this.YtsList = [];
        this.YtsListCopy = [];
        this.sortdesc = true;
        this.global.HeaderTitle = "Yet to Start";
    }
    StytsPage.prototype.ngOnInit = function () {
        if (this.global.CheckInternetConnection()) {
            this.global.LoadingShow("Please wait...");
            this.CallListData();
            this.global.LoadingHide();
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    StytsPage.prototype.BackClick = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__stdashboard_stdashboard__["a" /* StdashboardPage */]);
    };
    StytsPage.prototype.StartClick = function (e) {
        var _this = this;
        console.log(e);
        var confirm = this.alertCtrl.create({
            title: 'Do you want to Start the job ?',
            message: '',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'BtnCancelPopup',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    cssClass: 'BtnYesPopup',
                    handler: function () {
                        console.log('Agree clicked');
                        if (_this.global.CheckInternetConnection()) {
                            _this.httpClient.post(_this.global.HostedPath + "UpdateOnStart?TechnicianID=" + _this.global.UserDetails[0].Employee_IC + "&JobCardHeaderIC=" + e.JobCardHedIC, {}).subscribe(function (result) {
                                console.log(result);
                                if (result.StatusCode == 200) {
                                    _this.global.ToastShow("Job Started");
                                    _this.CallListData();
                                    // this.ngOnInit(undefined);
                                }
                                else if (result.StatusCode == 0) {
                                    _this.global.ToastShow("Please close Previous job to start new JC");
                                    // this.ngOnInit(undefined);
                                }
                                else {
                                    console.log(result);
                                    _this.global.ToastShow("Something went wrong, Pls try again later");
                                }
                            }, function (error) {
                                console.log(error);
                            });
                        }
                        else {
                            _this.global.ToastShow(_this.global.NetworkMessage);
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    StytsPage.prototype.CallListData = function () {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetTechYetToStart?Technician_ID=" + this.global.UserDetails[0].Employee_IC).subscribe(function (list) {
            if (list.StatusCode == 200) {
                _this.YtsList = JSON.parse(list.Output);
                _this.YtsList.sort(function (a, b) { return b.T1 - a.T1; });
                console.log(_this.YtsList);
                _this.YtsListCopy = _this.YtsList;
            }
            else {
                console.log(list);
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
        }, function (error) {
            console.log(error);
            _this.global.LoadingHide();
        });
    };
    StytsPage.prototype.Search = function () {
        var _this = this;
        console.log(this.SrchText);
        this.YtsList = this.YtsListCopy.filter(function (p) { return p.Jobtype.toLowerCase().trim().includes(_this.SrchText.toLowerCase().trim()) ||
            p.OrderNo.toString().includes(_this.SrchText.trim()) ||
            p.VehicleNo.toLowerCase().includes(_this.SrchText.toLowerCase().trim()) ||
            p.IsAppointmentDone.toString().includes(_this.SrchText.trim()) ||
            p.CustomerName.toLowerCase().includes(_this.SrchText.toLowerCase().trim()) ||
            p.ServiceAdvisor.toString().includes(_this.SrchText.trim()) ||
            p.Ageing.toString().includes(_this.SrchText.trim()) ||
            p.T1.toString().includes(_this.SrchText.trim()) ||
            p.EDD.toString().includes(_this.SrchText.trim()) ||
            p.ETD.toString().includes(_this.SrchText.trim()); });
        console.log(this.YtsList);
    };
    StytsPage.prototype.SortClick = function () {
        this.sortdesc = !this.sortdesc;
        if (this.sortdesc) {
            this.YtsList.sort(function (a, b) { return b.T1 - a.T1; });
        }
        else {
            this.YtsList.sort(function (a, b) { return a.T1 - b.T1; });
        }
        console.log(this.YtsList);
    };
    StytsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-styts',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\styts\styts.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding style="background-color: #fff;">\n\n  <ion-grid>\n\n    <!-- Search -->\n    <ion-row>\n      <ion-col col-11 style="border: 1px solid #d3d3d3;border-radius:20px;padding: 5px;display: flex;flex-wrap: wrap;">\n        <img src="assets/imgs/search.png" style="width: 18px;margin-right: 8px;">\n        <ion-input type="text" placeholder="Search" (keyup)="Search($event)" [(ngModel)]="SrchText"\n          style="border: none;margin: 0 !important;"></ion-input>\n        <!-- <input type="text" placeholder="Search" style="border: none;"> -->\n      </ion-col>\n      <ion-col col-1 style="text-align: center;">\n        <img src="assets/imgs/sort.png" style="width:15px;margin-top: 8px;" (click)="SortClick()">\n      </ion-col>\n    </ion-row>\n\n    <!-- total count -->\n    <ion-row style="margin-top: 12px;">\n      <h1 style="font-size: 16px;">Yet to Start {{YtsList.length}}</h1>\n    </ion-row>\n\n    <!-- List -->\n    <ion-row style="margin-top:5px;">\n\n      <ion-card class="DivCard" *ngFor="let pl of YtsList;let i=index"\n        [ngClass]="{Clsred: pl.AgeningSlab ==3,Clsgreen: pl.AgeningSlab ==1,Clsyellow: (pl.AgeningSlab == 2)}">\n\n        <ion-grid style="font-size: 13px;font-weight: 500;">\n\n          <ion-row>\n\n            <ion-col col-8 style="padding:5px">\n              <span class="SpnJCVehicle">\n                <span style="color:#808080;padding-right: 5px;">JC</span>\n                {{pl.OrderNo}} | {{pl.VehicleNo}}\n              </span>\n            </ion-col>\n\n            <ion-col col-1 style="padding:6px;text-align: end;">\n              <img src="assets/imgs/exchange.png" *ngIf="pl.IsRecursive" style="width:12px">\n            </ion-col>\n\n            <ion-col col-1 style="padding:6px;text-align: end;">\n              <img src="assets/imgs/time.png" *ngIf="pl.IsAppointmentDone" style="width:12px">\n            </ion-col>\n\n            <ion-col col-2 style="display: flex;" *ngIf="pl.Jobtype!=\'\'">\n              <span class="SpnJobType" [style.borderColor]="pl.ColorName">\n                {{global.JobTypeFormat(pl.Jobtype)}}\n              </span>\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span>{{pl.CustomerName}}</span>\n              <span *ngIf="pl.IsKAMCustomer!=\'\'">( <span style="color: orange;">{{pl.IsKAMCustomer}}</span>)</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col col-8 style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 5px;color:#808080">SA</span>\n              <span>{{pl.ServiceAdvisor}}</span>\n            </ion-col>\n            <ion-col col-4 style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 10px;color:#808080">T1</span>\n              <span>{{pl.T1 | date:\'dd.MM.yyyy\'}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="padding:5px;padding-top:0px">\n            <ion-col style="font-size: 13px;">\n              <span style="display:inline-block;padding-right: 10px;color:#808080">EDD</span>\n              <span>{{pl.EDD | date:\'dd MMM yyyy\'}} | {{pl.ETD}}</span>\n            </ion-col>\n          </ion-row>\n\n          <ion-row style="margin:1vh;">\n            <ion-col style="text-align: center;">\n              <button (click)="StartClick(pl)" class="BtnStart">Start</button>\n            </ion-col>\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Technician\styts\styts.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]])
    ], StytsPage);
    return StytsPage;
}());

//# sourceMappingURL=styts.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__welcome_welcome__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, httpClient, alertCtrl, global, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.menuCtrl = menuCtrl;
        this.Username = "";
        this.Password = "";
        this.ApplicationID = 1;
        this.ApplicationVersion = 5;
        this.showPassword = false;
        this.menuCtrl.enable(false);
    }
    LoginPage.prototype.ngOnInit = function () {
        var localSession = JSON.parse(localStorage.getItem("Session"));
        console.log(localSession);
        if (localSession != null && localSession.length > 0) {
            var lastLoginDate = new Date(localSession[0].LastLoginDate.toString().split("T")[0]).getTime();
            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1);
            var day = today.getDate() > 9 ? today.getDate() : "0" + today.getDate();
            var date = new Date(year + "-" + month + "-" + day).getTime();
            if (lastLoginDate == date) {
                this.Username = localSession[0].Username;
                this.Password = localSession[0].Password;
                // this.LoginClick();
            }
            else {
                localStorage.clear();
            }
        }
    };
    LoginPage.prototype.LoginClick = function () {
        var _this = this;
        if (this.Username != "" && this.Username != undefined && this.Username != null &&
            this.Password != "" && this.Password != undefined && this.Password != null) {
            if (this.global.CheckInternetConnection()) {
                this.global.LoadingShow("Please wait...");
                this.httpClient.post(this.global.HostedPath + "GetLoginDetails?Username=" + this.Username.trim() + "&Password=" + this.Password.trim(), {}).subscribe(function (loginDetails) {
                    if (loginDetails.StatusCode == 200) {
                        _this.global.UserDetails = JSON.parse(loginDetails.Output);
                        console.log(_this.global.UserDetails);
                        if (_this.global.UserDetails.length > 0) {
                            localStorage.setItem("Session", JSON.stringify(_this.global.UserDetails));
                            if (_this.global.UserDetails[0].ProfilePhoto == "") {
                                _this.global.UserDetails[0].ProfilePhotoPath = "assets/imgs/profile.png";
                            }
                            else {
                                _this.global.UserDetails[0].ProfilePhotoPath = _this.global.HostedPath.split("api")[0] + "/UploadedFiles/" + _this.global.UserDetails[0].ProfilePhoto;
                            }
                            _this.CheckAutoUpdate(_this.global.UserDetails[0].Designation);
                        }
                        else {
                            _this.global.ToastShow("Entered invalid Username or Password");
                            _this.global.LoadingHide();
                        }
                    }
                    else {
                        console.log(loginDetails);
                        _this.global.ToastShow("Something went wrong, Pls try again later");
                        _this.global.LoadingHide();
                    }
                }, function (error) {
                    console.log(error);
                    _this.global.LoadingHide();
                });
            }
            else {
                this.global.ToastShow(this.global.NetworkMessage);
            }
        }
        else {
            this.global.ToastShow("Please enter Username and Password");
        }
    };
    LoginPage.prototype.GetAllMasters = function (user) {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetAllMasters").subscribe(function (masters) {
            if (masters.StatusCode == 200) {
                _this.global.MasterData = JSON.parse(masters.Output);
                console.log(_this.global.MasterData);
                if (user == "Works Manager") {
                    _this.global.IsManager = true;
                    _this.global.WelcomeNavigateType = 1;
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__welcome_welcome__["a" /* WelcomePage */]);
                }
                else if (user == "Floor Supervisor") {
                    _this.global.IsManager = false;
                    _this.global.WelcomeNavigateType = 1;
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__welcome_welcome__["a" /* WelcomePage */]);
                }
                else if (user == "Technician" || user == "Assistant Technician" || user == "Electrician") {
                    _this.CheckTechinicianPendingJC();
                }
                else {
                    _this.global.ToastShow("You are not valid user");
                }
            }
            else {
                console.log(masters);
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
            _this.global.LoadingHide();
        }, function (error) {
            console.log(error);
            _this.global.LoadingHide();
        });
    };
    LoginPage.prototype.CheckTechinicianPendingJC = function () {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetTechnicianPendingJC?TechnicianID=" + this.global.UserDetails[0].Employee_IC).subscribe(function (jobCards) {
            if (jobCards.StatusCode == 200) {
                var jc = JSON.parse(jobCards.Output);
                if (jc.length > 0) {
                    _this.global.WelcomeNavigateType = 4;
                    _this.global.PendingJCData = jc;
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__welcome_welcome__["a" /* WelcomePage */]);
                }
                else {
                    _this.httpClient.get(_this.global.HostedPath + "GetTechDashboardCounts?Technician_ID=" + _this.global.UserDetails[0].Employee_IC + "&Type=1" + "&FromeDate=02/14/2024&ToDate=03/14/2024").subscribe(function (jobCards) {
                        console.log(jobCards);
                        if (jobCards.StatusCode == 200) {
                            if (JSON.parse(jobCards.Output)[0].YTS > 0) {
                                _this.global.WelcomeNavigateType = 3;
                            }
                            else {
                                _this.global.WelcomeNavigateType = 2;
                            }
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__welcome_welcome__["a" /* WelcomePage */]);
                        }
                        else {
                            console.log(jobCards);
                            _this.global.ToastShow("Something went wrong, Pls try again later");
                        }
                    });
                }
            }
            else {
                console.log(jobCards);
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
        }, function (error) {
            console.log(error);
        });
    };
    LoginPage.prototype.CheckAutoUpdate = function (user) {
        var _this = this;
        this.httpClient.get(this.global.HostedPath + "GetAutoUpdateAppDetails?ApplicationID=" + this.ApplicationID).subscribe(function (autoUpdateDetails) {
            if (autoUpdateDetails.StatusCode == 200) {
                var autoUpdate_1 = JSON.parse(autoUpdateDetails.Output);
                console.log(autoUpdate_1);
                _this.global.AutoUpdateDetails = autoUpdate_1;
                if (autoUpdate_1.length > 0) {
                    if ((autoUpdate_1[0].AppVersion > _this.ApplicationVersion) && autoUpdate_1[0].AndroidUpdate) {
                        _this.global.IsAlertOpen = true;
                        var d = new Date(autoUpdate_1[0].FromDate).toString().split(" ");
                        var fromDate = d[2] + "-" + d[1] + "-" + d[3];
                        var RegisterAlert = _this.alertCtrl.create({
                            title: 'Update Availability',
                            message: '<p style="font-weight:600;display:block">Please update the new version</p>Version : ' + autoUpdate_1[0].AppStoreVersion + '<br/>Size : ' + autoUpdate_1[0].AppSize + '<br/>Release Date : ' + fromDate,
                            buttons: [
                                {
                                    text: 'Update',
                                    cssClass: 'BtnOnePopup',
                                    handler: function (data) {
                                        _this.global.IsAlertOpen = false;
                                        window.location.href = autoUpdate_1[0].Android_Link;
                                    }
                                }
                            ],
                            enableBackdropDismiss: false
                        });
                        RegisterAlert.present();
                    }
                    else {
                        _this.GetAllMasters(user);
                    }
                }
                else {
                    _this.GetAllMasters(user);
                }
            }
            else {
                console.log(autoUpdateDetails);
                _this.global.LoadingHide();
                _this.global.ToastShow("Something went wrong, Pls try again later");
            }
        }, function (error) {
            console.log(error);
            _this.global.LoadingHide();
        });
    };
    LoginPage.prototype.ShowClick = function () {
        this.showPassword = !this.showPassword;
    };
    LoginPage.prototype.ForgotPasswordClick = function () {
        var _this = this;
        if (this.global.CheckInternetConnection()) {
            if (this.Username != "") {
                this.global.LoadingShow("Please wait");
                var NewPW_1 = this.Username.substring(0, 1).toUpperCase() + this.GeneratePassword() + "@" + Math.floor(Math.random() * (999 - 100 + 1) + 100);
                this.httpClient.post(this.global.HostedPath + "UpdatePassword?Username=" + this.Username + "&NewPassword=" + NewPW_1, {}).subscribe(function (result) {
                    _this.global.LoadingHide();
                    if (result.StatusCode == 200) {
                        _this.SendPWSMS(NewPW_1, result.Output);
                    }
                    else if (result.StatusCode == 0) {
                        _this.global.ToastShow("Mobile number is not registered, Pls contact Admin");
                    }
                    else if (result.StatusCode == 4) {
                        _this.global.ToastShow("Invalid Username");
                    }
                    else {
                        console.log(result);
                        _this.global.ToastShow("Something went wrong, Pls try again later");
                    }
                }, function (error) {
                    console.log(error);
                    _this.global.LoadingHide();
                });
            }
            else {
                this.global.ToastShow("Please enter Username");
            }
        }
        else {
            this.global.ToastShow(this.global.NetworkMessage);
        }
    };
    LoginPage.prototype.SendPWSMS = function (NewPW, mobile) {
        var _this = this;
        var msg = "Dear " + this.Username + ", Your new password for Eicher ProfiTech Application is " + NewPW + ", Please do not share this password with anyone. Regards, Eicher";
        this.httpClient.get("https://easygosms.in/api/url_api.php?api_key=fSdgaXWDCFLiM3zp&pass=3cMkYVhy9m&senderid=EICHER&dlttempid=1707170988831080871&dlttagid=&message=" + msg + "&dest_mobileno=" + mobile + "&mtype=TXT").subscribe(function (result) {
            console.log(result);
            _this.global.ToastShow("New Password has been sent to your registered mobile number");
            localStorage.clear();
        }, function (error) {
            console.log(error);
            _this.global.ToastShow("New Password has been sent to your registered mobile number");
            localStorage.clear();
        });
    };
    LoginPage.prototype.GeneratePassword = function () {
        var length = 5, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\login\login.html"*/`<ion-content>\n\n  <img src="assets/imgs/loginbg.png" style="position: absolute;height:100%;width:100%">\n\n  <div id="DivLoginBG">\n\n    <img src="assets/imgs/EicherLogo4.png" id="ImgLoginLogo" />\n\n    <img src="assets/imgs/Dashboard.png" style="width: 20%;margin-left: 40%;margin-top: 5%;" />\n\n    <span class="SpnAppName">Eicher ProfiTech</span>\n\n    <div id="DivLoginForm">\n\n      <ion-grid>\n\n        <ion-row>\n          <ion-col>\n            <span class="SpnLoginHeader">Login</span>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <span class="SpnLoginHeader" style="font-size: 1.3rem;color:gray">Login to era of productivity</span>\n          </ion-col>\n        </ion-row>\n\n        <div style="display: flex;margin-left: 17px;">\n          <div style="margin-top:48px;">\n            <img src="assets/imgs/user.png">\n          </div>\n          <div class="floating-label" style="width:78%">\n            <input class="floating-input" type="text" [(ngModel)]="Username" placeholder=" ">\n            <label>User ID</label>\n          </div>\n        </div>\n\n        <div style="display: flex;margin-left: 17px;">\n          <div style="margin-top:48px;">\n            <img src="assets/imgs/lock.png">\n          </div>\n          <div class="floating-label" style="width:78%">\n            <input class="floating-input" type="{{ showPassword ? \'text\' : \'password\' }}" [(ngModel)]="Password"\n              placeholder=" ">\n            <label>Password</label>\n          </div>\n          <div style="margin-top:48px;">\n            <img src="assets/imgs/hide.png" style="width: 6%;margin-left: -55px;position: absolute;"\n              (click)="ShowClick()">\n          </div>\n        </div>\n\n        <div style="margin-top: -10px;text-align: end;margin-right: 12vh;cursor: pointer;"\n          (click)="ForgotPasswordClick()">\n          <span style="color:#294785;font-weight: 600;">Forgot Password?</span>\n        </div>\n\n        <ion-row>\n          <ion-col>\n            <button id="BtnLogin" (click)="LoginClick()">Login</button>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col style="color:gray;margin-left:20px">\n            Version 2.1 (Prod)\n          </ion-col>\n        </ion-row>\n\n        <!-- <ion-row>\n          <ion-col>\n            <span id="SpnSignIn">Don\'t have and account? <span style="text-decoration: underline;color: #fc7328;">Sign\n                in</span></span>\n          </ion-col>\n        </ion-row> -->\n\n      </ion-grid>\n\n    </div>\n\n  </div>\n\n</ion-content>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunicationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommunicationPage = (function () {
    function CommunicationPage(navCtrl, navParams, global, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.SelectedFilter = "2";
        this.SelectedFilterName = "Last 7 Days";
        this.communicationDetails = [{
                id: 1,
                date: '23 Jan 2024',
                msg: 'Recall Campain is relese. please refer document',
            }, {
                id: 2,
                date: '23 Jan 2024',
                msg: 'Recall Campain is relese. please refer document',
            },
            {
                id: 3,
                date: '23 Jan 2024',
                msg: 'Recall Campain is relese. please refer document',
            },
        ];
        this.global.HeaderTitle = "Communication Section";
    }
    // ================================================================ BACKTO NOTIFICATION ==========================================================//
    CommunicationPage.prototype.backToNotification = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__notifications_notifications__["a" /* NotificationsPage */]);
    };
    CommunicationPage.prototype.FilterClick = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select filter option',
            buttons: [
                {
                    text: 'Last Day',
                    handler: function () {
                        _this.SelectedFilter = "1";
                        _this.SelectedFilterName = "Last Day";
                        // this.ngOnInit();
                    }
                },
                {
                    text: 'Last 7 Days',
                    handler: function () {
                        _this.SelectedFilter = "2";
                        _this.SelectedFilterName = "Last 7 Days";
                        // this.ngOnInit();
                    }
                },
                {
                    text: 'MTD',
                    handler: function () {
                        _this.SelectedFilter = "3";
                        _this.SelectedFilterName = "MTD";
                        // this.ngOnInit();
                    }
                },
                {
                    text: 'LM',
                    handler: function () {
                        _this.SelectedFilter = "4";
                        _this.SelectedFilterName = "LM";
                        // this.ngOnInit();
                    }
                },
                {
                    text: 'YTD',
                    handler: function () {
                        _this.SelectedFilter = "5";
                        _this.SelectedFilterName = "YTD";
                        // this.ngOnInit();
                    }
                },
                {
                    text: 'Date Range',
                    handler: function () {
                        _this.SelectedFilter = "6";
                        _this.SelectedFilterName = "Date Range";
                    }
                }
            ],
            enableBackdropDismiss: true
        });
        actionSheet.present();
    };
    CommunicationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-communication',template:/*ion-inline-start:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\communication\communication.html"*/`<ion-header>\n  <page-header></page-header>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-grid>\n    <ion-row align-items-center>\n      <ion-col col-12>\n        <ion-searchbar *ngIf="isAlertOpen" [(ngModel)]="searchText" (ionInput)="filterAlertMessages()"\n          placeholder="Search message"></ion-searchbar>\n        <ion-searchbar *ngIf="isNotificationOpen" [(ngModel)]="searchText" (ionInput)="filterNotificationMessages()"\n          placeholder="Search notification"></ion-searchbar>\n      </ion-col>\n    </ion-row>\n    <ion-row align-items-center>\n      <ion-col col-2>\n        <img src="assets/imgs/Filtered.png" style="height:4.1vh" (click)="FilterClick()">\n      </ion-col>\n      <ion-col style="display: flex;width:auto">\n        <div\n          class="DivFilterLable">\n          {{SelectedFilterName}}\n          <!-- <span style="margin-left:8px;" (click)="RemoveFilteredata(i)">x</span> -->\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf="SelectedFilter==6" style="margin: 10px">\n      <ion-col col-5 style="display: flex;">\n        <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchFromDate"\n          style="margin: auto;">\n      </ion-col>\n      <ion-col col-5 style="display: flex;">\n        <input type="date" class="CustomeDate" [min]="Last6Month" [max]="TodaysDate" [(ngModel)]="SearchToDate"\n          style="margin: auto;">\n      </ion-col>\n      <ion-col col-2 style="display: flex;">\n        <ion-icon ios="ios-search" md="md-search" style="margin: auto;font-size: 2em;cursor: pointer;"\n          (click)="SearchClick()"></ion-icon>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <div style="margin-top: 5vh;margin-bottom: 10vh;">\n    <ion-grid *ngFor="let item of communicationDetails">\n      <div class="communicationmessagerowstyle">\n        <ion-row>\n          <ion-col col-2 text-left>\n            <!-- <ion-icon name="document" style="font-size: 40px; color: #e33239;"></ion-icon> -->\n            <img src="assets/imgs/pdf.png" id="IconMenu" style="width:40px">\n          </ion-col>\n          <ion-col col-10 text-left>{{item.msg}}</ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-12>\n            <hr />\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-12 text-right><ion-icon name="calendar"></ion-icon> {{item.date}}</ion-col>\n        </ion-row>\n      </div>\n    </ion-grid>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n    <page-footer>\n</page-footer>\n</ion-footer>`/*ion-inline-end:"C:\D-Drive\Fellowship\EicherProject\EicherMobileAppP2_1\src\pages\Shared\communication\communication.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], CommunicationPage);
    return CommunicationPage;
}());

//# sourceMappingURL=communication.js.map

/***/ })

},[381]);
//# sourceMappingURL=main.js.map