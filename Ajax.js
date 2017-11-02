function Ajax() {

  this._url = window.location.href;
  this._onload = function(r, t) {};
  this._onfail = function(e) {};
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

  this._onReadyStateChange = function {

    if (request.readyState == 4) 
    {
      if (request.status === 200) 
      {
        this._onload(request.responseText, request.getResponseHeader("Content-Type"));
      }
      else
      {
        this._onfail(request.statusText);
      }
    }
  }

  this.send = function( data )
  {
    var query = '', request = this._newXmlHttpRequest();

    if (!request) return false;

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

    request.overrideMimeType("text/plain");
    request.open(this._method, this._url, this._sync);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.onreadystatechange = this._onReadyStateChange;

    request.send(query);

    return true;
  }
}

