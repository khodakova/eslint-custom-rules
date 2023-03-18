import { TSESLint } from '@typescript-eslint/experimental-utils';
import path from 'path';

/**
 * Проверка необходимости парсинга правила в текущей директории
 * @param context - контекст выполнения правила
 * @param directory - директория для обработки
 */
export function isNecessaryDirectory<TMessageIds extends string, Options extends unknown[]>(
  context: TSESLint.RuleContext<TMessageIds, Options>,
  directory: string,
) {
  const fileName = path.toNamespacedPath(context.getFilename());
  return fileName.split('\\').includes(directory);
}
