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
 

const xhr = new XMLHttpRequest();
//// const callbackFuncName = 'translateResponse';  // for Cross-Site access JSONP

var transSrc = document.querySelector('textarea.txt-src');
transSrc.addEventListener('change', makeReqXHR);

/**************************************
// for AJAX request
**************************************/
function makeReqXHR() {

  if ( !xhr ) {
    document.querySelector('textarea.txt-tgt').innerHTML = 'Sorry, failed to activate Translation. \n すみません、翻訳処理が開始できませんでした。';
    return false;
  }

  /**************************************
  // Cross-Origin Requst ready process.
  //  Google Apps Script  CORS not available (as of 2018/12)
  //  so try to get done with JSONP. 
  **************************************/
  // Generate Script tag
  //// let scriptSeg = document.createElement('sctipt');
  //// scriptSeg.type = 'text/javascript';

  // Set Access target
  // AJAX Google Translate API server base url set.
  let xhrUrl = 'https://script.google.com/macros/s/AKfycbzauHwWj8rb9xs2BgSFhbMRsC_3C5XLYBRpLafUxBG8V7_MfDM/exec?';

  // Set URL http GET params
  let textData = transSrc.value;
  // let langSrcCode = 'ja' ;
  let langSrcCode = getSelectGoogleLangCode('src_lang_option') ;
  // let langTgtCode = 'de' ;
  let langTgtCode = getSelectGoogleLangCode('tgt_lang_option') ;

  // Set final access URL combined with GET params
  //   with Cross-Site access JSONP ready form
  // xhrUrl = xhrUrl + 'text=' + textData + '&source=' + langSrcCode + '&target=' + langTgtCode + '&callback=' + callbackFuncName;
  xhrUrl = xhrUrl + 'text=' + textData + '&source=' + langSrcCode + '&target=' + langTgtCode;

  console.log( xhrUrl );

  //// scriptSeg.src = xhrUrl;

  // Generate this Script tag to HTML
  //// document.body.appendChild(scriptSeg);

  /**************************************
  // Prepare  AJAX access
  **************************************/
  xhr.onreadystatechange = translateResponse;
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
      // console.log(dataJSONP);
      // response = JSON.parse(dataJSONP);
      document.querySelector('textarea.txt-tgt').innerHTML = xhr.responseText;
    } else {
      document.querySelector('textarea.txt-tgt').innerHTML = 'Sorry, no Translation response aquired. \n すみません、翻訳システムの応答を得られませんでした。\n\n Also, please make sure that you have chosen different languages for "Select Your Language" and "Select Language to translate to".\n また、「あなたの言語」と「翻訳したい言語」で異なる２つの言語が選択されていることを今一度お確かめください。';
    }
  }
}

