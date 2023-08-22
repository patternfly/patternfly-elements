import ts from 'typescript';

const fileNameLowerCaseRegExp = /[^\u0130\u0131\u00DFa-z0-9\\/:-_. ]+/g;

function createGetCanonicalFileName(useCaseSensitiveFileNames: boolean) {
  return useCaseSensitiveFileNames ? (x: string) => x : function toFileNameLowerCase(x: string) {
    return fileNameLowerCaseRegExp.test(x) ?
        x.replace(fileNameLowerCaseRegExp, x => x.toLowerCase())
        : x;
  };
}

export function formatDiagnostics(diagnostics: readonly ts.Diagnostic[]): string {
  return ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    getNewLine: () => ts.sys.newLine,
    getCanonicalFileName: createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames),
  });
}
