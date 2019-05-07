# Gjeter
A prototype for digitalizing supervision of sheep (in norwegian)

### Sources
Used the tutorial from [Apache Cordova Tutorial][1] as a beginner template. 
Made my own spa using this guide [Making a Single Page App Without a Framework][2], 
as no readymade tools worked for my old phone (JellyBean 4.1.2).

[1]: https://ccoenraets.github.io/cordova-tutorial/index.html
[2]: https://tutorialzine.com/2015/02/single-page-app-without-a-framework

### Running on device
Connect your phone to your pc, and make sure that phone debugging is on. 
Use bash, or any other commandline tool, and navigate to the project folder.
```bash
cordova run android
```

### Original set up
This should not be necessary, as the config.xml file should install this on build.
```bash
cordova platform add android@6.4.0
#The addition of @6.4.0 is for support of older versions of andriod,
# leave out if you are using android version 4.4 or higher.
cordova plugin add cordova-plugin-geolocation
```
