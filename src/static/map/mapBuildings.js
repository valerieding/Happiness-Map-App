let allPlaces = allMapObjects(null);
let campus_avg = getCampusScore(null);

var crerar = rsr.rect(254.833, 383.835, 40.667, 75.602);
crerar.attr({fill: allPlaces['crerar'].color, class: "building", id: 'crerar'});
crerar.data({'info': allPlaces['crerar']});
regions.push(crerar);

var offcampus = rsr.circle(900, 190, 77);
offcampus.attr({fill: allPlaces['offcampus'].color, class: "building", id: "offcampus"});
offcampus.data({'info': allPlaces['offcampus']});
regions.push(offcampus);

var quad = rsr.path("M385.089,351.435v330.034H603.52V351.435H385.089z M393,357.001h13v4.333h29.667v-4.333 h10.666v18.5h-8.501l0.001-4h-10.171l0.005-1.538H393V357.001z M393,453.167l3.167-1.833v-1.999H393v-73.834h16.001v51.666h15.666 v12.834h-10.833v13.833h15.667v6.167h7.583v-6.5h15.25v-18.667h14.333v19.167h14.5v15h-26.333v-2.916h-39.667l-6.833,6.416v10.333 H393V453.167z M449.667,595.169v10h-23v-10H444v-3.333h13v-14.168h-13v-10.333h33.333v9.666h-9.666v19.667H457v-1.499H449.667z M413.5,489.501v53.667h-13.667v-53.667H413.5z M576.375,580.585h-11v2.418h-0.75l-0.125,1.332h-1v1l-3.125,0.125v-1l-0.875-0.125 v-1.332h-0.875v-2.293h-12.5v-2.75h-8v19.25H532v4.461h0.001v4.667h6.166v10h4.5v23.166H537v10.334h-5.166v5.167H552v-8.834h4.5 v8.834h9.667v21.165h-11v-2.499h-25.5l-2.333,2.333v0.166h-15.667v-1.498h-34.334v1.498h-11h-7.5v-4.167h-24.667v4.167H393v-13.833 h2.666l-0.166-67.168H393v-44.001h21.834v12.333h-2.667v5.168h2.667v8.833h-2.501v5.333h2.501v12.334h-8.001l0.5,63.501h3.5 l4.5-4.167h46.5v-4.333h-2.5v-16.333H457v-13h1.666v-15.668h9.667v15.668h2.833v13H468.5v15.833h-2.167v5.335h4.833v2H519.5v-2 h7.751h0.083v-5.167l-6,0.006v-43.34h5.917v-4.833v-4.461h-4.126v-15.209H512.75V566.21h30.5v3h2.875v-3h11.25v-1.875h9.125v1.75 h9.875V580.585z M509.5,397.502l8-6.667h3.333v11.667l-1.333,2.333v9h-6.333l-11.417-11.416l3.5-3.5l-4.458-4.459l3.708-9.625 h13.375l-3.042,3.667l-8.208,0.208l-1.125,5.375L509.5,397.502z M597.5,405.668h-2.128l-0.039,36.834h-4.583v25.083h-11.5v2.75 H567.5v-3h-13.75v-4.5h-2.25v-3.5H547v9.75h-38.5v-17.75h8.5v2.25h8.25v-6.25h-4.5v-13h15.5v13h-5.5v6.5h8.5v-2.5H548v5.083h7 v-9.333l24.25,0.25v-4.833h1.583v-2.334h-4v-57.333h-1.166h-34.415l-0.002-11h-5v-0.167h-2.75v18h2.75v27.667h-13.125v-27.5h5.75 v-17.75h-5.5v6h-10.5v-6.125h-8.25v-2.25H487.5v2.375h-22v17.5h6v11h11.25v16.75h-23v-27.667h1.083v-17.667h-7.5v-15.416H487v8.75 h17.833v-8.75h31.417H579v1h17.833v25.25h0.667V405.668z");
quad.attr({fill: allPlaces['quad'].color, class: "building", id: 'quad'});
quad.data({'info': allPlaces['quad']});
regions.push(quad);

var bj = rsr.path("M 388.833,864.168 478.167,864.168 478.167,924.835 468.834,924.835 456.167,924.835   456.167,919.502 437.833,919.502 437.833,913.835 422.5,913.835 412.167,913.835 412.167,922.502 388.833,922.502  z");
bj.attr({fill: allPlaces['bj'].color, class: "building", id: 'bj'});
bj.data({'info': allPlaces['bj']});
regions.push(bj);

var southeast = rsr.path("M 581.583,560.835 595.25,560.835 595.25,575.335 597.25,575.335 597.25,589.835 595.833,589.835 595.833,593.668 595.25,593.668 595.25,660.334 597.25,660.334 597.25,676.834 581.583,676.834 581.583,675.334 572.583,675.334 572.583,665.25 580.667,665.25 583.375,662.542 583.375,593.75 581.583,593.75 z");
southeast.attr({fill: allPlaces['southeast'].color, class: "building", id: 'southeast'});
southeast.data({'info': allPlaces['southeast']});
regions.push(southeast);

var cathey = rsr.path("M422.833,924.835H407.5c0,0,0,12.328,0,12.333c0,0.372,1.667,1.166,1.891,1.289  c2.229,1.226,4.706,1.958,7.175,2.517c7.112,1.609,14.386,1.623,21.646,1.575c6.858-0.046,13.72,0.058,20.578-0.13  c0.251-0.007,4.377-0.075,4.377-0.084v-12.833H455.5v-4.667h-17.667v-11h-15.001L422.833,924.835z");
cathey.attr({fill: allPlaces['cathey'].color, class: "building", id: 'cathey'});
cathey.data({'info': allPlaces['cathey']});
regions.push(cathey);

var south = rsr.path("M471.833,949.168v4h-43.667v5.334H421.5v-3.667c0,0-4.167,1.334-14.595-0.518  c-8.071-2.315-14.071-6.815-14.071-6.815v66.666H480.5v-55.666h3v-9.334H471.833z M428.5,1002.002h-23.833v-30.667H428.5V1002.002z   M468.333,1002.002h-28v-35.167h28V1002.002z");
south.attr({fill: allPlaces["south"].color, class: "building", id: 'south'});
south.data({'info': allPlaces['south']});
regions.push(south);

var law = rsr.path("M586.168,919.17c-6.186,0-11.439,3.058-13.449,7.333h-2.551v-44.667h4.667v-0.334h0.367  c1.247,5.174,5.622,9.001,10.845,9.001c6.193,0,11.213-5.372,11.213-12.001c0-6.627-5.02-11.999-11.213-11.999  c-4.996,0-9.226,3.5-10.674,8.332l-23.871,0.001v49.999h-8.333v-5.332h-33.333v6.667h-8.333v-1.335h-32.667v10.001h41.333v17.667  h32.333V933.17h9.333v14.332h18v-12.666h3v-0.422c2.092,4.146,7.266,7.089,13.334,7.089c7.917,0,14.333-4.999,14.333-11.168  C600.501,924.169,594.084,919.17,586.168,919.17z");
law.attr({fill: allPlaces["law"].color, class: "building", id: 'law'});
law.data({'info': allPlaces['law']});
regions.push(law);

var harris = rsr.path("M694.25,864.335v27.25H674v-27.25h-50.75v58.75h81v-58.75H694.25z M651,906.585h-15.5v-25.5  H651V906.585z");
harris.attr({fill: allPlaces["harris"].color, class: "building", id: 'harris'});
harris.data({'info': allPlaces['harris']});
regions.push(harris);

var new_grad = rsr.rect(864.167, 864.335, 77.333, 41.166);
new_grad.attr({fill: allPlaces["new_grad"].color, class: "building", id: 'new_grad'});
new_grad.data({'info': allPlaces['new_grad']});
regions.push(new_grad);

var ida = rsr.path("M 750,629.085 790.5,629.085 790.5,655.085 792.667,655.085 792.667,648.585   813.25,648.585 813.25,674.335 750,674.335 750,660.585 767.75,660.585 767.75,639.335 750,639.335  z");
ida.attr({fill: allPlaces["ida"].color, class: "building", id: 'ida'});
ida.data({'info': allPlaces['ida']});
regions.push(ida);

var booth = rsr.path("M 759.75,531.335 804.75,531.335 804.75,535.835 816,535.835 816,538.335   818.75,538.335 818.75,568.585 822.5,568.585 822.5,630.085 811.25,630.085 811.25,639.835 795.75,639.835 795.75,622.585   793,622.585 793,587.835 767.75,587.835 767.75,597.085 756.25,597.085 756.25,595.585 750,595.585 750,577.585 747.5,577.585   747.5,544.333 759.75,544.333  z");
booth.attr({fill: allPlaces["booth"].color, class: "building", id: 'booth'});
booth.data({'info': allPlaces['booth']});
regions.push(booth);

var oriental = rsr.path("M670.167,562.501v-33.333H622.5v40.333h12v8.667h26.333v-8.333H671.5v-7.334H670.167z   M660.5,561.835h-27.667v-13.667H660.5V561.835z");
oriental.attr({fill: allPlaces["oriental"].color, class: "building", id: 'oriental'});
oriental.data({'info': allPlaces['oriental']});
regions.push(oriental);

var rock = rsr.path("M 684.833,585.585 684.833,603.835 695.833,603.835 695.833,618.501   685.167,618.501 685.167,651.71 670.5,651.71 670.5,618.646 665.5,618.646 665.5,604.835 671.5,604.835 671.5,585.585  z");
rock.attr({fill: allPlaces["rock"].color, class: "building", id: 'rock'});
rock.data({'info': allPlaces['rock']});
regions.push(rock);

var quadr = rsr.path("M 624.25,361.335 648.75,361.335 648.75,356.585 661.5,356.585 661.5,379.585   633.25,379.585 633.25,376.085 624.25,376.085  z");
quadr.attr({fill: allPlaces["quadr"].color, class: "building", id: 'quadr'});
quadr.data({'info': allPlaces['quadr']});
regions.push(quadr);

var saieh = rsr.path("M 695.836,483.166 695.836,485.166 686.5,485.166 686.5,445.835 670.25,445.835   670.25,483.166 665.336,483.166 642.25,483.166 629.836,483.166 627.086,485.916 627.086,490.833 629.669,490.833 629.836,507.5   648.669,507.5 648.669,499.666 665.669,499.666 665.669,492.333 672.669,492.333 672.669,499.916 680.336,499.916 680.336,492.333   683.5,492.333 698.169,492.333 698.169,507.5 705.169,507.5 705.169,505.166 709.669,505.166 709.669,483.166  z");
saieh.attr({fill: allPlaces["saieh"].color, class: "building", id: 'saieh'});
saieh.data({'info': allPlaces['saieh']});
regions.push(saieh);

var henry = rsr.rect(505, 120.335, 96, 43);
henry.attr({fill: allPlaces["henry"].color, class: "building", id: 'henry'});
henry.data({'info': allPlaces['henry']});
regions.push(henry);

var smart = rsr.path("M463.5,90.835v4h-12v-2.667h-7.333v70h38V90.835H463.5z M480.167,126.168h-33.333v-15.333  h33.333V126.168z");
smart.attr({fill: allPlaces["smart"].color, class: "building", id: 'smart'});
smart.data({'info': allPlaces['smart']});
regions.push(smart);

var alumni = rsr.path("M 740.5,144.835 767.5,144.835 767.5,160.335 757.5,160.335   757.5,154.835 740.5,154.835  z");
alumni.attr({fill: allPlaces["alumni"].color, class: "building", id: 'alumni'});
alumni.data({'info': allPlaces['alumni']});
regions.push(alumni);

var mansueto = rsr.ellipse(415.065, 285.758, 30.929, 16.543);
mansueto.transform("m0.1795 0.9838 -0.9838 0.1795 621.6856 -173.8553");
mansueto.attr({fill: allPlaces['mansueto'].color, class: "building", id: 'mansueto'});
mansueto.data({'info': allPlaces['mansueto']});
regions.push(mansueto);

var regenstein = rsr.path("M428.501,275.501l6.667-8.667v-20.667h15v-13.333h14.667v-10.333h16.333  v13.333h26.333v-3h7v-6.333h7v43h-6v5.333h-3v9.667h5.333v36.333h-4.333v-5.667h-4.333V312.5h-2.667v-9.333h-3.667V285.5h-21.333  v11.667c0,0,0,0-15.667,0v5.667c0,0,0,0-15.667,0v6.333h-15.333V277.5l-4,4.667L428.501,275.501z");
regenstein.attr({fill: allPlaces["regenstein"].color, class: "building", id: 'regenstein'});
regenstein.data({'info': allPlaces['regenstein']});
regions.push(regenstein);

var bartlett = rsr.path("M592.833,265.501v14.667h3.667v4.414h3.333v13.586h-2.667v5h-4v15.333  h-3.333v8h-15.667v-8h-2.667v-21h-4.333v-10.667h3.667c0-21.333,0-21.333,0-21.333l0,0H592.833z");
bartlett.attr({fill: allPlaces["bartlett"].color, class: "building", id: 'bartlett'});
bartlett.data({'info': allPlaces['bartlett']});
regions.push(bartlett);

var hutch = rsr.path("M 541.252,382.835 575.667,382.835 596.833,382.835 596.833,357.585   579,357.585 579,356.585 536.25,356.585 536.25,371.835 541.25,371.835  z");
hutch.attr({fill: allPlaces["hutch"].color, class: "building", id: 'hutch'});
hutch.data({'info': allPlaces['hutch']});
regions.push(hutch);

var snell = rsr.path("M 406,361.334 435.667,361.334 435.667,357.001 446.333,357.001   446.333,375.501 437.832,375.501 437.833,371.501 427.662,371.501 427.667,369.963 393,369.963 393,357.001 406,357.001  z");
snell.attr({fill: allPlaces["snell"].color, class: "building", id: 'snell'});
snell.data({'info': allPlaces['snell']});
regions.push(snell);

var reynolds = rsr.path("M 595.372,405.668 597.5,405.668 597.5,382.835 576.833,382.835   576.833,440.168 580.833,440.168 580.833,442.502 595.333,442.502  z");
reynolds.attr({fill: allPlaces["reynolds"].color, class: "building", id: 'reynolds'});
reynolds.data({'info': allPlaces['reynolds']});
regions.push(reynolds);

var mainNorth = rsr.path("M 536.25,417.335 536.25,389.668 533.5,389.668 533.5,371.668   536.25,371.668 536.25,356.585 504.833,356.585 504.833,365.335 487,365.335 487,356.585 453.333,356.585 453.333,372.001   460.833,372.001 460.833,389.668 459.75,389.668 459.75,417.335 482.75,417.335 482.75,400.585 471.5,400.585 471.5,389.585   465.5,389.585 465.5,372.085 487.5,372.085 487.5,369.71 504.625,369.71 504.625,371.96 512.875,371.96 512.875,378.085   523.375,378.085 523.375,372.085 528.875,372.085 528.875,389.835 523.125,389.835 523.125,417.335  z");
mainNorth.attr({fill: allPlaces["mainNorth"].color, class: "building", id: 'mainNorth'});
mainNorth.data({'info': allPlaces['mainNorth']});
regions.push(mainNorth);

var bookstore = rsr.path("M 353.167,480.168 371.501,480.168 371.501,507.168 339.834,507.168   339.834,489.168 352.834,488.502  z");
bookstore.attr({fill: allPlaces["bookstore"].color, class: "building", id: 'bookstore'});
bookstore.data({'info': allPlaces['bookstore']});
regions.push(bookstore);

var edward = rsr.rect(399.833, 489.501, 13.667, 53.667);
edward.attr({fill: allPlaces["edward"].color, class: "building", id: 'edward'});
edward.data({'info': allPlaces['edward']});
regions.push(edward);

var cobb = rsr.path("M 393,551.168 414.834,551.168 414.834,563.501 412.167,563.501   412.167,568.669 414.834,568.669 414.834,577.502 412.333,577.502 412.333,582.835 414.834,582.835 414.834,595.169 393,595.169  z");
cobb.attr({fill: allPlaces["cobb"].color, class: "building", id: 'cobb'});
cobb.data({'info': allPlaces['cobb']});
regions.push(cobb);

var swift = rsr.path("M 444,567.335 477.333,567.335 477.333,577.001 467.667,577.001   467.667,596.668 457,596.668 457,577.668 444,577.668  z");
swift.attr({fill: allPlaces["swift"].color, class: "building", id: 'swift'});
swift.data({'info': allPlaces['swift']});
regions.push(swift);

var bond = rsr.path("M 457,595.169 449.667,595.169 449.667,605.169 426.667,605.169   426.667,595.169 444,595.169 444,591.836 457,591.836  z");
bond.attr({fill: allPlaces["bond"].color, class: "building", id: 'bond'});
bond.data({'info': allPlaces['bond']});
regions.push(bond);

var classicsBuilds = rsr.path("M 395.5,595.169 406.833,595.169 407.333,658.67   410.833,658.67 415.333,654.503 461.833,654.503 461.833,650.17 459.333,650.17 459.333,633.837 457,633.837 457,620.837   458.666,620.837 458.666,605.169 468.333,605.169 468.333,620.837 471.166,620.837 471.166,633.837 468.5,633.837 468.5,649.67   466.333,649.67 466.333,676.17 458.833,676.17 458.833,672.003 434.166,672.003 434.166,676.17 393,676.17 393,662.337   395.666,662.337  z");
classicsBuilds.attr({fill: allPlaces["classicsBuilds"].color, class: "building", id: 'classicsBuilds'});
classicsBuilds.data({'info': allPlaces['classicsBuilds']});
regions.push(classicsBuilds);

var harper = rsr.path("M 466.333,655.005 471.166,655.005 471.166,657.005 519.5,657.005   519.5,655.005 527.334,655.005 527.334,676.17 511.667,676.17 511.667,674.672 477.333,674.672 477.333,676.17 466.333,676.17  z");
harper.attr({fill: allPlaces["harper"].color, class: "building", id: 'harper'});
harper.data({'info': allPlaces['harper']});
regions.push(harper);

var ssr = rsr.path("M 555.167,676.17 555.167,673.671 529.667,673.671 527.251,676.087   527.251,655.005 552,655.005 552,646.171 556.5,646.171 556.5,655.005 566.167,655.005 566.167,676.17  z");
ssr.attr({fill: allPlaces["ssr"].color, class: "building", id: 'ssr'});
ssr.data({'info': allPlaces['ssr']});
regions.push(ssr);

var stuart = rsr.path("M 527.334,649.838 527.334,655.005 531.834,655.005 531.834,649.838   537,649.838 537,639.504 542.667,639.504 542.667,616.338 538.167,616.338 538.167,606.338 532.001,606.338 532.001,601.671   527.251,601.671 527.251,606.504 521.334,606.504 521.334,649.844  z");
stuart.attr({fill: allPlaces["stuart"].color, class: "building", id: 'stuart'});
stuart.data({'info': allPlaces['stuart']});
regions.push(stuart);

var rosenwald = rsr.path("M 532,597.21 532,601.671 527.251,601.671 527.251,597.21   523.125,597.21 523.125,582.001 512.75,582.001 512.75,566.21 543.25,566.21 543.25,569.21 546.125,569.21 546.125,566.21   557.375,566.21 557.375,564.335 566.5,564.335 566.5,566.085 576.375,566.085 576.375,580.585 565.375,580.585 565.375,583.003   564.625,583.003 564.5,584.335 563.5,584.335 563.5,585.335 560.375,585.46 560.375,584.46 559.5,584.335 559.5,583.003   558.625,583.003 558.625,580.71 546.125,580.71 546.125,577.96 538.125,577.96 538.125,597.21  z");
rosenwald.attr({fill: allPlaces["rosenwald"].color, class: "building", id: 'rosenwald'});
rosenwald.data({'info': allPlaces['rosenwald']});
regions.push(rosenwald);

var ryeck = rsr.path("M 579.25,470.335 579.25,467.585 590.75,467.585 590.75,442.502   579.25,442.502 579.25,447.335 555,447.085 555,456.418 548,456.418 548,451.335 539.25,451.335 539.25,453.835 530.75,453.835   530.75,447.335 536.25,447.335 536.25,434.335 520.75,434.335 520.75,447.335 525.25,447.335 525.25,453.585 517,453.585   517,451.335 508.5,451.335 508.5,469.085 547,469.085 547,459.335 551.5,459.335 551.5,462.835 553.75,462.835 553.75,467.335   567.5,467.335 567.5,470.335  z");
ryeck.attr({fill: allPlaces["ryeck"].color, class: "building", id: 'ryeck'});
ryeck.data({'info': allPlaces['ryeck']});
regions.push(ryeck);

var ratner = rsr.path("M368.5,22.835h-26.25v-5H310.5v55.75h-2v13.5h2.5v34h-9.5v35.25h48.25v-35.25  h-4.25V94.979c1.181,0.389,2.439,0.606,3.75,0.606c6.627,0,12-5.372,12-12c0-2.503-0.769-4.827-2.08-6.75h9.33V22.835z");
ratner.attr({fill: allPlaces["ratner"].color, class: "building", id: 'ratner'});
ratner.data({'info': allPlaces['ratner']});
regions.push(ratner);

var physics = rsr.set();
physics.attr({fill: allPlaces["physics"].color, class: "building", id: 'physics'});
physics.data({'info': allPlaces['physics']});
//regions.push(physics);

var physics5 = rsr.path("M 368.167,255.21 368.5,182.602 339.834,182.602 340.167,255.21 338.667,255.21    338.667,316.354 305.5,316.354 305.5,332.834 371.833,332.834 371.833,255.21   z");
physics5.attr({fill: allPlaces["physics"].color, class: "building", id: 'physics'});
physics5.data({'info': allPlaces['physics']});
regions.push(physics5);

var physics4 = rsr.rect(316.833, 182.602, 18, 39.899);
physics4.attr({fill: allPlaces["physics"].color, class: "building", id: 'physics'});
physics4.data({'info': allPlaces['physics']});
regions.push(physics4);

var physics3 = rsr.rect(282.75, 182.602, 30.5, 35.983);
physics3.attr({fill: allPlaces["physics"].color, class: "building", id: 'physics'});
physics3.data({'info': allPlaces['physics']});
regions.push(physics3);

var physics2 = rsr.rect(231.5, 206.835, 23.25, 31.5);
physics2.attr({fill: allPlaces["physics"].color, class: "building", id: 'physics'});
physics2.data({'info': allPlaces['physics']});
regions.push(physics2);

var physics1 = rsr.path("M 340.5,358.585 337.5,358.585 337.5,357.001 335.5,357.001 335.5,355.085    301.5,355.085 301.5,375.501 303.5,375.501 322.25,401.085 328.5,401.085 328.5,395.085 331,395.085 331,380.96 333.5,380.96    333.5,369.71 337.75,369.71 337.75,366.251 340.75,366.251 340.75,384.835 360.75,384.835 360.75,396.335 354,396.335 354,401.335    360.75,401.335 360.75,406.835 363.75,406.835 363.75,403.335 370,403.335 370,375.501 371.833,375.501 371.833,355.085    340.5,355.085   z");
physics1.attr({fill: allPlaces["physics"].color, class: "building", id: 'physics'});
physics1.data({'info': allPlaces['physics']});
regions.push(physics1);

var med = rsr.set();
med.attr({fill: allPlaces["med"].color, class: "building", id: 'med'});
med.data({'info': allPlaces['med']});
//regions.push(med);

var med6 = rsr.rect(260.5, 468.835, 35, 30.333);
med6.attr({fill: allPlaces["med"].color, class: "building", id: 'med'});
med6.data({'info': allPlaces['med']});
regions.push(med6);

var med5 = rsr.path("M 221.5,457.168 221.5,507.168 242.167,507.168 242.167,500.335 257.167,500.335    257.167,486.001 244.833,486.001 244.833,472.335 241.167,472.335 241.167,457.168   z");
med5.attr({fill: allPlaces["med"].color, class: "building", id: 'med'});
med5.data({'info': allPlaces['med']});
regions.push(med5);

var med4 = rsr.path("M 301.5,355.085 221.667,355.085 221.667,436.335 247.5,436.335 247.5,375.335    301.5,375.335   z");
med4.attr({fill: allPlaces["med"].color, class: "building", id: 'med'});
med4.data({'info': allPlaces['med']});
regions.push(med4);

var med3 = rsr.path("M 292.833,246.835 262.833,246.835 262.833,277.502 264.333,277.502 264.333,285.782    262.833,285.782 262.833,332.002 292.833,332.002   z");
med3.attr({fill: allPlaces["med"].color, class: "building", id: 'med'});
med3.data({'info': allPlaces['med']});
regions.push(med3);

var med2 = rsr.path("M 256.501,295.834 252.834,295.834 252.834,256.834 246.501,256.834 246.501,246.835    225.667,246.835 225.667,249.501 222.001,249.501 222.001,290.834 220.334,290.834 220.334,332.002 256.501,332.002   z");
med2.attr({fill: allPlaces["med"].color, class: "building", id: 'med'});
med2.data({'info': allPlaces['med']});
regions.push(med2);

var med1 = rsr.path("M330.167,582.001v-8.832H352.5v-44.667h-6.333v-3h-81.333v25.666h-33v16.167l7,3.834H264.5   v10.832h-12.333v5.834h-22v-14.666L227,570.003h-38.5v-5.668h37.667v-40.167h-50.334v-11.666h-14.667v-6h33v-26h-11v10h-9.333v-6   h-12v-7.333h4.333v-2.333H195.5l-0.333-55.001h-21.333v-8h-8.667v6.667h-11v-18.667h-7.333v1.333H145.5v12l-9.333-0.333   l-5.999,23.5h-19v-38.833h-6.833v9.333H95.5v-8.167H85.333v8.167h-3.167v10.833h-9.833v-6.5h-4.667V395.71H197.5v-40.625H52v40.625   h10.5v15.459H52v86.5h10.166v25h-9.167v151.164h54.334V546.498h14.622v3.667H132v13.166h42.666v5.5l4.75,4.75h26.917v14.75H200.5   v-10.833h-65.667v3.667H131.5v16l2,2v78.833H199v-26.167h9.667v3.667h5.833v-3.833h10v26.333h52.334v-29.001h17.499v3.499h7.5v-3.5   H318.5v29.002h53v-95.997H330.167L330.167,582.001z M132.833,524.168V536.5h-10.879v4.335h-14.788v-18H67.833v-25.333H72.5v-2   h5.333c0,0,10-15.333,28.999-20.333v-12.333h4v-21.333h21v48.333H151.5v3.667h4v23.667h16l0.333,6.667l3.988,0.332L132.833,524.168   L132.833,524.168z M147,598.335h34.5v29.5H147V598.335z M187.833,664.502h-16v7.834h-11v-8h-13.5v-16.167h40.5V664.502z    M229.5,599.168h-4v32h-26.333v-40H229.5V599.168z M242,665.835h-7v-20h7V665.835z M264.5,665.835h-7v-20h7V665.835z    M264.833,628.835h-15v-6.667h-11.667v-22.666h-4v-8.667h18v4h12.667V628.835z M330.833,602.835h9.333v23h18.667v10h-28V602.835z    M276.5,581.835v-44.333h39.333v44.667H304.5v-9h6.333v-13.333h-7v-7h-13.667v7h-5.333v13.667h6v8.333L276.5,581.835L276.5,581.835   z M318.833,636.502h-14v-6h-22v-33.334h36V636.502z M360.167,663.835h-30v-15h30V663.835z");
med1.attr({fill: allPlaces["med"].color, class: "building", id: 'med'});
med1.data({'info': allPlaces['med']});
regions.push(med1);

var logan = rsr.set();
logan.attr({fill: allPlaces["logan"].color, class: "building", id: 'logan'});
logan.data({'info': allPlaces['logan']});
//regions.push(logan);

var logan2 = rsr.path("M 193.5,909.503 193.5,890.17 211.5,890.17 211.5,866.17 190.916,866.253    190.916,863.67 165.5,863.67 165.5,913.335 169.5,913.335 169.5,923.835 165.5,923.835 165.5,937.835 249,937.835 249,909.503   z");
logan2.attr({fill: allPlaces["logan"].color, class: "building", id: 'logan'});
logan2.data({'info': allPlaces['logan']});
regions.push(logan2);
var logan1 = rsr.path("M 245.5,872.337 223.5,872.337 223.5,899.837 214.833,899.837 214.833,907.17    245.5,907.17   z");
logan1.attr({fill: allPlaces["logan"].color, class: "building", id: 'logan'});
logan1.data({'info': allPlaces['logan']});
regions.push(logan1);

var eastBuild = rsr.set();
eastBuild.attr({fill: allPlaces["eastBuild"].color, class: "building", id: 'eastBuild'});
eastBuild.data({'info': allPlaces['eastBuild']});
//regions.push(eastBuild);

var eastBuild4 = rsr.rect(629.25, 416.335, 23.75, 10.25);
eastBuild4.attr({fill: allPlaces["eastBuild"].color, class: "building", id: 'eastBuild'});
eastBuild4.data({'info': allPlaces['eastBuild']});
regions.push(eastBuild4);
var eastBuild3 = rsr.rect(629.25, 432.585, 26.5, 8.5);
eastBuild3.attr({fill: allPlaces["eastBuild"].color, class: "building", id: 'eastBuild'});
eastBuild3.data({'info': allPlaces['eastBuild']});
regions.push(eastBuild3);
var eastBuild2 = rsr.rect(629.25, 444.835, 18.25, 9);
eastBuild2.attr({fill: allPlaces["eastBuild"].color, class: "building", id: 'eastBuild'});
eastBuild2.data({'info': allPlaces['eastBuild']});
regions.push(eastBuild2)
var eastBuild1 = rsr.rect(629.25, 457.085, 18.5, 8.75);
eastBuild1.attr({fill: allPlaces["eastBuild"].color, class: "building", id: 'eastBuild'});
eastBuild1.data({'info': allPlaces['eastBuild']});
regions.push(eastBuild1);

var multi = rsr.set();
multi.attr({fill: allPlaces["multi"].color, class: "building", id: 'multi'});
multi.data({'info': allPlaces['multi']});
//regions.push(multi);

var multi3 = rsr.rect(671.5, 368.085, 8, 9.25)
multi3.attr({fill: allPlaces["multi"].color, class: "building", id: 'multi'});
multi3.data({'info': allPlaces['multi']});
regions.push(multi3);
var multi2 = rsr.rect(671.5, 380.835, 8, 12.25)
multi2.attr({fill: allPlaces["multi"].color, class: "building", id: 'multi'});
multi2.data({'info': allPlaces['multi']});
regions.push(multi2);
var multi1 = rsr.rect(694.25, 377.335, 15.419, 11.5)
multi1.attr({fill: allPlaces["multi"].color, class: "building", id: 'multi'});
multi1.data({'info': allPlaces['multi']});
regions.push(multi1);

var north = rsr.set();
north.attr({fill: allPlaces["north"].color, class: "building", id: 'north'});
north.data({'info': allPlaces['north']});
//regions.push(north);

var north2 = rsr.path("M581.75,21.335c1.25-5.5,0.25-13,0.25-13s-16.009-1.847-39.495,0.5   C535,9.585,512,16.335,512,16.335v10.5l21-4.5v22h-20v26l19.5-0.5c0,0,5.051-2.701,6-3.5c1.426-1.201,3.5-4.5,3.5-4.5l3.25,3.25   L577,32.335C577,32.335,581.413,22.818,581.75,21.335z");
north2.attr({fill: allPlaces["north"].color, class: "building", id: 'north'});
north2.data({'info': allPlaces['north']});
regions.push(north2);
var north1 = rsr.path("M594.75,29.835c0,0-6.75,3.25-9,5.25s-8.25,7-8.25,7l3,3.5   c0,0-5.5,0.5-14.5,14.75c-3.114,4.93-5.75,11.25-5.75,11.25s-1,2-1.5,6.25c0.25,5,0,27.5,0,27.5h10.75c0,0-0.5-15.75,0.75-28.25   c0.531-5.315,5.085-10.606,8-15.75c4.25-7.5,7-9.75,8.5-11.75s8.75-1.75,8.75-1.75s0.25,7.75-0.25,16.25s-5.75,34.5-5.75,34.5   l10.5-0.5l6.25-38v-30.25H594.75z");
north1.attr({fill: allPlaces["north"].color, class: "building", id: 'north'});
north1.data({'info': allPlaces['north']});
regions.push(north1);

var northBuild = rsr.set();
northBuild.attr({fill: allPlaces["northBuild"].color, class: "building", id: 'northBuild'});
northBuild.data({'info': allPlaces['northBuild']});
//regions.push(northBuild);

var northBuild2 = rsr.path("M432.167,92.168H397.5c0,0-1.667,5.667,0.667,12.667   s3.333,8.667,3.333,8.667l2-3.333l9.333-0.667l3.333,4l7.333-0.667v-2.667h5.333l4-0.667L432.167,92.168z");
northBuild2.attr({fill: allPlaces["northBuild"].color, class: "building", id: 'northBuild'});
northBuild2.data({'info': allPlaces['northBuild']});
regions.push(northBuild2);
var northBuild1 = rsr.path("M 396.833,151.501 393.5,151.501 393.5,156.168 397.5,156.168    397.5,159.501 406.167,159.501 406.167,162.835 411.5,162.835 411.5,160.168 421.5,160.168 421.5,147.501 396.833,147.501   z");
northBuild1.attr({fill: allPlaces["northBuild"].color, class: "building", id: 'northBuild'});
northBuild1.data({'info': allPlaces['northBuild']});
regions.push(northBuild1);

var maxp = rsr.set();
maxp.attr({fill: allPlaces["maxp"].color, class: "building", id: 'maxp'});
maxp.data({'info': allPlaces['maxp']});
//regions.push(maxp);


var maxp3 = rsr.path("M 543.488,182.602 543.467,201.267 569.967,201.267 569.967,194.101    576.8,194.101 576.8,236.767 572.8,236.767 572.8,230.434 539.3,230.434 539.3,245.934 590.8,245.934 590.8,241.269    593.134,241.269 593.134,182.602   z");
maxp3.attr({fill: allPlaces["maxp"].color, class: "building", id: 'maxp'});
maxp3.data({'info': allPlaces['maxp']});
regions.push(maxp3);
var maxp2 = rsr.rect(444.8, 182.602, 84.25, 17.083);
maxp2.attr({fill: allPlaces["maxp"].color, class: "building", id: 'maxp'});
maxp2.data({'info': allPlaces['maxp']});
regions.push(maxp2);
var maxp1 = rsr.path("M 394.8,223.435 399.8,223.435 399.8,228.685 407.3,228.685    407.3,223.435 410.05,223.435 410.05,199.685 432.3,199.685 432.3,182.602 394.8,182.602   z");
maxp1.attr({fill: allPlaces["maxp"].color, class: "building", id: 'maxp'});
maxp1.data({'info': allPlaces['maxp']});
regions.push(maxp1);

var lab = rsr.set();
lab.attr({fill: allPlaces["lab"].color, class: "building", id: 'lab'});
lab.data({'info': allPlaces['lab']});
//regions.push(lab);

var lab2 = rsr.path("M 466.667,454.001 466.667,434.834 452.334,434.834 452.334,453.501    437.084,453.501 437.084,460.001 429.501,460.001 429.501,453.834 413.834,453.834 413.834,440.001 424.667,440.001    424.667,427.167 409.001,427.167 409.001,375.501 393,375.501 393,449.335 396.167,449.335 396.167,451.334 393,453.167    393,482.834 408.334,482.834 408.334,472.501 415.167,466.085 454.834,466.085 454.834,469.001 481.167,469.001 481.167,454.001      z");
lab2.attr({fill: allPlaces["lab"].color, class: "building", id: 'lab'});
lab2.data({'info': allPlaces['lab']});
regions.push(lab2);
var lab1 = rsr.rect(342.167, 424.502, 26, 45.667);
lab1.attr({fill: allPlaces["lab"].color, class: "building", id: 'lab'});
lab1.data({'info': allPlaces['lab']});
regions.push(lab1);

var mid = rsr.set(); 
mid.attr({fill: allPlaces["mid"].color, class: "building", id: 'mid'});
mid.data({'info': allPlaces['mid']});

var mid1 = rsr.path("M383.549,743.236v56.683h336.6v-56.683H383.549z M563.364,771.452 c-1.403,8.688-5.919,14.337-17.659,15.385h-8.973h-8.972c-11.74-1.048-16.255-6.697-17.658-15.385h-0.036 c0.005-0.035,0.013-0.066,0.018-0.099c-0.006-0.036-0.014-0.068-0.019-0.103h0.037c1.403-8.688,5.918-14.337,17.658-15.385h17.943 c11.741,1.048,16.256,6.697,17.659,15.385h0.036c-0.005,0.035-0.013,0.066-0.018,0.099c0.006,0.036,0.014,0.068,0.019,0.103 H563.364z")
mid1.attr({fill: allPlaces["mid"].color, class: "building", id: 'mid'});
mid1.data({'info': allPlaces['mid']});
regions.push(mid1);
var mid2 = rsr.rect(383.549, 693.265, 336.6, 38.176);
mid2.attr({fill: allPlaces["mid"].color, class: "building", id: 'mid'});
mid2.data({'info': allPlaces['mid']});
regions.push(mid2);
var mid3 = rsr.rect(383.549, 811.715, 336.6, 34.999);
mid3.attr({fill: allPlaces["mid"].color, class: "building", id: 'mid'});
mid3.data({'info': allPlaces['mid']});
regions.push(mid3);


var rsrGroups = [physics,med,logan,eastBuild,multi,north,northBuild,maxp,lab,midway];
physics.push(
	physics5 ,
	physics4 ,
	physics3 ,
	physics2 ,
	physics1
);
med.push(
	med6 ,
	med5 ,
	med4 ,
	med3 ,
	med2 ,
	med1
);
logan.push(
	logan2 ,
	logan1
);
eastBuild.push(
	eastBuild4 ,
	eastBuild3 ,
	eastBuild2 ,
	eastBuild1
);
multi.push(
	multi3 ,
	multi2 ,
	multi1
);
north.push(
	north2 ,
	north1
);
northBuild.push(
	northBuild2 ,
	northBuild1
);
maxp.push(
	maxp3 ,
	maxp2 ,
	maxp1
);
lab.push(
	lab2 ,
	lab1
);
mid.push(
	mid1 ,
	mid2 ,
	mid3
);
