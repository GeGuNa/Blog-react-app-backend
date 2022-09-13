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

function Unix_timestamp(){

const dt = new Date;

return parseInt(dt.getTime()/1000);
}


function Timestamp(){
	return new Date().getTime();
}


const qz = Stndrt()

