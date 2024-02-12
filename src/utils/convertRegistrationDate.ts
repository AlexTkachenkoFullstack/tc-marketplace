export const convertRegistrationDate=(date:string)=>{
    const registrationDate = new Date(date);
    const monthNames = [
      "січня", "лютого", "березня", "квітня", "травня", "червня",
      "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];
  
    const month = monthNames[registrationDate.getMonth()];
    const year = registrationDate.getFullYear();
  
    return `${month} ${year}`;          
}