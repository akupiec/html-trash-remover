const _ = require('underscore');

const acronimToFootnotes = function ($, acronim, dest) {
    if (!acronim.length) return;

    let footnoteList = [];

    acronim.map(function (idx, acro) {
        const element = $(acro);
        const text = element.text();
        const description = element.attr('title');
        const have = _.findWhere(footnoteList, {text: text});
        let nr;
        if(have) {
            nr = have.nr
        } else {
            nr = footnoteList.length + 1;
            footnoteList.push({text, description, nr});
        }

        $(`<span class="foot-text">${text}<sup class="foot-link">${nr}</sup></span>`).insertAfter(element);
        element.remove();
    });

    footnoteList.forEach((acro) => {
        dest.append(`<p><sup>${acro.nr}</sup> ${acro.description}`);
    })

};
module.exports = {
    acronimToFootnotes,
};