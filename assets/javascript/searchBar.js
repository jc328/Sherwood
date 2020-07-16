

window.addEventListener('DOMContentLoaded', e => {
  const searchBar = document.querySelector('.searchBar')
  const datalist = document.querySelector('datalist')
  searchBar.addEventListener('keypress', (e) => {
    if (e.key=== 'Enter') {
      let val = searchBar.value
      console.log(val)
   }
  })
  // console.log(datalist)
  // if (searchBar.value === '') {
  //   datalist.style.display = "none";
  // } else {
  //   datalist.style.display = "block";
  // }
  searchBar.addEventListener('click', (e) => {
    console.log(searchBar.value)
    if (searchBar.value == '') {

      e.preventDefault()
    }
  })
});


//TODO:
//clicking also submits search
//limit 5 in the datalist
//try not to implement jquery, use VanillaJS
//bonus: highlight letters in the datalist while user types data
