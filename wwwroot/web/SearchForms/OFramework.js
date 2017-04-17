this.OFramework = new function () {
    var tag = document.getElementById("OFrameworkJS");
    // get domain path
    this.BaseURI = tag.src.search(/searchforms\/oframework/i) > -1 ? tag.src.slice(0, tag.src.search(/searchforms\/oframework/i)) : "../";

    // setup content URI
    this.ContentURI = "";
    if ((this.BaseURI).search(/odyssey\/website/i) > -1) { this.ContentURI = (this.BaseURI).toString().replace(/odyssey\/website/gi, "content"); }
    else if ((this.BaseURI).search(/web/i) > -1) { this.ContentURI = (this.BaseURI).toString().replace(/web/gi, "content"); }

    this.ThemeID = tag.getAttribute("ThemeID") != null ? tag.getAttribute("ThemeID") : "default";
    this.SkinID = tag.getAttribute("SkinID") != null ? tag.getAttribute("SkinID") : "default";
    this.ThemeURI = tag.getAttribute("ThemeURI") != null ? tag.getAttribute("ThemeURI") : this.BaseURI + "SearchForms/Templates/" + this.ThemeID + "/";
    this.DocTypeFix = tag.getAttribute("DocTypeFix") != "false";
    document.write("<link id='OFrameworkCSS' rel='stylesheet' type='text/css' href='" + this.ThemeURI + this.SkinID + ".css'>");

    //name of HTML Elements in Label Tags [ MultiLanguage ].
    this.LabelsID = "Lbl_To,Lbl_From,Lbl_Destinations,Lbl_RoundTrip,Lbl_OneWay,Lbl_MultiCity,Lbl_FlightSearch,Lbl_Flights,Lbl_ArrivalDate,Lbl_DepartureDate,Lbl_Adult,Lbl_FlexibleDates,Lbl_NearbyAirportSearch,Lbl_PreferredAirlines,Lbl_DirectFlights,Lbl_FlexibleFares";              //Set these ID's as Name in HTML.

    /*
    //For Load JQuery
    //Use ojQ insted of $ for jQuery in this version
    var ojQ;
    if (typeof jQuery == 'undefined' || typeof jQuery == null) {
        var jq = document.createElement("script");
        jq.src = "https://code.jquery.com/jquery-latest.min.js";
        jq.onload = function () {
            ojQ = jQuery.noConflict();
        };
        document.querySelector("head").appendChild(jq);
    } else {
        ojQ = jQuery; //assign jQuery Object to ojQ.
    }
    */

    this.Container = null;
    this.GetContainer = function () {
        if (this.Container == null) {
            this.Container = document.createElement("span");
            this.Container.className = "OFContainer";
            this.Container.style.zIndex = 20000;
            document.body.insertBefore(this.Container, document.body.childNodes[0]);
        }
        return this.Container;
    }

    this.Settings = new function () {
        this.Debug = { Enabled: false, Target: "alert" };
        this.Target = { Navigator: false, OS: false, Language: true }
    }
    this.Navigator = new function () {
        this.Platform = "win32"//navigator.platform.toLowerCase();
        this.UserAgent = "msie";
        this.GeoLocation = null;

        var ua = navigator.userAgent;
        if (ua.match(/iPad|iPhone|iPod/i)) this.Platform = "ios";
        if (ua.match(/Android/i)) this.Platform = "android";
        if (ua.match(/RIM Tablet OS|BlackBerry/i)) this.Platform = "bb";

        //if (ua.match(/x11/i)) this.Platform = "unix";
        //if (ua.match(/linux/i)) this.Platform = "linux";
        //if (ua.match(/Mac OS X/i)) this.Platform = "macos";

        if (ua.match(/Firefox/i)) this.UserAgent = "firefox";
        if (ua.match(/Safari/i)) this.UserAgent = "safari";
        if (ua.match(/Opera/i)) this.UserAgent = "opera";
        if (ua.match(/Chrome/i)) this.UserAgent = "chrome";
    }
    this.Globalization = new function () {
        this.CultureInfo = function (id) {
            this.Date = new Object();
            switch (id) {
                case 'fr':
                case '3':
                    {
                        this.LanguageID = "3";
                        this.IsRightToLeft = false;
                        this.Date.Separator = "/";
                        this.Date.Format = "dd/mm/yyyy";
                        this.Date.MonthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
                        this.Date.ShortDayNames = ["di", "lu", "ma", "me", "je", "ve", "sa"];
                        this.Date.DayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
                        break;
                    }
                case 'es':
                case '4':
                    {
                        this.LanguageID = "4";
                        this.IsRightToLeft = false;
                        this.Date.Separator = "/";
                        this.Date.Format = "dd/mm/yyyy";
                        this.Date.MonthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
                        this.Date.ShortDayNames = ["do", "lu", "ma", "mi", "ju", "vi", "sá"];
                        this.Date.DayNames = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
                        break;
                    }
                case 'lt':
                case '5':
                    {
                        this.LanguageID = "5";
                        this.IsRightToLeft = false;
                        this.Date.Separator = ".";
                        this.Date.Format = "yyyy.mm.dd";
                        this.Date.MonthNames = ["sausis", "vasaris", "kovas", "balandis", "gegužė", "birželis", "liepa", "rugpjūtis", "rugsėjis", "spalis", "lapkritis", "gruodis"];
                        this.Date.ShortDayNames = ["S", "P", "A", "T", "K", "Pn", "Š"];
                        this.Date.DayNames = ["sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis"];
                        break;
                    }
                case 'ru':
                case '6':
                    {
                        this.LanguageID = "6";
                        this.IsRightToLeft = false;
                        this.Date.Separator = ".";
                        this.Date.Format = "dd.mm.yyyy";
                        this.Date.MonthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
                        this.Date.ShortDayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
                        this.Date.DayNames = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
                        break;
                    }
                case 'en-GB':
                case '7':
                    {
                        this.LanguageID = "7";
                        this.IsRightToLeft = false;
                        this.Date.Separator = "/";
                        this.Date.Format = "dd/mm/yyyy";
                        this.Date.MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        this.Date.ShortDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
                        this.Date.DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        break;
                    }
                case 'bg':
                case '8':
                    {
                        this.LanguageID = "8";
                        this.IsRightToLeft = false;
                        this.Date.Separator = ".";
                        this.Date.Format = "dd.m.yyyy";
                        this.Date.MonthNames = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
                        this.Date.ShortDayNames = ["не", "по", "вт", "ср", "че", "пе", "съ"];
                        this.Date.DayNames = ["неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота"];
                        break;
                    }
                case 'he':
                case '9':
                    {
                        this.LanguageID = "9";
                        this.IsRightToLeft = true;
                        this.Date.Separator = "/";
                        this.Date.Format = "dd/mm/yyyy";
                        this.Date.MonthNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
                        this.Date.ShortDayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש", ];
                        this.Date.DayNames = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];
                        break;
                    }
                case 'de':
                case '10':
                    {
                        this.LanguageID = "10";
                        this.IsRightToLeft = false;
                        this.Date.Separator = ".";
                        this.Date.Format = "dd.mm.yyyy";
                        this.Date.MonthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
                        this.Date.ShortDayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", ];
                        this.Date.DayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Thrusday", "Freitag", "Samstag"];
                        break;
                    }
                case 'it':
                case '11':
                    {
                        this.LanguageID = "11";
                        this.IsRightToLeft = false;
                        this.Date.Separator = "/";
                        this.Date.Format = "dd/mm/yyyy";
                        this.Date.MonthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
                        this.Date.ShortDayNames = ["Dom", "Lun", "Mar", "Merc", "Gio", "Ven", "Sab", ];
                        this.Date.DayNames = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
                        break;
                    }
                case 'pt':
                case '12':
                    {
                        this.LanguageID = "12";
                        this.IsRightToLeft = false;
                        this.Date.Separator = "/";
                        this.Date.Format = "dd/mm/yyyy";
                        this.Date.MonthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Septembro", "Outubro", "Novembro", "Dezembro"];
                        this.Date.ShortDayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sexta", "Sab", ];
                        this.Date.DayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
                        break;
                    }
                case 'ar':
                case '13':
                    {
                        this.LanguageID = "13";
                        this.IsRightToLeft = true;
                        this.Date.Separator = "/";
                        this.Date.Format = "yyyy/m/d";
                        this.Date.MonthNames = ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"];
                        this.Date.ShortDayNames = ["د", "ن", "ث", "ع", "خ", "ج", "س", ];
                        this.Date.DayNames = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعه", "السبت"];
                        break;
                    }
                case 'chs':
                case '14':
                    {
                        this.LanguageID = "14";
                        this.IsRightToLeft = false;
                        this.Date.Separator = "/";
                        this.Date.Format = "yyyy/m/d";
                        this.Date.MonthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
                        this.Date.ShortDayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                        this.Date.DayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                        break;
                    }
                case 'ja':
                case '15':
                    {
                        this.LanguageID = "15";
                        this.IsRightToLeft = false;
                        this.Date.Separator = "/";
                        this.Date.Format = "yyyy/m/d";
                        this.Date.MonthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
                        this.Date.ShortDayNames = ["日", "月", "火", "水", "木", "金", "土"];
                        this.Date.DayNames = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
                        break;
                    }
                default:
                    {
                        this.LanguageID = "1";
                        this.IsRightToLeft = false;
                        this.Date.Separator = "/";
                        this.Date.Format = "mm/dd/yyyy";
                        this.Date.MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        this.Date.ShortDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
                        this.Date.DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        break;
                    }
            }

            this.GetLanguageCode = function (id) {
                if (id == null) id = this.LanguageID;
                switch (id) {
                    case "3": return "fr"; break;
                    case "4": return "es"; break;
                    case "5": return "lt"; break;
                    case "6": return "ru"; break;
                    case "7": return "gb"; break;
                    case "8": return "bg"; break;
                    case "9": return "he"; break;
                    case "10": return "de"; break;
                    case "11": return "it"; break;
                    case "12": return "pt"; break;
                    case "13": return "ar"; break;
                    case "14": return "chs"; break;
                    case "15": return "ja"; break;
                    default: return "en"; break;
                }
            }
            this.IsDefaultLanguage = function () { return this.LanguageID == "1"; }
        }
    }

    this.Location = function () {
        this.CurrentLocation = new function () {
            this.Latitude = "";
            this.Longitude = "";
            this.Country = "";
            this.City = "";
            this.State = "";
            this.Status = "";
        };
        this.Callback = "";
        var location = this;
        this.Locate = function (obj, iCallback) {
            this.Callback = iCallback;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.getPosition, this.GeoLocFail);
            } else {
                this.GeoLocFail(null);
            }
        }
        this.getPosition = function (position) {
            location.CurrentLocation.Latitude = position.coords.latitude;
            location.CurrentLocation.Longitude = position.coords.longitude;
        };

        this.GeoLocFail = function (error) {
            if (error != null) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        location.CurrentLocation.Status = "PERMISSION_DENIED";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        location.CurrentLocation.Status = "POSITION_UNAVAILABLE";
                        break;
                    case error.TIMEOUT:
                        location.CurrentLocation.Status = "TIMEOUT";
                        break;
                    case error.UNKNOWN_ERROR:
                        location.CurrentLocation.Status = "UNKNOWN_ERROR";
                        break;
                    default:
                        location.CurrentLocation.Status = "UNKNOWN_ERROR";
                        break;
                }
            }
            else {
                location.CurrentLocation.Status = "NOT_SUPPORTED";
            }
            location.Callback.call(null, location.CurrentLocation, true);
        }
    }

    this.date = function (d, m, y) {
        this.ds = new Array(1, 1, 1);
        switch (arguments.length) {
            case 3:
                {
                    y = parseInt(y, 10);
                    m = parseInt(m, 10);
                    d = parseInt(d, 10);
                    this.ds = new Array(d, m, y);
                    if (isNaN(d) || isNaN(m) || isNaN(y) || d < 0 || d > 31 || m < 1 || m > 12 || y < 0) throw ("Invalid date format");
                    break;
                }
            case 1:
                {
                    if (typeof (d) != "object") return null;
                    y = d.getFullYear();
                    m = d.getMonth() + 1;
                    d = d.getDate();
                    this.ds = new Array(d, m, y);
                    break;
                }
                //case 0 : {this.ds = new Array(1,1,1);break;}
        }



        this.get_Day = function () { return this.ds[0]; };
        this.set_Day = function (n) { this.ds[0] = n; };
        this.get_Month = function () { return this.ds[1]; };
        this.set_Month = function (n) { this.ds[1] = n; };
        this.get_Year = function () { return this.ds[2]; };
        this.set_Year = function (n) { this.ds[2] = n; };

        this.Parse = function (s, ci) {
            try {
                var dFormat = ci != null ? ci.Date.Format : OFramework.Culture.Date.Format;
                var dSeparator = ci != null ? ci.Date.Separator : OFramework.Culture.Date.Separator;
                var objDateFormatParts = dFormat.split(dSeparator);
                var objDateParts = s.split(dSeparator);
                for (var i = 0; i < objDateParts.length; i++) {
                    if (objDateFormatParts[i].indexOf("d") > -1) {
                        var objDay = objDateParts[i];
                        continue;
                    }
                    if (objDateFormatParts[i].indexOf("m") > -1) {
                        var objMonth = objDateParts[i];
                        continue;
                    }
                    if (objDateFormatParts[i].indexOf("y") > -1) {
                        var objYear = objDateParts[i];
                        continue;
                    }
                }
                return new OFramework.date(objDay, objMonth, objYear);
            }
            catch (e) { alert(e); return null; }
        }
        this.ToString = function (f) {
            var dFormat = OFramework.Culture.Date.Format;
            var dSeparator = OFramework.Culture.Date.Separator;

            if (arguments.length == 0) f = dFormat;

            var objDateFormatParts = dFormat.split(dSeparator);
            for (var i = 0; i < objDateFormatParts.length; i++) {
                if (objDateFormatParts[i].indexOf("d") > -1) var dayPart = objDateFormatParts[i];
                if (objDateFormatParts[i].indexOf("m") > -1) var monthPart = objDateFormatParts[i];
                if (objDateFormatParts[i].indexOf("y") > -1) var yearPart = objDateFormatParts[i];
            }
            if (monthPart.length > 1 && this.Month < 10) m = "0" + this.Month;
            if (dayPart.length > 1 && this.Day < 10) d = "0" + this.Day;
            if (yearPart.length > 1 && this.Year < 10) y = "0" + this.Year;
            return f.replace(dayPart, d).replace(monthPart, m).replace(yearPart, y);
        }
        this.toString = this.ToString;
        this.parse = this.Parse;

    }

    this.Date = new this.date();
    //d = new Date();
    //d.setFullYear(
    this.DateFromString = function (s) {
        //alert(s);
        try {
            var dFormat = OFramework.Culture.Date.Format;
            var dSeparator = OFramework.Culture.Date.Separator;
            var objDateFormatParts = dFormat.split(dSeparator);
            var objDateParts = s.split(dSeparator);
            for (var i = 0; i < objDateParts.length; i++) {
                if (objDateFormatParts[i].indexOf("d") > -1) {
                    var objDay = objDateParts[i];
                    continue;
                }
                if (objDateFormatParts[i].indexOf("m") > -1) {
                    var objMonth = objDateParts[i];
                    continue;
                }
                if (objDateFormatParts[i].indexOf("y") > -1) {
                    var objYear = objDateParts[i];
                    continue;
                }
            }
            //alert(objYear + " : " + objMonth + " : " + objDay);
            var retObj = new Date();
            retObj.setFullYear(parseInt(objYear, 10), parseInt(objMonth, 10) - 1, parseInt(objDay, 10));
            //alert(retObj);
            return retObj;
        }
        catch (e) { return null; }
    }
    this.DateToString = function (s) {
        var dFormat = OFramework.Culture.Date.Format;
        var dSeparator = OFramework.Culture.Date.Separator;

        var objDateFormatParts = dFormat.split(dSeparator);
        var dayPart; var monthPart; var yearPart;
        for (var i = 0; i < objDateFormatParts.length; i++) {
            if (objDateFormatParts[i].indexOf("d") > -1) dayPart = objDateFormatParts[i];
            if (objDateFormatParts[i].indexOf("m") > -1) monthPart = objDateFormatParts[i];
            if (objDateFormatParts[i].indexOf("y") > -1) yearPart = objDateFormatParts[i];
        }
        var d = s.getDate();
        var m = s.getMonth() + 1;
        var y = s.getFullYear();
        if (monthPart.length > 1 && m < 10) m = "0" + m;
        if (dayPart.length > 1 && d < 10) d = "0" + d;
        if (yearPart.length > 1 && y < 10) y = "0" + y;
        return dFormat.replace(dayPart, d).replace(monthPart, m).replace(yearPart, y);
    }
    Date.prototype.Equals = function (d) {
        if (d == null) return false;
        var d1d = this.getDate();
        var d1m = this.getMonth();
        var d1y = this.getFullYear();

        var d2d = d.getDate();
        var d2m = d.getMonth();
        var d2y = d.getFullYear();

        return (d1d == d2d && d1m == d2m && d1y == d2y);
    }
    Date.prototype.CompareTo = function (d) {
        var d1d = this.getDate();
        var d1m = this.getMonth();
        var d1y = this.getFullYear();
        var d2d = d.getDate();
        var d2m = d.getMonth();
        var d2y = d.getFullYear();

        var date1 = new Date(d1y, d1m, d1d);
        var date2 = new Date(d2y, d2m, d2d);
        if (d1y == d2y && d1m == d2m && d1d == d2d) return 0;
        if (date1 < date2) return -1;
        if (date1 > date2) return 1;
    }
    Date.prototype.ToString = function () {
        if (this == null) return "";
        var d = this.getDate();
        var m = this.getMonth() + 1;
        var y = this.getFullYear();
        if (m < 10) m = "0" + m;
        if (d < 10) d = "0" + d;
        if (y < 10) y = "0" + y;
        return m + "/" + d + "/" + y;
    }
    Date.prototype.Add = function (y, m, d) {
        var obj = new Date();

        obj.setFullYear(this.getFullYear() + y);
        obj.setMonth(this.getMonth() + m);
        obj.setDate(this.getDate() + d);

        return obj;
    }

    this.NumberFromString = function (s) { }
    this.NumberToString = function (s) { }

    this.Array = function () {
        var o = new Array()
        o.Contains = function (val) {
            for (var i = 0; i < this.length; i++) if (this[i] == val) return true;
            return false;
        }
        return o;
    }

    this.Controls = new function () {
        //this._list = new Array();

        this.Control = function () {
            this.ID = null;
            this.Type = "Control";
            this.Container = null;
            this.HTMLElement = null;
            this.Template = null;
            this.Controls = new Array();

            this.Width = 0;
            this.Height = 0;
            this.Top = 0;
            this.Left = 0;

            this.Render = function () {
                if (this.Container != null) {
                    this.Container.innerHTML = this.Template;
                }
                else window.document.write(this.Template);
            }
            this.Register = function () {
                if (OFramework.Controls[this.ID] == null) OFramework.Controls[this.ID] = this;
                else return OFramework.Controls[this.ID];
                //for(var i=0; i<OFramework.Controls._list.length; i++){if(OFramework.Controls._list[i].ID==this.ID){return OFramework.Controls._list[i];}}
                //OFramework.Controls._list[OFramework.Controls._list.length]=this;
            }
        }

        this.IFrame = function () {
            this.Type = "IFrame";
            this.ID = "IFrame";
            this.Template = "<iframe id='OFrame_IFrame' style='display:block;position:absolute' onMouseOut='alert(this)'>";
            this.Register();

            this.Render();
        }
        this.IFrame.prototype = new this.Control();

        this.Overlay = function () {
            if (OFramework.Controls["OFrameworkOverlay"] != null) return OFramework.Controls["OFrameworkOverlay"];
            var o = document.createElement("div");
            o.Type = "Overlay";
            o.className = "overlay";

            o.Show = function () {
                var obj1 = window.document.documentElement;
                var obj2 = window.document.documentElement.ownerDocument.body;
                var obj = obj1.scrollHeight > obj2.scrollHeight ? obj1 : obj2;
                this.style.display = "block";
                this.style.width = obj.scrollWidth + "px";
                this.style.height = (obj.scrollHeight > obj.clientHeight ? obj.scrollHeight : obj.clientHeight) + "px";
                this.style.zIndex = 10000;
            }
            o.Hide = function () {
                this.style.display = "none";
            }

            OFramework.Controls["OFrameworkOverlay"] = o;
            OFramework.GetContainer().appendChild(o);
            return o;
        }

        this.ModalPopUp = function (oContainer) {
            oContainer.Type = "ModalPopUp";
            oContainer.style.display = "none";
            //o.className = "overlay";

            oContainer.Overlay = new OFramework.Controls.Overlay();
            oContainer.Show = function () {
                this.Overlay.Show();
                this.style.display = "block";

                if (OFramework.DocTypeFix) {
                    this.style.position = "absolute";
                    this.style.left = document.body.scrollLeft + (OFramework.getWindowWidth() - this.scrollWidth) / 2 + "px";
                    this.style.top = document.body.scrollTop + (OFramework.getWindowHeight() - this.scrollHeight) / 2 + "px";
                }
                else {
                    this.style.position = "fixed";
                    this.style.left = (OFramework.getWindowWidth() - this.scrollWidth) / 2 + "px";
                    this.style.top = (OFramework.getWindowHeight() - this.scrollHeight) / 2 + "px";
                }
                this.style.zIndex = parseInt(this.Overlay.style.zIndex) + 1;
            }
            oContainer.Close = function () {
                this.style.display = "none";
                this.Overlay.Hide();
            }
            return oContainer;
        }

        this.Dialog = function (oContainer, type, pos) {
            var o = null;
            if (document.getElementById(oContainer.id + "_Dialog" + type) != null) o = document.getElementById(oContainer.id + "_Dialog" + type);
            if (o == null) return null;
            o.addClassName("popup dialog");

            o.Show = function (attachTo) {
                if (OFramework.ActivePopUp != null) OFramework.ActivePopUp.Hide();
                this.AttachedTo = attachTo;
                var left, top, offHeight, offWidth, width, height;
                top = OFramework.getPosTop(attachTo);
                left = OFramework.getPosLeft(attachTo);
                offHeight = this.AttachedTo.offsetHeight;
                this.style.zIndex = -9999;//setting this so that dialog should not show immediately. 
                this.style.display = "block";
                this.style.top = (top + offHeight + 1) + "px";
                this.style.left = left + "px";
                this.style.zIndex = OFramework.getZIndex(attachTo) + 100;
                OFramework.ActivePopUp = this;
            }
            o.Hide = function () {
                this.style.display = "none";
                this.AttachedTo = null;
                OFramework.ActivePopUp = null;
            }
            o.Blur = function () {
                this.Hide();
            }
            o.onblur = o.Blur;
            return o;
        }

        this.InputText = function (oContainer) {
            var o = document.createElement("input");
            var count = 0;
            var getPos;
            o.Type = "InputText";
            o.type = "text";
            o.className = "text";
            o.Value = "";
            o.value = "";
            o.HintText = "";
            o.autocomplete = "off";
            o.SetCurrentLocation = false;

            o.Focus = function () {
                this.className = "text focus";
                OFramework.ActiveElement = this;
                if (this.HintText != "" && this.value == this.HintText) this.value = "";
            }
            o.Blur = function () {
                if (OFramework.ActivePopUp != null) {
                    if (this.List != null && this.List.CanHide) {
                        o.List.Hide();
                        this.className = "text";
                        OFramework.ActiveElement = null;
                    }
                }
                else {
                    this.className = "text";
                    OFramework.ActiveElement = null;
                }

                if (this.HintText != "" && this.value == "") this.value = this.HintText;
            }
            o.onfocus = o.Focus;
            o.onblur = o.Blur;
            o.DataBind = function () {
                this.List = new OFramework.Controls.HtmlDropdownListBody();
                if (this.DataSource == null) { return; }
                if (!this.DataSource.DataLoaded) {
                    this.value = "loading...";
                    this.disabled = true;
                    window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 100); return;
                }
                else {
                    this.disabled = false;
                    if (this.Value != "") window.setTimeout("document.getElementById(\"" + this.id + "\").SetValue(\"" + this.Value + "\")", 50);
                    else {
                        this.value = this.HintText != "" ? this.HintText : "";
                    }
                }
            }
            o.onkeydown = function (e) {
                e = document.all ? event : e;
                if (this.List == null) return;
                switch (e.keyCode) {
                    case 40:
                        {
                            this.List.MoveDown();
                            e.cancelBubble = true;
                            break;
                        }
                    case 38:
                        {
                            this.List.MoveUp();
                            e.cancelBubble = true;
                            break;
                        }
                    case 9:
                        {
                            this.List.Close();
                            e.cancelBubble = true;
                            break;
                        }
                    case 13:
                        {
                            this.List.Close();
                            e.cancelBubble = true;
                            break;
                        }
                }
            }
            o.onkeyup = function (e) {
                if (this.List == null) return;

                e = document.all ? event : e;
                // if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 9 || e.keyCode == 13) { e.cancelBubble = true; return; }
                if (e.keyCode == 9 || e.keyCode == 13) {
                    e.cancelBubble = true;
                    return;
                }
                if (e.keyCode == 40 || e.keyCode == 38) {

                    // On up and down arrow key hover the dropdown value for input text type element. and fix the page up and down on up and down arrow key pressed when dropdown is open
                    (document.getElementsByClassName("outerdiv")[0]).getElementsByClassName("popup")[0].scrollTop = 0;
                    if (count == 0) {
                        getPos = ((document.getElementsByClassName("outerdiv")[0]).getElementsByClassName("popup")[0].style.top).split("px")[0] - document.getElementsByClassName("list_item")[0].offsetHeight;
                        count = 1;
                    }
                    (document.getElementsByClassName("outerdiv")[0]).getElementsByClassName("popup")[0].scrollTop = parseInt(document.getElementsByClassName("list_item_hover")[0].parentElement.style.top.split("px")[0]) + parseInt(document.getElementsByClassName("list_item_hover")[0].offsetTop) + 1 - ((document.getElementsByClassName("outerdiv")[0]).getElementsByClassName("popup")[0].style.height).split("px")[0] - getPos;

                    e.cancelBubble = true; return;
                }


                var filteredData = new Array();
                filteredData.FilterValue = null;
                var idData = new Array();
                var codeData = new Array();
                var nameData = new Array();
                if (this.value.length > 0) {
                    var userVal = this.value.toLowerCase();
                    for (var i = 0; i < this.DataSource.length; i++) {
                        if (this.DataSource[i].id.toLowerCase() == userVal) idData.push(this.DataSource[i]);
                        else if (this.DataSource[i].id.toLowerCase().indexOf(userVal) > 0) idData.push(this.DataSource[i]);
                        else if (this.DataSource[i].code && this.DataSource[i].code.toLowerCase() == userVal) codeData.push(this.DataSource[i]);
                        else if (this.DataSource[i].name.toLowerCase().indexOf(userVal) == 0) filteredData.push(this.DataSource[i]);
                        else if (userVal.length > 2 && this.DataSource[i].name.toLowerCase().indexOf(userVal) > 0) nameData.push(this.DataSource[i]);
                    }

                    filteredData = idData.concat(codeData).concat(filteredData).concat(nameData);
                    filteredData.FilterValue = userVal;
                }
                if (filteredData.length > 0) {
                    this.List.Show(this, filteredData)
                    this.List.SetSelectedIndex(0);
                }
                else {
                    this.Value = this.value;
                    this.List.Hide();
                }
            }
            //alert("after keyup");
            o.SetValue = function (val) {
                this.Value = val == null ? "" : val;
                var loopDS = (arguments.length > 1) ? (arguments[1] == "false" ? false : true) : true;
                var dataItem = null;
                if (this.DataSource != null && this.DataSource.DataLoaded && loopDS) {
                    for (var i = 0; i < this.DataSource.length; i++) {
                        if (this.DataSource[i].id == this.Value) {
                            dataItem = this.DataSource[i];
                            break;
                        }
                    }
                }
                this.value = dataItem != null ? dataItem.name : this.Value;
                if (this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, dataItem);
            }

            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        // Multi Language Label Support
        this.Label = function (oContainer) {
            var o = document.createElement("label");
            o.Type = "Label";
            o.type = "label";
            o.className = "label";
            o.Value = "";
            o.value = "";
            o.DataSource = null;

            o.DataSource = new OFramework.DataSources.JSDataSource("Labels", o);
            o.DataBind = function () {
                if (OFramework.DataSources.Labels.DataLoaded) {
                    for (var i = 0; i < OFramework.DataSources.Labels.length; i++) {
                        if (this.DataSource[i].id == this.Value) {
                            break;
                        }
                        this.ShowLabel = function () {
                            if (OFramework.DataSources.Labels.DataLoaded == false) {
                                window.setTimeout("document.getElementById(\"" + this.id + "\").ShowLabel()", 100);
                            }
                            if (OFramework.DataSources.Labels.DataLoaded == true) {
                                var count = 0;
                                if (OFramework.DataSources.Labels != null && OFramework.DataSources.Labels != undefined) {
                                    if (OFramework.DataSources.Labels.length > 0) {
                                        for (i = 0; i < OFramework.DataSources.Labels.length; i++) {
                                            if (OFramework.DataSources.Labels[i] != null && OFramework.DataSources.Labels[i] != undefined) { var value = OFramework.DataSources.Labels[i]; }
                                            var airLabels = document.getElementsByName(value.key);
                                            if (airLabels != null && airLabels != undefined && airLabels.length > 0) {
                                                for (j = 0; j < airLabels.length; j++) {
                                                    airLabels[j].innerHTML = value.val;
                                                }
                                            }
                                        }
                                        OFramework.DataSources.Labels = false;
                                    }
                                }
                            }
                        }
                    }
                    this.ShowLabel();
                } else {
                    window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 50);
                }
            }
            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }


        this.HintInputText = function (oContainer) {
            var o = document.createElement("input");
            o.Type = "HintInputText";
            o.type = "text";
            o.className = "text";
            o.Value = "";
            o.value = "";
            o.HintText = "";
            o.autocomplete = "off";

            o.Focus = function () {
                this.className = "text focus";
                OFramework.ActiveElement = this;
                if (this.HintText != "" && this.value == this.HintText) this.value = "";
            }
            o.Blur = function () {
                if (OFramework.ActivePopUp != null) {
                    if (this.List != null && this.List.CanHide) {
                        o.List.Hide();
                        this.className = "text";
                        OFramework.ActiveElement = null;
                    }
                }
                else {
                    this.className = "text";
                    OFramework.ActiveElement = null;
                }

                if (this.HintText != "" && this.value == "") this.value = this.HintText;
            }
            o.onfocus = o.Focus;
            o.onblur = o.Blur;
            o.DataBind = function () {
                //this.List = new OFramework.Controls.HtmlDropdownListBody();
                this.List = new OFramework.Controls.HotelHtmlListBody();
                if (this.DataSource == null) { return; }
                if (!this.DataSource.DataLoaded) {
                    window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 100); return;
                }
                else {
                    var filteredData = new Array();
                    filteredData.FilterValue = null;
                    var idData = new Array();
                    var codeData = new Array();
                    var nameData = new Array();
                    if (this.value.length > 0) {
                        var userVal = this.value.toLowerCase();
                        for (var i = 0; i < this.DataSource.length; i++) {
                            if (this.DataSource[i].id.toLowerCase() == userVal) idData.push(this.DataSource[i]);
                            else if (this.DataSource[i].id.toLowerCase().indexOf(userVal) > 0) idData.push(this.DataSource[i]);
                            else if (this.DataSource[i].code && this.DataSource[i].code.toLowerCase() == userVal) codeData.push(this.DataSource[i]);
                            else if (this.DataSource[i].name.toLowerCase().indexOf(userVal) == 0) filteredData.push(this.DataSource[i]);
                            else if (userVal.length > 2 && this.DataSource[i].name.toLowerCase().indexOf(userVal) > 0) nameData.push(this.DataSource[i]);
                        }

                        filteredData = idData.concat(codeData).concat(filteredData).concat(nameData);
                        filteredData.FilterValue = userVal;
                    }
                    if (filteredData.length > 0) {
                        this.List.Show(this, filteredData)
                        this.List.SetSelectedIndex(0);
                    }
                    else this.List.Hide();
                }
            }
            o.onkeydown = function (e) {
                e = document.all ? event : e;
                if (this.List == null) return;
                switch (e.keyCode) {
                    case 40:
                        {
                            this.List.MoveDown();
                            e.cancelBubble = true;
                            break;
                        }
                    case 38:
                        {
                            this.List.MoveUp();
                            e.cancelBubble = true;
                            break;
                        }
                    case 9:
                        {
                            this.List.Close();
                            e.cancelBubble = true;
                            break;
                        }
                    case 13:
                        {
                            this.List.Close();
                            e.cancelBubble = true;
                            break;
                        }
                }
            }
            o.onkeyup = function (e) {
                this.Value = this.value;
                e = document.all ? event : e;
                if (this.List != null) {
                    if (this.List.SelectedIndex > -1) {
                        var selItem = this.List.childNodes[this.List.SelectedIndex];
                        if (selItem != null) this.Value = selItem.Value;
                    }
                }
                if (e.keyCode == 40 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 9 || e.keyCode == 13) { e.cancelBubble = true; return; }

                if (this.value.length > 2) {
                    var userVal = this.value.toLowerCase();
                    OFramework.DataSources["HotelDestinations"] = null;
                    OFramework.DataSources.Bindings["HotelDestinations"] = null;
                    this.DataSource = new OFramework.DataSources.JSDataSource("HotelDestinations", o, "flt=" + userVal);
                    this.DataBind();
                }
                else if (this.List != null) this.List.Hide();
                return;

                var filteredData = new Array();
                filteredData.FilterValue = null;
                var idData = new Array();
                var codeData = new Array();
                var nameData = new Array();
                if (this.value.length > 0) {
                    var userVal = this.value.toLowerCase();
                    for (var i = 0; i < this.DataSource.length; i++) {
                        if (this.DataSource[i].id.toLowerCase() == userVal) idData.push(this.DataSource[i]);
                        else if (this.DataSource[i].id.toLowerCase().indexOf(userVal) > 0) idData.push(this.DataSource[i]);
                        else if (this.DataSource[i].code && this.DataSource[i].code.toLowerCase() == userVal) codeData.push(this.DataSource[i]);
                        else if (this.DataSource[i].name.toLowerCase().indexOf(userVal) == 0) filteredData.push(this.DataSource[i]);
                        else if (userVal.length > 2 && this.DataSource[i].name.toLowerCase().indexOf(userVal) > 0) nameData.push(this.DataSource[i]);
                    }

                    filteredData = idData.concat(codeData).concat(filteredData).concat(nameData);
                    filteredData.FilterValue = userVal;
                }
                if (filteredData.length > 0) {
                    this.List.Show(this, filteredData)
                    this.List.SetSelectedIndex(0);
                }
                else this.List.Hide();
            }
            o.SetValue = function (val) {
                this.Value = val == null ? "" : val;
                var dataItem = null;
                if (this.DataSource != null && this.DataSource.DataLoaded) {
                    for (var i = 0; i < this.DataSource.length; i++) {
                        if (this.DataSource[i].id == this.Value) {
                            dataItem = this.DataSource[i];
                            break;
                        }
                    }
                }
                this.value = dataItem != null ? dataItem.name : this.Value;
                if (this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, dataItem);
            }

            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        this.FieldInfo = function (oContainer) {
            var o = document.createElement("div");
            o.className = "fieldinfo";
            o.Type = "FieldInfo";
            o.innerHTML = "";
            o.InfoType = "";
            o.Dialog = null;
            o.Bindings = null;
            o.DialogPosition = "";
            o.PlaceHolder = "";
            o.onclick = function (e) {
                if (OFramework.ActiveElement != null) OFramework.ActiveElement.Blur();
                OFramework.ActiveElement = this;

                this.className = "fieldinfo focus";
                if (this.Dialog == null) this.Dialog = new OFramework.Controls.Dialog(this.Parent, this.InfoType, this.DialogPosition);
                if (this.Dialog != null) {
                    this.Dialog.Show(this);
                }
            }
            o.SetValue = function (val) {
                this.innerHTML = "";
                this.innerHTML = this.ItemTemplate != null ? OFramework.ProcessItemTemplate(this.ItemTemplate, val) : val[this.InfoType];
                if (this.PlaceHolder != "" && this.innerHTML == "") this.innerHTML = this.PlaceHolder;
            }
            o.GetValues = function () {
                var data = new Array();

                switch (this.InfoType) {
                    case "Guests":
                    case "Adults":
                    case "Children":
                    case "InfantsInLap":
                    case "InfantsInSeat":
                        {
                            var adultCount, seniorCount, youthCount, childCount, infLapCount, infSeatCount, total;
                            adultCount = this.Bindings["Adults"] != null ? this.Bindings["Adults"].Value : 0;
                            childCount = this.Bindings["Children"] != null ? this.Bindings["Children"].Value : 0;
                            infLapCount = this.Bindings["InfantsInLap"] != null ? this.Bindings["InfantsInLap"].Value : 0;
                            infSeatCount = this.Bindings["InfantsInSeat"] != null ? this.Bindings["InfantsInSeat"].Value : 0;
                            total = parseInt(adultCount) + parseInt(childCount) + parseInt(infLapCount) + parseInt(infSeatCount);

                            data["Total"] = total;
                            data["Adults"] = adultCount;
                            data["Children"] = childCount;
                            data["InfantsInLap"] = infLapCount;
                            data["InfantsInSeat"] = infSeatCount;
                            break;
                        }
                    default: break;
                }
                return data;
            }
            o.FieldChanged = function () {
                if (this.Bindings == null) return;
                var val = this.GetValues();
                this.SetValue(val);
            }
            o.DataBind = function () {
                this.innerHTML = "loading...";
                if (this.Bindings != null) {
                    var val = this.GetValues();
                    this.SetValue(val);
                }
            }
            o.Blur = function () {
            }
            o.onblur = o.Blur;
            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        this.NumberBox = function (oContainer) {//spinbox
            var o = document.createElement("div");
            o.Type = "NumberBox";
            o.className = "numberBox";
            o.innerHTML = "";
            o.Value = "";
            o.FieldInfo = null;
            o.FieldInfoType = null;
            o.DecrementButton = null;
            o.IncrementButton = null;
            o.NumberHolder = null;
            o.Render = function () {
                this.DecrementButton = document.createElement("button");
                this.DecrementButton.className = "decrementor minus";
                this.DecrementButton.innerHTML = "-";
                this.DecrementButton.Type = "Decrement";
                this.DecrementButton.onclick = this.onClick;
                this.DecrementButton.Parent = this;

                this.NumberHolder = document.createElement("input");
                this.NumberHolder.type = "text";
                this.NumberHolder.className = "numberHolder";
                this.NumberHolder.setAttribute("readonly", true);
                this.NumberHolder.Parent = this;

                this.IncrementButton = document.createElement("button");
                this.IncrementButton.className = "incrementor plus";
                this.IncrementButton.innerHTML = "+";
                this.IncrementButton.Type = "Increment";
                this.IncrementButton.onclick = this.onClick;
                this.IncrementButton.Parent = this;

                this.appendChild(this.DecrementButton);
                this.appendChild(this.NumberHolder);
                this.appendChild(this.IncrementButton);

            }
            o.onClick = function (e) {
                switch (e.target.Type) {
                    case "Decrement":
                        {
                            var newVal = (parseInt(this.Parent.Value)) - 1;
                            if (newVal >= this.Parent.DataSource[0].Min) {
                                this.Parent.SetValue(newVal);
                            }
                            break;
                        }
                    case "Increment":
                        {
                            var newVal = (parseInt(this.Parent.Value)) + 1;
                            if (newVal <= this.Parent.DataSource[0].Max) {
                                this.Parent.SetValue(newVal);
                            }
                            break;
                        }
                    default: break;
                }
                if (this.Parent.FieldInfo != null)
                    this.Parent.FieldInfo.FieldChanged();

                return false;
            }
            o.DataBind = function () {
                if (this.DataSource == null) return;
                if (!this.DataSource.DataLoaded) {
                    this.NumberHolder.value = "loading...";
                    window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 100); return;
                }
                this.SetValue(this.NumberHolder.value == "" ? this.DataSource[0].Min : this.NumberHolder.value);

            }
            o.SetValue = function (val) {
                this.NumberHolder.value = val;
                this.Value = val;
                if (this.addClassName && this.removeClassName) {
                    this.IncrementButton.removeClassName("disabled");
                    this.DecrementButton.removeClassName("disabled");
                    if (this.Value == this.DataSource[0].Min) {
                        this.DecrementButton.addClassName("disabled");
                    }

                    else if (this.Value == this.DataSource[0].Max) {
                        this.IncrementButton.addClassName("disabled");
                    }
                }
            }
            o.Render();
            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        this.DatePicker = function (oContainer) {
            var o = document.createElement("input");
            o.Type = "DatePicker";
            o.type = "text";
            o.className = "datepicker";
            o.MinDate = null;
            o.MaxDate = null;
            o.StartDateOfRange = null;
            o.EndDateOfRange = null;
            o.SelectedDate = null;
            o.CurrentDate = null;
            o.Value = null;
            o.value = OFramework.Culture.Date.Format;
            o.FieldInfo = null;
            o.FieldInfoType = null;
            o.NumberOfMonths = 1;
            o.ChangeMonth = true;
            o.ChangeYear = true;
            o.ShowOtherMonths = false;
            o.AutoFocus = true;
            o.Animation = "fadeIn";

            o.SetValue = function (val, raiseEvent) {

                var display = $("#" + this.id).attr('DisplayIn');

                if (display == "div") {
                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var selectedMonthName = months[val.getMonth()];

                    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var selectedDayName = days[val.getDay()];


                    //$("#" + this.id).prev().prev().prev().text(selectedDayName);
                    //$("#" + this.id).prev().prev().text(val.getDate());
                    //$("#" + this.id).prev().text(selectedMonthName + " " + val.getFullYear());

                    $("#" + this.id).closest('.parentdaydetail').find('.divday').text(selectedDayName);
                    $("#" + this.id).closest('.parentdaydetail').find('.divdate').text(val.getDate());
                    $("#" + this.id).closest('.parentdaydetail').find('.divmonthYear').text(selectedMonthName + " " + val.getFullYear());

                }

                if (val == null) return;

                if (val.Equals(this.Value)) raiseEvent = false;

                //var refresh = (arguments.length == 3) ? arguments[2] : false;
                this.SelectedDate = val;
                this.Value = val;
                this.value = OFramework.DateToString(val);
                if (raiseEvent && this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, val);

                if (this.FieldInfo != null)
                    this.FieldInfo.FieldChanged();

            }
            o.Redraw = function () {
                $(this).datepicker("refresh");
            }
            o.Show = function () {
                $(this).datepicker("show");
            }
            o.Init = function () {
                $(this).datepicker(
					//regional information is available in jquery-ui-datepicker-localized.js which is under common\JSLib\jquery\js\ui folder which need to be included in the page
					$.datepicker.regional[OFramework.Culture.GetLanguageCode()]
				);
                $.datepicker.setDefaults({
                    minDate: this.MinDate,//month starts from 0
                    maxDate: this.MaxDate,
                    isRTL: OFramework.Culture.IsRightToLeft,
                    numberOfMonths: this.GetNumberOfMonths(),
                    showOtherMonths: this.ShowOtherMonths,
                    changeMonth: this.ChangeMonth,
                    changeYear: this.ChangeYear,
                    dateFormat: OFramework.Culture.Date.Format.replace('yyyy', 'yy'),
                    showAnim: this.Animation, //if animation set, then manually showing datepicker on is not working
                    beforeShow: this.BeforeShow,//call back
                    beforeShowDay: this.BeforeShowDay, //call back
                    onSelect: function (val) {
                    },
                    onClose: function (val) {
                        if (val != "") {
                            date = OFramework.DateFromString(val);
                            this.SetValue(date, true, true);
                        }
                    }
                });
            }
            o.GetNumberOfMonths = function () {
                try {
                    return parseInt(this.NumberOfMonths);
                }
                catch (e) { return 1; }
            }
            o.BeforeShow = function (obj, inst) {//input object and datepicker instance
                $("#ui-datepicker-div").addClass(this.id);
                $(obj).datepicker("option", "minDate", this.MinDate);
                $(obj).datepicker("option", "maxDate", this.MaxDate);
                //find a better way, to dynamically set poisition based on screen space available
                var position = $(obj).offset();
                var height = $(obj).outerHeight();
                setTimeout(function () {
                    inst.dpDiv.css({
                        top: (position.top + height + 1),
                        left: position.left
                    });
                }, 0);
                if (OFramework.ActiveElement != null) OFramework.ActiveElement.Blur();
                OFramework.ActiveElement = this;
                if (OFramework.ActivePopUp != null) OFramework.ActivePopUp.Hide();

            }
            o.BeforeShowDay = function (date) {
                if (this.StartDateOfRange != null && this.EndDateOfRange != null) {
                    if (date.CompareTo(this.StartDateOfRange) == 0)
                        return [true, 'ui-state-selected', ''];
                    if (date.CompareTo(this.EndDateOfRange) == 0)
                        return [true, 'ui-state-selected', ''];
                    if (date.CompareTo(this.StartDateOfRange) == 1 && date.CompareTo(this.EndDateOfRange) == -1)
                        return [true, 'ui-state-highlighted', ''];
                }
                return [true, '', ''];
            }
            o.Blur = function () {
                //defining, so it shouldn't give error on calling Blur of Active element, but not attaching it to default onblur of text input because it will conflict with onblur which is already defined in the datepicker plugin. 
                //if still needed, then do consider the default functionality inside datepicker for on blur.
                //$( this ).datepicker( "hide" );
                $("#ui-datepicker-div").removeClass(this.id);
            }
            o.Hide = function () {
                $(this).datepicker("hide");
                $("#ui-datepicker-div").removeClass(this.id);
            }
            o.onkeydown = function (e) { //on keydown move dates and select dates 
                var code = e.keyCode || e.which;
                if (code == '37' || code == '38' || code == '39' || code == '40') {
                    e.preventDefault();
                }
            }

            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        this.InputDate = function (oContainer) {
            var o = document.createElement("div");
            o.Type = "InputDate";
            o.className = "date";
            o.hideFocus = true;
            o.innerHTML = OFramework.Culture.Date.Format;
            o.Value = null;
            o.MinDate = null;
            o.MaxDate = null;

            o.onselectstart = function () { return false; }

            o.Calendar = new OFramework.Controls.CalendarPopUp()
            o.Activate = function () {
                this.Focus();
                this.Calendar.focus();
            }
            o.Focus = function () {
                if (OFramework.ActiveElement != null) OFramework.ActiveElement.Blur();
                OFramework.ActiveElement = this;
                this.className = "date focus";
                this.Calendar.CanHide = true;
                this.Calendar.Show(this);
            }
            o.onclick = function (e) {
                if (OFramework.ActiveElement != null) OFramework.ActiveElement.Blur();
                OFramework.ActiveElement = this;
                this.className = "date focus";
                this.Calendar.CanHide = true;
                this.Calendar.Show(this);
            };

            o.Blur = function () {
                if (this.Calendar.CanHide) {
                    o.Calendar.Hide();
                    this.className = "date";
                    OFramework.ActiveElement = null;
                }
            }
            o.SetValue = function (val, raiseEvent) {
                if (val == null) return;
                if (val.Equals(this.Value)) raiseEvent = false;
                this.innerHTML = OFramework.DateToString(val);
                this.Value = val;
                if (raiseEvent && this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, val);
            }
            o.onfocus = o.Focus
            o.onblur = o.Blur;
            o.onkeydown = function (e) { // on old datepicker key down event pressed
                var code = e.keyCode || e.which;
                if (code != '9') {
                    e.preventDefault();
                }
            }
            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        this.CalendarPopUp = function () {
            if (document.getElementById("CalendarPopUp") != null) return document.getElementById("CalendarPopUp");
            var o = document.createElement("div");
            o.id = "CalendarPopUp";
            o.type = "CalendarPopUp";
            o.className = "popup calendar";

            o.MinDate = null;
            o.MaxDate = null;
            o.SelectedDate = null;
            o.CurrentDate = null;

            o.Show = function (attachTo) {
                if (OFramework.ActivePopUp != null) OFramework.ActivePopUp.Hide();
                this.AttachedTo = attachTo;
                this.style.top = (OFramework.getPosTop(attachTo) + attachTo.offsetHeight + 1) + "px";
                this.style.left = OFramework.getPosLeft(attachTo) + "px";
                this.style.display = "block";
                this.style.zIndex = OFramework.getZIndex(attachTo) + 100;
                OFramework.ActivePopUp = this;

                this.MinDate = this.AttachedTo.MinDate;
                this.MaxDate = this.AttachedTo.MaxDate;
                this.SetDate(this.AttachedTo.Value);
                this.Render();
            }
            o.Hide = function () {
                this.style.display = "none";
                this.AttachedTo = null;
                OFramework.ActivePopUp = null;
            }
            o.Close = function () {
                this.CanHide = true;
                if (this.AttachedTo != null) {
                    this.AttachedTo.SetValue(this.SelectedDate, true)
                    this.AttachedTo.Blur();
                }
            }
            o.SetDate = function (val) {
                this.SelectedDate = val != null ? val : new Date();
            }
            o.Render = function (o) {
                var cDay, cMonth, cYear;
                var cDate = o != null ? o : new Date(this.SelectedDate.getFullYear(), this.SelectedDate.getMonth(), this.SelectedDate.getDate());
                if (this.MinDate != null && cDate <= this.MinDate) {
                    cDate = new Date(this.MinDate.getFullYear(), this.MinDate.getMonth(), this.MinDate.getDate());
                }
                if (this.MaxDate != null && cDate >= this.MaxDate) {
                    cDate = new Date(this.MaxDate.getFullYear(), this.MaxDate.getMonth(), this.MaxDate.getDate());
                }
                //if(this.MaxDate != null && cDate > this.MaxDate) cDate = this.MaxDate;
                this.CurrentDate = cDate;
                cDay = cDate.getDate();
                //cMonth = cDate.getMonth();
                //cYear = cDate.getFullYear();
                //cDate = new Date(cYear, cMonth, 1);



                var container = document.createElement("table");
                container.cellPadding = 0;
                container.cellSpacing = 0;
                container.border = 0;
                container.Cells = new Array();
                var layout = this.AttachedTo.CalendarLayout;
                var cols = 0; var rows = 0;
                try {
                    rows = parseInt(layout.substring(2), 10);
                    cols = parseInt(layout.substring(0, 1), 10);
                    colWidth = parseInt(100 / cols);
                    for (var r = 0; r < rows; r++) {
                        container.insertRow(r);
                        container.rows[r].vAlign = "top";
                        for (var c = 0; c < cols; c++) {
                            container.rows[r].insertCell(c);
                            container.Cells[container.Cells.length] = container.rows[r].cells[c];
                            if (c < cols - 1) container.rows[r].cells[c].style.width = colWidth + "%";
                        }
                    }
                    container.style.width = 160 * container.rows[0].cells.length;
                    container.style.height = 140 * container.rows.length;
                }
                catch (e) { }
                if (container.Cells.length < 2) container = document.createElement("span");

                this.style.width = container.style.width;
                this.style.height = container.style.height;

                var displayCount = container.Cells ? container.Cells.length : 1;
                for (var mCount = 0; mCount < displayCount; mCount++) {
                    cMonth = cDate.getMonth();
                    cYear = cDate.getFullYear();
                    cDate = new Date(cYear, cMonth, 1);

                    var dayOffset = cDate.getDay();
                    var fDayAvailable = false;
                    var lDayAvailable = false;

                    var calBody = document.createElement("table");
                    calBody.border = "0";
                    calBody.style.width = "100%";
                    calBody.style.height = "100%";
                    calBody.className = "calText";
                    calBody.onselectstart = function () { return false; }
                    var newRow, cCell;

                    newRow = calBody.insertRow(0);
                    newRow.align = "center";
                    newRow.className = "cHead";
                    var rwMonth = newRow.insertCell(0);
                    if (mCount == 0) {
                        rwMonth.innerHTML = "&lt;"
                        rwMonth.className = "navBtn";
                        rwMonth.onclick = this.PrewMonth;
                    }
                    cCell = newRow.insertCell(1);
                    cCell.colSpan = 5;
                    if (displayCount > 1) {
                        cCell.innerHTML = OFramework.Culture.Date.MonthNames[cMonth] + " " + cYear;
                    }
                    else {
                        this.WriteDDown(cCell, cMonth, cYear);
                    }
                    var fwMonth = newRow.insertCell(2);
                    if (mCount == (container.Cells ? cols - 1 : 0)) {
                        fwMonth.innerHTML = "&gt;"
                        fwMonth.className = "navBtn";
                        fwMonth.onclick = this.NextMonth;
                    }

                    for (var r = 1; r < 8; r++) {
                        newRow = calBody.insertRow(r);
                        newRow.align = "center";
                        newRow.className = "wDay";
                        for (var c = 0; c < 7; c++) {
                            var cCell = newRow.insertCell(c);
                            if (c == 0 || c == 6) {
                                noSel = "wkNoSelDay";
                                cCell.className = "wkDay";
                            }
                            else {
                                noSel = "wNoSelDay";
                                cCell.className = "wDay";
                            }
                            if (r == 1) {//day names
                                cCell.innerHTML = OFramework.Culture.Date.ShortDayNames[c];
                                cCell.className += " dayNm";
                                //cCell.className = ""
                            }
                            else if (r == 2 & c < dayOffset || cDate.getMonth() > cMonth || cDate.getFullYear() > cYear) {
                                cCell.innerHTML = "";
                                cCell.onmouseover = null;
                                cCell.onmouseout = null;
                            }
                            else {
                                cCell.innerHTML = cDate.getDate();
                                if ((this.MinDate != null && cDate >= this.MinDate) || (this.MaxDate != null && cDate <= this.MaxDate) || (this.MinDate != null && this.MaxDate != null && cDate >= this.MinDate && cDate <= this.MaxDate) || (this.MinDate == null && this.MaxDate == null)) {
                                    cCell.onmouseover = this.CellOver;
                                    cCell.onmouseout = this.CellOut;
                                    cCell.onclick = this.CellClick;
                                    cCell.Year = cYear;
                                    cCell.Month = cMonth;
                                    cCell.Day = cDate.getDate();
                                }
                                else {
                                    cCell.onmouseover = null;
                                    cCell.onmouseout = null;
                                    cCell.className = noSel;
                                }
                                if (!rwMonth.isDisbl && this.MinDate != null && cDate <= this.MinDate) { rwMonth.isDisbl = true; rwMonth.className = "navBtn_off" }
                                if (!fwMonth.isDisbl && this.MaxDate != null && cDate >= this.MaxDate) { fwMonth.isDisbl = true; fwMonth.className = "navBtn_off" }
                                if (cDate.Equals(this.SelectedDate)) cCell.className = "cDay";
                                cDate.setDate(cDate.getDate() + 1)
                            }
                            if (cCell.innerHTML == "") {
                                cCell.innerHTML = "&nbsp;";
                                if (cCell.addClassName) { cCell.addClassName("nodate"); }
                            }
                        }
                    }
                    if (container.Cells) container.Cells[mCount].appendChild(calBody);
                    else container.appendChild(calBody);

                }
                this.innerHTML = "";
                this.appendChild(container);
            }
            o.CellOver = function (e) {
                cElement = document.all ? event.srcElement : e.currentTarget
                cStyle = cElement.className;
                cElement.className = "cDay";
            }
            o.CellOut = function (e) {
                cElement = document.all ? event.srcElement : e.currentTarget
                cElement.className = cStyle;
            }
            o.CellClick = function (e) {
                cElement = document.all ? event.srcElement : e.currentTarget
                document.getElementById("CalendarPopUp").SelectedDate = new Date(cElement.Year, cElement.Month, cElement.Day);
                document.getElementById("CalendarPopUp").Close();
            }

            o.NextMonth = function (e) {
                cElement = document.all ? event.srcElement : e.currentTarget
                if (cElement.isDisbl) return;
                var cDate = document.getElementById("CalendarPopUp").CurrentDate;
                cDate.setMonth(cDate.getMonth() + 1)
                document.getElementById("CalendarPopUp").Render(cDate);
            }
            o.PrewMonth = function (e) {
                cElement = document.all ? event.srcElement : e.currentTarget
                if (cElement.isDisbl) return;
                var cDate = document.getElementById("CalendarPopUp").CurrentDate;
                cDate.setMonth(cDate.getMonth() - 1)
                document.getElementById("CalendarPopUp").Render(cDate);
            }
            o.GoTo = function (m, y) {
                var cDate = document.getElementById("CalendarPopUp").CurrentDate;
                cDate.setFullYear(y, m);
                document.getElementById("CalendarPopUp").Render(cDate);
            }

            o.WriteDDown = function (oContainer, cMonth, cYear) {
                var dDown = document.createElement("select");
                dDown.className = "calText";
                dDown.onchange = function () {
                    var params = this.value.split("-");
                    document.getElementById("CalendarPopUp").GoTo(params[0], params[1]);
                }
                var minIndexDate = new Date(cYear, cMonth, 1);
                var maxIndexDate = new Date(cYear, cMonth, 1);
                minIndexDate.setMonth(minIndexDate.getMonth() - 6);
                maxIndexDate.setMonth(maxIndexDate.getMonth() + 5);

                if (minIndexDate < this.MinDate) {
                    minIndexDate = new Date(this.MinDate.getFullYear(), this.MinDate.getMonth(), 1);
                    maxIndexDate.setMonth(minIndexDate.getMonth() + 12)
                }
                if (this.MaxDate != null && this.axIndexDate > this.MaxDate) {
                    maxIndexDate = new Date(this.MaxDate.getFullYear(), this.MaxDate.getMonth(), 1);;
                }

                for (i = 1; i < 13; i++) {
                    o = new Option(OFramework.Culture.Date.MonthNames[minIndexDate.getMonth()].substring(0, 3) + " " + minIndexDate.getFullYear(), minIndexDate.getMonth() + "-" + minIndexDate.getFullYear());
                    dDown.options.add(o);
                    minIndexDate.setMonth(minIndexDate.getMonth() + 1);
                }
                dDown.value = cMonth + "-" + cYear;
                oContainer.appendChild(dDown);
            }

            o.onblur = function () {
                if (OFramework.ActiveElement != null) OFramework.ActiveElement.Blur();
            }
            o.onmouseleave = function () {
                if (!this.CanHide) this.CanHide = true;
            }
            o.onmouseenter = function () {
                if (this.CanHide) {
                    this.CanHide = false;
                    this.hideFocus = true;
                    this.focus();
                }
            }
            o.onmouseout = o.onmouseleave;
            o.onmousemove = o.onmouseenter;

            OFramework.GetContainer().appendChild(o);
            return o;
        }

        this.DropdownList = function (oContainer) {
            var o = document.createElement("select");
            o.Type = "DropdownList";
            o.className = "select";
            o.Value = "";
            o.SelectedItem = null;
            o.Filter = null;
            o.DataSource = null;

            o.Focus = function () {
                this.className = "select focus";
                OFramework.ActiveElement = this;
            }
            o.Blur = function () {
                this.className = "select";
                OFramework.ActiveElement = null;
            }
            o.onfocus = o.Focus
            o.onblur = o.Blur;

            o.SetValue = function (val, raiseEvent) {
                if (this.DataSource == null) return;
                if (!this.DataSource.DataLoaded) {
                    this.Value = val;
                    return;
                }
                var found = false;
                var dSource = this.DataSource;
                if (this.DefaultItem) dSource = new Array(this.DefaultItem).concat(dSource);
                for (var i = 0; i < dSource.length; i++) {
                    if (((this.DefaultItem && i > 0) || (!this.DefaultItem)) && this.Filter != null && !this.Filter.Value.Contains(dSource[i][this.Filter.Property])) continue;
                    if (dSource[i].id == val) {
                        this.Value = val;
                        this.SelectedItem = dSource[i];
                        this.selectedIndex = i;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.SelectedItem = dSource[0];
                    this.Value = dSource[0].id;
                }

                if (raiseEvent && this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, this.SelectedItem.id);
            }

            o.DataBind = function () {
                if (this.DataSource == null) return;
                if (!this.DataSource.DataLoaded) {
                    this.disabled = true;
                    if (this.options.length > 0) this.options[0].text = "loading...";
                    else o.options.add(new Option("loading...", ""));
                    window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 100); return;
                }
                this.innerHTML = "";

                if (this.Sort != null) { var sf = new OFramework.DataSources.SortFactory(this.Sort); this.DataSource.sort(sf.Sort); }
                var dSource = this.DataSource;
                if (this.DefaultItem) dSource = new Array(this.DefaultItem).concat(dSource);
                for (var i = 0; i < dSource.length; i++) {
                    var opt = new Option(dSource[i].name, dSource[i].id);
                    if (this.Value == dSource[i].id) opt.selected = true;
                    this.options.add(opt);
                }
                this.disabled = false;
            }

            o.onchange = function () {
                this.SetValue(o.value, true);
            }

            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        this.SelectList = function (oContainer) {
            var o = document.createElement("select");
            o.Type = "SelectList";
            o.className = "select";
            o.multiple = true;
            o.Value = "";
            o.Filter = null;
            o.DataSource = null;
            o.Linked = false;
            o.GroupSort = [];

            o.Focus = function () {
                this.className = "select focus";
                OFramework.ActiveElement = this;
            }
            o.Blur = function () {
                this.className = "select";
                OFramework.ActiveElement = null;
            }
            o.MouseClick = function () {

            }
            o.OnChange = function () {
                if (this.Linked) {
                    var sIndex = null;
                    var eIndex = null;
                    for (i = 0; i < this.options.length; i++) {
                        if (this.options[i].selected && this.options[i] && this.options[i].value != "null") {
                            if (sIndex == null) sIndex = i;
                            eIndex = i;
                        }
                    }
                    if (sIndex != null && eIndex != null) {
                        for (i = sIndex; i <= eIndex; i++) this.options[i].selected = true;
                    }
                }

                var sel_array = new Array()
                for (i = 0; i < this.options.length; i++) {
                    if (this.options[i].selected && this.options[i].value != "null") sel_array.push(this.options[i].value);
                }
                if (sel_array.length > 5) {
                    alert("Too many options selected!");
                    this.SetValue(this.Value, false, true);
                    return;
                }
                if (this.Linked && sel_array.length > 2) sel_array.splice(1, sel_array.length - 2);
                var newValue = sel_array.toString();
                if (newValue != this.Value) {
                    this.Value = newValue;
                    if (this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, this.Value);
                }
            }
            o.onfocus = o.Focus
            o.onblur = o.Blur;
            o.onclick = o.MouseClick;
            o.onchange = o.OnChange;

            o.SetValue = function (val, raiseEvent, flag) {
                if (!flag && OFramework.ActiveElement == this) return;
                this.Value = val;
                if (this.DataSource == null || !this.DataSource.DataLoaded) return;

                var sel_array = val.split(',');
                var last_option_selected = null;
                if (this.Linked) {
                    var sValue = sel_array[0];
                    var eValue = sel_array[sel_array.length - 1];
                    var flag = false;
                    for (i = 0; i < this.options.length; i++) {
                        if (this.options[i].value == sValue) flag = true;
                        this.options[i].selected = flag;
                        if (this.options[i].value == eValue) flag = false;
                    }
                }
                else {
                    for (i = 0; i < this.options.length; i++) {
                        this.options[i].selected = sel_array.contains(this.options[i].value);
                    }
                }
                if (raiseEvent && this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, this.Value);
            }
            o.SetFilter = function (prop, val) {
                if (val == null) { this.Filter = null; }
                else {
                    this.Filter = new Object();
                    this.Filter.Property = prop;
                    this.Filter.Value = val;
                }
                this.SetValue(this.Value, false);
            }
            o.DataBind = function () {
                if (this.DataSource == null) return;
                if (OFramework.ActiveElement == this) {
                    this.FilterGroups();
                    return;
                }
                if (!this.DataSource.DataLoaded) {
                    this.disabled = true;
                    this.innerHTML = "";
                    this.options.add(new Option("loading...", ""));

                    window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 100); return;
                }
                this.innerHTML = "";

                if (this.Sort != null) { var sf = new OFramework.DataSources.SortFactory(this.Sort); this.DataSource.sort(sf.Sort); }
                this.BuildGroups();
                this.SetValue(this.Value, false);
                this.disabled = false;
            }

            o.BuildGroups = function () {
                var data_array = new Array();
                var gs = new Array();
                var oGroup = null;
                var dataItem = null;
                var use_optgroup = false;
                switch (this.id) {
                    case "CruiseSearchForm_Ship":
                        {
                            use_optgroup = true;
                            var suppliers = OFramework.DataSources["CruiseFormData"].CruiseLines;
                            var cLinesElem = document.getElementById("CruiseSearchForm_CruiseLine");
                            if (cLinesElem && cLinesElem.Sort != null) this.Sort = cLinesElem.Sort;
                            for (var i = 0; i < suppliers.length; i++) {
                                if (cLinesElem && cLinesElem.Filter != null && cLinesElem.Filter.Value != null && !cLinesElem.Filter.Value.Contains(suppliers[i].id)) continue;
                                dataItem = suppliers[i];
                                oGroup = document.createElement("optgroup");
                                oGroup.label = dataItem.name;
                                oGroup.value = dataItem.id;
                                oGroup.rank = dataItem.rank ? parseInt(dataItem.rank) : 1000;
                                oGroup.grank = oGroup.rank;
                                data_array["group_" + oGroup.value] = oGroup;
                            }
                            for (var i = 0; i < this.DataSource.length; i++) {
                                dataItem = this.DataSource[i];
                                oGroup = data_array["group_" + dataItem.cid];
                                var option = document.createElement("option");
                                option.value = dataItem.id;
                                option.appendChild(document.createTextNode(dataItem.name));
                                if (oGroup) oGroup.appendChild(option);
                            }
                            break;
                        }
                    case "CruiseSearchForm_Destination":
                        {
                            for (var i = 0; i < this.DataSource.length; i++) {
                                dataItem = this.DataSource[i];
                                if (!this.Linked && this.GroupSort.contains(dataItem.id)) {
                                    gs[gs.length] = new Option(dataItem.name, dataItem.id);
                                    continue;
                                }
                                if (dataItem.pid) continue;
                                oGroup = document.createElement("optgroup");
                                oGroup.label = dataItem.name;
                                oGroup.value = dataItem.id;
                                oGroup.rank = dataItem.rank ? parseInt(dataItem.rank) : 1000;
                                oGroup.grank = oGroup.rank;
                                data_array["group_" + oGroup.value] = oGroup;
                            }
                            for (var i = 0; i < this.DataSource.length; i++) {
                                dataItem = this.DataSource[i];
                                if (dataItem["pid"] == null) continue;
                                if (!this.Linked && this.GroupSort.contains(dataItem.id)) continue;
                                oGroup = data_array["group_" + dataItem.pid];
                                var option = document.createElement("option");
                                option.value = dataItem.id;
                                option.rank = dataItem.rank ? parseInt(dataItem.rank) : 1000;
                                option.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + dataItem.name
                                if (oGroup) {
                                    oGroup.appendChild(option);
                                    if (oGroup.grank > option.rank) oGroup.grank = option.rank;
                                }
                            }
                            break;
                        }

                    default:
                        {
                            for (var i = 0; i < this.DataSource.length; i++) {
                                dataItem = this.DataSource[i];
                                if (this.Filter != null && this.Filter.Value != null && !this.Filter.Value.Contains(dataItem.id)) continue;
                                if (!this.Linked && this.GroupSort.contains(dataItem.id)) {
                                    gs[gs.length] = new Option(dataItem.name, dataItem.id);
                                    continue;
                                }
                                if (dataItem.pid) continue;
                                oGroup = document.createElement("optgroup");
                                oGroup.label = dataItem.name;
                                oGroup.value = dataItem.id;
                                oGroup.rank = dataItem.rank ? parseInt(dataItem.rank) : 1000;
                                oGroup.grank = oGroup.rank;
                                data_array["group_" + oGroup.value] = oGroup;
                            }
                            break;
                        }
                }
                if (this.id == "CruiseSearchForm_CruiseLine" || this.id == "CruiseSearchForm_Ship" || this.id == "CruiseSearchForm_Departure" || this.id == "CruiseSearchForm_Destination") {
                    data_array = o.SortGroups(data_array);
                }
                for (var name in data_array) {
                    if (name.indexOf("group_") == 0) {
                        dataItem = data_array[name];
                        if (use_optgroup) {
                            if (dataItem.childNodes.length > 0) this.appendChild(dataItem);
                        }
                        else {
                            var option = document.createElement("option");
                            option.value = dataItem.value;
                            option.rank = dataItem.rank;
                            option.grank = dataItem.grank;
                            option.appendChild(document.createTextNode(dataItem.label));
                            this.appendChild(option);
                            //if (dataItem.childNodes.length > 0) alert("appending " + dataItem.childNodes.length + " child options");
                            while (dataItem.childNodes.length > 0) {
                                this.appendChild(dataItem.childNodes[0]);
                            }
                        }
                    }
                }
                if (gs.length > 0) {
                    for (var i = 0; i < gs.length; i++) {
                        this.options.add(gs[i], i);
                    }
                    if (this.options.length > gs.length) {
                        var s = new Option("-------------", "null");
                        s.style.color = "silver";
                        s.disabled = true;
                        this.options.add(s, gs.length);
                    }
                }
            }
            o.BuildDefaultGroups = function () {
                var data_array = new Array();
                var gs = new Array();
                var oGroup = null;

                for (var i = 0; i < this.DataSource.length; i++) {
                    dataItem = this.DataSource[i];
                    if (!this.Linked && this.GroupSort.contains(dataItem.id)) {
                        gs[gs.length] = new Option(dataItem.name, dataItem.id);
                        continue;
                    }
                    if (dataItem.pid) continue;
                    oGroup = document.createElement("optgroup");
                    oGroup.label = dataItem.name;
                    oGroup.value = dataItem.id;
                    data_array["group_" + oGroup.value] = oGroup;
                }

                return [data_array, gs, oGroup];
            }
            o.FilterGroups = function () {
                if (this.id != "CruiseSearchForm_Ship") return;
                var suppliers = OFramework.DataSources["CruiseFormData"].CruiseLines;
                var rem = new Array();
                for (var n = 0; n < this.childNodes.length; n++) {
                    var found = false;
                    var node = this.childNodes[n];
                    for (var c = 0; c < suppliers.length; c++) {
                        if (suppliers[c].id == node.value) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) rem[rem.length] = node;
                }
                for (var i = 0; i < rem.length; i++) this.removeChild(rem[i]);
            }
            o.SortGroups = function (data) {
                var groups = [];
                for (var name in data) {
                    if (name.indexOf("group_") == 0) groups[groups.length] = data[name];
                }
                if (o.Sort != null) {
                    if (o.Sort.Field == "name") {
                        if (o.Sort.Direction == "DESC") {
                            groups.sort(o.SortGroupArrayNameDesc);
                        }
                        else groups.sort(o.SortGroupArrayNameAsc);
                    }
                    else {
                        if (o.Sort.Direction == "DESC") {
                            groups.sort(o.SortGroupsArrayDesc);
                        }
                        else groups.sort(o.SortGroupsArrayAsc);
                    }
                }
                //if (o.Sort != null && o.Sort.Field == "rank" && o.Sort.Direction == "DESC") groups.sort(o.SortGroupsArrayDesc);
                //else groups.sort(o.SortGroupsArrayAsc);

                var data_array = [];
                for (i = 0; i < groups.length; i++) {
                    var dataItem = groups[i];
                    data_array["group_" + dataItem.value] = dataItem;
                }
                return data_array;
            }
            o.SortGroupArrayNameAsc = function (a, b) {
                return a.label.localeCompare(b.label);
            }
            o.SortGroupArrayNameDesc = function (a, b) {
                return b.label.localeCompare(a.label);
            }
            o.SortGroupsArrayAsc = function (a, b) {
                var a_rank = a.grank;
                var b_rank = b.grank;

                if (a_rank < b_rank) return -1;
                else if (a_rank > b_rank) return 1;
                else {
                    return a.label.localeCompare(b.label);
                }
            }
            o.SortGroupsArrayDesc = function (a, b) {
                var a_rank = a.grank;
                var b_rank = b.grank;

                if (a_rank < b_rank) return 1;
                else if (a_rank > b_rank) return -1;
                else {
                    return a.label.localeCompare(b.label);
                }
            }

            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        this.CheckBoxList = function (oContainer) {
            var o = document.createElement("div");
            o.Type = "CheckBoxList";
            o.className = "checkboxlist";
            o.multiple = true;
            o.Value = "";
            o.Filter = null;
            o.DataSource = null;
            o.Linked = false;
            o.GroupSort = [];

            o.OnMouseOver = function () {
                this.className = "checkboxlist focus";
                OFramework.ActiveElement = this;
            }
            o.OnMouseOut = function () {
                this.className = "checkboxlist";
                OFramework.ActiveElement = null;
            }

            o.OnChange = function () {
                if (this.Linked) {
                    var sIndex = null;
                    var eIndex = null;
                    for (i = 0; i < this.options.length; i++) {
                        if (this.options[i] && this.options[i].checked && this.options[i].value != "null") {
                            if (sIndex == null) sIndex = i;
                            eIndex = i;
                        }
                    }
                    if (sIndex != null && eIndex != null) {
                        for (i = sIndex; i <= eIndex; i++) {
                            this.options[i].checked = true;
                        }
                    }
                }

                var sel_array = new Array()
                for (i = 0; i < this.options.length; i++) {
                    if (this.options[i].checked && this.options[i].value != "null" && !this.options[i].exclusive) {
                        sel_array.push(this.options[i].value);
                    }
                }
                if (sel_array.length > 5) {
                    alert("Too many options selected!");
                    this.SetValue(this.Value, false, true);
                    return;
                }
                if (this.Linked && sel_array.length > 2) sel_array.splice(1, sel_array.length - 2);
                var newValue = sel_array.toString();
                if (newValue != this.Value) {
                    this.Value = newValue;
                    if (this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, this.Value);
                }
            }


            o.SetValue = function (val, raiseEvent, flag) {
                if (!flag && OFramework.ActiveElement == this) return;
                this.Value = val;
                if (this.DataSource == null || !this.DataSource.DataLoaded) return;

                var sel_array = val.split(',');
                var last_option_selected = null;
                if (this.Linked) {
                    var sValue = sel_array[0];
                    var eValue = sel_array[sel_array.length - 1];
                    var flag = false;
                    for (i = 0; i < this.options.length; i++) {
                        if (this.options[i].value == sValue) flag = true;
                        this.options[i].checked = flag;
                        if (this.options[i].value == eValue) flag = false;
                    }
                }
                else {
                    for (i = 0; i < this.options.length; i++) {
                        this.options[i].checked = sel_array.contains(this.options[i].value);
                    }
                }
                if (raiseEvent && this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, this.Value);
            }

            o.DataBind = function () {
                if (this.DataSource == null) return;
                if (OFramework.ActiveElement == this) {
                    this.FilterGroups();
                    return;
                }
                if (!this.DataSource.DataLoaded) {
                    this.disabled = true;
                    this.innerHTML = "loading....";

                    window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 100); return;
                }
                this.innerHTML = "";

                if (this.Sort != null) { var sf = new OFramework.DataSources.SortFactory(this.Sort); this.DataSource.sort(sf.Sort); }
                this.BuildGroups();
                this.SetValue(this.Value, false);
                this.disabled = false;
            }

            o.BuildGroups = function () {
                this.options = new Array();
                var dSource = this.DataSource;
                if (this.DefaultItem) dSource = new Array(this.DefaultItem).concat(dSource);
                for (var i = 0; i < dSource.length; i++) {
                    var dataItem = dSource[i];

                    var oOption = document.createElement("div");
                    this.appendChild(oOption);

                    var oElem = document.createElement("input");
                    oElem.type = "checkbox";
                    oElem.value = dataItem.id;
                    oElem.id = this.id + "_" + i + "_CHK";
                    oElem.exclusive = dataItem.Exclusive;
                    if (dataItem.id == "") { oElem.onclick = function () { o.SetValue('', true); }; } else { oElem.onclick = function () { o.OnChange(); }; };
                    oOption.appendChild(oElem);

                    var oLabel = document.createElement("label");
                    oLabel.htmlFor = oElem.id;
                    oLabel.innerHTML = dataItem.name;
                    oOption.appendChild(oLabel);

                    this.options[this.options.length] = oElem;
                }
            }

            o.FilterGroups = function () {
                if (this.id != "CruiseSearchForm_Ship") return;
                var suppliers = OFramework.DataSources["CruiseFormData"].CruiseLines;
                var rem = new Array();
                for (var n = 0; n < this.childNodes.length; n++) {
                    var found = false;
                    var node = this.childNodes[n];
                    for (var c = 0; c < suppliers.length; c++) {
                        if (suppliers[c].id == node.value) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) rem[rem.length] = node;
                }
                for (var i = 0; i < rem.length; i++) this.removeChild(rem[i]);
            }

            o.ShowHide = function (obj, css_on, content_on, css_off, content_off) {
                if (this.style.display == 'none') {
                    obj.className = css_on;
                    obj.innerHTML = content_on;
                    this.style.display = 'block';
                }
                else {
                    obj.className = css_off;
                    obj.innerHTML = content_off;
                    this.style.display = 'none';
                }
            }

            if (oContainer != null) oContainer.appendChild(o);
            return o;
        }

        this.HtmlDropdownList = function (oContainer) {
            var o = document.createElement("div");
            var count = 0;
            var getPos;
            o.Type = "HtmlDropdownList";
            o.className = "dropdown";
            o.hideFocus = true;
            o.innerHTML = "<br />";
            o.Value = "";
            o.SelectedItem = null;
            o.Filter = null;
            o.DataSource = null;
            o.List = new OFramework.Controls.HtmlDropdownListBody();
            o.GroupSort = [];

            o.Focus = function () {
                if (this.hasAttribute("disablediv") != undefined && this.hasAttribute("disablediv")) return;/*disable HtmlDropdownList using disablediv attribute.*/
                this.className = "dropdown focus";
                OFramework.ActiveElement = this;
                this.List.CanHide = true;
                this.List.Show(this);
                Value = "";
            }
            o.onclick = function (e) {
                if (this.hasAttribute("disablediv") != undefined && this.hasAttribute("disablediv")) return;/*disable HtmlDropdownList using disablediv attribute.*/
                this.className = "dropdown focus";
                OFramework.ActiveElement = this;
                this.List.CanHide = true;
                this.List.Show(this);
                Value = "";
            };
            o.Blur = function () {
                if (OFramework.ActivePopUp != null) {
                    if (this.List.CanHide) {
                        o.List.Hide();
                        this.className = "dropdown";
                        OFramework.ActiveElement = null;
                    }
                }
                else {
                    this.className = "dropdown";
                    OFramework.ActiveElement = null;
                }
                //  document.body.style.overflowY = "auto"; // set overflow auto , to release overflow auto property
            }
            o.onfocus = o.Focus;
            o.onblur = o.Blur;
            o.onselectstart = function () { return false; }
            o.onkeydown = function (e) {
                //document.body.style.overflowY = "hidden";  // set overflow auto  , to prevent page up and down when keypressed to select static dropdown 
                //document.getElementById("DDListPopUp").style.left = OFramework.getPosLeft(this) + "px"; // set dropdown position from left , when scrollbar hide at that time dropdown value have alignment issue . set position from left.

                e = document.all ? event : e;
                var seltext = filterList(e.keyCode, o);
                switch (e.keyCode) {
                    case 40:
                        {
                            this.List.MoveDown();
                            e.cancelBubble = true;
                            e.preventDefault();
                            break;
                        }
                    case 38:
                        {
                            this.List.MoveUp();
                            e.cancelBubble = true;
                            e.preventDefault();
                            break;
                        }
                    case 9:
                        {
                            this.List.Close();
                            e.cancelBubble = true;
                            break;
                        }
                    case 13:
                        {
                            this.List.Close();
                            e.cancelBubble = true;
                            break;
                        }
                }
            }
            o.onkeyup = function (e) {
                if (this.List == null) return;
                e = document.all ? event : e;
                if (e.keyCode == 40 || e.keyCode == 38) {
                    var totalLength = this.List.childElementCount - 1;
                    if (this.List.SelectedIndex == totalLength) this.List.SetSelectedIndex(this.List.SelectedIndex);
                    if (this.List.SelectedIndex == 0) this.List.SetSelectedIndex(0);
                    // On up and down arrow key hover the dropdown value for input text type element. and fix the page up and down on up and down arrow key pressed when dropdown is open
                    (document.getElementsByClassName("outerdiv")[0]).getElementsByClassName("popup")[0].scrollTop = 0;
                    if (count == 0) {
                        getPos = ((document.getElementsByClassName("outerdiv")[0]).getElementsByClassName("popup")[0].style.top).split("px")[0] - document.getElementsByClassName("list_item")[0].offsetHeight;
                        count = 1;
                    }
                    (document.getElementsByClassName("outerdiv")[0]).getElementsByClassName("popup")[0].scrollTop = parseInt(document.getElementsByClassName("list_item_hover")[0].parentElement.style.top.split("px")[0]) + parseInt(document.getElementsByClassName("list_item_hover")[0].offsetTop) + 1 - ((document.getElementsByClassName("outerdiv")[0]).getElementsByClassName("popup")[0].style.height).split("px")[0] - getPos;
                }
            }
            o.SetValue = function (val, raiseEvent) {
                if (this.DataSource == null) return;
                if (!this.DataSource.DataLoaded) {
                    this.Value = val;
                    return;
                }
                var found = false;
                var dSource = this.DataSource;
                if (this.DefaultItem) dSource = new Array(this.DefaultItem).concat(dSource);
                for (var i = 0; i < dSource.length; i++) {
                    if (((this.DefaultItem && i > 0) || (!this.DefaultItem)) && this.Filter != null && !this.Filter.Value.Contains(dSource[i][this.Filter.Property])) continue;
                    if (dSource[i].id == val) {
                        this.Value = val;
                        this.SelectedItem = dSource[i];
                        this.SetText(dSource[i].name);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.SelectedItem = dSource[0];
                    this.Value = dSource[0].id;
                    this.SetText(dSource[0].name);
                }
                if (raiseEvent && this.Parent != null && this.Parent.FieldChanged != null) this.Parent.FieldChanged(this, this.SelectedItem.id);
            }
            o.SetText = function (val) {
                var newLen = val.length - 1;
                var styleWidth = (this.style != null && this.style.width != null) ? parseInt(this.style.width, 10) : 150;
                var width = this.clientWidth > 0 ? this.clientWidth : styleWidth;

                if (val.length * 7 > width && this.style.width.indexOf('%') == -1) {
                    this.innerHTML = val.substring(0, width / 7);
                }
                else this.innerHTML = val;
                if (this.innerHTML.length == 0 && val.length > 4) this.innerHTML = val.substring(0, 4);
            }
            o.SetFilter = function (prop, val) {
                if (val == null) { this.Filter = null; }
                else {
                    this.Filter = new Object();
                    this.Filter.Property = prop;
                    this.Filter.Value = val;
                }
                this.SetValue(this.Value, false);
            }
            o.GetItem = function (val) {
                if (this.DataSource == null) return null;
                for (var i = 0; i < this.DataSource.length; i++) {
                    if (this.DataSource[i].id == val) return this.DataSource[i];
                }
                return null;
            }
            o.DataBind = function () {
                if (this.DataSource == null) { this.innerHTML = "&nbsp;<br/>"; return; }
                if (!this.DataSource.DataLoaded) {
                    this.innerHTML = "loading...";
                    window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 100); return;
                }
                else {
                    var val = null;
                    if (this.DefaultItem) val = this.Value == "" ? this.DefaultItem.id : this.Value;
                    else if (this.DataSource.length > 0) {
                        val = this.Value == "" ? this.DataSource[0].id : this.Value;
                    }
                    if (val != null) window.setTimeout("document.getElementById(\"" + this.id + "\").SetValue(\"" + val + "\")", 50);
                }
            }

            if (oContainer != null) {
                oContainer.appendChild(o);
            }
            return o;
        }

        this.HtmlDropdownListBody = function (oName) {

            if (oName == null) oName = "DDListPopUp";
            if (document.getElementById(oName) != null) return document.getElementById(oName);
            var o = document.createElement("div");
            var oo = document.createElement("div"); // add outer div , to prevent page up an down fluctuation when dropdown open 
            oo.className = "outerdiv";

            o.id = oName;
            o.type = "DDListPopUp";
            o.className = "popup list";
            o.setAttribute("style", "-webkit-overflow-scrolling:touch;"); //this style property will apply on webkit browsers on ipad and iphone
            o.Show = function (attachTo, dSource) {
                if (attachTo == null) return;
                if (OFramework.ActivePopUp != null) OFramework.ActivePopUp.Hide();
                this.AttachedTo = attachTo;
                this.style.top = (OFramework.getPosTop(attachTo) + attachTo.offsetHeight + 1) + "px";
                this.style.left = OFramework.getPosLeft(attachTo) + "px";
                this.style.display = "block";
                this.style.zIndex = OFramework.getZIndex(attachTo) + 100;
                var lw = this.AttachedTo.getAttribute("listWidth");
                var extclass = this.AttachedTo.getAttribute("listClass");
                this.className = "popup list";//added this here again to have different listClass for different popups as popup is created only once
                //, only datasource get changed.
                if (extclass != "" && extclass != undefined) {
                    if (this.hasClassName && this.addClassName) {
                        if (!this.hasClassName(extclass))
                            this.addClassName(extclass);
                    }
                }
                this.style.width = lw != null ? lw : "100px";
                var lh = this.AttachedTo.getAttribute("listHeight");
                if (lh == null) lh = 5;

                OFramework.ActivePopUp = this;
                this.CanHide = true;
                var setSelIndex = 0;
                dSource = dSource != null ? dSource : ((this.AttachedTo.DataSource != null && this.AttachedTo.DataSource.DataLoaded) ? this.AttachedTo.DataSource : null);
                var itemTemplate = this.AttachedTo.ItemTemplate != "" ? this.AttachedTo.ItemTemplate : null;
                if (dSource != null) {
                    if (this.AttachedTo.Sort != null) {
                        var sf = new OFramework.DataSources.SortFactory(this.AttachedTo.Sort);
                        dSource.sort(sf.Sort);
                    }
                    if (this.AttachedTo.GroupSort != null && this.AttachedTo.GroupSort.length > 0) {
                        var top = new Array();
                        var bottom = new Array();
                        for (var i = 0; i < dSource.length; i++) {
                            if (this.AttachedTo.GroupSort.contains(dSource[i].id)) top[top.length] = dSource[i];
                            else bottom[bottom.length] = dSource[i];
                        }
                        dSource = top.concat(bottom);
                    }
                    if (this.AttachedTo.DefaultItem) dSource = new Array(this.AttachedTo.DefaultItem).concat(dSource);
                    if (lh > dSource.length) lh = dSource.length;
                    this.innerHTML = "";
                    for (var i = 0; i < dSource.length; i++) {
                        if (((this.AttachedTo.DefaultItem && i > 0) || (!this.AttachedTo.DefaultItem)) && this.AttachedTo.Filter != null && !this.AttachedTo.Filter.Value.Contains(dSource[i][this.AttachedTo.Filter.Property])) continue;
                        var o = document.createElement("div");
                        o.className = "list_item";
                        o.innerHTML = itemTemplate != null ? OFramework.ProcessItemTemplate(itemTemplate, dSource[i], dSource.FilterValue) : dSource[i].name;
                        o.Value = dSource[i].id
                        o.ItemIndex = this.childNodes.length;
                        o.onmouseover = function () { OFramework.ActivePopUp.SetSelectedIndex(this.ItemIndex); }
                        o.onclick = function () { OFramework.ActivePopUp.Close(); }
                        this.appendChild(o);

                        if (this.AttachedTo.Value == o.Value) setSelIndex = o.ItemIndex;
                    }
                    this.SetSelectedIndex(setSelIndex, true);

                    var mul = this.childNodes.length > 0 ? this.childNodes[0].scrollHeight : this.scrollHeight;
                    this.style.height = (lh * mul + 2) + "px";
                }
                else this.Hide();
            }
            o.Hide = function () {
                if (OFramework.ActivePopUp == null) return;
                OFramework.ActivePopUp.style.display = "none";
                OFramework.ActivePopUp.CanHide = false;
                OFramework.ActivePopUp.AttachedTo = null;
                OFramework.ActivePopUp = null;

                window.onmousedown = null;
            }
            o.Close = function () {
                this.CanHide = true;
                if (this.SelectedIndex > -1) {
                    var selItem = this.childNodes[this.SelectedIndex];
                    if (this.AttachedTo != null) this.AttachedTo.SetValue(selItem.Value, true);
                }
                if (this.AttachedTo != null) this.AttachedTo.Blur();
            }

            o.onblur = function (e, src) {
                if (src == null) src = this;
                this.CanHide = true;
                this.Hide();
            }
            o.onmouseover = function (e) {
                if (!this.mouseCanEnter) return;
                else { this.mouseCanEnter = false; this.mouseCanLeave = true; }
                if (!this.CanHide) this.CanHide = false;
                e = document.all ? event : e; e.cancelBubble = true;

                window.onmousedown = OFramework.ActivePopUp.Hide;
            }
            o.onmouseout = function (e) {
                if (!this.mouseCanLeave) return;
                else { this.mouseCanLeave = false; this.mouseCanEnter = true; }
                if (this.CanHide) this.CanHide = true;
                e = document.all ? event : e; e.cancelBubble = true;
            }
            o.onmousedown = function (e) {
                this.CanHide = false;
                e = document.all ? event : e; e.cancelBubble = true;
            }
            o.mouseCanEnter = true;
            o.mouseCanLeave = false;


            o.onkeydown = function (e) {
                e = document.all ? event : e;

                switch (e.keyCode) {
                    case 40:
                        {
                            this.MoveDown();
                            e.cancelBubble = true;
                            break;
                        }
                    case 38:
                        {
                            this.MoveUp();
                            e.cancelBubble = true;
                            break;
                        }
                    case 9:
                        {
                            this.Close();
                            e.cancelBubble = true;
                            break;
                        }
                    case 13:
                        {
                            this.Close();
                            e.cancelBubble = true;
                            break;
                        }
                }
            }
            o.SelectedIndex = -1;
            o.SetSelectedIndex = function (val, scroll) {
                if (this.SelectedIndex > -1 && this.SelectedIndex < this.childNodes.length) this.childNodes[this.SelectedIndex].className = 'list_item';
                this.SelectedIndex = val;
                if (this.SelectedIndex > -1 && this.SelectedIndex < this.childNodes.length) this.childNodes[this.SelectedIndex].className = 'list_item_hover';
                if (scroll) {
                    this.scrollTop = this.childNodes[this.SelectedIndex].offsetTop;
                }
            }
            o.MoveUp = function () {
                if (this.SelectedIndex > 0) this.SetSelectedIndex(this.SelectedIndex - 1);
                // this.childNodes[this.SelectedIndex].scrollIntoView();
            }
            o.MoveDown = function () {
                if (this.SelectedIndex < this.childNodes.length - 1) this.SetSelectedIndex(this.SelectedIndex + 1);
                //  this.childNodes[this.SelectedIndex].scrollIntoView();
            }
            o.scrollStartPos = 0;
            if (navigator.userAgent.match(/Android ([0-3]\.[0-9](\.[0-9])?)/i)) {
                o.ontouchstart = function (event) {
                    this.scrollStartPos = this.scrollTop + event.touches[0].pageY + 500;
                    //event.preventDefault();
                }
                o.ontouchmove = function (event) {
                    this.scrollTop = this.scrollStartPos - event.touches[0].pageY - 500;
                    event.preventDefault();
                }
            } //userAgent match for Android devices version equal or lesser than 3.0. As default scrolling is not supported on these versions.
            //OFramework.GetContainer().appendChild(o);
            oo.appendChild(o); // append child
            OFramework.GetContainer().appendChild(oo); //append outer div into main container
            return o;
        }

        this.HotelHtmlListBody = function () {
            var o = new OFramework.Controls.HtmlDropdownListBody("HotelDDListPopUp");
            o.Show = function (attachTo, dSource) {
                if (attachTo == null) return;
                if (OFramework.ActivePopUp != null) OFramework.ActivePopUp.Hide();
                this.AttachedTo = attachTo;

                this.style.display = "block";
                this.style.zIndex = OFramework.getZIndex(attachTo) + 100;
                var lw = this.AttachedTo.getAttribute("listWidth");
                this.style.width = lw != null ? lw : "100px";
                var lh = this.AttachedTo.getAttribute("listHeight");
                if (lh == null) lh = 5;

                this.style.top = (OFramework.getPosTop(attachTo) + attachTo.offsetHeight + 1) + "px";
                if (attachTo.getAttribute("listAnchor") == 'right') this.style.left = OFramework.getPosLeft(attachTo) - this.offsetWidth + attachTo.offsetWidth + "px";
                else this.style.left = OFramework.getPosLeft(attachTo) + "px";

                OFramework.ActivePopUp = this;
                this.CanHide = true;
                var setSelIndex = 0;
                dSource = dSource != null ? dSource : ((this.AttachedTo.DataSource != null && this.AttachedTo.DataSource.DataLoaded) ? this.AttachedTo.DataSource : null);
                var itemTemplate = this.AttachedTo.ItemTemplate != "" ? this.AttachedTo.ItemTemplate : null;
                if (dSource != null) {
                    if (this.AttachedTo.Sort != null) {
                        var sf = new OFramework.DataSources.SortFactory(this.AttachedTo.Sort);
                        dSource.sort(sf.Sort);
                    }

                    var countries = new Array();
                    var states = new Array();
                    var cities = new Array();
                    var airports = new Array();


                    for (var i = 0; i < dSource.length; i++) {
                        var type = dSource[i].id.substring(dSource[i].id.length - 2);
                        switch (type) {
                            case "CO": { countries[countries.length] = dSource[i]; break; }
                            case "ST": { states[states.length] = dSource[i]; break; }
                            case "CI": { cities[cities.length] = dSource[i]; break; }
                            case "AP": { airports[airports.length] = dSource[i]; break; }
                        }
                    }
                    this.innerHTML = "";
                    for (i = 0; i < cities.length; i++) {
                        var o = document.createElement("div");
                        o.className = "list_item";
                        o.innerHTML = itemTemplate != null ? OFramework.ProcessItemTemplate(itemTemplate, cities[i], dSource.FilterValue) : cities[i].name;
                        if (i == 0) { o.innerHTML += "<span class='hotel-list-section city'>Cities</span>"; }
                        o.Value = cities[i].id
                        o.ItemIndex = this.childNodes.length;
                        o.onmouseover = function () { OFramework.ActivePopUp.SetSelectedIndex(this.ItemIndex); }
                        o.onclick = function () { OFramework.ActivePopUp.Close(); }
                        this.appendChild(o);

                        if (this.AttachedTo.Value == o.Value) setSelIndex = o.ItemIndex;
                    }
                    for (i = 0; i < airports.length; i++) {
                        var o = document.createElement("div");
                        o.className = "list_item";
                        o.innerHTML = itemTemplate != null ? OFramework.ProcessItemTemplate(itemTemplate, airports[i], dSource.FilterValue) : airports[i].name;
                        if (i == 0) { o.style.borderTop = "1px solid silver"; o.innerHTML += "<span class='hotel-list-section airport'>Airports</span>"; }
                        o.Value = airports[i].id
                        o.ItemIndex = this.childNodes.length;
                        o.onmouseover = function () { OFramework.ActivePopUp.SetSelectedIndex(this.ItemIndex); }
                        o.onclick = function () { OFramework.ActivePopUp.Close(); }
                        this.appendChild(o);

                        if (this.AttachedTo.Value == o.Value) setSelIndex = o.ItemIndex;
                    }
                    for (i = 0; i < states.length; i++) {
                        var o = document.createElement("div");
                        o.className = "list_item";
                        o.innerHTML = itemTemplate != null ? OFramework.ProcessItemTemplate(itemTemplate, states[i], dSource.FilterValue) : dSource[i].name;
                        if (i == 0) { o.style.borderTop = "1px solid silver"; o.innerHTML += "<span class='hotel-list-section region'>Regions</span>"; }
                        o.Value = states[i].id
                        o.ItemIndex = this.childNodes.length;
                        o.onmouseover = function () { OFramework.ActivePopUp.SetSelectedIndex(this.ItemIndex); }
                        o.onclick = function () { OFramework.ActivePopUp.Close(); }
                        this.appendChild(o);

                        if (this.AttachedTo.Value == o.Value) setSelIndex = o.ItemIndex;
                    }
                    for (i = 0; i < countries.length; i++) {
                        var o = document.createElement("div");
                        o.className = "list_item";
                        o.innerHTML = itemTemplate != null ? OFramework.ProcessItemTemplate(itemTemplate, countries[i], dSource.FilterValue) : dSource[i].name;
                        if (i == 0) { o.style.borderTop = "1px solid silver"; o.innerHTML += "<span class='hotel-list-section country'>Countries</span>"; }
                        o.Value = countries[i].id
                        o.ItemIndex = this.childNodes.length;
                        o.onmouseover = function () { OFramework.ActivePopUp.SetSelectedIndex(this.ItemIndex); }
                        o.onclick = function () { OFramework.ActivePopUp.Close(); }
                        this.appendChild(o);

                        if (this.AttachedTo.Value == o.Value) setSelIndex = o.ItemIndex;
                    }

                    this.SetSelectedIndex(setSelIndex, true);
                    var mul = this.childNodes.length > 0 ? this.childNodes[0].scrollHeight : this.scrollHeight;
                    this.style.height = (lh * mul + 2) + "px";
                }
                else this.Hide();
            }
            return o;
        }
        this.Clone = function (srcObj) {
            //alert("deep: in this.clone"+ srcObj);
            var retObj = null;
            switch (srcObj.Type) {
                case "InputText": { retObj = new OFramework.Controls.InputText(); break; }
                case "InputDate": { retObj = new OFramework.Controls.InputDate(); break; }
            }

            if (retObj == null) return null;

            //if(srcObj.style!=null && srcObj.style.cssText!=""){retObj.style.cssText=srcObj.style.cssText;}
            //if(srcObj.Parent!=null){retObj.Parent=srcObj.Parent;}
            //if(srcObj.DataSource!=null){retObj.DataSource=srcObj.DataSource;retObj.DataBind();}
            //if(srcObj.ItemTemplate!=null){retObj.ItemTemplate=srcObj.ItemTemplate;}
            //if(srcObj.MinDate!=null){retObj.MinDate=srcObj.MinDate;}
            //if(srcObj.MaxDate!=null){retObj.MaxDate=srcObj.MaxDate;}

            //if(srcObj.listWidth!=null){retObj.listWidth=srcObj.listWidth;}
            //if(srcObj.listHeight!=null){retObj.listHeight=srcObj.listHeight;}
            return retObj;
        }
    }
    this.Controls.prototype = new Array();

    this.Console = new function () {
        this.container = null;

        this.Write = function (s, target) {
            if (target != "console" && !OFramework.Settings.Debug.Enabled) return false;
            switch (OFramework.Settings.Debug.Target) {
                case "console":
                    {
                        if (this.container == null) this.createContainer();
                        this.container.innerHTML = s;
                        break;
                    }
                case "alert":
                    {
                        alert(s);
                        break;
                    }
            }
            return true;
        }
        this.WriteLn = function (s, target) {
            if (target != "console" && !OFramework.Settings.Debug.Enabled) return false;
            switch (OFramework.Settings.Debug.Target) {
                case "console":
                    {
                        if (this.container == null) this.createContainer();
                        this.container.innerHTML += "<br>" + s;
                        break;
                    }
                case "alert":
                    {
                        alert(s);
                        break;
                    }
            }
            return true;
        }
        this.Clear = function () { if (this.container != null) { this.container.innerHTML = ""; } }

        this.createContainer = function () {
            this.container = document.getElementById("OFrameworkConsole");
            if (this.container == null) {
                this.container = document.createElement("div");
                this.container.id = "OFrameworkConsole";
                this.container.innerHTML = "Console";
                document.body.appendChild(this.container);
            }
        }
    }

    this.TemplateControl = function (oContainer, oTemplate) {
        var o = document.createElement("div");
        o.Type = "TemplateControl";

        this.LoadComplete = function (data) {
            o.innerHTML = data;
            OFramework.ProcessTemplate(o, o.firstChild);
        }
        var tLoader = new OFramework.HtmlLoader(this.LoadComplete);
        tLoader.open("GET", oTemplate + ".html", true);
        tLoader.send(null);


        if (oContainer != null) oContainer.appendChild(o);
        return o;

    }

    //GetDistance : return distance between 2 geo location
    this.GetDistance = function (lat1, lon1, lat2, lon2, unit) {
        //Unit: 'M' is statute miles (default) // 'K' is kilometers // 'N' is nautical miles
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist
    }

    this.AirSearchForm = function (oContainer) {


        OFramework.DataSources.airports_geo_info = [];
        OFramework.DataSources.airports_geo_info.DataLoaded = false;
        //load airport_geo_info js file 
        var imported = document.createElement('script');
        imported.src = OFramework.ContentURI + '/JSLib/airports_geo_info.min.js';
        document.head.appendChild(imported);
        //load google jsapi js file 
        var imported2 = document.createElement('script');
        imported2.src = 'https://www.google.com/jsapi';
        document.head.appendChild(imported2);

        if (oContainer == null) return;
        oContainer.className = "OFContainer";
        oContainer.Type = "AirSearchForm";
        oContainer.innerHTML = "loading...";
        oContainer.Target = "_top";
        oContainer.TargetURL = null;
        oContainer.StateBag = new Array();
        oContainer.SearchType = "RoundTrip";
        oContainer.onChange = null; //

        oContainer.LoadComplete = function (data, success) {
            if (success) {
                data = data.replace(/ContainerId/g, oContainer.id);
                oContainer.innerHTML = data.replace(/Container./g, "document.getElementById('" + oContainer.id + "').");

                OFramework.ProcessTemplate(oContainer, oContainer.firstChild);
                window.setTimeout("document.getElementById('" + oContainer.id + "').Init()", 50);
            }
            else oContainer.innerHTML = "Error loading template source";
        }
        //If here we get the value of "AirAdminSearchFormFileName" then it will display that particular html form.
        if (OFramework.QSParams["AirAdminSearchFormFileName"] != null && OFramework.QSParams["AirAdminSearchFormFileName"] != undefined && OFramework.QSParams["AirAdminSearchFormFileName"] != "") {
            var tLoader = new OFramework.HtmlTemplateLoader(oContainer, oContainer.LoadComplete).Load(OFramework.QSParams["AirAdminSearchFormFileName"]);
        }
            //else it will displays default form of Air.
        else {
            var tLoader = new OFramework.HtmlTemplateLoader(oContainer, oContainer.LoadComplete).Load("air_search_form");
        }
        oContainer.DataSource = new OFramework.DataSources.JSDataSource("Countries", oContainer);
        oContainer.DataBind = function () {
            if (this.DataSource.DataLoaded && this.To.DataSource.DataLoaded) {
                if (this.StateBag["ResOption"] != null) {
                    this.ResOption.checked = true;
                    this.ResOption.value = this.StateBag["ResOption"];
                }
                for (var i = 0; i < this.To.DataSource.length; i++) {
                    if (this.To.DataSource[i].id == this.To.Value) {
                        this.CheckResidency(this.To.DataSource[i]);
                        break;
                    }
                }
            }
            else {
                window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 50);
            }

            var getMinDistance = function (currLat, currLong) {
                //Check if Airports with Geocode data loaded or not and it should be from default page.
                if (OFramework.DataSources.airports_geo_info.DataLoaded) {
                    var _minimumAirPortCode;
                    var _minimumDistance = 99999999;
                    // looping through all airports from datasource and trying to find out airports with minimal distance from locaion of the user
                    for (var i = 0; i < OFramework.DataSources.airports_geo_info.length; i++) {
                        // lat and long been captured from browser's geo object
                        var lat = OFramework.DataSources.airports_geo_info[i].lat; //get Airports Latitude  
                        var long = OFramework.DataSources.airports_geo_info[i].long; //get Airports Longitude
                        // we are using standard formula to calculate distance between two GEO points. This is not actual road distance but point to point distance
                        minDistance = OFramework.GetDistance(currLat, currLong, lat, long, "K"); //call GetDistance and get distance between current geoLocation and Airport's geoLocation. Here "K" stands for kilometer
                        // get minimum distance out here
                        if (minDistance < _minimumDistance) {
                            _minimumDistance = minDistance; //get minimal distance between current geoLocation and Airport's geoLocation
                            _minimumAirPortCode = OFramework.DataSources.airports_geo_info[i].id; //get Id(Airport code) of the nearest airport
                        }
                    }
                    //check nearest airport's distance is less than 250km , then only require to set airport value
                    if (_minimumDistance < 250) {
                        // set value of nearby airport back to oframework
                        if (oContainer.From && oContainer.From != undefined && oContainer.From != null && oContainer.From.Value == "") {
                            oContainer.From.SetValue(_minimumAirPortCode); //set Id(Airport code) of the nearest airport for "Oneway" and "RoundTrip"
                        }
                        inputs = document.querySelectorAll("#" + oContainer.To.id);// set bydefault focus on To city box
                        inputs[0].focus();

                        // multicity 

                        if (oContainer.FromCity_0 && oContainer.FromCity_0 != undefined && oContainer.FromCity_0 != null && oContainer.FromCity_0.Value == "") {
                            oContainer.FromCity_0.SetValue(_minimumAirPortCode); //set Id(Airport code) of the nearest airport for "Multicity"
                        }
                    }
                    else {
                        inputs = document.querySelectorAll("#" + oContainer.From.id);// set bydefault focus on To city box
                        inputs[0].focus();

                    }
                }
            }

            var getNearbyAirport = function (position) {
                var currLong = position.coords.longitude; //get current location Latitude 
                var currLat = position.coords.latitude; //get current location Longitude  

                getMinDistance(currLat, currLong);

            };

            //call getError ,if any error occurs during getCurrentPosition
            var getError = function (err) {
                //console.log(err);
                //OFramework.Console.WriteLn(err);
                var currLong = google.loader.ClientLocation.latitude; //get current location Latitude 
                var currLat = google.loader.ClientLocation.longitude;  //get current location Longitude  

                getMinDistance(currLat, currLong);
                //console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            var shareLoc = document.querySelectorAll("[sharelocation]"); // get sharelocation attribute from searchfrom 
            var sharelocation = "true"; // by default value is true , so that who didn't mention for them share_location will work. to hide share location need to set attribute as false.
            if (shareLoc.length > 0) {
                sharelocation = shareLoc[0].getAttribute("sharelocation");// get sharelocation value from searchfrom
            }

            if (sharelocation == "true" && oContainer.From != undefined && oContainer.From != null && oContainer.From.Value == "") {
                if (navigator.geolocation) {
                    //return geoLocaiton , on Success call getNearbyAirport , on Error call getError
                    navigator.geolocation.getCurrentPosition(getNearbyAirport, getError);
                }
            }
        }
        oContainer.Set = function (f, v) {
            var oElem = OFramework.Eval(this, f);
            if (oElem) {
                switch (f) {
                    case "SearchType": this.SearchType = v; break;
                    case "NonStopOption": this[f].checked = (v == "true"); break;
                    case "RefOption": this[f].checked = (v == "true"); break;
                    case "ResOption": this.StateBag[f] = v; break;
                    case "FromDate": this.FromDate.SetValue(OFramework.DateFromString(v), true); break;
                    case "ReturnDate": this.ReturnDate.SetValue(OFramework.DateFromString(v), true); break;

                    case "MultiCityTBL.FlyDate.0": oElem.SetValue(OFramework.DateFromString(v), true); break;
                    case "MultiCityTBL.FlyDate.1": oElem.SetValue(OFramework.DateFromString(v), true); break;
                    case "MultiCityTBL.FlyDate.2": oElem.SetValue(OFramework.DateFromString(v), true); break;
                    case "MultiCityTBL.FlyDate.3": oElem.SetValue(OFramework.DateFromString(v), true); break;
                    case "MultiCityTBL.FlyDate.4": oElem.SetValue(OFramework.DateFromString(v), true); break;
                    case "MultiCityTBL.FlyDate.5": oElem.SetValue(OFramework.DateFromString(v), true); break;

                    default: if (oElem.SetValue) oElem.SetValue(v);
                }
            }
            else this.StateBag[f] = v;
        }
        oContainer.Init = function () {
            this.From = document.getElementById(this.id + '_From');
            this.FromCity_0 = document.getElementById(this.id + '_FromCity_0');
            this.FromDate = document.getElementById(this.id + '_FromDate');
            this.FlyDate_0 = document.getElementById(this.id + '_FlyDate_0'); //set flydate
            this.FromTime = document.getElementById(this.id + '_FromTime');
            this.FromInterval = document.getElementById(this.id + '_FromInterval');
            this.FromRadius = document.getElementById(this.id + '_FromRadius');

            this.To = document.getElementById(this.id + '_To');
            this.ToCity_0 = document.getElementById(this.id + '_ToCity_0'); //set city box  
            this.ReturnDate = document.getElementById(this.id + '_ReturnDate');
            this.ReturnTime = document.getElementById(this.id + '_ReturnTime');
            this.ToInterval = document.getElementById(this.id + '_ToInterval');
            this.ToRadius = document.getElementById(this.id + '_ToRadius');

            this.Adults = document.getElementById(this.id + '_Adults');
            if (this.id + '_CurrId' != undefined && this.id + '_CurrId' != null) {  //if CurrId Element is available
                this.CurrId = document.getElementById(this.id + '_CurrId');    // set/create Currency in Search Form
            }
            this.Seniors = document.getElementById(this.id + '_Seniors');
            this.Youths = document.getElementById(this.id + '_Youths');
            this.Children = document.getElementById(this.id + '_Children');
            this.InfantsInLap = document.getElementById(this.id + '_InfantsInLap');
            this.InfantsInSeat = document.getElementById(this.id + '_InfantsInSeat');

            this.IncPax = document.getElementById(this.id + '_IncPaxCHK');/*added checkbox include pax detail for clone booking.*/
            this.AdultsCount = document.getElementById(this.id + '_AdultsCount');
            this.ChildrenCount = document.getElementById(this.id + '_ChildrenCount');
            this.InfantsInLapCount = document.getElementById(this.id + '_InfantsInLapCount');
            this.InfantsInSeatCount = document.getElementById(this.id + '_InfantsInSeatCount');

            this.PrefAirline = document.getElementById(this.id + '_Airlines');
            this.PrefAirlineTwo = document.getElementById(this.id + '_AirlinesTwo');
            this.PrefAirlineThree = document.getElementById(this.id + '_AirlinesThree');
            this.Class = document.getElementById(this.id + '_Class');
            this.NonStopOption = document.getElementById(this.id + '_NonStopOption');
            this.RefOption = document.getElementById(this.id + '_RefundableOption');
            this.ResOption = document.getElementById(this.id + '_ResidentCHK');

            this.FieldGuestCount = document.getElementById(this.id + '_FieldGuestCount');

            this.Panels = new Object();
            this.Panels.FromTo = document.getElementById(this.id + '_FromToPanel');
            this.Panels.Dates = document.getElementById(this.id + '_DatesPanel');
            this.Panels.Return = document.getElementById(this.id + '_ReturnPanel');
            this.Panels.Residency = document.getElementById(this.id + '_ResidencyPanel');
            this.Panels.MultiCity = document.getElementById(this.id + '_MultiCityPanel');
            this.Panels.RowOne = document.getElementById(this.id + '_RowOnePanel');
            this.Panels.RowTwo = document.getElementById(this.id + '_RowTwoPanel');
            this.Panels.RowThree = document.getElementById(this.id + '_RowThreePanel');
            this.Panels.RowFour = document.getElementById(this.id + '_RowFourPanel');
            this.Panels.ReturnDate = document.getElementById(this.id + '_ReturnDatePanel');
            this.Panels.ReturnDateLBL = document.getElementById(this.id + '_ReturnDateLBL');
            this.Panels.ReturnTime = document.getElementById(this.id + '_ReturnTimePanel');
            this.Panels.ReturnTimeLBL = document.getElementById(this.id + '_ReturnTimeLBL');

            this.SType = new Object()
            this.SType.DDList = document.getElementById(this.id + '_SearchTypeDD');
            this.SType.RoundTrip = document.getElementById(this.id + '_SearchTypeRoundTrip');
            this.SType.OneWay = document.getElementById(this.id + '_SearchTypeOneWay');
            this.SType.MultiDestination = document.getElementById(this.id + '_SearchTypeMultiDestination');

            if (this.Panels.Residency != null) {
                this.Panels.Residency.Label = document.getElementById(this.id + '_ResidencyLBL');
                this.Panels.Residency.Template = this.Panels.Residency.Label.innerHTML;
            }
            if (document.getElementById(this.id + '_FromIntervalCHK') != null) {
                this.FromInterval = document.getElementById(this.id + '_FromIntervalCHK');
                this.FromInterval.Value = "";
                this.FromInterval.SetValue = function (v) { if (v >= this.value) { this.checked = true; this.Value = v } else { this.Value = ""; } }
                this.FromInterval.onchange = function () { this.Value = this.checked ? this.value : "" };
            }
            if (document.getElementById(this.id + '_ToIntervalCHK') != null) {
                this.ToInterval = document.getElementById(this.id + '_ToIntervalCHK');
                this.ToInterval.Value = "";
                this.ToInterval.SetValue = function (v) { if (v >= this.value) { this.checked = true; this.Value = v } else { this.Value = ""; } }
                this.ToInterval.onchange = function () { this.Value = this.checked ? this.value : "" };
            }
            if (document.getElementById(this.id + '_IntervalCHK') != null) {
                this.FromInterval = document.getElementById(this.id + '_IntervalCHK');
                this.FromInterval.Value = "";
                this.FromInterval.SetValue = function (v) { if (v >= this.value) { this.checked = true; this.Value = v } else { this.Value = ""; } }
                this.FromInterval.onchange = function () { this.Value = this.checked ? this.value : "" };
                this.ToInterval = this.FromInterval;
            }
            if (document.getElementById(this.id + '_FromRadiusCHK') != null) {
                this.FromRadius = document.getElementById(this.id + '_FromRadiusCHK');
                this.FromRadius.Value = "";
                this.FromRadius.SetValue = function (v) { if (this.value == v) { this.checked = true; this.Value = v } else { this.Value = ""; } }
                this.FromRadius.onchange = function () { this.Value = this.checked ? this.value : "" };
            }
            if (document.getElementById(this.id + '_ToRadiusCHK') != null) {
                this.ToRadius = document.getElementById(this.id + '_ToRadiusCHK');
                this.ToRadius.Value = "";
                this.ToRadius.SetValue = function (v) { if (this.value == v) { this.checked = true; this.Value = v } else { this.Value = ""; } }
                this.ToRadius.onchange = function () { this.Value = this.checked ? this.value : "" };
            }
            if (document.getElementById(this.id + '_RadiusCHK') != null) {
                this.FromRadius = document.getElementById(this.id + '_RadiusCHK');
                this.FromRadius.Value = "";
                this.FromRadius.SetValue = function (v) { if (this.value == v) { this.checked = true; this.Value = v } else { this.Value = ""; } }
                this.FromRadius.onchange = function () { this.Value = this.checked ? this.value : "" };
                this.ToRadius = this.FromRadius;
            }
            if (document.getElementById(this.id + '_IncPaxCHK') != null) {/*added checkbox include pax detail for clone booking.*/
                this.IncPax = document.getElementById(this.id + '_IncPaxCHK');
                this.IncPax.Value = "";
                this.IncPax.SetValue = function (v) { if (this.value == v) { this.checked = true; this.Value = v } else { this.Value = ""; } }
                this.IncPax.onchange = function () { this.Value = this.checked ? this.value : "" };
            }
            //set default values
            var today = new Date(); today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var offset = isNaN(OFramework.QSParams["MinAirDepartureDate"]) ? 0 : parseInt(OFramework.QSParams["MinAirDepartureDate"], 0) + 1;
            var mDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
            var dDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
            var rDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

            this.From.SetCurrentLocation = true;
            this.FromDate.MinDate = mDate;
            if (this.FlyDate_0 != undefined && this.FlyDate_0 != null) {
                this.FlyDate_0.MinDate = mDate; //set min date for flydate_0
                this.FlyDate_0.SetValue(dDate);
            }
            this.FromDate.SetValue(dDate);
            this.ReturnDate.MinDate = dDate;
            this.ReturnDate.SetValue(rDate);

            if (this.FromDate.Type == "DatePicker") {
                this.FromDate.StartDateOfRange = dDate;
                this.FromDate.EndDateOfRange = rDate;
                this.FromDate.Init();
            }
            if (this.ReturnDate.Type == "DatePicker") {
                this.ReturnDate.StartDateOfRange = dDate;
                this.ReturnDate.EndDateOfRange = rDate;
                this.ReturnDate.Init();
            }

            if (this.Adults != undefined && this.Adults != null)
                this.Adults.SetValue(1);

            if (this.CurrId != undefined && this.CurrId != null && OFramework.QSParams["CurrencyId"] != null) {
                this.CurrId.SetValue(OFramework.QSParams["CurrencyId"]);            //Set Currency value to Element(CurrId) from searchbox
            }

            this.MultiCityTBL = document.getElementById(this.id + '_MultiCityTBL');
            if (this.MultiCityTBL != undefined && this.MultiCityTBL != null) {
                this.MultiCityTBL.Items = 2;/*By default at least two rows in multi city search form*/
                this.MultiCityTBL.rows[1].style.display = "table-row";/*Visible 2nd row in multi city search form*/
                this.MultiCityTBL.From = new Array();
                this.MultiCityTBL.To = new Array();
                this.MultiCityTBL.FlyDate = new Array();
                this.MultiCityTBL.FlyTime = new Array();
                for (var i = 0; i < 6; i++) {
                    this.MultiCityTBL.From[i] = document.getElementById(this.id + '_FromCity_' + i);
                    if (i == 0) this.MultiCityTBL.From[i].SetCurrentLocation = true;
                    this.MultiCityTBL.To[i] = document.getElementById(this.id + '_ToCity_' + i);
                    this.MultiCityTBL.FlyDate[i] = document.getElementById(this.id + '_FlyDate_' + i);
                    this.MultiCityTBL.FlyDate[i].MinDate = mDate;
                    if (this.MultiCityTBL.FlyDate[i].Type == "DatePicker") this.MultiCityTBL.FlyDate[i].Init();
                    //if(i==0)this.MultiCityTBL.FlyDate[i].SetValue(dDate);
                    this.MultiCityTBL.FlyTime[i] = document.getElementById(this.id + '_FlyTime_' + i);
                }
            }
            for (var f in this.StateBag) {
                var oElem = OFramework.Eval(this, f);
                if (!oElem) continue;
                switch (f) {
                    case "SearchType": this.SearchType = this.StateBag[f]; break;
                    case "NonStopOption": this[f].checked = (this.StateBag[f] == "true"); break;
                    case "RefOption": this[f].checked = (this.StateBag[f] == "true"); break;
                    case "ResOption": break;
                    case "FromDate": this.FromDate.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    case "ReturnDate": this.ReturnDate.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;

                    case "MultiCityTBL.Items":
                        {
                            while (this.MultiCityTBL.Items < this.StateBag[f]) this.AddSegment();
                            break;
                        }
                    case "MultiCityTBL.FlyDate.0": oElem.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    case "MultiCityTBL.FlyDate.1": oElem.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    case "MultiCityTBL.FlyDate.2": oElem.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    case "MultiCityTBL.FlyDate.3": oElem.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    case "MultiCityTBL.FlyDate.4": oElem.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    case "MultiCityTBL.FlyDate.5": oElem.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;

                    default: if (oElem.SetValue) oElem.SetValue(this.StateBag[f]);
                }
            }
            this.ChangeSearchType(this.SearchType);

            //set binding for fieldinfo control
            if (this.FieldGuestCount != null) {
                this.FieldGuestCount.Bindings = new Array();
                this.FieldGuestCount.Bindings["Adults"] = (this.AdultsCount != null) ? this.AdultsCount : (this.Adults != null ? this.Adults : null);
                this.FieldGuestCount.Bindings["Children"] = (this.ChildrenCount != null) ? this.ChildrenCount : (this.Children != null ? this.Children : null);
                this.FieldGuestCount.Bindings["InfantsInLap"] = (this.InfantsInLapCount != null) ? this.InfantsInLapCount : (this.InfantsInLap != null ? this.InfantsInLap : null);
                this.FieldGuestCount.Bindings["InfantsInSeat"] = (this.InfantsInSeatCount != null) ? this.InfantsInSeatCount : (this.InfantsInSeat != null ? this.InfantsInSeat : null);

                this.FieldGuestCount.DataBind();
            }
            //set field info control for numberBox
            if (this.AdultsCount != null && this.AdultsCount.FieldInfoType != null) {
                switch (this.AdultsCount.FieldInfoType) {
                    case "Guests":
                        {
                            this.AdultsCount.FieldInfo = this.FieldGuestCount;
                        }
                }
            }
            if (this.ChildrenCount != null && this.ChildrenCount.FieldInfoType != null) {
                switch (this.ChildrenCount.FieldInfoType) {
                    case "Guests":
                        {
                            this.ChildrenCount.FieldInfo = this.FieldGuestCount;
                        }
                }
            }
            if (this.InfantsInLapCount != null && this.InfantsInLapCount.FieldInfoType != null) {
                switch (this.InfantsInLapCount.FieldInfoType) {
                    case "Guests":
                        {
                            this.InfantsInLapCount.FieldInfo = this.FieldGuestCount;
                        }
                }
            }
            if (this.InfantsInSeatCount != null && this.InfantsInSeatCount.FieldInfoType != null) {
                switch (this.InfantsInSeatCount.FieldInfoType) {
                    case "Guests":
                        {
                            this.InfantsInSeatCount.FieldInfo = this.FieldGuestCount;
                        }
                }
            }

            if (this.MultiCityTBL != undefined && this.MultiCityTBL != null && this.MultiCityTBL.Items == 2) {
                var removeSegments = document.getElementsByClassName("remove_segment");
                if (removeSegments != null && removeSegments.length > 0) {
                    removeSegments[0].setAttribute("disabled", "disabled");
                    removeSegments[0].setAttribute("href", "#");
                }
            }
            OFramework.CurrentFormId = this.id;
            var currentFormID = this.id; //get current form id e.g. airsearchform

            this.DataBind();
        }
        oContainer.FieldChanged = function (obj, val) {
            switch (obj.id) {
                case this.id + "_SearchTypeDD":
                    {
                        this.ChangeSearchType(this.SType.DDList.Value);
                        break;
                    }
                case this.id + "_To":
                    {
                        this.CheckResidency(val);
                        break;
                    }
                case this.id + "_FromDate":
                    {
                        var showReturnDate = false;
                        this.ReturnDate.MinDate = this.FromDate.Value;
                        if (this.ReturnDate.Value == null || (this.ReturnDate.Value != null && val.CompareTo(this.ReturnDate.Value) > -1)) {
                            this.ReturnDate.SetValue(val.Add(0, 0, 7), true);
                        }
                        if (this.FromDate.Type == "DatePicker" && this.ReturnDate.AutoFocus && this.Panels.Return != null && this.Panels.Return.style.display != "none") {//auto focus regardless, no matter what the date in return field
                            showReturnDate = true;
                        }
                        if (this.FromDate.Type == "DatePicker") {
                            this.FromDate.StartDateOfRange = this.FromDate.Value;
                            this.FromDate.EndDateOfRange = this.ReturnDate.Value;
                            this.ReturnDate.StartDateOfRange = this.FromDate.Value;
                            this.ReturnDate.EndDateOfRange = this.ReturnDate.Value;
                            if (this.ReturnDate.AutoFocus && showReturnDate) {
                                this.ReturnDate.Show();
                            }
                        }



                        break;
                    }
                case this.id + "_ReturnDate":
                    {
                        if (this.ReturnDate.Type == "DatePicker") {
                            this.FromDate.StartDateOfRange = this.FromDate.Value;
                            this.FromDate.EndDateOfRange = this.ReturnDate.Value;
                            this.ReturnDate.StartDateOfRange = this.FromDate.Value;
                            this.ReturnDate.EndDateOfRange = this.ReturnDate.Value;
                        }
                        break;
                    }
                case this.id + "_FlyDate_0":
                    {
                        var dObj = this.MultiCityTBL.FlyDate[1];
                        if (dObj == null) return;
                        dObj.MinDate = this.MultiCityTBL.FlyDate[0].Value;
                        if (dObj.Value != null && dObj.Value.CompareTo(val) < 0) dObj.SetValue(val, true);
                        break;
                    }
                case this.id + "_FlyDate_1":
                    {
                        var dObj = this.MultiCityTBL.FlyDate[2];
                        dObj.MinDate = this.MultiCityTBL.FlyDate[1].Value;
                        if (dObj == null) return;
                        if (dObj.Value != null && dObj.Value.CompareTo(val) < 0) dObj.SetValue(val, true);
                        break;
                    }
                case this.id + "_FlyDate_2":
                    {
                        var dObj = this.MultiCityTBL.FlyDate[3];
                        dObj.MinDate = this.MultiCityTBL.FlyDate[2].Value;
                        if (dObj == null) return;
                        if (dObj.Value != null && dObj.Value.CompareTo(val) < 0) dObj.SetValue(val, true);
                        break;
                    }
                case this.id + "_FlyDate_3":
                    {
                        var dObj = this.MultiCityTBL.FlyDate[4];
                        dObj.MinDate = this.MultiCityTBL.FlyDate[3].Value;
                        if (dObj == null) return;
                        if (dObj.Value != null && dObj.Value.CompareTo(val) < 0) dObj.SetValue(val, true);
                        break;
                    }
                case this.id + "_FlyDate_4":
                    {
                        var dObj = this.MultiCityTBL.FlyDate[5];
                        dObj.MinDate = this.MultiCityTBL.FlyDate[4].Value;
                        if (dObj == null) return;
                        if (dObj.Value != null && dObj.Value.CompareTo(val) < 0) dObj.SetValue(val, true);
                        break;
                    }
                case this.id + "_FlyDate_5":
                    {
                        var dObj = this.MultiCityTBL.FlyDate[6];
                        if (dObj == null) return;
                        dObj.MinDate = this.MultiCityTBL.FlyDate[5].Value;
                        if (dObj.Value != null && dObj.Value.CompareTo(val) < 0) dObj.SetValue(val, true);
                        break;
                    }
            }
            if (this.onChange) this.onChange.call(null, obj.id);
        }
        oContainer.ChangeSearchType = function (val) {
            var objId = "";
            switch (val) {
                case "OneWay":
                    {


                        if (oContainer.From.value != "") {
                            inputs = document.querySelectorAll("#" + oContainer.To.id); //focus on to city box when click on the oneway tab.
                            inputs[0].focus();
                        }
                        else {
                            inputs = document.querySelectorAll("#" + oContainer.From.id); //focus on from city box when click on the oneway tab.
                            inputs[0].focus();
                        }
                        //Added Below lines for Enable checkbox.
                        if (oContainer.ToInterval != null) oContainer.ToInterval.disabled = false;
                        if (oContainer.ToRadius != null) oContainer.ToRadius.disabled = false;
                        //end here.
                        var dsp = (document.all && !window.atob) ? "block" : "table-row";
                        if (this.Panels.FromTo) this.Panels.FromTo.style.display = dsp;
                        if (this.Panels.Dates) this.Panels.Dates.style.display = dsp;
                        if (this.Panels.Return) this.Panels.Return.style.display = "none";
                        if (this.Panels.MultiCity) this.Panels.MultiCity.style.display = "none";

                        if (this.Panels.RowOne) this.Panels.RowOne.style.display = dsp;
                        if (this.Panels.RowTwo) this.Panels.RowTwo.style.display = dsp;
                        if (this.Panels.RowThree) this.Panels.RowThree.style.display = dsp;
                        if (this.Panels.RowFour) this.Panels.RowFour.style.display = dsp;

                        if (this.Panels.ReturnDateLBL) this.Panels.ReturnDateLBL.style.visibility = "hidden";
                        if (this.Panels.ReturnDate) this.Panels.ReturnDate.style.visibility = "hidden";
                        if (this.Panels.ReturnTimeLBL) this.Panels.ReturnTimeLBL.style.visibility = "hidden";
                        if (this.Panels.ReturnTime) this.Panels.ReturnTime.style.visibility = "hidden";

                        if (this.SType.OneWay != null) {
                            objId = this.SType.OneWay.id;
                            if (!this.SType.OneWay.checked) {
                                this.SType.OneWay.checked = true;
                                /*
                                //for apply active class on change SearchType(RouteType) options                                
                                ojQ(this.SType.OneWay).closest('li').siblings().removeClass('active');
                                ojQ(this.SType.OneWay).closest('li').addClass('active');
                                */
                            }
                        }
                        break;
                    }
                case "RoundTrip":
                    {
                        if (oContainer.From.value != "") {
                            inputs = document.querySelectorAll("#" + oContainer.To.id); //focus on to city box when click on the oneway tab.
                            inputs[0].focus();
                        }
                        else {
                            inputs = document.querySelectorAll("#" + oContainer.From.id); //focus on from city box when click on the oneway tab.
                            inputs[0].focus();
                        }
                        //Added Below lines for Enable checkbox.
                        if (oContainer.ToInterval != null) oContainer.ToInterval.disabled = false;
                        if (oContainer.ToRadius != null) oContainer.ToRadius.disabled = false;
                        //end here.
                        if (Date.parse(this.FromDate.Value) > Date.parse(this.ReturnDate.Value)) { // check if return date is less than from date then it should be update with the +7 days.
                            this.ReturnDate.MinDate = this.FromDate.Value;
                            this.ReturnDate.SetValue((this.FromDate.Value).Add(0, 0, 7), true);
                            this.ReturnDate.StartDateOfRange = this.FromDate.Value;
                            this.ReturnDate.EndDateOfRange = this.ReturnDate.Value;
                        }

                        var dsp = (document.all && !window.atob) ? "block" : "table-row";
                        if (this.Panels.FromTo) this.Panels.FromTo.style.display = dsp;
                        if (this.Panels.Dates) this.Panels.Dates.style.display = dsp;
                        if (this.Panels.Return) this.Panels.Return.style.display = dsp;
                        if (this.Panels.MultiCity) this.Panels.MultiCity.style.display = "none";

                        if (this.Panels.RowOne) this.Panels.RowOne.style.display = dsp;
                        if (this.Panels.RowTwo) this.Panels.RowTwo.style.display = dsp;
                        if (this.Panels.RowThree) this.Panels.RowThree.style.display = dsp;
                        if (this.Panels.RowFour) this.Panels.RowFour.style.display = dsp;

                        if (this.Panels.ReturnDateLBL) this.Panels.ReturnDateLBL.style.visibility = "visible";
                        if (this.Panels.ReturnDate) this.Panels.ReturnDate.style.visibility = "visible";
                        if (this.Panels.ReturnTimeLBL) this.Panels.ReturnTimeLBL.style.visibility = "visible";
                        if (this.Panels.ReturnTime) this.Panels.ReturnTime.style.visibility = "visible";

                        if (this.SType.RoundTrip != null) {
                            objId = this.SType.RoundTrip.id;
                            if (!this.SType.RoundTrip.checked) {
                                this.SType.RoundTrip.checked = true;
                                /*
                                //for apply active class on change SearchType(RouteType) options
                                    ojQ(this.SType.RoundTrip).closest('li').siblings().removeClass('active');
                                    ojQ(this.SType.RoundTrip).closest('li').addClass('active');
                                    */
                            }
                        }
                        break;
                    }
                case "MultiDestination":
                    {
                        if (oContainer.FromCity_0 != undefined && oContainer.FromCity_0 != null && oContainer.FromCity_0.value != "") {
                            inputs = document.querySelectorAll("#" + oContainer.ToCity_0.id); //focus on to city box when click on the oneway tab.
                            inputs[0].focus();
                        }
                        else if (oContainer.FromCity_0 != undefined && oContainer.FromCity_0) {
                            inputs = document.querySelectorAll("#" + oContainer.FromCity_0.id); //focus on from city box when click on the oneway tab.
                            inputs[0].focus();
                        }
                        //Added Below lines for Disable checkbox of "Flexible dates" and "Nearby airports".
                        if (oContainer.ToInterval != null) { oContainer.ToInterval.disabled = true; oContainer.ToInterval.checked = false; }
                        if (oContainer.ToRadius != null) { oContainer.ToRadius.disabled = true; oContainer.ToRadius.checked = false; }
                        //end here
                        if (this.Panels.FromTo) this.Panels.FromTo.style.display = "none";
                        if (this.Panels.Dates) this.Panels.Dates.style.display = "none";
                        if (this.Panels.MultiCity) this.Panels.MultiCity.style.display = (document.all && !window.atob) ? "block" : "table-row";

                        if (this.Panels.RowOne) this.Panels.RowOne.style.display = "none";
                        if (this.Panels.RowTwo) this.Panels.RowTwo.style.display = "none";
                        if (this.Panels.RowThree) this.Panels.RowThree.style.display = "none";
                        if (this.Panels.RowFour) this.Panels.RowFour.style.display = "none";

                        if (this.SType.MultiDestination != null) {
                            objId = this.SType.MultiDestination.id;
                            if (!this.SType.MultiDestination.checked) {
                                this.SType.MultiDestination.checked = true;
                                /*
                                //for apply active class on change SearchType(RouteType) options
                                    ojQ(this.SType.MultiDestination).closest('li').siblings().removeClass('active');
                                    ojQ(this.SType.MultiDestination).closest('li').addClass('active');
                                    */
                            }
                        }
                        break;
                    }
            }

            this.SearchType = val; //set oframwork searchtype like oneway/roundtrip
            OFramework.SearchType = val;
            if (this.onChange) this.onChange.call(null, objId);
        }
        oContainer.AddSegment = function () {
            if (this.MultiCityTBL.Items == 6) return;
            if (this.MultiCityTBL.Items == 5) {
                var add_segment = document.getElementsByClassName("add_segment");
                if (add_segment != null && add_segment.length > 0) {
                    add_segment[0].setAttribute("disabled", "disabled");
                    add_segment[0].setAttribute("href", "#");
                }
            }
            var remove_segment = document.getElementsByClassName("remove_segment");
            if (remove_segment != null && remove_segment.length > 0) {
                remove_segment[0].removeAttribute("disabled");
                remove_segment[0].setAttribute("href", "Javascript:document.getElementById('" + oContainer.id + "').RemoveSegment()");
            }
            var dObj = this.MultiCityTBL.FlyDate[this.MultiCityTBL.Items];
            if (this.MultiCityTBL.FlyDate[this.MultiCityTBL.Items - 1].Value != null) {
                dObj.MinDate = this.MultiCityTBL.FlyDate[this.MultiCityTBL.Items - 1].Value;
            }
            else {
                for (i = this.MultiCityTBL.Items; i > 0; i--) {
                    if (this.MultiCityTBL.FlyDate[i - 1].Value != null) {
                        dObj.MinDate = this.MultiCityTBL.FlyDate[i - 1].Value;
                        break;
                    }
                }
            }
            this.MultiCityTBL.rows[this.MultiCityTBL.Items].style.display = (document.all && !window.atob) ? "block" : "table-row";
            this.MultiCityTBL.Items++;
        }
        oContainer.RemoveSegment = function () {
            if (this.MultiCityTBL.Items <= 2) return;
            if (this.MultiCityTBL.Items == 3) {
                var remove_segment = document.getElementsByClassName("remove_segment");
                if (remove_segment != null && remove_segment.length > 0) {
                    remove_segment[0].setAttribute("disabled", "disabled");
                    remove_segment[0].setAttribute("href", "#");
                }
            }
            var add_segment = document.getElementsByClassName("add_segment");
            if (add_segment != null && add_segment.length > 0) {
                add_segment[0].removeAttribute("disabled");
                add_segment[0].setAttribute("href", "Javascript:document.getElementById('" + oContainer.id + "').AddSegment()");
            }
            this.MultiCityTBL.Items--;
            this.MultiCityTBL.rows[this.MultiCityTBL.Items].style.display = "none";
        }
        oContainer.FromToSwap = function (swapId) { //swapping value of from and to city.
            if (swapId.match((/swapper.+$/gi))) {               //     if Multicity
                var multiMatch = swapId.match((/swapper.+$/gi));
                var swapper = multiMatch[0].toLowerCase();
                var position = swapper.match((/\d$/gi));
                switch (swapper) {
                    case 'swapper_0':
                        {
                            var ToCity = oContainer.ToCity_0.Value;  // get Id of to_city_0
                            var FromCity = oContainer.FromCity_0.Value; // get Id of from_city_0
                            oContainer.ToCity_0.SetValue(FromCity); // set value of to_city_0
                            oContainer.FromCity_0.SetValue(ToCity); // set value of from_city_0
                            break;
                        }
                    case 'swapper_1':
                        {
                            var ToCity = oContainer.MultiCityTBL.To[1].Value;  // get Id of to_city_1
                            var FromCity = oContainer.MultiCityTBL.From[1].Value; // get Id of from_city_1
                            oContainer.MultiCityTBL.To[1].SetValue(FromCity); // set value of to_city_1
                            oContainer.MultiCityTBL.From[1].SetValue(ToCity); // set value of from_city_1
                            break;
                        }
                    case 'swapper_2':
                        {
                            var ToCity = oContainer.MultiCityTBL.To[2].Value;  // get Id of to_city_2
                            var FromCity = oContainer.MultiCityTBL.From[2].Value; // get Id of from_city_2
                            oContainer.MultiCityTBL.To[2].SetValue(FromCity); // set value of to_city_2
                            oContainer.MultiCityTBL.From[2].SetValue(ToCity); // set value of from_city_2
                            break;
                        }
                    case 'swapper_3':
                        {
                            var ToCity = oContainer.MultiCityTBL.To[3].Value;  // get Id of to_city_3
                            var FromCity = oContainer.MultiCityTBL.From[3].Value; // get Id of from_city_3
                            oContainer.MultiCityTBL.To[3].SetValue(FromCity); // set value of to_city_3
                            oContainer.MultiCityTBL.From[3].SetValue(ToCity); // set value of from_city_3
                            break;
                        }
                    case 'swapper_4':
                        {
                            var ToCity = oContainer.MultiCityTBL.To[4].Value;  // get Id of to_city_4
                            var FromCity = oContainer.MultiCityTBL.From[4].Value; // get Id of from_city_4
                            oContainer.MultiCityTBL.To[4].SetValue(FromCity); // set value of to_city_4
                            oContainer.MultiCityTBL.From[4].SetValue(ToCity); // set value of from_city_4
                            break;
                        }
                    case 'swapper_5':
                        {
                            var ToCity = oContainer.MultiCityTBL.To[5].Value;  // get Id of to_city_5
                            var FromCity = oContainer.MultiCityTBL.From[5].Value; // get Id of from_city_5
                            oContainer.MultiCityTBL.To[5].SetValue(FromCity); // set value of to_city_5
                            oContainer.MultiCityTBL.From[5].SetValue(ToCity); // set value of from_city_5
                            break;
                        }
                }
            }
            else if (swapId.match((/swapper$/gi))) {            //    if  Roundway && Oneway
                var ToCity = oContainer.To.Value;  // get Id of to city
                var FromCity = oContainer.From.Value; // get Id of from city
                oContainer.To.SetValue(FromCity); // set value of to city
                oContainer.From.SetValue(ToCity); // set value of from city
            }
        }
        oContainer.CheckResidency = function (val) {
            if (this.Panels.Residency == null) return;
            this.Panels.Residency.style.display = "none";
            if (this.ResOption != null) this.ResOption.checked = val != null ? this.ResOption.checked && this.ResOption.value == val.country : false;

            if (!val) return;
            if (this.DataSource != null && this.DataSource.DataLoaded) {
                for (var i = 0; i < this.DataSource.length; i++) {
                    var ds = this.DataSource[i];
                    if (ds.id == val.country && ds.flag == "1") {
                        this.Panels.Residency.style.display = (document.all && !window.atob) ? "block" : "table-row";
                        if (this.ResOption != null) this.ResOption.value = ds.id;
                        this.Panels.Residency.Label.innerHTML = this.Panels.Residency.Template.replace('[country]', ds.name);
                        return;
                    }
                }
            }
        }
        oContainer.AdvancedSearch = function () {
            var baseStr = OFramework.BaseURI + "air/default.aspx";
            var sStr = baseStr.appendQS();

            if (!OFramework.Console.Write(sStr, this.Target)) window.open(sStr, this.Target);
        }
        oContainer.SubmitSearch = function () {
            if (!this.ValidateInput()) return;
            var baseStr = this.TargetURL == null ? OFramework.BaseURI + "air/default.aspx" : this.TargetURL;
            var sStr = baseStr.appendQS();
            if (OFramework.QSParams["uuid"] != null) sStr += (sStr == baseStr ? "?" : "&") + OFramework.QSParams["uuid"];

            var airSegCount = 2;
            var segmentData = "";

            var fromInterval = this.FromInterval != null ? this.FromInterval.Value : "";
            var toInterval = this.ToInterval != null ? this.ToInterval.Value : "";

            if (this.SearchType == "RoundTrip") {
                airSegCount = 2;
                segmentData += "AirSeg_1="
		            + this.From.Value
		            + "|" + this.To.Value
		            + "|" + this.FromDate.Value.ToString()
		            + "|" + (this.FromTime != null ? this.FromTime.Value : "")
		            + "|" + (this.FromRadius != null ? this.FromRadius.Value : "")
		            + "|" + (this.ToRadius != null ? this.ToRadius.Value : "")
		            + "|" + fromInterval
		            + "|" + toInterval
		            + "";
                segmentData += "&AirSeg_2="
		            + this.To.Value
		            + "|" + this.From.Value
		            + "|" + this.ReturnDate.Value.ToString()
		            + "|" + (this.ReturnTime != null ? this.ReturnTime.Value : "")
		            + "|" + (this.ToRadius != null ? this.ToRadius.Value : "")
		            + "|" + (this.FromRadius != null ? this.FromRadius.Value : "")
		            + "|" + toInterval
		            + "|" + fromInterval
		            + "";
            }

            if (this.SearchType == "OneWay") {
                airSegCount = 1;
                segmentData += "AirSeg_1="
		            + this.From.Value
		            + "|" + this.To.Value
		            + "|" + this.FromDate.Value.ToString()
		            + "|" + (this.FromTime != null ? this.FromTime.Value : "")
		            + "|" + (this.FromRadius != null ? this.FromRadius.Value : "")
		            + "|" + (this.ToRadius != null ? this.ToRadius.Value : "")
		            + "|" + fromInterval
		            + "|" + toInterval
		            + "";
            }
            if (this.SearchType == "MultiDestination") {
                airSegCount = this.MultiCityTBL.Items;
                for (var i = 0; i < airSegCount; i++) {
                    segmentData += (i > 0 ? "&" : "") + "AirSeg_" + (i + 1) + "="
		            + this.MultiCityTBL.From[i].Value
		            + "|" + this.MultiCityTBL.To[i].Value
		            + "|" + this.MultiCityTBL.FlyDate[i].Value.ToString()
		            + "|" + (((this.MultiCityTBL.FlyTime != null) && (this.MultiCityTBL.FlyTime[i] != null)) ? this.MultiCityTBL.FlyTime[i].Value : "")
		            + "|"
		            + "|"
		            + "|"
		            + "|"
		            + "";
                }
            }

            sStr += (sStr == baseStr ? "?" : "&") + "AirSegCount=" + airSegCount;

            var adultCount, seniorCount, youthCount, childCount, infLapCount, infSeatCount;

            adultCount = this.Adults != null ? parseInt(this.Adults.Value) : (this.AdultsCount != null ? parseInt(this.AdultsCount.Value) : 0);
            seniorCount = this.Seniors != null ? parseInt(this.Seniors.Value) : (this.SeniorsCount != null ? parseInt(this.SeniorsCount.Value) : 0);
            youthCount = this.Youths != null ? parseInt(this.Youths.Value) : (this.YouthsCount != null ? parseInt(this.YouthsCount.Value) : 0);
            childCount = this.Children != null ? parseInt(this.Children.Value) : (this.ChildrenCount != null ? parseInt(this.ChildrenCount.Value) : 0);
            infLapCount = this.InfantsInLap != null ? parseInt(this.InfantsInLap.Value) : (this.InfantsInLapCount != null ? parseInt(this.InfantsInLapCount.Value) : 0);
            infSeatCount = this.InfantsInSeat != null ? parseInt(this.InfantsInSeat.Value) : (this.InfantsInSeatCount != null ? parseInt(this.InfantsInSeatCount.Value) : 0);


            if (adultCount != 0) sStr += "&aCount=" + adultCount;
            if (seniorCount != 0) sStr += "&sCount=" + seniorCount;
            if (youthCount != 0) sStr += "&yCount=" + youthCount;
            if (childCount != 0) sStr += "&cCount=" + childCount;
            if (infLapCount != 0) sStr += "&iLCount=" + infLapCount;
            if (infSeatCount != 0) sStr += "&iSCount=" + infSeatCount;

            var airlines = "";
            if (this.PrefAirline != null && this.PrefAirline.Value != "") airlines = this.PrefAirline.Value;
            if (this.PrefAirlineTwo != null && this.PrefAirlineTwo.Value != "") airlines += (airlines != "" ? "," : "") + this.PrefAirlineTwo.Value;
            if (this.PrefAirlineThree != null && this.PrefAirlineThree.Value != "") airlines += (airlines != "" ? "," : "") + this.PrefAirlineThree.Value;
            if (airlines != "") sStr += "&Airline=" + airlines;

            if (this.Class != null && this.Class.Value != "") sStr += "&Class=" + this.Class.Value;
            if (this.CurrId != null && this.CurrId.Value != "") sStr += "&CurrId=" + this.CurrId.Value; //Set Currency Value to  URL (Query String)
            if (this.NonStopOption != null && this.NonStopOption.checked) sStr += "&DirectFlight=1";
            if (this.RefOption != null && this.RefOption.checked) sStr += "&Refundable=1";
            if (this.ResOption != null && this.ResOption.checked) sStr += "&Resident=" + this.ResOption.value;
            if (this.IncPax != null && this.IncPax != undefined) sStr += "&InclPax=" + this.IncPax.checked;/*added query string InclPax for include pax checkbox.*/
            if (OFramework.QSParams["tid"] != null && OFramework.QSParams["tid"] != undefined) sStr += "&CloneBooking=true&tid=" + OFramework.QSParams["tid"];/*added query string (tid)transaction for clonebooking.*/
            sStr += "&" + segmentData;
            if (!OFramework.Console.Write(sStr, this.Target)) window.open(sStr, this.Target);
        }
        oContainer.ValidateInput = function () {
            var alert_message = "";
            var adultCount, seniorCount, youthCount, childCount, infLapCount, infSeatCount;

            adultCount = this.Adults != null ? parseInt(this.Adults.Value) : (this.AdultsCount != null ? parseInt(this.AdultsCount.Value) : 0);
            seniorCount = this.Seniors != null ? parseInt(this.Seniors.Value) : (this.SeniorsCount != null ? parseInt(this.SeniorsCount.Value) : 0);
            youthCount = this.Youths != null ? parseInt(this.Youths.Value) : (this.YouthsCount != null ? parseInt(this.YouthsCount.Value) : 0);
            childCount = this.Children != null ? parseInt(this.Children.Value) : (this.ChildrenCount != null ? parseInt(this.ChildrenCount.Value) : 0);
            infLapCount = this.InfantsInLap != null ? parseInt(this.InfantsInLap.Value) : (this.InfantsInLapCount != null ? parseInt(this.InfantsInLapCount.Value) : 0);
            infSeatCount = this.InfantsInSeat != null ? parseInt(this.InfantsInSeat.Value) : (this.InfantsInSeatCount != null ? parseInt(this.InfantsInSeatCount.Value) : 0);

            if (this.SearchType == "OneWay" || this.SearchType == "RoundTrip") {
                if (this.From.Value == "") alert_message += " - departure city\n";
                if (this.To.Value == "") alert_message += " - arrival city\n";
            }
            else {
                if (this.MultiCityTBL != null) {
                    for (var i = 0; i < this.MultiCityTBL.Items; i++) {
                        if (this.MultiCityTBL.From[i].Value == "") alert_message += " - segment #" + (i + 1) + " departure city\n";
                        if (this.MultiCityTBL.To[i].Value == "") alert_message += " - segment #" + (i + 1) + " arrival city\n";
                        if (this.MultiCityTBL.FlyDate[i].Value == null) alert_message += " - segment #" + (i + 1) + " departure date\n";
                    }
                }
            }
            if (this.CurrId != undefined) if (this.CurrId == null || this.CurrId.Value == "") alert_message += " - Currency\n";  //Set validation for Currency Value.
            //if (this.Adults != null && this.Seniors != null && this.Children != null && this.InfantsInLap != null && this.InfantsInSeat != null) {
            if (adultCount + seniorCount < infLapCount) {
                alert_message += " - infants in lap must be less than the number of adults and/or seniors travelling\n";
            }
            if ((adultCount + seniorCount) == 0 && (youthCount + childCount) > 0) {
                alert_message += " - youths/children must be accompanied by an adult/senior\n";
            }
            var passNum = adultCount + seniorCount + youthCount + childCount + infLapCount + infSeatCount;
            if (passNum == 0) alert_message += " - the number of passengers travelling \n";
            if (passNum > 9) alert_message += " - the max number of passengers travelling cannot be more than 9\n";
            // }
            if (alert_message != "") {
                alert("The following information was not provided : \n" + alert_message);
                return false;
            }
            else if (this.SearchType == "OneWay" || this.SearchType == "RoundTrip") {
                if (this.From.Value == this.To.Value) alert_message += " Departure city and arrival city field must be different";
                if (alert_message != "") {
                    alert(alert_message);
                    return false;
                }
            }
            return true;
        }
        return oContainer;
    }

    this.CruiseSearchForm = function (oContainer, flt) {
        if (oContainer == null) return;
        oContainer.className = "OFContainer OFContainer_" + OFramework.Culture.GetLanguageCode();
        oContainer.Type = "CruiseSearchForm";
        oContainer.innerHTML = "loading...";
        oContainer.Target = "_top";
        oContainer.TargetURL = null;
        oContainer.StateBag = new Array();
        oContainer.Filter = { Enabled: true, Value: "*.*.*.*.*.*.*.*" };
        oContainer.GroupSort = { Destination: [], Departure: [] };
        oContainer.HidePriceRange = false;

        oContainer.LoadComplete = function (data, success) {
            if (success) {
                oContainer.innerHTML = data.replace(/Container./g, "document.getElementById('" + oContainer.id + "').");
                OFramework.ProcessTemplate(oContainer, oContainer.firstChild, true);
                window.setTimeout("document.getElementById('" + oContainer.id + "').Init()", 50);
            }
            else oContainer.innerHTML = "Error loading template source";
        }

        switch (flt) {
            case 0: { oContainer.Filter.Enabled = false; break; }
            case 1: { oContainer.Filter.Enabled = document.all ? false : true; break; }
            case 2: { oContainer.Filter.Enabled = document.all ? true : false; break; }
            default: { if (flt != null) { oContainer.Filter.Value = flt; } break; }
        }
        //If here we get the value of "CruiseAdminSearchFormFileName" then it will display that particular html form.
        if (OFramework.QSParams["CruiseAdminSearchFormFileName"] != null && OFramework.QSParams["CruiseAdminSearchFormFileName"] != undefined && OFramework.QSParams["CruiseAdminSearchFormFileName"] != "") {
            var tLoader = new OFramework.HtmlTemplateLoader(oContainer, oContainer.LoadComplete).Load(OFramework.QSParams["CruiseAdminSearchFormFileName"]);
        }
            //else it will displays default form of Cruise.
        else {
            var tLoader = new OFramework.HtmlTemplateLoader(oContainer, oContainer.LoadComplete).Load("cruise_search_form");
        }
        oContainer.DataSource = new OFramework.DataSources.JSDataSource("CruiseFormData", oContainer, "flt=" + oContainer.Filter.Value);
        oContainer.DataBind = function () {
            if (this.DataSource.DataLoaded) {
                if (this.DataSource.Filter) this.Filter.Value = this.DataSource.Filter;
                if (this.SailingsLBL) {
                    this.SailingsLBL.innerHTML = this.SailingsLBL.Template.replace('%', this.DataSource.DataCount);
                }
                if (this.CruiseLine) {
                    this.CruiseLine.DataSource = this.DataSource["CruiseLines"];
                    this.CruiseLine.DataSource.DataLoaded = true;
                    if (this.CruiseLine.Type == "SelectList" || this.CruiseLine.Type == "DropdownList" || this.CruiseLine.Type == "CheckBoxList") this.CruiseLine.DataBind();
                }
                if (this.Ship) {
                    this.Ship.DataSource = this.DataSource["Ships"];
                    this.Ship.DataSource.DataLoaded = true;
                    if (this.Ship.Type == "SelectList" || this.Ship.Type == "DropdownList" || this.Ship.Type == "CheckBoxList") this.Ship.DataBind();
                }
                if (this.Destination) {
                    this.Destination.DataSource = this.DataSource["Destinations"];
                    this.Destination.DataSource.DataLoaded = true;
                    if (this.Destination.Type == "SelectList" || this.Destination.Type == "DropdownList" || this.Destination.Type == "CheckBoxList") this.Destination.DataBind();
                }
                if (this.Departure) {
                    this.Departure.DataSource = this.DataSource["DeparturePorts"];
                    this.Departure.DataSource.DataLoaded = true;
                    if (this.Departure.Type == "SelectList" || this.Departure.Type == "DropdownList" || this.Departure.Type == "CheckBoxList") this.Departure.DataBind();
                }
                if (this.Length) {
                    this.Length.DataSource = this.DataSource["CruiseLength"];
                    this.Length.DataSource.DataLoaded = true;
                    if (this.Length.Type == "SelectList" || this.Length.Type == "DropdownList" || this.Length.Type == "CheckBoxList") this.Length.DataBind();
                }
                if (this.Month) {
                    this.Month.DataSource = this.DataSource["DepatureDates"];
                    this.Month.DataSource.DataLoaded = true;
                    if (this.Month.Type == "SelectList" || this.Month.Type == "DropdownList" || this.Month.Type == "CheckBoxList") this.Month.DataBind();
                }
                if (this.TType) this.TType.DataBind(this.DataSource["TTypes"]);
                if (this.Specials) {
                    var dSource = this.DataSource["Consolidators"];
                    if (dSource.length > 1) {
                        var all_item = { id: "", name: (this.Specials.AllItemLabel ? this.Specials.AllItemLabel : "All") };
                        for (var i = 0; i < dSource.length; i++) {
                            all_item.id += dSource[i].id;
                            if (i < dSource.length - 1) { all_item.id += ","; }
                        }
                        this.Specials.DataSource = new Array(all_item).concat(dSource);
                    }
                    else this.Specials.DataSource = dSource;
                    this.Specials.DataSource.DataLoaded = true;

                    if (this.Specials.Type == "SelectList") this.Specials.DataBind();
                }
                var fltValues = this.Filter.Value.split(".");
                if (fltValues.length == 8) {
                    if (fltValues[0] != "*" && this.CruiseLine) this.CruiseLine.SetValue(fltValues[0]);
                    if (fltValues[1] != "*" && this.Ship) this.Ship.SetValue(fltValues[1]);
                    if (fltValues[2] != "*" && this.Destination) this.Destination.SetValue(fltValues[2]);
                    if (fltValues[3] != "*" && this.Length) this.Length.SetValue(fltValues[3]);
                    if (fltValues[4] != "*" && this.Departure) this.Departure.SetValue(fltValues[4]);
                    if (fltValues[5] != "*" && this.Month) this.Month.SetValue(fltValues[5]);
                    if (this.TType) this.TType.SetValue(fltValues[6]);
                    if (fltValues[7] != "*" && this.Specials) this.Specials.SetValue(fltValues[7]);
                }
            }
            else {
                if (this.SailingsLBL) this.SailingsLBL.innerHTML = "loading...";
                window.setTimeout("document.getElementById(\"" + this.id + "\").DataBind()", 50);
            }
        }
        oContainer.Set = function (f, v) {                                          //To set on load of result Page ( passing parameter value from results page )
            var oElem = OFramework.Eval(this, f);
            if (oElem) {
                switch (f) {
                    case "FromDate": this.FromDate.SetValue(OFramework.DateFromString(v), true); break;
                    case "ReturnDate": this.ReturnDate.SetValue(OFramework.DateFromString(v), true); break;
                    default: if (oElem.SetValue) oElem.SetValue(v);
                }
            }
            else this.StateBag[f] = v;                              //To Set Value in Statebag Array
        }
        oContainer.Init = function () {
            this.SailingsLBL = document.getElementById(this.id + '_SailingsLBL');
            if (this.SailingsLBL != null) {
                if (this.SailingsLBL.getAttribute("label") != null) this.SailingsLBL.Template = this.SailingsLBL.getAttribute("label") + " : %";
                else if (this.SailingsLBL.innerHTML != "") this.SailingsLBL.Template = this.SailingsLBL.innerHTML;
                else this.SailingsLBL.Template = "Sailings : %";
            }
            this.Destination = document.getElementById(this.id + '_Destination');
            this.Departure = document.getElementById(this.id + '_Departure');
            this.CruiseLine = document.getElementById(this.id + '_CruiseLine');
            this.Ship = document.getElementById(this.id + '_Ship');
            this.Length = document.getElementById(this.id + '_Length');
            this.Month = document.getElementById(this.id + '_Month');
            this.FromDate = document.getElementById(this.id + '_FromDate');
            this.ReturnDate = document.getElementById(this.id + '_ReturnDate');

            this.PriceRangeLBL = document.getElementById(this.id + '_PriceRangeLBL');
            this.PriceRange = document.getElementById(this.id + '_PriceRange');
            this.SpecialFares = document.getElementById(this.id + '_SpecialFares');

            this.TType = new Object();
            this.TType.Value = "";
            this.TType.DDList = document.getElementById(this.id + '_TransportationType');
            this.TType.All = document.getElementById(this.id + '_TTypeAll');
            this.TType.CruiseOnly = document.getElementById(this.id + '_TTypeCruiseOnly');
            this.TType.CruiseAir = document.getElementById(this.id + '_TTypeCruiseAir');
            this.TType.CruiselineTour = document.getElementById(this.id + '_TTypeCruiselineTour');
            this.TType.SetValue = function (val) {
                if (val == "*") val = "";
                if (this.DDList) {
                    this.DDList.SetValue(val);
                }
                else {
                    if (this.CruiseOnly && this.CruiseOnly.value == val) this.CruiseOnly.checked = true;
                    if (this.CruiseAir && this.CruiseAir.value == val) this.CruiseAir.checked = true;
                    if (this.CruiselineTour && this.CruiselineTour.value == val) this.CruiselineTour.checked = true;
                    if (this.All && this.All.value == val) this.All.checked = true;
                    this.Value = val;
                }
            }
            this.TType.DataBind = function (data) {
                if (this.CruiseOnly) this.CruiseOnly.disabled = true;
                if (this.CruiseAir) this.CruiseAir.disabled = true;
                if (this.CruiselineTour) this.CruiselineTour.disabled = true;

                if (this.DDList) {
                    this.DDList.DataSource = data;
                    this.DDList.DataSource.DataLoaded = (data != null);
                    if (this.DDList.Type == "SelectList") this.DDList.DataBind();
                }
                else if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (this.CruiseOnly && this.CruiseOnly.value == data[i].id) this.CruiseOnly.disabled = false;
                        if (this.CruiseAir && this.CruiseAir.value == data[i].id) this.CruiseAir.disabled = false;
                        if (this.CruiselineTour && this.CruiselineTour.value == data[i].id) this.CruiselineTour.disabled = false;
                    }
                }
            }
            this.TType.HasUI = function () {
                if (this.DDList) return true;
                if (this.CruiseOnly || this.CruiseAir || this.CruiselineTour || this.All) return true;
            }

            this.PriceType = new Object();
            this.PriceType.Value = "";
            this.PriceType.LowestAll = document.getElementById(this.id + '_PTypeLowestAll');
            this.PriceType.LowestInside = document.getElementById(this.id + '_PTypeLowestInside');
            this.PriceType.LowestOutside = document.getElementById(this.id + '_PTypeLowestOutside');
            this.PriceType.LowestBalcony = document.getElementById(this.id + '_PTypeLowestBalcony');
            this.PriceType.LowestSuite = document.getElementById(this.id + '_PTypeLowestSuite');

            this.PriceType.SetValue = function (val) {
                if (this.LowestAll && this.LowestAll.value == val) this.LowestAll.checked = true;
                if (this.LowestInside && this.LowestInside.value == val) this.LowestInside.checked = true;
                if (this.LowestOutside && this.LowestOutside.value == val) this.LowestOutside.checked = true;
                if (this.LowestBalcony && this.LowestBalcony.value == val) this.LowestBalcony.checked = true;
                if (this.LowestSuite && this.LowestSuite.value == val) this.LowestSuite.checked = true;
                this.Value = val;
            }
            //this.Transportation = document.getElementById(this.id + '_TransportationType');
            this.Specials = document.getElementById(this.id + '_Specials');
            this.SearchBTN = document.getElementById(this.id + '_SearchBTN');
            this.OpenTarget = document.getElementById(this.id + '_OpenTarget');

            if (this.HidePriceRange) {
                if (this.PriceRangeLBL) this.PriceRangeLBL.style.display = 'none';
                this.PriceRange.style.display = 'none';
            }

            this.OnLoad();
            //set default values
            var today = new Date(); today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var mDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var dDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
            var rDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

            if (this.FromDate != null && this.FromDate != undefined && this.ReturnDate != null && this.ReturnDate != undefined) {
                this.FromDate.MinDate = mDate;
                this.FromDate.SetValue(dDate);
                this.ReturnDate.MinDate = dDate;
                this.ReturnDate.SetValue(rDate);

                if (this.FromDate.Type == "DatePicker") {
                    this.FromDate.StartDateOfRange = dDate;
                    this.FromDate.EndDateOfRange = rDate;
                    this.FromDate.Init();
                }

                if (this.ReturnDate.Type == "DatePicker") {
                    this.ReturnDate.StartDateOfRange = dDate;
                    this.ReturnDate.EndDateOfRange = rDate;
                    this.ReturnDate.Init();
                }

                for (var f in this.StateBag) {                                          //To Set From Date and Return Date in Cruise Advance Search.
                    var oElem = OFramework.Eval(this, f);
                    if (!oElem) continue;
                    switch (f) {
                        case "FromDate": this.FromDate.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;                  //To Set Value from Statebag Array.
                        case "ReturnDate": this.ReturnDate.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    }
                }
            }
        }
        oContainer.OnLoad = function () {
            this.DataBind();
        }

        oContainer.FieldChanged = function (obj, val) {
            if (this.Filter.Enabled) {
                if (obj == this.CruiseLine && val == "") this.Ship.Value = "";
                this.FilterData();
            }
            else {
                switch (obj) {
                    case this.CruiseLine:
                        {
                            var flt = new OFramework.Array();
                            flt.push(val);
                            this.Ship.SetFilter("cid", val != "" ? flt : null);
                            break;
                        }
                }
            }
            switch (obj.id) {                                                           // Change Values on Change of Calender Popup.
                case this.id + "_FromDate":
                    {
                        this.ReturnDate.MinDate = this.FromDate.Value;
                        if (this.ReturnDate.Value == null || (this.ReturnDate.Value != null && val.CompareTo(this.ReturnDate.Value) > -1)) {
                            (new Date(val.Add(0, 0, 30)) < new Date(this.ReturnDate.MaxDate)) ? this.ReturnDate.SetValue(val.Add(0, 0, 30), true) : this.ReturnDate.Value = this.ReturnDate.SetValue(new Date(this.ReturnDate.MaxDate));
                        }
                        if (this.FromDate.Type == "DatePicker") {
                            this.FromDate.StartDateOfRange = this.FromDate.Value;
                            this.FromDate.EndDateOfRange = this.ReturnDate.Value;
                            this.ReturnDate.StartDateOfRange = this.FromDate.Value;
                            this.ReturnDate.EndDateOfRange = this.ReturnDate.Value;
                        }
                        break;
                    }
                case this.id + "_ReturnDate":
                    {
                        if (this.ReturnDate.Type == "DatePicker") {
                            this.FromDate.StartDateOfRange = this.FromDate.Value;
                            this.FromDate.EndDateOfRange = this.ReturnDate.Value;
                            this.ReturnDate.StartDateOfRange = this.FromDate.Value;
                            this.ReturnDate.EndDateOfRange = this.ReturnDate.Value;
                        }
                        break;
                    }
            }

        }
        oContainer.FilterData = function () {
            if (this.SailingsLBL) this.SailingsLBL.innerHTML = "Filtering...";
            this.Filter.Value = this.BuildFilter();

            if (this.CruiseLine) {
                this.CruiseLine.DataSource.DataLoaded = false;
                this.CruiseLine.DataBind();
            }
            if (this.Ship) {
                this.Ship.DataSource.DataLoaded = false;
                this.Ship.DataBind();
            }
            if (this.Destination) {
                this.Destination.DataSource.DataLoaded = false;
                this.Destination.DataBind();
            }
            if (this.Length) {
                this.Length.DataSource.DataLoaded = false;
                this.Length.DataBind();
            }
            if (this.Departure) {
                this.Departure.DataSource.DataLoaded = false;
                this.Departure.DataBind();
            }
            if (this.Month) {
                this.Month.DataSource.DataLoaded = false;
                this.Month.DataBind();
            }
            if (this.TType.DDList) {
                this.TType.DDList.DataSource.DataLoaded = false;
                this.TType.DDList.DataBind();
            }
            if (this.Specials) {
                this.Specials.DataSource.DataLoaded = false;
                this.Specials.DataBind();
            }
            OFramework.DataSources["CruiseFormData"] = null;
            OFramework.DataSources.Bindings["CruiseFormData"] = null;
            this.DataSource = new OFramework.DataSources.JSDataSource("CruiseFormData", oContainer, "flt=" + this.Filter.Value);
            this.DataBind();
        }
        oContainer.ChangeTType = function (val) {
            if (this.TType.CruiseOnly) this.TType.CruiseOnly.disabled = true;
            if (this.TType.CruiseAir) this.TType.CruiseAir.disabled = true;
            if (this.TType.CruiselineTour) this.TType.CruiselineTour.disabled = true;

            this.TType.Value = val;
            this.FieldChanged(this.TType, val);
        }
        oContainer.ChangePriceType = function (val) {

            this.PriceType.Value = val;
        }
        oContainer.ForceChangeTType = function (val) {
            //check we have the value in datasource
            var data = this.DataSource["TTypes"];
            var found = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == val) { found = true; break; }
            }
            if (!found) this.ResetFields();
            this.ChangeTType(val);
        }
        oContainer.AdvancedSearch = function () {
            var baseStr = OFramework.BaseURI + "cruises/search.aspx";
            var sStr = baseStr.appendQS();

            if (!OFramework.Console.Write(sStr, this.Target)) window.open(sStr, this.Target);
        }
        oContainer.SubmitSearch = function () {
            if (!this.ValidateInput()) return;
            var baseStr = this.TargetURL == null ? OFramework.BaseURI + "cruises/search.aspx" : this.TargetURL;
            var sStr = baseStr.appendQS();
            if (OFramework.QSParams["uuid"] != null) sStr += (sStr == baseStr ? "?" : "&") + OFramework.QSParams["uuid"];

            sStr += (sStr == baseStr ? "?" : "&") + "SearchCruise=1";

            if (this.CruiseLine && this.CruiseLine.Value != "") sStr += "&CruiseLine=" + this.CruiseLine.Value;
            if (this.Ship && this.Ship.Value != "") sStr += "&Ship=" + this.Ship.Value;
            if (this.Destination && this.Destination.Value != "") sStr += "&Destinations=" + this.Destination.Value;
            if (this.Departure && this.Departure.Value != "") sStr += "&DeparturePorts=" + this.Departure.Value;
            if (this.Length && this.Length.Value != "") {
                var values = this.Length.Value.split(",")
                var min = null;
                var max = null;
                for (i = 0; i < this.Length.DataSource.length; i++) {
                    if (this.Length.DataSource[i]["id"] == values[0]) min = this.Length.DataSource[i]["min"];
                    if (this.Length.DataSource[i]["id"] == values[values.length - 1]) max = this.Length.DataSource[i]["max"];
                }
                if (min != null && max != null) sStr += "&MinDuration=" + min + "&MaxDuration=" + max;
            }
            if (this.Month && this.Month.Value != "") {
                var dates = this.Month.Value.split(",");
                sStr += "&StartDate=" + this.GetDateStart(dates[0]);
                sStr += "&EndDate=" + this.GetDateEnd(dates[dates.length - 1]);
            }
            else if (this.FromDate && this.FromDate.value != "" && this.ReturnDate && this.ReturnDate.value != "") {
                sStr += "&StartDate=" + this.FromDate.value;
                sStr += "&EndDate=" + this.ReturnDate.value;
            }
            if (this.PriceRange && this.PriceRange.Value != "") sStr += "&pRange=" + this.PriceRange.Value;
            if (this.SpecialFares && this.SpecialFares.Value != "") sStr += "&sFares=" + this.SpecialFares.Value;
            if (this.TType.DDList && this.TType.DDList.Value != "") sStr += "&transportId=" + this.TType.DDList.Value;
            else if (this.TType.Value != "") sStr += "&transportId=" + this.TType.Value;

            if (this.PriceType && this.PriceType.Value != "") sStr += "&PriceType=" + this.PriceType.Value;
            if (this.Specials && this.Specials.Value != "") sStr += "&consolidators=" + this.Specials.Value;
            var win = this.OpenTarget && this.OpenTarget.checked ? this.OpenTarget.value : this.Target;

            if (!OFramework.Console.Write(sStr, this.Target)) window.open(sStr, win);
        }
        oContainer.GetDateStart = function (obj) {
            var date = obj.split("-");
            var dateObj = new Date();
            dateObj.setFullYear(parseInt(date[1], 10), parseInt(date[0], 10) - 1, 1);
            return (dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
        }
        oContainer.GetDateEnd = function (obj) {
            var date = obj.split("-");
            var dateObj = new Date();
            dateObj.setFullYear(parseInt(date[1], 10), parseInt(date[0], 10), 1);
            dateObj.setDate(0);
            return (dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
        }
        oContainer.ValidateInput = function () {
            return true;
        }
        oContainer.Reset = function () {
            this.ResetFields();
            this.Filter.Value = this.BuildFilter();

            if (this.Filter.Enabled) {
                OFramework.DataSources["CruiseFormData"] = null;
                OFramework.DataSources.Bindings["CruiseFormData"] = null;
                this.DataSource = new OFramework.DataSources.JSDataSource("CruiseFormData", oContainer, "flt=" + this.Filter.Value);
                this.DataBind();
            }
        }
        oContainer.ResetFields = function () {
            if (this.CruiseLine) {
                if (this.CruiseLine.DefaultItem && this.CruiseLine.DefaultItem.id != "") {
                    this.CruiseLine.SetValue(this.CruiseLine.DefaultItem.id);
                }
                else this.CruiseLine.SetValue("");
            }
            if (this.Ship) {
                if (this.Ship.DefaultItem && this.Ship.DefaultItem.id != "") {
                    this.Ship.SetValue(this.Ship.DefaultItem.id);
                }
                else this.Ship.SetValue("");
            }
            if (this.Destination) this.Destination.SetValue("");
            if (this.Length) this.Length.SetValue("");
            if (this.Departure) this.Departure.SetValue("");
            if (this.Month) this.Month.SetValue("");
            if (this.TType && this.TType.HasUI()) this.TType.SetValue("");
            if (this.Specials) this.Specials.SetValue("");
            if (this.PriceType) this.PriceType.SetValue("");
        }
        oContainer.BuildFilter = function () {
            var filter = "";
            filter += (this.CruiseLine && this.CruiseLine.Value != "" ? this.CruiseLine.Value : "*") + ".";
            filter += (this.Ship && this.Ship.Value != "" ? this.Ship.Value : "*") + ".";
            filter += (this.Destination && this.Destination.Value != "" ? this.Destination.Value : "*") + ".";
            filter += (this.Length && this.Length.Value != "" ? this.Length.Value : "*") + ".";
            filter += (this.Departure && this.Departure.Value != "" ? this.Departure.Value : "*") + ".";
            filter += (this.Month && this.Month.Value != "" ? this.Month.Value : "*") + ".";
            filter += (this.TType && this.TType.DDList && this.TType.DDList.Value != "" ? this.TType.DDList.Value : (this.TType && this.TType.Value != "" ? this.TType.Value : "*")) + ".";
            filter += (this.Specials && this.Specials.Value != "" ? this.Specials.Value : "*");
            return filter;
        }
        return oContainer;
    }

    this.HotelSearchForm = function (oContainer) {
        if (oContainer == null) return;
        oContainer.className = "OFContainer";
        oContainer.Type = "HotelSearchForm";
        oContainer.innerHTML = "loading...";
        oContainer.Target = "_top";
        oContainer.TargetURL = null;
        oContainer.StateBag = new Array();
        oContainer.LoadComplete = function (data, success) {
            if (success) {
                oContainer.innerHTML = data.replace(/Container./g, "document.getElementById('" + oContainer.id + "').");
                OFramework.ProcessTemplate(oContainer, oContainer.firstChild);
                window.setTimeout("document.getElementById('" + oContainer.id + "').Init()", 50);
            }
            else oContainer.innerHTML = "Error loading template source";
        }
        //If here we get the value of "HotelAdminSearchFormFileName" then it will display that particular html form.
        if (OFramework.QSParams["HotelAdminSearchFormFileName"] != null && OFramework.QSParams["HotelAdminSearchFormFileName"] != undefined && OFramework.QSParams["HotelAdminSearchFormFileName"] != "") {
            var tLoader = new OFramework.HtmlTemplateLoader(oContainer, oContainer.LoadComplete).Load(OFramework.QSParams["HotelAdminSearchFormFileName"]);
        }
            //else it will displays default form of hotel.
        else {
            var tLoader = new OFramework.HtmlTemplateLoader(oContainer, oContainer.LoadComplete).Load("hotel_search_form");
        }
        oContainer.Set = function (f, v) {
            var oElem = OFramework.Eval(this, f);
            if (oElem) {
                switch (f) {
                    case "Destination": this.Destination.SetValue(v, true); break;
                    case "RoomOne.Children": this.RoomOne.Children.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.ChildOneAge": this.RoomOne.ChildOneAge.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.ChildTwoAge": this.RoomOne.ChildTwoAge.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.ChildThreeAge": this.RoomOne.ChildThreeAge.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.ChildFourAge": this.RoomOne.ChildFourAge.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.Children": this.RoomTwo.Children.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.ChildOneAge": this.RoomTwo.ChildOneAge.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.ChildTwoAge": this.RoomTwo.ChildTwoAge.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.ChildThreeAge": this.RoomTwo.ChildThreeAge.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.ChildFourAge": this.RoomTwo.ChildFourAge.SetValue(this.StateBag[f], true); break;
                    default: if (oElem.SetValue) oElem.SetValue(v);
                }
            }
            else this.StateBag[f] = v;
        }
        oContainer.Init = function () {
            this.Destination = document.getElementById(this.id + '_Destination');
            this.HotelCode = document.getElementById(this.id + '_HotelCode');
            this.CheckInDate = document.getElementById(this.id + '_CheckInDate');
            this.CheckInDay = document.getElementById(this.id + '_CheckInDay');
            this.CheckOutDate = document.getElementById(this.id + '_CheckOutDate');
            this.CheckOutDay = document.getElementById(this.id + '_CheckOutDay');
            this.RoomCount = document.getElementById(this.id + '_RoomCount');
            this.Class = document.getElementById(this.id + '_Class');
            //Bin Number
            if (document.getElementById(this.id + '_BinNumber')) this.BinNumber = document.getElementById(this.id + '_BinNumber');
            //Hotel Name & Price
            if (document.getElementById(this.id + '_HotelName')) this.HotelName = document.getElementById(this.id + '_HotelName');
            if (document.getElementById(this.id + '_RoomPrice')) this.RoomPrice = document.getElementById(this.id + '_RoomPrice');


            this.RoomOne = document.getElementById(this.id + '_RoomOneTR');
            this.RoomOne.Adults = document.getElementById(this.id + '_RoomOneAdults');
            this.RoomOne.Children = document.getElementById(this.id + '_RoomOneChildren');
            this.RoomOne.Children.TR = document.getElementById(this.id + '_RoomOneChildTR');
            this.RoomOne.ChildOneAge = document.getElementById(this.id + '_RoomOneChildOneAge');
            this.RoomOne.ChildTwoAge = document.getElementById(this.id + '_RoomOneChildTwoAge');
            this.RoomOne.ChildThreeAge = document.getElementById(this.id + '_RoomOneChildThreeAge');
            this.RoomOne.ChildFourAge = document.getElementById(this.id + '_RoomOneChildFourAge');

            this.RoomTwo = document.getElementById(this.id + '_RoomTwoTR');
            this.RoomTwo.Adults = document.getElementById(this.id + '_RoomTwoAdults');
            this.RoomTwo.Children = document.getElementById(this.id + '_RoomTwoChildren');
            this.RoomTwo.Children.TR = document.getElementById(this.id + '_RoomTwoChildTR');
            this.RoomTwo.ChildOneAge = document.getElementById(this.id + '_RoomTwoChildOneAge');
            this.RoomTwo.ChildTwoAge = document.getElementById(this.id + '_RoomTwoChildTwoAge');
            this.RoomTwo.ChildThreeAge = document.getElementById(this.id + '_RoomTwoChildThreeAge');
            this.RoomTwo.ChildFourAge = document.getElementById(this.id + '_RoomTwoChildFourAge');

            this.RoomThree = document.getElementById(this.id + '_RoomThreeTR');
            this.RoomThree.Adults = document.getElementById(this.id + '_RoomThreeAdults');
            this.RoomThree.Children = document.getElementById(this.id + '_RoomThreeChildren');
            this.RoomThree.Children.TR = document.getElementById(this.id + '_RoomThreeChildTR');
            this.RoomThree.ChildOneAge = document.getElementById(this.id + '_RoomThreeChildOneAge');
            this.RoomThree.ChildTwoAge = document.getElementById(this.id + '_RoomThreeChildTwoAge');
            this.RoomThree.ChildThreeAge = document.getElementById(this.id + '_RoomThreeChildThreeAge');
            this.RoomThree.ChildFourAge = document.getElementById(this.id + '_RoomThreeChildFourAge');

            //adding initialization for room Four
            this.RoomFour = document.getElementById(this.id + '_RoomFourTR');
            this.RoomFour.Adults = document.getElementById(this.id + '_RoomFourAdults');
            this.RoomFour.Children = document.getElementById(this.id + '_RoomFourChildren');
            this.RoomFour.Children.TR = document.getElementById(this.id + '_RoomFourChildTR');
            this.RoomFour.ChildOneAge = document.getElementById(this.id + '_RoomFourChildOneAge');
            this.RoomFour.ChildTwoAge = document.getElementById(this.id + '_RoomFourChildTwoAge');
            this.RoomFour.ChildThreeAge = document.getElementById(this.id + '_RoomFourChildThreeAge');
            this.RoomFour.ChildFourAge = document.getElementById(this.id + '_RoomFourChildFourAge');


            //set default values
            var today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var offset = isNaN(OFramework.QSParams["MinHotelCheckInDate"]) ? 0 : parseInt(OFramework.QSParams["MinHotelCheckInDate"], 0) + 1;
            var offsetLength = isNaN(OFramework.QSParams["HotelMinLengthStay"]) ? 0 : parseInt(OFramework.QSParams["HotelMinLengthStay"], 0);
            var mDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
            var dDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
            var rDate = new Date();
            if (offsetLength >= 1) {
                rDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 + offsetLength);
            }
            else {
                rDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8);
            }

            this.CheckInDate.MinDate = mDate;
            this.CheckInDate.SetValue(dDate);
            this.CheckInDay.innerHTML = OFramework.Culture.Date.ShortDayNames[dDate.getDay()];

            this.CheckOutDate.MinDate = rDate;
            this.CheckOutDate.SetValue(rDate);
            this.CheckOutDay.innerHTML = OFramework.Culture.Date.ShortDayNames[rDate.getDay()];

            //New Code
            if (this.CheckInDate.Type == "DatePicker") {
                this.CheckInDate.StartDateOfRange = dDate;
                this.CheckInDate.EndDateOfRange = rDate;
                this.CheckInDate.Init();
            }
            //if (this.CheckOutDay.Type == "DatePicker") {
            //    this.CheckOutDay.StartDateOfRange = dDate;
            //    this.CheckOutDay.EndDateOfRange = rDate;
            //    this.CheckOutDay.Init();
            //}

            if (this.CheckOutDate.Type == "DatePicker") {
                this.CheckOutDate.StartDateOfRange = dDate;
                this.CheckOutDate.EndDateOfRange = rDate;
                this.CheckOutDate.Init();
            }

            var ds = new OFramework.DataSources.HtmlDataSource();
            for (i = 0; i < 18; i++) {
                var lbl = i == 0 ? "<1" : i.toString();
                ds.push({ id: i.toString(), name: lbl });
            }
            with (this.RoomOne.ChildOneAge) { DataSource = ds; this.RoomOne.ChildOneAge.SetValue("0", false); }
            with (this.RoomOne.ChildTwoAge) { DataSource = ds; this.RoomOne.ChildTwoAge.SetValue("0", false); }
            with (this.RoomOne.ChildThreeAge) { DataSource = ds; this.RoomOne.ChildThreeAge.SetValue("0", false); }
            with (this.RoomOne.ChildFourAge) { DataSource = ds; this.RoomOne.ChildFourAge.SetValue("0", false); }
            with (this.RoomTwo.ChildOneAge) { DataSource = ds; this.RoomTwo.ChildOneAge.SetValue("0", false); }
            with (this.RoomTwo.ChildTwoAge) { DataSource = ds; this.RoomTwo.ChildTwoAge.SetValue("0", false); }
            with (this.RoomTwo.ChildThreeAge) { DataSource = ds; this.RoomTwo.ChildThreeAge.SetValue("0", false); }
            with (this.RoomTwo.ChildFourAge) { DataSource = ds; this.RoomTwo.ChildFourAge.SetValue("0", false); }
            with (this.RoomThree.ChildOneAge) { DataSource = ds; this.RoomThree.ChildOneAge.SetValue("0", false); }
            with (this.RoomThree.ChildTwoAge) { DataSource = ds; this.RoomThree.ChildTwoAge.SetValue("0", false); }
            with (this.RoomThree.ChildThreeAge) { DataSource = ds; this.RoomThree.ChildThreeAge.SetValue("0", false); }
            with (this.RoomThree.ChildFourAge) { DataSource = ds; this.RoomThree.ChildFourAge.SetValue("0", false); }
            //Room Four
            with (this.RoomFour.ChildOneAge) { DataSource = ds; this.RoomFour.ChildOneAge.SetValue("0", false); }
            with (this.RoomFour.ChildTwoAge) { DataSource = ds; this.RoomFour.ChildTwoAge.SetValue("0", false); }
            with (this.RoomFour.ChildThreeAge) { DataSource = ds; this.RoomFour.ChildThreeAge.SetValue("0", false); }
            with (this.RoomFour.ChildFourAge) { DataSource = ds; this.RoomFour.ChildFourAge.SetValue("0", false); }

            for (var f in this.StateBag) {
                var oElem = OFramework.Eval(this, f);

                if (!oElem) continue;
                switch (f) {
                    case "Destination": {
                        var parts = this.StateBag[f].split('||');
                        if (parts.length == 2) {
                            var ds = new OFramework.DataSources.HtmlDataSource();
                            ds.push({ id: parts[0], name: parts[1] });
                            this.Destination.DataSource = ds;
                        }
                        this.Destination.SetValue(parts[0], true);
                        break;
                    }
                    case "CheckInDate": this.CheckInDate.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    case "CheckOutDate": this.CheckOutDate.SetValue(OFramework.DateFromString(this.StateBag[f]), true); break;
                    case "RoomCount": this.RoomCount.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.Children": this.RoomOne.Children.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.ChildOneAge": this.RoomOne.ChildOneAge.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.ChildTwoAge": this.RoomOne.ChildTwoAge.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.ChildThreeAge": this.RoomOne.ChildThreeAge.SetValue(this.StateBag[f], true); break;
                    case "RoomOne.ChildFourAge": this.RoomOne.ChildFourAge.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.Children": this.RoomTwo.Children.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.ChildOneAge": this.RoomTwo.ChildOneAge.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.ChildTwoAge": this.RoomTwo.ChildTwoAge.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.ChildThreeAge": this.RoomTwo.ChildThreeAge.SetValue(this.StateBag[f], true); break;
                    case "RoomTwo.ChildFourAge": this.RoomTwo.ChildFourAge.SetValue(this.StateBag[f], true); break;

                    case "RoomThree.Children": this.RoomThree.Children.SetValue(this.StateBag[f], true); break;
                        //Room Four
                    case "RoomFour.Children": this.RoomFour.Children.SetValue(this.StateBag[f], true); break;
                    case "RoomFour.ChildOneAge": this.RoomFour.ChildOneAge.SetValue(this.StateBag[f], true); break;
                    case "RoomFour.ChildTwoAge": this.RoomFour.ChildTwoAge.SetValue(this.StateBag[f], true); break;
                    case "RoomFour.ChildThreeAge": this.RoomFour.ChildThreeAge.SetValue(this.StateBag[f], true); break;
                    case "RoomFour.ChildFourAge": this.RoomFour.ChildFourAge.SetValue(this.StateBag[f], true); break;
                    default: if (oElem.SetValue) oElem.SetValue(this.StateBag[f]);
                }
            }
        }
        oContainer.FieldChanged = function (obj, val) {
            switch (obj) {
                case this.CheckInDate:
                    {
                        var offsetLength = isNaN(OFramework.QSParams["HotelMinLengthStay"]) ? 0 : parseInt(OFramework.QSParams["HotelMinLengthStay"], 0);
                        var nDate = new Date();

                        if (offsetLength >= 1) {
                            nDate = new Date(val.getFullYear(), val.getMonth(), val.getDate() + offsetLength);
                        }
                        else {
                            nDate = new Date(val.getFullYear(), val.getMonth(), val.getDate() + 1 + offsetLength);
                        }
                        this.CheckOutDate.MinDate = nDate;
                        if (this.CheckOutDate.Value.CompareTo(nDate) < 0) this.CheckOutDate.SetValue(nDate, true);

                        this.CheckInDay.innerHTML = OFramework.Culture.Date.ShortDayNames[val.getDay()];
                        break;
                    }
                case this.CheckOutDate:
                    {
                        this.CheckOutDay.innerHTML = OFramework.Culture.Date.ShortDayNames[val.getDay()];
                        break;
                    }
                case this.RoomCount: { this.Display(); break; }
                case this.RoomOne.Children: { this.Display(); break; }
                case this.RoomTwo.Children: { this.Display(); break; }
                case this.RoomThree.Children: { this.Display(); break; }
                    //Room Four
                case this.RoomFour.Children: { this.Display(); break; }
            }
        }
        oContainer.Display = function () {
            this.RoomTwo.style.display = "none";
            this.RoomThree.style.display = "none";
            //Room Four
            this.RoomFour.style.display = "none";
            var bStr = (document.all && !window.atob) ? "block" : "table-row";

            switch (this.RoomCount.Value) {
                case "1": { this.RoomTwo.Children.SetValue("0", false); this.RoomThree.Children.SetValue("0", false); this.RoomFour.Children.SetValue("0", false); break }
                case "2": { this.RoomTwo.style.display = bStr; this.RoomThree.Children.SetValue("0", false); this.RoomFour.Children.SetValue("0", false); break; }
                case "3": { this.RoomTwo.style.display = bStr; this.RoomThree.style.display = bStr; this.RoomFour.Children.SetValue("0", false); break; }
                case "4": { this.RoomTwo.style.display = bStr; this.RoomThree.style.display = bStr; this.RoomFour.style.display = bStr; break; }
            }

            var r1c = parseInt(this.RoomOne.Children.Value);
            if (this.RoomOne.Children.TR != null) this.RoomOne.Children.TR.style.display = r1c == 0 ? "none" : bStr;
            this.RoomOne.ChildOneAge.style.visibility = r1c > 0 ? "visible" : "hidden";
            this.RoomOne.ChildTwoAge.style.visibility = r1c > 1 ? "visible" : "hidden";
            this.RoomOne.ChildThreeAge.style.visibility = r1c > 2 ? "visible" : "hidden";
            this.RoomOne.ChildFourAge.style.visibility = r1c > 3 ? "visible" : "hidden";

            var r2c = parseInt(this.RoomTwo.Children.Value);
            if (this.RoomTwo.Children.TR != null) this.RoomTwo.Children.TR.style.display = r2c == 0 ? "none" : bStr;
            this.RoomTwo.ChildOneAge.style.visibility = r2c > 0 ? "visible" : "hidden";
            this.RoomTwo.ChildTwoAge.style.visibility = r2c > 1 ? "visible" : "hidden";
            this.RoomTwo.ChildThreeAge.style.visibility = r2c > 2 ? "visible" : "hidden";
            this.RoomTwo.ChildFourAge.style.visibility = r2c > 3 ? "visible" : "hidden";

            var r3c = parseInt(this.RoomThree.Children.Value);
            if (this.RoomThree.Children.TR != null) this.RoomThree.Children.TR.style.display = r3c == 0 ? "none" : bStr;
            this.RoomThree.ChildOneAge.style.visibility = r3c > 0 ? "visible" : "hidden";
            this.RoomThree.ChildTwoAge.style.visibility = r3c > 1 ? "visible" : "hidden";
            this.RoomThree.ChildThreeAge.style.visibility = r3c > 2 ? "visible" : "hidden";
            this.RoomThree.ChildFourAge.style.visibility = r3c > 3 ? "visible" : "hidden";

            //Room Four
            var r4c = parseInt(this.RoomFour.Children.Value);
            if (this.RoomFour.Children.TR != null) this.RoomFour.Children.TR.style.display = r4c == 0 ? "none" : bStr;
            this.RoomFour.ChildOneAge.style.visibility = r4c > 0 ? "visible" : "hidden";
            this.RoomFour.ChildTwoAge.style.visibility = r4c > 1 ? "visible" : "hidden";
            this.RoomFour.ChildThreeAge.style.visibility = r4c > 2 ? "visible" : "hidden";
            this.RoomFour.ChildFourAge.style.visibility = r4c > 3 ? "visible" : "hidden";

        }
        oContainer.SubmitSearch = function () {
            if (!this.ValidateInput()) return;
            var baseStr = this.TargetURL == null ? OFramework.BaseURI + "hotel/default.aspx" : this.TargetURL;
            var sStr = baseStr.appendQS();
            if (OFramework.QSParams["uuid"] != null) sStr += (sStr == baseStr ? "?" : "&") + OFramework.QSParams["uuid"];

            var SegmentData = "&RoomCount=" + this.RoomCount.Value;
            switch (this.RoomCount.Value) {
                case "1":
                    {
                        SegmentData += "&R1=" + this.RoomOne.Adults.Value + "|" + this.RoomOne.Children.Value + "|" + this.RoomOne.ChildOneAge.Value + "," + this.RoomOne.ChildTwoAge.Value + "," + this.RoomOne.ChildThreeAge.Value + "," + this.RoomOne.ChildFourAge.Value
                        break;
                    }
                case "2":
                    {
                        SegmentData += "&R1=" + this.RoomOne.Adults.Value + "|" + this.RoomOne.Children.Value + "|" + this.RoomOne.ChildOneAge.Value + "," + this.RoomOne.ChildTwoAge.Value + "," + this.RoomOne.ChildThreeAge.Value + "," + this.RoomOne.ChildFourAge.Value;
                        SegmentData += "&R2=" + this.RoomTwo.Adults.Value + "|" + this.RoomTwo.Children.Value + "|" + this.RoomTwo.ChildOneAge.Value + "," + this.RoomTwo.ChildTwoAge.Value + "," + this.RoomTwo.ChildThreeAge.Value + "," + this.RoomTwo.ChildFourAge.Value;
                        break;
                    }
                case "3":
                    {
                        SegmentData += "&R1=" + this.RoomOne.Adults.Value + "|" + this.RoomOne.Children.Value + "|" + this.RoomOne.ChildOneAge.Value + "," + this.RoomOne.ChildTwoAge.Value + "," + this.RoomOne.ChildThreeAge.Value + "," + this.RoomOne.ChildFourAge.Value;
                        SegmentData += "&R2=" + this.RoomTwo.Adults.Value + "|" + this.RoomTwo.Children.Value + "|" + this.RoomTwo.ChildOneAge.Value + "," + this.RoomTwo.ChildTwoAge.Value + "," + this.RoomTwo.ChildThreeAge.Value + "," + this.RoomTwo.ChildFourAge.Value;
                        SegmentData += "&R3=" + this.RoomThree.Adults.Value + "|" + this.RoomThree.Children.Value + "|" + this.RoomThree.ChildOneAge.Value + "," + this.RoomThree.ChildTwoAge.Value + "," + this.RoomThree.ChildThreeAge.Value + "," + this.RoomThree.ChildFourAge.Value;
                        break;
                    }
                case "4":
                    {
                        //Room Four
                        SegmentData += "&R1=" + this.RoomOne.Adults.Value + "|" + this.RoomOne.Children.Value + "|" + this.RoomOne.ChildOneAge.Value + "," + this.RoomOne.ChildTwoAge.Value + "," + this.RoomOne.ChildThreeAge.Value + "," + this.RoomOne.ChildFourAge.Value;
                        SegmentData += "&R2=" + this.RoomTwo.Adults.Value + "|" + this.RoomTwo.Children.Value + "|" + this.RoomTwo.ChildOneAge.Value + "," + this.RoomTwo.ChildTwoAge.Value + "," + this.RoomTwo.ChildThreeAge.Value + "," + this.RoomTwo.ChildFourAge.Value;
                        SegmentData += "&R3=" + this.RoomThree.Adults.Value + "|" + this.RoomThree.Children.Value + "|" + this.RoomThree.ChildOneAge.Value + "," + this.RoomThree.ChildTwoAge.Value + "," + this.RoomThree.ChildThreeAge.Value + "," + this.RoomThree.ChildFourAge.Value;
                        SegmentData += "&R4=" + this.RoomFour.Adults.Value + "|" + this.RoomFour.Children.Value + "|" + this.RoomFour.ChildOneAge.Value + "," + this.RoomFour.ChildTwoAge.Value + "," + this.RoomFour.ChildThreeAge.Value + "," + this.RoomFour.ChildFourAge.Value;
                        break;
                    }
            }
            //add rest of the stuff
            sStr += (sStr == baseStr ? "?" : "&");
            if (this.Destination != null && this.Destination.Value != "") sStr += "loc=" + encodeURI(this.Destination.Value) + "&locStr=" + encodeURI(this.Destination.value);
            sStr += "&fDate=" + encodeURI(this.CheckInDate.Value.ToString());
            sStr += "&tDate=" + encodeURI(this.CheckOutDate.Value.ToString());
            if (this.Class != null && this.Class.Value != "") sStr += "&hClass=" + this.Class.Value;
            // HotelCode has been added to provide an ability to affiliate where they can land into direct details page if they already have hotel code.
            if (this.HotelCode != null && this.HotelCode.Value != "") sStr += "&hCode=" + this.HotelCode.Value + "&hbStep=details";
            //Add Bin Number Value to Query String if we have that control and its value.
            if (this.BinNumber != null && this.BinNumber.Value != "") sStr += "&hBin=" + this.BinNumber.Value
            //Add Hotel Name Value and Room Price to Query String if we have that control and its value.
            if (this.HotelName != null && this.HotelName.value != "") sStr += "&hName=" + this.HotelName.value
            if (this.RoomPrice != null && this.RoomPrice.Value != "") sStr += "&hPrice=" + this.RoomPrice.Value
            //final concat			
            sStr += SegmentData;
            if (!OFramework.Console.Write(sStr, this.Target)) window.open(sStr, this.Target);
        }
        oContainer.ValidateInput = function () {
            alert_message = "";
            if ((this.Destination != null && (!this.Destination.Value || this.Destination.Value == "")) || (this.HotelCode != null && (!this.HotelCode.Value || this.HotelCode.Value == ""))) alert_message += " - destination\n";
            if (this.CheckInDate.Value == "") alert_message += " - check in date\n";
            if (this.CheckOutDate.Value == "") alert_message += " - check out date\n";
            if (this.BinNumber && this.BinNumber.Value == "") alert_message += " - First six digits of your Diner's Club card number.\n";
            if (this.BinNumber != null && this.BinNumber.Value != "" && this.BinNumber.Value.length < 6) alert_message += " - Invalid Number. Please re-enter the first six digits of your Diner's Club card number.";

            if (alert_message != "") {
                alert("The following information was not provided : \n" + alert_message);
                return false;
            }
            return true;
        }
        return oContainer;
    }

    this.DataSources = new function () {
        this.DataSource = function (oID, source) {
            if (OFramework.DataSources[oID] != null) return OFramework.DataSources[oID];
            var o = new Array();
            o.DataLoaded = false;
            o.LoadComplete = function (data) {
                if (data != null && data.firstChild != null) {
                    for (var n = 0; n < data.firstChild.childNodes.length; n++) {
                        var node = data.firstChild.childNodes[n];
                        if (node.nodeType == 1) {
                            var newDataItem = new Object();
                            for (a = 0; a < node.attributes.length; a++) {
                                newDataItem[node.attributes[a].name] = node.attributes[a].value;
                            }
                            o.push(newDataItem);
                        }
                    }
                }
                o.DataLoaded = true;
            }

            var tLoader = new OFramework.XmlLoader(o.LoadComplete);
            tLoader.open("GET", OFramework.BaseURI + "SearchForms/Data/" + source, true);
            tLoader.send(null);

            OFramework.DataSources[oID] = o;
            return o;
        }
        this.HtmlDataSource = function (source) {
            var o = new Array();
            if (source != null && source.childNodes != null) {
                for (var n = 0; n < source.childNodes.length; n++) {
                    var node = source.childNodes[n];
                    if (node.nodeType == 1 && node.nodeName.toLowerCase() == "item") {
                        var newDataItem = new Object();
                        for (a = 0; a < node.attributes.length; a++) {
                            newDataItem[node.attributes[a].name] = node.attributes[a].value;
                        }
                        o.push(newDataItem);
                    }
                }
            }
            o.DataLoaded = true;
            return o;
        }
        this.RangeDataSource = function (source) {
            var o = new Array();
            if (source != null && source.childNodes != null) {
                for (var n = 0; n < source.childNodes.length; n++) {
                    var node = source.childNodes[n];
                    if (node.nodeType == 1 && node.nodeName.toLowerCase() == "range") {
                        var newDataItem = new Object();
                        for (a = 0; a < node.attributes.length; a++) {
                            var att = node.attributes[a];
                            if (att.name.toLowerCase() == "min")
                                newDataItem["Min"] = node.attributes[a].value;
                            else if (att.name.toLowerCase() == "max")
                                newDataItem["Max"] = node.attributes[a].value;
                            else
                                newDataItem[node.attributes[a].name] = node.attributes[a].value;
                        }
                        o.push(newDataItem);
                    }
                }
                o.DataLoaded = true;
            }
            return o;
        }
        this.JSDataSource = function (oID, oBind, params) {
            if (OFramework.DataSources.Bindings[oID] == null) OFramework.DataSources.Bindings[oID] = new Array();
            if (OFramework.DataSources[oID] != null) {
                if (!OFramework.DataSources[oID].DataLoaded) OFramework.DataSources.Bindings[oID].push(oBind);
                return OFramework.DataSources[oID];
            }
            else {
                var retObj = new Object();
                retObj.DataLoaded = false;

                OFramework.DataSources.Bindings[oID].push(oBind);
                OFramework.DataSources[oID] = retObj;

                var source = "data.aspx?type=" + oID;
                if (params != null) source += "&" + params;
                if (OFramework.QSParams["siid"] != null) source += "&siid=" + OFramework.QSParams["siid"];
                else if (OFramework.QSParams["data_siid"] != null) source += "&siid=" + OFramework.QSParams["data_siid"];
                if (!OFramework.Culture.IsDefaultLanguage()) source += "&lang=" + OFramework.Culture.LanguageID;
                if (oID != null && oID != undefined && oID == "Labels") {
                    if (OFramework.LabelsID != null && OFramework.LabelsID != undefined) source += "&labelVal=" + OFramework.LabelsID.replace(/AirSearchForm_|CruiseSearchForm_|HotelSearchForm_|Matrix_ModifySearchForm_/ig, "");
                }

                window.setTimeout(function () { var sObj = document.createElement("script"); sObj.src = OFramework.BaseURI + source; sObj.defer = true; OFramework.GetContainer().appendChild(sObj); }, 50); return;
                return retObj;
            }
        }
        this.XmlDataSource = function (oID, oBind, params) {
            var o = new Array();
            o.DataLoaded = false;
            o.LoadComplete = function (data) {
                if (data != null && data.firstChild != null) {
                    o.ProcessDataNode(data.firstChild, o);
                }
                o.DataLoaded = true;
                oBind.DataBind();
            }
            o.ProcessDataNode = function (node, parent) {
                if (node.nodeType == 1) {
                    for (a = 0; a < node.attributes.length; a++) {
                        parent[node.attributes[a].name] = node.attributes[a].value;
                    }
                    for (var n = 0; n < node.childNodes.length; n++) {
                        var cNode = node.childNodes[n];
                        var newDataItem = cNode.nodeName.length == 1 ? new Object() : new Array();
                        o.ProcessDataNode(cNode, newDataItem)
                        if (cNode.nodeName.length == 1) parent.push(newDataItem);
                        else {
                            newDataItem.DataLoaded = true;
                            parent[cNode.nodeName] = newDataItem;
                        }
                    }
                }
            }

            var source = "data.aspx?type=" + oID + "&format=xml";
            if (params != null) source += "&" + params;
            if (OFramework.QSParams["siid"] != null) source += "&siid=" + OFramework.QSParams["siid"];
            else if (OFramework.QSParams["data_siid"] != null) source += "&siid=" + OFramework.QSParams["data_siid"];
            if (!OFramework.Culture.IsDefaultLanguage()) source += "&lang=" + OFramework.Culture.LanguageID;

            var tLoader = new OFramework.XmlLoader(o.LoadComplete);
            tLoader.open("GET", OFramework.BaseURI + source, true);
            tLoader.send(null);

            return o;
        }
        this.DataLoaded = function (oID) {
            if (!OFramework.DataSources.Bindings[oID]) return;
            for (var i = 0; i < OFramework.DataSources.Bindings[oID].length; i++) {
                OFramework.DataSources.Bindings[oID][i].DataSource = OFramework.DataSources[oID];
            }
        }
        this.Bindings = new Array();
        this.SortFactory = function (sort) {
            this.sort_by_name_asc = function (a, b) {
                var a_name = a != null ? a.name : "";
                var b_name = b != null ? b.name : "";
                return a_name.localeCompare(b_name);
            }
            this.sort_by_name_desc = function (a, b) {
                var a_name = a != null ? a.name : "";
                var b_name = b != null ? b.name : "";
                return b_name.localeCompare(a_name);
            }
            this.sort_by_rank_asc = function (a, b) {
                var a_name = a != null ? a.name : "";
                var b_name = b != null ? b.name : "";
                var a_rank = a != null && a.rank ? parseInt(a.rank) : 0;
                var b_rank = b != null && b.rank ? parseInt(b.rank) : 0;

                if (a_rank < b_rank) return -1;
                else if (a_rank > b_rank) return 1;
                else return a_name.localeCompare(b_name);
            }
            this.sort_by_rank_desc = function (a, b) {
                var a_name = a != null ? a.name : "";
                var b_name = b != null ? b.name : "";
                var a_rank = a != null && a.rank ? parseInt(a.rank) : 0;
                var b_rank = b != null && b.rank ? parseInt(b.rank) : 0;

                if (a_rank < b_rank) return 1;
                else if (a_rank > b_rank) return -1;
                else return a_name.localeCompare(b_name);
            }

            var direction = sort != null ? sort.Direction : "ASC";
            var field = sort != null ? sort.Field : "name"

            switch (field) {
                case "name": { this.Sort = direction == "DESC" ? this.sort_by_name_desc : this.sort_by_name_asc; break; }
                case "rank": { this.Sort = direction == "DESC" ? this.sort_by_rank_desc : this.sort_by_rank_asc; break; }
            }
        }
    }
    this.DataSources.prototype = new Array();

    this.Templates = new function () {

    }
    this.Templates.prototype = new Array();

    this.ProcessTemplate = function (oContainer, oElement, flag) {

        for (var c = 0; c < oElement.childNodes.length; c++) {
            var oNode = oElement.childNodes[c];
            var oNodeType = null;
            var newNode = null;

            if (oNode.scopeName == "OFRAMEWORK" || oNode.scopeName == "OFramework" || oNode.scopeName == "oframework") {
                oNodeType = oNode.localName != null ? oNode.localName.toLowerCase() : oNode.nodeName.toLowerCase();
            }
            else if (oNode.nodeName.indexOf("OFRAMEWORK") == 0 || oNode.nodeName.indexOf("OFramework") == 0 || oNode.nodeName.indexOf("oframework") == 0) {
                oNodeType = oNode.nodeName.substring(11, oNode.nodeName.length).toLowerCase();
            }
            if (oNodeType != null) {

                switch (oNodeType) {
                    case "input": { newNode = new OFramework.Controls.InputText(); break; }
                    case "hintinput": { newNode = new OFramework.Controls.HintInputText(); break; }
                    case "datepicker": {
                        if (typeof jQuery != 'undefined' && typeof jQuery.ui != 'undefined') {
                            newNode = new OFramework.Controls.DatePicker();
                        }
                        else {
                            newNode = new OFramework.Controls.InputDate();
                            oNodeType = "dateinput";
                        }
                        break;
                    }
                    case "dateinput": { newNode = new OFramework.Controls.InputDate(); break; }
                    case "calendarbutton": { newNode = new OFramework.Controls.CalendarButton(); break; }
                    case "dropdown": { newNode = new OFramework.Controls.DropdownList(); break; }
                    case "dropdownlist": { newNode = new OFramework.Controls.HtmlDropdownList(); break; }
                    case "selectmultiple": { newNode = new OFramework.Controls.SelectList(); break; }
                    case "checkboxlist": { newNode = new OFramework.Controls.CheckBoxList(); break; }
                    case "numberbox": { newNode = new OFramework.Controls.NumberBox(); break; }
                    case "fieldinfo": { newNode = new OFramework.Controls.FieldInfo(); break; }
                    case "label": { newNode = new OFramework.Controls.Label(); break; }


                }

                if (newNode == null) continue;
                //parent
                newNode.Parent = oContainer;
                //attributes
                for (var a = 0; a < oNode.attributes.length; a++) {
                    if (!oNode.attributes[a].specified) continue;
                    var att = oNode.attributes[a].name;
                    var att_val = oNode.attributes[a].value;
                    switch (att.toLowerCase()) {
                        case "id": { newNode.id = oContainer.id + "_" + att_val; continue; }
                        case "style": { newNode.style.cssText = oNode.style.cssText; continue; }
                        case "datasource":
                            {
                                //newNode.DataSource = new OFramework.DataSources.DataSource(att_val, att_val + ".xml");
                                if (!flag) newNode.DataSource = new OFramework.DataSources.JSDataSource(att_val, newNode);
                                continue;
                            }
                        case "itemtemplate": { newNode.ItemTemplate = att_val; continue; }
                        case "emptyitem": { newNode.DefaultItem = new Object(); newNode.DefaultItem.id = ""; newNode.DefaultItem.name = (newNode.Type == "DropdownList" ? "" : "&nbsp;"); continue; }
                        case "allitemlabel": { newNode.AllItemLabel = att_val; continue; }
                        case "calendarlayout": { newNode.CalendarLayout = att_val; continue; }
                        case "hinttext": { newNode.HintText = att_val; continue; }
                        case "linked": { newNode.Linked = true; continue; }
                        case "group": { newNode.GroupSort = att_val.split(','); continue; }
                        case "sort": { params = att_val.split(':'); if (params.length == 2) { newNode.Sort = { Field: params[0], Direction: params[1] }; } continue; }
                        case "filter":
                            {
                                var flt = new OFramework.Array();
                                var params = att_val.split(',');
                                for (var i = 0; i < params.length; i++) { flt.push(params[i]); }
                                newNode.SetFilter("id", flt);
                                continue;
                            }
                        case "value":
                            {
                                newNode.value = att_val;
                                if (oNodeType == "numberbox") {
                                    newNode.Value = att_val;
                                    if (newNode.NumberHolder) newNode.NumberHolder.setAttribute("value", att_val);
                                }
                                continue;
                            }
                        case "infotype": { newNode.InfoType = att_val; continue; }
                        case "fieldinfotype": { newNode.FieldInfoType = att_val; continue; }
                        case "numberofmonths": { newNode.NumberOfMonths = att_val; continue; }
                    }
                    newNode.setAttribute(att, att_val);
                }
                if ((oNodeType == "dropdownlist" || oNodeType == "dropdown") && oNode.childNodes.length > 0) {
                    var ds = new OFramework.DataSources.HtmlDataSource(oNode);
                    if (newNode.DataSource == null) {
                        newNode.DefaultItem = ds.shift(); newNode.DataSource = ds;
                    }
                    else newNode.DefaultItem = ds[0];
                    oNode.innerHTML = "";
                }
                if (oNodeType == "checkboxlist" && oNode.childNodes.length > 0) {
                    var ds = new OFramework.DataSources.HtmlDataSource(oNode);
                    newNode.DefaultItem = ds[0];
                    newNode.DefaultItem.Exclusive = true;
                    oNode.innerHTML = "";
                }
                if (oNodeType == "numberbox" && oNode.childNodes.length > 0) {
                    var ds = new OFramework.DataSources.RangeDataSource(oNode);
                    newNode.DataSource = ds;
                }
                if (newNode.DataSource != null) newNode.DataBind();
                oNode = oElement.replaceChild(newNode, oNode);
            }
            else {
                if (oNode.id && oNode.id != "") oNode.id = oContainer.id + "_" + oNode.id;
                if (oNode.htmlFor && oNode.htmlFor != "") oNode.htmlFor = oContainer.id + "_" + oNode.htmlFor;
            }
            if (oNode.childNodes.length > 0) OFramework.ProcessTemplate(oContainer, oNode, flag);
        }
    }
    this.ProcessItemTemplate = function (sTemplate, sData) {
        return ProcessItemTemplate(sTemplate, sData, null);
    }
    this.ProcessItemTemplate = function (sTemplate, sData, sHighlight) {
        var retStr = sTemplate;
        for (s in sData) {
            var text = sData[s];
            var tdiv = document.createElement('div');
            var matchVal = "";
            if (sHighlight != null) {
                var reg = new RegExp(sHighlight, "gi");
                matchVal = text.match(reg);
                if (matchVal != null) {
                    for (var i = 0; i < matchVal.length; i++) {
                        tdiv.innerHTML = text;
                        for (var node = tdiv.firstChild; node; node = node.nextSibling) {
                            if (node.nodeType === 3)//3= text node
                            {
                                var pos = node.data.indexOf(matchVal[i]);
                                if (pos >= 0) {
                                    var spannode = document.createElement('span');
                                    spannode.className = 'highlight';
                                    var middlebit = node.splitText(pos);
                                    var endbit = middlebit.splitText(matchVal[i].length);
                                    var middleclone = middlebit.cloneNode(true);
                                    spannode.appendChild(middleclone);
                                    middlebit.parentNode.replaceChild(spannode, middlebit);
                                }
                            }
                        }
                        text = tdiv.innerHTML;
                    }
                }
            }
            retStr = retStr.replace(s, text);
        }
        return retStr;

    }



    this.XmlLoader = function (iCallback) {
        var xmlLoader = null;
        try { xmlLoader = new XMLHttpRequest(); }
        catch (e) {
            try { xmlLoader = new ActiveXObject('Microsoft.XMLHTTP'); }
            catch (e2) {
                try { xmlLoader = new ActiveXObject('Msxml2.XMLHTTP'); }
                catch (e3) { xmlLoader = null; }
            }
        }
        xmlLoader.onreadystatechange = function () {
            if (xmlLoader.readyState == 4) {
                if (xmlLoader.status == 200) iCallback(xmlLoader.responseXML);
            }
        }

        return xmlLoader;
    }

    this.HtmlLoader = function (obj, iCallback) {
        var htmlLoader = null;
        try { htmlLoader = new XMLHttpRequest(); }
        catch (e) {
            try { htmlLoader = new ActiveXObject('Microsoft.XMLHTTP'); }
            catch (e2) {
                try { htmlLoader = new ActiveXObject('Msxml2.XMLHTTP'); }
                catch (e3) { htmlLoader = null; }
            }
        }
        htmlLoader.onreadystatechange = function () {
            if (htmlLoader.readyState == 4) {
                if (htmlLoader.status == 200) iCallback.call(obj, htmlLoader.responseText, true);
                if (htmlLoader.status == 403) {
                    OFramework.Console.WriteLn("HtmlLoader : file access forbidden");
                    iCallback.call(obj, null, false);
                }
                if (htmlLoader.status == 404) {
                    OFramework.Console.WriteLn("HtmlLoader : file not found (" + obj.fileName + ")");
                    iCallback.call(obj, null, false); //file not found error, try switch language ?
                }
            }
        }
        return htmlLoader;
    }
    this.HtmlTemplateLoader = function (obj, iCallback) {
        this.callback = iCallback;
        this.calee = obj;
        this.src = null;
        this.lang = OFramework.Settings.Target.Language ? OFramework.Culture.IsDefaultLanguage() ? null : OFramework.Culture.GetLanguageCode() : null;
        this.os = OFramework.Settings.Target.Platform ? OFramework.Navigator.Platform : null;
        this.nav = OFramework.Settings.Target.Navigator ? OFramework.Navigator.UserAgent : null;
        this.fileName = null;

        this.Load = function (src) {
            if (this.src == null && arguments.length == 1) this.src = src;
            this.fileName = this.src + (this.os != null ? "_" + this.os : "") + (this.nav != null ? "_" + this.nav : "") + (this.lang != null ? "_" + this.lang : "") + ".html";
            var tLoader = new OFramework.HtmlLoader(this, this.LoadComplete);
            tLoader.open("GET", OFramework.ThemeURI != null ? OFramework.ThemeURI + this.fileName : this.fileName, true);
            tLoader.send(null);
        }
        this.LoadComplete = function (data, success) {
            if ((this.lang == null && this.os == null && this.nav == null) || success) iCallback.call(obj, data, success);
            else {
                if (this.os != null) { this.os = null; this.Load(); return; }
                if (this.nav != null) { this.nav = null; this.Load(); return; }
                if (this.lang != null) { this.lang = null; this.Load(); return; }
            }
        }
    }

    this.ImageGallery = function (oContainer) {
        oContainer.Transition = oContainer.getAttribute("Transition") != null ? oContainer.getAttribute("Transition") : "CrossFade"; //FadeIn, FadeOut, SwipeIn, SwipeOut
        oContainer.Interval = parseInt(oContainer.getAttribute("Interval") != null ? oContainer.getAttribute("Interval") : 4);
        oContainer.Duration = 2;
        oContainer.DataSource = new Array();
        for (i = 0; i < oContainer.childNodes.length; i++) {
            var entry = oContainer.childNodes[i];
            if (entry.tagName != "DIV") continue;
            if (oContainer.DataSource.length == 0) {
                oContainer.style.width = entry.scrollWidth + "px";
                oContainer.style.height = entry.scrollHeight + "px";
                oContainer.style.display = "block";
            }
            entry.style.display = oContainer.DataSource.length == 0 ? "block" : "none";
            entry.style.position = "absolute";
            oContainer.DataSource[oContainer.DataSource.length] = entry;
        }

        oContainer.Run = function () {
            var last_entry = oContainer.DataSource.shift();
            var next_entry = oContainer.DataSource[oContainer.DataSource.length - 1];
            oContainer.DataSource[oContainer.DataSource.length] = last_entry;

            oContainer.TransitionStep = 10;
            oContainer.CrossFade();
        }
        if (oContainer.DataSource.length > 1) window.setTimeout(oContainer.Run, oContainer.Interval * 1000);

        oContainer.CrossFade = function () {
            var current_entry = oContainer.DataSource[oContainer.DataSource.length - 1];
            var next_entry = oContainer.DataSource[0];

            oContainer.SetOpacity(current_entry, oContainer.TransitionStep);
            oContainer.SetOpacity(next_entry, 10 - oContainer.TransitionStep);
            next_entry.style.display = "block";

            if (oContainer.TransitionStep == 0) {
                current_entry.style.display = "none";
                current_entry.style.opacity = 1;
                window.setTimeout(oContainer.Run, oContainer.Interval * 1000);
            }
            else {
                if (oContainer.TransitionStep == 5) {
                    next_entry.style.zIndex = oContainer.DataSource.length;
                    current_entry.style.zIndex = 1;
                }
                oContainer.TransitionStep--;
                window.setTimeout(oContainer.CrossFade, oContainer.Duration * 1000 / 10);
            }
        }
        oContainer.SetOpacity = function (obj, val) {
            obj.style.opacity = val / 10;
            obj.style.filter = 'alpha(opacity=' + val * 10 + ')';
        }
    }

    this.getPosTop = function (obj) {
        var cTop = 0;
        if (obj.offsetParent) {
            while (obj.offsetParent) {
                cTop += obj.offsetTop
                obj = obj.offsetParent;
            }
        }
        else if (obj.y) cTop += obj.y;
        return cTop;

    }
    this.getPosLeft = function (obj) {
        var cLeft = 0;
        if (obj.offsetParent) {
            while (obj.offsetParent) {
                cLeft += obj.offsetLeft
                obj = obj.offsetParent;
            }
        }
        else if (obj.x) cLeft += obj.x;
        return cLeft;
    }
    this.WinProperties = new function () {
        this.Width = function () {
            if (typeof (window.innerWidth) == 'number') return window.innerWidth;
            else if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth;
            else if (document.body && document.body.clientWidth) return document.body.clientWidth;
            return 0;
        }
        this.Height = function () {
            if (typeof (window.innerHeight) == 'number') return window.innerHeight;
            else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;
            else if (document.body && document.body.clientHeight) return document.body.clientHeight;
            return 0;
        }
        this.ScrollTop = function () {
            if (typeof (window.scrollTop) == 'number') return window.scrollTop;
            else if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
            else if (document.body && document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        this.ScrollLeft = function () {
            if (typeof (window.scrollLeft) == 'number') return window.scrollLeft;
            else if (document.documentElement && document.documentElement.scrollLeft) return document.documentElement.scrollLeft;
            else if (document.body && document.body.scrollLeft) return document.body.scrollLeft;
            return 0;
        }
    }
    this.getWindowWidth = function () {
        if (typeof (window.innerWidth) == 'number') return window.innerWidth;
        else if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth;
        else if (document.body && document.body.clientWidth) return document.body.clientWidth;
        return 0;
    }
    this.getWindowHeight = function () {
        if (typeof (window.innerHeight) == 'number') return window.innerHeight;
        else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;
        else if (document.body && document.body.clientHeight) return document.body.clientHeight;
        return 0;
    }
    this.getZIndex = function (obj) {
        var z = OFramework.GetStyle(obj, document.all ? 'zIndex' : 'z-index');
        if (z && z != "auto") return parseInt(z);
        else return obj.parentNode ? OFramework.getZIndex(obj.parentNode) : 0;
    }
    this.addEvent = function (elm, strEvent, fnHandler) {
        return (elm.addEventListener
	    ? elm.addEventListener(strEvent, fnHandler, false)
	    : elm.attachEvent('on' + strEvent, fnHandler)
	    );
    }
    this.Eval = function (oObj, sStr) {
        var sParts = sStr.split(".");
        for (i = 0; i < sParts.length; i++) {
            if (oObj[sParts[i]] != null) oObj = oObj[sParts[i]];
            else return null;
        }
        return oObj;
    }
    this.GetStyle = function (element, style) {
        var nn = null; var styles = null;
        if (window.getComputedStyle) { try { styles = window.getComputedStyle(element, null) } catch (e) { }; nn = styles != null ? styles.getPropertyValue(style) : null; }
        else if (document.defaultView && document.defaultView.getComputedStyle) { styles = document.defaultView.getComputedStyle(element, ''); nn = styles != null ? styles[style] : null; }
        var ie = element.currentStyle ? element.currentStyle[style] : null;
        var is = element.style ? element.style[style] : null;
        return nn || ie || is;
    }

    this.Dictionary = function (str, d1, d2) {
        this.Add = function (key, value) { this[key] = value; }
        this.Remove = function (key) { this[key] = null; }
        this.GetValue = function (key) { return this[key]; }

        if (str.length > 1) {
            str = str.substring(1, str.length);
            var keyValuePairs = str.split(d1);
            for (var k = 0; k < keyValuePairs.length; k++) {
                keyValuePair = keyValuePairs[k].split(d2);
                this.Add(unescape(keyValuePair[0]), unescape(keyValuePair[1]))
            }
        }
    }
    //for change Product Type option.
    this.ChangeProductType = function (oContainer) {
        /*
            var parent = ojQ(oContainer).parent('li')
            parent.siblings().andSelf().removeClass('active');
            parent.addClass('active');

            var ProductContainer = oContainer.hash;
            ojQ(ProductContainer).siblings().andSelf().removeClass('CurrentProduct');
            ojQ(ProductContainer).addClass('CurrentProduct');
            */
    }

    this.Dictionary.prototype = new Array();
    this.QSParams = new this.Dictionary(window.location.search, "&", "=");
    this.Culture = new this.Globalization.CultureInfo(this.QSParams["lang"] != null ? this.QSParams["lang"].toLowerCase() : "1");
}
OFramework.Logout = function (CallbackFunName) {

    this.LoadComplete = function (data) {
        var fcall = CallbackFunName + "(\"" + data + "\");";
        eval(fcall);
    }
    var tLoader = new OFramework.HtmlLoader(this, this.LoadComplete);
    tLoader.open("GET", OFramework.BaseURI + "?oFWorkLogout=true", true);
    tLoader.send(null);
}
OFramework.Customer = new function () {
    this.FirstName = null;
    this.LastName = null;
    this.Email = null;
    this.ExternalRef1 = null;
    this.ExternalRef2 = null;
    this.onChange = null;

    this.GetData = function () { OFramework.Customer.SendData("?oFWorkCData=info"); }
    this.LogIn = function (uid, pwd) { OFramework.Customer.SendData("?oFWorkCData=login&uid=" + uid + "&pwd=" + pwd); }
    this.LogOut = function () { OFramework.Customer.SendData("?oFWorkCData=logout"); }

    this.SetData = function () {
        var exists = arguments.length == 5;
        this.FirstName = exists ? arguments[0] : null;
        this.LastName = exists ? arguments[1] : null;
        this.Email = exists ? arguments[2] : null;
        this.ExternalRef1 = exists ? arguments[3] : null;
        this.ExternalRef2 = exists ? arguments[4] : null;

        if (this.onChange) this.onChange.call(this);
    }
    this.SendData = function (source) {
        //if (OFramework.QSParams["siid"] != null) source += "&siid=" + OFramework.QSParams["siid"];
        //else if (OFramework.QSParams["data_siid"] != null) source += "&siid=" + OFramework.QSParams["data_siid"];
        window.setTimeout(function () { var sObj = document.createElement("script"); sObj.src = OFramework.BaseURI + source; sObj.defer = true; OFramework.GetContainer().appendChild(sObj); }, 50); return;
    }
    //attach load data on window load event - commenting it to prevent it executing for all clients who don't need this
    //OFramework.addEvent(window, "load", this.GetData);
}

//OFramework.Customer.onChange = function () { 
//    alert(this.FirstName); 
//}

var Value;
function filterList(key, oContainer) {
    if (Value == null || Value == "")
        Value = String.fromCharCode(key);
    else
        Value += String.fromCharCode(key);

    var DivEle = document.getElementById("DDListPopUp");
    var List = oContainer.List;
    var divArr = List.getElementsByTagName("div");
    for (var i = 0; i < divArr.length; i++) {
        var ele = divArr[i];
        ele.className = 'list_item';
    }
    for (var i = 0; i < divArr.length; i++) {
        var ele = divArr[i];
        var eleVal = ele.innerHTML;
        var str = eleVal;
        eleVal = eleVal.toUpperCase();
        Value = Value.toUpperCase();
        ele.className = 'list_item';
        if (eleVal.startsWith(Value)) {
            ele.className = 'list_item_hover';
            DivEle.scrollTop = ele.offsetTop;
            oContainer.innerHTML = str;
            break;
        }
    }
    window.setTimeout(function () { Value = "" }, 1500);
    return str;
}

String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
}
String.prototype.appendQS = function () {
    var sStr = this;
    if (OFramework.QSParams["siid"] != null) sStr += (sStr == this ? "?" : "&") + "siid=" + OFramework.QSParams["siid"];
    if (OFramework.QSParams["sid1"] != null) sStr += (sStr == this ? "?" : "&") + "sid1=" + OFramework.QSParams["sid1"];
    if (OFramework.QSParams["sid2"] != null) sStr += (sStr == this ? "?" : "&") + "sid2=" + OFramework.QSParams["sid2"];
    if (OFramework.QSParams["referrer"] != null) sStr += (sStr == this ? "?" : "&") + "referrer=" + OFramework.QSParams["referrer"];
    if (OFramework.QSParams["referrer2"] != null) sStr += (sStr == this ? "?" : "&") + "referrer2=" + OFramework.QSParams["referrer2"];
    if (OFramework.QSParams["promo"] != null) sStr += (sStr == this ? "?" : "&") + "promo=" + OFramework.QSParams["promo"];
    if (OFramework.QSParams["promo2"] != null) sStr += (sStr == this ? "?" : "&") + "promo2=" + OFramework.QSParams["promo2"];
    if (OFramework.QSParams["saveReferrer"] != null && OFramework.QSParams["referrer"] != null) sStr += (sStr == this ? "?" : "&") + "saveReferrer=" + OFramework.QSParams["saveReferrer"];
    if (OFramework.QSParams["Deals"] != null) sStr += (sStr == this ? "?" : "&") + "Deals=" + OFramework.QSParams["Deals"];
    if (!OFramework.Culture.IsDefaultLanguage()) sStr += (sStr == this ? "?" : "&") + "lang=" + OFramework.Culture.LanguageID;
    if (OFramework.QSParams["p1"] != null) sStr += (sStr == this ? "?" : "&") + "p1=" + OFramework.QSParams["p1"];
    if (OFramework.QSParams["p2"] != null) sStr += (sStr == this ? "?" : "&") + "p2=" + OFramework.QSParams["p2"];
    if (OFramework.QSParams["cDataKey"] != null) sStr += (sStr == this ? "?" : "&") + "cDataKey=" + OFramework.QSParams["cDataKey"];
    if (OFramework.QSParams["hData"] != null) sStr += (sStr == this ? "?" : "&") + "hData=" + OFramework.QSParams["hData"];
    if (OFramework.QSParams["pData"] != null) sStr += (sStr == this ? "?" : "&") + "pData=" + OFramework.QSParams["pData"];
    //params added for APH - START
    if (OFramework.QSParams["contentonly"] != null) sStr += (sStr == this ? "?" : "&") + "contentonly=" + OFramework.QSParams["contentonly"];
    if (OFramework.QSParams["brn"] != null) sStr += (sStr == this ? "?" : "&") + "brn=" + OFramework.QSParams["brn"];
    if (OFramework.QSParams["packageid"] != null) sStr += (sStr == this ? "?" : "&") + "packageid=" + OFramework.QSParams["packageid"];
    if (OFramework.QSParams["changehotel"] != null) sStr += (sStr == this ? "?" : "&") + "changehotel=" + OFramework.QSParams["changehotel"];
    //params added for APH - END
    return sStr;
}

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
Array.prototype.GetUnique = function () {

    var newArr = new Array();
    var found = false;
    var i = 0, k = 0;
    for (i in this) {
        for (k in newArr) {
            if (this[i] == newArr[k])
                found = true;
        }
        if (!found)
            newArr[i] = this[i];
    }
    return newArr;

}

if (window['Element'] != undefined) {
    Element.prototype.hasClassName = function (name) { return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className); };
    Element.prototype.addClassName = function (name) { if (!this.hasClassName(name)) { this.className = this.className ? [this.className, name].join(' ') : name; } };
    Element.prototype.removeClassName = function (name) { if (this.hasClassName(name)) { var c = this.className; this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), ""); } };
}