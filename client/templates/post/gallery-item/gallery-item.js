//in post-add.js

Template.galleryItem.onRendered(function () {
    Template.postAdd.arrLen();
    $(".owl-carousel").owlCarousel();
    Template.postAdd.owl = $(".owl-carousel").data('owlCarousel');

    Template.postAdd.owl.reinit({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        navigationText: ["<", ">"],
        singleItem: true
    });
});
