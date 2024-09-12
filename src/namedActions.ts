import {
  after,
  cancel,
  done,
  escalate,
  log,
  pure,
  raise,
  respond,
  sendParent,
  sendUpdate,
  start,
  stop
} from 'xstate/lib/actions';
import type { ActionNode } from './actions';
import { AnyNode, NumericLiteral, StringLiteral } from './scalars';
import { namedFunctionCall } from './utils';
import * as t from '@babel/types';
import { unionType } from './unionType';
import { wrapParserResult } from './wrapParserResult';

export const AfterAction = wrapParserResult(
  namedFunctionCall(
    'after',
    unionType<{ node: t.Node; value: number | string }>([
      StringLiteral,
      NumericLiteral
    ])
  ),
  (result): ActionNode => {
    return {
      node: result.node,
      action: after(result.argument1Result?.value || ''),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const CancelAction = wrapParserResult(
  namedFunctionCall('cancel', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: cancel(''),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const DoneAction = wrapParserResult(
  namedFunctionCall('done', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: done(''),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const EscalateAction = wrapParserResult(
  namedFunctionCall('escalate', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: escalate(''),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const LogAction = wrapParserResult(
  namedFunctionCall('log', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: log(),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const PureAction = wrapParserResult(
  namedFunctionCall('pure', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: pure(() => []),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const RaiseAction = wrapParserResult(
  namedFunctionCall('raise', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: raise(''),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const RespondAction = wrapParserResult(
  namedFunctionCall('respond', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: respond(''),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const SendParentAction = wrapParserResult(
  namedFunctionCall('sendParent', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: sendParent(''),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const SendUpdateAction = wrapParserResult(
  namedFunctionCall('sendUpdate', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: sendUpdate(),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const StartAction = wrapParserResult(
  namedFunctionCall('start', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: start(''),
      name: '',
      declarationType: 'inline'
    };
  }
);

export const StopAction = wrapParserResult(
  namedFunctionCall('stop', AnyNode),
  (result): ActionNode => {
    return {
      node: result.node,
      action: stop(''),
      name: '',
      declarationType: 'inline'
    };
  }
);
