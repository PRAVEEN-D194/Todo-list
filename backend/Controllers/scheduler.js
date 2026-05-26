const cron = require("node-cron");
const { sendMessage } = require("./telegram");
const Todolist = require('../module/todomodule.js');

cron.schedule("* * * * *", async (req, res) => {
    console.log("checking task...");

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const currentTime =  `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`

    console.log(currentTime);
    const list = await Todolist.find({messagetime: currentTime});
    if (list.length > 0) {
        for (const task of list) {
            await sendMessage(
                `⏰ Task Reminder!\n\n📝 Task: ${task.name}\n📌 Details: ${task.description}\n\n🔥 Time to focus and get it done!\n💪 You’ve got this! \n 💪 No excuses — just 100% focus now!\nSmall steps lead to big results 🚀\n\n  யாமிருக்க பயமேன்⚜️🦚`
            );
        }
    }
});