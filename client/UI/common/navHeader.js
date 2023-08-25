Template.navHeader.events({
    'click #sidebarCollapse'(event) {
        $('#sidebar').toggleClass('active');
        $('#content-wrapper').toggleClass('change-margin');
        $('#accountInfo').toggleClass('hidden');
    },
    'click .hamburger > i'(event) {
        $('#sidebar').toggleClass('active');
        $('#content-wrapper').toggleClass('change-margin');
        $('#accountInfo').toggleClass('hidden');
    },
    'click .menu-item'(event) {
        const id = $(event.currentTarget).attr('id');
        FlowRouter.go(`/${id}`);
    },
    'click #btnLogout'(event, instance) {
        Meteor.logout();
        FlowRouter.go('/login');
    },
})

// $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//     });