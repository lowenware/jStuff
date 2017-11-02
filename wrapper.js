function Wrapper (src)
{
  if (typeof(src) == 'string')
    this._list = document.querySelectorAll(src);
  else if (typeof(src) == 'object')
    this._list = new Array(src);
  else
    this._list = null;

  this.onclick = function( handler )
  {
    if (this._list != null)
    {
      for (var i=0; i<this._list.length; i++)
      {
        this._list[i].addEventListener('click', handler, false);
      }
    }
    return this;
  }

  this.each = function( handler )
  {
    for (var i=0; i<this._list.length; i++)
    {
      handler(this._list[i]);
    }
    return this;
  }

  this.attr = function( attr, value )
  {
    if (typeof(value) == 'undefined')
      return this._list[0].getAttribute(attr);
 
    for (var i=0; i<this._list.length; i++)
    {
      this._list[i].setAttribute(attr, value);
    }

    return this;
  }

  this.focus = function()
  {
    this._list[0].focus();
    return this;
  }

  this.value = function(value)
  {
    if (typeof(value) != 'undefined')
      this._list[0].value = value;

    return this._list[0].value;
  }

}



window.$ = function(src){
  return new Wrapper(src); 
};

window.$.ID = function(src) {
  return new Wrapper(document.getElementById(src));
}

