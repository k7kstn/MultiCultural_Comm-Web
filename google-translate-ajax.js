/*
 *  Accessing Google Translate API by AJAX 
 *    to Google App Script env.
 */

const xhr = new XMLHttpRequest();

// AJAX Google Translate API server base url set.
var xhrUrl = 'https://script.google.com/macros/s/AKfycbzauHwWj8rb9xs2BgSFhbMRsC_3C5XLYBRpLafUxBG8V7_MfDM/exec?';

var textData ;
var langSrcCode = 'ja' ;
var langTgtCode = 'de' ;

// console.log( xhrUrl );

var transSrc = document.querySelector('textarea.txt-src');
transSrc.addEventListener('change', makeReqXHR);

function makeReqXHR() {

  if ( !xhr ) {
    document.querySelector('textarea.txt-tgt').innerHTML = 'Sorry, failed to activate Translation. \n すみません、翻訳処理が開始できませんでした。'
    return false;
  }

  textData = transSrc.value;
  xhrUrl = xhrUrl + 'text=' + textData + '&source=' + langSrcCode + '&target=' + langTgtCode

  xhr.onreadystatechange = translateResponse;
  xhr.open( 'GET', xhrUrl, true ); 
  // xhr.setRequestHeader('AJAX-Permit', 'ajaxpermit');
  xhr.send();
}

function translateResponse() {
  if ( xhr.readyState === XMLHttpRequest.DONE ) {

    // if (xhr.status >= 200 && xhr.status < 300) {
    if (xhr.status === 200) {
      console.log('success!', xhr);
      document.querySelector('textarea.txt-tgt').innerHTML = xhr.responseText;
    } else {
      document.querySelector('textarea.txt-tgt').innerHTML = 'Sorry, no Translation response aquired. \n すみません、翻訳システムの応答を得られませんでした。'
    }
  }
};

