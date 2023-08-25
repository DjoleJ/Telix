currentRoute = Tracker.autorun(() => {
    const routeName = FlowRouter.getRouteName();
    Session.set('currentRoute', routeName);
    // $(".modal-backdrop").remove();
    // $('.modal-open').removeClass("modal-open");
    // $('body').css("padding-right", "");
});

rootUrl = Meteor.absoluteUrl().substring(0, Meteor.absoluteUrl().length - 1);

// handleOpenURL = function handleOpenURL(url) {
//     console.log('DEEPLINK URL:', url);
//     //FlowRouter.go(`/digitalCatalogsSingle/${catalogId}`);
//     //FlowRouter.go(`/clubMy/${vendorGroup}/${postId}`);
//     //FlowRouter.go(`/outletLast/${postId}`);
//     // const token = url.replace('smartpiggybank://intesaFailure', 'https://app.mysmartpiggybank.com');
       
//     const route = url.substr(20);
//     FlowRouter.go(route);
// }

Template.registerHelper('isEmptyArray', (a) => a.length==false);
Template.registerHelper('isEmptyArrayFallback', (a=[]) => a.length==false);
Template.registerHelper('isNotEmptyArray', (a) => a.length);
Template.registerHelper('getAction', () => Session.get('action'));
Template.registerHelper('isActionAdd', action => action === 'add');
Template.registerHelper('isActionDelete', action => action === 'delete');
Template.registerHelper('isActionUpdate', action => action === 'update');
Template.registerHelper('getCurrentDoc', () => Session.get('currentDoc'));
Template.registerHelper('and', (a, b) => {
    return a && b;
});
Template.registerHelper('andand', (a, b, c) => {
    return a && b && c;
});
Template.registerHelper('or', (a, b) => {
    return a || b;
});
Template.registerHelper('oror', (a, b, c) => {
    return a || b || c;
});
Template.registerHelper('ororor', (a, b, c, d) => {
    return a || b || c || d;
});
Template.registerHelper('isEqual', (a, b) => a === b);
Template.registerHelper('isEqualDouble', (a, b, c, d) => a === b && c === d);
Template.registerHelper('isRegExEqual', (a, b) => (new RegExp(b)).test(a));
Template.registerHelper('isEqualOr', (a, b, c) => a === b || a === c);
Template.registerHelper('isEqualOrOr', (a, b, c, d) => a === b || a === c || a === d);
Template.registerHelper('includes', (a, b) => a.inclides(b));
Template.registerHelper('isEqualToZero', a => a === 0);
Template.registerHelper('isEqualToZero3', (a, b, c) => { return a === 0 && b === 0 && c === 0 });
Template.registerHelper('isNotEqual', (a, b) => { 
    a !== b 
});
Template.registerHelper('isNegative', (a) => a < 0);
Template.registerHelper('isLessThen', (a, b) => { return a < b });
Template.registerHelper('isGreaterThen', (a, b) => { return a > b });
Template.registerHelper('isZero', (a) => { return a == 0 });
Template.registerHelper('isBetween', (a, b, c) => { return a > b && a < c });
Template.registerHelper('capitalize', (a) => { return a.charAt(0).toUpperCase() + a.slice(1) });
Template.registerHelper('uppercase', (a) => { return a.toUpperCase() });
Template.registerHelper('lowercase', (a) => { return a.toLowerCase() });
Template.registerHelper('divideRound', (a, b) => { return Math.round(a-b) });
Template.registerHelper('substract', (a, b) => { return +a- +b });
Template.registerHelper('formatDate', d => {
    if(d) {
        const date = new Date(d);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + String(date.getFullYear()).substring(2);
        return formatted_date;
    }
});
Template.registerHelper('formatDateWithTime', d => {
    const date = new Date(d);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let formatted_date;

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    formatted_date = `${day}/${month}/${String(date.getFullYear()).substring(2)} (${hours}:${minutes})`;

    // if (date.getMonth() < 9) {
    //     formatted_date = date.getDate() + "/" + "0" + (date.getMonth() + 1) + "/" + String(date.getFullYear()).substring(2) + " (" + date.getHours() + ":" + date.getMinutes() + ")";
    // } else {
    //     formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + String(date.getFullYear()).substring(2) + " (" + date.getHours() + ":" + date.getMinutes() + ")";
    // }

    return formatted_date;
});
Template.registerHelper('formatDateWithoutTime', d => {
    const date = new Date(d);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let formatted_date;

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    formatted_date = `${day}/${month}/${String(date.getFullYear()).substring(2)}`;

    // if (date.getMonth() < 9) {
    //     formatted_date = date.getDate() + "/" + "0" + (date.getMonth() + 1) + "/" + String(date.getFullYear()).substring(2) + " (" + date.getHours() + ":" + date.getMinutes() + ")";
    // } else {
    //     formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + String(date.getFullYear()).substring(2) + " (" + date.getHours() + ":" + date.getMinutes() + ")";
    // }

    return formatted_date;
});
Template.registerHelper('formatStandardDateWithoutTime', d => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(d) {
        const date = new Date(d);
        let formatted_date;
        if (date.getMonth() < 9) {
            formatted_date = String(date.getFullYear()) + "/" + "0" + (date.getMonth() + 1) + "/" + date.getDate();
        } else {
            formatted_date = String(date.getFullYear()) + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        }
    
        return formatted_date;
    }
});
Template.registerHelper('formatStandardDateWithTime', date => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let formatted_date;
    if (date.getMonth() < 9) {
        formatted_date = String(date.getFullYear()) + "/" + "0" + (date.getMonth() + 1) + "/" + date.getDate() + " (" + date.getHours() + ":" + date.getMinutes() + ")";
    } else {
        formatted_date = String(date.getFullYear()) + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " (" + date.getHours() + ":" + date.getMinutes() + ")";
    }

    return formatted_date;
});
Template.registerHelper('formatPushDate', d => {
    const date = new Date(d);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let formatted_date;
    if (date.getMonth() < 9) {
        formatted_date = date.getDate() + "/" + "0" + (date.getMonth() + 1) + "/" + String(date.getFullYear()).substring(2);
    } else {
        formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + String(date.getFullYear()).substring(2);
    }

    return formatted_date;
});
Template.registerHelper('formatTime', date => {
    let formatted_date;
    if (date.getMinutes() < 10) {
        formatted_date = date.getHours() + ":0" + date.getMinutes();
        return formatted_date;
      } else {
        formatted_date = date.getHours() + ":" + date.getMinutes();
        return formatted_date;
      }

});
Template.registerHelper('formateDateWithTime', date => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    const hour = date.slice(9, 11);
    const minute = date.slice(12, 14);
    const second = date.slice(15, 17);

    const newDate = `${day}.${month}.${year} ${hour}:${minute}:${second}`;
    return newDate;
});

Template.registerHelper('formatPrice', price => {
    return price.toFixed(0)
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
});