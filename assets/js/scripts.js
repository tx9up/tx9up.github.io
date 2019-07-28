(function($) {
    const resetForm = () => {
        let form = $('form');
        form.find('[name=incident_date]').val('2019-01-01');
    };

    const generate = (values) => {
        let keys = Object.keys(values);
        let paragraphs = [];

        // 1. Get date
        let dateRegex = /^([0-9]+)\-([0-9]+)\-([0-9]+)/;
        let res = dateRegex.exec(values.incident_date);

        let year = res[1];
        let month = res[2];
        let day = res[3];

        console.log(new Date(values.incident_date));

        console.log(values);
    };

    $(window).bind('load', () => {
        resetForm();

        let $inputs = $('form input, form select');
        $inputs.bind('change', (e) => {
            let $form = $inputs.closest('form')[0];
            let values = Object.values($form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {});
            // generate(values);
        });
    });
}) (jQuery)