import fs from 'fs';
import csvParse from 'csv-parse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadCSV(filePath: string): Promise<any[]> {
  const readCSVStream = fs.createReadStream(filePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lines: any[] = [];

  parseCSV.on('data', line => {
    console.log('line', line);
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  console.log('lines', lines);
  return [...lines];
}

export default loadCSV;
