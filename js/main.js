var player = {
    currentTabState: "main",
    clickcount: 0,
    highlightedNames: [],
}


var PAPERS = {
    SMALL2024LowLying: {
        name: "ON THE DENSITY OF LOW LYING ZEROS OF A LARGE FAMILY OF AUTOMORPHIC L-FUNCTIONS",
        link: "https://arxiv.org/pdf/2408.09050",
        status: "submitted",
        collaborators: ["TIMOTHY CHEEK", "KAREEM JABER", "STEVEN J. MILLER", "MARIE-HELENE TOME"]
    },
    SMALL2024Bias: {
        name: "NUMERICAL INVESTIGATION OF LOWER ORDER BIASES IN MOMENT EXPANSIONS OF ONE PARAMETER FAMILIES OF ELLIPTIC CURVES",
        link: "https://arxiv.org/pdf/2409.18224",
        status: "on arXiv",
        collaborators: ["TIMOTHY CHEEK", "KAREEM JABER", "STEVEN J. MILLER", "VISMAY SHARAN", "MARIE-HELENE TOME"]
    },
    SMALL2024Erdos: {
        name: "CONGRUENCE CLASSES OF SIMPLEX STRUCTURES IN FINITE FIELD VECTOR SPACES",
        link: "https://arxiv.org/pdf/2408.07912",
        status: "submitted",
        collaborators: ["TIMOTHY CHEEK", "JOSEPH COOPER", "ALEX IOSEVICH", "KAREEM JABER", "EYVINDUR PALSSON", "VISMAY SHARAN", "JENNA SHUFFELTON", " MARIE-HELENE TOME"]
    },
    SMALL2024Matrix: {
        name: "STABILITY OF MATRIX RECURRENCE RELATIONS",
        link: "https://arxiv.org/pdf/2408.12660",
        status: "submitted",
        collaborators: ["GLENN BRUDA", "BRUCE FANG", "RAUL MARQUEZ", "STEVEN J. MILLER", "BENI PRAPASHTICA", "DAEYOUNG SON", "SAAD WAHEED", "JANINE WANG"]
    }
}

player.papers_button_text = "Papers";

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
    player.papers_button_text = "Papers";
}

function capitalizeName(name) {
    return name
      .split(/([,; -]+)/)  // Split by spaces, commas, or semicolons while keeping the delimiters
      .map(word => {
        if (/[,; -]+/.test(word)) {
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

