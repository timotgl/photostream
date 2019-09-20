const loadJsonFile = (file: string): Promise<object> =>
  new Promise((resolve): void => {
    const rawFile: XMLHttpRequest = new XMLHttpRequest();

    rawFile.overrideMimeType('application/json');
    rawFile.open('GET', file, true);
    rawFile.onreadystatechange = (): void => {
      const { readyState, status } = rawFile;
      if (readyState === 4 && (status === 200 || status === 0)) {
        resolve(JSON.parse(rawFile.responseText));
      }
    };

    rawFile.send(null);
  });

export default loadJsonFile;
