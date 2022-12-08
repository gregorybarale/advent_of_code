export const convertDiagnosticReport = (
  report: ReadonlyArray<string>,
): ReadonlyArray<ReadonlyArray<number>> => {
  return report.map((bit) => bit.split("").map((s) => Number.parseInt(s)));
};

export const mergeBits =
  (a: ReadonlyArray<number>) =>
  (b: ReadonlyArray<number>): ReadonlyArray<number> => {
    if (a.length !== b.length) {
      throw new Error("[mergeBits] Bit length different");
    }
    const length = a.length;
    return Array.from({ length }).map((_, index) => {
      return a[index] + b[index];
    });
  };

export const mergeDiagnosticReport = (
  report: ReadonlyArray<ReadonlyArray<number>>,
): ReadonlyArray<number> => {
  return report.reduce(
    (acc, bit) => mergeBits(acc)(bit),
    Array.from<undefined, number>({ length: report[0].length }, () => 0),
  );
};

export const transformMergedReportToBit =
  (length: number, isMostCommon: boolean) =>
  (mergedReport: ReadonlyArray<number>) => {
    return mergedReport.map((n) => {
      if (isMostCommon) {
        return n > length / 2 ? 1 : 0;
      }
      return n < length / 2 ? 1 : 0;
    });
  };

export const filterReport =
  (isMostCommon: boolean, report: ReadonlyArray<ReadonlyArray<number>>) =>
  (index: number): ReadonlyArray<number> => {
    const mergedReport = mergeDiagnosticReport(report);
    let key: number;
    if (mergedReport[index] > report.length / 2) {
      key = isMostCommon ? 1 : 0;
    } else if (mergedReport[index] < report.length / 2) {
      key = isMostCommon ? 0 : 1;
    } else {
      key = isMostCommon ? 1 : 0;
    }
    const newReport = report.filter((bit) => bit[index] === key);
    return newReport.length === 1
      ? newReport[0]
      : filterReport(isMostCommon, newReport)(index + 1);
  };
