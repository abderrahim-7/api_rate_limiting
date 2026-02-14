const express = require("express")
const app = express();
const path = require("path")
const { connectRedis } = require("./redisClient")
const { checkAccess } = require("./rateLimiting");

const router = express.Router();

app.use(express.static(path.join(__dirname)));


router.get("/",async (req,res) =>{
    res.sendFile(path.join(__dirname,"index.html"))
})

router.get("/wisdom", async (req, res)=> {
    try{
        const ip = req.ip
        if (await checkAccess(ip)){
            const randomInt = Math.floor(Math.random() * 30);
            res.status(200).json({message : data[randomInt], success : true})
        }
        else{
            res.status(400).json({message : "Slow down!! Too many wisdom can kill you", success : false})
        }
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})

app.use("/",router)

app.listen(3000, () => {
    connectRedis();
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
  "Never be afraid to try something new… unless it’s skydiving without a parachute.",
  "Work hard, nap harder.",
  "Follow your dreams… unless they involve responsibility.",
  "Honesty is the best policy… but insanity works too.",
  "Life is a soup and I’m a fork.",
  "Some call it chaos, I call it Tuesday.",
  "Don’t worry about what people think… they don’t do it very often.",
  "The road to success is always under construction.",
  "You can’t please everyone… you’re not pizza.",
  "Life is a journey, but sometimes it’s just traffic.",
  "If you can’t beat them, arrange to have them beaten.",
  "A balanced diet means a cupcake in each hand.",
  "Friends come and go… enemies accumulate.",
  "Stress is dessert spelled backwards.",
  "Procrastinate today, panic tomorrow.",
  "Every cloud has a silver lining… mine is usually just rain.",
  "Do what you love, and the bills will find you eventually.",
  "If life’s a game, mine’s clearly on hard mode.",
  "Never put off till tomorrow what you can ignore forever.",
  "Some people are like clouds. When they disappear, it’s a beautiful day.",
  "Always give 100% — unless donating blood.",
  "Be yourself; everyone else is already taken and failing.",
  "I intend to live forever… so far, so good.",
  "Behind every successful person is a lot of coffee and sarcasm.",
  "If at first you don’t succeed, then skydiving definitely isn’t for you.",
  "If you can’t convince them, confuse them.",
  "Life is short. Smile while you still have teeth, or at least until the dentist bill arrives.",
  "They say money talks, mine just says goodbye.",
  "You miss 100% of the naps you don’t take.",
  "I used to think I was indecisive, now I’m not so sure.",
  "If karma doesn’t hit you, I gladly will.",
  "Some cause happiness wherever they go… others whenever they go.",
  "Be nice to people on your way up, you’ll meet them on your way down.",
  "I’m not lazy, I’m on energy-saving mode.",
  "If life gives you melons… you might be dyslexic.",
  "I love deadlines. I love the whooshing sound they make as they fly by.",
  "If opportunity doesn’t knock, build a door, then watch it collapse.",
  "The best things in life are free… the second best are very expensive.",
  "I’m multitasking: I can ignore you and forget your name at the same time.",
  "They say love is blind… so is my sense of judgment.",
  "I’m not arguing, I’m just explaining why I’m right.",
  "If your cup is half empty, get a smaller cup.",
  "I thought I wanted a career… turns out I just wanted a paycheck.",
  "Do not take life too seriously… you will never get out alive.",
  "I am on a seafood diet. I see food, I eat it.",
  "Some days I amaze myself, other days I put my keys in the fridge.",
  "Experience is something you don’t get until just after you need it.",
  "Do not make the mistake of thinking you are normal.",
  "I can resist everything except temptation.",
  "My life feels like a test I didn’t study for.",
  "I didn’t fail, I just found 10,000 ways that won’t work.",
  "If you think nobody cares about you, try missing a couple of payments.",
  "I’m great at multitasking: I can waste time, be unproductive, and procrastinate all at once.",
  "Some people are like Slinkies… not really good for anything, but bring a smile when pushed down the stairs.",
  "Life is too important to be taken seriously.",
  "I’m not lazy, I’m just highly motivated to do nothing.",
  "I’m not weird, I’m limited edition.",
  "Sarcasm: just one of the many services I offer.",
  "I put the 'pro' in procrastinate.",
  "You never realize what you have until it’s gone… toilet paper, for example.",
  "I plan to live forever, so far so good.",
  "You can’t have everything… unless you have rich parents.",
  "Some days I amaze myself, other days I look for my phone while holding it.",
  "The problem with trouble is, it starts out as fun.",
  "Don’t let your dreams be dreams… unless they’re unrealistic, then ignore them.",
  "I’m on a 30-day diet… so far, I’ve lost 15 days.",
  "The sooner you fall behind, the more time you’ll have to catch up.",
  "Life is like a hot bath. It feels good while you’re in it, but the longer you stay, the more wrinkled you get.",
  "The road to success is dotted with many tempting parking spaces.",
  "I intend to live forever. So far, so good.",
  "If you think education is expensive, try ignorance."
];
