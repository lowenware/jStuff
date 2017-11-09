function TabView( selector )
{
  var root = jsSelectFirst( selector ),
      i,node,
      _this = this;

  this.tabs = [];
  this.pages = [];
  this.tabClick = null; /* user handler */

  this.onTabClick = function(event)
  {
    var tab = jsEventGetCurrentTarget(event).parentNode, i,
        id = tab.getAttribute('_page');

    for(i=0; i<this.tabs.length; i++)
    {
      if (tab == this.tabs[i])
        jsNodeAddClass(this.tabs[i], 'active');
      else
        jsNodeRemoveClass(this.tabs[i], 'active');
    }

    for (i=0; i<this.pages.length; i++)
    {
      if (id == this.pages[i].id)
        jsNodeAddClass(this.pages[i], 'active');
      else
        jsNodeRemoveClass(this.pages[i], 'active');
    }

    if (this.tabClick)
      this.tabClick(tab, id);
  };

  i = root.firstChild;

  /* find tabs and pages */
  while (i)
  {
    if (i.tagName)
    {
      if (! node && i.tagName.toLowerCase() == 'ul')
      {
        node = i;
      }
      else if (i.tagName.toLowerCase() == 'div')
      {
        this.pages.push(i);
      }
    }
    i = i.nextSibling;
  }

  /* tab clicks */
  i = node.firstChild;
  while (i)
  {
    if (i.tagName && i.tagName.toLowerCase() == 'li')
    {
      node = jsNodeGetFirstTag(i, 'a');
      if (node)
      {
        this.tabs.push(i);
        jsNodeAttribute(i, '_page', node.href.substr( node.href.indexOf('#')+1 ) );
        node.href='javascript:;';

        jsNodeOnClick(node, function(e){ _this.onTabClick(e); });
      }

    }
    i = i.nextSibling;
  }

}
