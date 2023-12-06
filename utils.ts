export function getData(path: string) {
    return Deno.readTextFileSync(path);
}

export function getLines(data: string): string[] {
    return data.split('\n');
}
