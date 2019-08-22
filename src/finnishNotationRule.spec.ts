import {Configuration, Linter} from 'tslint';

const ruleName = 'finnish-notation';

export const helper = ({src, rule}) => {
  const linter = new Linter({fix: false});
  linter.lint('', src, Configuration.parseConfigFile({
    rules: {[rule]: [true]},
    rulesDirectory: 'src'
  }));
  return linter.getResult();
};


describe('FinnishNotationRule', () => {

  it(`should mark not suffixed observable property`, () => {
    const src = `
        export class TestClass {
          test: Observable<any> = new Observable();
    }`;
    const failures = helper({src, rule: ruleName}).failures;

    expect(failures.length).toBe(1);
  });

  it(`should not mark suffixed observable property`, () => {
    const src = `
        export class TestClass {
          test$: Observable<any> = new Observable();
    }`;
    const failures = helper({src, rule: ruleName}).failures;

    expect(failures.length).toBe(0);
  });

  it(`should not mark not suffixed nonobservable property`, () => {
    const src = `
        export class TestClass {
          test: Object = new Object();
    }`;
    const failures = helper({src, rule: ruleName}).failures;

    expect(failures.length).toBe(0);
  });

});
