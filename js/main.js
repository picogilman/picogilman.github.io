var player = {
    currentTabState: "main",
    clickcount: 0,
    highlightedNames: [],
    lastLettersPressed: [],
    everSpelledName: false,
    everSpelledSurname: false,
    everAlec: false,
}


var PAPERS = {
    SMALL2024LowLying: {
        name: "ON THE DENSITY OF LOW LYING ZEROS OF A LARGE FAMILY OF AUTOMORPHIC <i>L</i>-FUNCTIONS",
        link: "https://arxiv.org/pdf/2408.09050",
        status: "submitted", // Research in Number Theory
        // PUT THE DATE + CITATION COUNT
        collaborators: ["TIMOTHY CHEEK", "KAREEM JABER", "STEVEN J. MILLER", "MARIE-H&#233;L&#232;NE TOM&#233;"]
    },
    SMALL2024Bias: {
        name: "NUMERICAL INVESTIGATION OF LOWER ORDER BIASES IN MOMENT EXPANSIONS OF ONE PARAMETER FAMILIES OF ELLIPTIC CURVES",
        link: "https://www.sciencedirect.com/science/article/abs/pii/S0022314X25002033", // "https://arxiv.org/pdf/2409.18224", 
        status: "Journal of Number Theory", 
        // PUT THE DATE + CITATION COUNT
        collaborators: ["TIMOTHY CHEEK", "KAREEM JABER", "STEVEN J. MILLER", "VISMAY SHARAN", "MARIE-H&#233;L&#232;NE TOM&#233;"]
    },
    SMALL2024BiasSurvey: {
        name: "A SURVEY OF LOWER ORDER BIASES IN MOMENT EXPANSIONS OF ONE PARAMETER FAMILIES OF ELLIPTIC CURVES",
        link: "https://web.williams.edu/Mathematics/sjmiller/public_html/math/papers/ECBias_Database_Survey_StonyBrook_SMALL2024_v11.pdf",
        status: "Conference Proceedings of the Murmurations Workshop at Stony Brook 2024", 
        // PUT THE DATE + CITATION COUNT
        collaborators: ["TIMOTHY CHEEK", "KAREEM JABER", "STEVEN J. MILLER", "VISMAY SHARAN", "MARIE-H&#233;L&#232;NE TOM&#233;"]
    },
    SMALL2024Erdos: {
        name: "CONGRUENCE CLASSES OF SIMPLEX STRUCTURES IN FINITE FIELD VECTOR SPACES",
        link: "https://arxiv.org/pdf/2408.07912",
        status: "submitted",
        // PUT THE DATE + CITATION COUNT
        collaborators: ["TIMOTHY CHEEK", "JOSEPH COOPER", "ALEX IOSEVICH", "KAREEM JABER", "EYVINDUR PALSSON", "VISMAY SHARAN", "JENNA SHUFFELTON", "MARIE-H&#233;L&#232;NE TOM&#233;"]
    },
    SMALL2024Matrix: {
        name: "A CLOSED FORMULA FOR LINEAR RECURRENCES WITH CONSTANT COEFFICIENTS",
        link: "https://arxiv.org/pdf/2408.12660",
        status: "submitted",
        // PUT THE DATE + CITATION COUNT
        collaborators: ["GLENN BRUDA", "BRUCE FANG", "RAUL MARQUEZ", "STEVEN J. MILLER", "BENI PRAPASHTICA", "DAEYOUNG SON", "SAAD WAHEED", "JANINE WANG"]
    },
    SMALL2024Leslie: {
        name: "LESLIE POPULATION MODELS IN PREDATOR-PREY AND COMPETITIVE POPULATIONS: THEORY AND APPLICATIONS BY MACHINE LEARNING",
        link: "https://arxiv.org/pdf/2412.19831",
        status: "submitted",
        // PUT THE DATE + CITATION COUNT
        collaborators: ["STEVEN J. MILLER", "DAEYOUNG SON", "SAAD WAHEED", "JANINE WANG"]
    },
}

function papersbutton(){
    player.currentTabState = "papers";
}

function photosbutton(){
    player.currentTabState = "photos";
}

function otherbutton(){
    player.currentTabState = "other";
}

function returnToMain(){
    player.currentTabState = "main";
}

function capitalizeName(name) {
    return  name
            .split(/([, -]+)/)  // Split by spaces, commas, or semicolons while keeping the delimiters
            .map(word => {
                if (/[, -]+/.test(word)) {
                return word;  // Return delimiters as they are
                }
                // Capitalize the first letter and make the rest lowercase for non-delimiters
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join('');  // Join everything back into a single string
}

function nameClicked(name){ 
    let n = name.toLowerCase()
    let index = player.highlightedNames.indexOf(n);
    if (index != -1) {
        player.highlightedNames.splice(index, 1); // Remove if it exists
    } else {
        player.highlightedNames.push(n); // Add if it doesn't exist
    }
}

/*
function isMobileOLD(){
    return /Mobi|Android/i.test(navigator.userAgent); 
    // found online at https://www.restack.io/p/vue-js-detect-mobile-answer on 12/8/24
}
*/

function isMobile(){
    return window.innerWidth * window.innerHeight <= 500000 // 500,000 
    // found online at https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser on 7/2/25
}

function mobileRevealPersonalEmail(){
    let s = window.prompt('What is the smallest three digit prime number?', '2')
    if (s == "101") player.everSpelledName = true
}

function mobileRevealProfessionalEmail(){
    let s = window.prompt('What is the largest two digit prime number?', '2')
    if (s == "97") player.everSpelledSurname = true
}

var logKeyCode = false; // exists for debugging purposes

window.addEventListener('keydown', function(event) {
	code = event.keyCode
    /*
	if (player.toggleKeys) {
		if (code == 16) shiftDown = !shiftDown;
		if (code == 17) controlDown = !controlDown;
	} else {
		if (code == 16) shiftDown = true;
		if (code == 17) controlDown = true;
	}*/
	if (logKeyCode) console.log(code)
	if ((code >= 65 && code <= 90) || code == 32) {
		player.lastLettersPressed.push(getLetterFromNum(code))
		let l = player.lastLettersPressed.length
		if (l > 25) {
			player.lastLettersPressed = player.lastLettersPressed.slice(l-25,)
            l = 25
		}
        if (l >= 2) {
            let s =player.lastLettersPressed.slice(l-2,l).join()
            if (s == "c,v") player.currentTabState = "other"
        }
        if (l >= 4) {
            let s =player.lastLettersPressed.slice(l-4,l).join()
            if (s == "p,i,c,o") player.everSpelledName = true
            if (s == "m,a,i,n") player.currentTabState = "main"
            if (s == "a,l,e,c") player.everAlec = true
        }
        if (l >= 5) {
            let s =player.lastLettersPressed.slice(l-5,l).join()
            if (s == "o,t,h,e,r") player.currentTabState = "other"
            if (s == "c,l,e,a,r") player.highlightedNames = []
        }
        if (l >= 6) {
            let s = player.lastLettersPressed.slice(l-6,l).join()
            if (s == "g,i,l,m,a,n") player.everSpelledSurname = true
            if (s == "p,a,p,e,r,s") player.currentTabState = "papers"
            if (s == "p,h,o,t,o,s") player.currentTabState = "photos"
        }
	}
	//65 to 90 are a to z
}, false);

window.addEventListener('keyup', function(event) {
	if (player != undefined && player.toggleKeys) return 
	if (event.keyCode == 16) shiftDown = false;
	if (event.keyCode == 17) controlDown = false;
}, false);


function getLetterFromNum(x){
	return {
		32: " ",
		65: "a",
		66: "b",
		67: "c",
		68: "d",
		69: "e",
		70: "f",
		71: "g",
		72: "h",
		73: "i",
		74: "j",
		75: "k",
		76: "l",
		77: "m",
		78: "n",
		79: "o",
		80: "p",
		81: "q",
		82: "r",
		83: "s",
		84: "t",
		85: "u",
		86: "v",
		87: "w",
		88: "x",
		89: "y",
		90: "z",
	}[x]
}