var SpecialSymbols =  {
    '<': '&lt;',
    '>': '&gt;',
    '(': '&#40;',
    ')': '&#41;',
    '#': '&#35;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;'
};


function IfImg(name2) {
	return name2.match('image/*')
}


/*
function ifImage(name) {

const Tpimage = /^image\/(jpg|jpeg|png|gif|webp|bmp)+$/

return Tpimage.test(name)

}
*/


function ifImage(name) {

const Tpimage = /^image\/(jpg|jpeg|png|gif|webp|bmp)+$/

if (Tpimage.test(name)) {
  return name.split("/")[1]
} else {
 return false; 
}

}


function Unix_timestamp(){

const dt = new Date;

return parseInt(dt.getTime()/1000);
}


function Timestamp(){
	return new Date().getTime();
}


const qz = Timestamp()


//module.exports = { ifImage, Timestamp, Unix_timestamp }
 
//module.exports = { ifImage } 
//module.exports.ifImage =  ifImage 
//module.exports.Timestamp =  Timestamp 

//exports.Ifimg = ifImage
//exports.Timestamp2 = Timestamp


module.exports = { 
ifImage, Timestamp, IfImg
}
