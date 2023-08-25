
Template.login.onCreated(function() {

})

Template.login.onRendered(function () {
    // this.autorun(() => {
    //     const ready = this.subscriptionsReady();
    //     if (ready) {
    //         setTimeout(() => {

    //             $('#loginForm').validate({
    //                 errorPlacement: function (error, element) {
    //                     element.after(error);
    //                 },
    //                 rules: {
    //                     email: {
    //                         required: true,
    //                         email: true
    //                     },
    //                     password: {
    //                         required: true,
    //                         minlength: 6,
    //                         maxlength: 30
    //                     },

    //                 }
    //             })
    //         }, 0)
    //     }
    // })
})

Template.login.helpers({

})

Template.login.events({
    "submit #loginForm"(event) {
        event.preventDefault();

        const email = $('#loginEmail').val();
        const password = $('#loginSifra').val();
        
        Meteor.loginWithPassword(email, password, err => {
            if (err) {
                Bert.alert(err.reason, 'danger');
            } else {
                if(Meteor.user().username === 'gost') {
                    FlowRouter.go('/telefoni');
                } else {
                    FlowRouter.go('/servisi');
                }
            }
        })
    },
    // 'click .show-password'(event) {
    //     const target = $(event.target);
    //     if($(target).hasClass('fa-eye-slash')) {
    //         $('#exampleInputPassword').attr('type', 'text');
    //         $(target).removeClass('fa-eye-slash');
    //         $(target).addClass('fa-eye');
    //     } else {
    //         $('#exampleInputPassword').attr('type', 'password');
    //         $(target).removeClass('fa-eye');
    //         $(target).addClass('fa-eye-slash');
    //     }
    // },
})

