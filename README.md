# "Multi-Cultural Communicator"
Multi Cultural (Language) Communication Web interface - Web Speech API utilization

One form of try out with Web Speech API.

- Live site:  https://playpit.kessetsu.net/mcc/

---

# Table of Contents

- ["Multi-Cultural Communicator"](#multi-cultural-communicator)
  - [About this application](#about-this-application)
     - [Application Environment](#application-environment)
     - [Code Base](#code-base)
     - [Checked to Run on:  ( as of Dec 2018 )](#checked-to-run-on---as-of-dec-2018-)
  - [Story behind to build this application](#story-behind-to-build-this-application)
    - [Story Line](#story-line)
- [Reference](#reference)

---

## About this application
What's achieved here is something you can do with Google Translate app or their web service.  Period :-)

### Application Environment
- Web Speech API (Current version:  speech synthesis only.  [No voice recognition] )
- Google Translate API built on Google Apps Script environment
- Pure JavaScript ( No JQuery )

### Code Base
- Mozilla  Hacks:  [Firefox and the Web Speech API](https://hacks.mozilla.org/2016/01/firefox-and-the-web-speech-api/)   demo
    +
Several others noted in **Reference** section.

### Checked to Run on:  ( as of Dec 2018 )
| OS      | Browser  | Checked OS versions  |
| :-------- | :--------|:-- |
| FreeBSD  | Firefox ver64.0 <br> Chromium ver68.0 ... cannot load language pull-down menu  |  11.2R   |
| Windows     |Firefox ver64.0 <br> Chrome |  10  |
| MacOS      | not checked |   |
| Ubuntu Linux      | Firefox ver64.0 <br> Chromium ver71.0 ... cannot load language pull-down menu | 18.04LTS  |
| iOS      | Safari <br> Firefox <br> Chrome | 12.1.1  |
| Android      | Firefox <br> Chrome | 9  |


## Story behind to build this application
Well, 
I just encountered some demo with Web Speech API (noted below) and thought about what kind of thing I want to create to try this out.

I have utilized speech recognition / synthesizer on Unix / Linux OS in the past to build an application, intended to build a robotic device application.  I thought manipulating speech recognition / synthesizer on Web (browser) interface for users may be nice to be combined as UI (User Interface) of robotic devices.

Please take this as my experimental build for the future work.

### Story Line

Planned to combine the knowledge acquired through below and build this application.

- Encountered **Online Video Lecture on Web Speech API** <br> https://dotinstall.com/lessons/webspeech_js/47804

  ↓

- Searched more and encountered **Mozilla Hacks  Web Speech API demo build** article <br> https://hacks.mozilla.org/2016/01/firefox-and-the-web-speech-api/

  ↓

- Encountered an article (in Japanese) to build **Google Translate API on Google Apps Script environment** <br> (The **Japanese title** of the article:  **"Build translation API in 3 min. on Google Apps Script environment"**)  <br> https://qiita.com/tanabee/items/c79c5c28ba0537112922


# Reference
- Simple ajax, pure javascript, no jquery :  <br> https://gist.github.com/keyle/9544102

- For strict CSV handling: <br>   http://memo.lovechu.net/2012/04/10-202257.php (Japanese article)

- HTML Select Box manipulation by JavaScript:  <br> https://javascript.programmer-reference.com/js-select-label/ 


