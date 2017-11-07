function Ajax(url, onload, onfail) {

  this.url = (url) ? url : window.location.href;
  this.onload = onload ? onload : function(resp, type) {};
  this.onfail = onfail ? onfail : function(e) {};
  this.sync = true;
  this.method = 'GET';
  this.token = null;

  this.newXmlHttpRequest = function()
  {
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

  this.onReadyStateChange = function()
  {
    if (this.request.readyState == 4) 
    {
      if (this.request.status === 200) 
      {
        this.onload(
          this.request.responseText,
          this.request.getResponseHeader("Content-Type"),
          this.token
        );
      }
      else
      {
        this.onfail(this.request.statusText, this.token);
      }
      this.token = null;
      return true;
    }
    return false
  }

  this.send = function( data )
  {
    var query = '', _this = this;
    this.request = this.newXmlHttpRequest();

    if (!this.request) return false;

    if (data)
    {
      for (var key in data)
      {
        if (query != '') query += '&';
          query += encodeURIComponent(key)+'='+encodeURIComponent(data[key]);
      }

      if (this.method == 'GET')
      {
        this.url += '?'+query;
      }
    }

    this.request.overrideMimeType("text/plain");
    this.request.open(this.method, this.url, this.sync);
    this.request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    this.request.onreadystatechange = function(){ if(_this.onReadyStateChange()) _this=null; };

    this.request.send(query);

    return true;
  }
}

