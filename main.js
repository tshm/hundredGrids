/* global pdfMake */

function shuffle (xs) {
  var xs_ = xs.slice(0)

  // While there remain elements to shuffle...
  for (var i = xs.length - 1; i >= 0; i--) {
    // Pick a remaining element...
    var randomIndex = Math.floor(Math.random() * i)

    // And swap it with the current element.
    var temporaryValue = xs_[i]
    xs_[i] = xs_[randomIndex]
    xs_[randomIndex] = temporaryValue
  }

  return xs_
}

function cons (x, xs) {
  var xs_ = xs.slice(0)
  xs_.unshift(x)
  return xs_
}

function makeTable (base) {
  var emptyArr = base.slice(0).map(() => ' ')
  var table = shuffle(base).map((x) => cons(x, emptyArr))
  var top = cons(' ', shuffle(base))
  return cons(top, table)
}

var base = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.table(makeTable(base))

function makePage (npage) {
  console.log(npage)
  let w = 35
  let template = {
    pageSize: 'A4',
    content: [],
    styles: {
      header: {
        fontSize: 30
      },
      numTable: {
        fontSize: 22,
        margin: [0, 5, 0, 15]
      }
    },
    defaultStyle: {
        // alignment: 'justify'
    }
  }
  let addTable = function () {
    template.content.push(
      {text: '---', style: 'header'}
    )
    template.content.push(
      {
        style: 'numTable',
        table: {
          widths: [w, w, w, w, w, w, w, w, w, w],
          body: makeTable(base)
        }
        // layout: { fillColor: (i, node) => (i % 2 === 0) ? '#CCCCCC' : null }
      }
    )
  }

  for (var i = 0; i < npage * 2; i++) addTable()
  return template
}

// var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
// pdfMake.createPdf(template).open();
var button = document.querySelector('#print')
button.addEventListener('click', () => {
  var npage = +document.querySelector('#npages').value
  pdfMake.createPdf(makePage(npage)).open()
})
