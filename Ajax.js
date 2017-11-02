function Ajax(url, onload, onfail) {

  alert(url);
  this._url = (url) ? url : window.location.href;
  this._onload = onload ? onload : function(r, t) {};
  this._onfail = onfail ? onfail : function(e) {};
  this._sync = true;
  this._data = null;
  this._method = 'GET';

  this._newXmlHttpRequest = function() {
    var result = null;

    try 
    {
      result = new XMLHttpRequest();
    }
    catch(e)
    {
      var iev=[
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
          ];

      for(var i=0; i<iev.length; i++)
      {
        try 
        {
          result = new ActiveXObject(iev[i]);
          break;
        }
        catch(e){} // do nothing
      }
    }
    return result;
  }

  this._onReadyStateChange = function() {

    if (this._request.readyState == 4) 
    {
      if (this._request.status === 200) 
      {
        this._onload(
          this._request.responseText,
          this._request.getResponseHeader("Content-Type")
        );
      }
      else
      {
        this._onfail(this._request.statusText);
      }
    }
  }

  this.send = function( data )
  {
    var query = '', t = this;
    this._request = this._newXmlHttpRequest();

    if (!this._request) return false;

    if (data)
    {
      for (var key in this._data)
      {
        if (query != '') query += '&';
          query += encodeURIComponent(key)+'='+encodeURIComponent(this._data[key]);
      }

      if (this._method == 'GET')
      {
        this._url += '?'+query;
      }
    }

    this._request.overrideMimeType("text/plain");
    this._request.open(this._method, this._url, this._sync);
    this._request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    this._request.onreadystatechange = function(){ t._onReadyStateChange() };

    this._request.send(query);

    return true;
  }
}

