const isReportSafe = function(report:Array<number>):boolean {
    let prev:number;
    let increasing:boolean;
    let pos = '^';
    for (let i = 0; i < report.length; i++) {
        const current = report[i];
        pos = '-'+pos;
        
        if (!isNaN(prev)) {
            // check difference is within 1-3
            // no items with diff greater than 3 will make it
            // no equal consecutive numbers will make it
            const difference = Math.abs(prev - current);
            if ( difference > 3 || 1 > difference ) {
                return false;
            }

            // check if increasing
            const localIncreasing = prev < current;
            if ( typeof increasing === "undefined" ) {
                increasing = localIncreasing
            } else if (increasing != localIncreasing) {
                return false;
            }

            // if last one made it this far then it should be good
            if (i+1 === report.length ) {
                return true;
            }
        }
        prev = current;
    }

    return true;
}

const main = async (file: string) => {
    const raw = await Deno.readTextFile(file);
    const lines = raw.split('\n');

    let countSafeReports = 0;
    let countAltSafeReports = 0;

    lines.forEach((line)=>{
        const report = line.split(" ").map((v)=>parseInt(v));

        if (isReportSafe(report)) {
            countSafeReports += 1;
        } else {
            let localSafety = false;
            report.forEach((v,i,a)=>{
                const tempArray = a.toSpliced(i,1);
                const tempEval = isReportSafe(tempArray);
                if (tempEval) {
                    localSafety = true;
                }
            });
            if (localSafety) countAltSafeReports += 1;
        }

    });

    return [countSafeReports, countAltSafeReports];
}

const result = await main("./2/sample.txt");
console.log(result);
