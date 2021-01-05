/**
 * Functionality general to tabs
 */

function initialize() {
    $(".tab").click(function(event) {
        const $tab = $(this);
        const $parent = $tab.closest('.tab-container');

        const $contents = $parent.find('.tab-contents');
        $contents.find('.tab-content').css('display', 'none');

        const tabContentName = $tab.attr('data-content');
        const $tabContent = $contents.find("." + tabContentName);
        $tabContent.css('display', 'block');
    });
}

export { initialize }

