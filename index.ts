import type enTranslations from "./messages/en.json";
import type skTranslations from "./messages/sk.json";

type NestedKeyPaths<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${NestedKeyPaths<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

type HasAllKeys<Source, Target> =
  NestedKeyPaths<Source> extends NestedKeyPaths<Target> ? true : false;

type MissingKeys<Source, Target> = Exclude<
  NestedKeyPaths<Source>,
  NestedKeyPaths<Target>
>;

type SkTranslationCompleteness =
  HasAllKeys<typeof enTranslations, typeof skTranslations> extends true
    ? true
    : `Missing translation keys in Slovak: ${MissingKeys<typeof enTranslations, typeof skTranslations>}`;

const _assertSkComplete: SkTranslationCompleteness = true;
void _assertSkComplete;

type EnTranslationCompleteness =
  HasAllKeys<typeof skTranslations, typeof enTranslations> extends true
    ? true
    : `Missing translation keys in English: ${MissingKeys<typeof skTranslations, typeof enTranslations>}`;

const _assertEnComplete: EnTranslationCompleteness = true;
void _assertEnComplete;
