// Note : Ascii based encoded and decoded tokens

function tokenize(text){
  const tokens = [];
  let i = 0;
//   console.log(text.length);

  while (i < text.length) {
    let char = text[i];

    // Whitespace
    if (/\s/.test(char)) {
      let start = i;
      while (i < text.length && /\s/.test(text[i])) {
        i++;
      }
      let space = text.slice(start, i);
      tokens.push(space);
      continue;
    }

    // Numbers (integer or decimal)
    if (/\d/.test(char)) {
      let start = i;
      while (i < text.length && (/\d/.test(text[i]) || (text[i] === "." && /\d/.test(text[i + 1])))) {
        i++;
      }
      let num = text.slice(start, i);
      tokens.push(num);
      continue;
    }

    // Words (max 5 letter)
    if (/[a-zA-Z]/.test(char)) {
        let start = i;
        while (i < text.length && /[a-zA-Z]/.test(text[i])) {
            i++;
        }
        let word = text.slice(start, i);

        for (let j = 0; j < word.length; j += 5) {
            tokens.push(word.slice(j, j + 5));
        }

        continue;
    }

    // Special character
    tokens.push(char);
    i++;
  }

  return tokens;
}


function encodedTokenFun(tokens){
    const encodedToken = []
    tokens.forEach(str => {
        encodedToken.push(str.split("").map(ch => String(ch.charCodeAt(0)).padStart(3, "0")).join(""));
    });
    return encodedToken
    
}

function decodedTokenFun(tokens){
    const decodedToken = []
    tokens.forEach((ele) =>{
        let result = "";
        for (let i = 0; i < ele.length; i += 3) {
            result += String.fromCharCode(parseInt(ele.slice(i, i + 3), 10));
        }
        decodedToken.push(result)
    })
    return decodedToken
}


// Note : Add encoded element array to console.log the decoded tokens
// console.log(decodedTokenFun([
//     "116069115116",
//     "032032032032",
//     "116101115116",
//     "049050051049050051",
//     "032",
//     "049",
//     "032",
//     "102097115097100",
//     "102097115100102",
//     "115097100102115",
//     "100097102115097",
//     "100102097115102"
//   ]))


const tokenGenerator = (req,res) => {
    try {
        const input = req.body.input
        if (typeof input !== "string") {
            return res.status(400).json({
                error: "Input must be a string"
            });
        }
        const tokens = tokenize(input)
        const encodedTokens = encodedTokenFun(tokens)
    
        res.status(200).json({
            tokens : tokens,
            encodedTokens : encodedTokens
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error while generating tokens"
        });
    }
}

module.exports = tokenGenerator