# Sheep
A prototype for digitalizing supervision of sheep

### Running on device
```bash
cordova run android
```


### Original set up
This should not be necessary, as the config.xml file should install this on build.
```bash
cordova platform add android@6.4.0
#The addition of @6.4.0 is for support of older versions of andriod,
# leave out if you are using android version 4.4 of higher.
cordova plugin add cordova-plugin-geolocation
```
