var fs = require('fs'),
    postcss = require('postcss');

var src = 'src/core.css',
    dest = 'dist/core.css';

var css = fs.readFileSync(src, 'utf8');

postcss([
    require('postcss-partial-import')(),
    require('postcss-custom-properties')(),
    require('autoprefixer')(),
    require('cssnano')(),
])
    .process(css, {
        from: src,
        to: dest
    })
    .then(function (result) {
        fs.writeFileSync(dest, result.css);
        if (result.map) fs.writeFileSync(dest+'.map', result.map)
    });
