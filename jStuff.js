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
  if (! nodeHasClass (node, className))
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
