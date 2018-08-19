const fetch = require('node-fetch');
const { resolve } = require('path');
const fs = require('fs');

const fragmentPath = resolve(__dirname, 'fragment-types.json');

const generateFragmentMatcher = () => {
    fetch(`${process.env.PAGES_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `{
                __schema {
                    types {
                        kind
                        name
                        possibleTypes {
                            name
                        }
                    }
                }
            }`,
        }),
    })
    .then(({ json }) => json())
    .then(({ data }) => {
        // here we're filtering out any type information unrelated to unions or interfaces
        data.__schema.types = data.__schema.types
            .filter(({ possibleTypes }) => possibleTypes !== null);

        fs.writeFile(fragmentPath, JSON.stringify(data), (err) => {
            if (err) {
                return console.error('Error writing fragmentTypes file', err)
            }
        });
    });
};

module.exports = generateFragmentMatcher;
