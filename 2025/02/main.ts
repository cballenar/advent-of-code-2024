const main = async (file: string) => {
  const raw = await Deno.readTextFile(file);
  const lines = raw.split('\n');
  const ranges = lines[0].split(',');
  //console.log(ranges);

  const ids = [];

  // iterate over each array
  ranges.forEach((i)=>{
    const range = i.split('-');
    const numbers = Array.from({ length: parseInt(range[1])-parseInt(range[0])+1 }, (v, i)=>parseInt(range[0])+i );
    //console.log(numbers);
    // check if string in half repeats
    numbers.forEach((i)=>{
      const s = String(i);
      const h = s.length/2;
      //console.log(i,h);

      // Part 1:
      if (Number.isInteger(h) && s.slice(0,h)==s.slice(h*-1)) {
        //console.log('yup', s.slice(0,h), s.slice(0,h), h);
        //ids.push(i);
      }

      // Part 2: regex time
      // test a: /(\d+)+\1/
      // test b: /^(\d+)\1{1,}$/
      if ( s.match(/^(\d+)\1{1,}$/) ) {
	ids.push(i);
      }
    });
  });

  console.log(ids);
  const result = ids.reduce((a,b)=>a+b, 0);
  return result;
}

const result = await main("./02/input.txt");
console.log(result);
