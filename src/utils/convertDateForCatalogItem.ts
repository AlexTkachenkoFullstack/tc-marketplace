export const convertDateForCatalogItem=(date:string)=>{
    const dateNow= Date.now();
    const currentDate= new Date(date)
    const dateUnix= currentDate.getTime()
    const timeDifference=dateNow-dateUnix
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
    const year = currentDate.getFullYear();
    switch(days){
        case 0:
            return `cьогодні`;
        case 1:
            return `вчора`; 
        case 2:
            return `позавчора`;   
        default: return  `${day}.${month}.${year}`           
    }
}