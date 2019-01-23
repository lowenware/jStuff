'use strict';

/* -------------------------------------------------------------------------- */

function jsSelectId( id )
{
  return document.getElementById( id );
}

/* -------------------------------------------------------------------------- */

function jsSelectFirst(query)
{
  return document.querySelector(query);
}

/* -------------------------------------------------------------------------- */

function jsSelectAll(query)
{
  return document.querySelectorAll(query);
}

/* -------------------------------------------------------------------------- */

function jsNodeNew( tagName, child )
{
  var node = document.createElement( tagName );
  if (child)
    node.appendChild( child );
  return node;
}

/* -------------------------------------------------------------------------- */

function jsTextNodeNew( nodeText )
{
  return document.createTextNode( nodeText );
}

/* -------------------------------------------------------------------------- */

function jsNodeAttribute(node, attrName, attrValue)
{
  if (attrValue)
    node.setAttribute(attrName, attrValue);

  return node.getAttribute(attrName);
}

/* -------------------------------------------------------------------------- */

function jsNodeSetText(node, text)
{
  jsNodeRemoveChilds(node);
  node.appendChild(jsTextNodeNew(text));
  return node;
}

/* -------------------------------------------------------------------------- */

function jsNodeGetFirstParentTag(node, tagName)
{
  while(node)
  {
    if (node.tagName && node.tagName.toLowerCase() == tagName)
      return node;

    node = node.parentNode;
  }

  return null;
}


function jsNodeGetFirstTag(node, tagName)
{
  node = node.firstChild;

  while(node)
  {
    if (node.tagName && node.tagName.toLowerCase() == tagName)
      return node;

    node = node.nextSibling;
  }

  return null;
}

/* -------------------------------------------------------------------------- */

function jsNodeHasClass(node, className)
{
  var list = node.className.split(' ');
  return (list.indexOf(className) == -1) ? false : true;
}

/* -------------------------------------------------------------------------- */

function jsNodeAddClass(node, className)
{
  if (! jsNodeHasClass (node, className))
    node.className += ' '+className;
}

/* -------------------------------------------------------------------------- */

function jsNodeRemoveClass(node, className)
{
  var list = node.className.split(' ');
  var n = list.indexOf(className);
  if (n != -1)
  {
    list[n] = '';
    node.className = list.join(' ');
  }
}

/* -------------------------------------------------------------------------- */

function jsAddEventListener(source, eventName, handler)
{
  if(source.addEventListener)
    source.addEventListener(eventName, handler, false)
  else if (source.attachEvent)
    source.attachEvent("on"+eventName, handler);
  else
    source['on'+eventName] = handler;
}

/* -------------------------------------------------------------------------- */

function jsNodeOnClick(node, handler)
{
  node.addEventListener('click', handler, true);
}
/* -------------------------------------------------------------------------- */

function jsNodeOnBlur(node, handler)
{
  node.addEventListener('blur', handler, false);
}

/* -------------------------------------------------------------------------- */

function jsNodeOnChange(node, handler)
{
  node.addEventListener('change', handler, false);
}

/* -------------------------------------------------------------------------- */

function jsNodeOnInput(node, handler)
{
  node.addEventListener('input', handler, false);
}


/* -------------------------------------------------------------------------- */

function jsNodeOnMouseLeave(node, handler)
{
  node.addEventListener('mouseleave', handler, false);
}

/* -------------------------------------------------------------------------- */

function jsNodeFindParentByClass(node, className)
{
  while ( node.parentNode )
  {
    if (jsNodeHasClass(node.parentNode, className))
      return node.parentNode;
    node = node.parentNode;
  }
  return null;
}

/* -------------------------------------------------------------------------- */

function jsNodeRemoveChilds(node)
{
  while(node.firstChild) { node.removeChild(node.firstChild); }
  return node;
}

/* -------------------------------------------------------------------------- */

function jsEventGetCurrentTarget(event)
{
  var currentTarget;
  if (event.currentTarget)
  {
    currentTarget = event.currentTarget;
    if (currentTarget.nodeType==3)
      currentTarget = currentTarget.parentNode;
  }
  else
    currentTarget = event.srcElement;

  return currentTarget;
}

/* -------------------------------------------------------------------------- */

function jsDateDiffDays(date1, date2)
{
  var DAY_MILISECONDS = 1000 * 60 * 60 * 24;

  var utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  var utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / DAY_MILISECONDS);
}

/* -------------------------------------------------------------------------- */

function jsDateToLocalISODate(date)
{
  var y = date.getFullYear(),m = date.getMonth()+1, d = date.getDate();

  if (m<10) m = '0'+m;
  if (d<10) d = '0'+d;

  return y+'-'+m+'-'+d;
}

/* -------------------------------------------------------------------------- */

function jsDateToLocalISOTime(date)
{
  var h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();

  if (h<10) h = '0'+h;
  if (m<10) m = '0'+m;
  if (s<10) s = '0'+s;

  return h+':'+m+':'+s;
}

/* -------------------------------------------------------------------------- */

function jsDocumentOnKeyPress( handler )
{
  return document.addEventListener("keydown", handler, false);
}

/* -------------------------------------------------------------------------- */

function jsLog( source, message, exception )
{
  if (console && console.log)
  {
    var to_log = (message) ? source +': '+message : source;

    if (exception)
      to_log += ' ('+exception+')';

    console.log(to_log);
  }
}

/* -------------------------------------------------------------------------- */

function jsIsFunction( obj ) {
 return obj && {}.toString.call(obj) === '[object Function]';
}

/* -------------------------------------------------------------------------- */

function jsNodeGetOffset( node )
{
  var _x = 0;
  var _y = 0;
  while( node && !isNaN( node.offsetLeft ) && !isNaN( node.offsetTop ) )
  {
    _x += node.offsetLeft - node.scrollLeft;
    _y += node.offsetTop - node.scrollTop;
    node = node.offsetParent;
  }
  return { top: _y, left: _x };
}
