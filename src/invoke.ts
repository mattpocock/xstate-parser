import * as t from '@babel/types';
import { DeclarationType } from '.';
import { INLINE_IMPLEMENTATION_TYPE } from './constants';
import { createParser } from './createParser';
import { maybeIdentifierTo } from './identifiers';
import { BooleanLiteral, StringLiteral } from './scalars';
import { MaybeTransitionArray } from './transitions';
import { maybeTsAsExpression } from './tsAsExpression';
import { unionType } from './unionType';
import {
  isFunctionOrArrowFunctionExpression,
  maybeArrayOf,
  objectTypeWithKnownKeys
} from './utils';

interface InvokeNode {
  node: t.Node;
  value: string | (() => Promise<void>);
  declarationType: DeclarationType;
}

const InvokeSrcFunctionExpression = maybeTsAsExpression(
  maybeIdentifierTo(
    createParser({
      babelMatcher: isFunctionOrArrowFunctionExpression,
      parseNode: (node): InvokeNode => {
        const value = async function src() {};

        value.toJSON = () => INLINE_IMPLEMENTATION_TYPE;
        return {
          value,
          node,
          declarationType: 'inline'
        };
      }
    })
  )
);

const InvokeSrcNode = createParser({
  babelMatcher: t.isNode,
  parseNode: (node): InvokeNode => ({
    value: INLINE_IMPLEMENTATION_TYPE,
    node,
    declarationType: 'unknown'
  })
});

const InvokeSrcStringLiteral = createParser({
  babelMatcher: t.isStringLiteral,
  parseNode: (node): InvokeNode => ({
    value: node.value,
    node,
    declarationType: 'named'
  })
});

const InvokeSrcIdentifier = createParser({
  babelMatcher: t.isIdentifier,
  parseNode: (node): InvokeNode => ({
    value: INLINE_IMPLEMENTATION_TYPE,
    node,
    declarationType: 'identifier'
  })
});

const InvokeSrc = unionType([
  InvokeSrcStringLiteral,
  InvokeSrcFunctionExpression,
  InvokeSrcIdentifier,
  InvokeSrcNode
]);

const InvokeConfigObject = objectTypeWithKnownKeys({
  id: StringLiteral,
  src: InvokeSrc,
  onDone: MaybeTransitionArray,
  onError: MaybeTransitionArray,
  autoForward: BooleanLiteral,
  forward: BooleanLiteral
});

export const Invoke = maybeArrayOf(InvokeConfigObject);
