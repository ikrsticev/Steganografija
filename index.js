import * as sjcl from "sjcl";

console.clear();

//funkcije
var setBit = function (number, location, bit) {
  return (number & ~(1 << location)) | (bit << location);
};

var getBit = function (number, location) {
  return (number >> location) & 1;
};

var getBitsFromNumber = function (number) {
  let bits = [];
  for (let i = 0; i < 16; i++) {
    bits.push(getBit(number, i));
  }
  return bits;
};

var img = new Image();

img.crossOrigin = "Anonymous";
img.onload = function () {
  //postavljanje slike
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = img.width;
  ctx.canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  var imgData = ctx.getImageData(0, 0, img.width, img.height);
  var colors = imgData.data;

  //encoding
  var poruka = "Ovo je moja poruka";
  var msgLength = poruka.length.toString(2); //binarno
  //console.log(msgLength);
  while (msgLength.length < 16) {
    msgLength = "0" + msgLength;
  }
  //console.log(msgLength);
  var messageBits = [];

  //console.log(msgLength);
  for (let i = 0; i < 16; i++) {
    messageBits = messageBits.concat(msgLength[i]);
  }
  //console.log(messageBits);
  //console.log(messageBits.join(''));

  for (let i = 0; i < poruka.length; i++) {
    let code = poruka.charCodeAt(i);
    //console.log(code);

    let bits = getBitsFromNumber(code);
    bits = bits.splice(0,8);
    //console.log("Bits: ", bits);
    messageBits = messageBits.concat(bits);
  }
  //console.log(messageBits.join(''));
  var password = "123";
  var hash = sjcl.hash.sha256.hash(password);
  var pos = 0;
  while (pos < messageBits.length) {
    let rand = hash[pos % hash.length] * (pos + 1);
    let loc = Math.abs(rand) % colors.length;
    colors[loc] = setBit(colors[loc], 0, messageBits[pos]);
    pos++;
  }
  

  //decoding

  //hash = sjcl.hash.sha256.hash(password);
  var messageSize = 0;
  pos = 0;
  while (pos < 16) {
    let rand = hash[pos % hash.length] * (pos + 1);
    let loc = Math.abs(rand) % colors.length;
    // ...
    let bit = getBit(colors[loc], 0);
    messageSize = setBit(messageSize, 15 - pos, bit);
    
    pos++;
  }

  messageBits = [];
  while (pos < messageSize*8 + 16) {
    let rand = hash[pos % hash.length] * (pos + 1);
    let loc = Math.abs(rand) % colors.length;
    // ...
    let bit = getBit(colors[loc], 0);
    //console.log(bit);
    messageBits = messageBits.concat(bit);
    pos++;
  }
  //console.log(messageBits);


  var message = "";

  for(let i = 0; i < messageBits.length; i += 8){
    let stringBits = "";
    for(let j = 0; j < 8; j++){
      stringBits = messageBits[i+j] + stringBits;
    }
    message += String.fromCharCode(parseInt(stringBits, 2));
    //console.log(String.fromCharCode(parseInt(stringBits, 2)));
  }

  console.log(message);
};
img.src =
  "https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg";
