/*****************************************
// Google Translate
//   Available Language list data prepare
//   ( Data source:  csv )
//
//  https://cloud.google.com/translate/docs/languages
*****************************************/

var csvGoogleLangArray = new Array();

function getCSVFileXHR(url, callback) {
// function getCSVFileXHR(url) {
    var xhr = new XMLHttpRequest();
    // xhr.onload = function() {
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // createGoogleLangArray(xhr.responseText);
        callback(xhr.responseText);
        // return xhr.responseText;
      }
    }
 
    // xhr.open('GET', "google-translate-avail-lang.csv", true);
    xhr.open('GET', url, true);
    xhr.send(null);
}
// getCSVFileXHR(google-translate-avail-lang.csv, createGoogleLangArray);

/***** 
function createXMLHttpRequest() {
    var XMLhttpObject = null;
    XMLhttpObject = new XMLHttpRequest();
    return XMLhttpObject;
}
*****/


/*************************************************
// CSV parser   " (double quotation) handle ready
// 
//  to handle Google Lang Code csv data
//
//  In order to handle data such as below, 
//      it has to handle double quotation for 1 data chunk case.
// 
//   "Portuguese (Portugal,  Brazil)"
// 
// Reference:  http://memo.lovechu.net/2012/04/10-202257.php
*************************************************/
// function parseCSV2(text, delim) {
function createGoogleLangArray(text, delim) {
 if (!delim) delim = ',';
 var tokenizer = new RegExp(delim + '|\r?\n|[^' + delim + '"\r\n][^' + delim + '\r\n]*|"(?:[^"]|"")*"', 'g');

 var record = 0, field = 0, data = [['']], qq = /""/g;
 text.replace(/\r?\n$/, '').replace(tokenizer, function(token) {
  switch (token) {
   case delim: 
    data[record][++field] = '';
    break;
   case '\n': case '\r\n':
    data[++record] = [''];
    field = 0;
    break;
   default:
    data[record][field] = (token.charAt(0) != '"') ? token : token.slice(1, -1).replace(qq, '"');
  }
 });

 let timestamp = new Date();
 console.log('func createGoogleLangArray: ' + timestamp); 
 console.log(data);

 return data;
}
 
/***** 
function createGoogleLangArray(csvData) {

    let tempArray = csvData.split("\n");
    // tempArray = csvData.split("\n");
    // var csvArray = new Array();
    for(var i = 0; i<tempArray.length;i++){
      // csvArray[i] = tempArray[i].split(",");
      csvGoogleLangArray[i] = tempArray[i].split(",");
    }
    // console.log(csvArray);
    let timestamp = new Date();
    console.log('func createGoogleLangArray: ' + timestamp); 
    console.log(csvGoogleLangArray);

    return csvGoogleLangArray;
}
*****/

