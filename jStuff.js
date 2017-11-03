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

function jsTextNodeNew( nodeText )
{
  return document.createTextNode( nodeText );
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

function jsNodeOnClick(node, handler)
{
  node.addEventListener('click', handler, false);
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

