const main = async (file: string) => {
    const raw = await Deno.readTextFile(file);
    const lines = raw.split('\n');

	let n = 0;
	let r = 50;

	lines.forEach((i)=>{
		if (!i) return;

		const or = r;
		const rr = parseInt(i.slice(1));
		if (i.startsWith("L")) {
			const nr = r-rr;
			const clicks = Math.round(Math.abs(nr-r)/100);
			n+=clicks;
			r-=parseInt(rr);
			console.log(`${or}-${rr}=`, r, `+${clicks}=`, n);
		} else { 
			const nr = r+rr;
			const clicks = Math.round(Math.abs(nr-r)/100);
			n+=clicks;
			r+=parseInt(rr);
			console.log(`${or}+${rr}=`, r, `+${clicks}=`, n);
		}
		
		//if ( r===0 ) {
		//	n+=1;
		//	console.log('Counted +1 =', n);
		//}
	});

    return n;
}

const result = await main("./01/sample.txt");
console.log(result);
