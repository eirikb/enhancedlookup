Array.prototype.slice.call(document.querySelectorAll('.ms-formtable .ms-formbody')).filter(function (el) { return el.innerHTML.match(/FieldType=\"SPFieldLookupMulti\"/); }).forEach(function (multi) {
    console.log(multi)
});