var dom = require('dom-sandbox')
  , test = require('tape')
  , direct = require('dom-event');

test('dom-event button clickable', function(t) {
    t.plan(1);
    var initial = "foobar";
    var el = dom();
    var target = document.createElement('input');
    target.type = "button";
    target.value = initial;
    el.appendChild( target );

    var value = null;
    var click_handler = direct( el, 'click', function( e ) {
        console.warn( '\n[ TARGET VALUE ]: \n', e.target.value );
        value = e.target.value;
    }, true );

    target.click();
    t.equal(initial,value);
});

test('dom-event parent element catches click bubble', function(t) {
    t.plan(1);
    var initial = "foobar";
    var el = dom();
    var container = document.createElement('p');
    var target = document.createElement('input');
    target.type = "button";
    target.value = initial;
    container.appendChild( target );
    el.appendChild( container );

    var input_click_handler = direct( target, 'click', function( e ) {
    }, true );

    var bubble_flag = false;
    var p_click_handler = direct( container, 'click', function( e ) {
       bubble_flag = true; 
    }, undefined );

    target.click();
    t.equal( bubble_flag, true );
});

test('dom-event parent element does not catch click bubble', function(t) {
    t.plan(1);
    var initial = "foobar";
    var el = dom();
    var container = document.createElement('p');
    var target = document.createElement('input');
    target.type = "button";
    target.value = initial;
    container.appendChild( target );
    el.appendChild( container );

    var input_click_handler = direct( target, 'click', function( e ) {
        e.stopPropagation();
        e.preventDefault();
    }, true );

    var bubble_flag = false;
    var p_click_handler = direct( container, 'click', function( e ) {
       bubble_flag = true; 
    }, undefined );

    target.click();
    t.equal( bubble_flag, false );
});

test('dom-event input changed', function(t) {
    t.plan(1);
    var initial = "foobar";
    var el = dom();
    var target = document.createElement('input');
    target.type = "text";
    target.value = initial;
    el.appendChild( target );

    var captured_value = null;
    var input_click_handler = direct( target, 'change', function( e ) {
        console.warn( '\n[ TARGET VALUE ]: \n', e.target.value );
        captured_value = e.target.value;
    }, true );

    /*
    **
    **  create a change event and dispatch it
    **
    */
    var evt = document.createEvent("HTMLEvents");
    //var evt = new Event('change', { 'bubbles': true });
    var new_value = 'whizbang';
    target.value = new_value;
    evt.initEvent( "change", false, true );
    target.dispatchEvent(evt);

    t.equal( captured_value, new_value );
});

test('dom-event input focus', function(t) {
    t.plan(1);
    var initial = "foobar";
    var el = dom();
    var target = document.createElement('input');
    target.type = "text";
    target.value = initial;
    el.appendChild( target );

    var captured_value = null;
    var input_keyup_handler = direct( target, 'focus', function( e ) {
        console.warn( '\n[ TARGET VALUE ]: \n', e.target.value );
        captured_value = e.target.value;
    }, true );

    var evt = document.createEvent("UIEvents");
    var new_value = 'whizbang';
    target.value = new_value;
    evt.initUIEvent('focus', true, true );
    target.dispatchEvent(evt);

    t.equal( captured_value, new_value );
});

/*
**
**  JSDOM does not support KeyboardEvents yet
**  https://github.com/tmpvar/jsdom/issues/730
**
*/
/*
test('dom-event input keyup', function(t) {});

test('dom-event input keyup cancel ENTER', function(t) {});
*/

