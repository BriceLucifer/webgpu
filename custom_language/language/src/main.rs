mod Lexer;
use Lexer::*;

fn main() {
    let test = "let x = 45 + 13 ; \n \t";
    let tokenizer = tokenize(test);
    for i in tokenizer{
        println!("{:?}",i);
    }
}
