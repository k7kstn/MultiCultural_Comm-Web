/************************************
//  Accessing Google Translate API by AJAX 
//    to Google App Script env.
************************************/
 
/**************************************
// selected Lang Parameter set 
//         for Google Translate API
**************************************/
// function getSelectLabel(idname){
function getSelectGoogleLangCode(idname){
  var obj = document.getElementById(idname);
  var idx = obj.selectedIndex;       //インデックス番号を取得
  // var val = obj.options[idx].value;  //value値を取得
  // var txt  = obj.options[idx].text;  //ラベルを取得
  var langCode = obj.options[idx].getAttribute('data-googlelangcode');

  // console.log('obj: ' + obj);
  // console.log('idx: ' + idx);
  // console.log('value: ' + val);
  // console.log('label text: ' + txt);
  // console.log('data-lang: ' + obj.dataset['lang']);
  // console.log('data-name: ' + obj.dataset.name);
  // console.log('data-googlelangcode: ' + obj.dataset.googlelangcode);
  // console.log('data-googlelangcode: ' + langCode);

  return langCode;

}

/********************************************
// Security check : Sanitizing input data
********************************************/
function checkInputData(inputData) {
  if (/&|<|>|"|'/.test(inputData)) { 
    inputData = inputData.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  return inputData;
}


/********************************************
// call JSONP
// 
// Cross-Origin Requst ready process.
//  Google Apps Script  CORS does not seem
//     available sometimes
//  so prepare JSONP ready script in case. 
********************************************/
// function scriptTagGenJSONP(url) {
function callJSONP(url) {
  // Generate Script tag
  let scriptSeg = document.createElement('script');
  scriptSeg.type = 'text/javascript';
  scriptSeg.id = 'gt-jsonp';  // Google Translate API JSONP 

  // Generate this Script tag to HTML
  scriptSeg.src = url;
  document.body.appendChild(scriptSeg);
}

/********************************************
// Remove  <script> tag for JSONP call
//
//  Basically for security reason
//   not to display on HTML for long time.
********************************************/
function rmJSONPscriptTag(scriptTagID) {

  // to identify which script tag to remove
  rmTargetKey = 'script#' + scriptTagID;
  // console.log('rmTargetKey: ' + rmTargetKey);

  if (document.querySelectorAll(rmTargetKey) !== null) {
    let rmTargets = document.querySelectorAll(rmTargetKey); 
    let rmTargetParent;

    // console.log('rmTargets+length : ' + rmTargets.length);

    for (let i = 0; i < rmTargets.length; i++) {

      rmTargetParent = rmTargets[i].parentNode;
      rmTargetParent.removeChild(rmTargets[i]);
    }
  }
}

/* Handle JSONP response data */
function handleJSONP(response, scriptTagID) {
  // JSON.parse(response);

  // Security Check response Data and sanitize if necessary.
  response.translatedText = checkInputData(response.translatedText);

  console.log( response.translatedText );

  document.querySelector('textarea.txt-tgt').innerHTML = response.translatedText;

  if (response.translatedText == 'undefined') {
      document.querySelector('textarea.txt-tgt').innerHTML = 'Sorry, no Translation response aquired. \n すみません、翻訳システムの応答を得られませんでした。';
      // document.querySelector('textarea.txt-tgt').innerHTML = 'Sorry, no Translation response aquired. \n すみません、翻訳システムの応答を得られませんでした。\n\n Also, please make sure that you have chosen different languages for "Select Your Language" and "Select Language to translate to".\n また、「あなたの言語」と「翻訳したい言語」で異なる２つの言語が選択されていることを今一度お確かめください。';
  }

  rmJSONPscriptTag('gt-jsonp'); 

  // return  response.translatedText;

}

//---------------------------------------
// Set AJAX request parameter(s)
//---------------------------------------
const xhr = new XMLHttpRequest();
// const callbackFuncName = 'translateResponse';  // for Cross-Site access JSONP
// const callbackFuncName = 'getTranslateData';  // for Cross-Site access JSONP
const callbackFuncName = 'handleJSONP';  // for Cross-Site access JSONP

//---------------------------------------
// Set AJAX request parameter(s)
// AJAX request call trigger
//---------------------------------------
var transSrc = document.querySelector('textarea.txt-src');
// transSrc.addEventListener('change', makeReqXHR(xhrUrl) );
transSrc.addEventListener('change', makeReqXHR );

//---------------------------------------
// for AJAX request
//---------------------------------------
// function makeReqXHR( url ) {
function makeReqXHR() {

  if ( !xhr ) {
    document.querySelector('textarea.txt-tgt').innerHTML = 'Sorry, failed to activate Translation. \n すみません、翻訳処理が開始できませんでした。';
    return false;
  }

  // Set Access target
  // AJAX Google Translate API server base url set.
  //--- pre env    URL ---/
  var xhrUrl = 'https://script.google.com/macros/s/AKfycby67SagGrDtb1LXkyQF8meYIsmNrO1Lat_9otuz5hYUrlohNPjC/exec?';
  // let xhrUrl = 'https://script.google.com/macros/s/AKfycby67SagGrDtb1LXkyQF8meYIsmNrO1Lat_9otuz5hYUrlohNPjC/exec?';
  //--- production URL ---/
  // let xhrUrl = 'https://script.google.com/macros/s/AKfycbzauHwWj8rb9xs2BgSFhbMRsC_3C5XLYBRpLafUxBG8V7_MfDM/exec?';


  // Set URL http GET params
  let textData = transSrc.value;
  // let langSrcCode = 'ja' ;
  let langSrcCode = getSelectGoogleLangCode('src_lang_option') ;
  // let langTgtCode = 'de' ;
  let langTgtCode = getSelectGoogleLangCode('tgt_lang_option') ;

  // Set final access URL combined with GET params
  //   with Cross-Site access JSONP ready form
  xhrUrl = xhrUrl + 'text=' + textData + '&source=' + langSrcCode + '&target=' + langTgtCode + '&callback=' + callbackFuncName;
  // xhrUrl = xhrUrl + 'text=' + textData + '&source=' + langSrcCode + '&target=' + langTgtCode;

  console.log( xhrUrl );

  //---------------------------------------
  // Prepare  AJAX access
  //---------------------------------------
  xhr.finalUrl = xhrUrl;  // pass on this param to func translateResponse
  xhr.onreadystatechange = translateResponse;
  // xhr.onreadystatechange = getTranslatedData;
  xhr.open( 'GET', xhrUrl, true ); 
  // xhr.setRequestHeader('AJAX-Permit', 'ajaxpermit');
  xhr.send();

}

// function translateResponse(dataJSONP) {
function translateResponse() {
  if ( xhr.readyState === XMLHttpRequest.DONE ) {

    // if (xhr.status >= 200 && xhr.status < 300) {
    if (xhr.status === 200) {
      console.log('success!', xhr);
      callJSONP( xhr.finalUrl );
      // handleJSONP(xhr.responseText);
      // console.log(dataJSONP);
      // response = JSON.parse(dataJSONP);
      // document.querySelector('textarea.txt-tgt').innerHTML = xhr.responseText;
    } else {
      document.querySelector('textarea.txt-tgt').innerHTML = 'Sorry, no Translation response aquired. \n すみません、翻訳システムの応答を得られませんでした。\n\n Also, please make sure that you have chosen different languages for "Select Your Language" and "Select Language to translate to".\n また、「あなたの言語」と「翻訳したい言語」で異なる２つの言語が選択されていることを今一度お確かめください。';

    }
  }
}

