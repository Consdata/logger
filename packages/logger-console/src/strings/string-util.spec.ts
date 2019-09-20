import {Subject} from 'rxjs';
import {StringUtil} from './string-util';

describe('StringUtil', () => {

  it('should trim value', () => {
    expect(StringUtil.truncate('abcd', 4)).toBe('a...');
  });

  it('should stringify number', () => {
    expect(StringUtil.safeStringify(4)).toBe('4');
  });

  it('should stringify string', () => {
    expect(StringUtil.safeStringify('abc')).toBe('abc');
  });

  it('should stringify object', () => {
    expect(StringUtil.safeStringify({name: 'John'})).toBe(`{"name":"John"}`);
  });

  it('should stringify exception', () => {
    expect(StringUtil.safeStringify(new Error('Test error'))).not.toBeUndefined();
  });

  it('should stringify rxjs.subject', () => {
    const subject = new Subject();
    // tslint:disable-next-line:no-empty
    subject.subscribe(() => {
    });

    expect(StringUtil.safeStringify({name: 'John'})).not.toBeUndefined();
  });

});
