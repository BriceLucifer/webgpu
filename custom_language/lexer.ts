// let x = 45 ;
// [ LetToken Identifier EqualToken numberToken BinaryOperator SemiColon]

export enum TokenType{
    Number,
    Identifier,
    Equals,
    OpenParen,Closeparen,
    BinaryOperator,
    SemiColon,
    Let,
}

// 字典
const KEYWORDS:Record<string,TokenType> = {
    "let" :TokenType.Let, 
}

// token 定义
export interface Token{
    value:string;
    type:TokenType;
}

// 构造Token
function token(value = "", type: TokenType): Token{
    return {value,type};
}

// 字母判断
function isalpha(src:string){
    return src.toUpperCase() != src.toLowerCase();
}

// 整数判断
function isint(src:string){
    const c = src.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0),'9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

// 跳过
function isskippable(src:string){
    return src == ' ' || src == '\n' || src == '\t';
}

// 识别
export function tokenize(sourceCode:string):Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");

    while(src.length > 0){
        if(src[0] == "("){
            tokens.push(token(src.shift(),TokenType.OpenParen));
        }else if(src[0] == ")"){
            tokens.push(token(src.shift(),TokenType.Closeparen));
        }else if(src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/"){
            tokens.push(token(src.shift(),TokenType.BinaryOperator));
        }else if(src[0] == "=" ){
            tokens.push(token(src.shift(),TokenType.Equals));
        }else if(src[0] == ";"){
            tokens.push(token(src.shift(),TokenType.SemiColon));
        }
        // 一个一个字符识别
        else{
            // handle multicharacter token
            
            // build number token
            if(isint(src[0])){
                let num = "";
                while(src.length > 0 && isint(src[0])){
                    num += src.shift();
                }

                tokens.push(token(num,TokenType.Number));

            }else if(isalpha(src[0])){
                let ident = ""; // foo let
                while (src.length > 0 && isalpha(src[0])){
                    ident += src.shift();
                }

                // check for reserved keywords
                const reserved = KEYWORDS[ident];
                // 如果是let 就是关键字 如果不是let就是变量
                if(reserved){
                    tokens.push(token(ident,reserved));
                }else{
                    tokens.push(token(ident,TokenType.Identifier));
                }

            }else if(isskippable(src[0])){
                src.shift(); // skip the word
            }else{
                console.error(
					"Unreconized character found in source: ",
					src[0].charCodeAt(0),
					src[0]
				);
				Deno.exit(1);
            }
        }
    }

    return tokens;
}

const source = await Deno.readTextFile("./test.txt");
for (const token of tokenize(source)){
    console.log(token);
}