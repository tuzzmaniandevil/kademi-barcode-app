controllerMappings
        .adminController()
        .path("/helloWorld/")
        .enabled(true)
        .defaultView(views.templateView("helloWorld/manageHelloWorld.html"))
        .build();
        

function generate(type){
    
}

/*
* Java Classes
*/
var HashMap = Java.type('java.util.HashMap');
var ByteArrayOutputStream = Java.type('java.io.ByteArrayOutputStream');
var StringUtils = Java.type('org.apache.commons.lang.StringUtils');

/*
* ZXing Classes
*/
var EncodeHintType = Java.type('com.google.zxing.EncodeHintType');
var ErrorCorrectionLevel = Java.type('com.google.zxing.qrcode.decoder.ErrorCorrectionLevel');
var BitMatrix = Java.type('com.google.zxing.common.BitMatrix');
var BarcodeFormat = Java.type('com.google.zxing.BarcodeFormat');
var MultiFormatWriter = Java.type('com.google.zxing.MultiFormatWriter');
var MatrixToImageWriter = Java.type('com.google.zxing.client.j2se.MatrixToImageWriter');
var MatrixToImageConfig = Java.type('com.google.zxing.client.j2se.MatrixToImageConfig');

function genQrCode(){
    var hintMap = new HashMap();
    hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
    hintMap.put(EncodeHintType.MARGIN, 4);
    
    var config = new MatrixToImageConfig(MatrixToImageConfig.BLACK, MatrixToImageConfig.WHITE);
    
    var matrix = new MultiFormatWriter().encode("WIFI:S:Test Network;P:Password;T:WPA;;",BarcodeFormat.QR_CODE ,400,200,hintMap);
    
    var out = new ByteArrayOutputStream();
    
    MatrixToImageWriter.writeToStream(matrix, "png", out, config);
    
    var newHash = fileManager.upload(out.toByteArray());
    
    log.info('QR Code hash -> {}', newHash);
    
    return newHash;
}

function test(a){
    return {type: "QR_CODE"};
}

var DEFAULTS = {
    type: 'QR_CODE',
    hidden: false,
    width: 200,
    height: 200,
    onColor: 0xFF000000,
    offColor: 0xFFFFFFFF
};

function qrWifi(ssid, password, security, hidden, width, height, onColor, offColor){
    // WIFI:T:WPA;S:mynetwork;P:mypass;;
    var s = 'WIFI:'
    + 'S:' + escapeString(ssid) + ';'
    + 'P:' + escapeString(password) + ';';
    if(StringUtils.isBlank(security)){
        security = "WPA/WPA2";
    }
    s = s + 'T:' + security + ';';
    hidden = safeBoolean(hidden);
    if(hidden){
        s = s + 'H:' + hidden + ';';
    }
    s = s + ';';
    
    
}

function generate(){
    var firstArg = arguments[0];
    if(firstArg instanceof Java.type('java.util.Map')){
        if(firstArg.containsKey('type')){
            var type = formatter.format(firstArg.get('type'));
            return type;
        }
    }
}

function safeBoolean(val) {
    if (typeof val === "undefined" || val === null) {
        return false;
    }
    var b = formatter.toBool(val);
    if (b === null) {
        return false;
    }
    return b.booleanValue();
}

function escapeString(s){
    var backslash = "\u005C";
    s = s.replaceAll(backslash, "\u005C\u005C");
    s = s.replaceAll("\u003b", backslash + "\u003b");
    s = s.replaceAll("\u002c", backslash + "\u002c");
    s = s.replaceAll("\u003a", backslash + "\u003a");
    s = s.replaceAll("\u0022", backslash + "\u0022");
    
    return s;
}