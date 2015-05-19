
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var fm = require('front-matter');
var marked = require('marked');
var cssnext = require('cssnext');
var cheerio = require('cheerio');
var pkg = require('./package.json');

var dir = './src/posts';
var filenames = fs.readdirSync(dir).filter(function(filename){
  return !/^\./.test(filename);
});
var posts = filenames.map(function(filename) {
  var content = fs.readFileSync(path.join(dir, filename), 'utf8');
  var matter = fm(content);
  var html = marked(matter.body);
  var $ = cheerio.load(html);
  var excerpt = $('p').first().text();
  var post = _.assign(matter.attributes, {
    slug: filename.replace(/\.md/, ''),
    body: matter.body, 
    html: html,
    excerpt: excerpt
  });
  return post;
}).sort(function(a, b) {
  return new Date(b.date) - new Date(a.date); 
});

var routes = filenames.map(function(filename) {
  return '/posts/' + filename.replace(/\.md$/,'');
});
routes.unshift('/');
console.log(routes);

module.exports = {
  title: 'Writing',
  description: pkg.description,
  author: pkg.author,
  css: cssnext([
    '@import "basscss";',
    '@import "site";',
  ].join('\n'), {
    compress: true,
    features: {
      rem: false,
      pseudoElements: false,
      colorRgba: false,
      customProperties: {
        variables: {
          'h3': '1.375rem',
          'h4': '1.125rem',
          'heading-font-weight': '500',
          'button-font-weight': '500',
          'bold-font-weight': '500',
          'space-1': '.75rem',
          'space-2': '1.5rem',
          'space-3': '3rem',
          'space-4': '6rem',
          'link-color': 'inherit',
          'link-text-decoration': 'underline',
          'button-font-size': 'var(--h5)',
          'container-width': '48em',
        }
      }
    }
  }),
  posts: posts,
  routes: routes,
  //baseUrl: '/',
  baseUrl: '/writing/',
};
