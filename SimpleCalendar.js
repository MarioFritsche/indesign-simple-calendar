// vorbeugenderweise das Anzeigen von Dialogen aktivieren
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

// Array SlectListe Dialog
myList = [];

// Array Datumsformate
var dateFormatList = [
    ['Auswahl', ''],
    ['Wochentag kurz (Mo)', '1'],
    ['Wochentag lang (Montag)', '2'],
    ['Tag (22)', '3'],
    ['Monat (6)', '4'],
    ['Monat (Juni)', '5'],
    ['Tag Monat Jahr (22.6.2020)', '6'],
    ['Tag Monat Jahr (22. Juni 2020)', '7'],
    ['Jahr kurz (20)', '8'],
    ['Jahr lang (2020)', '9'],
    ['Kalenderwoche', '10']
];

// Array Seperatoren
seperatorList = [
    ['Seperator wählen', ''],
    ['Tabulator (\\t)', '\t'],
    ['Zeilenumbruch (\\n)', '\n'],
    ['Absatzende (\\r)', '\r'],
    ['Semikolon', ';'],
    ['Komma', ','],
    ['Punkt', '.'],
    ['Leerzeichen', ' '],
    ['Komma + Leerzeichen', ', '],
    ['Punkt + Leerzeichen', '. ']
];

// Wochentag ausgeschrieben
var dayLong = new Array();
dayLong[0] = "Sonntag";
dayLong[1] = "Montag";
dayLong[2] = "Dienstag";
dayLong[3] = "Mittwoch";
dayLong[4] = "Donnerstag";
dayLong[5] = "Freitag";
dayLong[6] = "Samstag";

// Wochentage Abkürzung
var dayShort = new Array();
dayShort[0] = "So";
dayShort[1] = "Mo";
dayShort[2] = "Di";
dayShort[3] = "Mi";
dayShort[4] = "Do";
dayShort[5] = "Fr";
dayShort[6] = "Sa";

// Monate GER
var monthLong = new Array();
monthLong[0] = "Januar";
monthLong[1] = "Februar";
monthLong[2] = "März";
monthLong[3] = "April";
monthLong[4] = "Mai";
monthLong[5] = "Juni";
monthLong[6] = "Juli";
monthLong[7] = "August";
monthLong[8] = "September";
monthLong[9] = "Oktober";
monthLong[10] = "November";
monthLong[11] = "Dezember";

var dialogSelectSeperator = [];
for (var i = 0; i < seperatorList.length; i++) {
    dialogSelectSeperator.push(seperatorList[i][0]);
};

var dialogDateFormatList = [];
for (var i = 0; i < dateFormatList.length; i++) {
    dialogDateFormatList.push(dateFormatList[i][0]);
};

// Dialog
// Dialog angepasst, Script von Gerald Singelmann: https://www.hilfdirselbst.ch/foren/ScriptUI_-_Hinzuf%FCgen_neuer_Eingabefelder_%FCber_Benutzeroberfl%E4che_P540693.html#540693
// Aufgearbeitet von Peter Kahrel https://creativepro.com/files/kahrel/indesign/scriptui.html

var newDialog = new Window("dialog");
newDialog.text = "Simple Calendar";
newDialog.preferredSize.width = 500;
newDialog.preferredSize.height = 202;
newDialog.alignChildren = ["left", "top"];
newDialog.spacing = 11;
newDialog.margins = 16;

var groupTop = newDialog.add("group", undefined, { name: "groupTop" });
groupTop.preferredSize.width = 400;
groupTop.orientation = "row";
groupTop.alignChildren = ["left", "center"];
groupTop.spacing = 10;
groupTop.margins = 0;

var groupYear = groupTop.add("group", undefined, { name: "groupYear" });
groupYear.orientation = "column";
groupYear.alignChildren = ["left", "center"];
groupYear.spacing = 10;
groupYear.margins = 0;

var textYear = groupYear.add("statictext", undefined, undefined, { name: "textYear" });
textYear.text = "Jahr";

var inputYear = groupYear.add('edittext {properties: {name: "inputYear"}}');
inputYear.preferredSize.width = 80;
inputYear.text = new Date().getFullYear() + 1;

var groupSelectEndSeperator = groupYear.add("group", undefined, { name: "groupSelectEndSeperator" });
groupSelectEndSeperator.orientation = "column";
groupSelectEndSeperator.alignChildren = ["left", "center"];
groupSelectEndSeperator.spacing = 10;
groupSelectEndSeperator.margins = 0;

var textSelecetSeperator = groupSelectEndSeperator.add("statictext", undefined, undefined, { name: "textSelecetSeperator" });
textSelecetSeperator.text = "Endseperator";

var endSeperator = groupSelectEndSeperator.add("dropdownlist", undefined, undefined, { name: "endSeperator", items: dialogSelectSeperator });
endSeperator.selection = 3;
endSeperator.preferredSize.width = 180;

var groupButton = groupTop.add("group", undefined, { name: "groupButton" });
groupButton.orientation = "row";
groupButton.alignChildren = ["left", "top"];
groupButton.spacing = 10;
groupButton.margins = [170, 0, 0, 0];
groupButton.alignment = ["left", "top"];

var buttonClose = groupButton.add("button", undefined, 'Abbrechen', { name: "buttonClose" });
buttonClose.text = "Abbrechen";
buttonClose.onClick = function () { newDialog.close(false) };

var buttonRun = groupButton.add("button", undefined, 'Ausf\u00FChren');
buttonRun.onClick = function () {

    //Prüfen, ob Jahreszahl 4 Ziffern hat
    if (inputYear.text.length != 4 || inputYear.text <= 1970 || inputYear.text >= 2100 || isNaN(inputYear.text)) {
        alert('Überprüfe die Angaben im Feld \'Jahr\'\n Gültige Werte: >1970 <2100, numerische Werte');
        exit();
    }

    var selectionDate = "";
    for (var i = 0; i < maingroup.children.length; i++) {
        selectionDate += myList.push(dateFormatList[maingroup.children[i].selectionFormat.selection.index][1] + '##' + seperatorList[maingroup.children[i].selectionSeperator.selection.index][1]);
    }

    newDialog.close(true);
};


var maingroup = newDialog.add("panel {orientation: 'column'}");
maingroup.text = 'Ausgabe Daten definieren'
add_row(maingroup);

// Fehlerprüfungen
if (app.documents.length == 0) {
    alert("Es ist kein Dokument geöffnet.", "Achtung");
    exit();
};

if (
    app.selection.length == 0
) {
    alert('Es wurde kein Textrahmen ausgewählt');
    exit()
};

if (
    app.selection[0] instanceof TextFrame
) {
    newDialog.show();
}

else if (app.selection[0] instanceof Rectangle) {
    alert('Es wurde ein Rechteckrahmen ausgewählt!\rBitte einen Textrahmen auswählen');
    exit()
};


function main() {

    var contentOut = [];
    var dateOut = [];
    var newDate = new Date(inputYear.text, 0, 1)
    var daysYear = parseInt(inputYear.text);

    for (var i = 0; i < DaysOfYear(daysYear); i++) {
        firstDay = new Date(newDate.getTime() + i * 24 * 60 * 60 * 1000);

        for (var y = 0; y < myList.length; y++) {
            var element = myList[y];
            splitten = element.split('##');
            dateFormat = splitten[0];
            dateSeperator = splitten[1];
            dateOut[y] = FormateDate(parseInt(dateFormat)) + dateSeperator;
        }
        contentOut[i] = dateOut.join('') + seperatorList[endSeperator.selection.index][1];
    }

    return contentOut.join('');
};

// Textfeld mit Daten befüllen
app.selection[0].parentStory.contents = main();

function FormateDate(dateFormat) {
    switch (dateFormat) {
        case 1:
            return dayShort[firstDay.getDay()];
        case 2:
            return dayLong[firstDay.getDay()];
        case 3:
            return firstDay.getDate();
        case 4:
            return firstDay.getMonth() + 1;
        case 5:
            return monthLong[firstDay.getMonth()];
        case 6:
            return firstDay.getDate() + '.' + (firstDay.getMonth() + 1) + '.' + firstDay.getFullYear();
        case 7:
            return firstDay.getDate() + '. ' + monthLong[firstDay.getMonth()] + ' ' + firstDay.getFullYear();
        case 8:
            return inputYear.text.substring(2, 4);
        case 9:
            return firstDay.getFullYear();
        case 10:
            return CalendarWeek(firstDay);
    }
};

// Tage im Jahr / Days off year
function DaysOfYear(year) {
    var firstDayYear = new Date(year, 0, 1);
    var lastDayYear = new Date(year, 11, 31);
    return Math.round(Math.abs(firstDayYear - lastDayYear) / (1000 * 60 * 60 * 24) + 1);
};

// Kalenderwoche / Calendar week
function CalendarWeek(date) {
    var currentThursday = new Date(date.getTime() + (3 - ((date.getDay() + 6) % 7)) * 86400000);
    var yearOfThursday = currentThursday.getFullYear();
    var firstThursday = new Date(new Date(yearOfThursday, 0, 4).getTime() + (3 - ((new Date(yearOfThursday, 0, 4).getDay() + 6) % 7)) * 86400000);
    return Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000 / 7);
};

function add_row(maingroup, out) {
    var group = maingroup.add("group");
    group.preferredSize.width = 600;
    group.selectionFormat = group.add("dropdownlist", undefined, undefined, { name: "selectionFormat", items: dialogDateFormatList });
    group.selectionFormat.selection = 0;
    group.selectionFormat.preferredSize.width = 200;

    group.selectionSeperator = group.add("dropdownlist", undefined, undefined, { name: "selectionSeperator", items: dialogSelectSeperator });
    group.selectionSeperator.selection = 0;
    group.selectionSeperator.preferredSize.width = 200;

    group.plus = group.add("button", undefined, "+");
    group.plus.preferredSize.width = 40;
    group.plus.onClick = add_btn;
    group.minus = group.add("button", undefined, '-');
    group.minus.preferredSize.width = 40;
    if (maingroup.children.length === 1) {
        group.minus.enabled = false;
    }
    else {
        group.minus.enabled = true;
    }

    group.minus.onClick = minus_btn;
    group.index = maingroup.children.length - 1;
    newDialog.layout.layout(true);
};

function add_btn() {
    add_row(maingroup);
};

function minus_btn() {
    maingroup.remove(this.parent);
    newDialog.layout.layout(true);
};