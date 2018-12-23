var synthTgt = window.speechSynthesis;

// var inputForm = document.querySelector('form');
var inputFormTgt = document.querySelector('form#form-tgt');
var inputTxtTgt = document.querySelector('.txt-tgt');
// var voiceSelect = document.querySelector('select');
// var voiceSelectTgt = document.querySelector('select#src_lang_option');
var voiceSelectTgt = document.querySelector('select#tgt_lang_option');
// var voiceSelect = document.querySelectorAll('select#src_lang_option, select#tgt_lang_option');
// var voiceSelect = document.querySelectorAll('#src_lang_option, #tgt_lang_option');

// var pitch = document.querySelector('#pitch');
var pitchTgt = document.querySelector('#pitch-tgt');
// var pitchValue = document.querySelector('.pitch-value');
var pitchValueTgt = document.querySelector('.pitch-value-tgt');
// var rate = document.querySelector('#rate');
var rateTgt = document.querySelector('#rate-tgt');
// var rateValue = document.querySelector('.rate-value');
var rateValueTgt = document.querySelector('.rate-value-tgt');

var voices = [];

function populateVoiceList() {
  voices = synthTgt.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelectTgt.selectedIndex < 0 ? 0 : voiceSelectTgt.selectedIndex;
  voiceSelectTgt.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelectTgt.appendChild(option);
  }
  voiceSelectTgt.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    if (synthTgt.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxtTgt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxtTgt.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelectTgt.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitchTgt.value;
    utterThis.rate = rateTgt.value;
    synthTgt.speak(utterThis);
  }
}

inputFormTgt.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxtTgt.blur();
}

pitchTgt.onchange = function() {
  pitchValueTgt.textContent = pitchTgt.value;
}

rateTgt.onchange = function() {
  rateValueTgt.textContent = rateTgt.value;
}

voiceSelectTgt.onchange = function(){
  speak();
}
