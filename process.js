const fs = require('fs');
const csv = require('csv');

const COLUMNS = {
    0: 'spaceName',//配置番号
    1: 'name',//サークル名
    2: 'penName',//ペンネーム
    3: 'twitter', //TwitterID
    4: '', //ペンネーム
    5: 'goodsName', //頒布物(タイトル名orグッズ内容)
    6: 'goodsType', //種類
    7: 'goodsIsNew', //新既
    8: 'goodsPrice', //値段
    9: 'goodsURL', //告知用URL
    10: 'goodsRemarks', //備考'
}


class Circle {
    constructor(spaceName, name, penName, twitter) {
        this.spaceName = spaceName;
        this.name = name;
        this.penName = penName;
        this.twitter = twitter;
        this.goods = [];
    }

    addGoods(goods) {
        this.goods.push(goods);
    }
}

class Goods {
    constructor(name, type, isNew, price, url, remarks) {
        this.name = name;
        this.type = type;
        this.isNew = isNew;
        this.price = price;
        this.url = url;
        this.remarks;
    }
}

const results= [];

const parser = csv.parse((err, rows) => {
    let counter = 0;
    let currentCircle;
    for(const row of rows) {
        if(row[0] === '配置番号' || row[1] === '予備') continue;
        if(row[0]) {
            currentCircle = new Circle(row[0], row[1], row[2], row[3]);
            results.push(currentCircle);
            if(!row[5]) continue;
            const goods = new Goods(row[5], row[6], row[7], row[8], row[9], row[10]);
            currentCircle.addGoods(goods);
            continue;
        } else if(row[5]){
            const goods = new Goods(row[5], row[6], row[7], row[8], row[9], row[10]);
            currentCircle.addGoods(goods);
            continue;
        }
    }

    console.log(results.length);
    fs.writeFileSync('./results.json', JSON.stringify(results));
});

fs.createReadStream('circleslist.csv').pipe(parser);


