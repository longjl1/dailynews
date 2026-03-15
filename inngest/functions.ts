import { fetchAllNews } from "@/lib/rss-utils";
import { formatNewsSummary } from "@/lib/rss-utils";
import { inngest } from "./client";
import { Resend } from 'resend';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const sendDailyNews = inngest.createFunction(
    { id: "send-daily-news" },
    { event: "daily-news/send" },
    async ({ event, step }) => {
      // 1. get news from rss feeds

      const newsList = await step.run("fetch-news", async () => {
        console.log("Fetching news from RSS feeds...");
        const news = await fetchAllNews();
        console.log(`Fetched ${news.length} news items.`);
        return news;

      });
      // 2. form news content
      const newsSummary = await step.run("format-news", async () => {
        console.log("Formatting news summary...");
        const summary = formatNewsSummary(newsList);
        console.log("News summary formatted.");
        return summary;
      });
      // 3. create content of email
       const resend = new Resend(process.env.RESEND_API_KEY);

       const {data, error} = await step.run("send-email", async() =>{
        console.log("sending email...")
        const res = await resend.broadcasts.create({
            segmentId: 'aa3e1fe8-8af6-4fb9-b50c-4a5441b1cc79',
            from: 'Daily News Collection <longjl1@mewostudio.cc>',
            subject: `Daily News Collection - ${new Date().toLocaleDateString("zh-CN", { month: "long", day: "numeric", year: "numeric" })}`,
            html: newsSummary.html,
          });
          return res
       })
      // 4. send email via resend
      const {error: sendError} = await step.run("send-email", async() =>{
        console.log("sending email...")
        const res = await resend.broadcasts.send(data?.id!);
        return res
      });

      if (sendError){
        console.log("error:", sendError);
        return {message: sendError.message}
      }
    },
);
