import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { MachineConfig } from 'xstate';
import { MachineCallExpression } from './machineCallExpression';
import { MachineParseResult } from './MachineParseResult';
import { toMachineConfig } from './toMachineConfig';
import { ParseResult } from './types';

export const parseMachinesFromFile = (fileContents: string): ParseResult => {
  if (
    !fileContents.includes('createMachine') &&
    !fileContents.includes('Machine')
  ) {
    return {
      machines: [],
      comments: [],
      file: undefined
    };
  }

  const parseResult = parser.parse(fileContents, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'jsx',
      ['decorators', { decoratorsBeforeExport: false }]
    ]
  });

  let result: ParseResult = {
    machines: [],
    comments: [],
    file: parseResult
  };

  parseResult.comments?.forEach((comment) => {
    if (comment.value.includes('xstate-ignore-next-line')) {
      result.comments.push({
        node: comment,
        type: 'xstate-ignore-next-line'
      });
    } else if (comment.value.includes('@xstate-layout')) {
      result.comments.push({
        node: comment,
        type: 'xstate-layout'
      });
    }
  });

  traverse(parseResult as any, {
    CallExpression(path) {
      const ast = MachineCallExpression.parse(path.node as any, {
        file: parseResult
      });
      if (ast) {
        result.machines.push(
          new MachineParseResult({
            ast,
            fileComments: result.comments,
            scope: path.scope
          })
        );
      }
    }
  });

  return result;
};
