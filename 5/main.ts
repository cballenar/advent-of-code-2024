const main = async (file: string) => {
    const raw = await Deno.readTextFile(file);
    const cutAt = raw.match(new RegExp('\n\n'));
    
    const rulesText = raw.slice(0,cutAt?.index);
    const updateText = raw.slice(cutAt?.index+2);
    const rulesLines = rulesText.split('\n').map((v)=>v.split("|"));
    const updateLines = updateText.split('\n').map((v)=>v.split(","));

    // start middle number sum
    let total = 0;

    const invalidLines:Array<Array<string>> = [];

    // for each updateLine
    updateLines.forEach((line,iL)=>{
        // set line validity
        let valid = true;
        // because we need to check for "broken" rules
        // for each pageNumber
        line.reverse().forEach((pageNumber,iP,aP)=>{
            
            const remainderLine = aP.slice(iP+1);
            // console.log(aP, remainderLine);
            // for each ruleLine[0] == pageNumber
            rulesLines.filter((rule)=>rule[0]===pageNumber).forEach((rule)=>{
                // if already determined invalid, skip
                if (!valid) return;
                // check if ruleLine[1] is in remainder of updateLine
                // if so, line may be valid
                // else, line is NOT valid
                if (remainderLine.includes(rule[1])) valid = false;
                // console.log(rule[0], rule[1],valid);
            })
            
        })
        // if line is valid, add up middle number
        if (valid) {
            total += parseInt(updateLines[iL][(updateLines[iL].length-1)/2]);
            // console.log(`Total so far: ${total}. Calculated from index: ${(updateLines[iL].length-1)/2}`);
        } else {
            invalidLines.push(updateLines[iL]);
        }        
    });

    let total2 = 0;

    // for each updateLine
    //! this should run multiple times.
    invalidLines.forEach((line,iL)=>{
        // because we need to check for "broken" rules
        // for each pageNumber
        line.forEach((pageNumber,iP,aP)=>{
            
            const remainderLine = aP.slice(iP+1);
            // for each ruleLine[0] == pageNumber
            rulesLines.filter((rule)=>rule[0]===pageNumber).forEach((rule)=>{
                // check if ruleLine[1] is in remainder of updateLine
                // if so, line may be valid
                // else, line is NOT valid
                if (remainderLine.includes(rule[1])) {
                    const actualPageNumberIndex = invalidLines[iL].indexOf(pageNumber);
                    const prevPageNumberIndex = invalidLines[iL].indexOf(rule[1]);
                    const wrongNumber = invalidLines[iL].splice(prevPageNumberIndex, 1);

                    invalidLines[iL].splice(actualPageNumberIndex, 0, wrongNumber[0]);
                }
            })
            
        })
        // if line is valid, add up middle number
        total2 += parseInt(invalidLines[iL][(invalidLines[iL].length-1)/2]);
        console.log(`Total so far: ${total2}. Calculated from index: ${(invalidLines[iL].length-1)/2}`);
    });

    return [total, total2];
}

const result = await main("./5/input.txt");
console.log(result);
