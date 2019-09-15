const loadJsonFile = (file: string): Promise<object> => new Promise((resolve) => {
    const rawFile: XMLHttpRequest = new XMLHttpRequest();
    rawFile.overrideMimeType('application/json');
    rawFile.open('GET', file, true);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
        resolve(JSON.parse(rawFile.responseText));
      }
    };
    rawFile.send(null);
});

export default loadJsonFile;
