const fetch = require('node-fetch');
const { resolve } = require('path');
const fs = require('fs');

const fragmentPath = resolve(__dirname, 'fragment-types.json');

const generateFragmentMatcher = () => {
    return fetch(`${process.env.PAGES_API_URL}`, {
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
        .then((data) => data.json())
        .then(({ data }) => {
            // here we're filtering out any type information unrelated to unions or interfaces
            data.__schema.types = data.__schema.types
                .filter(({ possibleTypes }) => possibleTypes !== null);

            fs.writeFileSync(fragmentPath, JSON.stringify(data), 'utf8', (err) => {
                if (err) {
                    return console.error('Error writing fragmentTypes file', err)
                }
            });

            return data;
        });
};

module.exports = generateFragmentMatcher;
