'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 50;
var GAP_X = 50; // расстояние между столбцами гистограммы
var GAP_Y = 20; // расстояние между строками
var BAR_WIDTH = 50; // ширина столбика гистограммы
var BAR_HEIGHT = -150; // max высота столбика гистограммы
var TEXT_HEIGHT = 20;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  if (arr.length > 0) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  } else {
    return 0;
  }
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, 'white');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_X, CLOUD_Y);
  ctx.fillText('Список результатов: ', CLOUD_X + GAP_X, CLOUD_Y + GAP_Y);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_X + (GAP_X + BAR_WIDTH) * i, CLOUD_HEIGHT - TEXT_HEIGHT + BAR_HEIGHT * times[i] / maxTime - GAP_Y);
    ctx.fillText(names[i], CLOUD_X + GAP_X + (GAP_X + BAR_WIDTH) * i, CLOUD_HEIGHT);
    ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + GAP_X + (GAP_X + BAR_WIDTH) * i, CLOUD_HEIGHT - TEXT_HEIGHT, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
  }
};
