import {LogEntry, LogLevel} from '@consdata/logger-api';
import {ConsoleMessageBuilder} from './console-message-builder';

describe('ConsoleMessageBuilder', () => {

  const builder = new ConsoleMessageBuilder();
  const entry = (message: string = '', params: any[] = []) => ({
    context: null,
    date: 'today',
    level: LogLevel.INFO,
    logger: 'test-logger',
    message,
    params,
    timestamp: 100,
  } as LogEntry);

  it('should build message', () => {
    const message = builder.build(entry('Sample message'));

    expect(message).toContain('Sample message');
  });

  it('should build message with params', () => {
    const message = builder.build(entry('{}', ['Ala']));

    expect(message).toContain('Ala');
  });

  it('should build message with null param', () => {
    const message = builder.build(entry('{}', [null]));

    expect(message).toContain('null');
  });

  it('should build message with undefined param', () => {
    const message = builder.build(entry('{}', [undefined]));

    expect(message).toContain('undefined');
  });

  it('should build message with json params', () => {
    const param = {
      name: 'Ala',
    };
    const message = builder.build(entry('{}', [param]));

    expect(message).toContain(`{"name":"Ala"}`);
  });

  it('should build message for circural referenced params', () => {
    const parent = {
      child: null,
      id: 'parent',
    };
    const child = {
      id: 'child',
      parent: null,
    };
    parent.child = child;
    child.parent = parent;

    const message = builder.build(entry('{}', [child]));

    expect(message).toContain(`{"id":"child","parent":{"child":"[Circular ~]","id":"parent"}}`);
  });

});
