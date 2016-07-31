$(function () {

    $('.photos-container .photo').colorbox({
        rel: 'photo',
        maxWidth: '95%',
        maxHeight: '95%',
        title: function () {
            return $(this).data('title');
        }
    });

    $(window).load(function () {
        $('.photos-container').wookmark({
            autoResize: true,
            flexibleWidth: function () {
                return (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 1024 ? '100%' : '50%');
            },
            itemWidth: 200,
            offset: 30,
            outerOffset: 30,
            fillEmptySpace: true,
            placeholderClass: 'placeholder'
        });
    });

});
