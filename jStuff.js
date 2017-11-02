"use strict";

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
    node.className += list.join(' ');
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

