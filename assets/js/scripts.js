(function($) {
    const rep = {
        0: '零',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九',
        10: '十',
        11: '十一',
        12: '十二',
        13: '十三',
        14: '十四',
        15: '十五',
        16: '十六',
        17: '十七',
        18: '十八',
        19: '十九',
        20: '二十',
        21: '二十一',
        22: '二十二',
        23: '二十三',
        24: '二十四',
        25: '二十五',
        26: '二十六',
        27: '二十七',
        28: '二十八',
        29: '二十九',
        30: '三十',
        31: '三十一',
    };

    const resetForm = (form, values) => {
        if (!values) {
            $.ajax({
                url: 'dummy.json',
                dataType: 'json',
                success: (response) => {
                    let length = Math.floor(Math.random() * response.length);
                    let dummy = response[length];

                    resetForm(form, dummy);
                }
            });
        }
        else {
            let keys = Object.keys(values);

            keys.forEach((el) => {
                $("[name=" + el + "]").val(values[el]);
            });
        }
    };

    const generate = (values) => {
        let paragraphs = [];

        // 1. Title
        paragraphs.push(values.condemn_title);
        paragraphs.push("＊＊＊＊＊＊＊＊＊＊＊");
        paragraphs.push("");

        // 2. Get date
        let date = new Date(values.incident_date);
        let today = new Date();
        today.setUTCHours(0);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(0);

        let dateStr = "　　就";
        let dateChi = "";

        dateChi += rep[date.getMonth() + 1] + "月";
        dateChi += rep[date.getDate()] + "日";

        if (today.getTime() == date.getTime()) {
            dateStr += "今日（" + dateChi + "）";
        }
        else if (today.getTime() - date.getTime() == 86400000) {
            dateStr += "昨日（" + dateChi + "）";
        }
        else {
            dateStr += dateChi;
        }

        console.log(values);

        dateStr += "在" + values.incident_location + "發生的" + values.incident_type + "行為，特衰政府" + values.condemn_lvl + "。";
        paragraphs.push(dateStr);
        paragraphs.push("");

        let description = "　　";
        description += values.condemning + "的";

        if (typeof values.incident_elements === "string") {
            description += values.incident_elements;
        }
        else if (values.incident_elements) {
            description += values.incident_elements.join("、");
        }

        description += "行為，";

        if (typeof values.incident_consequences === "string") {
            description += values.incident_consequences + "，行為";
        }
        else if (values.incident_consequences) {
            description += "不但會" + values.incident_consequences[0] + "，" + "更會";
            description += values.incident_consequences.slice(1).join("，") + "，行為";
        }

        description += values.condemn_wording + "。";
        paragraphs.push(description);
        paragraphs.push("");

        let end = "";
        end += "　　香巷作為法治社會完全不能容忍任何" + values.incident_type + "行為，特衰政府" + values.condemn_lvl + "，並會嚴正追究。";
        paragraphs.push(end);
        paragraphs.push("");

        paragraphs.push("完");
        paragraphs.push("");

        let now = new Date();

        paragraphs.push(now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日（星期" + rep[now.getDay()] + "）");
        paragraphs.push("香巷時間" + now.getHours() + "時" + now.getMinutes() + "分");

        $('.page .body').html(paragraphs.join("</br>"));
    };

    $(window).bind('load', () => {
        let form = $('form');

        // resetForm(form);

        form.bind('submit', (e) => {
            e.preventDefault();

            let values = form.serializeArray();
            let newValues = {};

            values.forEach((el) => {
                if (newValues[el.name]) {
                    let org = newValues[el.name];

                    if (typeof org === 'string') {
                        org = [ org ];
                    }

                    org.push(el.value);
                    newValues[el.name] = org;
                }
                else {
                    newValues[el.name] = el.value;
                }
            });
            generate(newValues);
        });
    });
}) (jQuery)