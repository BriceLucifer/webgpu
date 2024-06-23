use std::{process::exit};

#[derive(Debug)]
enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    SemiColon,
    Let,
}

#[derive(Debug)]
pub struct Token {
    value: String,
    tokentype: TokenType,
}

impl Token {
    fn new(value: String, tokentype: TokenType) -> Self {
        Self { value, tokentype }
    }
}

fn is_alpha(src: &str) -> bool {
    src.chars().all(char::is_alphabetic)
}

fn is_int(src: &str) -> bool {
    src.chars().all(char::is_numeric)
}

pub fn tokenize(source_code: &str) -> Vec<Token> {
    let mut tokens = Vec::new();

    for element in source_code.split_whitespace() {
        match element {
            "(" => tokens.push(Token::new(element.to_string(), TokenType::OpenParen)),
            ")" => tokens.push(Token::new(element.to_string(), TokenType::CloseParen)),
            "=" => tokens.push(Token::new(element.to_string(), TokenType::Equals)),
            "*" | "+" | "-" | "/" => tokens.push(Token::new(element.to_string(), TokenType::BinaryOperator)),
            ";" => tokens.push(Token::new(element.to_string(), TokenType::SemiColon)),
            _ => {
                if is_int(element) {
                    tokens.push(Token::new(element.to_string(), TokenType::Number));
                } else if is_alpha(element) {
                    if element == "let" {
                        tokens.push(Token::new(element.to_string(), TokenType::Let));
                    } else {
                        tokens.push(Token::new(element.to_string(), TokenType::Identifier));
                    }
                } else {
                    println!("Unrecognized character found in source: {}", element);
                    exit(1);
                }
            }
        }
    }
    tokens
}

