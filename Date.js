
Date.prototype.getDaysOfMonth = function()
{
  var month = this.getMonth(),
      year;

  switch(month)
  {
    case 1:
      year = this.getFullYear();
      return  (year % 4 == 0 && year % 100 != 0) ? 29 : 28;
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;
  }
  return 31;
}

Date.prototype.toISODateString = function()
{
  var result = this.getFullYear()+'-',
      text;

  text = this.getMonth()+1;
  text = ((text < 10) ? '0' : '') + text + '-';
  result += text;

  text = this.getDate();
  text = ((text < 10) ? '0' : '') + text;
  result += text;

  return result;
}
