const db = firebase.firestore();

db.collection("music-styles")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const styleSelector = document.getElementById("styleSelector");
      const option = document.createElement("option");
      option.text = doc.data()["style"];
      if (option.text === "pop") {
        option.setAttribute("selected", true);
      }
      option.value = doc.data()["url"];
      styleSelector.add(option);
    });
  })
  .catch(err => {
    console.log("Error getting documents", err);
  });

const changeMusicStyle = () => {
  const styleSelector = document.getElementById("styleSelector");
  const selectedOption = styleSelector.options[styleSelector.selectedIndex].value;
  const musicPlayer = document.getElementById("music-style-player");
  musicPlayer.setAttribute("src", selectedOption);
};
console.log("HO");