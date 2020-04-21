import axios from "axios";


 export const fetchShow = () => {
   return( axios
      .get(
        "https://api.tvmaze.com/singlesearch/shows?q=the-offices&embed=episodes"
      )
      .then(res => {return res})
      .catch(err => console.log("Error: ", err))
   )};

  