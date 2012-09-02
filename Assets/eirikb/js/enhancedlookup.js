$(function() {

    function initSingle($field) {
        var $select = $field.find('select');
        $select.select2();
    }

    function initMutli($field) {
        var $leftSelect = $field.find('select:eq(0)');
        var $rightSelect = $field.find('select:eq(1)');
        var $addButton = $field.find('button:eq(0)');
        var $removeButton = $field.find('button:eq(1)');
        var $select = $('<select multiple>');

        $field.children().hide();
        $field.append($select);

        $select.append($leftSelect.find('option').clone()).append($rightSelect.find('option').clone());
        $select.val('');
        $select.select2().select2('val', $rightSelect.find('option').map(function() { return $(this).val(); }).toArray());

        $select.on('change', function() {
            var val, removeVal;

            val = $select.select2('val');
            removeVal = $rightSelect.find('option').filter(function() {
                return val.indexOf($(this).val()) < 0;
            }).map(function() {
                return $(this).val();
            }).toArray();

            $leftSelect.val(val);
            $addButton.click();

            $rightSelect.val(removeVal);
            $removeButton.click();
        });
    }

    $('.ms-formtable .ms-formbody').each(function() {
        var $field = $(this);
        var html = $field.html();
        var match = html.match(/FieldType=\"SPFieldLookup.*\"/);

        if (match) {
            (match[0].match(/Multi/)) ? initMutli($field) : initSingle($field);
            $('.select2-container').width('100%');
        }
    });
});