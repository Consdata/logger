import * as Lint from 'tslint';
import {Replacement, WalkContext} from 'tslint';
import * as ts from 'typescript';
import {SyntaxKind} from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {

  private static readonly AFFECTED_TYPES: string[] = ['Observable'];
  private static readonly SUFFIX: string = '$';
  private static readonly ERROR_MESSAGE: string = 'Finnish notation required';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, this.walk);
  }

  private walk: (ctx: WalkContext<void>) => void = (ctx: Lint.WalkContext<void>) => {
    const validateProperties = (node: ts.Node): void => {
      if (this.isInvalid(node)) {
        this.createFailure(node, ctx);
      }
      ts.forEachChild(node, validateProperties);
    };

    ts.forEachChild(ctx.sourceFile, validateProperties);
  };

  private isInvalid(node: ts.Node): boolean {
    return this.isIdentifierOfPropertyDeclaration(node) &&
        this.isReactiveType(node) &&
        this.propertyEndsWithDollarSign(this.getPropertyNameNode(node));
  }

  private createFailure(node: ts.Node, ctx: WalkContext<void>): void {
    const propertyNameNode = this.getPropertyNameNode(node);
    const fix = Replacement.appendText(propertyNameNode.getEnd(), Rule.SUFFIX);
    ctx.addFailureAtNode(propertyNameNode, Rule.ERROR_MESSAGE, fix);
  }

  private isIdentifierOfPropertyDeclaration(node: ts.Node): boolean {
    return node.kind === SyntaxKind.Identifier &&
        node.parent.kind === SyntaxKind.TypeReference &&
        node.parent.parent.kind === SyntaxKind.PropertyDeclaration;
  }

  private getPropertyNameNode(node: ts.Node): ts.Node {
    return node.parent.parent.getChildren().find(child => child.kind === SyntaxKind.Identifier);
  }

  private propertyEndsWithDollarSign(propertyNameNode: ts.Node): boolean {
    return !propertyNameNode.getText().endsWith(Rule.SUFFIX);
  }

  private isReactiveType(node: ts.Node): boolean {
    return Rule.AFFECTED_TYPES.indexOf(node.getText()) !== -1;
  }

}
