import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import { convertDiagnosticReport, mergeDiagnosticReport, transformMergedReportToBit, filterReport } from './utils.ts'

export const fn1 = ({ input }: IAoCInput) => {
    const report = convertDiagnosticReport(input);
    const mergedReport = mergeDiagnosticReport(report);
    const gammaRate = transformMergedReportToBit(report.length, true)(mergedReport).join('');
    const epsilonRate = transformMergedReportToBit(report.length, false)(mergedReport).join('');
    return Number.parseInt(gammaRate, 2) * Number.parseInt(epsilonRate, 2);
};
export const fn2 = ({ input }: IAoCInput) => {
    const report = convertDiagnosticReport(input);
    const oxygenGeneratorRating = filterReport(true, report)(0).join('');
    const co2ScrubberRating = filterReport(false, report)(0).join('');
    return Number.parseInt(oxygenGeneratorRating, 2) * Number.parseInt(co2ScrubberRating, 2);
};
