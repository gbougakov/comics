const fs = require('fs')
const {execSync} = require('child_process')
const ejs = require('ejs')

const template = ejs.compile(fs.readFileSync('template.ejs', 'utf8'))
const homeTemplate = ejs.compile(fs.readFileSync('home.ejs', 'utf8'))
const comics = JSON.parse(fs.readFileSync('comics.json', 'utf8'))

comics.forEach((comic, i) => {
  fs.mkdirSync('dist/' + comic.id, {recursive: true})
  fs.writeFileSync('dist/' + comic.id + '/index.html', template({
    comic,
    previousID: comics[i - 1] ? comics[i - 1].id : undefined,
    nextID: comics[i + 1] ? comics[i + 1].id : undefined
  }))
})

execSync('cp -R assets dist/assets')
fs.writeFileSync('dist/index.html', homeTemplate({
  link: '/' + comics[comics.length - 1].id
}))
