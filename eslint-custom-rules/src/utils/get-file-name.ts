import { TSESLint } from '@typescript-eslint/experimental-utils';
import path from 'path';

/**
 * Получение названия текущего файла (без пути и расширения)
 * @param context - контекст выполнения правила
 */
export function getFileName<TMessageIds extends string, Options extends unknown[]>(
  context: TSESLint.RuleContext<TMessageIds, Options>,
) {
  // const pathSeparator = path.sep;
  const fullFileName = path.toNamespacedPath(context.getFilename());
  const fileName = fullFileName.split('\\').pop()?.split('.')[0];
  return fileName;
}
