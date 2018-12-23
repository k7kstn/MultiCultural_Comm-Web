var synthSrc = window.speechSynthesis;

// var inputForm = document.querySelector('form');
var inputFormSrc = document.querySelector('form#form-src');
var inputTxtSrc = document.querySelector('.txt-src');
// var voiceSelect = document.querySelector('select');
var voiceSelectSrc = document.querySelector('select#src_lang_option');
// var voiceSelect = document.querySelector('select#tgt_lang_option');
// var voiceSelect = document.querySelectorAll('select#src_lang_option select#tgt_lang_option');
// var voiceSelect = document.querySelectorAll('#src_lang_option #tgt_lang_option');

// var pitch = document.querySelector('#pitch');
var pitchSrc = document.querySelector('#pitch-src');
// var pitchValue = document.querySelector('.pitch-value');
var pitchValueSrc = document.querySelector('.pitch-value-src');
// var rate = document.querySelector('#rate');
var rateSrc = document.querySelector('#rate-src');
// var rateValue = document.querySelector('.rate-value');
var rateValueSrc = document.querySelector('.rate-value-src');

var voices = [];

function populateVoiceList() {
  voices = synthSrc.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelectSrc.selectedIndex < 0 ? 0 : voiceSelectSrc.selectedIndex;
  voiceSelectSrc.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelectSrc.appendChild(option);
  }
  voiceSelectSrc.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

/***********************************************

function speak(){
    if (synthSrc.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxtSrc.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxtSrc.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelectSrc.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitchSrc.value;
    utterThis.rate = rateSrc.value;
    synthSrc.speak(utterThis);
  }
}

inputFormSrc.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxtSrc.blur();
}

pitchSrc.onchange = function() {
  pitchValueSrc.textContent = pitchSrc.value;
}

rateSrc.onchange = function() {
  rateValueSrc.textContent = rateSrc.value;
}

voiceSelectSrc.onchange = function(){
  speak();
}

***********************************************/

