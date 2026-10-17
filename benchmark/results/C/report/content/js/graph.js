/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 14.0, "minX": 0.0, "maxY": 4580.0, "series": [{"data": [[0.0, 14.0], [0.1, 14.0], [0.2, 14.0], [0.3, 14.0], [0.4, 14.0], [0.5, 14.0], [0.6, 14.0], [0.7, 14.0], [0.8, 15.0], [0.9, 15.0], [1.0, 15.0], [1.1, 15.0], [1.2, 15.0], [1.3, 15.0], [1.4, 15.0], [1.5, 15.0], [1.6, 15.0], [1.7, 15.0], [1.8, 15.0], [1.9, 15.0], [2.0, 16.0], [2.1, 16.0], [2.2, 16.0], [2.3, 16.0], [2.4, 16.0], [2.5, 16.0], [2.6, 16.0], [2.7, 16.0], [2.8, 16.0], [2.9, 16.0], [3.0, 16.0], [3.1, 16.0], [3.2, 16.0], [3.3, 16.0], [3.4, 16.0], [3.5, 16.0], [3.6, 16.0], [3.7, 16.0], [3.8, 16.0], [3.9, 16.0], [4.0, 16.0], [4.1, 16.0], [4.2, 16.0], [4.3, 16.0], [4.4, 17.0], [4.5, 17.0], [4.6, 17.0], [4.7, 17.0], [4.8, 17.0], [4.9, 17.0], [5.0, 17.0], [5.1, 17.0], [5.2, 17.0], [5.3, 17.0], [5.4, 17.0], [5.5, 17.0], [5.6, 17.0], [5.7, 17.0], [5.8, 17.0], [5.9, 17.0], [6.0, 17.0], [6.1, 17.0], [6.2, 17.0], [6.3, 17.0], [6.4, 17.0], [6.5, 18.0], [6.6, 18.0], [6.7, 18.0], [6.8, 18.0], [6.9, 18.0], [7.0, 18.0], [7.1, 18.0], [7.2, 18.0], [7.3, 18.0], [7.4, 18.0], [7.5, 18.0], [7.6, 18.0], [7.7, 18.0], [7.8, 18.0], [7.9, 18.0], [8.0, 18.0], [8.1, 18.0], [8.2, 18.0], [8.3, 18.0], [8.4, 18.0], [8.5, 18.0], [8.6, 18.0], [8.7, 18.0], [8.8, 18.0], [8.9, 18.0], [9.0, 19.0], [9.1, 19.0], [9.2, 19.0], [9.3, 19.0], [9.4, 19.0], [9.5, 19.0], [9.6, 19.0], [9.7, 19.0], [9.8, 19.0], [9.9, 19.0], [10.0, 19.0], [10.1, 19.0], [10.2, 19.0], [10.3, 19.0], [10.4, 19.0], [10.5, 19.0], [10.6, 19.0], [10.7, 19.0], [10.8, 19.0], [10.9, 19.0], [11.0, 19.0], [11.1, 19.0], [11.2, 19.0], [11.3, 19.0], [11.4, 20.0], [11.5, 20.0], [11.6, 20.0], [11.7, 20.0], [11.8, 20.0], [11.9, 20.0], [12.0, 20.0], [12.1, 20.0], [12.2, 20.0], [12.3, 20.0], [12.4, 20.0], [12.5, 20.0], [12.6, 20.0], [12.7, 20.0], [12.8, 20.0], [12.9, 20.0], [13.0, 21.0], [13.1, 21.0], [13.2, 21.0], [13.3, 21.0], [13.4, 21.0], [13.5, 21.0], [13.6, 21.0], [13.7, 21.0], [13.8, 21.0], [13.9, 21.0], [14.0, 21.0], [14.1, 21.0], [14.2, 21.0], [14.3, 21.0], [14.4, 21.0], [14.5, 21.0], [14.6, 22.0], [14.7, 22.0], [14.8, 22.0], [14.9, 22.0], [15.0, 22.0], [15.1, 22.0], [15.2, 22.0], [15.3, 22.0], [15.4, 22.0], [15.5, 22.0], [15.6, 22.0], [15.7, 23.0], [15.8, 23.0], [15.9, 23.0], [16.0, 23.0], [16.1, 23.0], [16.2, 23.0], [16.3, 23.0], [16.4, 23.0], [16.5, 23.0], [16.6, 23.0], [16.7, 23.0], [16.8, 23.0], [16.9, 23.0], [17.0, 23.0], [17.1, 23.0], [17.2, 23.0], [17.3, 23.0], [17.4, 23.0], [17.5, 23.0], [17.6, 23.0], [17.7, 24.0], [17.8, 24.0], [17.9, 24.0], [18.0, 24.0], [18.1, 24.0], [18.2, 24.0], [18.3, 24.0], [18.4, 24.0], [18.5, 24.0], [18.6, 24.0], [18.7, 24.0], [18.8, 24.0], [18.9, 25.0], [19.0, 25.0], [19.1, 25.0], [19.2, 25.0], [19.3, 25.0], [19.4, 25.0], [19.5, 25.0], [19.6, 25.0], [19.7, 25.0], [19.8, 25.0], [19.9, 25.0], [20.0, 25.0], [20.1, 25.0], [20.2, 25.0], [20.3, 25.0], [20.4, 25.0], [20.5, 25.0], [20.6, 25.0], [20.7, 26.0], [20.8, 26.0], [20.9, 26.0], [21.0, 26.0], [21.1, 26.0], [21.2, 26.0], [21.3, 26.0], [21.4, 26.0], [21.5, 26.0], [21.6, 26.0], [21.7, 26.0], [21.8, 27.0], [21.9, 27.0], [22.0, 27.0], [22.1, 27.0], [22.2, 27.0], [22.3, 27.0], [22.4, 27.0], [22.5, 27.0], [22.6, 27.0], [22.7, 27.0], [22.8, 27.0], [22.9, 27.0], [23.0, 27.0], [23.1, 27.0], [23.2, 27.0], [23.3, 27.0], [23.4, 27.0], [23.5, 27.0], [23.6, 27.0], [23.7, 28.0], [23.8, 28.0], [23.9, 28.0], [24.0, 28.0], [24.1, 28.0], [24.2, 28.0], [24.3, 28.0], [24.4, 28.0], [24.5, 29.0], [24.6, 29.0], [24.7, 30.0], [24.8, 30.0], [24.9, 30.0], [25.0, 30.0], [25.1, 31.0], [25.2, 31.0], [25.3, 31.0], [25.4, 32.0], [25.5, 32.0], [25.6, 32.0], [25.7, 32.0], [25.8, 32.0], [25.9, 32.0], [26.0, 33.0], [26.1, 33.0], [26.2, 33.0], [26.3, 33.0], [26.4, 34.0], [26.5, 34.0], [26.6, 34.0], [26.7, 34.0], [26.8, 34.0], [26.9, 34.0], [27.0, 34.0], [27.1, 34.0], [27.2, 34.0], [27.3, 35.0], [27.4, 35.0], [27.5, 35.0], [27.6, 35.0], [27.7, 36.0], [27.8, 36.0], [27.9, 36.0], [28.0, 36.0], [28.1, 37.0], [28.2, 37.0], [28.3, 38.0], [28.4, 39.0], [28.5, 39.0], [28.6, 39.0], [28.7, 40.0], [28.8, 40.0], [28.9, 40.0], [29.0, 41.0], [29.1, 41.0], [29.2, 41.0], [29.3, 42.0], [29.4, 42.0], [29.5, 43.0], [29.6, 44.0], [29.7, 44.0], [29.8, 44.0], [29.9, 45.0], [30.0, 45.0], [30.1, 45.0], [30.2, 45.0], [30.3, 45.0], [30.4, 46.0], [30.5, 46.0], [30.6, 46.0], [30.7, 47.0], [30.8, 47.0], [30.9, 48.0], [31.0, 48.0], [31.1, 49.0], [31.2, 49.0], [31.3, 51.0], [31.4, 51.0], [31.5, 51.0], [31.6, 51.0], [31.7, 52.0], [31.8, 54.0], [31.9, 55.0], [32.0, 55.0], [32.1, 55.0], [32.2, 57.0], [32.3, 58.0], [32.4, 58.0], [32.5, 59.0], [32.6, 59.0], [32.7, 61.0], [32.8, 61.0], [32.9, 61.0], [33.0, 61.0], [33.1, 62.0], [33.2, 62.0], [33.3, 62.0], [33.4, 63.0], [33.5, 64.0], [33.6, 64.0], [33.7, 65.0], [33.8, 67.0], [33.9, 67.0], [34.0, 69.0], [34.1, 72.0], [34.2, 74.0], [34.3, 74.0], [34.4, 75.0], [34.5, 76.0], [34.6, 77.0], [34.7, 77.0], [34.8, 78.0], [34.9, 79.0], [35.0, 80.0], [35.1, 82.0], [35.2, 85.0], [35.3, 89.0], [35.4, 91.0], [35.5, 94.0], [35.6, 94.0], [35.7, 95.0], [35.8, 95.0], [35.9, 97.0], [36.0, 106.0], [36.1, 107.0], [36.2, 108.0], [36.3, 113.0], [36.4, 114.0], [36.5, 115.0], [36.6, 116.0], [36.7, 116.0], [36.8, 116.0], [36.9, 116.0], [37.0, 120.0], [37.1, 122.0], [37.2, 125.0], [37.3, 127.0], [37.4, 135.0], [37.5, 138.0], [37.6, 139.0], [37.7, 145.0], [37.8, 149.0], [37.9, 154.0], [38.0, 158.0], [38.1, 158.0], [38.2, 161.0], [38.3, 165.0], [38.4, 167.0], [38.5, 178.0], [38.6, 193.0], [38.7, 199.0], [38.8, 200.0], [38.9, 208.0], [39.0, 214.0], [39.1, 216.0], [39.2, 221.0], [39.3, 222.0], [39.4, 224.0], [39.5, 229.0], [39.6, 242.0], [39.7, 253.0], [39.8, 254.0], [39.9, 256.0], [40.0, 261.0], [40.1, 275.0], [40.2, 276.0], [40.3, 281.0], [40.4, 286.0], [40.5, 292.0], [40.6, 300.0], [40.7, 302.0], [40.8, 325.0], [40.9, 343.0], [41.0, 347.0], [41.1, 355.0], [41.2, 361.0], [41.3, 368.0], [41.4, 380.0], [41.5, 380.0], [41.6, 399.0], [41.7, 401.0], [41.8, 429.0], [41.9, 430.0], [42.0, 454.0], [42.1, 460.0], [42.2, 461.0], [42.3, 476.0], [42.4, 486.0], [42.5, 494.0], [42.6, 515.0], [42.7, 524.0], [42.8, 543.0], [42.9, 574.0], [43.0, 577.0], [43.1, 592.0], [43.2, 596.0], [43.3, 607.0], [43.4, 615.0], [43.5, 619.0], [43.6, 631.0], [43.7, 631.0], [43.8, 652.0], [43.9, 661.0], [44.0, 673.0], [44.1, 686.0], [44.2, 688.0], [44.3, 693.0], [44.4, 734.0], [44.5, 740.0], [44.6, 742.0], [44.7, 744.0], [44.8, 769.0], [44.9, 770.0], [45.0, 777.0], [45.1, 792.0], [45.2, 794.0], [45.3, 795.0], [45.4, 807.0], [45.5, 815.0], [45.6, 837.0], [45.7, 845.0], [45.8, 858.0], [45.9, 865.0], [46.0, 871.0], [46.1, 918.0], [46.2, 921.0], [46.3, 930.0], [46.4, 932.0], [46.5, 939.0], [46.6, 957.0], [46.7, 960.0], [46.8, 963.0], [46.9, 982.0], [47.0, 991.0], [47.1, 991.0], [47.2, 1000.0], [47.3, 1010.0], [47.4, 1012.0], [47.5, 1015.0], [47.6, 1035.0], [47.7, 1067.0], [47.8, 1069.0], [47.9, 1071.0], [48.0, 1075.0], [48.1, 1077.0], [48.2, 1090.0], [48.3, 1104.0], [48.4, 1110.0], [48.5, 1115.0], [48.6, 1123.0], [48.7, 1124.0], [48.8, 1125.0], [48.9, 1126.0], [49.0, 1128.0], [49.1, 1139.0], [49.2, 1140.0], [49.3, 1143.0], [49.4, 1160.0], [49.5, 1163.0], [49.6, 1168.0], [49.7, 1173.0], [49.8, 1178.0], [49.9, 1188.0], [50.0, 1199.0], [50.1, 1215.0], [50.2, 1216.0], [50.3, 1228.0], [50.4, 1233.0], [50.5, 1235.0], [50.6, 1243.0], [50.7, 1257.0], [50.8, 1258.0], [50.9, 1260.0], [51.0, 1267.0], [51.1, 1269.0], [51.2, 1272.0], [51.3, 1279.0], [51.4, 1279.0], [51.5, 1292.0], [51.6, 1296.0], [51.7, 1307.0], [51.8, 1314.0], [51.9, 1316.0], [52.0, 1324.0], [52.1, 1327.0], [52.2, 1327.0], [52.3, 1335.0], [52.4, 1344.0], [52.5, 1347.0], [52.6, 1360.0], [52.7, 1370.0], [52.8, 1378.0], [52.9, 1379.0], [53.0, 1382.0], [53.1, 1394.0], [53.2, 1399.0], [53.3, 1400.0], [53.4, 1419.0], [53.5, 1428.0], [53.6, 1434.0], [53.7, 1445.0], [53.8, 1462.0], [53.9, 1469.0], [54.0, 1478.0], [54.1, 1491.0], [54.2, 1497.0], [54.3, 1501.0], [54.4, 1513.0], [54.5, 1526.0], [54.6, 1537.0], [54.7, 1540.0], [54.8, 1584.0], [54.9, 1594.0], [55.0, 1602.0], [55.1, 1612.0], [55.2, 1622.0], [55.3, 1626.0], [55.4, 1641.0], [55.5, 1650.0], [55.6, 1658.0], [55.7, 1660.0], [55.8, 1660.0], [55.9, 1671.0], [56.0, 1681.0], [56.1, 1684.0], [56.2, 1693.0], [56.3, 1716.0], [56.4, 1718.0], [56.5, 1727.0], [56.6, 1737.0], [56.7, 1739.0], [56.8, 1743.0], [56.9, 1748.0], [57.0, 1771.0], [57.1, 1794.0], [57.2, 1796.0], [57.3, 1798.0], [57.4, 1800.0], [57.5, 1800.0], [57.6, 1801.0], [57.7, 1802.0], [57.8, 1805.0], [57.9, 1813.0], [58.0, 1822.0], [58.1, 1831.0], [58.2, 1838.0], [58.3, 1841.0], [58.4, 1842.0], [58.5, 1851.0], [58.6, 1853.0], [58.7, 1856.0], [58.8, 1858.0], [58.9, 1871.0], [59.0, 1874.0], [59.1, 1887.0], [59.2, 1888.0], [59.3, 1897.0], [59.4, 1900.0], [59.5, 1910.0], [59.6, 1916.0], [59.7, 1918.0], [59.8, 1922.0], [59.9, 1928.0], [60.0, 1939.0], [60.1, 1948.0], [60.2, 1963.0], [60.3, 1973.0], [60.4, 1978.0], [60.5, 1979.0], [60.6, 1989.0], [60.7, 1990.0], [60.8, 1990.0], [60.9, 1999.0], [61.0, 2007.0], [61.1, 2012.0], [61.2, 2019.0], [61.3, 2021.0], [61.4, 2022.0], [61.5, 2030.0], [61.6, 2037.0], [61.7, 2048.0], [61.8, 2060.0], [61.9, 2067.0], [62.0, 2074.0], [62.1, 2075.0], [62.2, 2075.0], [62.3, 2089.0], [62.4, 2092.0], [62.5, 2101.0], [62.6, 2106.0], [62.7, 2109.0], [62.8, 2117.0], [62.9, 2118.0], [63.0, 2118.0], [63.1, 2119.0], [63.2, 2128.0], [63.3, 2128.0], [63.4, 2129.0], [63.5, 2139.0], [63.6, 2143.0], [63.7, 2147.0], [63.8, 2172.0], [63.9, 2178.0], [64.0, 2183.0], [64.1, 2192.0], [64.2, 2212.0], [64.3, 2222.0], [64.4, 2224.0], [64.5, 2228.0], [64.6, 2245.0], [64.7, 2248.0], [64.8, 2258.0], [64.9, 2267.0], [65.0, 2267.0], [65.1, 2276.0], [65.2, 2283.0], [65.3, 2283.0], [65.4, 2287.0], [65.5, 2302.0], [65.6, 2319.0], [65.7, 2322.0], [65.8, 2328.0], [65.9, 2348.0], [66.0, 2361.0], [66.1, 2376.0], [66.2, 2381.0], [66.3, 2396.0], [66.4, 2409.0], [66.5, 2427.0], [66.6, 2433.0], [66.7, 2437.0], [66.8, 2464.0], [66.9, 2497.0], [67.0, 2500.0], [67.1, 2506.0], [67.2, 2537.0], [67.3, 2574.0], [67.4, 2590.0], [67.5, 2614.0], [67.6, 2633.0], [67.7, 2636.0], [67.8, 2655.0], [67.9, 2656.0], [68.0, 2669.0], [68.1, 2690.0], [68.2, 2693.0], [68.3, 2697.0], [68.4, 2698.0], [68.5, 2701.0], [68.6, 2702.0], [68.7, 2708.0], [68.8, 2715.0], [68.9, 2716.0], [69.0, 2720.0], [69.1, 2722.0], [69.2, 2733.0], [69.3, 2735.0], [69.4, 2736.0], [69.5, 2755.0], [69.6, 2762.0], [69.7, 2780.0], [69.8, 2790.0], [69.9, 2801.0], [70.0, 2805.0], [70.1, 2813.0], [70.2, 2820.0], [70.3, 2845.0], [70.4, 2853.0], [70.5, 2863.0], [70.6, 2863.0], [70.7, 2870.0], [70.8, 2879.0], [70.9, 2887.0], [71.0, 2889.0], [71.1, 2908.0], [71.2, 2913.0], [71.3, 2922.0], [71.4, 2923.0], [71.5, 2930.0], [71.6, 2932.0], [71.7, 2935.0], [71.8, 2947.0], [71.9, 2950.0], [72.0, 2951.0], [72.1, 2951.0], [72.2, 2958.0], [72.3, 2961.0], [72.4, 2965.0], [72.5, 2972.0], [72.6, 2972.0], [72.7, 2985.0], [72.8, 2999.0], [72.9, 3003.0], [73.0, 3022.0], [73.1, 3022.0], [73.2, 3034.0], [73.3, 3039.0], [73.4, 3044.0], [73.5, 3053.0], [73.6, 3055.0], [73.7, 3055.0], [73.8, 3078.0], [73.9, 3092.0], [74.0, 3095.0], [74.1, 3095.0], [74.2, 3124.0], [74.3, 3130.0], [74.4, 3155.0], [74.5, 3158.0], [74.6, 3163.0], [74.7, 3169.0], [74.8, 3200.0], [74.9, 3201.0], [75.0, 3209.0], [75.1, 3216.0], [75.2, 3227.0], [75.3, 3232.0], [75.4, 3242.0], [75.5, 3245.0], [75.6, 3247.0], [75.7, 3255.0], [75.8, 3256.0], [75.9, 3265.0], [76.0, 3265.0], [76.1, 3274.0], [76.2, 3291.0], [76.3, 3303.0], [76.4, 3325.0], [76.5, 3339.0], [76.6, 3345.0], [76.7, 3345.0], [76.8, 3359.0], [76.9, 3364.0], [77.0, 3367.0], [77.1, 3369.0], [77.2, 3381.0], [77.3, 3392.0], [77.4, 3399.0], [77.5, 3400.0], [77.6, 3407.0], [77.7, 3414.0], [77.8, 3416.0], [77.9, 3417.0], [78.0, 3420.0], [78.1, 3423.0], [78.2, 3424.0], [78.3, 3429.0], [78.4, 3429.0], [78.5, 3434.0], [78.6, 3440.0], [78.7, 3443.0], [78.8, 3450.0], [78.9, 3450.0], [79.0, 3450.0], [79.1, 3463.0], [79.2, 3468.0], [79.3, 3474.0], [79.4, 3475.0], [79.5, 3484.0], [79.6, 3492.0], [79.7, 3496.0], [79.8, 3503.0], [79.9, 3504.0], [80.0, 3507.0], [80.1, 3510.0], [80.2, 3515.0], [80.3, 3519.0], [80.4, 3525.0], [80.5, 3526.0], [80.6, 3545.0], [80.7, 3549.0], [80.8, 3551.0], [80.9, 3555.0], [81.0, 3563.0], [81.1, 3583.0], [81.2, 3584.0], [81.3, 3586.0], [81.4, 3588.0], [81.5, 3590.0], [81.6, 3593.0], [81.7, 3594.0], [81.8, 3596.0], [81.9, 3609.0], [82.0, 3609.0], [82.1, 3632.0], [82.2, 3633.0], [82.3, 3634.0], [82.4, 3650.0], [82.5, 3656.0], [82.6, 3664.0], [82.7, 3665.0], [82.8, 3667.0], [82.9, 3672.0], [83.0, 3683.0], [83.1, 3685.0], [83.2, 3690.0], [83.3, 3697.0], [83.4, 3715.0], [83.5, 3724.0], [83.6, 3734.0], [83.7, 3751.0], [83.8, 3752.0], [83.9, 3784.0], [84.0, 3785.0], [84.1, 3788.0], [84.2, 3792.0], [84.3, 3795.0], [84.4, 3809.0], [84.5, 3815.0], [84.6, 3833.0], [84.7, 3861.0], [84.8, 3863.0], [84.9, 3867.0], [85.0, 3873.0], [85.1, 3881.0], [85.2, 3895.0], [85.3, 3898.0], [85.4, 3911.0], [85.5, 3922.0], [85.6, 3931.0], [85.7, 3932.0], [85.8, 3936.0], [85.9, 3938.0], [86.0, 3957.0], [86.1, 3972.0], [86.2, 3975.0], [86.3, 3991.0], [86.4, 3999.0], [86.5, 4005.0], [86.6, 4016.0], [86.7, 4025.0], [86.8, 4033.0], [86.9, 4034.0], [87.0, 4034.0], [87.1, 4045.0], [87.2, 4060.0], [87.3, 4063.0], [87.4, 4064.0], [87.5, 4094.0], [87.6, 4102.0], [87.7, 4112.0], [87.8, 4115.0], [87.9, 4124.0], [88.0, 4140.0], [88.1, 4144.0], [88.2, 4152.0], [88.3, 4158.0], [88.4, 4170.0], [88.5, 4177.0], [88.6, 4193.0], [88.7, 4196.0], [88.8, 4208.0], [88.9, 4229.0], [89.0, 4239.0], [89.1, 4263.0], [89.2, 4264.0], [89.3, 4271.0], [89.4, 4284.0], [89.5, 4284.0], [89.6, 4285.0], [89.7, 4285.0], [89.8, 4294.0], [89.9, 4301.0], [90.0, 4305.0], [90.1, 4307.0], [90.2, 4318.0], [90.3, 4339.0], [90.4, 4343.0], [90.5, 4360.0], [90.6, 4366.0], [90.7, 4379.0], [90.8, 4389.0], [90.9, 4394.0], [91.0, 4396.0], [91.1, 4398.0], [91.2, 4401.0], [91.3, 4408.0], [91.4, 4436.0], [91.5, 4452.0], [91.6, 4453.0], [91.7, 4459.0], [91.8, 4459.0], [91.9, 4460.0], [92.0, 4489.0], [92.1, 4494.0], [92.2, 4501.0], [92.3, 4504.0], [92.4, 4504.0], [92.5, 4506.0], [92.6, 4506.0], [92.7, 4506.0], [92.8, 4507.0], [92.9, 4509.0], [93.0, 4509.0], [93.1, 4510.0], [93.2, 4511.0], [93.3, 4511.0], [93.4, 4512.0], [93.5, 4513.0], [93.6, 4513.0], [93.7, 4515.0], [93.8, 4516.0], [93.9, 4516.0], [94.0, 4517.0], [94.1, 4517.0], [94.2, 4518.0], [94.3, 4519.0], [94.4, 4520.0], [94.5, 4520.0], [94.6, 4521.0], [94.7, 4524.0], [94.8, 4524.0], [94.9, 4524.0], [95.0, 4525.0], [95.1, 4526.0], [95.2, 4526.0], [95.3, 4526.0], [95.4, 4526.0], [95.5, 4529.0], [95.6, 4530.0], [95.7, 4530.0], [95.8, 4530.0], [95.9, 4531.0], [96.0, 4532.0], [96.1, 4532.0], [96.2, 4536.0], [96.3, 4537.0], [96.4, 4537.0], [96.5, 4537.0], [96.6, 4538.0], [96.7, 4539.0], [96.8, 4541.0], [96.9, 4543.0], [97.0, 4544.0], [97.1, 4545.0], [97.2, 4545.0], [97.3, 4546.0], [97.4, 4547.0], [97.5, 4548.0], [97.6, 4548.0], [97.7, 4548.0], [97.8, 4549.0], [97.9, 4551.0], [98.0, 4551.0], [98.1, 4553.0], [98.2, 4553.0], [98.3, 4554.0], [98.4, 4555.0], [98.5, 4557.0], [98.6, 4558.0], [98.7, 4559.0], [98.8, 4561.0], [98.9, 4561.0], [99.0, 4562.0], [99.1, 4564.0], [99.2, 4567.0], [99.3, 4568.0], [99.4, 4570.0], [99.5, 4572.0], [99.6, 4573.0], [99.7, 4579.0], [99.8, 4579.0], [99.9, 4580.0]], "isOverall": false, "label": "seckill", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 5.0, "minX": 0.0, "maxY": 359.0, "series": [{"data": [[0.0, 359.0], [600.0, 11.0], [700.0, 10.0], [800.0, 7.0], [900.0, 11.0], [1000.0, 11.0], [1100.0, 18.0], [1200.0, 16.0], [1300.0, 16.0], [1400.0, 10.0], [1500.0, 7.0], [1600.0, 13.0], [100.0, 28.0], [1700.0, 11.0], [1800.0, 20.0], [1900.0, 16.0], [2000.0, 15.0], [2100.0, 17.0], [2200.0, 13.0], [2300.0, 9.0], [2400.0, 6.0], [2500.0, 5.0], [2600.0, 10.0], [2700.0, 14.0], [2800.0, 12.0], [2900.0, 19.0], [3000.0, 13.0], [3100.0, 6.0], [3300.0, 12.0], [3200.0, 15.0], [200.0, 18.0], [3400.0, 23.0], [3500.0, 21.0], [3600.0, 15.0], [3700.0, 10.0], [3800.0, 10.0], [3900.0, 11.0], [4000.0, 11.0], [4100.0, 12.0], [4300.0, 13.0], [4200.0, 11.0], [4500.0, 78.0], [4400.0, 10.0], [300.0, 11.0], [400.0, 9.0], [500.0, 7.0]], "isOverall": false, "label": "seckill", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 117.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 458.0, "series": [{"data": [[0.0, 425.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 117.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 458.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 171.1850000000001, "minX": 1.79220612E12, "maxY": 171.1850000000001, "series": [{"data": [[1.79220612E12, 171.1850000000001]], "isOverall": false, "label": "1000-users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79220612E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 17.254901960784313, "minX": 1.0, "maxY": 4564.0, "series": [{"data": [[2.0, 17.254901960784313], [3.0, 23.291666666666664], [4.0, 30.311111111111106], [5.0, 41.628571428571426], [6.0, 46.81818181818181], [7.0, 53.7], [8.0, 79.0], [9.0, 89.0], [10.0, 69.0], [11.0, 107.5], [12.0, 167.0], [13.0, 142.3846153846154], [14.0, 140.83333333333331], [15.0, 188.66666666666666], [16.0, 136.33333333333334], [18.0, 208.5], [20.0, 190.33333333333334], [21.0, 77.0], [22.0, 155.0], [23.0, 70.5], [25.0, 714.5], [26.0, 1365.0], [29.0, 1310.3333333333333], [30.0, 1314.0], [31.0, 635.0], [33.0, 1257.0], [32.0, 1213.5], [35.0, 1225.5], [36.0, 1267.0], [38.0, 1275.5], [40.0, 1183.5], [42.0, 1145.3333333333333], [44.0, 1075.0], [47.0, 938.6666666666666], [49.0, 1029.3333333333333], [51.0, 522.0], [50.0, 1124.0], [53.0, 982.0], [52.0, 49.0], [57.0, 976.25], [59.0, 829.6666666666666], [61.0, 768.5], [62.0, 772.0], [67.0, 858.0], [71.0, 786.0], [68.0, 792.0], [74.0, 631.0], [75.0, 577.0], [73.0, 652.0], [72.0, 631.0], [76.0, 607.5], [83.0, 533.5], [82.0, 637.8333333333333], [80.0, 661.0], [87.0, 460.0], [86.0, 386.0], [84.0, 429.0], [95.0, 410.0], [93.0, 440.5], [97.0, 430.0], [96.0, 380.0], [103.0, 256.5], [102.0, 208.0], [100.0, 352.25], [107.0, 226.0], [106.0, 214.0], [104.0, 302.0], [111.0, 138.0], [110.0, 172.0], [108.0, 241.5], [115.0, 79.66666666666667], [113.0, 113.0], [112.0, 149.0], [119.0, 2172.5], [122.0, 2074.5], [121.0, 2075.0], [120.0, 2089.0], [126.0, 2030.0], [125.0, 1994.5], [124.0, 2113.5], [134.0, 1874.0], [133.0, 1858.0], [132.0, 2053.0], [130.0, 2019.75], [143.0, 1892.0], [142.0, 1834.3333333333333], [139.0, 1886.5], [137.0, 1948.0], [138.0, 1888.0], [136.0, 1869.5], [151.0, 1612.0], [148.0, 1704.5], [147.0, 1727.0], [146.0, 1771.5], [145.0, 1765.5], [159.0, 1647.4], [155.0, 1656.0], [152.0, 1593.3333333333333], [164.0, 1412.6666666666667], [161.0, 1498.6666666666667], [175.0, 1473.5], [174.0, 1537.0], [173.0, 1497.0], [171.0, 1445.0], [170.0, 1434.0], [168.0, 1468.4], [182.0, 1327.0], [180.0, 1269.0], [179.0, 1339.5], [178.0, 1428.0], [191.0, 1090.0], [190.0, 1118.0], [189.0, 1069.0], [188.0, 832.5], [186.0, 1233.0], [187.0, 1164.0], [184.0, 1307.0], [199.0, 3201.0], [198.0, 3123.5], [197.0, 1122.6666666666667], [196.0, 1724.25], [195.0, 1583.2], [194.0, 3609.0], [207.0, 2715.25], [206.0, 3247.0], [202.0, 3216.0], [201.0, 3237.0], [215.0, 3344.0], [213.0, 1853.0], [211.0, 3653.0], [209.0, 2241.5], [208.0, 3303.0], [223.0, 2813.0], [220.0, 2802.5], [218.0, 3035.0], [217.0, 3044.0], [231.0, 3080.5], [230.0, 3650.0], [227.0, 2862.3333333333335], [225.0, 3931.0], [224.0, 2732.0], [239.0, 2780.0], [237.0, 3023.0], [234.0, 2790.0], [232.0, 2958.0], [245.0, 2273.6666666666665], [244.0, 2575.3333333333335], [240.0, 2708.0], [242.0, 2846.6], [255.0, 2170.0], [254.0, 2543.3333333333335], [252.0, 2464.0], [250.0, 2508.0], [259.0, 2391.0], [269.0, 1968.6666666666667], [271.0, 1989.6666666666667], [268.0, 2113.2], [263.0, 1958.0], [262.0, 1910.0], [261.0, 2172.0], [260.0, 2281.0], [257.0, 2060.0], [256.0, 2059.0], [286.0, 2013.5], [283.0, 2412.5], [282.0, 2418.0], [281.0, 1802.0], [279.0, 2095.0], [277.0, 2376.0], [276.0, 2227.3333333333335], [275.0, 2302.0], [273.0, 1826.0], [300.0, 1737.0], [299.0, 3412.0], [295.0, 1922.3333333333335], [293.0, 1537.5], [292.0, 2182.75], [289.0, 2322.3333333333335], [307.0, 3342.5], [319.0, 3383.0], [318.0, 3352.0], [315.0, 3227.0], [314.0, 3534.0], [313.0, 3519.0], [311.0, 3282.0], [308.0, 3420.0], [309.0, 3095.0], [306.0, 3390.3333333333335], [305.0, 3138.6], [322.0, 2911.0], [335.0, 2845.0], [334.0, 2761.0], [333.0, 2979.0], [330.0, 3440.0], [327.0, 3182.6666666666665], [324.0, 2990.5], [321.0, 3069.0], [320.0, 3200.0], [338.0, 2935.0], [344.0, 4482.0], [346.0, 4386.0], [343.0, 3469.5], [336.0, 2433.0], [342.0, 2915.5], [341.0, 3617.5], [348.0, 2987.2], [347.0, 3022.0], [340.0, 2721.5], [367.0, 4239.0], [366.0, 3492.0], [364.0, 4136.0], [360.0, 4208.0], [359.0, 3983.6666666666665], [357.0, 3913.5], [353.0, 4004.8333333333335], [352.0, 4564.0], [383.0, 4271.0], [381.0, 3416.0], [380.0, 4318.833333333333], [374.0, 4242.0], [373.0, 4099.0], [369.0, 4240.5], [399.0, 4335.428571428572], [397.0, 3563.0], [395.0, 4112.0], [390.0, 4553.5], [388.0, 3875.3333333333335], [387.0, 4372.666666666667], [414.0, 4001.0], [410.0, 4549.5], [409.0, 4545.0], [407.0, 4242.142857142857], [400.0, 4559.0], [431.0, 4339.0], [430.0, 4025.0], [425.0, 4537.0], [424.0, 4389.0], [422.0, 4060.0], [421.0, 4460.0], [420.0, 4229.0], [417.0, 3790.3333333333335], [447.0, 4526.0], [446.0, 4075.0], [444.0, 4530.0], [443.0, 4534.0], [440.0, 3584.0], [439.0, 3901.25], [436.0, 4295.6], [463.0, 3913.0], [462.0, 4046.5], [457.0, 4515.0], [455.0, 4237.571428571428], [451.0, 4436.0], [448.0, 4525.0], [494.0, 4530.0], [483.0, 4379.0], [480.0, 3922.0], [499.0, 4517.0], [532.0, 4074.9743589743584], [533.0, 4198.321428571428], [1.0, 18.25]], "isOverall": false, "label": "seckill", "isController": false}, {"data": [[171.1850000000001, 1641.954999999999]], "isOverall": false, "label": "seckill-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 533.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 3597.7166666666667, "minX": 1.79220612E12, "maxY": 4550.0, "series": [{"data": [[1.79220612E12, 3597.7166666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79220612E12, 4550.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79220612E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1641.954999999999, "minX": 1.79220612E12, "maxY": 1641.954999999999, "series": [{"data": [[1.79220612E12, 1641.954999999999]], "isOverall": false, "label": "seckill", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79220612E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 1629.7170000000033, "minX": 1.79220612E12, "maxY": 1629.7170000000033, "series": [{"data": [[1.79220612E12, 1629.7170000000033]], "isOverall": false, "label": "seckill", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79220612E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 19.752999999999993, "minX": 1.79220612E12, "maxY": 19.752999999999993, "series": [{"data": [[1.79220612E12, 19.752999999999993]], "isOverall": false, "label": "seckill", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79220612E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 14.0, "minX": 1.79220612E12, "maxY": 4580.0, "series": [{"data": [[1.79220612E12, 4580.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79220612E12, 4304.6]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79220612E12, 4561.99]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79220612E12, 4524.95]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.79220612E12, 14.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79220612E12, 1207.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79220612E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 16.0, "minX": 32.0, "maxY": 3873.0, "series": [{"data": [[32.0, 16.0], [297.0, 3873.0], [374.0, 1301.5], [96.0, 21.5], [97.0, 21.0], [104.0, 44.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 374.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 16.0, "minX": 32.0, "maxY": 3804.0, "series": [{"data": [[32.0, 16.0], [297.0, 3804.0], [374.0, 1300.5], [96.0, 21.0], [97.0, 21.0], [104.0, 44.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 374.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 16.666666666666668, "minX": 1.79220612E12, "maxY": 16.666666666666668, "series": [{"data": [[1.79220612E12, 16.666666666666668]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79220612E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 16.666666666666668, "minX": 1.79220612E12, "maxY": 16.666666666666668, "series": [{"data": [[1.79220612E12, 16.666666666666668]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79220612E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 16.666666666666668, "minX": 1.79220612E12, "maxY": 16.666666666666668, "series": [{"data": [[1.79220612E12, 16.666666666666668]], "isOverall": false, "label": "seckill-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79220612E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 16.666666666666668, "minX": 1.79220612E12, "maxY": 16.666666666666668, "series": [{"data": [[1.79220612E12, 16.666666666666668]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79220612E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

