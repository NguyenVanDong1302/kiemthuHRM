export const localizedString = (cate: string, input: string) => {
    const data = require('http://localhost:1046/data/test.json');
    //return  `[${cate}] ${input}`;
    return data.abc;
    //return input;
};

export default localizedString;