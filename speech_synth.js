var synth = window.speechSynthesis;

// var inputForm = document.querySelector('form');
var inputForm = document.querySelector('form#form-tgt');
// var inputForm = document.querySelector('#form-tgt');
// var inputTxt = document.querySelector('.txt');
var inputTxt = document.querySelector('.txt-tgt');
// var voiceSelect = document.querySelector('select');
// var voiceSelect = document.querySelectorAll('select');
// var voiceSelect = document.querySelector('select#src_lang_option');
// var voiceSelect = document.querySelector('select#tgt_lang_option');
var voiceSelect = document.querySelectorAll('select#src_lang_option, select#tgt_lang_option');
// var voiceSelect = document.querySelectorAll('#src_lang_option #tgt_lang_option');

// console.log(inputForm);
// console.log(voiceSelect.length);
// console.log(voiceSelect);

// var pitch = document.querySelector('#pitch');
var pitch = document.querySelector('#pitch-tgt');
// var pitchValue = document.querySelector('.pitch-value');
var pitchValue = document.querySelector('.pitch-value-tgt');
// var rate = document.querySelector('#rate');
var rate = document.querySelector('#rate-tgt');
// var rateValue = document.querySelector('.rate-value');
var rateValue = document.querySelector('.rate-value-tgt');

var voices = [];

function populateVoiceList(responseData) {

  let textGoogleTransAvail;
  let googleLangCode;
  let option;

  // let csvGoogleLangArray = [];
  csvGoogleLangArray = createGoogleLangArray(responseData);

  // let timestamp = new Date();
  // console.log('func populateVoiceList google-avail-lang-get.js call end' + timestamp);
  // console.log('below: call from populateVocieList');
  // console.log(csvGoogleLangArray);

  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  for (let j = 0; j < voiceSelect.length; j++) {

    var selectedIndex = voiceSelect[j].selectedIndex < 0 ? 0 : voiceSelect[j].selectedIndex;
    voiceSelect[j].innerHTML = '';

    for(let i = 0; i < voices.length ; i++) {

      for(let k = 0; k < csvGoogleLangArray.length ; k++) {

        // timestamp = new Date();
        // console.log('within k loop call ' + timestamp);
        // console.log('within  k loop : csvGoogleLangArray : ' + csvGoogleLangArray[k][0]);
        // console.log('within  k loop : csvGoogleLangArray : ' + csvGoogleLangArray[k][1]);
        // console.log('within  k loop : voices.length : ' + voices.length);

        // if ( csvGoogleLangArray[k][1].toLowerCase() === voices[i].lang.substr(0, csvGoogleLangArray[k][1].length).replace('_', '-').toLowerCase() ) {
        if ( csvGoogleLangArray[k][1].toLowerCase() == voices[i].lang.substr(0, csvGoogleLangArray[k][1].length).replace('_', '-').toLowerCase() ) {

          googleLangCode = csvGoogleLangArray[k][1];
          // textGoogleTransAvail = ' [ Avail ] ' ;
          // textGoogleTransAvail = ' [Avail : ' + googleLangCode + ' ] ' ;

        // } else {

        //   googleLangCode = '';
        //   textGoogleTransAvail = ' [NO Avail] ';
        //  }

        // var option = document.createElement('option');
        option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        // option.textContent = voices[i].name + ' (' + voices[i].lang + ')' + textGoogleTransAvail;
    
        if(voices[i].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        option.setAttribute('data-googleLangCode', googleLangCode);
        voiceSelect[j].appendChild(option);
        }
      }
    }
    voiceSelect[j].selectedIndex = selectedIndex;
  }
}

// populateVoiceList();
getCSVFileXHR('google-translate-avail-lang.csv', populateVoiceList);
// populateVoiceList( getCSVFileXHR('google-translate-avail-lang.csv') );
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    };
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    };
    // var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    var selectedOption = voiceSelect[1].selectedOptions[0].getAttribute('data-name');
    for(let i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
};

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
};

rate.onchange = function() {
  rateValue.textContent = rate.value;
};

voiceSelect.onchange = function(){
  speak();
};
