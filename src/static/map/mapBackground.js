var rsr = Raphael('map', '1197.178', '1077.543');

var background = rsr.rect(0.492, 0, 1197.008, 1076.235);
background.attr({id: 'background',x: '0.492',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'background');
var road = rsr.path("M720.148,1030.732v45.501h10.348v-45.501h214.902v0.1h11.678v-0.1h107.223v45.503h10.355  v-45.503h102.479l-10.41,45.503h30.777V941.714l-17.668,77.223h-105.178V858.51H1197.5v-11.796h-122.846v-34.129  c0,0,20.596,0.5,37.346,10.5s47,14.5,58.25,15.75s12.5,1.5,27.25,2.75v-12c0,0-9.408-0.748-23.5-2.5  c-12.117-1.506-27.487-3.353-45.75-10.75c-38.429-15.566-26.191-12.5-53.596-16.25v-56.849H1082c0,0,10.834,1.183,41.834-3.567  S1163,720.835,1194,716.835c1.275-0.164,2.434-0.314,3.5-0.452v-12.798c0,0-15.34,1.97-29.823,7.048v-17.368h29.823v-11.796h-29.823  V351.436h29.823V339.64h-29.823V178.732h29.823v-11.795h-29.823V39.788h29.823v-10.53h-113.579v0.41c0,0-18.421-1.667-30.254-4.5  c-7.472-1.789-12.017-12.876-13.808-20.892H1197.5V0H0.492v4.276h33.632v162.661H0.492v11.795h33.632V339.64H1.325v11.795h32.799  v158.279v0.176H0.322v11.444h33.801v0.176v159.958H0.492v11.796h33.632v38.176H0.222v11.796h33.901v56.683H0v11.796h34.124v34.999  H1.862v11.796h32.262v47.823H0v11.771h34.124v100.833H1.862v11.796h32.262v45.503h12.5v-45.503H254.5v45.503h12.273v-45.503h106.106  v45.503h12.888v-45.503h208.413v45.503h12.273v-45.503H720.148z M1074.654,39.081c4.4,0.339,6.196,0.532,9.267,0.707h73.402v127.149  h-82.669V39.081z M1074.654,178.732h82.669V339.64h-82.669V178.732z M1074.654,351.436h82.669v160.301h-82.669V351.436z   M1074.654,523.533h82.669v157.936h-82.669V523.533z M1074.654,693.265h82.669v21.738c-2.696,1.381-5.193,2.901-7.332,4.581  C1138.436,728.659,1082,731.44,1082,731.44h-7.346V693.265z M1064.299,511.737H956.677V351.436h52.828h5.329h49.465V511.737z   M1064.299,339.64h-49.465V178.732h49.465V339.64z M1064.299,166.937h-49.465V63.401h49.465V166.937z M1033.18,4.276  c0.055,0.76,0.312,3.69,1.149,6.175c-3.785-2.852-8.503-5.469-9.805-6.175H1033.18z M959.577,8.168h40.924  c7.167,1.667,13.5,3.667,13.5,3.667s7.314,5.218,11.78,8.403s10.886,7.764,10.886,7.764c4.5,4.167,15.334,8.833,26.334,9.667  c0.475,0.036,0.897,0.069,1.298,0.102v19.734h-49.465h-5.329h-49.928V8.168z M959.577,63.401h49.928v103.536h-49.928V63.401z   M846.2,8.168h103.023V26.81H846.2V8.168z M846.2,32.708h103.023v24.796H899.47h-5.13h-0.199v109.434H846.2V32.708z M949.224,63.401  v103.536H899.47V63.401H949.224z M846.2,178.732h103.023v104.206h10.354V178.732h49.928V339.64h-52.828h-10.354H846.2V178.732z   M946.323,351.436v160.301h-45.658V351.436H946.323z M846.2,351.436h49.136v160.301H846.2V351.436z M846.2,523.533h49.136h5.329  h45.658v43.997c-2.074,1.55-3.423,4.018-3.423,6.806c0,4.694,3.806,8.5,8.5,8.5s8.5-3.806,8.5-8.5c0-2.699-1.262-5.1-3.224-6.656  v-44.146h107.622v157.936H846.2V523.533z M730.496,4.276h105.351V26.81h-55.741v0.028h-0.603v140.099h-49.007V4.276z   M784.832,339.64V178.732h51.015V339.64H784.832z M835.847,351.436v160.301h-51.015V351.436H835.847z M784.832,166.937V32.708  h51.015v134.229H784.832z M730.496,178.732h49.007V339.64h-49.007V178.732z M730.496,351.436h49.007v160.301h-49.007V351.436z   M730.496,523.533h105.351v157.936H730.496V523.533z M730.496,693.265h333.803v38.176H730.496V693.265z M730.496,743.236h333.803  v56.666c-0.021,0.006-0.049,0.011-0.069,0.017H730.496V743.236z M730.496,811.715h333.803v34.999H730.496V811.715z M730.496,858.51  H835.1v93.546c-0.067,0.374-0.105,0.76-0.105,1.154c0,3.382,2.577,6.125,5.756,6.125s5.756-2.743,5.756-6.125  c0-0.127-0.011-0.25-0.018-0.375h0.018V858.51H945v39.961h0.053c-0.031,0.295-0.053,0.594-0.053,0.898  c0,3.984,2.743,7.216,6.125,7.216s6.125-3.231,6.125-7.216c0-0.305-0.021-0.604-0.053-0.898h0.053V858.51h107.049v160.427H957.076  v-78.002h-0.126c-0.337-2.73-2.764-4.85-5.712-4.85s-5.375,2.119-5.712,4.85h-0.128v78.002H730.496V858.51z M46.624,178.732h70.7  V339.64h-70.7V178.732z M46.624,351.436h70.7v158.279h-70.7V351.436z M46.624,521.511h63.966v159.958H46.624V521.511z M141,934.503  h-12.5v7.217H141v77.217H46.624V918.104H141V934.503z M254.5,1018.937H153.273V858.605H141v47.728H46.624V858.51H254.5V1018.937z   M372.879,1018.937H266.773V858.51h106.106V1018.937z M372.879,846.714H46.624v-34.999h326.256V846.714z M372.879,799.919H46.624  v-56.683h326.256V799.919z M372.879,731.44H46.624v-38.176h326.256V731.44z M118.167,681.469v-70.89l2,2.283v68.606H118.167z   M372.879,681.469H129.531v-69.513l0.073-0.063l-0.073-0.083v-0.28h-0.246l-7.331-8.37v-81.648h129.529v9.103h-14.216v10.722h14.216  H260h1.948v-19.824H262v-0.176v-11.444v-0.176h-48.1V351.436h158.979V681.469z M201.901,351.436v158.279h-74.224V351.436H201.901z   M127.677,339.64V178.732h74.224V339.64H127.677z M372.879,339.64h-70.321V232.122H315v-5.042h-17.125v0.088h-0.447V339.64H213.9  V178.732h158.979V339.64z M372.879,166.937H213.9h-12H46.624V4.276h326.256V166.937z M720.148,439.29h-51.317v-87.854h51.317V439.29  z M613.874,4.276h106.274v162.661H613.874V4.276z M613.874,178.732h106.274V339.64H613.874V178.732z M613.874,351.436h49.628  v130.067h5.329v-37.238h51.317v237.204H613.874V351.436z M502.748,4.276H603.52v162.661H502.748V4.276z M385.768,4.276h106.484  v162.661H385.768V4.276z M385.768,178.732h51v37.525h0.2h5.198h23.201v-3.98h-23.201v-33.545H603.52V339.64H385.768V178.732z   M385.768,351.436H603.52v330.033H385.768V351.436z M385.768,693.265h334.38v38.176h-334.38V693.265z M385.768,743.236h334.38  v56.683h-334.38V743.236z M385.768,811.715h334.38v34.999h-334.38V811.715z M385.768,1018.937V858.51H601.5v152.825h12.273V858.51  h106.375v160.427H385.768z");
road.attr({id: 'road',fill: '#333333','stroke-width': '0','stroke-opacity': '1'}).data('id', 'road');
var lake2 = rsr.path("M563.5,771.452c-0.005-0.034-0.013-0.066-0.019-0.101  c0.005-0.034,0.013-0.065,0.018-0.099h-0.036c-1.403-8.688-5.918-14.337-17.659-15.385h-17.944  c-11.74,1.048-16.255,6.697-17.658,15.385h-0.037c0.005,0.034,0.013,0.066,0.019,0.101c-0.005,0.034-0.013,0.065-0.018,0.099h0.036  c1.403,8.688,5.918,14.337,17.658,15.385h8.972h8.973c11.74-1.048,16.256-6.697,17.659-15.385H563.5z");
lake2.attr({id: 'lake2',fill: '#97D9F0','stroke-width': '0','stroke-opacity': '1'}).data('id', 'lake2');
var lake1 = rsr.path("M 509.5,397.502 517.5,390.835 520.833,390.835 520.833,402.502 519.5,404.835   519.5,413.835 513.167,413.835 501.75,402.419 505.25,398.919 500.792,394.46 504.5,384.835 517.875,384.835 514.833,388.502   506.625,388.71 505.5,394.085  z");
lake1.attr({id: 'lake1',fill: '#97D9F0','stroke-width': '0','stroke-opacity': '1'}).data('id', 'lake1');

	