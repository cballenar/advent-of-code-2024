const solveForPuzzle1 = (wordmap:Array<Array<string>>) => {
    const firstChar = "X";
    const targetChars = Array.from("MAS");

    // assume input is a square
    const size = wordmap.length;

    // assume input is a square
    const minPad = targetChars.length;
    const maxPad = size-minPad;

    const readingWays = [
        { minX: 0,      minY: 0,        maxX: maxPad,   maxY: size   },
        { minX: 0,      minY: 0,        maxX: maxPad,   maxY: maxPad },
        { minX: 0,      minY: 0,        maxX: size,     maxY: maxPad },
        { minX: minPad, minY: 0,        maxX: size,     maxY: maxPad },
        { minX: minPad, minY: 0,        maxX: size,     maxY: size   },
        { minX: minPad, minY: minPad,   maxX: size,     maxY: size   },
        { minX: 0,      minY: minPad,   maxX: size,     maxY: size   },
        { minX: 0,      minY: minPad,   maxX: maxPad,   maxY: size   }
    ];

    const findReadingWays = (x:number, y:number ) => {
        const validWays:Array<number> = [];
        readingWays.forEach((v,i)=>{
            if (v.minX <= x && v.minY <= y && v.maxX > x && v.maxY > y) {
                validWays.push(i);
            }
        });
        return validWays;
    };

    let xmasCount = 0;

    const allWays = wordmap.map((line,y)=>{
        return line.map((char,x)=>{
            return char === firstChar ? {char:char, x: x, y: y, ways:findReadingWays(x,y)} : null;
        });
    });

    allWays.forEach((line, y)=>{
        line.forEach((point, x)=>{
            if (point !== null) {
                point.ways.forEach((way, j)=>{
                    let good = true;
                    targetChars.forEach((char, i)=>{
                        const shift = i+1;
                        if (
                            good &&
                            way === 0 && wordmap[y][x+shift]       === char ||
                            way === 1 && wordmap[y+shift][x+shift] === char ||
                            way === 2 && wordmap[y+shift][x]       === char ||
                            way === 3 && wordmap[y+shift][x-shift] === char ||
                            way === 4 && wordmap[y][x-shift]       === char ||
                            way === 5 && wordmap[y-shift][x-shift] === char ||
                            way === 6 && wordmap[y-shift][x]       === char ||
                            way === 7 && wordmap[y-shift][x+shift] === char
                        ) {
                            // no action needed.
                        } else {
                            good = false;
                        }
                        return;
                    }); 

                    if (good) xmasCount += 1;
                });
            }
        })
    });

    return xmasCount;
}

const solveForPuzzle2 = (wordmap:Array<Array<string>>) => {
    const leadChar = "A";
    // assume input is a square
    const size = wordmap.length;

    // assume input is a square
    const minPad = 1;
    const maxPad = size-minPad;

    console.log(size, minPad, maxPad);

    let xmasCount = 0;

    const allLeads = wordmap.map((line,y)=>{
        return line.map((char,x)=>{
            const validPadding = (minPad <= x && minPad <= y && maxPad > x && maxPad > y);
            return char === leadChar && validPadding ? { char: char, x: x, y: y } : null;
        });
    });

    //  M.S     M.M     S.M     S.S
    //  .A.     .A.     .A.     .A.
    //  M.S     S.S     S.M     M.M

    allLeads.forEach((line, y)=>{
        line.forEach((point, x)=>{
            if (point === null) return;
            if (
                wordmap[y-1][x-1] === "M" && wordmap[y-1][x+1] === "S" && wordmap[y+1][x-1] === "M" && wordmap[y+1][x+1] === "S" ||
                wordmap[y-1][x-1] === "M" && wordmap[y-1][x+1] === "M" && wordmap[y+1][x-1] === "S" && wordmap[y+1][x+1] === "S" ||
                wordmap[y-1][x-1] === "S" && wordmap[y-1][x+1] === "M" && wordmap[y+1][x-1] === "S" && wordmap[y+1][x+1] === "M" ||
                wordmap[y-1][x-1] === "S" && wordmap[y-1][x+1] === "S" && wordmap[y+1][x-1] === "M" && wordmap[y+1][x+1] === "M"
            ) {
                xmasCount += 1;
            }
            // console.log(point.char, x, y, good);
        })
    })

    // console.log(allLeads);

    return xmasCount;
}

const main = async (file: string) => {
    const raw = await Deno.readTextFile(file);
    const lines = raw.split('\n');
    const wordmap:Array<Array<string>> = lines.map((line)=>Array.from(line));

    return [solveForPuzzle1(wordmap), solveForPuzzle2(wordmap)];
}

const result = await main("./4/sample.txt");
console.log(result);
