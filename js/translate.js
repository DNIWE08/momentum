// async function fetchData(language = true){
//   const translateData = 'translate.json';
//   const result = await fetch(translateData);
//   const data = await result.json();
//   let resultData;
//   if(language){
//     resultData = data[0]
//   } else {
//     resultData = data[1]
//   }
//   return resultData
// }


// const dataForLanguage = await fetchData(false);

// export default dataForLanguage;