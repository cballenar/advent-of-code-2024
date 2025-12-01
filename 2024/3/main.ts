const main = async (file: string) => {
    const raw = await Deno.readTextFile(file);
    const lines = raw.split('\n').join();

    const re = /mul\(([0-9]*)\,([0-9]*)\)/g;

    const foundMuls = [...lines.matchAll(re)].map((v)=>[v[0],v[1],v[2]]);
    const total = foundMuls.reduce((prev,curr)=>prev+parseInt(curr[1])*parseInt(curr[2]),0);

    const fLines = lines
        .split(new RegExp("(?=do(?:n\'t)?\(\))"))
        .filter((v)=>!v.startsWith("don't"))
        .join();    
    const ffMuls = [...fLines.matchAll(re)].map((v)=>[v[0],v[1],v[2]]);
    const total2 = ffMuls.reduce((prev,curr)=>prev+parseInt(curr[1])*parseInt(curr[2]),0);

    return [total, total2];
}

const result = await main("./3/input.txt");
console.log(result);
