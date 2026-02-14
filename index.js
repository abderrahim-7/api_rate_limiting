const express = require("express")
const app = express();
const path = require("path")

const router = express.Router();

app.use(express.static(path.join(__dirname)));


router.get("/",async (req,res) =>{
    res.sendFile(path.join(__dirname,"index.html"))
})

router.get("/wisdom", async (req, res)=> {
    try{
        const randomInt = Math.floor(Math.random() * 30);
        res.status(200).json({message : data[randomInt]})
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})

app.use("/",router)

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000")
})


const data = [
  "Don’t lose hope, life will do that for you.",
  "Always borrow money from a pessimist,they won’t expect it back.",
  "If at first you don’t succeed, skydiving is not for you.",
  "Age is just a number… a really high one in some cases.",
  "Don’t take life too seriously,you won’t get out alive anyway.",
  "If life gives you lemons, squirt someone in the eye.",
  "Silence is golden, unless you have kids, then silence is suspicious.",
  "Never argue with an idiot,they’ll drag you down to their level and beat you with experience.",
  "Don’t put all your eggs in one basket,especially if the basket has holes.",
  "Always remember you’re unique… just like everyone else.",
  "If you think nobody cares if you’re alive, try missing a couple of payments.",
  "A clear conscience is usually the sign of a bad memory.",
  "Life is short. Smile while you still have teeth.",
  "Never trust someone who smiles constantly,they probably have a secret.",
  "The early bird might get the worm, but the second mouse gets the cheese.",
  "Life is like a camera,focus on the good times, develop from the negatives, and if things don’t work out, take another shot.",
  "If at first you don’t succeed, redefine success.",
  "Sometimes you win, sometimes you learn, and sometimes you just eat cake.",
  "Opportunity knocks once, but temptation leans on the doorbell.",
  "Don’t sweat the petty things, and don’t pet the sweaty things.",
  "Some mistakes are too much fun to only make once.",
  "Behind every great man is a woman rolling her eyes.",
  "Life is all about perspective,the Titanic sinking looked like a miracle to the lobsters in the kitchen.",
  "If you can’t dazzle them with brilliance, baffle them with nonsense.",
  "Don’t count your chickens before they hatch… they might be ducks.",
  "Everyone wants happiness, no one wants pain… but a little chocolate fixes both.",
  "You can’t have everything… where would you put it?",
  "Common sense is like deodorant, those who need it the most never use it.",
  "Laughter is the best medicine, but if you’re laughing without reason, you might need medicine.",
  "Never be afraid to try something new… unless it’s skydiving without a parachute."
];