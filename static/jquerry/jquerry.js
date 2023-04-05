$(document).ready(() =>
{
    let b1 = $('.auth > .auth-choose-method *:first')
    let b2 = $('.auth > .auth-choose-method *:last')
    b2.on('click', function()
    {
        b2.attr('class', 'chosen')
        b1.removeAttr('class')
        $('.reg-panel').css('display','flex')
        $('.login-panel').css('display','none')
    })
    b1.on('click', function()
    {
        b1.attr('class', 'chosen')
        b2.removeAttr('class')
        
        $('.reg-panel').css('display','none')
        $('.login-panel').css('display','flex')
    })
})