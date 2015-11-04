var fs = require('fs'),
    postcss = require('postcss'),
    partialImport = require('postcss-partial-import')(),
    customProperties = require('postcss-custom-properties')(),
    autoprefixer = require('autoprefixer')(),
    cssnano = require('cssnano')()

var src = 'src/core.css',
    dest = 'dist/core.css';

var css = fs.readFileSync(src, 'utf8');

postcss([
    partialImport,
    customProperties,
    autoprefixer,
    cssnano
])
.process(css, {
    from: src,
    to: dest
})
.then(function (result) {
    fs.writeFileSync(dest, result.css);
    if (result.map) fs.writeFileSync(dest + '.map', result.map)
});
