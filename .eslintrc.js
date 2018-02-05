module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
           
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing":[
            "error","always"
        ],
        "arrow-spacing":[
            "error",{"before":true,"after":true}
        ],
        "no-console":0,
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};