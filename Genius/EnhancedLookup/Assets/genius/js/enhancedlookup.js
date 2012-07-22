genius.loadScript('jquery', function() {
    genius.loadScript('select2', function() {
        $(function() {

            function initSingle($field) {
                var $select = $field.find('select');
                $select.select2();
            }

            function initMutli($field) {
                var $leftSelect, $rightSelect, $select, $addButton, $removeButton;

                $leftSelect = $field.find('select:eq(0)');
                $rightSelect = $field.find('select:eq(1)');
                $addButton = $field.find('button:eq(0)');
                $removeButton = $field.find('button:eq(1)');
                $select = $('<select multiple>');

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
                var $field, html, match;

                $field = $(this);
                html = $field.html();
                match = html.match(/FieldType=\"SPFieldLookup.*\"/);
                if (match) {
                    if (match[0].match(/Multi/)) initMutli($field);
                    else initSingle($field);
                }
            });
        });
    });
});