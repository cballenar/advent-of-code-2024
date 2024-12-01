const main = async (file: string) => {
    const raw = await Deno.readTextFile(file);
    const lines = raw.split('\n');
    const listA = [];
    const listB = [];

    lines.forEach((i)=>{
        const t = i.split(' ');
        listA.push(parseInt(t[0]));
        listB.push(parseInt(t[t.length-1]));
    });

    listA.sort();
    listB.sort();

    const sum = listA.reduce((acc, v, i) => {
        const sub = listB[i]-v;
        const lineCalc = sub < 0 ? acc + sub * -1 : acc + sub;
        return lineCalc;
    }, 0);

    const listC = [];
    listA.forEach((v)=>{
        listC.push(v * listB.filter((vv)=> vv == v ).length);
    });

    const score = listC.reduce((acc, v)=>acc+v,0);

    return [sum, score];
}

const result = await main("./1/sample.txt");
console.log(result);
