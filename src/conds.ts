import * as t from '@babel/types';
import { Condition } from 'xstate';
import { DeclarationType } from '.';
import { INLINE_IMPLEMENTATION_TYPE } from './constants';
import { createParser } from './createParser';
import { unionType } from './unionType';
import { isFunctionOrArrowFunctionExpression } from './utils';

export interface CondNode {
  node: t.Node;
  name: string;
  cond: Condition<any, any>;
  declarationType: DeclarationType;
}

const CondAsFunctionExpression = createParser({
  babelMatcher: isFunctionOrArrowFunctionExpression,
  parseNode: (node): CondNode => {
    return {
      node,
      name: '',
      cond: () => {
        return false;
      },
      declarationType: 'inline'
    };
  }
});

const CondAsStringLiteral = createParser({
  babelMatcher: t.isStringLiteral,
  parseNode: (node): CondNode => {
    return {
      node,
      name: node.value,
      cond: node.value,
      declarationType: 'named'
    };
  }
});

const CondAsNode = createParser({
  babelMatcher: t.isNode,
  parseNode: (node): CondNode => {
    return {
      node,
      name: '',
      cond: INLINE_IMPLEMENTATION_TYPE,
      declarationType: 'unknown'
    };
  }
});

const CondAsIdentifier = createParser({
  babelMatcher: t.isIdentifier,
  parseNode: (node): CondNode => {
    return {
      node,
      name: '',
      cond: INLINE_IMPLEMENTATION_TYPE,
      declarationType: 'identifier'
    };
  }
});

export const Cond = unionType([
  CondAsFunctionExpression,
  CondAsStringLiteral,
  CondAsIdentifier,
  CondAsNode
]);
