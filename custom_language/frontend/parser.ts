import { BinaryExpr, Expr, Identifier, NumericLiteral, Program, Stmt, } from "./ast.ts";
import { Token,tokenize,TokenType } from "./lexer.ts";


export default class Parser{
    private tokens: Token[] = [];

    private not_eof():boolean{
        return this.tokens[0].type != TokenType.EOF;
    }

    // return the currently available token
    private at(){
        return this.tokens[0] as Token;
    }

    // Returns the previous token and then advances the tokens array to the next value
    private eat(){
        const prev = this.tokens.shift() as Token;
        return prev
    }

    private expect(type: TokenType, err:any){
        const prev = this.tokens.shift();
        if( !prev || prev.type != type){
            console.error("Parser Error:\n",err,prev," - Expecting: ",type);
            Deno.exit(1);
        }

        return prev;
    }

    public produceAST(sourceCode: string):Program{
        this.tokens = tokenize(sourceCode);
        const program: Program = {
            kind: "Program",
            body: [],
        };

        while(this.not_eof()){
            program.body.push(this.parse_stmt());
        }

        return program;
    }

    private parse_stmt():Stmt{
        return this.parse_expr();
    }

    private parse_expr():Expr{
        return this.parse_additive_expr();
    }

    private parse_additive_expr(): Expr {
        let left = this.parse_multiplicitave_expr();
    
        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat().value;
            const right = this.parse_multiplicitave_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr;
        }
    
        return left;
    }

    private parse_multiplicitave_expr(): Expr {
        let left = this.parse_primary_expr();
    
        while (
            this.at().value == "/" || this.at().value == "*" || this.at().value == "%"
        ) {
            const operator = this.eat().value;
            const right = this.parse_primary_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr;
        }
    
        return left;
    }

    private parse_primary_expr(): Expr {
        const tk = this.at().type;

        // Determine which token we are currently at and return literal value
        switch (tk) {
            // User defined values.
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;

            // Constants and Numeric Constants
            case TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                } as NumericLiteral;

            // Grouping Expressions
            case TokenType.OpenParen: {
                this.eat(); // eat the opening paren
                const value = this.parse_expr();
                this.expect(
                    TokenType.Closeparen,
                    "Unexpected token found inside parenthesised expression. Expected closing parenthesis.",
                ); // closing paren
                return value;
            }

            // Unidentified Tokens and Invalid Code Reached
            default:
                console.error("Unexpected token found during parsing!", this.at());
                Deno.exit(1);
        }
    }
}