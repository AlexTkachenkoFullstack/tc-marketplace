export const countViews=(views:number)=>{
    if((views>4 && views<21) || (views%100>4 && views%100<21) ){
        return "переглядів"
    }
    if(views===1 || views%10===1){
        return "перегляд"
    }
    if((views>1 && views<5) || (views%10>1 && views%10<5)){
        return "перегляди"
    }
    return "переглядів"
}