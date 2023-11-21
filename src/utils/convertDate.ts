export const convertDate=(date:string)=>{
    const dateNow= Date.now();
    const dateUnix= new Date(date).getTime()
    const timeDifference=dateNow-dateUnix
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((dateUnix % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((dateUnix % (1000 * 60 * 60)) / (1000 * 60));
    switch(days){
        case 0:
            return `Сьогодні о ${hours}:${minutes}`;
        case 1:
            return `Вчора о ${hours}:${minutes}`; 
        case 2:
            return `Позавчора о ${hours}:${minutes}`;
        case 3: 
            return `${days} дні тому`;
        case 4: 
            return `${days} дні тому`;   
        default: return  `${days} днів тому`           
    }
}