module.exports = (number) => number.toString().split('').map((number, i) => i === 0 ? '(' + number : i === 2 ? number + ') ' : i === 5 ? number + '-' : number).join('');