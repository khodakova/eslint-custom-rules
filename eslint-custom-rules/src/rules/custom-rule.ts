import { TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
import { createEslintRule } from '../utils/create-eslint-rule';
import { getFileName } from '../utils/get-file-name';
import { isNecessaryDirectory } from '../utils/is-necessary-directory';

export const RULE_NAME = 'custom-rule';
export type MessageIds = 'testMessage';
export type Options = [
  { directory: string },
];

export default createEslintRule<Options, MessageIds>({
	name: RULE_NAME,
	meta: {
		docs: {
			description: 'test',
			recommended: false,
		},
		messages: {
			testMessage: 'Тестовое правило ',
		},
		type: 'problem',
		schema: [{
			type: 'object',
			properties: {
				directory: {
					type: 'string',
				},
			},
		}],
	},
	defaultOptions: [
		{ directory: 'src' },
	],
	create: (context: Readonly<TSESLint.RuleContext<MessageIds, Options>>) => {
		const directory = context.options[0]?.directory || '';
		console.log('directory', directory);
		const fileName = getFileName(context);
		console.log('fileName', fileName);
		const hasNecessaryDirectory = isNecessaryDirectory(context, directory);
		console.log('hasNecessaryDirectory', hasNecessaryDirectory);

		if (!fileName) {
			return {};
		}

		if (!hasNecessaryDirectory) {
			return {};
		}

		return {

			VariableDeclaration(node: TSESTree.VariableDeclaration) {
				context.report({
					node,
					messageId: 'testMessage',
				});
			},

		};
	},
});
