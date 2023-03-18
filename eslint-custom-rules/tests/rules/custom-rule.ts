import { TSESLint } from '@typescript-eslint/experimental-utils';
import { ValidTestCase, InvalidTestCase } from '@typescript-eslint/utils/dist/ts-eslint/RuleTester';
import rule, { MessageIds, RULE_NAME } from '../../src/rules/custom-rule';

const ruleTester: TSESLint.RuleTester = new TSESLint.RuleTester({
	parser: require.resolve('@typescript-eslint/parser'),
});

const validCodeWithUrlLiteral = `
export const getSmthEndpoint = (providesTags = [GET_SMTH_TAG]) => (builder: EndpointBuilder<any, any, any>) => ({
  getSmth: builder.query<void, SendRafpRequestParams>({
    providesTags,
    query: (args) => ({ url: 'get_smth' }),
  }),
});
`;

const validStatements: ValidTestCase<unknown[]>[] = [
	{
		filename: '\\directory\\test-file',
		code: validCodeWithUrlLiteral,
	},
	{
		filename: '\\directory\\test-file',
		code: validCodeWithUrlLiteral,
		options: [
			{
				directory: ['directory1'],
			},
		],
	},
];

const invalidStatements: Array<InvalidTestCase<MessageIds, unknown[]>> = [
	{
		filename: '\\directory\\test-file',
		code: 'const fileName = 5;',
		errors: [
			{ messageId: 'testMessage' },
		],
	},
];

ruleTester.run(RULE_NAME, rule, {
	valid: validStatements,
	invalid: invalidStatements,
});
