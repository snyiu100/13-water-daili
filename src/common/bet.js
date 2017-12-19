
import httpBet from './http'
//特码生肖数据
export const dates =[
    [//0
        {key:10,cate:3},
        {key:22,cate:2},
        {key:34,cate:1},
        {key:46,cate:1}
    ],[//1
        {key:9,cate:3},
        {key:21,cate:2},
        {key:33,cate:2},
        {key:45,cate:1}
    ],[//2
        {key:8,cate:1},
        {key:20,cate:3},
        {key:32,cate:2},
        {key:44,cate:2}        
    ],[//3
        {key:7,cate:1},
        {key:19,cate:1},
        {key:31,cate:3},
        {key:43,cate:2}        
    ],[//4
        {key:6,cate:2},
        {key:18,cate:1},
        {key:30,cate:1},
        {key:42,cate:3}        
    ],[//5
        {key:5,cate:2},
        {key:17,cate:2},
        {key:29,cate:1},
        {key:41,cate:3}        
    ],[//6
        {key:4,cate:3},
        {key:16,cate:2},
        {key:28,cate:2},
        {key:40,cate:1}        
    ],[//7
        {key:3,cate:3},
        {key:15,cate:3},
        {key:27,cate:2},
        {key:39,cate:2}        
    ],[//8
        {key:2,cate:1},
        {key:14,cate:3},
        {key:26,cate:3},
        {key:38,cate:2}        
    ],[//9
        {key:1,cate:1},
        {key:13,cate:1},
        {key:25,cate:3},
        {key:37,cate:3},
        {key:49,cate:2}        
    ],[//10
        {key:12,cate:1},
        {key:24,cate:1},
        {key:36,cate:3},
        {key:48,cate:3}      
    ],[//11
        {key:11,cate:2},
        {key:23,cate:1},
        {key:35,cate:1},
        {key:47,cate:3}      
    ]
]

export const weiShuLianDate = [
    [{key:10,cate:3},{key:20,cate:3},{key:30,cate:1},{key:40,cate:1}],
    [{key:1,cate:1},{key:11,cate:2},{key:21,cate:2},{key:31,cate:3},{key:41,cate:3}],
    [{key:2,cate:1},{key:12,cate:1},{key:22,cate:2},{key:32,cate:2},{key:42,cate:3}],
    [{key:3,cate:3},{key:13,cate:1},{key:23,cate:1},{key:33,cate:2},{key:43,cate:2}],
    [{key:4,cate:3},{key:14,cate:3},{key:24,cate:1},{key:34,cate:1},{key:44,cate:2}],
    [{key:5,cate:2},{key:15,cate:3},{key:25,cate:3},{key:35,cate:1},{key:45,cate:1}],
    [{key:6,cate:2},{key:16,cate:2},{key:26,cate:3},{key:36,cate:3},{key:46,cate:1}],
    [{key:7,cate:1},{key:17,cate:2},{key:27,cate:2},{key:37,cate:3},{key:47,cate:3}],
    [{key:8,cate:1},{key:18,cate:1},{key:28,cate:2},{key:38,cate:2},{key:48,cate:3}],
    [{key:9,cate:3},{key:19,cate:1},{key:29,cate:1},{key:39,cate:2},{key:49,cate:2}],
    
]

//半波数据
export const banBoData = [
    "1,7,13,19,23,29,35,45",
    "2,8,12,18,24,30,34,40,46",
    "29,30,34,35,40,45,46",
    "1,2,7,8,12,13,18,19,23,24",
    "5,11,17,21,27,33,39,43,49",
    "6,16,22,28,32,38,44",
    "27,28,32,33,38,39,43,44,49",
    "5,6,11,16,17,21,22",
    "3,9,15,25,31,37,41,47",
    "4,10,14,20,26,36,42,48",
    "25,26,31,36,37,41,42,47,48",
    "3,4,9,10,14,15,20",
    "1,7,23,29,45,12,18,30,34",
    "13,19,35,2,8,24,40,46",
    "5,16,21,27,32,38,43,49",
    "6,11,17,22,28,33,39,44",
    "3,9,25,41,47,10,14,36",
    "15,31,37,4,20,26,42,48"];

//下注项目类型   半波、一肖、尾数[6,7,15] 
export const shengXiaoDate = function(list){
   let arr = [];
   for(let v of list){
      if(v.money!=""){
          arr.push({id:v.id,money:v.money});
      }
   } 
   return arr;
}


//下注项目类型   特码生肖[12]  

export const shengXiaoCheckDate = function(list){
   let arr = [];
   for(let v of list){
      if(v.check){
          console.log(JSON.stringify(v));
          arr.push({id:v.id});
      }
   } 
   return arr;
}



export const shengXiaokDateSix = function(list){
    let odds = [];
    for(let i in list){
        odds.push({id:0,odd:[]});
        for(let j in list[i].odd){
            let arrs = [];
            odds[i].id = list[i].id;
            //z_code_one
            if(list[i].odd[0].money!=''){
                 arrs.push({z_code_one:list[i].odd[0].z_code_one,money:list[i].odd[0].money});
            }
            //z_code_two
            if(list[i].odd[1].money!=''){
                 arrs.push({z_code_two:list[i].odd[1].z_code_two,money:list[i].odd[1].money});
            }
            //z_code_three
            if(list[i].odd[2].money!=''){
                 arrs.push({z_code_three:list[i].odd[2].z_code_three,money:list[i].odd[2].money});
            }
            //z_code_four
            if(list[i].odd[3].money!=''){
                 arrs.push({z_code_four:list[i].odd[3].z_code_four,money:list[i].odd[3].money});
            }
            //z_code_five
            if(list[i].odd[4].money!=''){
                 arrs.push({z_code_five:list[i].odd[4].z_code_five,money:list[i].odd[4].money});
            } 
            //z_code_six
            if(list[i].odd[5].money!=''){
                 arrs.push({z_code_six:list[i].odd[5].z_code_six,money:list[i].odd[5].money});
            } 
            odds[i].odd=arrs;
        }
        
    }
   let result = [];
   for(let i in odds){
       if(odds[i].odd.length>0){
            result.push(odds[i]);
       }
   }
   return result;
    
}


