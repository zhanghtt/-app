/**
 * BadgeManager 静态类
 * 只需要关心对应业务的角标增长值，自动计算总的角标数，并设置App角标plus.runtime.setBadgeNumber
 * @author fanrong33
 * @version 1.0.2 build 201501223
 */
;function BadgeManager(){
};
/**
 * 角标增长
 * @param {String} key  键值
 * @param {Number} step 增长值
 */
BadgeManager.setInc = function(key, step){
    var key = "badge_"+key;
    var total_number = plus.storage.getItem("badge_total_number");
    var key_number   = plus.storage.getItem(key);
    total_number = parseInt(total_number); // 字符串转数字
    key_number   = parseInt(key_number);
    if(!key_number) key_number    = 0;
    if(!total_number) total_number = 0;
    key_number   = key_number + step;
    total_number = total_number + step;

    plus.storage.setItem(key, key_number.toString()); // 数字转字符串
    plus.storage.setItem("badge_total_number", total_number.toString());

    // 设置APP图标的角标
    plus.runtime.setBadgeNumber(total_number);
}