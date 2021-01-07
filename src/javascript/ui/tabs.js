/**
 * Functionality general to tabs
 */

function initialize() {
    $(".tab").click(function(event) {
        const $tab = $(this);
        const $parent = $tab.closest('.tab-container');

        // Update active status of tabs
        $parent.find('.tabs .tab').removeClass('active');
        $tab.addClass('active');

        // Update active status of tab contents
        const $contents = $parent.find('.tab-contents');
        $contents.find('.tab-content').removeClass('active');

        const tabContentName = $tab.attr('data-content');
        const $tabContent = $contents.find("." + tabContentName);
        // $tabContent.css('display', 'block');
        $tabContent.addClass('active');
    });
}

export { initialize }

