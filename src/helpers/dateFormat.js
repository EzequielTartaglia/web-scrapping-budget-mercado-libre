export const dateFormat = (fecha) => {
    const date = new Date(fecha);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    // Asegúrate de agregar un 0 delante de días o meses menores a 10
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };