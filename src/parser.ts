import autoBind from "auto-bind";
import { ParseOptions, parse, CssNode, generate, GenerateOptions } from "css-tree";
import { Root } from "postcss";

import pipeThroughAllPatches from "./patches";

class Parser {
    private readonly input: string;
    private readonly opts?: ParseOptions;

    private ast?: CssNode;

    constructor(input: string, opts?: ParseOptions) {
        this.input = input;
        this.opts = opts;
        autoBind(this);
    }

    /**
     * Parsing input css string into css-tree ast
     * @returns {this}
     */
    parse(): Parser {
        this.ast = parse(this.input, this.opts);
        pipeThroughAllPatches(this.ast);
        return this;
    }

    /**
     * Get parsed ast in css-tree representation
     * @returns Css-tree ast
     */
    getAst(): CssNode | undefined {
        return this.ast;
    }

    /**
     * Transform css-tree ast into postcss style equivalent
     * @returns Postcss ast
     */
    toPostcssAst(): Root {
        throw Error("Unimplemented");
    }

    /**
     * Serilizing css-tree ast to string
     * @param opts css-tree generate options
     * @returns { string | undefined } string if we have ast, otherwise it's undefined
     */
    toCssString(opts?: GenerateOptions): string | undefined {
        if (!this.ast) {
            return undefined;
        }

        return generate(this.ast, opts);
    }
}

export default Parser;
