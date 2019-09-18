import {StringUtil} from './string-util';

describe('StringUtil', () => {

    it('should trim value', () => {
        expect(StringUtil.truncate('abcd', 4)).toBe('a...');
    });

});
