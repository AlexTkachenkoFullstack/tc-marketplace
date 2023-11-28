export const countShows=(shows:number)=>{
    if((shows>4 && shows<21) || (shows%100>4 && shows%100<21) ){
        return "показів"
    }
    if(shows===1 || shows%10===1){
        return "показ"
    }
    if((shows>1 && shows<5) || (shows%10>1 && shows%10<5)){
        return "покази"
    }
    return "показів"
}