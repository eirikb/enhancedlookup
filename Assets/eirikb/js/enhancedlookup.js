$(function() {

    function mslookuptypeintextboxToSelect($field) {
        var $input = $field.find('input');
        var choices = $input.attr('choices');
        var val = $input.val();

        if (!choices) return $();
        choices = choices.split('|');
        var $select = $('<select>');
        var last = null;
        for (var i = 0; i < choices.length; i++) {
            if (i % 2 === 0) {
                last = choices[i];
            } else {
                var $option = $('<option>').val(choices[i]).text(last);
                $select.append($option);
            }
        }
        $field.find('input,img').hide();
        $field.append($select);
        $select.val(val);
        $select.change(function() {
            $input.val($select.val());
        });
        return $select;
    }

    function initSingle($field) {
        var $select = $field.find('select');
        if ($select.size() === 0) {
            $select = mslookuptypeintextboxToSelect($field);
        }
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
            var val = $select.select2('val');
            var removeVal = $rightSelect.find('option').filter(function() {
                return $.inArray($(this).val(), val) < 0;
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

        if (!match || $field.has(':input').size() === 0) return;

        var isSingle = $field.find('button').size() === 0;
        isSingle ? initSingle($field) : initMutli($field);
        $('.select2-container').width('100%');
    });
});