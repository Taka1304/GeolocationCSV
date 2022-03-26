let geoId = 0.0;
let geoData = [["Lat", "Lng", "Time"]];

function getGeolocation(){
    var userLat = 0;  //ユーザの現在緯度を格納
    var userLng = 0;  //ユーザの現在経度を格納
    
    if (navigator.geolocation) {
        //navigator.geolocationが対応している端末だった場合の記述
        navigator.geolocation.watchPosition(success, error, option)
        geoId = (() => navigator.geolocation.watchPosition(success, error, option));
        function success(position) { //うまく取得できた場合
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            var getTime = new Date(position.timestamp);
            console.log(userLat);
            console.log(userLng);
            console.log(getTime);
            geoData.push([userLat.toString(), userLng.toString(), getTime.toString()])
        }
        function error(error) {  //何らかの理由により取得できなかった場合
            var errorMessage = {
                0: "原因不明のエラーが発生しました",
                1: "位置情報が許可されませんでした",
                2: "位置情報が取得できませんでした",
                3: "タイムアウトしました"
            };
            alert(errorMessage[error.code]);//アラートを表示
        }
        var option = {
            "enableHighAccuracy": true,
            "timeout": 100,
            "maximumAge": 100,
        };
    } else {
        //navigator.geolocationが未対応だった場合の記述
    }
    
}
// function stopGeolocation(){
//     navigator.geolocation.clearWatch(geoId);
//     // console.log("stop")
// }
function arrToCSV(geoData){
    /**
     * 各フィールドの囲い -> ダブルクォーテーション
     * 各フィールドの区切り -> カンマ
     * 改行コード -> LF
     */
    // console.log(geoData)
     return geoData
     .map(row => row.map(str => '"' + (str ? str.replace(/"/g, '""') : '') + '"'))
     .map(row => row.join(','))
     .join('\n');
};
// function output_csv_Safari(){
    
//     const data = arrToCSV(geoData);
//     function download(data) {
//         // utf8
//         const bom = '\uFEFF';
//         window.location.href =
//           'data:attachment/csv;charset=utf-8,' + encodeURIComponent(bom + data);
//       }
//     download(data);
// }
function output_csv_PC(){
    const data = arrToCSV(geoData);

    function download(data, name) {
        const anchor = document.createElement('a');
        if (window.URL && anchor.download !== undefined) {
          // utf8
          const bom = '\uFEFF';
          const blob = new Blob([bom, data], { type: 'text/csv' });
          anchor.download = name;
      
          // window.URL.createObjectURLを利用
          // https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL
          anchor.href = window.URL.createObjectURL(blob);
      
          // これでも可
          // anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(bom + data);
      
          // firefoxでは一度addしないと動かない
          document.body.appendChild(anchor);
          anchor.click();
          anchor.parentNode.removeChild(anchor);
        }
    }
    
    download(data, 'geolocation.csv');
}

