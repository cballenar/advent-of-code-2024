const main = async (file: string) => {
    const raw = await Deno.readTextFile(file);
    const lines = raw.split('\n');
    return lines;
}

const result = await main("./1/sample.txt");
console.log(result);
