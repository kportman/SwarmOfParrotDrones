'use strict';

var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
var rollingSpider = new RollingSpider(); /*insert drone id in the constructor*/

rollingSpider.connect(function () {
  rollingSpider.setup(function () {
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

    temporal.queue([
      {
        delay: 5000,
        task: function () {
          rollingSpider.takeOff();
          rollingSpider.flatTrim();
        }
      },
      {
        delay: 100,
        task: function () {
          rollingSpider.forward();
        }
      },
	  {
        delay: 100,
        task: function () {
          rollingSpider.left();
        }
      },
	  {
        delay: 100,
        task: function () {
          rollingSpider.right();
        }
      },
	   {
        delay: 100,
        task: function () {
          rollingSpider.backward();
        }
      },
      {
        delay: 5000,
        task: function () {
          rollingSpider.land();
        }
      },
      {
        delay: 5000,
        task: function () {
          temporal.clear();
          process.exit(0);
        }
      }
    ]);
  });
});